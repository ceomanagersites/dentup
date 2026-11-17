// Сборка статичного сайта в папку dist без внешних зависимостей.
//   node scripts/build.mjs                              — черновик: noindex, пустой sitemap, robots закрывает сайт
//   SITE_URL=https://example.uz node scripts/build.mjs  — боевая сборка: canonical, hreflang, OG, sitemap
// В PowerShell: $env:SITE_URL="https://example.uz"; node scripts/build.mjs
//   NOINDEX=1 вместе с SITE_URL — черновик по живому адресу: ссылки для соцсетей абсолютные, но поисковики не пускаем.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ru from "../src/i18n/ru.mjs";
import uz from "../src/i18n/uz.mjs";
import { renderHome, render404, renderOg } from "../src/render/page.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "dist");
const read = (p) => readFileSync(join(root, p), "utf8");

/* 1. Словари совпадают по ключам: пропущенная строка на узбекском остановит сборку. */
function shape(obj, path = "") {
  if (Array.isArray(obj)) return [`${path}[${obj.length}]`, ...obj.flatMap((v, i) => shape(v, `${path}[${i}]`))];
  if (obj && typeof obj === "object") return Object.entries(obj).flatMap(([k, v]) => shape(v, path ? `${path}.${k}` : k));
  return [path];
}
const a = new Set(shape(ru)), b = new Set(shape(uz));
const missing = [...a].filter((k) => !b.has(k)), extra = [...b].filter((k) => !a.has(k));
if (missing.length || extra.length) {
  console.error("Словари ru и uz различаются.\nНет в uz:", missing, "\nЛишнее в uz:", extra);
  process.exit(1);
}
// Узбекская латиница: oʻ и gʻ пишутся с U+02BB, а не с апострофом.
const plainApostrophe = JSON.stringify(uz).match(/[OoGg]['’‘`]/g);
if (plainApostrophe) {
  console.error("В узбекских текстах обычный апостроф вместо ʻ (U+02BB):", [...new Set(plainApostrophe)]);
  process.exit(1);
}

/* 2. Адрес сайта и индексация. Пока домена нет, черновик закрыт от поисковиков. */
const siteUrl = (process.env.SITE_URL || "").trim().replace(/\/+$/, "");
if (siteUrl && !/^https?:\/\/[^/]+/.test(siteUrl)) {
  console.error("SITE_URL должен быть полным адресом, например https://dentup.uz");
  process.exit(1);
}
const css = read("src/styles/site.css");
const js = read("src/scripts/site.js");
const version = createHash("sha1").update(css + js).digest("hex").slice(0, 8);
const site = { url: siteUrl ? siteUrl + "/" : "", indexable: Boolean(siteUrl) && process.env.NOINDEX !== "1", version };

/* 3. Вывод */
rmSync(out, { recursive: true, force: true });
const write = (p, s) => {
  mkdirSync(dirname(join(out, p)), { recursive: true });
  writeFileSync(join(out, p), s, "utf8");
};

write("index.html", renderHome(ru, site));
write("uz/index.html", renderHome(uz, site));
write("404.html", render404(ru, uz, site));
write("assets/site.css", css);
write("assets/site.js", js);

// Статика: значки, картинки для соцсетей, настройки хостинга
if (existsSync(join(root, "public"))) cpSync(join(root, "public"), out, { recursive: true });

write(
  "robots.txt",
  site.indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n` : "User-agent: *\nDisallow: /\n"
);
if (site.indexable) {
  const today = new Date().toISOString().slice(0, 10);
  const alt = `<xhtml:link rel="alternate" hreflang="ru" href="${siteUrl}/"/><xhtml:link rel="alternate" hreflang="uz" href="${siteUrl}/uz/"/>`;
  write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod>${alt}</url>
<url><loc>${siteUrl}/uz/</loc><lastmod>${today}</lastmod>${alt}</url>
</urlset>
`
  );
}

/* 4. Ссылки страниц не выходят за папку сайта и ведут на существующие файлы.
   Сайт может жить в подпапке (черновик на GitHub Pages — /dentup/): ссылка «../../» локально работает,
   а там уводит на чужой адрес. Проверяем так, будто сайт лежит в /sub/. 404.html собирается с абсолютными
   путями от SITE_URL и здесь не проверяется. */
{
  const base = "https://site.test/sub/";
  const bad = [];
  for (const page of ["index.html", "uz/index.html"]) {
    const html = readFileSync(join(out, page), "utf8");
    const pageUrl = new URL(page.replace(/index\.html$/, ""), base);
    for (const [, ref] of html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)) {
      if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
      const u = new URL(ref, pageUrl);
      if (!u.pathname.startsWith("/sub/")) {
        bad.push(`${page}: ${ref} — выходит за папку сайта`);
        continue;
      }
      let local = decodeURIComponent(u.pathname.slice("/sub/".length));
      if (local === "" || local.endsWith("/")) local += "index.html";
      if (!existsSync(join(out, local))) bad.push(`${page}: ${ref} — нет файла ${local}`);
    }
  }
  if (bad.length) {
    console.error("Неверные ссылки:\n" + [...new Set(bad)].join("\n"));
    process.exit(1);
  }
}

/* 5. Шаблоны картинок для соцсетей (не публикуются, их снимает scripts/og.mjs) */
const ogDir = join(root, "build", "og");
mkdirSync(ogDir, { recursive: true });
for (const d of [ru, uz]) {
  writeFileSync(join(ogDir, `og-${d.lang}.html`), renderOg(d).replace("../assets/site.css", "../../src/styles/site.css"), "utf8");
}

console.log(
  `Готово: dist/ (${site.indexable ? "боевая сборка для " + siteUrl : "черновик, закрыт от поисковиков" + (siteUrl ? ", адрес " + siteUrl : "")}), версия ${version}`
);
