import { withTransaction } from "../db/pool.js";
import { AppError } from "./AppError.js";

type Scope = { column: string; value: number };

export async function reorder(table: string, ids: number[], actorId: number, scope?: Scope) {
  await withTransaction(async (client) => {
    const params: unknown[] = [];
    let where = "";
    if (scope) {
      params.push(scope.value);
      where = `WHERE ${scope.column} = $1`;
    }
    await client.query(`LOCK TABLE ${table} IN SHARE ROW EXCLUSIVE MODE`);
    await client.query(
      `UPDATE ${table} t SET position = r.rn FROM
       (SELECT id, ROW_NUMBER() OVER (ORDER BY position ASC, id ASC)::int AS rn FROM ${table} ${where}) r
       WHERE t.id = r.id AND t.position <> r.rn`,
      params
    );
    params.push(ids);
    const idsParam = `$${params.length}`;
    const { rows } = await client.query<{ position: number }>(
      `SELECT position FROM ${table} WHERE id = ANY(${idsParam}::int[]) ${scope ? `AND ${scope.column} = $1` : ""} ORDER BY position ASC`,
      params
    );
    if (rows.length !== ids.length) throw new AppError(422, "Some items were not found, refresh and try again");
    await client.query(
      `UPDATE ${table} t SET position = v.position, updated_by = $3, updated_at = NOW()
       FROM unnest($1::int[], $2::int[]) AS v(id, position) WHERE t.id = v.id AND t.position <> v.position`,
      [ids, rows.map((r) => r.position), actorId]
    );
  });
}
