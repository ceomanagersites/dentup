// Oʻzbekcha matnlar (lotin yozuvi). oʻ va gʻ harflarida U+02BB (ʻ), tutuq belgisida U+02BC (ʼ).
// Tarjima ona tili egasi tomonidan tekshirilishi kerak (README, «Что проверить»).

export default {
  lang: "uz",
  locale: "uz_UZ",
  path: "uz/",
  other: { lang: "ru", label: "Русский", short: "RU", path: "../" },

  meta: {
    title: "Dent Up — Chilonzordagi kecha-kunduz ishlaydigan stomatologiya, Toshkent",
    description:
      "Chilonzordagi Dent Up stomatologiyasi oldindan yozilish orqali kecha-kunduz qabul qiladi. Implantatsiya, tojlar, vinirlar, breketlar, bolalar tishlarini davolash. Konsultatsiya bepul. +998 88 878 87 88.",
    ogAlt: "Dent Up — Chilonzordagi stomatologiya, kecha-kunduz qabul",
  },

  skip: "Asosiy qismga oʻtish",

  nav: [
    { id: "services", label: "Xizmatlar" },
    { id: "doctor", label: "Shifokor" },
    { id: "kids", label: "Bolalarga" },
    { id: "faq", label: "Savollar" },
    { id: "contacts", label: "Aloqa" },
  ],
  menu: { open: "Menyu", close: "Menyuni yopish" },
  theme: { toDay: "Kunduzgi mavzuni yoqish", toNight: "Tungi mavzuni yoqish" },
  langSwitch: "Сайт на русском",

  hero: {
    title: ["Hech qachon yopilmaydigan", "stomatologiya"],
    lede: "Chilonzordagi Dent Up oldindan yozilish orqali sutkaning istalgan vaqtida qabul qiladi. Implantolog shifokordan implantatsiya, tojlar va vinirlar, bolalar tishlarini davolash.",
    call: "Qoʻngʻiroq qilish",
    write: "Telegramda yozish",
    clockCaption: "Hozir Toshkentda",
    clockStatic: "24/7",
    status: "Yozilish ochiq",
    statusStatic: "Kecha-kunduz, oldindan yozilish bilan",
    parts: ["tun", "tong", "kun", "kech"],
    dialLabel: "Sutka siferblati: klinika istalgan soatda oldindan yozilish orqali qabul qiladi",
  },

  facts: [
    { k: "Konsultatsiya", v: "bepul" },
    { k: "Qabul qilamiz", v: "kattalar va bolalarni" },
    { k: "Shifokor", v: "implantolog, PhD" },
    { k: "Manzil", v: "Chilonzor 7-kvartal, 26" },
  ],

  book: {
    title: "Istalgan soatga yozilish mumkin",
    lede: "Klinika kecha-kunduz ishlaydi, lekin faqat oldindan yozilish orqali. Vaqtni kelishib oling — sizni kutib olamiz: ishdan oldin ertalab soat yettidami yoki tish ogʻrib qolgan tundami.",
    steps: [
      { t: "Qoʻngʻiroq qiling yoki yozing", d: "Telefon yoki Telegram orqali. Istalgan vaqtda qoʻngʻiroq qilish mumkin." },
      { t: "Vaqtni kelishib oling", d: "Tong, kun, kech yoki tun — oʻzingizga qulayini tanlang." },
      { t: "Keling", d: "Chilonzor 7-kvartal, 26-uy, birinchi qavat. Moʻljal — Oqtepa aylanasi." },
    ],
    composer: {
      title: "Xabarni tayyorlang",
      hint: "Vaqt va sababni tanlang — ular matnga qoʻshiladi. Messenjer tayyor xabar bilan ochiladi, faqat «Yuborish»ni bosish qoladi.",
      timeLabel: "Qachon qulay",
      times: ["Imkon qadar tezroq", "Ertalab", "Kunduzi", "Kechqurun", "Tunda"],
      topicLabel: "Nima bezovta qilyapti",
      topics: ["Tish ogʻriyapti", "Implantatsiya", "Toj yoki vinir", "Breketlar", "Bolani davolash", "Konsultatsiya kerak"],
      previewLabel: "Xabar matni",
      greeting: "Assalomu alaykum! Dent Up klinikasiga yozilmoqchiman.",
      topicPrefix: "Sabab:",
      timePrefix: "Qulay vaqt:",
      telegram: "Telegramda yuborish",
      whatsapp: "WhatsAppda yuborish",
      call: "Yoki qoʻngʻiroq qiling",
    },
  },

  services: {
    title: "Nimalarni davolaymiz",
    lede: "Kattalarga: implantatsiya, tojlar, vinirlar, breketlar, tish olib tashlash va milklarni davolash. Bolalarga: sut va doimiy tishlarni davolash hamda ortodontiya.",
    adults: "Kattalarga",
    kids: "Bolalarga",
    adultItems: [
      {
        t: "Implantatsiya",
        d: "Yoʻqotilgan tishlarni implantlar yordamida tiklaymiz, shu jumladan bir bosqichda: suyak imkon bersa, implant tish olingan kuniyoq qoʻyiladi. Bu sizga mos keladimi — shifokor koʻrikdan soʻng aytadi.",
        feature: true,
      },
      { t: "Tojlar", d: "Sirkoniy va metallokeramika. Eski oltin tojlarni sirkoniy tojlarga almashtiramiz." },
      { t: "Keramik vinirlar", d: "Old tishlarning shakli va rangini oʻzgartiradi." },
      { t: "Restavratsiya", d: "Old tishlarning shakli va rangini yorugʻlikda qotadigan kompozit bilan tiklaymiz." },
      { t: "Breketlar", d: "Ortodont kattalarda tishlam va tishlar holatini toʻgʻrilaydi." },
      { t: "Tish olib tashlash", d: "Stomatolog-jarroh, mahalliy ogʻriqsizlantirish ostida." },
      { t: "Milklarni davolash", d: "Parodontolog qabuli." },
      { t: "Gnatologiya", d: "Tishlam va chakka-pastki jagʻ boʻgʻimi faoliyati." },
    ],
    kidItems: [
      { t: "Tishlarni davolash", d: "Bolalar stomatologi sut va doimiy tishlardagi kariesni davolaydi." },
      { t: "Mikroskop ostida", d: "Bolalar tishlarini mikroskop ostida davolash." },
      { t: "Bolalar ortodonti", d: "Tishlar oʻsayotgan paytda tishlamni toʻgʻrilaydi." },
    ],
    priceNote: "Narxni koʻrikdan soʻng aytamiz: u qancha ish kerakligiga bogʻliq. Konsultatsiya bepul.",
    cta: "Konsultatsiyaga yozilish",
    consult: {
      t: "Nimadan boshlashni bilmayapsizmi?",
      d: "Bepul konsultatsiyaga keling: shifokor koʻrikdan oʻtkazadi, variantlarni tushuntiradi va narxini aytadi.",
      cta: "Yozilish",
    },
  },

  doctor: {
    title: "Shifokor",
    role: "Implantolog, stomatolog-ortoped",
    facts: [
      { k: "Ilmiy daraja", v: "PhD" },
      { k: "Tajriba", v: "8 yil" },
      { k: "Yoʻnalishlar", v: "Implantatsiya, tojlar, vinirlar, tish olib tashlash" },
    ],
    quote: "Estetika — bu shunchaki oq va tekis tishlar emas, balki uygʻunlik.",
    quoteSource: "Shifokorning Instagramidan, tarjima",
    instagram: "Shifokor ishlari Instagramda",
    telegram: "Shifokorga Telegramda yozish",
  },

  kids: {
    title: "Bolalar qabuli",
    lede: "Sut va doimiy tishlarni davolaymiz, tishlamni kuzatib boramiz. 3,5 yoshli bemorimizning onasi shunday yozgan (sharh rus tilida):",
    review:
      "Были здесь с дочкой ей 3,5 года. Врач молодец, пытался найти подход к ребёнку и при этом работал быстро. … Убрали кариес и цены адекватные.",
    reviewMeta: "2GISdagi sharh, 2026-yil 28-aprel",
    reviewLink: "2GISda oʻqish",
    cta: "Bolani yozdirish",
  },

  faq: {
    title: "Koʻp beriladigan savollar",
    items: [
      {
        q: "Tunda kelsa boʻladimi?",
        a: "Ha. Klinika kecha-kunduz ishlaydi, lekin oldindan yozilish orqali. Qoʻngʻiroq qiling yoki yozing — vaqtni kelishib olamiz.",
      },
      {
        q: "Davolash qancha turadi?",
        a: "Narxni shifokor koʻrikdan soʻng aytadi: u nechta tish va qanday ish kerakligiga bogʻliq. Konsultatsiya bepul.",
      },
      {
        q: "Ogʻriqli boʻladimi?",
        a: "Tishlarni davolash va olib tashlashda mahalliy ogʻriqsizlantirish qoʻllaniladi. Agar qoʻrqsangiz, shifokorga ayting: u nima va nima uchun qilinishini tushuntirib beradi.",
      },
      {
        q: "Kichik bolalarni davolaysizmi?",
        a: "Ha. Bolalar stomatologi sut va doimiy tishlarni davolaydi, mikroskop ostida davolash va bolalar ortodonti bor.",
      },
      {
        q: "Qanday toʻlash mumkin?",
        a: "Karta, naqd pul yoki kartadan oʻtkazma orqali.",
      },
      {
        q: "Keksa odamga kelish qiyin. Nima qilish kerak?",
        a: "Qoʻngʻiroq qilib, vaziyatni tushuntiring: shifokor keksa bemorlarga uyida yordam bergan holatlar ham boʻlgan. Qanday qilish yaxshiroq ekanini kelishib olamiz.",
      },
      {
        q: "Sizni qanday topsa boʻladi?",
        a: "Chilonzor, 7-kvartal, 26-uy, birinchi qavat. Moʻljal — Oqtepa aylanasi, eng yaqin metro — «Novza».",
      },
    ],
  },

  visit: {
    title: "Bizni qanday topish mumkin",
    address: "Chilonzor 7-kvartal, 26",
    addressMore: "1-qavat, Chilonzor tumani, Toshkent, 100096",
    landmark: "Moʻljal — Oqtepa aylanasi. Eng yaqin metro — «Novza».",
    rows: [
      { k: "Ish vaqti", v: "Kecha-kunduz, oldindan yozilish bilan" },
      { k: "Toʻlov", v: "Karta, naqd pul, kartadan oʻtkazma" },
    ],
    routes: "Yoʻnalish qurish",
    routeYandex: "Yandex Xaritalar",
    routeGis: "2GIS",
    routeGoogle: "Google Maps",
    mapShow: "Xaritani koʻrsatish",
    mapTitle: "Dent Up Yandex Xaritalarda",
    mapNote: "Xarita Yandexdan faqat bosilgandan keyin yuklanadi.",
    phones: "Telefonlar",
    messengers: "Yozish",
    telegram: "Shifokor Telegrami",
    channel: "Telegram kanal",
    instagram: "Klinika Instagrami",
  },

  final: {
    title: "Istalgan vaqtda qoʻngʻiroq qiling",
    lede: "Nima bezovta qilayotganini ayting — qabul vaqtini kelishib olamiz.",
    call: "Qoʻngʻiroq qilish",
  },

  footer: {
    about: "Chilonzordagi stomatologiya, Toshkent. Kecha-kunduz, oldindan yozilish bilan.",
    warning: "Qarshi koʻrsatmalar mavjud. Mutaxassis maslahati zarur.",
    note: "Saytdagi maʼlumotlar shifokor koʻrigining oʻrnini bosmaydi.",
    top: "Yuqoriga",
  },

  callbar: { call: "Qoʻngʻiroq", write: "Telegram" },

  notFound: {
    title: "Bunday sahifa yoʻq",
    text: "Havola eskirgan boʻlishi mumkin. Klinika haqida hammasi bosh sahifada, yozilish esa istalgan vaqtda telefon orqali.",
    home: "Bosh sahifaga",
  },
};
