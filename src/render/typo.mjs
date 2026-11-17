// Типографика при сборке: экранирование HTML и неразрывные пробелы.
const NBSP = " ";

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Короткие слова (предлоги, союзы, частицы) не остаются в конце строки; тире не начинает строку.
const RU_SHORT = /(^|[\s(«])(в|во|и|с|со|к|ко|у|о|об|на|по|за|от|до|не|ни|а|но|из|без|для|при|под|над|про|что|как|это|же|ли|бы)\s/giu;

export function typo(s, lang = "ru") {
  let out = String(s);
  if (lang === "ru") {
    // два прохода: «и в», «не на» и подобные цепочки
    out = out.replace(RU_SHORT, `$1$2${NBSP}`).replace(RU_SHORT, `$1$2${NBSP}`);
    out = out.replace(/(\d)\s(года|лет|мин|ч)(?=\P{L}|$)/gu, `$1${NBSP}$2`);
  }
  out = out.replace(/\s—/g, `${NBSP}—`);
  return out;
}

// Текст: сначала типографика, потом экранирование.
// «7-й квартал», «7-kvartal», «1-qavat» не рвутся на дефисе: обёртка без невидимых символов, адрес копируется чисто.
export const t = (s, lang) => esc(typo(s, lang)).replace(/(\d+-\p{L}+)/gu, '<span class="nw">$1</span>');
