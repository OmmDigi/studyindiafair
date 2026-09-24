import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { deleteUpload } from "../../utils/uploadServer.js";
import {
  extractYoutubeId,
  type EditorContent,
  type CreateTestimonialInput,
  type ListTestimonialsQuery,
  type PublicListQuery,
  type TestimonialType,
  type UpdateTestimonialInput,
} from "./constant.js";

type Row = {
  id: number;
  type: TestimonialType;
  category_id: number;
  category_name: string;
  category_slug: string;
  name: string;
  designation: string | null;
  content: EditorContent;
  image_path: string | null;
  youtube_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

type Fields = Pick<Row, "type" | "category_id" | "name" | "designation" | "content" | "image_path" | "youtube_id" | "sort_order" | "is_active">;

const SELECT = `SELECT t.id, t.type, t.category_id, c.name AS category_name, c.slug AS category_slug, t.name, t.designation,
  t.content, t.image_path, t.youtube_id, t.sort_order, t.is_active, t.created_at, t.updated_at
  FROM testimonials t JOIN testimonial_categories c ON c.id = t.category_id`;

async function assertCategory(id: number) {
  const { rows } = await query("SELECT 1 FROM testimonial_categories WHERE id = $1", [id]);
  if (!rows[0]) throw new AppError(422, "Selected category does not exist");
}

const serialize = (row: Row) => ({
  ...row,
  youtube_url: row.youtube_id ? `https://www.youtube.com/watch?v=${row.youtube_id}` : null,
});

function normalize(record: Fields): Fields {
  const errors: string[] = [];
  if (record.type !== "video" && !record.content) errors.push("content is required");
  if (record.type === "text_image" && !record.image_path) errors.push("image is required");
  if (record.type === "video" && !record.youtube_id) errors.push("A valid YouTube URL is required");
  if (errors.length) throw new AppError(422, errors[0], { formErrors: errors });
  return {
    ...record,
    image_path: record.type === "text_image" ? record.image_path : null,
    youtube_id: record.type === "video" ? record.youtube_id : null,
  };
}

function resolveYoutubeId(url: string | null | undefined, fallback: string | null) {
  if (url === undefined) return fallback;
  if (url === null) return null;
  const id = extractYoutubeId(url);
  if (!id) throw new AppError(422, "Invalid YouTube URL");
  return id;
}

export async function list({ search, type, category_id, is_active, page, limit }: ListTestimonialsQuery) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (search) {
    params.push(`%${search}%`);
    where.push(`(t.name ILIKE $${params.length} OR t.designation ILIKE $${params.length} OR t.content::text ILIKE $${params.length})`);
  }
  if (type) {
    params.push(type);
    where.push(`t.type = $${params.length}`);
  }
  if (category_id) {
    params.push(category_id);
    where.push(`t.category_id = $${params.length}`);
  }
  if (is_active !== undefined) {
    params.push(is_active);
    where.push(`t.is_active = $${params.length}`);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const [{ rows }, count] = await Promise.all([
    query<Row>(
      `${SELECT} ${clause} ORDER BY t.sort_order ASC, t.id DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
      params
    ),
    query<{ total: number }>(`SELECT COUNT(*)::int AS total FROM testimonials t ${clause}`, params),
  ]);
  return { data: rows.map(serialize), page, limit, total: count.rows[0].total };
}

export async function listPublic({ type, category, limit }: PublicListQuery) {
  const params: unknown[] = [];
  let clause = "WHERE t.is_active = TRUE AND c.is_active = TRUE";
  if (type) {
    params.push(type);
    clause += ` AND t.type = $${params.length}`;
  }
  if (category) {
    params.push(category);
    clause += ` AND c.slug = $${params.length}`;
  }
  const { rows } = await query<Row>(
    `${SELECT} ${clause} ORDER BY t.sort_order ASC, t.id DESC LIMIT ${limit}`,
    params
  );
  return rows.map((row) => {
    const { is_active, created_at, updated_at, ...rest } = serialize(row);
    return rest;
  });
}

async function findRow(id: number) {
  const { rows } = await query<Row>(`${SELECT} WHERE t.id = $1`, [id]);
  if (!rows[0]) throw new AppError(404, "Testimonial not found");
  return rows[0];
}

export const getById = async (id: number) => serialize(await findRow(id));

export async function create(input: CreateTestimonialInput, actorId: number) {
  const record = normalize({
    type: input.type,
    category_id: input.category_id,
    name: input.name,
    designation: input.designation,
    content: input.content,
    image_path: input.image_path,
    youtube_id: resolveYoutubeId(input.youtube_url, null),
    sort_order: input.sort_order,
    is_active: input.is_active,
  });
  await assertCategory(record.category_id);
  const { rows } = await query<{ id: number }>(
    `INSERT INTO testimonials (type, category_id, name, designation, content, image_path, youtube_id, sort_order, is_active, created_by, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10) RETURNING id`,
    [record.type, record.category_id, record.name, record.designation, record.content && JSON.stringify(record.content), record.image_path, record.youtube_id, record.sort_order, record.is_active, actorId]
  );
  return getById(rows[0].id);
}

export async function update(id: number, input: UpdateTestimonialInput, actorId: number) {
  const current = await findRow(id);
  const record = normalize({
    type: input.type ?? current.type,
    category_id: input.category_id ?? current.category_id,
    name: input.name ?? current.name,
    designation: input.designation !== undefined ? input.designation : current.designation,
    content: input.content !== undefined ? input.content : current.content,
    image_path: input.image_path !== undefined ? input.image_path : current.image_path,
    youtube_id: resolveYoutubeId(input.youtube_url, current.youtube_id),
    sort_order: input.sort_order ?? current.sort_order,
    is_active: input.is_active ?? current.is_active,
  });
  if (record.category_id !== current.category_id) await assertCategory(record.category_id);
  await query(
    `UPDATE testimonials SET type = $2, category_id = $3, name = $4, designation = $5, content = $6, image_path = $7, youtube_id = $8,
     sort_order = $9, is_active = $10, updated_by = $11, updated_at = NOW() WHERE id = $1`,
    [id, record.type, record.category_id, record.name, record.designation, record.content && JSON.stringify(record.content), record.image_path, record.youtube_id, record.sort_order, record.is_active, actorId]
  );
  if (current.image_path && current.image_path !== record.image_path) await deleteUpload(current.image_path);
  return getById(id);
}

export async function remove(id: number) {
  const { rows } = await query<{ image_path: string | null }>("DELETE FROM testimonials WHERE id = $1 RETURNING image_path", [id]);
  if (!rows[0]) throw new AppError(404, "Testimonial not found");
  await deleteUpload(rows[0].image_path);
}
