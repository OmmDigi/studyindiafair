import { query } from "../../db/pool.js";
import { RECENT_LIMIT, type EnquiryStatsQuery } from "./constant.js";

type Totals = {
  all_time: number;
  today: number;
  last_7_days: number;
  last_30_days: number;
  in_range: number;
};

type FormCount = { id: number; name: string; form_id: string; count: number };

type RecentEnquiry = {
  id: number;
  name: string;
  phone: string;
  created_at: Date;
  form: { id: number; name: string; form_id: string };
};

function rangeCondition({ from, to }: EnquiryStatsQuery, column = "created_at") {
  const params: unknown[] = [];
  const conditions: string[] = [];
  if (from) {
    params.push(from);
    conditions.push(`${column} >= $${params.length}::date`);
  }
  if (to) {
    params.push(to);
    conditions.push(`${column} < $${params.length}::date + 1`);
  }
  return { sql: conditions.join(" AND ") || "TRUE", params };
}

export async function enquiryStats(range: EnquiryStatsQuery) {
  const { sql, params } = rangeCondition(range);
  const joined = rangeCondition(range, "e.created_at");

  const [totals, byForm, recent] = await Promise.all([
    query<Totals>(
      `SELECT COUNT(*)::int AS all_time,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE)::int AS today,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - 6)::int AS last_7_days,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - 29)::int AS last_30_days,
        COUNT(*) FILTER (WHERE ${sql})::int AS in_range
      FROM form_enquiries`,
      params
    ),
    query<FormCount>(
      `SELECT f.id, f.name, f.form_id, COUNT(e.id)::int AS count
      FROM forms f
      LEFT JOIN form_enquiries e ON e.form_id = f.form_id AND ${joined.sql}
      GROUP BY f.id
      ORDER BY count DESC, f.name`,
      joined.params
    ),
    query<RecentEnquiry>(
      `SELECT e.id, e.name, e.phone, e.created_at,
        json_build_object('id', f.id, 'name', f.name, 'form_id', f.form_id) AS form
      FROM form_enquiries e
      JOIN forms f ON f.form_id = e.form_id
      WHERE ${joined.sql}
      ORDER BY e.created_at DESC, e.id DESC
      LIMIT ${RECENT_LIMIT}`,
      joined.params
    ),
  ]);

  return { totals: totals.rows[0], by_form: byForm.rows, recent: recent.rows };
}
