import bcrypt from "bcryptjs";
import { pool } from "./pool.js";

const email = (process.env.ADMIN_EMAIL ?? "admin@studyindiafair.com").toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "admin123";

async function run() {
  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, 'admin')
     ON CONFLICT (email) DO NOTHING`,
    ["Admin", email, hash]
  );
  console.log(`admin ready: ${email}`);
  await pool.end();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
