import bcrypt from "bcryptjs";
import { randomInt } from "node:crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env.js";
import { query, withTransaction } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { sendMail } from "../../utils/mailer.js";
import { OTP_MAX_ATTEMPTS, type LoginInput, type ResetPasswordInput, type Role, type UpdateProfileInput } from "./constant.js";

type UserRow = { id: number; name: string; email: string; password_hash: string; role: Role; is_active: boolean };

const publicUser = (u: Pick<UserRow, "id" | "name" | "email" | "role">) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
});

export const isUniqueViolation = (err: unknown) => (err as { code?: string })?.code === "23505";

export async function login({ email, password }: LoginInput) {
  const { rows } = await query<UserRow>("SELECT * FROM users WHERE email = $1", [email]);
  const user = rows[0];
  if (!user || !user.is_active || !(await bcrypt.compare(password, user.password_hash))) {
    throw new AppError(401, "Invalid credentials");
  }
  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
  return { token, user: publicUser(user) };
}

export async function updateProfile(id: number, input: UpdateProfileInput) {
  try {
    const { rows } = await query(
      `UPDATE users SET name = COALESCE($2, name), email = COALESCE($3, email), updated_at = NOW()
       WHERE id = $1 RETURNING id, name, email, role`,
      [id, input.name ?? null, input.email ?? null]
    );
    return rows[0];
  } catch (err) {
    if (isUniqueViolation(err)) throw new AppError(409, "Email already in use");
    throw err;
  }
}

export async function forgotPassword(email: string) {
  const { rows } = await query<UserRow>("SELECT id, name, email, is_active FROM users WHERE email = $1", [email]);
  const user = rows[0];
  if (!user || !user.is_active) return;

  const otp = randomInt(0, 1_000_000).toString().padStart(6, "0");
  const hash = await bcrypt.hash(otp, 10);
  await withTransaction(async (client) => {
    await client.query("UPDATE password_otps SET used_at = NOW() WHERE user_id = $1 AND used_at IS NULL", [user.id]);
    await client.query(
      `INSERT INTO password_otps (user_id, otp_hash, expires_at)
       VALUES ($1, $2, NOW() + ($3 || ' minutes')::interval)`,
      [user.id, hash, env.OTP_EXPIRES_MIN]
    );
  });

  await sendMail(
    user.email,
    "Your password reset OTP",
    `<p>Hi ${user.name},</p><p>Your OTP is <b style="font-size:20px">${otp}</b>.</p><p>It expires in ${env.OTP_EXPIRES_MIN} minutes. Ignore this email if you did not request it.</p>`
  );
}

export async function resetPassword({ email, otp, password }: ResetPasswordInput) {
  const { rows } = await query<{ id: number; user_id: number; otp_hash: string; attempts: number; name: string }>(
    `SELECT o.id, o.user_id, o.otp_hash, o.attempts, u.name FROM password_otps o
     JOIN users u ON u.id = o.user_id
     WHERE u.email = $1 AND u.is_active AND o.used_at IS NULL AND o.expires_at > NOW()
     ORDER BY o.created_at DESC LIMIT 1`,
    [email]
  );
  const record = rows[0];
  if (!record || record.attempts >= OTP_MAX_ATTEMPTS) throw new AppError(400, "Invalid or expired OTP");

  if (!(await bcrypt.compare(otp, record.otp_hash))) {
    await query("UPDATE password_otps SET attempts = attempts + 1 WHERE id = $1", [record.id]);
    throw new AppError(400, "Invalid or expired OTP");
  }

  await withTransaction(async (client) => {
    await client.query("UPDATE password_otps SET used_at = NOW() WHERE id = $1", [record.id]);
    await setPassword(record.user_id, password, client);
  });
  await notifyPasswordChanged(email, record.name);
}

export async function setPassword(userId: number, password: string, client: { query: typeof query } = { query }) {
  const hash = await bcrypt.hash(password, 10);
  await client.query("UPDATE users SET password_hash = $2, updated_at = NOW() WHERE id = $1", [userId, hash]);
}

export async function notifyPasswordChanged(email: string, name: string) {
  await sendMail(
    email,
    "Your password was changed",
    `<p>Hi ${name},</p><p>Your Study India Fair CMS password was just changed. If this was not you, contact an admin immediately.</p>`
  ).catch((err) => console.error("mail failed", err));
}
