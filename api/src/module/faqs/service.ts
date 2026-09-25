import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import type { CreateFaqInput, EditorContent, ListFaqsQuery, PublicListQuery, UpdateFaqInput } from "./constant.js";

type Row = {
  id: number;
  page_slug: string;
  question: string;
  answer: EditorContent;
  sort_order: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

async function run<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (err) {
    if ((err as { code?: string })?.code === "23503") throw new AppError(422, "Selected page does not exist");
    throw err;
  }
}

const SELECT = "SELECT id, page_slug, question, answer, sort_order, is_active, created_at, updated_at FROM faqs";

export async function list({ search, page_slug, is_active, page, limit }: ListFaqsQuery) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (search) {
    params.push(`%${search}%`);
    where.push(`(question ILIKE $${params.length} OR answer::text ILIKE $${params.length})`);
  }
  if (page_slug) {
    params.push(page_slug);
    where.push(`page_slug = $${params.length}`);
  }
  if (is_active !== undefined) {
    params.push(is_active);
    where.push(`is_active = $${params.length}`);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const [{ rows }, count] = await Promise.all([
    query<Row>(`${SELECT} ${clause} ORDER BY sort_order ASC, id DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`, params),
    query<{ total: number }>(`SELECT COUNT(*)::int AS total FROM faqs ${clause}`, params),
  ]);
  return { data: rows, page, limit, total: count.rows[0].total };
}

export async function listPublic({ page_slug, limit }: PublicListQuery) {
  const { rows } = await query<Pick<Row, "id" | "question" | "answer" | "sort_order">>(
    `SELECT id, question, answer, sort_order FROM faqs WHERE page_slug = $1 AND is_active = TRUE
     ORDER BY sort_order ASC, id DESC LIMIT ${limit}`,
    [page_slug]
  );
  return rows;
}

export async function getById(id: number) {
  const { rows } = await query<Row>(`${SELECT} WHERE id = $1`, [id]);
  if (!rows[0]) throw new AppError(404, "FAQ not found");
  return rows[0];
}

export async function create(input: CreateFaqInput, actorId: number) {
  const { rows } = await run(() =>
    query<{ id: number }>(
      `INSERT INTO faqs (page_slug, question, answer, sort_order, is_active, created_by, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $6) RETURNING id`,
      [input.page_slug, input.question, JSON.stringify(input.answer), input.sort_order, input.is_active, actorId]
    )
  );
  return getById(rows[0].id);
}

export async function update(id: number, input: UpdateFaqInput, actorId: number) {
  const current = await getById(id);
  await run(() =>
    query(
      `UPDATE faqs SET page_slug = $2, question = $3, answer = $4, sort_order = $5, is_active = $6, updated_by = $7, updated_at = NOW()
       WHERE id = $1`,
      [
        id,
        input.page_slug ?? current.page_slug,
        input.question ?? current.question,
        JSON.stringify(input.answer ?? current.answer),
        input.sort_order ?? current.sort_order,
        input.is_active ?? current.is_active,
        actorId,
      ]
    )
  );
  return getById(id);
}

export async function remove(id: number) {
  const { rowCount } = await query("DELETE FROM faqs WHERE id = $1", [id]);
  if (!rowCount) throw new AppError(404, "FAQ not found");
}
