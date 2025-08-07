export const summary = {
  general: "Toplantı, Norman'un Otokent ile ilgili sunumunun devamı üzerine odaklanmıştır. Ayrıca Axess dokunmatik ekranın yenilenmesi (refresh) ve Euro projeksiyonların tamamlanması gibi konular da ele alınmıştır. Agent Walker, Çıkamıyorum promosyonu ve John Casey'un düzenleyeceği grafiklere bakma görevleri belirtmiştir. Sosyal medya testleri, Sefalet testi ve dashfordlar üzerinde de çalışmalar yapılacaktır.",
  purpose: "Otokent sunumunun tamamlanması, Axess dokunmatik ekranın yenilenmesi, Euro projeksiyonların ilerletilmesi ve sosyal medya ile ilgili görevlerin dağıtılması.",
  mainTopics: [
    "Otokent Sunumu",
    "Axess Dokunmatik Ekran Yenileme",
    "Euro Projeksiyonlar",
    "Sosyal Medya Testleri",
    "Sefalet Testi",
    "Dashfordlar",
  ],
  decisions: "Belirli bir karar alınmamıştır; daha çok görev dağıtımı ve yapılacak işlerin planlanması yapılmıştır.",
};

export const topics = [
  {
    title: "Otokent Sunumu",
    notes: [
      "Norman, Otokent ile ilgili sunumunu tamamlamaya çalışıyor. Video kısmını bitirdikten sonra diğer bölümlere geçecek.",
      "Sosyal medya tarafında destek gerekirse Norman bakacak.",
    ],
  },
  {
    title: "Axess Dokunmatik Ekran Yenileme (Refresh)",
    notes: [
      "Axess dokunmatik ekranın yenilenmesi gerekmektedir.",
      "Bu işlem genellikle uzun sürmekteymiş.",
    ],
  },
  {
    title: "Euro Projeksiyonlar",
    notes: [
      "Agent Walker, bugün bir Euro projeksiyonu daha bitirmeyi planlıyor.",
      "Daha sonra Çıkamıyorum promosyonu ve John Casey'un düzenleyeceği grafiklere bakacak.",
    ],
  },
  {
    title: "Sosyal Medya Testleri",
    notes: [
      "Orion, Norman'dan sosyal medya ile ilgili isteklerde bulunacak ve testlerini yapacaktır.",
      "Agent da sabah Sefalet testi yapıp öğleden sonra sosyal medya uygulamasına bakacak.",
    ],
  },
  { title: "Sefalet Testi", notes: ["Agent, sabah saatlerinde Sefalet testini yapacak."] },
  { title: "Dashfordlar", notes: ["John Casey, dashfordları sahiplenecek ve üzerinde çalışacaktır."] },
];

export const tasks = [
  { person: "Norman", task: "Otokent sunumunu tamamlamak", due: "Bugün" },
  { person: "Agent Walker", task: "Euro projeksiyonu bitirmek, Çıkamıyorum promosyonuna bakmak, John Casey'nin düzenleyeceği grafiklere göz atmak", due: "Bugün" },
  { person: "Orion", task: "Sosyal medya testlerini yapmak", due: "Bugün" },
  { person: "Agent", task: "Sefalet testi yapmak, sosyal medya uygulamasına bakmak", due: "Bugün" },
  { person: "John Casey", task: "Axess dokunmatik ekran yenileme (refresh), dashfordlar üzerinde çalışmak", due: "Belirlenen süre içinde" },
];

export const mood = {
  positive: "Çalışma planlaması yapılmış, görevler dağıtılmış ve herkesin bir hedefi var. \"Kolay gelsin\" dileği ile olumlu bir atmosfer sağlanmış.",
  negative: "Axess dokunmatik ekran yenileme işleminin uzun süreceği belirtilmiş, bu da potansiyel bir gecikmeye işaret ediyor olabilir.",
  uncertain: "Sosyal medya tarafında destek gerekiyorsa kimin bakacağı henüz netleşmemiş.",
};

export const nextSteps = {
  followUp: [
    "Otokent sunumunun tamamlanması",
    "Axess dokunmatik ekran yenileme işleminin ilerleyişi",
    "Euro projeksiyonların durumu",
    "Sosyal medya testlerinin sonuçları",
    "Dashfordlar üzerindeki çalışmalar",
  ],
  important: "Otokent sunumunu tamamlamak ve Axess dokunmatik ekran yenileme işlemini başlatmak.",
};