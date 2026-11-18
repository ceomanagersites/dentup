// Разметка страниц. Тексты приходят из словаря, факты — из src/content/business.mjs.
import { business, mainPhone, telHref } from "../content/business.mjs";
import { esc, t as tx } from "./typo.mjs";
import { icons, logoMark } from "./icons.mjs";
import { renderDial } from "./dial.mjs";

const tgUser = (text) => `https://t.me/${business.telegram}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
const waLink = (text) => `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
const igLink = (u) => `https://www.instagram.com/${u}/`;
const ic = (name, size = 20, cls = "icon") =>
  (icons[name] || "").replace('class="icon"', `class="${cls}"`).replace('width="20" height="20"', `width="${size}" height="${size}"`);

const THEME_COLORS = { day: "#f3f7fb", night: "#0b1424" };
const FONTS = "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Prata&display=swap";

// Выбор темы до первой отрисовки: по времени Ташкента (ночь 20:00–06:00) или по выбору посетителя в этой вкладке.
// ?theme=day|night в адресе принудительно задаёт тему (для проверки и показа клиенту).
const headScript = `(function(){var d=document.documentElement;d.classList.add('js');var t,q=/[?&]theme=(day|night)/.exec(location.search);if(q){t=q[1]}else{try{t=sessionStorage.getItem('dentup-theme')}catch(e){}}if(t!=='day'&&t!=='night'){var h=12;try{h=+new Intl.DateTimeFormat('en-GB',{timeZone:'${business.timeZone}',hour:'2-digit',hourCycle:'h23'}).format(new Date())}catch(e){}t=(h>=20||h<6)?'night':'day'}d.dataset.theme=t;var m=document.querySelector('meta[name=theme-color]');if(m)m.content=t==='night'?'${THEME_COLORS.night}':'${THEME_COLORS.day}'})();`;

function head(d, site, { base, path, title, description, noindex }) {
  const url = site.url ? site.url + path : "";
  const og = site.url ? `${site.url}og/og-${d.lang}.png` : "";
  const robots = !site.indexable || noindex ? `<meta name="robots" content="noindex, nofollow">` : "";
  const alt =
    site.url && !noindex
      ? `<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ru" href="${site.url}">
<link rel="alternate" hreflang="uz" href="${site.url}uz/">
<link rel="alternate" hreflang="x-default" href="${site.url}">`
      : "";
  // <!-- DEPLOY STEP --> og:url и og:image требуют абсолютного адреса: соберите с SITE_URL (README, «Публикация»).
  const ogTags = `<meta property="og:type" content="website">
<meta property="og:site_name" content="Dent Up">
<meta property="og:locale" content="${d.locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${url ? `<meta property="og:url" content="${url}">` : "<!-- DEPLOY STEP: og:url появится при сборке с SITE_URL -->"}
${og ? `<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(d.meta.ogAlt)}">
<meta name="twitter:card" content="summary_large_image">` : ""}`;
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${robots}
${alt}
<meta name="theme-color" content="${THEME_COLORS.day}">
<meta name="color-scheme" content="light dark">
<meta name="format-detection" content="telephone=no">
${ogTags}
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${base}apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${base}assets/site.css?v=${site.version}">
<script>${headScript}</script>
</head>`;
}

function header(d, base) {
  const nav = d.nav.map((n) => `<li><a href="#${n.id}">${esc(n.label)}</a></li>`).join("");
  return `<div class="progress" aria-hidden="true"><span data-progress></span></div>
<header class="hdr" data-hdr>
  <div class="hdr-in wrap">
    <a class="logo" href="#top" aria-label="Dent Up">${logoMark}<span class="logo-word">Dent Up</span></a>
    <nav class="hdr-nav" aria-label="${esc(d.menu.open)}"><ul>${nav}</ul></nav>
    <div class="hdr-tools">
      <button class="icon-btn theme-btn" type="button" data-theme-toggle data-to-day="${esc(d.theme.toDay)}" data-to-night="${esc(d.theme.toNight)}" aria-label="${esc(d.theme.toNight)}">
        <span class="theme-ico theme-ico-sun">${icons.sun}</span><span class="theme-ico theme-ico-moon">${icons.moon}</span>
      </button>
      <a class="lang-link" href="${d.other.path}" hreflang="${d.other.lang}" lang="${d.other.lang}" data-lang-link aria-label="${esc(d.langSwitch)}">${d.other.short}</a>
      <a class="hdr-phone" href="${telHref(mainPhone)}" data-track="phone">${icons.phone}<span>${esc(mainPhone.display)}</span></a>
      <button class="icon-btn menu-btn" type="button" data-menu-open aria-label="${esc(d.menu.open)}" aria-haspopup="dialog">${icons.menu}</button>
    </div>
  </div>
</header>
<dialog class="menu" data-menu aria-label="${esc(d.menu.open)}">
  <div class="menu-top"><span class="logo">${logoMark}<span class="logo-word">Dent Up</span></span><button class="icon-btn" type="button" data-menu-close aria-label="${esc(d.menu.close)}">${icons.close}</button></div>
  <ul class="menu-list">${d.nav.map((n) => `<li><a href="#${n.id}" data-menu-link>${esc(n.label)}</a></li>`).join("")}</ul>
  <div class="menu-foot">
    <a class="btn btn-accent" href="${telHref(mainPhone)}">${icons.phone}<span>${esc(mainPhone.display)}</span></a>
    <a class="lang-link" href="${d.other.path}" hreflang="${d.other.lang}" lang="${d.other.lang}" data-lang-link>${esc(d.other.label)}</a>
  </div>
</dialog>`;
}

function hero(d) {
  const h = d.hero;
  const L = d.lang;
  return `<section class="hero" id="top" aria-labelledby="hero-title">
  <div class="hero-aura" aria-hidden="true"><span></span><span></span></div>
  <div class="hero-in wrap">
    <p class="hero-badge"><span class="live-dot" aria-hidden="true"></span>${esc(h.badge)}</p>
    <h1 class="hero-title" id="hero-title">${h.title.map((line, i) => `<span class="line"><span class="line-in" style="--o:${i}">${tx(line, L)}</span></span>`).join(" ")}</h1>
    <p class="hero-lede">${tx(h.lede, L)}</p>
    <div class="hero-cta">
      <a class="btn btn-accent btn-lg" href="${telHref(mainPhone)}" data-track="phone">${icons.phone}<span>${esc(h.call)}</span></a>
      <a class="btn btn-line btn-lg" href="${tgUser(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="telegram">${icons.telegram}<span>${esc(h.write)}</span></a>
    </div>
    <a class="hero-rating" href="${business.links.gisReviews}" target="_blank" rel="noopener"><span class="stars" aria-hidden="true">${icons.star.repeat(5)}</span><span><b>${esc(h.rating)}</b> · ${esc(h.ratingNote)}</span></a>
  </div>
  <div class="hero-dial wrap" data-parallax>${renderDial(h)}</div>
</section>`;
}

function benefits(d) {
  const L = d.lang;
  return `<section class="benefits" aria-label="Dent Up">
  <ul class="benefits-in wrap">${d.benefits
    .map(
      (b, i) =>
        `<li class="benefit" data-reveal style="--reveal-delay:${i * 80}ms"><span class="benefit-ic" data-draw>${ic(b.icon, 26)}</span><div><p class="benefit-t">${tx(b.t, L)}</p><p>${tx(b.d, L)}</p></div></li>`
    )
    .join("")}</ul>
</section>`;
}

function marquee(d) {
  const row = d.marquee.map((m) => `<span class="mq-item">${esc(m)}</span><span class="mq-dot" aria-hidden="true"></span>`).join("");
  return `<div class="marquee" data-marquee aria-label="${esc(d.services.title)}">
  <div class="mq-track" data-mq-track><div class="mq-row">${row}</div><div class="mq-row" aria-hidden="true">${row}</div></div>
</div>`;
}

// Фото клиники: увеличены и обработаны локально (README, «Фотографии»). Нажатие открывает фото крупно.
function photoSet(base, name, sizes) {
  return {
    src: `${base}img/${name}-800.webp`,
    srcset: `${base}img/${name}-800.webp 800w, ${base}img/${name}-1600.webp 1600w`,
    big: `${base}img/${name}-1600.webp`,
    sizes,
  };
}

function clinic(d, base) {
  const c = d.clinic;
  const L = d.lang;
  const fig = (ph, i) => {
    const set = photoSet(base, ph.src, i === 0 ? "(max-width: 760px) 100vw, 56vw" : "(max-width: 760px) 100vw, 40vw");
    return `<figure class="photo photo-${ph.src}" data-reveal style="--reveal-delay:${i * 140}ms">
      <button class="photo-btn" type="button" data-zoom="${set.big}" data-alt="${esc(ph.alt)}" aria-label="${esc(c.zoom)}: ${esc(ph.cap)}">
        <img src="${set.src}" srcset="${set.srcset}" sizes="${set.sizes}" width="1600" height="2133" alt="${esc(ph.alt)}" loading="lazy" decoding="async">
      </button>
      <figcaption class="photo-cap">${ic(i === 0 ? "implant" : "home", 16)}<span>${esc(ph.cap)}</span></figcaption>
    </figure>`;
  };
  return `<section class="clinic section" id="clinic" aria-labelledby="clinic-title">
  <div class="wrap">
    <div class="clinic-head">
      <div>
        <h2 class="h2" id="clinic-title" data-reveal="mask"><span class="mask-in">${tx(c.title, L)}</span></h2>
        <p class="lede" data-reveal>${tx(c.lede, L)}</p>
      </div>
      <ul class="clinic-facts">${c.facts.map((f, i) => `<li data-reveal style="--reveal-delay:${i * 70}ms"><span class="cf-ic">${ic(f.icon, 18)}</span>${tx(f.t, L)}</li>`).join("")}</ul>
    </div>
    <div class="clinic-photos">${c.photos.map(fig).join("")}</div>
  </div>
</section>`;
}

function services(d) {
  const s = d.services;
  const L = d.lang;
  const card = (it, i) => {
    if (it.feature) {
      return `<li class="svc svc-feature" data-reveal>
        <div class="svc-feature-text">
          <span class="svc-badge">${icons.check}<span>${esc(s.featureBadge)}</span></span>
          <h4 class="svc-feature-t">${tx(it.t, L)}</h4>
          <p>${tx(it.d, L)}</p>
          <a class="btn btn-accent" href="#book" data-preset-topic="${it.topic}">${esc(s.more)}<span class="btn-arrow">${icons.arrow}</span></a>
        </div>
        ${implantArt}
      </li>`;
    }
    return `<li class="svc" data-reveal style="--reveal-delay:${Math.min(i, 6) * 60}ms">
      <span class="svc-ic" data-draw>${ic(it.icon, 28)}</span>
      <h4 class="svc-t">${tx(it.t, L)}</h4>
      <p>${tx(it.d, L)}</p>
      <a class="svc-link" href="#book" data-preset-topic="${it.topic}">${esc(s.more)}<span class="svc-arrow">${icons.arrow}</span></a>
    </li>`;
  };
  return `<section class="services section" id="services" aria-labelledby="services-title" data-tabs>
  <div class="wrap">
    <div class="sec-head">
      <div>
        <h2 class="h2" id="services-title" data-reveal="mask"><span class="mask-in">${tx(s.title, L)}</span></h2>
        <p class="lede" data-reveal>${tx(s.lede, L)}</p>
      </div>
      <div class="tabs" role="tablist" aria-label="${esc(s.title)}" data-tablist hidden>
        <span class="tabs-pill" aria-hidden="true" data-tabs-pill></span>
        <button class="tab" type="button" role="tab" id="tab-adults" aria-controls="panel-adults" aria-selected="true" data-tab="adults">${icons.heart}<span>${esc(s.adults)}</span></button>
        <button class="tab" type="button" role="tab" id="tab-kids" aria-controls="panel-kids" aria-selected="false" tabindex="-1" data-tab="kids">${icons.kid}<span>${esc(s.kids)}</span></button>
      </div>
    </div>
    <div class="svc-panel" id="panel-adults" role="tabpanel" aria-labelledby="tab-adults" data-panel="adults">
      <h3 class="group-title">${esc(s.adults)}</h3>
      <ul class="svc-grid svc-grid-adults">${s.adultItems.map(card).join("")}<li class="svc svc-kids-tile" data-reveal style="--reveal-delay:360ms">
        <span class="svc-ic" data-draw>${ic("kid", 28)}</span>
        <h4 class="svc-t">${tx(s.kidsTile.t, L)}</h4>
        <p>${tx(s.kidsTile.d, L)}</p>
        <a class="svc-link" href="#panel-kids" data-tab-go="kids">${esc(s.kidsTile.cta)}<span class="svc-arrow">${icons.arrow}</span></a>
      </li></ul>
    </div>
    <div class="svc-panel" id="panel-kids" role="tabpanel" aria-labelledby="tab-kids" data-panel="kids">
      <h3 class="group-title">${esc(s.kids)}</h3>
      <ul class="svc-grid svc-grid-kids">${s.kidItems.map(card).join("")}</ul>
    </div>
    <div class="consult" data-reveal>
      <span class="consult-ic">${ic("consult", 30)}</span>
      <div><h3 class="consult-t">${tx(s.consult.t, L)}</h3><p>${tx(s.consult.d, L)}</p></div>
      <a class="btn btn-ink" href="#book" data-preset-topic="5">${esc(s.consult.cta)}<span class="btn-arrow">${icons.arrow}</span></a>
    </div>
  </div>
</section>`;
}

// Иллюстрация к имплантации: коронка на винте, линии рисуются при появлении.
const implantArt = `<svg class="implant-art" viewBox="0 0 220 260" aria-hidden="true" focusable="false">
  <circle class="ia-glow" cx="110" cy="92" r="86"/>
  <path class="ia-line" pathLength="1" d="M52 74c0-30 20-44 40-38 8 2 12 7 18 7s10-5 18-7c20-6 40 8 40 38 0 20-10 32-20 38H72c-10-6-20-18-20-38Z"/>
  <path class="ia-line ia-shine" pathLength="1" d="M70 66c3-10 11-15 20-13"/>
  <path class="ia-line" pathLength="1" d="M88 112v14h44v-14"/>
  <path class="ia-line" pathLength="1" d="M90 126h40l-5 90h-30Z"/>
  <path class="ia-line" pathLength="1" d="M89 142l42-6M90 160l40-6M91 178l38-6M93 196l34-5"/>
  <path class="ia-line" pathLength="1" d="M97 216l13 20 13-20"/>
  <path class="ia-gum" d="M8 150c24-12 42 12 66 0s42 12 66 0 42 12 66 0"/>
</svg>`;

// Небо для каждой карточки времени: заранее нарисованная картинка, ничего не мигает.
const SKIES = [
  { top: "#f6dbe2", bottom: "#fdf0e8", deg: 30, body: "sun", lit: 0 },
  { top: "#a9d5f5", bottom: "#eaf5fd", deg: 92, body: "sun", lit: 0 },
  { top: "#9aa9d8", bottom: "#f3cfc6", deg: 158, body: "sun", lit: 0.5 },
  { top: "#0d1a36", bottom: "#1d2e55", deg: 118, body: "moon", lit: 1 },
];
const CITY =
  "M0 160V140h18v-10h22v10h16v-18h24v18h12v-13h26v13h15v-21h24v21h19v-12h24v12h16v-16h28v16h21v-8h20v8h24v-14h11V160Z";
const WINDOWS = [[22, 134], [30, 134], [60, 126], [68, 126], [60, 134], [98, 131], [122, 123], [130, 123], [122, 131], [160, 132], [184, 128], [190, 135], [220, 128], [228, 128], [250, 134], [292, 130], [300, 130]];
const STARS = [[30, 24, 1.2], [70, 46, 0.8], [112, 18, 1], [150, 54, 0.8], [196, 28, 1.3], [236, 50, 0.9], [270, 20, 1], [300, 58, 0.8], [58, 80, 0.7], [250, 86, 0.7]];

function skyArt(i) {
  const k = SKIES[i];
  const windows = WINDOWS.filter((_, n) => (k.lit === 1 ? true : k.lit > 0 ? n % 2 === 0 : false))
    .map(([x, y]) => `<rect x="${x}" y="${y}" width="4" height="5" rx="0.8"/>`)
    .join("");
  const stars = k.body === "moon" ? STARS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("") : "";
  const body =
    k.body === "sun"
      ? `<circle class="tsky-halo" cx="40" cy="160" r="22"/><circle class="tsky-sun" cx="40" cy="160" r="11"/>`
      : `<path class="tsky-moon" d="M42 147a13 13 0 1 0 7 21 10 10 0 1 1-7-21Z"/>`;
  return `<svg class="tsky" viewBox="0 0 320 180" aria-hidden="true" focusable="false">
    <defs><linearGradient id="tsky-${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${k.top}"/><stop offset="1" stop-color="${k.bottom}"/></linearGradient></defs>
    <rect width="320" height="180" fill="url(#tsky-${i})"/>
    ${stars ? `<g class="tsky-stars">${stars}</g>` : ""}
    <path class="tsky-arc" d="M40 160A120 120 0 0 1 280 160"/>
    <g class="tsky-body" style="--deg:${k.deg}deg">${body}</g>
    <path class="tsky-city" d="${CITY}"/>
    <rect class="tsky-city tsky-ground" x="0" y="160" width="320" height="20"/>
    ${windows ? `<g class="tsky-windows">${windows}</g>` : ""}
  </svg>`;
}

function dayScene(d) {
  const s = d.scene;
  const L = d.lang;
  return `<section class="times section" id="day" aria-labelledby="day-title">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <h2 class="h2" id="day-title" data-reveal="mask"><span class="mask-in">${tx(s.title, L)}</span></h2>
        <p class="lede" data-reveal>${tx(s.lede, L)}</p>
      </div>
    </div>
    <ol class="times-grid">${s.moments
      .map(
        (m, i) => `<li class="tcard${i === 3 ? " tcard-night" : ""}" data-reveal style="--reveal-delay:${i * 90}ms">
        ${skyArt(i)}
        <div class="tcard-body">
          <p class="tcard-time"><span class="tcard-ic">${ic(m.icon, 18)}</span>${esc(m.time)}</p>
          <h3 class="tcard-t">${tx(m.t, L)}</h3>
          <p class="tcard-d">${tx(m.d, L)}</p>
          <a class="tcard-link" href="#book" data-preset-time="${m.chip}">${esc(s.cardCta)}<span class="svc-arrow">${icons.arrow}</span></a>
        </div>
      </li>`
      )
      .join("")}</ol>
  </div>
</section>`;
}

function book(d) {
  const b = d.book;
  const c = b.composer;
  const L = d.lang;
  const chips = (name, list, iconsList, label) =>
    `<fieldset class="chips"><legend>${esc(label)}</legend><div class="chips-row">${list
      .map(
        (v, i) =>
          `<label class="chip"><input type="radio" name="${name}" value="${i}"${name === "time" && i === 0 ? " checked" : ""}><span>${ic(iconsList[i], 16)}${esc(v)}</span></label>`
      )
      .join("")}</div></fieldset>`;
  const initials = business.doctor.name.split(/\s+/).map((w) => w[0]).join("");
  return `<section class="book section" id="book" aria-labelledby="book-title">
  <div class="wrap book-in">
    <div class="book-side">
      <h2 class="h2" id="book-title" data-reveal="mask"><span class="mask-in">${tx(b.title, L)}</span></h2>
      <p class="lede" data-reveal>${tx(b.lede, L)}</p>
      <div class="steps-wrap" data-steps>
      <span class="steps-line" aria-hidden="true"><span data-steps-line></span></span>
      <ol class="steps">
        ${b.steps
          .map(
            (s, i) =>
              `<li class="step" data-reveal style="--reveal-delay:${i * 90}ms"><span class="step-ic">${ic(s.icon, 22)}<span class="step-n">${i + 1}</span></span><div><h3 class="step-t">${tx(s.t, L)}</h3><p>${tx(s.d, L)}</p></div></li>`
          )
          .join("")}
      </ol>
      </div>
    </div>
    <div class="chat" data-composer data-reveal
      data-greeting="${esc(c.greeting)}" data-topic-prefix="${esc(c.topicPrefix)}" data-time-prefix="${esc(c.timePrefix)}"
      data-times='${esc(JSON.stringify(c.times))}' data-topics='${esc(JSON.stringify(c.topics))}'
      data-tg="${business.telegram}" data-wa="${business.whatsapp}">
      <div class="chat-head">
        <span class="chat-ava" aria-hidden="true">${esc(initials)}<span class="chat-online"></span></span>
        <div class="chat-who"><p class="chat-name" lang="uz">${esc(business.doctor.name)}</p><p class="chat-sub">@${esc(business.telegram)} · ${esc(c.chatSub)}</p></div>
        <span class="chat-status">${icons.clock24}<span>${esc(c.chatStatus)}</span></span>
      </div>
      <div class="chat-body">
        <div class="bubble" data-bubble><output class="bubble-text" data-msg aria-live="polite">${esc(c.greeting)}</output><span class="bubble-tail" aria-hidden="true"></span></div>
      </div>
      <div class="chat-controls">
        <p class="chat-title">${esc(c.title)}</p>
        ${chips("time", c.times, c.timeIcons, c.timeLabel)}
        ${chips("topic", c.topics, c.topicIcons, c.topicLabel)}
      </div>
      <div class="chat-actions">
        <a class="btn btn-accent btn-lg chat-send" href="${tgUser(c.greeting)}" target="_blank" rel="noopener" data-send="tg" data-track="telegram">${icons.telegram}<span>${esc(c.telegram)}</span></a>
        <a class="btn btn-line" href="${waLink(c.greeting)}" target="_blank" rel="noopener" data-send="wa" data-track="whatsapp">${icons.whatsapp}<span>${esc(c.whatsapp)}</span></a>
        <a class="btn btn-line" href="${telHref(mainPhone)}" data-track="phone">${icons.phone}<span>${esc(c.call)}</span></a>
      </div>
      <p class="chat-hint">${tx(c.hint, L)}</p>
    </div>
  </div>
</section>`;
}

function doctor(d) {
  const doc = d.doctor;
  const L = d.lang;
  const initials = business.doctor.name.split(/\s+/).map((w) => w[0]).join("");
  const ring = Array.from({ length: 48 }, (_, i) => {
    const a = (i / 48) * Math.PI * 2;
    const r1 = 97, r2 = i % 12 === 0 ? 86 : i % 2 === 0 ? 91 : 94;
    const p = (r) => [100 + r * Math.sin(a), 100 - r * Math.cos(a)].map((n) => Math.round(n * 10) / 10);
    const [x1, y1] = p(r1), [x2, y2] = p(r2);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  }).join("");
  const photo = business.doctor.photo
    ? `<img class="doctor-photo" src="${business.doctor.photo}" alt="${esc(business.doctor.name)}" width="400" height="400" loading="lazy" decoding="async">`
    : `<span class="doctor-initials" aria-hidden="true">${esc(initials)}</span>`;
  const skillIcons = ["implant", "crown", "veneer", "extract"];
  return `<section class="doctor section" id="doctor" aria-labelledby="doctor-title">
  <div class="wrap doctor-in">
    <div class="doctor-plate" data-reveal>
      <svg class="doctor-ring" viewBox="0 0 200 200" aria-hidden="true" focusable="false" data-spin>${ring}</svg>
      <div class="doctor-disc">${photo}</div>
      <span class="doctor-sun" aria-hidden="true"></span>
    </div>
    <div class="doctor-text">
      <h2 class="eyebrow" id="doctor-title">${esc(doc.title)}</h2>
      <p class="doctor-name" lang="uz" data-reveal="mask"><span class="mask-in">${esc(business.doctor.name)}</span></p>
      <p class="doctor-role">${tx(doc.role, L)}</p>
      <dl class="stats">${doc.stats
        .map(
          (s) =>
            `<div class="stat" data-reveal><dt class="stat-l">${esc(s.l)}</dt><dd class="stat-n"><span${/^\d+$/.test(s.n) ? ` data-count="${s.n}"` : ""}>${esc(s.n)}</span>${s.u ? `<small>${esc(s.u)}</small>` : ""}</dd></div>`
        )
        .join("")}</dl>
      <ul class="skills">${doc.skills.map((s, i) => `<li>${ic(skillIcons[i], 18)}<span>${esc(s)}</span></li>`).join("")}</ul>
      <figure class="doctor-quote" data-reveal>
        <blockquote><p>${tx(doc.quote, L)}</p></blockquote>
        <figcaption>${esc(doc.quoteSource)}</figcaption>
      </figure>
      <div class="doctor-links">
        <a class="btn btn-accent" href="${tgUser(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="telegram">${icons.telegram}<span>${esc(doc.telegram)}</span></a>
        <a class="btn btn-line" href="${igLink(business.instagramDoctor)}" target="_blank" rel="noopener">${icons.instagram}<span>${esc(doc.instagram)}</span></a>
      </div>
    </div>
  </div>
</section>`;
}

function kids(d) {
  const k = d.kids;
  const L = d.lang;
  const pIcons = ["kid", "microscope", "aligner"];
  return `<section class="kids section" id="kids" aria-labelledby="kids-title">
  <div class="wrap kids-in">
    <div class="kids-head">
      <h2 class="h2" id="kids-title" data-reveal="mask"><span class="mask-in">${tx(k.title, L)}</span></h2>
      <ul class="kids-points">${k.points.map((p, i) => `<li data-reveal style="--reveal-delay:${i * 80}ms"><span class="kp-ic">${ic(pIcons[i], 22)}</span>${tx(p, L)}</li>`).join("")}</ul>
      <p class="lede">${tx(k.lede, L)}</p>
      <a class="btn btn-accent" href="#book" data-preset-topic="4">${icons.kid}<span>${esc(k.cta)}</span></a>
    </div>
    <figure class="review" data-reveal>
      <span class="review-stars" aria-label="5/5">${icons.star.repeat(5)}</span>
      <blockquote lang="ru"><p>«${tx(k.review, "ru")}»</p></blockquote>
      <figcaption><span class="review-src">${ic("chat", 18)}${esc(k.reviewMeta)}</span><a href="${business.links.gisReviews}" target="_blank" rel="noopener">${esc(k.reviewLink)}<span class="svc-arrow">${icons.arrow}</span></a></figcaption>
    </figure>
  </div>
</section>`;
}

function faq(d) {
  const f = d.faq;
  const L = d.lang;
  return `<section class="faq section" id="faq" aria-labelledby="faq-title">
  <div class="wrap faq-in">
    <div class="faq-side">
      <h2 class="h2" id="faq-title" data-reveal="mask"><span class="mask-in">${tx(f.title, L)}</span></h2>
      <div class="faq-aside" data-reveal>
        <span class="faq-aside-ic">${ic("chat", 26)}</span>
        <p class="faq-aside-t">${tx(f.aside.t, L)}</p>
        <p>${tx(f.aside.d, L)}</p>
        <div class="faq-aside-cta">
          <a class="btn btn-accent" href="${tgUser(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="telegram">${icons.telegram}<span>Telegram</span></a>
          <a class="btn btn-line" href="${telHref(mainPhone)}" data-track="phone">${icons.phone}<span>${esc(d.final.call)}</span></a>
        </div>
      </div>
    </div>
    <div class="faq-list">${f.items
      .map(
        (it, i) =>
          `<details class="qa" data-reveal style="--reveal-delay:${Math.min(i, 5) * 50}ms"><summary><span>${tx(it.q, L)}</span><span class="qa-mark" aria-hidden="true"></span></summary><div class="qa-a"><p>${tx(it.a, L)}</p></div></details>`
      )
      .join("")}</div>
  </div>
</section>`;
}

function visit(d, base) {
  const v = d.visit;
  const L = d.lang;
  const phones = business.phones
    .map((p) => `<li><a href="${telHref(p)}" data-track="phone"><span class="cl-ic">${icons.phone}</span><span>${esc(p.display)}</span></a></li>`)
    .join("");
  return `<section class="visit section" id="contacts" aria-labelledby="visit-title">
  <div class="wrap visit-in">
    <div class="visit-info">
      <h2 class="h2" id="visit-title" data-reveal="mask"><span class="mask-in">${tx(v.title, L)}</span></h2>
      <address class="visit-address">
        <span class="visit-pin">${ic("pin", 24)}</span>
        <span><span class="visit-street">${tx(v.address, L)}</span><span class="visit-more">${tx(v.addressMore, L)}</span><span class="visit-landmark">${tx(v.landmark, L)}</span></span>
      </address>
      <dl class="visit-rows">${v.rows.map((r) => `<div><dt>${ic(r.icon, 20)}<span>${esc(r.k)}</span></dt><dd>${tx(r.v, L)}</dd></div>`).join("")}</dl>
      <p class="visit-label">${esc(v.routes)}</p>
      <div class="routes">
        <a class="btn btn-line btn-sm" href="${business.links.yandexRoute}" target="_blank" rel="noopener" data-track="route">${icons.route}<span>${esc(v.routeYandex)}</span></a>
        <a class="btn btn-line btn-sm" href="${business.links.gisRoute}" target="_blank" rel="noopener" data-track="route">${icons.route}<span>${esc(v.routeGis)}</span></a>
        <a class="btn btn-line btn-sm" href="${business.links.googleRoute}" target="_blank" rel="noopener" data-track="route">${icons.route}<span>${esc(v.routeGoogle)}</span></a>
      </div>
      <div class="visit-contacts">
        <div><p class="visit-label">${esc(v.phones)}</p><ul class="contact-list">${phones}</ul></div>
        <div><p class="visit-label">${esc(v.messengers)}</p><ul class="contact-list">
          <li><a href="${tgUser(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="telegram"><span class="cl-ic">${icons.telegram}</span><span>${esc(v.telegram)}</span></a></li>
          <li><a href="${waLink(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="whatsapp"><span class="cl-ic">${icons.whatsapp}</span><span>WhatsApp</span></a></li>
          <li><a href="https://t.me/${business.telegramChannel}" target="_blank" rel="noopener"><span class="cl-ic">${icons.telegram}</span><span>${esc(v.channel)}</span></a></li>
          <li><a href="${igLink(business.instagram)}" target="_blank" rel="noopener"><span class="cl-ic">${icons.instagram}</span><span>${esc(v.instagram)}</span></a></li>
        </ul></div>
      </div>
    </div>
    <div class="visit-media">
    <figure class="visit-door" data-reveal>
      <button class="photo-btn" type="button" data-zoom="${base}img/entrance-door-1200.webp" data-alt="${esc(v.door.alt)}" aria-label="${esc(d.clinic.zoom)}">
        <img src="${base}img/entrance-door-600.webp" srcset="${base}img/entrance-door-600.webp 600w, ${base}img/entrance-door-1200.webp 1200w" sizes="(max-width: 960px) 100vw, 44vw" width="1200" height="900" alt="${esc(v.door.alt)}" loading="lazy" decoding="async">
      </button>
      <figcaption>${tx(v.door.cap, L)}</figcaption>
    </figure>
    <div class="map" data-map data-src="${business.links.yandexWidget}" data-title="${esc(v.mapTitle)}" data-reveal>
      <div class="map-ph">
        <svg class="map-art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <g class="map-grid"><path d="M0 60h400M0 150h400M0 240h400M70 0v300M190 0v300M310 0v300"/></g>
          <path d="M-10 290 410 10" class="map-road"/><path d="M0 120c80 10 130 60 200 30s150-20 200 10" class="map-road map-road-2"/>
          <circle cx="200" cy="150" r="60" class="map-ring"/><circle cx="200" cy="150" r="22" class="map-pulse"/>
          <circle cx="200" cy="150" r="9" class="map-pin"/>
        </svg>
        <button class="btn btn-ink" type="button" data-map-load>${icons.pin}<span>${esc(v.mapShow)}</span></button>
        <p class="map-note">${tx(v.mapNote, L)}</p>
      </div>
    </div>
    </div>
  </div>
</section>`;
}

function finalCta(d) {
  const f = d.final;
  const L = d.lang;
  const other = business.phones.filter((p) => !p.main);
  return `<section class="final" aria-labelledby="final-title">
  <svg class="final-arc" viewBox="0 0 1000 500" aria-hidden="true" focusable="false" data-rise><path d="M60 500A440 440 0 0 1 940 500"/><circle cx="500" cy="60" r="18"/></svg>
  <div class="wrap final-in">
    <h2 class="h2" id="final-title" data-reveal="mask"><span class="mask-in">${tx(f.title, L)}</span></h2>
    <p class="lede">${tx(f.lede, L)}</p>
    <a class="final-phone" href="${telHref(mainPhone)}" data-track="phone">${esc(mainPhone.display)}</a>
    <div class="final-cta">
      <a class="btn btn-final btn-lg" href="${telHref(mainPhone)}" data-track="phone">${icons.phone}<span>${esc(f.call)}</span></a>
      <a class="btn btn-final-line btn-lg" href="${tgUser(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="telegram">${icons.telegram}<span>${esc(f.write)}</span></a>
    </div>
    <p class="final-more">${other.map((p) => `<a href="${telHref(p)}" data-track="phone">${esc(p.display)}</a>`).join(" ")}</p>
  </div>
</section>`;
}

function footer(d, base) {
  const f = d.footer;
  const L = d.lang;
  return `<footer class="ftr">
  <div class="wrap ftr-in">
    <div class="ftr-brand">
      <a class="logo" href="#top">${logoMark}<span class="logo-word">Dent Up</span></a>
      <p>${tx(f.about, L)}</p>
    </div>
    <ul class="ftr-nav">${d.nav.map((n) => `<li><a href="#${n.id}">${esc(n.label)}</a></li>`).join("")}</ul>
    <ul class="ftr-social">
      <li><a href="${igLink(business.instagram)}" target="_blank" rel="noopener">${icons.instagram}<span>Instagram</span></a></li>
      <li><a href="https://t.me/${business.telegramChannel}" target="_blank" rel="noopener">${icons.telegram}<span>Telegram</span></a></li>
      <li><a href="${business.links.gis}" target="_blank" rel="noopener">${icons.pin}<span>2GIS</span></a></li>
      <li><a href="${d.other.path}" hreflang="${d.other.lang}" lang="${d.other.lang}" data-lang-link>${icons.chat}<span>${esc(d.other.label)}</span></a></li>
    </ul>
    <div class="ftr-legal">
      <p class="ftr-warning">${tx(f.warning, L)}</p>
      <p>${tx(f.note, L)}</p>
      <p>© ${new Date().getFullYear()} Dent Up</p>
    </div>
  </div>
</footer>
<div class="callbar" data-callbar>
  <a class="btn btn-accent" href="${telHref(mainPhone)}" data-track="phone">${icons.phone}<span>${esc(d.callbar.call)}</span></a>
  <a class="btn btn-line" href="${tgUser(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="telegram">${icons.telegram}<span>${esc(d.callbar.write)}</span></a>
</div>`;
}

function structuredData(d, site) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: business.name,
    description: d.meta.description,
    telephone: mainPhone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      postalCode: business.address.postal,
      addressCountry: "UZ",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.address.lat, longitude: business.address.lon },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    paymentAccepted: "Cash, Credit Card",
    sameAs: [igLink(business.instagram), `https://t.me/${business.telegramChannel}`, business.links.gis],
  };
  if (site.url) {
    data.url = site.url + d.path;
    data.image = `${site.url}og/og-${d.lang}.png`;
  }
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

export function renderHome(d, site) {
  const base = d.lang === "ru" ? "" : "../";
  return `<!doctype html>
<html lang="${d.lang}">
${head(d, site, { base, path: d.path, title: d.meta.title, description: d.meta.description })}
<body>
<a class="skip" href="#main">${esc(d.skip)}</a>
${header(d, base)}
<main id="main">
${hero(d)}
${benefits(d)}
${marquee(d)}
${clinic(d, base)}
${services(d)}
${dayScene(d)}
${book(d)}
${doctor(d)}
${kids(d)}
${faq(d)}
${visit(d, base)}
${finalCta(d)}
</main>
${footer(d, base)}
<dialog class="lightbox" data-lightbox aria-label="${esc(d.clinic.zoom)}">
  <button class="icon-btn lightbox-close" type="button" data-lightbox-close aria-label="${esc(d.clinic.close)}">${icons.close}</button>
</dialog>
${structuredData(d, site)}
<script src="${base}assets/site.js?v=${site.version}" defer></script>
</body>
</html>
`;
}

export function render404(ru, uz, site) {
  // 404 открывается по любому адресу, поэтому ссылки абсолютные: от корня сайта или от его подпапки (GitHub Pages).
  const base = site.url ? new URL(site.url).pathname : "/";
  return `<!doctype html>
<html lang="ru">
${head(ru, site, { base, path: "404.html", title: `${ru.notFound.title} — Dent Up`, description: ru.meta.description, noindex: true })}
<body class="nf">
<main class="nf-main wrap" id="main">
  <a class="logo" href="${base}">${logoMark}<span class="logo-word">Dent Up</span></a>
  <svg class="nf-art" viewBox="0 40 1000 470" aria-hidden="true" focusable="false"><path class="dial-track" d="M60 500A440 440 0 0 1 940 500" pathLength="1" style="stroke-dasharray:.012 .012"/><line class="dial-horizon" x1="0" y1="500" x2="1000" y2="500"/></svg>
  <h1 class="h2">${tx(ru.notFound.title, "ru")}</h1>
  <p class="lede">${tx(ru.notFound.text, "ru")}</p>
  <p class="lede" lang="uz">${tx(uz.notFound.title, "uz")}. ${tx(uz.notFound.text, "uz")}</p>
  <div class="hero-cta">
    <a class="btn btn-accent" href="${base}">${esc(ru.notFound.home)}</a>
    <a class="btn btn-line" href="${telHref(mainPhone)}">${icons.phone}<span>${esc(mainPhone.display)}</span></a>
    <a class="btn btn-line" href="${base}uz/" lang="uz">${esc(uz.notFound.home)}</a>
  </div>
</main>
<script src="${base}assets/site.js?v=${site.version}" defer></script>
</body>
</html>
`;
}

// Шаблон картинки для соцсетей 1200×630 (снимается scripts/og.mjs).
export function renderOg(d) {
  return `<!doctype html>
<html lang="${d.lang}" data-theme="night" class="og">
<head><meta charset="utf-8">
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="../assets/site.css"></head>
<body class="og-body">
  <div class="og-card">
    <div class="og-top"><span class="logo">${logoMark}<span class="logo-word">Dent Up</span></span><span class="og-phone">${esc(mainPhone.display)}</span></div>
    <p class="og-title">${d.hero.title.map((l) => tx(l, d.lang)).join("<br>")}</p>
    <p class="og-sub">${tx(d.visit.address, d.lang)}<br>${tx(d.visit.rows[0].v, d.lang)}</p>
    <div class="og-dial">${renderDial(d.hero)}</div>
  </div>
</body></html>`;
}

export { THEME_COLORS };
