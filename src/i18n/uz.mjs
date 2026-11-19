// Oʻzbekcha matnlar (lotin yozuvi). oʻ va gʻ harflarida U+02BB (ʻ), tutuq belgisida U+02BC (ʼ).
// Tarjima ona tili egasi tomonidan tekshirilishi kerak (NOTES.md).

export default {
  lang: "uz",
  locale: "uz_UZ",
  path: "uz/",
  other: { lang: "ru", label: "Русский", short: "RU", path: "../" },

  meta: {
    title: "Dent Up — Chilonzordagi stomatologiya, Toshkent. Qabul 9:00 dan 22:00 gacha",
    description:
      "Chilonzordagi Dent Up stomatologiyasi 9:00 dan 22:00 gacha qabul qiladi. Implantatsiya, kaplamalar, vinirlar, breketlar, bolalar tishlarini davolash. Konsultatsiya 100 000 soʻm. +998 88 878 87 88.",
    ogAlt: "Dent Up — Chilonzordagi stomatologiya, qabul 9:00 dan 22:00 gacha",
  },

  skip: "Asosiy qismga oʻtish",

  nav: [
    { id: "clinic", label: "Klinika" },
    { id: "services", label: "Xizmatlar" },
    { id: "day", label: "Qabul vaqti" },
    { id: "doctor", label: "Shifokor" },
    { id: "kids", label: "Bolalarga" },
    { id: "contacts", label: "Aloqa" },
  ],
  menu: { open: "Menyu", close: "Menyuni yopish" },
  theme: { toDay: "Kunduzgi mavzuni yoqish", toNight: "Tungi mavzuni yoqish" },
  langSwitch: "Сайт на русском",

  hero: {
    badge: "Qabul 9:00 dan 22:00 gacha",
    title: ["Soat 22:00 gacha", "ochiq stomatologiya"],
    lede: "Chilonzordagi Dent Up 9:00 dan 22:00 gacha qabul qiladi — ishdan oldin ham, keyin ham kelish mumkin. Implantolog shifokordan implantatsiya, kaplamalar va vinirlar, bolalar tishlarini davolash.",
    call: "Qoʻngʻiroq qilish",
    write: "Telegramda yozish",
    rating: "2GISda 5,0",
    ratingNote: "1 ta sharh",
    clockCaption: "Hozir Toshkentda",
    clockStatic: "9–22",
    status: "22:00 gacha ochiq",
    statusClosed: "Yopiq, 9:00 da ochilamiz",
    statusStatic: "Qabul 9:00 dan 22:00 gacha",
    dialLabel: "Sutka siferblati: klinika 9:00 dan 22:00 gacha qabul qiladi",
  },

  benefits: [
    { icon: "clock", t: "22:00 gacha", d: "Qabul 9:00 dan 22:00 gacha: ishdan keyin ham ulgurasiz." },
    { icon: "free", t: "Konsultatsiya 100 000 soʻm", d: "Shifokor koʻrikdan oʻtkazadi va davolashdan oldin narxini aytadi." },
    { icon: "award", t: "Implantolog, PhD", d: "8 yillik tajriba: implantlar, kaplamalar, vinirlar." },
    { icon: "kid", t: "Bolalarni davolaymiz", d: "Bolalar stomatologi, ortodont, mikroskop ostida davolash." },
  ],

  marquee: [
    "Implantatsiya",
    "Sirkoniy kaplamalar",
    "Keramik vinirlar",
    "Breketlar",
    "Tishlarni restavratsiya qilish",
    "Milklarni davolash",
    "Bolalar stomatologiyasi",
    "Mikroskop ostida davolash",
  ],

  scene: {
    title: "Sizga qulay vaqtda keling",
    lede: "Klinika 9:00 dan 22:00 gacha qabul qiladi. Qulay vaqtni tanlang — uni shifokorga xabarga qoʻshamiz.",
    moments: [
      { time: "09:00", chip: 1, icon: "sunrise", t: "Ertalab", d: "Kun hali boʻsh paytda ertalabga yoziling." },
      { time: "13:00", chip: 2, icon: "sun", t: "Tushlik tanaffusida", d: "Tanaffus paytida konsultatsiya yoki koʻrik." },
      { time: "18:30", chip: 3, icon: "sunset", t: "Ishdan keyin", d: "Ishdan javob soʻrashning hojati yoʻq: kechqurun keling." },
      { time: "21:00", chip: 4, icon: "moon", t: "Kech kechqurun", d: "22:00 gacha ishlaymiz: uzoq ish kunidan keyin ham ulgurasiz." },
    ],
    cardCta: "Shu vaqtga yozilish",
  },

  book: {
    title: "Bir daqiqada yozilish",
    lede: "Vaqt va nima bezovta qilayotganini tanlang — shifokorga xabar oʻzi tayyorlanadi. Faqat «Yuborish»ni bosish qoladi.",
    steps: [
      { icon: "chat", t: "Yozing yoki qoʻngʻiroq qiling", d: "Telegram, WhatsApp yoki telefon orqali." },
      { icon: "calendar", t: "Vaqtni kelishib oling", d: "9:00 dan 22:00 gacha, oʻzingizga qulay vaqtda." },
      { icon: "pin", t: "Keling", d: "Chilonzor 7-kvartal, 26-uy, 51-xonadon, birinchi qavat. Moʻljal — Oqtepa aylanasi." },
    ],
    composer: {
      title: "Xabarni tayyorlang",
      timeLabel: "Qachon qulay",
      times: ["Imkon qadar tezroq", "Ertalab", "Kunduzi", "Kechqurun", "20:00 dan keyin"],
      timeIcons: ["bolt", "sunrise", "sun", "sunset", "moon"],
      topicLabel: "Nima bezovta qilyapti",
      topics: ["Tish ogʻriyapti", "Implantatsiya", "Kaplama yoki vinir", "Breketlar", "Bolani davolash", "Konsultatsiya kerak"],
      topicIcons: ["bolt", "implant", "crown", "braces", "kid", "consult"],
      chatSub: "Shifokor Telegrami, yozilish",
      chatStatus: "Qabul 9:00 dan 22:00 gacha",
      greeting: "Assalomu alaykum! Dent Up klinikasiga yozilmoqchiman.",
      topicPrefix: "Sabab:",
      timePrefix: "Qulay vaqt:",
      telegram: "Telegramda yuborish",
      whatsapp: "WhatsApp",
      call: "Qoʻngʻiroq qilish",
      hint: "Telegram tayyor matn bilan ochiladi. Xabar shifokorga sizdan boradi, javob oʻsha chatda keladi.",
    },
  },

  clinic: {
    title: "Chilonzordagi klinika",
    lede: "Birinchi qavatda koʻchadan alohida kirish, eshik tepasida DENT UP peshlavhasi. Qabul 9:00 dan 22:00 gacha.",
    facts: [
      { icon: "home", t: "Koʻchadan kirish, birinchi qavat" },
      { icon: "clock", t: "Qabul 9:00 dan 22:00 gacha" },
      { icon: "pin", t: "Moʻljal — Oqtepa aylanasi" },
    ],
    photos: [
      { src: "room", icon: "implant", cap: "Shifokor xonasi", alt: "Dent Up xonasi: deraza yonidagi stomatologik kreslo, marmar pol, shifokor stoli" },
      { src: "hall", icon: "home", cap: "Kutish zali", alt: "Dent Up kutish zali: divan, administrator peshtaxtasi, qandil, marmar pol" },
      { src: "entrance", icon: "pin", cap: "Klinikaga kirish", alt: "Dent Up kirish joyi: eshik ustida DENT UP peshlavhasi, koʻchadan zinapoyalar" },
    ],
    zoom: "Rasmni kattalashtirish",
    close: "Rasmni yopish",
  },

  services: {
    title: "Nimalarni davolaymiz",
    lede: "Kattalar va bolalar uchun — bitta klinikada. Narxni shifokor koʻrikdan soʻng aytadi.",
    adults: "Kattalarga",
    kids: "Bolalarga",
    featureBadge: "Bir bosqichli implantatsiya",
    more: "Yozilish",
    adultItems: [
      {
        icon: "implant",
        t: "Implantatsiya",
        d: "Yoʻqotilgan tishlarni implantlar yordamida tiklaymiz, shu jumladan bir bosqichda: suyak imkon bersa, implant tish olingan kuniyoq qoʻyiladi. Bu sizga mos keladimi — shifokor koʻrikdan soʻng aytadi.",
        feature: true,
        topic: 1,
      },
      { icon: "crown", t: "Kaplamalar", d: "Sirkoniy va metallokeramik kaplamalar. Eski oltin kaplamalarni sirkoniy kaplamalarga almashtiramiz.", topic: 2 },
      { icon: "veneer", t: "Keramik vinirlar", d: "Old tishlarning shakli va rangini oʻzgartiradi.", topic: 2 },
      { icon: "restore", t: "Restavratsiya", d: "Old tishlarning shakli va rangini yorugʻlikda qotadigan kompozit bilan tiklaymiz.", topic: 5 },
      { icon: "braces", t: "Breketlar", d: "Ortodont kattalarda tishlam va tishlar holatini toʻgʻrilaydi.", topic: 3 },
      { icon: "extract", t: "Tish olib tashlash", d: "Stomatolog-jarroh, mahalliy ogʻriqsizlantirish ostida.", topic: 0 },
      { icon: "gums", t: "Milklarni davolash", d: "Parodontolog qabuli.", topic: 5 },
      { icon: "bite", t: "Gnatologiya", d: "Tishlam va chakka-pastki jagʻ boʻgʻimi faoliyati.", topic: 5 },
    ],
    kidItems: [
      { icon: "kid", t: "Tishlarni davolash", d: "Bolalar stomatologi sut va doimiy tishlardagi kariesni davolaydi.", topic: 4 },
      { icon: "microscope", t: "Mikroskop ostida", d: "Bolalar tishlarini mikroskop ostida davolash.", topic: 4 },
      { icon: "aligner", t: "Bolalar ortodonti", d: "Tishlar oʻsayotgan paytda tishlamni toʻgʻrilaydi.", topic: 4 },
    ],
    kidsTile: { t: "Bolalarga", d: "Sut va doimiy tishlarni davolash, mikroskop, bolalar ortodonti.", cta: "Koʻrish" },
    consult: {
      t: "Nimadan boshlashni bilmayapsizmi?",
      d: "Konsultatsiya narxi 100 000 soʻm: shifokor koʻrikdan oʻtkazadi, variantlarni tushuntiradi va davolash narxini aytadi.",
      cta: "Konsultatsiyaga yozilish",
    },
  },

  doctor: {
    title: "Shifokor",
    role: "Implantolog, stomatolog-ortoped",
    stats: [
      { n: "8", u: "yil", l: "tajriba" },
      { n: "PhD", u: "", l: "ilmiy daraja" },
      { n: "9–22", u: "", l: "qabul soatlari" },
    ],
    skills: ["Implantatsiya", "Kaplamalar", "Vinirlar", "Tish olib tashlash"],
    quote: "Estetika — bu shunchaki oq va tekis tishlar emas, balki uygʻunlik.",
    quoteSource: "Shifokorning Instagramidan, tarjima",
    instagram: "Shifokor ishlari Instagramda",
    telegram: "Shifokorga yozish",
  },

  cases: {
    title: "Oldin va keyin",
    lede: "Dent Up shifokorining ishlari. Har bir holat oʻziga xos: davolash rejasi va natija koʻrikka bogʻliq.",
    items: [
      {
        key: "caries",
        icon: "restore",
        t: "Chaynov tishdagi kariesni davolash",
        d: "Tish kofferdam bilan ajratilgan, karies olib tashlangan, tish shakli plomba bilan tiklangan.",
        shots: [
          { file: "case-caries-before", label: "Oldin", alt: "Kofferdam ostidagi kariesli chaynov tish, davolashdan oldin" },
          { file: "case-caries-after", label: "Keyin", alt: "Oʻsha tish davolashdan keyin: shakli plomba bilan tiklangan" },
        ],
      },
      {
        key: "xray",
        icon: "implant",
        t: "Implantatsiya",
        d: "Rentgen suratlari: implant yoʻnalishini tekshirish va oʻrnatilgan implantlar.",
        shots: [
          { file: "case-xray-before", label: "Jarayonda", alt: "Implantatsiya jarayonidagi rentgen: suyakdagi yoʻnaltiruvchi shtift" },
          { file: "case-xray-after", label: "Keyin", alt: "Implantatsiyadan keyingi rentgen: oʻrnatilgan implantlar" },
        ],
      },
    ],
    note: "Suratlar shifokor amaliyotidan. Davolash natijasi klinik holatga bogʻliq.",
  },

  kids: {
    title: "Bolalar qabuli",
    lede: "Sut va doimiy tishlarni davolaymiz, tishlamni kuzatib boramiz. 3,5 yoshli bemorimizning onasi shunday yozgan (sharh rus tilida):",
    points: ["Sut va doimiy tishlarni davolash", "Mikroskop ostida davolash", "Bolalar ortodonti"],
    review:
      "Были здесь с дочкой ей 3,5 года. Врач молодец, пытался найти подход к ребёнку и при этом работал быстро. … Убрали кариес и цены адекватные.",
    reviewMeta: "2GISdagi sharh, 2026-yil 28-aprel",
    reviewLink: "2GISda oʻqish",
    cta: "Bolani yozdirish",
  },

  faq: {
    title: "Koʻp beriladigan savollar",
    aside: {
      t: "Javob topmadingizmi?",
      d: "Shifokorga Telegramda yozing yoki qoʻngʻiroq qiling. Yozilishdan oldin savollarga javob beramiz.",
    },
    items: [
      {
        q: "Soat nechagacha ishlaysiz?",
        a: "Klinika 9:00 dan 22:00 gacha qabul qiladi. Qoʻngʻiroq qiling yoki yozing — qabul vaqtini kelishib olamiz.",
      },
      {
        q: "Davolash qancha turadi?",
        a: "Davolash narxini shifokor koʻrikdan soʻng aytadi: u nechta tish va qanday ish kerakligiga bogʻliq. Konsultatsiya narxi 100 000 soʻm.",
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
        a: "Chilonzor, 7-kvartal, 26-uy, 51-xonadon, birinchi qavat. Moʻljal — Oqtepa aylanasi, eng yaqin metro — «Novza».",
      },
    ],
  },

  visit: {
    title: "Bizni qanday topish mumkin",
    address: "Chilonzor 7-kvartal, 26-uy, 51-xonadon",
    addressMore: "1-qavat, Chilonzor tumani, Toshkent, 100096",
    landmark: "Moʻljal — Oqtepa aylanasi. Eng yaqin metro — «Novza».",
    rows: [
      { icon: "clock", k: "Ish vaqti", v: "9:00 dan 22:00 gacha" },
      { icon: "card", k: "Toʻlov", v: "Karta, naqd pul, kartadan oʻtkazma" },
    ],
    routes: "Yoʻnalish qurish",
    routeYandex: "Yandex Xaritalar",
    routeGis: "2GIS",
    routeGoogle: "Google Maps",
    door: { cap: "Kirish shunday koʻrinadi: shisha eshik ustida DENT UP peshlavhasi", alt: "Dent Up klinikasiga kirish: shisha eshik ustida DENT UP peshlavhasi" },
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
    title: "9:00 dan 22:00 gacha qoʻngʻiroq qiling",
    lede: "Nima bezovta qilayotganini ayting — qabul vaqtini kelishib olamiz.",
    call: "Qoʻngʻiroq qilish",
    write: "Telegramda yozish",
  },

  footer: {
    about: "Chilonzordagi stomatologiya, Toshkent. Qabul 9:00 dan 22:00 gacha.",
    warning: "Qarshi koʻrsatmalar mavjud. Mutaxassis maslahati zarur.",
    note: "Saytdagi maʼlumotlar shifokor koʻrigining oʻrnini bosmaydi.",
    top: "Yuqoriga",
  },

  callbar: { call: "Qoʻngʻiroq", write: "Telegram" },

  notFound: {
    title: "Bunday sahifa yoʻq",
    text: "Havola eskirgan boʻlishi mumkin. Klinika haqida hammasi bosh sahifada, yozilish esa telefon orqali, 9:00 dan 22:00 gacha.",
    home: "Bosh sahifaga",
  },
};
