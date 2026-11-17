// Разметка страниц. Тексты приходят из словаря, факты — из src/content/business.mjs.
import { business, mainPhone, telHref } from "../content/business.mjs";
import { esc, t as tx } from "./typo.mjs";
import { icons, logoMark } from "./icons.mjs";
import { renderDial } from "./dial.mjs";

const tgUser = (text) => `https://t.me/${business.telegram}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
const waLink = (text) => `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
const igLink = (u) => `https://www.instagram.com/${u}/`;

const THEME_COLORS = { day: "#eeeaf0", night: "#1a1320" };

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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=Unbounded:wght@200;300;500&display=swap">
<link rel="stylesheet" href="${base}assets/site.css?v=${site.version}">
<script>${headScript}</script>
</head>`;
}

function header(d, base) {
  const nav = d.nav.map((n) => `<li><a href="#${n.id}">${esc(n.label)}</a></li>`).join("");
  return `<header class="hdr" data-hdr>
  <div class="hdr-in wrap">
    <a class="logo" href="${base}${d.path}#top" aria-label="Dent Up">${logoMark}<span class="logo-word">Dent Up</span></a>
    <nav class="hdr-nav" aria-label="${esc(d.menu.open)}"><ul>${nav}</ul></nav>
    <div class="hdr-tools">
      <button class="icon-btn theme-btn" type="button" data-theme-toggle data-to-day="${esc(d.theme.toDay)}" data-to-night="${esc(d.theme.toNight)}" aria-label="${esc(d.theme.toNight)}">
        <span class="theme-ico theme-ico-sun">${icons.sun}</span><span class="theme-ico theme-ico-moon">${icons.moon}</span>
      </button>
      <a class="lang-link" href="${base}${d.other.path}" hreflang="${d.other.lang}" lang="${d.other.lang}" data-lang-link aria-label="${esc(d.langSwitch)}">${d.other.short}</a>
      <a class="hdr-phone" href="${telHref(mainPhone)}" data-track="phone">${icons.phone}<span>${esc(mainPhone.display)}</span></a>
      <button class="icon-btn menu-btn" type="button" data-menu-open aria-label="${esc(d.menu.open)}" aria-haspopup="dialog">${icons.menu}</button>
    </div>
  </div>
</header>
<dialog class="menu" data-menu aria-label="${esc(d.menu.open)}">
  <div class="menu-top"><span class="logo">${logoMark}<span class="logo-word">Dent Up</span></span><button class="icon-btn" type="button" data-menu-close aria-label="${esc(d.menu.close)}">${icons.close}</button></div>
  <ul class="menu-list">${d.nav.map((n) => `<li><a href="#${n.id}" data-menu-link>${esc(n.label)}</a></li>`).join("")}</ul>
  <div class="menu-foot">
    <a class="btn btn-sun" href="${telHref(mainPhone)}">${icons.phone}<span>${esc(mainPhone.display)}</span></a>
    <a class="lang-link" href="${base}${d.other.path}" hreflang="${d.other.lang}" lang="${d.other.lang}" data-lang-link>${esc(d.other.label)}</a>
  </div>
</dialog>`;
}

function hero(d) {
  const h = d.hero;
  const L = d.lang;
  return `<section class="hero" id="top" aria-labelledby="hero-title">
  <div class="hero-in wrap">
    <h1 class="hero-title" id="hero-title">${h.title.map((line, i) => `<span class="hero-line" style="--o:${i}">${tx(line, L)}</span>`).join(" ")}</h1>
    <p class="hero-lede">${tx(h.lede, L)}</p>
    <div class="hero-cta">
      <a class="btn btn-sun" href="${telHref(mainPhone)}" data-track="phone">${icons.phone}<span>${esc(h.call)}</span></a>
      <a class="btn btn-line" href="${tgUser(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="telegram">${icons.telegram}<span>${esc(h.write)}</span></a>
    </div>
  </div>
  <div class="hero-dial wrap">${renderDial(h)}</div>
</section>
<section class="facts" aria-label="Dent Up">
  <dl class="facts-in wrap">${d.facts.map((f) => `<div class="fact"><dt>${esc(f.k)}</dt><dd>${tx(f.v, L)}</dd></div>`).join("")}</dl>
</section>`;
}

function book(d) {
  const b = d.book;
  const c = b.composer;
  const L = d.lang;
  const chips = (name, list, label) =>
    `<fieldset class="chips"><legend>${esc(label)}</legend><div class="chips-row">${list
      .map(
        (v, i) =>
          `<label class="chip"><input type="radio" name="${name}" value="${i}"${name === "time" && i === 0 ? " checked" : ""}><span>${esc(v)}</span></label>`
      )
      .join("")}</div></fieldset>`;
  return `<section class="book section" id="book" aria-labelledby="book-title">
  <div class="wrap">
    <div class="book-head">
      <h2 class="h2" id="book-title">${tx(b.title, L)}</h2>
      <p class="lede">${tx(b.lede, L)}</p>
    </div>
    <ol class="steps">${b.steps
      .map(
        (s, i) =>
          `<li class="step" data-reveal style="--reveal-delay:${i * 70}ms"><span class="step-n" aria-hidden="true">${i + 1}</span><h3 class="h3">${tx(s.t, L)}</h3><p>${tx(s.d, L)}</p></li>`
      )
      .join("")}</ol>
    <div class="composer" data-composer
      data-greeting="${esc(c.greeting)}" data-topic-prefix="${esc(c.topicPrefix)}" data-time-prefix="${esc(c.timePrefix)}"
      data-times='${esc(JSON.stringify(c.times))}' data-topics='${esc(JSON.stringify(c.topics))}'
      data-tg="${business.telegram}" data-wa="${business.whatsapp}">
      <div class="composer-form">
        <h3 class="h3">${tx(c.title, L)}</h3>
        ${chips("time", c.times, c.timeLabel)}
        ${chips("topic", c.topics, c.topicLabel)}
      </div>
      <div class="composer-out">
        <p class="composer-label" id="msg-label">${esc(c.previewLabel)}</p>
        <output class="composer-msg" aria-labelledby="msg-label" data-msg>${esc(c.greeting)}</output>
        <div class="composer-actions">
          <a class="btn btn-sun" href="${tgUser(c.greeting)}" target="_blank" rel="noopener" data-send="tg" data-track="telegram">${icons.telegram}<span>${esc(c.telegram)}</span></a>
          <a class="btn btn-line" href="${waLink(c.greeting)}" target="_blank" rel="noopener" data-send="wa" data-track="whatsapp">${icons.whatsapp}<span>${esc(c.whatsapp)}</span></a>
        </div>
        <p class="composer-hint">${tx(c.hint, L)}</p>
        <p class="composer-call">${esc(c.call)}: <a href="${telHref(mainPhone)}" data-track="phone">${esc(mainPhone.display)}</a></p>
      </div>
    </div>
  </div>
</section>`;
}

function services(d) {
  const s = d.services;
  const L = d.lang;
  const tile = (it, i) =>
    `<li class="tile${it.feature ? " tile-feature" : ""}" data-reveal style="--reveal-delay:${Math.min(i, 5) * 50}ms"><h4 class="h3">${tx(it.t, L)}</h4><p>${tx(it.d, L)}</p></li>`;
  return `<section class="services section" id="services" aria-labelledby="services-title">
  <div class="wrap services-in">
    <div class="services-head">
      <h2 class="h2" id="services-title">${tx(s.title, L)}</h2>
      <p class="lede">${tx(s.lede, L)}</p>
      <p class="services-note">${tx(s.priceNote, L)}</p>
    </div>
    <div class="services-body">
      <h3 class="group-title">${esc(s.adults)}</h3>
      <ul class="tiles">${s.adultItems.map(tile).join("")}<li class="tile tile-consult" data-reveal style="--reveal-delay:250ms"><h4 class="h3">${tx(s.consult.t, L)}</h4><p>${tx(s.consult.d, L)}</p><a class="btn btn-sun btn-sm" href="#book" data-preset-topic="5">${esc(s.consult.cta)}</a></li></ul>
      <h3 class="group-title" id="kids-services">${esc(s.kids)}</h3>
      <ul class="tiles tiles-kids">${s.kidItems.map(tile).join("")}</ul>
    </div>
  </div>
</section>`;
}

function doctor(d) {
  const doc = d.doctor;
  const L = d.lang;
  const initials = business.doctor.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("");
  const ring = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r1 = 96, r2 = i % 6 === 0 ? 86 : 91;
    const p = (r) => [100 + r * Math.sin(a), 100 - r * Math.cos(a)].map((n) => Math.round(n * 10) / 10);
    const [x1, y1] = p(r1), [x2, y2] = p(r2);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  }).join("");
  const photo = business.doctor.photo
    ? `<img class="doctor-photo" src="${business.doctor.photo}" alt="${esc(business.doctor.name)}" width="400" height="400" loading="lazy" decoding="async">`
    : `<span class="doctor-initials" aria-hidden="true">${esc(initials)}</span>`;
  return `<section class="doctor section" id="doctor" aria-labelledby="doctor-title">
  <div class="wrap doctor-in">
    <div class="doctor-plate" data-reveal>
      <svg class="doctor-ring" viewBox="0 0 200 200" aria-hidden="true" focusable="false">${ring}</svg>
      <div class="doctor-disc">${photo}</div>
    </div>
    <div class="doctor-text">
      <h2 class="h2-small" id="doctor-title">${esc(doc.title)}</h2>
      <p class="doctor-name" lang="uz">${esc(business.doctor.name)}</p>
      <p class="doctor-role">${tx(doc.role, L)}</p>
      <dl class="doctor-facts">${doc.facts.map((f) => `<div><dt>${esc(f.k)}</dt><dd>${tx(f.v, L)}</dd></div>`).join("")}</dl>
      <figure class="doctor-quote">
        <blockquote><p>${tx(doc.quote, L)}</p></blockquote>
        <figcaption>${esc(doc.quoteSource)}</figcaption>
      </figure>
      <div class="doctor-links">
        <a class="link" href="${igLink(business.instagramDoctor)}" target="_blank" rel="noopener">${icons.instagram}<span>${esc(doc.instagram)}</span></a>
        <a class="link" href="${tgUser(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="telegram">${icons.telegram}<span>${esc(doc.telegram)}</span></a>
      </div>
    </div>
  </div>
</section>`;
}

function kids(d) {
  const k = d.kids;
  const L = d.lang;
  return `<section class="kids section" id="kids" aria-labelledby="kids-title">
  <div class="wrap kids-in">
    <div class="kids-head">
      <h2 class="h2" id="kids-title">${tx(k.title, L)}</h2>
      <p class="lede">${tx(k.lede, L)}</p>
      <a class="btn btn-line" href="#book" data-preset-topic="4">${esc(k.cta)}</a>
    </div>
    <figure class="review" data-reveal>
      <svg class="review-arc" viewBox="0 0 200 104" aria-hidden="true" focusable="false"><path d="M8 100a92 92 0 0 1 184 0"/><circle cx="54" cy="25" r="7"/></svg>
      <blockquote lang="ru"><p>«${tx(k.review, "ru")}»</p></blockquote>
      <figcaption><span>${esc(k.reviewMeta)}</span> <a href="${business.links.gisReviews}" target="_blank" rel="noopener">${esc(k.reviewLink)}</a></figcaption>
    </figure>
  </div>
</section>`;
}

function faq(d) {
  const f = d.faq;
  const L = d.lang;
  return `<section class="faq section" id="faq" aria-labelledby="faq-title">
  <div class="wrap faq-in">
    <h2 class="h2" id="faq-title">${tx(f.title, L)}</h2>
    <div class="faq-list">${f.items
      .map(
        (it) =>
          `<details class="qa"><summary><span>${tx(it.q, L)}</span><span class="qa-mark" aria-hidden="true"></span></summary><div class="qa-a"><p>${tx(it.a, L)}</p></div></details>`
      )
      .join("")}</div>
  </div>
</section>`;
}

function visit(d) {
  const v = d.visit;
  const L = d.lang;
  const phones = business.phones
    .map((p) => `<li><a href="${telHref(p)}" data-track="phone">${icons.phone}<span>${esc(p.display)}</span></a></li>`)
    .join("");
  return `<section class="visit section" id="contacts" aria-labelledby="visit-title">
  <div class="wrap visit-in">
    <div class="visit-info">
      <h2 class="h2" id="visit-title">${tx(v.title, L)}</h2>
      <address class="visit-address">
        <span class="visit-street">${tx(v.address, L)}</span>
        <span class="visit-more">${tx(v.addressMore, L)}</span>
      </address>
      <p class="visit-landmark">${tx(v.landmark, L)}</p>
      <dl class="visit-rows">${v.rows.map((r) => `<div><dt>${esc(r.k)}</dt><dd>${tx(r.v, L)}</dd></div>`).join("")}</dl>
      <p class="visit-label">${esc(v.routes)}</p>
      <div class="routes">
        <a class="btn btn-line btn-sm" href="${business.links.yandexRoute}" target="_blank" rel="noopener" data-track="route">${icons.route}<span>${esc(v.routeYandex)}</span></a>
        <a class="btn btn-line btn-sm" href="${business.links.gisRoute}" target="_blank" rel="noopener" data-track="route">${icons.route}<span>${esc(v.routeGis)}</span></a>
        <a class="btn btn-line btn-sm" href="${business.links.googleRoute}" target="_blank" rel="noopener" data-track="route">${icons.route}<span>${esc(v.routeGoogle)}</span></a>
      </div>
      <div class="visit-contacts">
        <div><p class="visit-label">${esc(v.phones)}</p><ul class="contact-list">${phones}</ul></div>
        <div><p class="visit-label">${esc(v.messengers)}</p><ul class="contact-list">
          <li><a href="${tgUser(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="telegram">${icons.telegram}<span>${esc(v.telegram)}</span></a></li>
          <li><a href="${waLink(d.book.composer.greeting)}" target="_blank" rel="noopener" data-track="whatsapp">${icons.whatsapp}<span>WhatsApp</span></a></li>
          <li><a href="https://t.me/${business.telegramChannel}" target="_blank" rel="noopener">${icons.telegram}<span>${esc(v.channel)}</span></a></li>
          <li><a href="${igLink(business.instagram)}" target="_blank" rel="noopener">${icons.instagram}<span>${esc(v.instagram)}</span></a></li>
        </ul></div>
      </div>
    </div>
    <div class="map" data-map data-src="${business.links.yandexWidget}" data-title="${esc(v.mapTitle)}">
      <div class="map-ph">
        <svg class="map-art" viewBox="0 0 400 300" aria-hidden="true" focusable="false">
          <g class="map-grid"><path d="M0 60h400M0 150h400M0 240h400M70 0v300M190 0v300M310 0v300"/><path d="M0 300 400 0" class="map-road"/><circle cx="200" cy="150" r="64" class="map-ring"/></g>
          <circle cx="200" cy="150" r="9" class="map-pin"/>
        </svg>
        <button class="btn btn-line" type="button" data-map-load>${icons.pin}<span>${esc(v.mapShow)}</span></button>
        <p class="map-note">${tx(v.mapNote, L)}</p>
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
  <div class="wrap final-in">
    <h2 class="h2" id="final-title">${tx(f.title, L)}</h2>
    <p class="lede">${tx(f.lede, L)}</p>
    <a class="final-phone" href="${telHref(mainPhone)}" data-track="phone">${esc(mainPhone.display)}</a>
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
      <li><a href="${igLink(business.instagram)}" target="_blank" rel="noopener">Instagram</a></li>
      <li><a href="https://t.me/${business.telegramChannel}" target="_blank" rel="noopener">Telegram</a></li>
      <li><a href="${business.links.gis}" target="_blank" rel="noopener">2GIS</a></li>
      <li><a href="${base}${d.other.path}" hreflang="${d.other.lang}" lang="${d.other.lang}" data-lang-link>${esc(d.other.label)}</a></li>
    </ul>
    <div class="ftr-legal">
      <p class="ftr-warning">${tx(f.warning, L)}</p>
      <p>${tx(f.note, L)}</p>
      <p>© ${new Date().getFullYear()} Dent Up</p>
    </div>
  </div>
</footer>
<div class="callbar" data-callbar>
  <a class="btn btn-sun" href="${telHref(mainPhone)}" data-track="phone">${icons.phone}<span>${esc(d.callbar.call)}</span></a>
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
${book(d)}
${services(d)}
${doctor(d)}
${kids(d)}
${faq(d)}
${visit(d)}
${finalCta(d)}
</main>
${footer(d, base)}
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
    <a class="btn btn-sun" href="${base}">${esc(ru.notFound.home)}</a>
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=Unbounded:wght@200;300;500&display=swap">
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
