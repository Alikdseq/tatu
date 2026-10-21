const MARKET_TOTAL = 345000;
const OFFER_TOTAL = 220000;

/** Рыночные веса блоков — только для пересчёта, на экране цен по блокам нет */
const BLOCKS = [
  {
    id: "arch",
    market: 20000,
    title: "Архитектура, подготовка проекта и адаптация структуры референса",
    lead: "Собираю каркас магазина под MONRO: структура как у удобного fashion-сайта, но под ваш бренд и сценарий заявок.",
    start: true
  },
  {
    id: "design",
    market: 30000,
    title: "Адаптация дизайна под MONRO: цвета, типографика, элементы интерфейса",
    lead: "Розовая эстетика, логотип, шрифты и компоненты — чтобы сайт выглядел как MONRO, а не как шаблон.",
    start: true
  },
  {
    id: "home",
    market: 35000,
    title: "Главная страница, общие компоненты, адаптивная вёрстка",
    lead: "Обложка, блоки коллекций и новинок, шапка, подвал — удобно на телефоне и на компьютере.",
    start: true
  },
  {
    id: "catalog",
    market: 40000,
    title: "Каталог, категории, фильтры, поиск и сортировка",
    lead: "Покупательница быстро находит нужную вещь: категории, фильтры по размеру и цене, поиск.",
    start: true
  },
  {
    id: "pdp",
    market: 25000,
    title: "Карточки товаров, размеры, цвета, остатки, размерные таблицы",
    lead: "Галерея, выбор размера и цвета, наличие, таблица размеров — чтобы было понятно, что заказать.",
    start: true
  },
  {
    id: "cart",
    market: 35000,
    title: "Корзина и оформление заявки",
    lead: "Список вещей, форма заявки, номер обращения. Без онлайн-оплаты: менеджер связывается и подтверждает заказ.",
    start: true
  },
  {
    id: "account",
    market: 35000,
    title: "Регистрация, авторизация, восстановление пароля, профиль и избранное",
    lead: "Личный кабинет покупательницы: вход, профиль, избранные товары. Можно снять, если на первом этапе не нужно.",
    start: false
  },
  {
    id: "admin",
    market: 50000,
    title: "Административная панель и управление каталогом",
    lead: "Товары, фото, цены, категории. Плюс простое добавление через Telegram или короткую форму со ссылкой для Instagram.",
    start: true
  },
  {
    id: "orders",
    market: 20000,
    title: "Управление заявками и списание остатков после подтверждения",
    lead: "Список заявок, статусы, контакты клиентки. Остатки обновляются после подтверждения заказа.",
    start: true
  },
  {
    id: "info",
    market: 10000,
    title: "Информационные страницы, юридические документы, контакты",
    lead: "Магазин, доставка, обмен, контакты, политика и согласия — всё, что нужно для спокойного запуска.",
    start: true
  },
  {
    id: "seo",
    market: 10000,
    title: "SEO, Яндекс Метрика, технические настройки",
    lead: "Базовая поисковая настройка, счётчик и цели по заявкам. Первую позицию в поиске не обещаю.",
    start: true
  },
  {
    id: "launch",
    market: 35000,
    title: "Тестирование, безопасность, резервное копирование и запуск",
    lead: "Проверка на телефонах, защита форм, бэкапы, публикация на домене и передача доступов.",
    start: true
  }
];

if (BLOCKS.reduce((s, b) => s + b.market, 0) !== MARKET_TOTAL) {
  throw new Error("Рыночная сумма блоков должна быть 345 000");
}

const selected = new Set(BLOCKS.map((b) => b.id));
let preset = "full";
const STORE = "monro-kp-v1";

function loadStore() {
  if (typeof localStorage === "undefined") return;
  try {
    const data = JSON.parse(localStorage.getItem(STORE) || "");
    if (!data || !Array.isArray(data.ids)) return;
    selected.clear();
    data.ids.forEach((id) => {
      if (BLOCKS.some((b) => b.id === id)) selected.add(id);
    });
    preset = ["full", "start", "custom"].includes(data.preset) ? data.preset : "custom";
  } catch (e) {
    /* полный проект по умолчанию */
  }
}

function saveStore() {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORE, JSON.stringify({ preset, ids: [...selected] }));
}

function rub(n) {
  return n.toLocaleString("ru-RU") + " ₽";
}

function marketSelected() {
  return BLOCKS.reduce((s, b) => s + (selected.has(b.id) ? b.market : 0), 0);
}

/** Цена предложения пропорционально рыночным весам выбранных блоков */
function offerSelected() {
  const market = marketSelected();
  if (market === 0) return 0;
  if (market === MARKET_TOTAL) return OFFER_TOTAL;
  return Math.round((market * OFFER_TOTAL) / MARKET_TOTAL / 1000) * 1000;
}

function applyPreset(name) {
  preset = name;
  selected.clear();
  if (name === "full") BLOCKS.forEach((b) => selected.add(b.id));
  if (name === "start") BLOCKS.filter((b) => b.start).forEach((b) => selected.add(b.id));
  render();
}

function renderPresets() {
  const root = document.getElementById("presets");
  const cards = [
    ["full", "Полный проект", "Все 12 блоков — 220 000 ₽."],
    ["start", "Без личного кабинета", "Запуск магазина и админки, ЛК можно позже."],
    ["custom", "Собрать самому", "Снимите галочки с ненужного — цена станет меньше."]
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
  root.innerHTML = BLOCKS.map((block, index) => {
    const on = selected.has(block.id);
    return `
      <article class="block${on ? "" : " off"}" data-section="${block.id}">
        <div class="block-head">
          <label class="check"><input type="checkbox" data-block-toggle="${block.id}" ${on ? "checked" : ""}></label>
          <div>
            <h2>${index + 1}. ${block.title}</h2>
            <div class="block-meta">${on ? "Включено в состав" : "Не включено — цена проекта меньше"}</div>
          </div>
        </div>
        <p class="block-lead">${block.lead}</p>
      </article>`;
  }).join("");

  root.querySelectorAll("[data-block-toggle]").forEach((input) => {
    input.addEventListener("change", () => {
      preset = "custom";
      if (input.checked) selected.add(input.dataset.blockToggle);
      else selected.delete(input.dataset.blockToggle);
      render();
    });
  });
}

function summaryText() {
  const offer = offerSelected();
  const market = marketSelected();
  const lines = [
    "MONRO — коммерческое предложение",
    "Рыночная оценка выбранного состава: " + rub(market),
    "Стоимость проекта: " + rub(offer),
    "Полный проект: " + rub(OFFER_TOTAL) + " (рынок " + rub(MARKET_TOTAL) + ")",
    "",
    "Состав:"
  ];
  BLOCKS.forEach((block, index) => {
    if (!selected.has(block.id)) return;
    lines.push((index + 1) + ". " + block.title);
  });
  lines.push("");
  lines.push("Если убрать часть блоков — цена меньше.");
  return lines.join("\n").trim();
}

function renderSummary() {
  const offer = offerSelected();
  const market = marketSelected();
  const count = selected.size;
  const isFull = count === BLOCKS.length;

  const html = `
    <h2>${isFull ? "Полный проект" : "Ваш состав"}</h2>
    <p class="market-line">Рынок: <s>${rub(market)}</s></p>
    <p class="total">${rub(offer)}</p>
    <p>Отмечено блоков: ${count} из ${BLOCKS.length}</p>
    <p class="note">${isFull
      ? "Полный состав — фиксированные 220 000 ₽. Рыночная оценка такого объёма — 345 000 ₽."
      : "Часть блоков снята — стоимость ниже полного проекта. Точную цифру зафиксируем в переписке."}</p>
    <button type="button" class="copy" id="copy">Скопировать состав</button>
    <a class="tg" href="https://t.me/A_7l_i" target="_blank" rel="noopener">Написать в Telegram</a>
    <p>Почта alihanskaev@gmail.com<br>Телефон +7 918 702-09-87</p>
  `;
  document.getElementById("summary").innerHTML = html;
  document.getElementById("dock").innerHTML = `
    <div class="dock-row">
      <div>
        <div style="font-size:12px;color:#c9b4bc">${isFull ? "Полный проект" : "Ваш состав"} · рынок <s style="opacity:.8">${rub(market)}</s></div>
        <strong>${rub(offer)}</strong>
      </div>
      <button type="button" class="copy" id="copy-dock">Скопировать</button>
    </div>`;
  document.querySelectorAll("#copy, #copy-dock").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = summaryText();
      try {
        await navigator.clipboard.writeText(text);
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
