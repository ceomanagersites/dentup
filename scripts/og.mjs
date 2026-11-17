// Картинки для соцсетей (1200×630) и иконка для экрана телефона (180×180).
// Снимает шаблоны из build/og (их создаёт scripts/build.mjs) через headless Chrome скриптом page_shots из skill.
// node scripts/og.mjs, затем снова node scripts/build.mjs, чтобы картинки попали в dist.
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { homedir, tmpdir } from "node:os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const shots = process.env.PAGE_SHOTS || join(homedir(), ".claude/skills/ultimate-business-website-studio/scripts/qa/page_shots.mjs");
if (!existsSync(shots)) {
  console.error("Не найден page_shots.mjs. Укажите путь в PAGE_SHOTS.");
  process.exit(1);
}
const ogDir = join(root, "build", "og");
if (!existsSync(join(ogDir, "og-ru.html"))) {
  console.error("Сначала запустите node scripts/build.mjs");
  process.exit(1);
}

// Иконка: знак на ночном фоне
writeFileSync(
  join(ogDir, "icon.html"),
  `<!doctype html><html><body style="margin:0;width:180px;height:180px;background:#1a1320;display:grid;place-items:center">
<svg viewBox="0 0 32 32" width="132" height="132"><path d="M5 22a11 11 0 0 1 22 0" fill="none" stroke="#f1ecf2" stroke-width="1.8" stroke-linecap="round"/><path d="M2.5 22h27" stroke="#f1ecf2" stroke-width="1.8" stroke-linecap="round"/><circle cx="21.2" cy="13.6" r="3.2" fill="#f2a15e"/></svg>
</body></html>`,
  "utf8"
);

const out = join(tmpdir(), "dentup-og");
mkdirSync(out, { recursive: true });
const url = (f) => pathToFileURL(join(ogDir, f)).href;
execFileSync(
  process.execPath,
  [shots, out, `og-ru=${url("og-ru.html")}@1200x630`, `og-uz=${url("og-uz.html")}@1200x630`, `icon=${url("icon.html")}@180x180`, "--viewport", "--motion=reduce"],
  { stdio: "inherit" }
);
mkdirSync(join(root, "public", "og"), { recursive: true });
copyFileSync(join(out, "og-ru.png"), join(root, "public", "og", "og-ru.png"));
copyFileSync(join(out, "og-uz.png"), join(root, "public", "og", "og-uz.png"));
copyFileSync(join(out, "icon.png"), join(root, "public", "apple-touch-icon.png"));
console.log("Готово: public/og/og-ru.png, public/og/og-uz.png, public/apple-touch-icon.png");
