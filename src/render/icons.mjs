// Иконки одной толщины линии (1.6 при сетке 24), currentColor.
const svg = (body, cls = "icon") =>
  `<svg class="${cls}" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;

export const icons = {
  phone: svg('<path d="M6.6 3.8 8.9 3.5l1.6 4.1-2 1.4a11 11 0 0 0 6.5 6.5l1.4-2 4.1 1.6-.3 2.3a2 2 0 0 1-2.2 1.7A16.6 16.6 0 0 1 4.9 6a2 2 0 0 1 1.7-2.2Z"/>'),
  telegram: svg('<path d="M20.5 4.2 3.6 10.8c-.8.3-.8 1.4 0 1.7l4.2 1.4 1.6 5c.2.7 1.1.9 1.6.4l2.4-2.3 4.3 3.1c.6.4 1.4.1 1.5-.6l2.6-14.2c.1-.8-.6-1.4-1.3-1.1Z"/><path d="m7.8 13.9 9.4-6.1-6.8 7.4"/>'),
  whatsapp: svg('<path d="M4.3 19.7 5.4 16A8.3 8.3 0 1 1 8.6 19l-4.3.7Z"/><path d="M9.2 8.6c.2-.5.6-.5.9-.5h.4c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.5 1.9 2.6 2.5l.6-.6c.2-.2.4-.2.6-.1l1.5.7c.2.1.3.3.3.5v.4c0 .5-.4 1-1 1.2-1 .3-2.6 0-4.3-1.5S9 11.1 9 10.1c0-.6.1-1.1.2-1.5Z"/>'),
  instagram: svg('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.9"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>'),
  sun: svg('<circle cx="12" cy="15" r="4"/><path d="M3 19h18M12 6.5V4.5M5.6 9l-1.4-1.4M18.4 9l1.4-1.4M3.5 15h1.5M19 15h1.5"/>'),
  moon: svg('<path d="M19.5 14.6A7.6 7.6 0 0 1 9.4 4.5a7.6 7.6 0 1 0 10.1 10.1Z"/>'),
  menu: svg('<path d="M4 8h16M4 16h16"/>'),
  close: svg('<path d="m6 6 12 12M18 6 6 18"/>'),
  route: svg('<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7.5a3.5 3.5 0 0 0 0-7h-7a3.5 3.5 0 0 1 0-7H16"/>'),
  pin: svg('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>'),
};

// Знак Dent Up: солнце, поднимающееся над линией горизонта (Up).
export const logoMark = `<svg class="logo-mark" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false"><path d="M5 22a11 11 0 0 1 22 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M2.5 22h27" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle class="logo-sun" cx="21.2" cy="13.6" r="3.2"/></svg>`;
