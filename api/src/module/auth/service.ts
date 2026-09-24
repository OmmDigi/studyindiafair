import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import type { LoginInput } from "./constant.js";

type UserRow = { id: number; name: string; email: string; password_hash: string; role: string; is_active: boolean };

export async function login({ email, password }: LoginInput) {
  const { rows } = await query<UserRow>("SELECT * FROM users WHERE email = $1", [email.toLowerCase()]);
  const user = rows[0];
  if (!user || !user.is_active || !(await bcrypt.compare(password, user.password_hash))) {
    throw new AppError(401, "Invalid credentials");
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export async function getMe(id: number) {
  const { rows } = await query("SELECT id, name, email, role FROM users WHERE id = $1", [id]);
  if (!rows[0]) throw new AppError(404, "User not found");
  return rows[0];
}
