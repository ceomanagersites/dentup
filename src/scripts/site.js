// Dent Up: часы Ташкента на циферблате, смена темы, сборщик сообщения, меню, карта, появление блоков.
// Контент виден и работает без скрипта; скрипт только оживляет.
(() => {
  "use strict";
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const TZ = "Asia/Tashkent";
  const THEME_COLORS = { day: "#eeeaf0", night: "#1a1320" };

  /* ---------- Время Ташкента ---------- */
  let fmt;
  try {
    fmt = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  } catch {
    fmt = null;
  }
  const tashkentNow = () => {
    if (!fmt) {
      // запасной вариант: UTC+5 без перехода на летнее время
      const d = new Date(Date.now() + 5 * 3600e3);
      return { h: d.getUTCHours(), m: d.getUTCMinutes() };
    }
    const parts = fmt.formatToParts(new Date());
    const h = Number(parts.find((p) => p.type === "hour").value) % 24;
    const m = Number(parts.find((p) => p.type === "minute").value);
    return { h, m };
  };
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- Циферблат ---------- */
  const dial = document.querySelector(".hero .dial");
  if (dial) {
    const sun = dial.querySelector(".dial-sun");
    const progress = dial.querySelector(".dial-progress");
    const clock = dial.querySelector("[data-clock]");
    const caption = dial.querySelector("[data-clock-caption]");
    const status = dial.querySelector("[data-clock-status]");

    const place = (fraction) => {
      sun.style.transform = `rotate(${(fraction * 180).toFixed(2)}deg)`;
      progress.style.setProperty("--progress-offset", (1 - fraction).toFixed(4));
    };
    const fractionNow = () => {
      const { h, m } = tashkentNow();
      return { fraction: (h + m / 60) / 24, text: `${pad(h)}:${pad(m)}` };
    };
    const tick = () => {
      const { fraction, text } = fractionNow();
      clock.textContent = text;
      place(fraction);
    };

    const start = fractionNow();
    clock.textContent = start.text;
    caption.hidden = false;
    status.textContent = status.dataset.live;
    clock.setAttribute("aria-live", "off");

    if (reduce.matches) {
      place(start.fraction);
      sun.classList.add("is-on");
    } else {
      // солнце проходит путь от полуночи до текущего часа, как восход
      place(0);
      const duration = 1300;
      const delay = 380;
      const t0 = performance.now() + delay;
      const ease = (x) => 1 - Math.pow(1 - x, 3);
      const step = (now) => {
        const p = Math.min(1, Math.max(0, (now - t0) / duration));
        if (p > 0) sun.classList.add("is-on");
        place(start.fraction * ease(p));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    // обновление на границе минуты, затем раз в минуту
    const schedule = () => {
      const msToMinute = 60000 - (Date.now() % 60000) + 50;
      setTimeout(() => {
        tick();
        schedule();
      }, msToMinute);
    };
    schedule();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) tick();
    });
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
      if (!document.startViewTransition || reduce.matches) return apply();
      const r = themeBtn.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const vt = document.startViewTransition(apply);
      vt.ready
        .then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
            { duration: 620, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
          );
        })
        .catch(() => {});
    });
  }

  /* ---------- Сборщик сообщения ---------- */
  const composer = document.querySelector("[data-composer]");
  if (composer) {
    const ds = composer.dataset;
    const times = JSON.parse(ds.times);
    const topics = JSON.parse(ds.topics);
    const out = composer.querySelector("[data-msg]");
    const tg = composer.querySelector('[data-send="tg"]');
    const wa = composer.querySelector('[data-send="wa"]');
    const value = (name) => {
      const el = composer.querySelector(`input[name="${name}"]:checked`);
      return el ? Number(el.value) : -1;
    };
    const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
    const build = () => {
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
    };
    composer.addEventListener("change", build);
    build();

    // «Записать ребёнка» сразу выбирает повод
    document.querySelectorAll("[data-preset-topic]").forEach((a) =>
      a.addEventListener("click", () => {
        const input = composer.querySelector(`input[name="topic"][value="${a.dataset.presetTopic}"]`);
        if (input) {
          input.checked = true;
          build();
        }
      })
    );
  }

  /* ---------- Меню на телефоне ---------- */
  const menu = document.querySelector("[data-menu]");
  const openBtn = document.querySelector("[data-menu-open]");
  if (menu && openBtn && typeof menu.showModal === "function") {
    openBtn.addEventListener("click", () => menu.showModal());
    menu.querySelector("[data-menu-close]").addEventListener("click", () => menu.close());
    menu.querySelectorAll("[data-menu-link]").forEach((a) => a.addEventListener("click", () => menu.close()));
    menu.addEventListener("click", (e) => {
      if (e.target === menu) menu.close();
    });
  }

  /* ---------- Язык: остаёмся в том же разделе ---------- */
  document.querySelectorAll("[data-lang-link]").forEach((a) =>
    a.addEventListener("click", () => {
      if (location.hash) a.href = a.href.split("#")[0] + location.hash;
    })
  );

  /* ---------- Шапка ---------- */
  const hdr = document.querySelector("[data-hdr]");
  if (hdr) {
    const onScroll = () => hdr.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Карта по нажатию ---------- */
  const map = document.querySelector("[data-map]");
  if (map) {
    const btn = map.querySelector("[data-map-load]");
    btn.addEventListener("click", () => {
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

  /* ---------- Появление блоков ---------- */
  const revealables = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduce.matches) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-visible"));
  }
})();
