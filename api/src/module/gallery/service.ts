import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { reorder as reorderRows } from "../../utils/reorder.js";
import { deleteUpload } from "../../utils/uploadServer.js";
import type { CreateGalleryInput, ListGalleryQuery, PublicListQuery, ReorderInput, UpdateGalleryInput } from "./constant.js";

type Row = {
  id: number;
  category_id: number;
  image_path: string;
  alt_text: string | null;
  position: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

const SELECT = "SELECT id, category_id, image_path, alt_text, position, is_active, created_at, updated_at FROM gallery_items";
const ORDER = "ORDER BY position ASC, id ASC";
const NEXT_POSITION = "(SELECT COALESCE(MAX(position), 0) FROM gallery_items WHERE category_id = $1)";

async function run<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (err) {
    if ((err as { code?: string })?.code === "23503") throw new AppError(422, "Category not found");
    throw err;
  }
}

export async function list({ category_id, is_active }: ListGalleryQuery) {
  const params: unknown[] = [category_id];
  let clause = "WHERE category_id = $1";
  if (is_active !== undefined) {
    params.push(is_active);
    clause += " AND is_active = $2";
  }
  const { rows } = await query<Row>(`${SELECT} ${clause} ${ORDER}`, params);
  return rows;
}

export async function listPublic({ category, page, limit }: PublicListQuery) {
  const params: unknown[] = [];
  let clause = "WHERE i.is_active = TRUE AND c.is_active = TRUE";
  if (category) {
    params.push(category);
    clause += " AND c.slug = $1";
  }
  const from = `FROM gallery_items i JOIN gallery_categories c ON c.id = i.category_id ${clause}`;
  const [{ rows }, count] = await Promise.all([
    query(
      `SELECT i.id, i.image_path, i.alt_text, i.position, c.id AS category_id, c.name AS category_name, c.slug AS category_slug
       ${from} ORDER BY c.position ASC, c.id ASC, i.position ASC, i.id ASC LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
      params
    ),
    query<{ total: number }>(`SELECT COUNT(*)::int AS total ${from}`, params),
  ]);
  return { data: rows, page, limit, total: count.rows[0].total };
}

export async function getById(id: number) {
  const { rows } = await query<Row>(`${SELECT} WHERE id = $1`, [id]);
  if (!rows[0]) throw new AppError(404, "Gallery image not found");
  return rows[0];
}

export async function create({ category_id, is_active, items }: CreateGalleryInput, actorId: number) {
  const { rows } = await run(() =>
    query<Row>(
      `INSERT INTO gallery_items (category_id, image_path, alt_text, position, is_active, created_by, updated_by)
       SELECT $1, v.image_path, v.alt_text, ${NEXT_POSITION} + v.ord, $4, $5, $5
       FROM unnest($2::text[], $3::text[]) WITH ORDINALITY AS v(image_path, alt_text, ord)
       RETURNING id, category_id, image_path, alt_text, position, is_active, created_at, updated_at`,
      [category_id, items.map((i) => i.image_path), items.map((i) => i.alt_text), is_active, actorId]
    )
  );
  return rows;
}

export async function update(id: number, input: UpdateGalleryInput, actorId: number) {
  const current = await getById(id);
  const categoryId = input.category_id ?? current.category_id;
  const imagePath = input.image_path ?? current.image_path;
  const moved = categoryId !== current.category_id;
  await run(() =>
    query(
      `UPDATE gallery_items SET category_id = $1, image_path = $2, alt_text = $3, is_active = $4,
       position = ${moved ? `${NEXT_POSITION} + 1` : "position"}, updated_by = $5, updated_at = NOW() WHERE id = $6`,
      [
        categoryId,
        imagePath,
        input.alt_text !== undefined ? input.alt_text : current.alt_text,
        input.is_active ?? current.is_active,
        actorId,
        id,
      ]
    )
  );
  if (current.image_path !== imagePath) await deleteUpload(current.image_path);
  return getById(id);
}

export async function reorder({ category_id, ids }: ReorderInput, actorId: number) {
  await reorderRows("gallery_items", ids, actorId, { column: "category_id", value: category_id });
  return list({ category_id });
}

export async function remove(id: number) {
  const { rows } = await query<{ image_path: string }>("DELETE FROM gallery_items WHERE id = $1 RETURNING image_path", [id]);
  if (!rows[0]) throw new AppError(404, "Gallery image not found");
  await deleteUpload(rows[0].image_path);
}
