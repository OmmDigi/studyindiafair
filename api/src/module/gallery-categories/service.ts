import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { reorder as reorderRows } from "../../utils/reorder.js";
import { isUniqueViolation } from "../auth/service.js";
import { slugify, type CreateCategoryInput, type ListCategoriesQuery, type ReorderInput, type UpdateCategoryInput } from "./constant.js";

type Row = {
  id: number;
  name: string;
  slug: string;
  position: number;
  is_active: boolean;
  item_count: number;
  cover_image: string | null;
  created_at: Date;
  updated_at: Date;
};

const COVER = `(SELECT i.image_path FROM gallery_items i WHERE i.category_id = c.id AND i.is_active = TRUE AND i.image_path IS NOT NULL
  ORDER BY i.position ASC, i.id ASC LIMIT 1) AS cover_image`;

const SELECT = `SELECT c.id, c.name, c.slug, c.position, c.is_active, c.created_at, c.updated_at, ${COVER},
  (SELECT COUNT(*)::int FROM gallery_items i WHERE i.category_id = c.id) AS item_count
  FROM gallery_categories c`;

const ORDER = "ORDER BY c.position ASC, c.id ASC";

function resolveSlug(slug: string | undefined, name: string) {
  const value = slug ?? slugify(name);
  if (!value) throw new AppError(422, "Slug could not be generated from name, enter one");
  return value;
}

async function run<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (err) {
    if (isUniqueViolation(err)) throw new AppError(409, "A category with this slug already exists");
    throw err;
  }
}

export async function list({ search, is_active }: ListCategoriesQuery) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (search) {
    params.push(`%${search}%`);
    where.push(`(c.name ILIKE $${params.length} OR c.slug ILIKE $${params.length})`);
  }
  if (is_active !== undefined) {
    params.push(is_active);
    where.push(`c.is_active = $${params.length}`);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const { rows } = await query<Row>(`${SELECT} ${clause} ${ORDER}`, params);
  return rows;
}

export async function listPublic() {
  const { rows } = await query<Pick<Row, "id" | "name" | "slug" | "position" | "item_count" | "cover_image">>(
    `SELECT c.id, c.name, c.slug, c.position, ${COVER},
     (SELECT COUNT(*)::int FROM gallery_items i WHERE i.category_id = c.id AND i.is_active = TRUE) AS item_count
     FROM gallery_categories c WHERE c.is_active = TRUE ${ORDER}`
  );
  return rows;
}

export async function getById(id: number) {
  const { rows } = await query<Row>(`${SELECT} WHERE c.id = $1`, [id]);
  if (!rows[0]) throw new AppError(404, "Category not found");
  return rows[0];
}

export async function create(input: CreateCategoryInput, actorId: number) {
  const slug = resolveSlug(input.slug, input.name);
  const { rows } = await run(() =>
    query<{ id: number }>(
      `INSERT INTO gallery_categories (name, slug, position, is_active, created_by, updated_by)
       VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM gallery_categories), $3, $4, $4) RETURNING id`,
      [input.name, slug, input.is_active, actorId]
    )
  );
  return getById(rows[0].id);
}

export async function update(id: number, input: UpdateCategoryInput, actorId: number) {
  const current = await getById(id);
  await run(() =>
    query(
      `UPDATE gallery_categories SET name = $2, slug = $3, is_active = $4, updated_by = $5, updated_at = NOW() WHERE id = $1`,
      [id, input.name ?? current.name, input.slug ?? current.slug, input.is_active ?? current.is_active, actorId]
    )
  );
  return getById(id);
}

export async function reorder({ ids }: ReorderInput, actorId: number) {
  await reorderRows("gallery_categories", ids, actorId);
  return list({});
}

export async function remove(id: number) {
  const current = await getById(id);
  if (current.item_count > 0) {
    throw new AppError(
      409,
      `Category has ${current.item_count} image${current.item_count === 1 ? "" : "s"}, move or delete them first`
    );
  }
  try {
    await query("DELETE FROM gallery_categories WHERE id = $1", [id]);
  } catch (err) {
    if ((err as { code?: string })?.code === "23503") {
      throw new AppError(409, "Category still has images, move or delete them first");
    }
    throw err;
  }
}
