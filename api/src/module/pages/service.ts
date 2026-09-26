import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { deleteUpload } from "../../utils/uploadServer.js";
import { isUniqueViolation } from "../auth/service.js";
import { slugify, type CreatePageInput, type ListPagesQuery, type UpdatePageInput } from "./constant.js";

type Row = {
  id: number;
  name: string;
  slug: string;
  faq_count: number;
  event_id: number | null;
  created_at: Date;
  updated_at: Date;
};

const SELECT = `SELECT p.id, p.name, p.slug, p.created_at, p.updated_at,
  (SELECT COUNT(*)::int FROM faqs f WHERE f.page_slug = p.slug) AS faq_count,
  (SELECT e.id FROM upcoming_events e WHERE e.page_id = p.id) AS event_id
  FROM pages p`;

function assertEditable(page: Row) {
  if (page.event_id) throw new AppError(409, "This page belongs to an upcoming event, manage it from Upcoming Events");
}

function resolveSlug(slug: string | undefined, name: string) {
  const value = slug ?? slugify(name);
  if (!value) throw new AppError(422, "Slug could not be generated from name, enter one");
  return value;
}

async function run<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (err) {
    if (isUniqueViolation(err)) throw new AppError(409, "A page with this slug already exists");
    throw err;
  }
}

export async function list({ search }: ListPagesQuery) {
  const params: unknown[] = [];
  let clause = "";
  if (search) {
    params.push(`%${search}%`);
    clause = "WHERE p.name ILIKE $1 OR p.slug ILIKE $1";
  }
  const { rows } = await query<Row>(`${SELECT} ${clause} ORDER BY p.name ASC`, params);
  return rows;
}

export async function listPublic() {
  const { rows } = await query<Pick<Row, "id" | "name" | "slug">>("SELECT id, name, slug FROM pages ORDER BY name ASC");
  return rows;
}

export async function getById(id: number) {
  const { rows } = await query<Row>(`${SELECT} WHERE p.id = $1`, [id]);
  if (!rows[0]) throw new AppError(404, "Page not found");
  return rows[0];
}

export async function create(input: CreatePageInput, actorId: number) {
  const slug = resolveSlug(input.slug, input.name);
  const { rows } = await run(() =>
    query<{ id: number }>(
      "INSERT INTO pages (name, slug, created_by, updated_by) VALUES ($1, $2, $3, $3) RETURNING id",
      [input.name, slug, actorId]
    )
  );
  return getById(rows[0].id);
}

export async function update(id: number, input: UpdatePageInput, actorId: number) {
  const current = await getById(id);
  assertEditable(current);
  await run(() =>
    query("UPDATE pages SET name = $2, slug = $3, updated_by = $4, updated_at = NOW() WHERE id = $1", [
      id,
      input.name ?? current.name,
      input.slug ?? current.slug,
      actorId,
    ])
  );
  return getById(id);
}

export async function remove(id: number) {
  const current = await getById(id);
  assertEditable(current);
  if (current.faq_count > 0) {
    throw new AppError(
      409,
      `Page has ${current.faq_count} FAQ${current.faq_count === 1 ? "" : "s"}, move or delete them first`
    );
  }
  const seo = await query<{ og_image_path: string | null }>("SELECT og_image_path FROM page_seo WHERE page_id = $1", [id]);
  try {
    await query("DELETE FROM pages WHERE id = $1", [id]);
  } catch (err) {
    if ((err as { code?: string })?.code === "23503") {
      throw new AppError(409, "Page is still in use, remove its content first");
    }
    throw err;
  }
  await deleteUpload(seo.rows[0]?.og_image_path);
}
