// Dent Up: часы Ташкента, тема, сцена «сутки» при прокрутке, вкладки услуг, чат записи, счётчики, бегущая строка.
// Контент виден и работает без скрипта; скрипт только оживляет. В режиме «меньше движения» движение не включается.
(() => {
  "use strict";
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TZ = "Asia/Tashkent";
  const THEME_COLORS = { day: "#f3f7fb", night: "#0b1424" };
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, x) => {
    const t = clamp((x - a) / (b - a));
    return t * t * (3 - 2 * t);
  };
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- Время Ташкента и циферблат ---------- */
  let fmt = null;
  try {
    fmt = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  } catch {}
  const tashkentNow = () => {
    if (!fmt) {
      const d = new Date(Date.now() + 5 * 3600e3);
      return { h: d.getUTCHours(), m: d.getUTCMinutes() };
    }
    const parts = fmt.formatToParts(new Date());
    return { h: Number(parts.find((p) => p.type === "hour").value) % 24, m: Number(parts.find((p) => p.type === "minute").value) };
  };

  const dial = document.querySelector(".hero .dial");
  if (dial) {
    const sun = dial.querySelector(".dial-sun");
    const progress = dial.querySelector(".dial-progress");
    const clock = dial.querySelector("[data-clock]");
    const caption = dial.querySelector("[data-clock-caption]");
    const status = dial.querySelector("[data-clock-status]");
    const openAt = Number(dial.dataset.open);
    const closeAt = Number(dial.dataset.close);
    // «Открыто до 22:00» или «Закрыто, откроемся в 9:00» по времени Ташкента
    const setStatus = (hours) => {
      const isOpen = hours >= openAt && hours < closeAt;
      status.textContent = isOpen ? status.dataset.live : status.dataset.closed;
      dial.classList.toggle("is-closed", !isOpen);
    };
    const place = (f) => {
      sun.style.transform = `rotate(${(f * 180).toFixed(2)}deg)`;
      progress.style.setProperty("--progress-offset", (1 - f).toFixed(4));
    };
    const now = () => {
      const { h, m } = tashkentNow();
      return { f: (h + m / 60) / 24, hours: h + m / 60, text: `${pad(h)}:${pad(m)}` };
    };
    const start = now();
    clock.textContent = start.text;
    caption.hidden = false;
    setStatus(start.hours);
    if (reduce) {
      place(start.f);
      sun.classList.add("is-on");
    } else {
      place(0);
      const t0 = performance.now() + 420;
      const step = (t) => {
        const p = clamp((t - t0) / 1400);
        if (p > 0) sun.classList.add("is-on");
        place(start.f * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    const tick = () => {
      const { f, hours, text } = now();
      clock.textContent = text;
      setStatus(hours);
      place(f);
    };
    const schedule = () =>
      setTimeout(() => {
        tick();
        schedule();
      }, 60000 - (Date.now() % 60000) + 50);
    schedule();
    document.addEventListener("visibilitychange", () => !document.hidden && tick());
  }

  /* ---------- Тема ---------- */
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const setThemeMeta = (theme) => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = THEME_COLORS[theme];
    if (themeBtn) themeBtn.setAttribute("aria-label", theme === "night" ? themeBtn.dataset.toDay : themeBtn.dataset.toNight);
  };
  setThemeMeta(root.dataset.theme || "day");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.dataset.theme === "night" ? "day" : "night";
      const apply = () => {
        root.dataset.theme = next;
        try {
          sessionStorage.setItem("dentup-theme", next);
        } catch {}
        setThemeMeta(next);
      };
      if (!document.startViewTransition || reduce) return apply();
      const r = themeBtn.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const vt = document.startViewTransition(apply);
      // страховка: если браузер не отрисовывает страницу (фоновая вкладка), переход может не начаться
      setTimeout(() => {
        if (root.dataset.theme !== next) {
          try {
            vt.skipTransition();
          } catch {}
          apply();
        }
      }, 500);
      vt.ready
        .then(() =>
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
            { duration: 650, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
          )
        )
        .catch(() => {});
    });
  }

  /* ---------- Появление при прокрутке ---------- */
  const show = (el) => {
    el.classList.add("is-visible");
    if (el.matches(".stat")) countUp(el);
  };
  const countUp = (el) => {
    const n = el.querySelector("[data-count]");
    if (!n || reduce) return;
    const target = Number(n.dataset.count);
    const t0 = performance.now();
    const step = (t) => {
      const p = clamp((t - t0) / 1200);
      n.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io =
    "IntersectionObserver" in window && !reduce
      ? new IntersectionObserver(
          (entries) =>
            entries.forEach((e) => {
              if (e.isIntersecting) {
                show(e.target);
                io.unobserve(e.target);
              }
            }),
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        )
      : null;
  document.querySelectorAll("[data-reveal]").forEach((el) => (io ? io.observe(el) : el.classList.add("is-visible")));

  /* ---------- Вкладки услуг ---------- */
  const tabsRoot = document.querySelector("[data-tabs]");
  if (tabsRoot) {
    const list = tabsRoot.querySelector("[data-tablist]");
    const pill = tabsRoot.querySelector("[data-tabs-pill]");
    const tabs = [...tabsRoot.querySelectorAll("[data-tab]")];
    const panels = [...tabsRoot.querySelectorAll("[data-panel]")];
    list.hidden = false;
    tabsRoot.classList.add("tabs-on");
    const movePill = (tab) => {
      pill.style.width = `${tab.offsetWidth}px`;
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
    };
    const select = (name, focus) => {
      tabs.forEach((t) => {
        const on = t.dataset.tab === name;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        if (on) {
          movePill(t);
          if (focus) t.focus();
        }
      });
      panels.forEach((p) => {
        const on = p.dataset.panel === name;
        const was = !p.hidden;
        p.hidden = !on;
        if (on && !was) {
          p.querySelectorAll(".svc").forEach((c, i) => {
            c.style.setProperty("--i", i);
            show(c);
          });
          if (!reduce) {
            p.classList.remove("is-entering");
            void p.offsetWidth;
            p.classList.add("is-entering");
          }
        }
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t.dataset.tab));
      t.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        select(next.dataset.tab, true);
      });
    });
    select("adults");
    // плитка «Детям» во взрослой вкладке переключает на детскую
    tabsRoot.querySelectorAll("[data-tab-go]").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        select(a.dataset.tabGo);
        list.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      })
    );
    requestAnimationFrame(() => movePill(tabs.find((t) => t.getAttribute("aria-selected") === "true")));
    window.addEventListener("resize", () => movePill(tabs.find((t) => t.getAttribute("aria-selected") === "true")));
    document.fonts && document.fonts.ready.then(() => movePill(tabs.find((t) => t.getAttribute("aria-selected") === "true")));
  }

  /* ---------- Чат записи ---------- */
  const composer = document.querySelector("[data-composer]");
  if (composer) {
    const ds = composer.dataset;
    const times = JSON.parse(ds.times);
    const topics = JSON.parse(ds.topics);
    const out = composer.querySelector("[data-msg]");
    const bubble = composer.querySelector("[data-bubble]");
    const tg = composer.querySelector('[data-send="tg"]');
    const wa = composer.querySelector('[data-send="wa"]');
    const value = (name) => {
      const el = composer.querySelector(`input[name="${name}"]:checked`);
      return el ? Number(el.value) : -1;
    };
    const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
    const build = (animate) => {
      const lines = [ds.greeting];
      const topic = value("topic");
      const time = value("time");
      if (topic >= 0) lines.push(`${ds.topicPrefix} ${lower(topics[topic])}.`);
      if (time >= 0) lines.push(`${ds.timePrefix} ${lower(times[time])}.`);
      const text = lines.join("\n");
      out.textContent = text;
      const q = encodeURIComponent(text);
      tg.href = `https://t.me/${ds.tg}?text=${q}`;
      wa.href = `https://wa.me/${ds.wa}?text=${q}`;
      if (animate && !reduce) {
        bubble.classList.remove("is-updating");
        void bubble.offsetWidth;
        bubble.classList.add("is-updating");
      }
    };
    composer.addEventListener("change", () => build(true));
    build(false);
    // кнопки «Записаться» в услугах и карточках времени сразу выбирают повод или время в чате
    const preset = (selector, name, key) =>
      document.querySelectorAll(selector).forEach((a) =>
        a.addEventListener("click", () => {
          const input = composer.querySelector(`input[name="${name}"][value="${a.dataset[key]}"]`);
          if (input) {
            input.checked = true;
            build(true);
          }
        })
      );
    preset("[data-preset-topic]", "topic", "presetTopic");
    preset("[data-preset-time]", "time", "presetTime");
  }

  /* ---------- Фото крупно ---------- */
  const lightbox = document.querySelector("[data-lightbox]");
  if (lightbox && typeof lightbox.showModal === "function") {
    // картинка создаётся при первом открытии: пустой <img> в разметке считался бы битым
    const img = document.createElement("img");
    img.decoding = "async";
    document.querySelectorAll("[data-zoom]").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (!img.isConnected) lightbox.append(img);
        img.src = btn.dataset.zoom;
        img.alt = btn.dataset.alt || "";
        lightbox.showModal();
      })
    );
    lightbox.querySelector("[data-lightbox-close]").addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (e) => e.target !== img && lightbox.close());
  }

  /* ---------- Меню, язык, шапка, карта ---------- */
  const menu = document.querySelector("[data-menu]");
  const openBtn = document.querySelector("[data-menu-open]");
  if (menu && openBtn && typeof menu.showModal === "function") {
    openBtn.addEventListener("click", () => menu.showModal());
    menu.querySelector("[data-menu-close]").addEventListener("click", () => menu.close());
    menu.querySelectorAll("[data-menu-link]").forEach((a) => a.addEventListener("click", () => menu.close()));
    menu.addEventListener("click", (e) => e.target === menu && menu.close());
  }
  document.querySelectorAll("[data-lang-link]").forEach((a) =>
    a.addEventListener("click", () => {
      if (location.hash) a.href = a.href.split("#")[0] + location.hash;
    })
  );
  const hdr = document.querySelector("[data-hdr]");
  const map = document.querySelector("[data-map]");
  if (map) {
    map.querySelector("[data-map-load]").addEventListener("click", () => {
      const frame = document.createElement("iframe");
      frame.src = map.dataset.src;
      frame.title = map.dataset.title;
      frame.loading = "lazy";
      frame.referrerPolicy = "no-referrer-when-downgrade";
      frame.setAttribute("allowfullscreen", "");
      map.querySelector(".map-ph").replaceWith(frame);
      frame.focus({ preventScroll: true });
    });
  }

  /* ---------- Бегущая строка: быстрее при прокрутке, направление — за прокруткой ---------- */
  const mq = document.querySelector("[data-mq-track]");
  let mqX = 0;
  let mqDir = -1;
  let mqBoost = 0;

  /* ---------- Один цикл прокрутки на всё ---------- */
  const bar = document.querySelector("[data-progress]");
  const stepsWrap = document.querySelector("[data-steps]");
  const stepsLine = document.querySelector("[data-steps-line]");
  const ring = document.querySelector("[data-spin]");
  const rise = document.querySelector("[data-rise]");
  const aura = document.querySelector(".hero-aura");
  let lastY = scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    const dy = y - lastY;
    lastY = y;
    if (hdr) hdr.classList.toggle("is-scrolled", y > 8);
    if (bar) bar.style.transform = `scaleX(${clamp(y / (document.documentElement.scrollHeight - innerHeight)).toFixed(4)})`;
    if (reduce) return;
    if (dy) {
      mqDir = dy > 0 ? -1 : 1;
      mqBoost = Math.min(14, mqBoost + Math.abs(dy) * 0.08);
    }
    if (stepsWrap && stepsLine) {
      const r = stepsWrap.getBoundingClientRect();
      stepsLine.parentElement.parentElement.style.setProperty("--steps", clamp((innerHeight * 0.7 - r.top) / r.height).toFixed(3));
    }
    if (ring) {
      const r = ring.getBoundingClientRect();
      ring.style.setProperty("--spin", `${((clamp((innerHeight - r.top) / (innerHeight + r.height)) - 0.5) * 120).toFixed(1)}deg`);
    }
    if (rise) {
      const r = rise.parentElement.getBoundingClientRect();
      rise.style.setProperty("--rise", `${(clamp(1 - (innerHeight - r.top) / innerHeight) * 40).toFixed(1)}%`);
    }
    if (aura && y < innerHeight) aura.style.transform = `translateY(${(y * 0.25).toFixed(1)}px)`;
  };
  const requestTick = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      onScroll();
    });
  };
  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);
  onScroll();

  if (mq && !reduce) {
    const row = mq.firstElementChild;
    let last = performance.now();
    const frame = (t) => {
      const dt = Math.min(64, t - last);
      last = t;
      const w = row.offsetWidth;
      mqX += mqDir * (0.04 + mqBoost * 0.06) * dt;
      mqBoost *= 0.92;
      if (w) mqX = ((mqX % w) + w) % w - w;
      mq.style.transform = `translate3d(${mqX.toFixed(1)}px,0,0)`;
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
})();
