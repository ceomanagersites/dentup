// Отдаёт папку dist так же, как обычный хостинг: папка → index.html, неизвестный адрес → 404.html с кодом 404.
// node scripts/serve.mjs   (PORT=4190 — другой порт)
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const PORT = Number(process.env.PORT) || 4183;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
};
const fileAt = async (p) => {
  try {
    return await stat(p);
  } catch {
    return null;
  }
};
const send = (res, status, p) => {
  res.writeHead(status, { "Content-Type": TYPES[extname(p)] ?? "application/octet-stream", "Cache-Control": "no-cache" });
  createReadStream(p).pipe(res);
};

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const path = decodeURIComponent(url.pathname);
  const local = join(ROOT, normalize(path));
  if (!local.startsWith(ROOT)) return send(res, 404, join(ROOT, "404.html"));
  const info = await fileAt(local);
  if (info?.isDirectory()) {
    if (!path.endsWith("/")) {
      res.writeHead(301, { Location: `${path}/${url.search}` });
      return res.end();
    }
    const index = join(local, "index.html");
    if (await fileAt(index)) return send(res, 200, index);
  } else if (info && !path.endsWith(".htaccess")) {
    return send(res, 200, local);
  }
  send(res, 404, join(ROOT, "404.html"));
}).listen(PORT, () => console.log(`Dent Up: http://localhost:${PORT}`));
