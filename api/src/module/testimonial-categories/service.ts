import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { isUniqueViolation } from "../auth/service.js";
import { slugify, type CreateCategoryInput, type ListCategoriesQuery, type UpdateCategoryInput } from "./constant.js";

type Row = {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
  testimonial_count: number;
  created_at: Date;
  updated_at: Date;
};

const SELECT = `SELECT c.id, c.name, c.slug, c.sort_order, c.is_active, c.created_at, c.updated_at,
  (SELECT COUNT(*)::int FROM testimonials t WHERE t.category_id = c.id) AS testimonial_count
  FROM testimonial_categories c`;

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
  const { rows } = await query<Row>(`${SELECT} ${clause} ORDER BY c.sort_order ASC, c.name ASC`, params);
  return rows;
}

export async function listPublic() {
  const { rows } = await query<Pick<Row, "id" | "name" | "slug" | "sort_order">>(
    "SELECT id, name, slug, sort_order FROM testimonial_categories WHERE is_active = TRUE ORDER BY sort_order ASC, name ASC"
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
      `INSERT INTO testimonial_categories (name, slug, sort_order, is_active, created_by, updated_by)
       VALUES ($1, $2, $3, $4, $5, $5) RETURNING id`,
      [input.name, slug, input.sort_order, input.is_active, actorId]
    )
  );
  return getById(rows[0].id);
}

export async function update(id: number, input: UpdateCategoryInput, actorId: number) {
  const current = await getById(id);
  const name = input.name ?? current.name;
  const slug = input.slug ?? current.slug;
  await run(() =>
    query(
      `UPDATE testimonial_categories SET name = $2, slug = $3, sort_order = $4, is_active = $5, updated_by = $6, updated_at = NOW()
       WHERE id = $1`,
      [id, name, slug, input.sort_order ?? current.sort_order, input.is_active ?? current.is_active, actorId]
    )
  );
  return getById(id);
}

export async function remove(id: number) {
  const current = await getById(id);
  if (current.testimonial_count > 0) {
    throw new AppError(
      409,
      `Category has ${current.testimonial_count} testimonial${current.testimonial_count === 1 ? "" : "s"}, move them to another category first`
    );
  }
  try {
    await query("DELETE FROM testimonial_categories WHERE id = $1", [id]);
  } catch (err) {
    if ((err as { code?: string })?.code === "23503") {
      throw new AppError(409, "Category still has testimonials, move them to another category first");
    }
    throw err;
  }
}
