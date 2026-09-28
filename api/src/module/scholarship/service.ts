import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { deleteUpload } from "../../utils/uploadServer.js";
import type { ApplyPoint, EditorContent, EligibilityPoint, UpdateScholarshipInput } from "./constant.js";

type Row = {
  page_id: number;
  page_name: string;
  page_slug: string;
  about_heading: string | null;
  about_description: EditorContent;
  about_image_path: string | null;
  eligibility_heading: string | null;
  eligibility_description: EditorContent;
  eligibility_points: EligibilityPoint[];
  eligibility_notice: EditorContent;
  apply_heading: string | null;
  apply_description: EditorContent;
  apply_points: ApplyPoint[];
  updated_at: Date;
};

const SELECT = `SELECT s.page_id, p.name AS page_name, p.slug AS page_slug, s.about_heading, s.about_description, s.about_image_path,
  s.eligibility_heading, s.eligibility_description, s.eligibility_points, s.eligibility_notice,
  s.apply_heading, s.apply_description, s.apply_points, s.updated_at
  FROM scholarship s JOIN pages p ON p.id = s.page_id WHERE s.id = 1`;

const uploadsOf = (s: Pick<Row, "about_image_path" | "apply_points">) =>
  [s.about_image_path, ...s.apply_points.map((p) => p.icon_path)].filter((p): p is string => !!p);

export async function get() {
  const { rows } = await query<Row>(SELECT);
  if (!rows[0]) throw new AppError(404, "Scholarship page not found");
  return rows[0];
}

export async function getPublic() {
  const { page_id, updated_at, ...rest } = await get();
  return rest;
}

export async function update(input: UpdateScholarshipInput, actorId: number) {
  const current = await get();
  await query(
    `UPDATE scholarship SET about_heading = $1, about_description = $2, about_image_path = $3, eligibility_heading = $4,
     eligibility_description = $5, eligibility_points = $6, eligibility_notice = $7, apply_heading = $8,
     apply_description = $9, apply_points = $10, updated_by = $11, updated_at = NOW() WHERE id = 1`,
    [
      input.about_heading,
      JSON.stringify(input.about_description),
      input.about_image_path,
      input.eligibility_heading,
      JSON.stringify(input.eligibility_description),
      JSON.stringify(input.eligibility_points),
      input.eligibility_notice && JSON.stringify(input.eligibility_notice),
      input.apply_heading,
      JSON.stringify(input.apply_description),
      JSON.stringify(input.apply_points),
      actorId,
    ]
  );
  const keep = new Set(uploadsOf(input));
  await Promise.all(uploadsOf(current).filter((p) => !keep.has(p)).map((p) => deleteUpload(p)));
  return get();
}
