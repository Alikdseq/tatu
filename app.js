const TOTAL = 55000;

const SECTIONS = [
  {
    id: "stage1",
    title: "Этап 1 — самое нужное",
    lead: "После этого этапа уже можно менять цены, фото, статусы, контакты и акции.",
    stageTotal: 26000,
    items: [
      { id: "base", num: "—", title: "База админки", text: "Вход в панель, разделы, сохранение данных.", price: 4000, start: true },
      { id: "contacts", num: "1", title: "Контакты компании", text: "Телефон, WhatsApp, почта, адрес — везде на сайте.", price: 2000, start: true },
      { id: "requisites", num: "2", title: "Реквизиты", text: "ИП/организация, ИНН, текст в подвале.", price: 1200, start: true },
      { id: "tech-data", num: "8.1", title: "Техника — основные данные", text: "Название, категория, модель, описания.", price: 2700, start: true },
      { id: "tech-price", num: "8.2", title: "Техника — цены", text: "Цена за час / за смену.", price: 1600, start: true },
      { id: "tech-status", num: "8.3", title: "Техника — статус", text: "Свободна / на выезде / недоступна.", price: 1200, start: true },
      { id: "tech-photo", num: "8.4", title: "Техника — фото", text: "Главное фото + галерея, загрузка.", price: 3100, start: true },
      { id: "tech-specs", num: "8.5", title: "Техника — характеристики", text: "Краткие и полные характеристики.", price: 2000, start: true },
      { id: "tech-crud", num: "8.7", title: "Добавление и удаление техники", text: "Новая машина / убрать старую.", price: 2400, start: true },
      { id: "rent", num: "9", title: "Условия аренды", text: "Что входит в цену, скидка от нескольких дней, тексты формы.", price: 1500, start: true },
      { id: "promo", num: "12", title: "Акции и скидки", text: "Страница акций, баннеры, сроки, вкл/выкл.", price: 2400, start: true },
      { id: "forms", num: "20", title: "Формы заявок", text: "Заголовки, подсказки, куда уходит заявка.", price: 1200, start: true },
      { id: "map", num: "21", title: "Карта на контактах", text: "Адрес и метка на карте.", price: 700, start: true }
    ]
  },
  {
    id: "stage2",
    title: "Этап 2 — средний",
    lead: "Инструменты, услуги, операторы, отзывы и города выезда.",
    stageTotal: 17000,
    items: [
      { id: "tools", num: "10", title: "Инструменты", text: "Список, название, фото, порядок, что на главной.", price: 4200, start: false },
      { id: "services", num: "11", title: "Услуги", text: "Тексты, цена «от», фото, галерея, популярность, порядок, добавить/убрать; ссылки в подвале.", price: 8200, start: false },
      { id: "operators", num: "15", title: "Операторы", text: "Фото, ФИО, добавить / убрать.", price: 1700, start: false },
      { id: "reviews", num: "16", title: "Отзывы клиентов", text: "Имя, услуга, текст, оценка, счётчик.", price: 1900, start: false },
      { id: "cities", num: "19", title: "Города", text: "Список городов выезда.", price: 1000, start: false }
    ]
  },
  {
    id: "stage3",
    title: "Этап 3 — полный",
    lead: "Контент главной, «О компании», основатель, медиа и служебные мелочи.",
    stageTotal: 12000,
    items: [
      { id: "rating", num: "3", title: "Рейтинг в шапке", text: "Оценка и фраза про отзывы.", price: 400, start: false },
      { id: "hero", num: "4", title: "Главная — первый экран", text: "Заголовок, текст, преимущества, главное фото.", price: 1600, start: false },
      { id: "home-tech", num: "5", title: "Популярная техника на главной", text: "Какие единицы показывать.", price: 800, start: false },
      { id: "home-services", num: "6", title: "Популярные услуги на главной", text: "Какие услуги в карусели.", price: 800, start: false },
      { id: "why", num: "7", title: "Блок «Почему нас выбирают»", text: "Заголовок и карточки.", price: 1200, start: false },
      { id: "tech-home", num: "8.6", title: "Показывать технику на главной", text: "Галочка у единицы техники.", price: 400, start: false },
      { id: "about", num: "13", title: "Страница «О компании»", text: "Тексты, фото, направления, цифры.", price: 1600, start: false },
      { id: "founder", num: "14", title: "Блок основателя", text: "Фото, текст, условия, подпись.", price: 1200, start: false },
      { id: "thanks", num: "17", title: "Благодарности", text: "Сканы писем, добавить новые.", price: 800, start: false },
      { id: "video", num: "18", title: "Видео с объектов", text: "Ролик, название, обложка, порядок.", price: 1200, start: false },
      { id: "privacy", num: "22", title: "Политика конфиденциальности", text: "Текст и дата обновления.", price: 400, start: false },
      { id: "logo", num: "23", title: "Логотип и название", text: "Логотип, название компании.", price: 400, start: false },
      { id: "seo", num: "24", title: "Тексты для поисковиков", text: "Заголовки и описания для Яндекса/Google.", price: 800, start: false },
      { id: "misc", num: "25", title: "Служебные мелочи", text: "Год в подвале, текст 404, категории.", price: 400, start: false }
    ]
  }
];

const ALL = SECTIONS.flatMap((s) => s.items.map((item) => ({
  ...item,
  sid: s.id + "-" + item.id
})));

const checkSum = ALL.reduce((s, i) => s + i.price, 0);
if (checkSum !== TOTAL) {
  throw new Error("Сумма пунктов " + checkSum + " ≠ " + TOTAL);
}

const selected = new Set(ALL.map((i) => i.sid));
const openItems = new Set();
let preset = "full";
const STORE = "ringoostroy-admin-kp-v1";

function loadStore() {
  if (typeof localStorage === "undefined") return;
  try {
    const data = JSON.parse(localStorage.getItem(STORE) || "");
    if (!data || !Array.isArray(data.ids)) return;
    selected.clear();
    data.ids.forEach((id) => {
      if (ALL.some((item) => item.sid === id)) selected.add(id);
    });
    preset = ["full", "stage1", "stage12", "custom"].includes(data.preset) ? data.preset : "custom";
  } catch (e) {
    /* полный набор */
  }
}

function saveStore() {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORE, JSON.stringify({ preset, ids: [...selected] }));
}

function rub(n) {
  return n.toLocaleString("ru-RU") + " ₽";
}

function sumSelected() {
  return ALL.reduce((s, i) => s + (selected.has(i.sid) ? i.price : 0), 0);
}

function sectionSum(section) {
  return section.items.reduce((s, item) => {
    const sid = section.id + "-" + item.id;
    return s + (selected.has(sid) ? item.price : 0);
  }, 0);
}

function applyPreset(name) {
  preset = name;
  selected.clear();
  if (name === "full") ALL.forEach((i) => selected.add(i.sid));
  if (name === "stage1") {
    SECTIONS[0].items.forEach((item) => selected.add("stage1-" + item.id));
  }
  if (name === "stage12") {
    SECTIONS[0].items.forEach((item) => selected.add("stage1-" + item.id));
    SECTIONS[1].items.forEach((item) => selected.add("stage2-" + item.id));
  }
  render();
}

function renderPresets() {
  const root = document.getElementById("presets");
  const cards = [
    ["full", "Всё сразу", "55 000 ₽ — полный список."],
    ["stage1", "Только этап 1", "26 000 ₽ — минимальный набор."],
    ["stage12", "Этапы 1+2", "43 000 ₽ — без контента этапа 3."],
    ["custom", "Собрать самому", "Снимите лишнее — сумма меньше."]
  ];
  root.innerHTML = cards.map(([id, title, text]) => (
    `<button type="button" class="preset${preset === id ? " active" : ""}" data-preset="${id}"><b>${title}</b><span>${text}</span></button>`
  )).join("");
  root.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => applyPreset(btn.dataset.preset));
  });
}

function renderSections() {
  const root = document.getElementById("sections");
  root.innerHTML = SECTIONS.map((section) => {
    const items = section.items.map((item) => ({
      ...item,
      sid: section.id + "-" + item.id
    }));
    const on = items.filter((i) => selected.has(i.sid)).length;
    const sum = sectionSum(section);
    return `
      <article class="block" data-section="${section.id}">
        <div class="block-head">
          <label class="check"><input type="checkbox" data-section-toggle="${section.id}" ${on === items.length ? "checked" : ""}></label>
          <div>
            <h2>${section.title}</h2>
            <div class="block-meta">Отмечено ${on} из ${items.length} · этап целиком ${rub(section.stageTotal)}</div>
          </div>
          <div class="block-sum">${rub(sum)}</div>
        </div>
        <p class="block-lead">${section.lead}</p>
        ${items.map((item) => `
          <div class="item${openItems.has(item.sid) ? " open" : ""}${selected.has(item.sid) ? "" : " off"}" data-item="${item.sid}">
            <div class="item-row">
              <label class="check"><input type="checkbox" data-item-toggle="${item.sid}" ${selected.has(item.sid) ? "checked" : ""}></label>
              <button type="button" class="item-main" aria-expanded="${openItems.has(item.sid) ? "true" : "false"}">
                <span class="item-title">${item.num}. ${item.title}<span class="chev"> подробнее</span></span>
                <span class="item-price">${rub(item.price)}</span>
              </button>
            </div>
            <div class="item-body"><p>${item.text}</p></div>
          </div>
        `).join("")}
      </article>`;
  }).join("");

  root.querySelectorAll("[data-section-toggle]").forEach((input) => {
    const section = SECTIONS.find((s) => s.id === input.dataset.sectionToggle);
    const items = section.items.map((item) => section.id + "-" + item.id);
    const on = items.filter((id) => selected.has(id)).length;
    input.indeterminate = on > 0 && on < items.length;
    input.addEventListener("change", () => {
      preset = "custom";
      items.forEach((id) => {
        if (input.checked) selected.add(id);
        else selected.delete(id);
      });
      render();
    });
  });

  root.querySelectorAll("[data-item-toggle]").forEach((input) => {
    input.addEventListener("change", () => {
      preset = "custom";
      if (input.checked) selected.add(input.dataset.itemToggle);
      else selected.delete(input.dataset.itemToggle);
      render();
    });
  });

  root.querySelectorAll(".item-main").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".item");
      const id = item.dataset.item;
      const open = item.classList.toggle("open");
      if (open) openItems.add(id);
      else openItems.delete(id);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
}

function summaryText() {
  const lines = [
    "RingooStroy — смета админ-панели",
    "Сумма выбранного: " + rub(sumSelected()),
    "Полный проект: " + rub(TOTAL),
    ""
  ];
  SECTIONS.forEach((section) => {
    const picked = section.items.filter((item) => selected.has(section.id + "-" + item.id));
    if (!picked.length) return;
    lines.push(section.title + " — " + rub(sectionSum(section)));
    picked.forEach((item) => {
      lines.push("• " + item.num + ". " + item.title + " — " + rub(item.price));
    });
    lines.push("");
  });
  return lines.join("\n").trim();
}

function renderSummary() {
  const sum = sumSelected();
  const count = ALL.filter((i) => selected.has(i.sid)).length;
  const html = `
    <h2>${sum === TOTAL ? "Полный проект" : "Ваш состав"}</h2>
    <p class="total">${rub(sum)}</p>
    <p>Отмечено пунктов: ${count} из ${ALL.length}</p>
    <p class="note">У каждого пункта своя цена. Если снять галочки — итог станет меньше. Можно платить поэтапно или сразу за всё.</p>
    <button type="button" class="copy" id="copy">Скопировать состав</button>
    <a class="tg" href="https://t.me/A_7l_i" target="_blank" rel="noopener">Написать в Telegram</a>
    <p>Почта alihanskaev@gmail.com<br>Телефон +7 918 702-09-87</p>
  `;
  document.getElementById("summary").innerHTML = html;
  document.getElementById("dock").innerHTML = `
    <div class="dock-row">
      <div>
        <div style="font-size:12px;color:#b7c3ba">${sum === TOTAL ? "Полный проект" : "Ваш состав"}</div>
        <strong>${rub(sum)}</strong>
      </div>
      <button type="button" class="copy" id="copy-dock">Скопировать</button>
    </div>`;
  document.querySelectorAll("#copy, #copy-dock").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(summaryText());
        btn.textContent = "Скопировано";
      } catch (e) {
        btn.textContent = "Не вышло скопировать";
      }
      setTimeout(() => {
        btn.textContent = btn.id === "copy" ? "Скопировать состав" : "Скопировать";
      }, 1600);
    });
  });
}

function render() {
  renderPresets();
  renderSections();
  renderSummary();
  saveStore();
}

loadStore();
if (typeof document !== "undefined") render();
