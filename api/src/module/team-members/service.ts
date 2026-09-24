import { query, withTransaction } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { deleteUpload } from "../../utils/uploadServer.js";
import type {
  CreateTeamMemberInput,
  EditorContent,
  ListTeamMembersQuery,
  MoveInput,
  PublicListQuery,
  UpdateTeamMemberInput,
} from "./constant.js";

type Row = {
  id: number;
  name: string;
  designation: string;
  details: EditorContent;
  image_path: string | null;
  position: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

const SELECT = "SELECT id, name, designation, details, image_path, position, is_active, created_at, updated_at FROM team_members";
const ORDER = "ORDER BY position ASC, id ASC";

export async function list({ search, is_active, page, limit }: ListTeamMembersQuery) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (search) {
    params.push(`%${search}%`);
    where.push(`(name ILIKE $${params.length} OR designation ILIKE $${params.length} OR details::text ILIKE $${params.length})`);
  }
  if (is_active !== undefined) {
    params.push(is_active);
    where.push(`is_active = $${params.length}`);
  }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const [{ rows }, count] = await Promise.all([
    query<Row>(`${SELECT} ${clause} ${ORDER} LIMIT ${limit} OFFSET ${(page - 1) * limit}`, params),
    query<{ total: number }>(`SELECT COUNT(*)::int AS total FROM team_members ${clause}`, params),
  ]);
  return { data: rows, page, limit, total: count.rows[0].total };
}

export async function listPublic({ limit }: PublicListQuery) {
  const { rows } = await query<Pick<Row, "id" | "name" | "designation" | "details" | "image_path" | "position">>(
    `SELECT id, name, designation, details, image_path, position FROM team_members WHERE is_active = TRUE ${ORDER} LIMIT ${limit}`
  );
  return rows;
}

export async function getById(id: number) {
  const { rows } = await query<Row>(`${SELECT} WHERE id = $1`, [id]);
  if (!rows[0]) throw new AppError(404, "Team member not found");
  return rows[0];
}

export async function create(input: CreateTeamMemberInput, actorId: number) {
  const { rows } = await query<{ id: number }>(
    `INSERT INTO team_members (name, designation, details, image_path, position, is_active, created_by, updated_by)
     VALUES ($1, $2, $3, $4, COALESCE($5, (SELECT COALESCE(MAX(position), 0) + 1 FROM team_members)), $6, $7, $7) RETURNING id`,
    [input.name, input.designation, input.details && JSON.stringify(input.details), input.image_path, input.position ?? null, input.is_active, actorId]
  );
  return getById(rows[0].id);
}

export async function update(id: number, input: UpdateTeamMemberInput, actorId: number) {
  const current = await getById(id);
  const details = input.details !== undefined ? input.details : current.details;
  const imagePath = input.image_path !== undefined ? input.image_path : current.image_path;
  await query(
    `UPDATE team_members SET name = $2, designation = $3, details = $4, image_path = $5, position = $6, is_active = $7,
     updated_by = $8, updated_at = NOW() WHERE id = $1`,
    [
      id,
      input.name ?? current.name,
      input.designation ?? current.designation,
      details && JSON.stringify(details),
      imagePath,
      input.position ?? current.position,
      input.is_active ?? current.is_active,
      actorId,
    ]
  );
  if (current.image_path && current.image_path !== imagePath) await deleteUpload(current.image_path);
  return getById(id);
}

export async function move(id: number, { direction }: MoveInput, actorId: number) {
  await withTransaction(async (client) => {
    await client.query("LOCK TABLE team_members IN SHARE ROW EXCLUSIVE MODE");
    await client.query(
      `UPDATE team_members t SET position = r.rn FROM
       (SELECT id, ROW_NUMBER() OVER (${ORDER})::int AS rn FROM team_members) r
       WHERE t.id = r.id AND t.position <> r.rn`
    );
    const { rows } = await client.query<{ position: number }>("SELECT position FROM team_members WHERE id = $1", [id]);
    if (!rows[0]) throw new AppError(404, "Team member not found");
    const target = rows[0].position + (direction === "up" ? -1 : 1);
    const { rowCount } = await client.query(
      "UPDATE team_members SET position = $1, updated_by = $2, updated_at = NOW() WHERE position = $3",
      [rows[0].position, actorId, target]
    );
    if (!rowCount) return;
    await client.query("UPDATE team_members SET position = $2, updated_by = $3, updated_at = NOW() WHERE id = $1", [id, target, actorId]);
  });
  return getById(id);
}

export async function remove(id: number) {
  const { rows } = await query<{ image_path: string | null }>("DELETE FROM team_members WHERE id = $1 RETURNING image_path", [id]);
  if (!rows[0]) throw new AppError(404, "Team member not found");
  await deleteUpload(rows[0].image_path);
}
