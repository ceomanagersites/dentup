// Факты о клинике, не зависящие от языка. У каждого неочевидного значения указан источник.
// Проверено 18.11.2026. Пометка CONFIRM — факт из одного источника, его стоит подтвердить у клиники.

export const business = {
  name: "Dent Up",

  // 2ГИС (карточка 70000001076934122): телефоны +998 88 878 87 88 и +998 99 031 27 97.
  // Основной номер совпадает в Telegram-канале, профиле врача и Instagram клиники.
  phones: [
    { e164: "+998888788788", display: "+998 88 878 87 88", main: true },
    { e164: "+998990312797", display: "+998 99 031 27 97", main: false },
  ],

  // CONFIRM: в 2ГИС у клиники нет WhatsApp. Кнопка ведёт на основной номер — проверить, что он есть в WhatsApp.
  whatsapp: "998888788788",

  // Личный Telegram врача — сюда приходят все записи с сайта (подтвердил владелец проекта 18.11.2026). Канал клиники — отдельно.
  telegram: "Toshkent_Stomatolog_Sirojiddin",
  telegramChannel: "toshkent_stomatolog",

  // Instagram клиники @dentup_kids (активный). В 2ГИС указан @dentupclinic, он недоступен — стоит обновить карточку.
  instagram: "dentup_kids",
  instagramDoctor: "sirojiddinstomatolog",

  // Адрес: 2ГИС, Instagram @dentup_kids, Telegram-канал. Координаты 2ГИС; Яндекс даёт ту же точку (разница < 30 м).
  address: {
    street: "Чиланзар 7-й квартал, 26",
    postal: "100096",
    district: "Чиланзарский район",
    city: "Ташкент",
    lat: 41.298831,
    lon: 69.211719,
  },

  links: {
    gis: "https://2gis.uz/tashkent/firm/70000001076934122",
    gisReviews: "https://2gis.uz/tashkent/firm/70000001076934122/tab/reviews",
    yandexRoute: "https://yandex.uz/maps/?rtext=~41.298831%2C69.211719&rtt=auto",
    googleRoute: "https://www.google.com/maps/dir/?api=1&destination=41.298831%2C69.211719",
    gisRoute: "https://2gis.uz/tashkent/directions/points/%7C69.211719%2C41.298831",
    yandexWidget: "https://yandex.uz/map-widget/v1/?ll=69.211719%2C41.298831&z=16&pt=69.211719%2C41.298831%2Cpm2rdl",
  },

  // Часы: 2ГИС «Круглосуточно, по предварительной записи» (Пн–Вс 00:00–24:00), название профиля
  // «Стоматология 24/7», Telegram-канал «DENT UP kids 24/7».
  // CONFIRM: в посте @dentup_kids от 19.04.2026 был график 8:00–2:00. Свежие источники говорят о круглосуточной работе.
  hours: { allDay: true, byAppointment: true },

  timeZone: "Asia/Tashkent",

  // 2ГИС, раздел «Инфо»: оплата картой, наличными, переводом с карты.
  payment: ["card", "cash", "transfer"],

  // 2ГИС: оценка 5, 1 отзыв (на 18.11.2026). Рейтинг в Schema.org не размечается.
  rating: { value: 5, count: 1, source: "2ГИС" },

  doctor: {
    // Имя в написании самого врача (профиль Telegram). Кириллическое написание не подтверждено.
    name: "Sirojiddin Abduxaliqov",
    // Instagram врача: «Implantolog | Ortoped», «Опыт работы 8 лет», «PhD» (пост 19.05.2026 «Alhamdulillah PhD»).
    // CONFIRM: учёная степень и стаж — со слов врача в его профиле, документ не проверялся.
    years: 8,
    phd: true,
    // Фото врача нет: публичные снимки не скачивались. Положите оригинал в public/img/doctor.webp и укажите путь.
    photo: null,
  },
};

export const telHref = (p) => `tel:${p.e164}`;
export const mainPhone = business.phones.find((p) => p.main);
