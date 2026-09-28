import { env } from "../config/env.js";

export async function deleteUpload(path?: string | null) {
  if (!path) return;
  try {
    const res = await fetch(`${env.UPLOAD_URL}/api/v1/manage/delete?url=${encodeURIComponent(path)}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 404) console.error(`upload delete failed for ${path}: ${res.status}`);
  } catch (err) {
    console.error(`upload delete failed for ${path}`, err);
  }
}
