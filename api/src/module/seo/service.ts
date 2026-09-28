import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { deleteUpload } from "../../utils/uploadServer.js";
import * as pages from "../pages/service.js";
import type { UpsertSeoInput } from "./constant.js";

type SeoRow = UpsertSeoInput & { page_id: number; updated_at: Date | null };

const FIELDS =
  "meta_title, meta_description, canonical_url, og_title, og_description, og_image_path, schema_script, schema_position";

const EMPTY: Omit<SeoRow, "page_id"> = {
  meta_title: null,
  meta_description: null,
  canonical_url: null,
  og_title: null,
  og_description: null,
  og_image_path: null,
  schema_script: null,
  schema_position: "head",
  updated_at: null,
};

export async function list() {
  const { rows } = await query(
    `SELECT p.id AS page_id, p.name, p.slug, s.meta_title, s.meta_description, s.canonical_url, s.og_image_path,
       s.schema_script IS NOT NULL AS has_schema, s.updated_at
     FROM pages p LEFT JOIN page_seo s ON s.page_id = p.id ORDER BY p.name ASC`
  );
  return rows;
}

export async function get(pageId: number) {
  const page = await pages.getById(pageId);
  const { rows } = await query<SeoRow>(`SELECT page_id, ${FIELDS}, updated_at FROM page_seo WHERE page_id = $1`, [pageId]);
  return { ...EMPTY, ...rows[0], page_id: page.id, page_name: page.name, page_slug: page.slug };
}

export async function getPublic(slug: string) {
  const { rows } = await query<SeoRow & { page_name: string; page_slug: string }>(
    `SELECT p.name AS page_name, p.slug AS page_slug, ${FIELDS.split(", ").map((f) => `s.${f}`).join(", ")}
     FROM pages p LEFT JOIN page_seo s ON s.page_id = p.id WHERE p.slug = $1`,
    [slug]
  );
  if (!rows[0]) throw new AppError(404, "Page not found");
  return { ...rows[0], schema_position: rows[0].schema_position ?? "head" };
}

export async function upsert(pageId: number, input: UpsertSeoInput, actorId: number) {
  const current = await get(pageId);
  await query(
    `INSERT INTO page_seo (page_id, ${FIELDS}, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (page_id) DO UPDATE SET meta_title = $2, meta_description = $3, canonical_url = $4, og_title = $5,
       og_description = $6, og_image_path = $7, schema_script = $8, schema_position = $9, updated_by = $10, updated_at = NOW()`,
    [
      pageId,
      input.meta_title,
      input.meta_description,
      input.canonical_url,
      input.og_title,
      input.og_description,
      input.og_image_path,
      input.schema_script,
      input.schema_position,
      actorId,
    ]
  );
  if (current.og_image_path && current.og_image_path !== input.og_image_path) await deleteUpload(current.og_image_path);
  return get(pageId);
}

