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

type Fields = Pick<Row, "type" | "name" | "designation" | "content" | "image_path" | "youtube_id" | "sort_order" | "is_active">;

const COLUMNS = "id, type, name, designation, content, image_path, youtube_id, sort_order, is_active, created_at, updated_at";

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

export async function list({ search, type, is_active, page, limit }: ListTestimonialsQuery) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (search) {
    params.push(`%${search}%`);
    where.push(`(name ILIKE $${params.length} OR designation ILIKE $${params.length} OR content::text ILIKE $${params.length})`);
  }
  if (type) {
    params.push(type);
    where.push(`type = $${params.length}`);
  }
  if (is_active !== undefined) {
    params.push(is_active);
    where.push(`is_active = $${params.length}`);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const [{ rows }, count] = await Promise.all([
    query<Row>(
      `SELECT ${COLUMNS} FROM testimonials ${clause} ORDER BY sort_order ASC, id DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
      params
    ),
    query<{ total: number }>(`SELECT COUNT(*)::int AS total FROM testimonials ${clause}`, params),
  ]);
  return { data: rows.map(serialize), page, limit, total: count.rows[0].total };
}

export async function listPublic({ type, limit }: PublicListQuery) {
  const params: unknown[] = [];
  let clause = "WHERE is_active = TRUE";
  if (type) {
    params.push(type);
    clause += ` AND type = $${params.length}`;
  }
  const { rows } = await query<Row>(
    `SELECT ${COLUMNS} FROM testimonials ${clause} ORDER BY sort_order ASC, id DESC LIMIT ${limit}`,
    params
  );
  return rows.map((row) => {
    const { is_active, created_at, updated_at, ...rest } = serialize(row);
    return rest;
  });
}

async function findRow(id: number) {
  const { rows } = await query<Row>(`SELECT ${COLUMNS} FROM testimonials WHERE id = $1`, [id]);
  if (!rows[0]) throw new AppError(404, "Testimonial not found");
  return rows[0];
}

export const getById = async (id: number) => serialize(await findRow(id));

export async function create(input: CreateTestimonialInput, actorId: number) {
  const record = normalize({
    type: input.type,
    name: input.name,
    designation: input.designation,
    content: input.content,
    image_path: input.image_path,
    youtube_id: resolveYoutubeId(input.youtube_url, null),
    sort_order: input.sort_order,
    is_active: input.is_active,
  });
  const { rows } = await query<Row>(
    `INSERT INTO testimonials (type, name, designation, content, image_path, youtube_id, sort_order, is_active, created_by, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9) RETURNING ${COLUMNS}`,
    [record.type, record.name, record.designation, record.content && JSON.stringify(record.content), record.image_path, record.youtube_id, record.sort_order, record.is_active, actorId]
  );
  return serialize(rows[0]);
}

export async function update(id: number, input: UpdateTestimonialInput, actorId: number) {
  const current = await findRow(id);
  const record = normalize({
    type: input.type ?? current.type,
    name: input.name ?? current.name,
    designation: input.designation !== undefined ? input.designation : current.designation,
    content: input.content !== undefined ? input.content : current.content,
    image_path: input.image_path !== undefined ? input.image_path : current.image_path,
    youtube_id: resolveYoutubeId(input.youtube_url, current.youtube_id),
    sort_order: input.sort_order ?? current.sort_order,
    is_active: input.is_active ?? current.is_active,
  });
  const { rows } = await query<Row>(
    `UPDATE testimonials SET type = $2, name = $3, designation = $4, content = $5, image_path = $6, youtube_id = $7,
     sort_order = $8, is_active = $9, updated_by = $10, updated_at = NOW() WHERE id = $1 RETURNING ${COLUMNS}`,
    [id, record.type, record.name, record.designation, record.content && JSON.stringify(record.content), record.image_path, record.youtube_id, record.sort_order, record.is_active, actorId]
  );
  if (current.image_path && current.image_path !== record.image_path) await deleteUpload(current.image_path);
  return serialize(rows[0]);
}

export async function remove(id: number) {
  const { rows } = await query<{ image_path: string | null }>("DELETE FROM testimonials WHERE id = $1 RETURNING image_path", [id]);
  if (!rows[0]) throw new AppError(404, "Testimonial not found");
  await deleteUpload(rows[0].image_path);
}
