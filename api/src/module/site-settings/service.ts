import { query } from "../../db/pool.js";
import { deleteUpload } from "../../utils/uploadServer.js";
import type { Address, EditorContent, Email, Phone, SocialLink, UpdateSiteSettingsInput } from "./constant.js";

type Row = {
  phones: Phone[];
  emails: Email[];
  addresses: Address[];
  social_links: SocialLink[];
  logo_path: string | null;
  favicon_path: string | null;
  notice: EditorContent;
  notice_active: boolean;
  updated_at: Date;
};

const COLUMNS = "phones, emails, addresses, social_links, logo_path, favicon_path, notice, notice_active, updated_at";

const uploadsOf = (s: Pick<Row, "logo_path" | "favicon_path" | "social_links">) =>
  [s.logo_path, s.favicon_path, ...s.social_links.map((l) => l.icon_path)].filter((p): p is string => !!p);

export async function get() {
  const { rows } = await query<Row>(`SELECT ${COLUMNS} FROM site_settings WHERE id = 1`);
  if (rows[0]) return rows[0];
  const inserted = await query<Row>(
    `INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO UPDATE SET id = site_settings.id RETURNING ${COLUMNS}`
  );
  return inserted.rows[0];
}

export async function getPublic() {
  const { notice, notice_active, updated_at, ...rest } = await get();
  return { ...rest, notice: notice_active ? notice : null };
}

export async function update(input: UpdateSiteSettingsInput, actorId: number) {
  const current = await get();
  const next = { ...current, ...input };
  await query(
    `UPDATE site_settings SET phones = $1, emails = $2, addresses = $3, social_links = $4, logo_path = $5,
     favicon_path = $6, notice = $7, notice_active = $8, updated_by = $9, updated_at = NOW() WHERE id = 1`,
    [
      JSON.stringify(next.phones),
      JSON.stringify(next.emails),
      JSON.stringify(next.addresses),
      JSON.stringify(next.social_links),
      next.logo_path,
      next.favicon_path,
      next.notice && JSON.stringify(next.notice),
      next.notice_active,
      actorId,
    ]
  );
  const keep = new Set(uploadsOf(next));
  await Promise.all(uploadsOf(current).filter((p) => !keep.has(p)).map((p) => deleteUpload(p)));
  return get();
}
