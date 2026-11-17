// Oʻzbekcha matnlar (lotin yozuvi). oʻ va gʻ harflarida U+02BB (ʻ), tutuq belgisida U+02BC (ʼ).
// Tarjima ona tili egasi tomonidan tekshirilishi kerak (NOTES.md).

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
    { id: "day", label: "Qabul vaqti" },
    { id: "doctor", label: "Shifokor" },
    { id: "kids", label: "Bolalarga" },
    { id: "contacts", label: "Aloqa" },
  ],
  menu: { open: "Menyu", close: "Menyuni yopish" },
  theme: { toDay: "Kunduzgi mavzuni yoqish", toNight: "Tungi mavzuni yoqish" },
  langSwitch: "Сайт на русском",

  hero: {
    badge: "Yozilish kecha-kunduz ochiq",
    title: ["Hech qachon yopilmaydigan", "stomatologiya"],
    lede: "Chilonzordagi Dent Up oldindan yozilish orqali sutkaning istalgan vaqtida qabul qiladi. Implantolog shifokordan implantatsiya, tojlar va vinirlar, bolalar tishlarini davolash.",
    call: "Qoʻngʻiroq qilish",
    write: "Telegramda yozish",
    rating: "2GISda 5,0",
    ratingNote: "1 ta sharh",
    clockCaption: "Hozir Toshkentda",
    clockStatic: "24/7",
    status: "Yozilish ochiq",
    statusStatic: "Kecha-kunduz, oldindan yozilish bilan",
    parts: ["tun", "tong", "kun", "kech"],
    dialLabel: "Sutka siferblati: klinika istalgan soatda oldindan yozilish orqali qabul qiladi",
  },

  benefits: [
    { icon: "clock24", t: "Kecha-kunduz", d: "Istalgan soatda, hatto tunda ham oldindan yozilish orqali qabul qilamiz." },
    { icon: "free", t: "Konsultatsiya bepul", d: "Shifokor koʻrikdan oʻtkazadi va davolashdan oldin narxini aytadi." },
    { icon: "award", t: "Implantolog, PhD", d: "8 yillik tajriba: implantlar, tojlar, vinirlar." },
    { icon: "kid", t: "Bolalarni davolaymiz", d: "Bolalar stomatologi, ortodont, mikroskop ostida davolash." },
  ],

  marquee: [
    "Implantatsiya",
    "Sirkoniy tojlar",
    "Keramik vinirlar",
    "Breketlar",
    "Tishlarni restavratsiya qilish",
    "Milklarni davolash",
    "Bolalar stomatologiyasi",
    "Mikroskop ostida davolash",
  ],

  scene: {
    title: "Sizga qulay vaqtda keling",
    lede: "Sutkani varaqlang: klinika ertalab ham, tunda ham oldindan yozilish orqali qabul qiladi.",
    moments: [
      { time: "07:30", icon: "sunrise", t: "Ishdan oldin", d: "Erta tongga yoziling va ishga ulguring." },
      { time: "13:00", icon: "sun", t: "Tushlik tanaffusida", d: "Tanaffus paytida konsultatsiya yoki koʻrik." },
      { time: "19:30", icon: "sunset", t: "Ishdan keyin", d: "Ishdan javob soʻrashning hojati yoʻq: kechqurun keling." },
      { time: "02:00", icon: "moon", t: "Tunda ogʻrisa", d: "Istalgan vaqtda qoʻngʻiroq qiling — qachon kelishni kelishib olamiz." },
    ],
    cta: "Vaqtni tanlash",
  },

  book: {
    title: "Bir daqiqada yozilish",
    lede: "Vaqt va nima bezovta qilayotganini tanlang — shifokorga xabar oʻzi tayyorlanadi. Faqat «Yuborish»ni bosish qoladi.",
    steps: [
      { icon: "chat", t: "Yozing yoki qoʻngʻiroq qiling", d: "Telegram, WhatsApp yoki telefon orqali, istalgan vaqtda." },
      { icon: "calendar", t: "Vaqtni kelishib oling", d: "Tong, kun, kech yoki tun — oʻzingizga qulayini." },
      { icon: "pin", t: "Keling", d: "Chilonzor 7-kvartal, 26-uy, birinchi qavat. Moʻljal — Oqtepa aylanasi." },
    ],
    composer: {
      title: "Xabarni tayyorlang",
      timeLabel: "Qachon qulay",
      times: ["Imkon qadar tezroq", "Ertalab", "Kunduzi", "Kechqurun", "Tunda"],
      timeIcons: ["bolt", "sunrise", "sun", "sunset", "moon"],
      topicLabel: "Nima bezovta qilyapti",
      topics: ["Tish ogʻriyapti", "Implantatsiya", "Toj yoki vinir", "Breketlar", "Bolani davolash", "Konsultatsiya kerak"],
      topicIcons: ["bolt", "implant", "crown", "braces", "kid", "consult"],
      chatSub: "Shifokor Telegrami, yozilish",
      chatStatus: "Yozilish kecha-kunduz",
      greeting: "Assalomu alaykum! Dent Up klinikasiga yozilmoqchiman.",
      topicPrefix: "Sabab:",
      timePrefix: "Qulay vaqt:",
      telegram: "Telegramda yuborish",
      whatsapp: "WhatsApp",
      call: "Qoʻngʻiroq qilish",
      hint: "Telegram tayyor matn bilan ochiladi. Xabar shifokorga sizdan boradi, javob oʻsha chatda keladi.",
    },
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
      { icon: "crown", t: "Tojlar", d: "Sirkoniy va metallokeramika. Eski oltin tojlarni sirkoniy tojlarga almashtiramiz.", topic: 2 },
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
      d: "Bepul konsultatsiyaga keling: shifokor koʻrikdan oʻtkazadi, variantlarni tushuntiradi va narxini aytadi.",
      cta: "Konsultatsiyaga yozilish",
    },
  },

  doctor: {
    title: "Shifokor",
    role: "Implantolog, stomatolog-ortoped",
    stats: [
      { n: "8", u: "yil", l: "tajriba" },
      { n: "PhD", u: "", l: "ilmiy daraja" },
      { n: "24/7", u: "", l: "yozilish" },
    ],
    skills: ["Implantatsiya", "Tojlar", "Vinirlar", "Tish olib tashlash"],
    quote: "Estetika — bu shunchaki oq va tekis tishlar emas, balki uygʻunlik.",
    quoteSource: "Shifokorning Instagramidan, tarjima",
    instagram: "Shifokor ishlari Instagramda",
    telegram: "Shifokorga yozish",
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
      { icon: "clock24", k: "Ish vaqti", v: "Kecha-kunduz, oldindan yozilish bilan" },
      { icon: "card", k: "Toʻlov", v: "Karta, naqd pul, kartadan oʻtkazma" },
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
    write: "Telegramda yozish",
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
