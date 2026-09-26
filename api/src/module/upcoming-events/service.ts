import { query, withTransaction } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { reorder as reorderRows } from "../../utils/reorder.js";
import { deleteUpload } from "../../utils/uploadServer.js";
import { isUniqueViolation } from "../auth/service.js";
import {
  slugify,
  type CreateEventInput,
  type EventImage,
  type EventSchedule,
  type ListEventsQuery,
  type ReorderInput,
  type UpdateEventInput,
} from "./constant.js";

type Row = {
  id: number;
  page_id: number;
  name: string;
  slug: string;
  images: EventImage[];
  schedules: EventSchedule[];
  position: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

const SELECT = `SELECT e.id, e.page_id, p.name, p.slug, e.images, e.schedules, e.position, e.is_active, e.created_at, e.updated_at
  FROM upcoming_events e JOIN pages p ON p.id = e.page_id`;
const ORDER = "ORDER BY e.position ASC, e.id ASC";

async function run<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (err) {
    if (isUniqueViolation(err)) throw new AppError(409, "A page with this slug already exists");
    throw err;
  }
}

function resolveSlug(slug: string | undefined, name: string) {
  const value = slug ?? slugify(name);
  if (!value) throw new AppError(422, "Slug could not be generated from name, enter one");
  return value;
}

const removedImages = (before: EventImage[], after: EventImage[]) => {
  const kept = new Set(after.map((i) => i.path));
  return before.filter((i) => !kept.has(i.path)).map((i) => i.path);
};

export async function list({ search, is_active }: ListEventsQuery) {
  const params: unknown[] = [];
  const where: string[] = [];
  if (search) {
    params.push(`%${search}%`);
    where.push(`(p.name ILIKE $${params.length} OR p.slug ILIKE $${params.length} OR e.schedules::text ILIKE $${params.length})`);
  }
  if (is_active !== undefined) {
    params.push(is_active);
    where.push(`e.is_active = $${params.length}`);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const { rows } = await query<Row>(`${SELECT} ${clause} ${ORDER}`, params);
  return rows;
}

export async function listPublic() {
  const { rows } = await query<Row>(`${SELECT} WHERE e.is_active = TRUE ${ORDER}`);
  return rows.map(({ id, name, slug, images, schedules }) => ({ id, name, slug, images, schedules }));
}

export async function getPublic(slug: string) {
  const { rows } = await query<Row>(`${SELECT} WHERE p.slug = $1 AND e.is_active = TRUE`, [slug]);
  if (!rows[0]) throw new AppError(404, "Event not found");
  const { id, name, images, schedules } = rows[0];
  return { id, name, slug, images, schedules };
}

export async function getById(id: number) {
  const { rows } = await query<Row>(`${SELECT} WHERE e.id = $1`, [id]);
  if (!rows[0]) throw new AppError(404, "Event not found");
  return rows[0];
}

export async function create(input: CreateEventInput, actorId: number) {
  const slug = resolveSlug(input.slug, input.name);
  const id = await run(() =>
    withTransaction(async (client) => {
      const page = await client.query<{ id: number }>(
        "INSERT INTO pages (name, slug, created_by, updated_by) VALUES ($1, $2, $3, $3) RETURNING id",
        [input.name, slug, actorId]
      );
      const { rows } = await client.query<{ id: number }>(
        `INSERT INTO upcoming_events (page_id, images, schedules, position, is_active, created_by, updated_by)
         VALUES ($1, $2, $3, (SELECT COALESCE(MAX(position), 0) + 1 FROM upcoming_events), $4, $5, $5) RETURNING id`,
        [page.rows[0].id, JSON.stringify(input.images), JSON.stringify(input.schedules), input.is_active, actorId]
      );
      return rows[0].id;
    })
  );
  return getById(id);
}

export async function update(id: number, input: UpdateEventInput, actorId: number) {
  const current = await getById(id);
  const images = input.images ?? current.images;
  await run(() =>
    withTransaction(async (client) => {
      if (input.name !== undefined || input.slug !== undefined) {
        await client.query("UPDATE pages SET name = $2, slug = $3, updated_by = $4, updated_at = NOW() WHERE id = $1", [
          current.page_id,
          input.name ?? current.name,
          input.slug ?? current.slug,
          actorId,
        ]);
      }
      await client.query(
        "UPDATE upcoming_events SET images = $2, schedules = $3, is_active = $4, updated_by = $5, updated_at = NOW() WHERE id = $1",
        [id, JSON.stringify(images), JSON.stringify(input.schedules ?? current.schedules), input.is_active ?? current.is_active, actorId]
      );
    })
  );
  await Promise.all(removedImages(current.images, images).map(deleteUpload));
  return getById(id);
}

export async function reorder({ ids }: ReorderInput, actorId: number) {
  await reorderRows("upcoming_events", ids, actorId);
  return list({});
}

export async function remove(id: number) {
  const current = await getById(id);
  const seo = await query<{ og_image_path: string | null }>("SELECT og_image_path FROM page_seo WHERE page_id = $1", [
    current.page_id,
  ]);
  try {
    await withTransaction(async (client) => {
      await client.query("DELETE FROM upcoming_events WHERE id = $1", [id]);
      await client.query("DELETE FROM pages WHERE id = $1", [current.page_id]);
    });
  } catch (err) {
    if ((err as { code?: string })?.code === "23503") {
      throw new AppError(409, "Event page is still in use (e.g. FAQs), remove its content first");
    }
    throw err;
  }
  await Promise.all([...current.images.map((i) => deleteUpload(i.path)), deleteUpload(seo.rows[0]?.og_image_path)]);
}
