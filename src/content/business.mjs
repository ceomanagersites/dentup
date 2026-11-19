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
    // Номер дома и квартиры дал владелец проекта 18.11.2026: дом 26, кв. 51 (2ГИС показывает только дом и 1 этаж).
    street: "Чиланзар 7-й квартал, дом 26, кв. 51",
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

  // Часы приёма: владелец проекта, 19.11.2026 — «график работы с 9 до 22:00». Циферблат на первом экране
  // подсвечивает эти часы и пишет «открыто / закрыто» по времени Ташкента.
  // CONFIRM: дни недели не названы, на сайте и в разметке для поисковиков стоит «ежедневно». 2ГИС и вывеска на двери
  // пока говорят «круглосуточно / 24/7» — их стоит поправить, чтобы не спорили с сайтом.
  hours: { open: "09:00", close: "22:00" },

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
    // Фото врача прислал владелец проекта 18.11.2026 (IMG_6203). Вырезано из фона локально (BiRefNet),
    // лежит в public/img/doctor-800.webp и doctor-400.webp с прозрачным фоном; фон рисует сайт.
    photo: "doctor",
  },
};

export const telHref = (p) => `tel:${p.e164}`;
export const mainPhone = business.phones.find((p) => p.main);
