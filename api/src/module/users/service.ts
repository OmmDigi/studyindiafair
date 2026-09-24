import bcrypt from "bcryptjs";
import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { isUniqueViolation, notifyPasswordChanged, setPassword } from "../auth/service.js";
import type { CreateUserInput, ListUsersQuery, UpdateUserInput } from "./constant.js";

const COLUMNS = "id, name, email, role, is_active, created_at, updated_at";

export async function list({ search, role, page, limit }: ListUsersQuery) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (search) {
    params.push(`%${search}%`);
    where.push(`(name ILIKE $${params.length} OR email ILIKE $${params.length})`);
  }
  if (role) {
    params.push(role);
    where.push(`role = $${params.length}`);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const [{ rows }, count] = await Promise.all([
    query(`SELECT ${COLUMNS} FROM users ${clause} ORDER BY id DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`, params),
    query<{ total: number }>(`SELECT COUNT(*)::int AS total FROM users ${clause}`, params),
  ]);
  return { data: rows, page, limit, total: count.rows[0].total };
}

export async function getById(id: number) {
  const { rows } = await query(`SELECT ${COLUMNS} FROM users WHERE id = $1`, [id]);
  if (!rows[0]) throw new AppError(404, "User not found");
  return rows[0];
}

export async function create(input: CreateUserInput) {
  const hash = await bcrypt.hash(input.password, 10);
  try {
    const { rows } = await query(
      `INSERT INTO users (name, email, password_hash, role, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING ${COLUMNS}`,
      [input.name, input.email, hash, input.role, input.is_active]
    );
    return rows[0];
  } catch (err) {
    if (isUniqueViolation(err)) throw new AppError(409, "Email already in use");
    throw err;
  }
}

export async function update(id: number, input: UpdateUserInput, actorId: number) {
  if (id === actorId && (input.role === "editor" || input.is_active === false)) {
    throw new AppError(400, "You cannot demote or deactivate your own account");
  }
  try {
    const { rows } = await query(
      `UPDATE users SET name = COALESCE($2, name), email = COALESCE($3, email), role = COALESCE($4, role),
       is_active = COALESCE($5, is_active), updated_at = NOW() WHERE id = $1 RETURNING ${COLUMNS}`,
      [id, input.name ?? null, input.email ?? null, input.role ?? null, input.is_active ?? null]
    );
    if (!rows[0]) throw new AppError(404, "User not found");
    return rows[0];
  } catch (err) {
    if (isUniqueViolation(err)) throw new AppError(409, "Email already in use");
    throw err;
  }
}

export async function resetPassword(id: number, password: string) {
  const user = await getById(id);
  await setPassword(id, password);
  await query("UPDATE password_otps SET used_at = NOW() WHERE user_id = $1 AND used_at IS NULL", [id]);
  await notifyPasswordChanged(user.email, user.name);
}

export async function remove(id: number, actorId: number) {
  if (id === actorId) throw new AppError(400, "You cannot delete your own account");
  const { rowCount } = await query("DELETE FROM users WHERE id = $1", [id]);
  if (!rowCount) throw new AppError(404, "User not found");
}
