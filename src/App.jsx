import React, { useMemo, useState, useEffect } from "react";

/**
 * 美甲算算 NailCalc - 核心組件
 * 2026 1 20 最新修正並新增營收報表功能
 */

// 內建 SplashScreen
const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 650);
    const hideTimer = setTimeout(() => setIsVisible(false), 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center",
        "transition-opacity duration-300 ease-out",
        isFadingOut ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div
        className={[
          "w-20 h-20 bg-[#9F7D6B] rounded-3xl flex items-center justify-center mb-4",
          "transition-transform duration-500 ease-out",
          isFadingOut ? "scale-[0.98]" : "scale-100",
        ].join(" ")}
        style={{ animation: "floatY 1.6s ease-in-out infinite" }}
      >
        <img
          src="/logo-mark.png"
          alt="NailCalc logo"
          className="w-20 h-20"
          draggable="false"
        />
      </div>

      <h1
        className={[
          "text-xl font-bold tracking-widest text-[#5F4636]",
          "transition-all duration-500 ease-out",
          isFadingOut
            ? "opacity-0 translate-y-[2px]"
            : "opacity-100 translate-y-0",
        ].join(" ")}
      >
        NailCalc
      </h1>

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

// 圖示組件 - 使用內建 SVG 以確保跨平台兼容性
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    settings: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    chart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    trash: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    download: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    plus: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ),
    minus: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ),
    copy: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    ),
    check: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ),
    list: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    ),
    package: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.27 6.96 8.73 5.05 8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    ),
    tag: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    chevronLeft: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    ),
    chevronRight: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    ),
    instagram: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="6" ry="6"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37Z"></path>
        <path d="M17.5 6.5h.01"></path>
      </svg>
    ),
    mail: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16v16H4z" opacity="0"></path>
        <path d="M4 6h16" />
        <path d="M4 6l8 6 8-6" />
        <path d="M4 6v12h16V6" />
      </svg>
    ),
    copyright: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M15.5 9.5a3.5 3.5 0 1 0 0 5" />
        <path d="M9 12a3.5 3.5 0 0 0 6.5 0" opacity="0" />
      </svg>
    ),
  };
  return <span className={className}>{icons[name] || null}</span>;
};

// 主題樣式配置
const theme = {
  primary: "#FDA4AF",
  textMain: "#5F4636",
  textMuted: "#A8A29E",
  selectedBg: "#EBDCD3",
  selectedBorder: "#9F7D6B",
  accent: "#9F7D6B",
  fontSize: {
    sectionTitle: "1rem",
    label: "0.7rem",
    btnMain: "0.875rem",
    btnSub: "0.75rem",
    baseBtnMain: "0.875rem",
    baseBtnSub: "0.75rem",
  },
};

const LOCALE_STORAGE_KEY = "app_locale";

const SUPPORTED_LOCALES = /** @type {const} */ (["zh-TW", "zh-CN", "en"]);

/** @typedef {(typeof SUPPORTED_LOCALES)[number]} AppLocale */

const normalizeLocale = (raw) => {
  if (!raw) return "zh-TW";
  const v = String(raw).trim();
  if (v === "zh-TW" || v === "zh-HK" || v === "zh-MO") return "zh-TW";
  if (v === "zh-CN" || v === "zh-SG" || v === "zh") return "zh-CN";
  if (v.startsWith("zh")) {
    // 粗略處理 zh-XX：若包含 Hans 視為簡體，否則預設繁體
    return v.toLowerCase().includes("hans") ? "zh-CN" : "zh-TW";
  }
  if (v.startsWith("en")) return "en";
  return "zh-TW";
};

const detectLocaleFromNavigator = () => {
  if (typeof navigator === "undefined") return "zh-TW";
  const langs = [
    navigator.language,
    ...(navigator.languages || []),
  ].filter(Boolean);
  for (const l of langs) {
    const n = normalizeLocale(l);
    if (SUPPORTED_LOCALES.includes(n)) return n;
  }
  return "zh-TW";
};

const getInitialLocale = () => {
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(/** @type {any} */ (stored))) {
      return /** @type {AppLocale} */ (stored);
    }
  } catch {
    // ignore
  }
  return detectLocaleFromNavigator();
};

/** @type {Record<AppLocale, Record<string, string>>} */
const UI_STRINGS = {
  "zh-TW": {
    appTitle: "美甲算算 NailCalc",
    languageLabel: "介面語言",
    languageHint: "預設會依你的系統語言自動選擇；你也可以在這裡手動覆寫並記住。",
    language_zhTW: "繁體中文",
    language_zhCN: "简体中文",
    language_en: "English",

    studioNameLabel: "工作室名稱 Studio Name",
    studioNameHint: "※ 名稱將顯示於消費明細抬頭",

    pricingTitle: "價格設定",
    pricingLabel: "Pricing",

    sectionRemovalTitle: "卸甲服務",
    sectionRemovalLabel: "Removal",
    sectionBaseTitle: "款式基礎",
    sectionBaseLabel: "Base Style",
    sectionAddonsTitle: "加購造型",
    sectionAddonsLabel: "Add-ons",
    sectionSpaTitle: "護理保養",
    sectionSpaLabel: "Spa & Care",
    sectionOthersTitle: "其他加購",
    sectionOthersLabel: "Others",
    sectionDiscountTitle: "優惠折抵",
    sectionDiscountLabel: "Discount",

    perFinger: "/ 指",

    otherProduct: "產品加購",
    otherService: "其他服務",

    discountNone: "無",
    discount95: "95折",
    discount9: "9折",
    discount85: "85折",
    discount8: "8折",
    discountFixed: "折 ${v}",
    discountCustom: "自定義折抵",

    reportsTitle: "營收報表",
    reportsLabel: "Reports",
    monthQuery: "查詢月份",
    revenueMonth: "當月營收",
    visitsMonth: "當月服務人次",
    checkoutRecords: "結帳紀錄",
    exportCsv: "匯出 CSV",
    noRecordsMonth: "該月份尚無紀錄",

    saveChanges: "儲存修改",

    bottomDiscounted: "已折抵",
    copy: "複製",
    copied: "已複製",
    checkout: "結帳",

    modalTitle: "消費明細",
    back: "返回",
    copyAndClose: "複製並關閉",

    newAddonTitle: "新增加購項目",
    addonNamePh: "加購名稱",
    addItem: "新增項目",
    ariaDeleteAddon: "刪除加購項目",

    newBaseTitle: "新增款式項目",
    baseNamePh: "款式名稱",
    ariaDeleteBase: "刪除款式項目",

    errAddonName: "請輸入加購名稱",
    errPrice: "請輸入有效價格",
    errAddonDup: "此加購名稱已存在",
    errBaseName: "請輸入款式名稱",
    errBaseDup: "此款式名稱已存在",

    summaryTitle: "消費明細",
    summaryThanks: "感謝您的預約，祝您有美好的一天！",
    summaryDiscount: "優惠折抵",
    summaryTotal: "總計",
    lineProduct: "產品加購",
    lineOther: "其他服務",

    recordFallback: "其他服務",

    csvHeader: "日期時間,施作項目,總金額",
    csvFilename: "美甲營收報表_${month}.csv",

    greetingMorningLine1: "早安，${name}",
    greetingMorningLine2: "願今天預約也滿滿！",
    greetingAfternoonLine1: "午安，${name}",
    greetingAfternoonLine2: "今天也要開開心心工作唷！",
    greetingNightLine1: "晚安，${name}",
    greetingNightLine2: "忙碌中也別忘了好好休息、吃飯喔！",
  },
  "zh-CN": {
    appTitle: "美甲算算 NailCalc",
    languageLabel: "界面语言",
    languageHint: "默认会跟随你的系统语言；你也可以在这里手动覆盖并记住。",
    language_zhTW: "繁体中文",
    language_zhCN: "简体中文",
    language_en: "English",

    studioNameLabel: "工作室名称 Studio Name",
    studioNameHint: "※ 名称将显示在消费明细抬头",

    pricingTitle: "价格设置",
    pricingLabel: "Pricing",

    sectionRemovalTitle: "卸甲服务",
    sectionRemovalLabel: "Removal",
    sectionBaseTitle: "款式基础",
    sectionBaseLabel: "Base Style",
    sectionAddonsTitle: "加购造型",
    sectionAddonsLabel: "Add-ons",
    sectionSpaTitle: "护理保养",
    sectionSpaLabel: "Spa & Care",
    sectionOthersTitle: "其他加购",
    sectionOthersLabel: "Others",
    sectionDiscountTitle: "优惠抵扣",
    sectionDiscountLabel: "Discount",

    perFinger: "/ 指",

    otherProduct: "产品加购",
    otherService: "其他服务",

    discountNone: "无",
    discount95: "95折",
    discount9: "9折",
    discount85: "85折",
    discount8: "8折",
    discountFixed: "减 ${v}",
    discountCustom: "自定义抵扣",

    reportsTitle: "营收报表",
    reportsLabel: "Reports",
    monthQuery: "查询月份",
    revenueMonth: "当月营收",
    visitsMonth: "当月服务人次",
    checkoutRecords: "结账记录",
    exportCsv: "导出 CSV",
    noRecordsMonth: "该月份暂无记录",

    saveChanges: "保存修改",

    bottomDiscounted: "已抵扣",
    copy: "复制",
    copied: "已复制",
    checkout: "结账",

    modalTitle: "消费明细",
    back: "返回",
    copyAndClose: "复制并关闭",

    newAddonTitle: "新增加购项目",
    addonNamePh: "加购名称",
    addItem: "新增项目",
    ariaDeleteAddon: "删除加购项目",

    newBaseTitle: "新增款式项目",
    baseNamePh: "款式名称",
    ariaDeleteBase: "删除款式项目",

    errAddonName: "请输入加购名称",
    errPrice: "请输入有效价格",
    errAddonDup: "该加购名称已存在",
    errBaseName: "请输入款式名称",
    errBaseDup: "该款式名称已存在",

    summaryTitle: "消费明细",
    summaryThanks: "感谢您的预约，祝您有美好的一天！",
    summaryDiscount: "优惠抵扣",
    summaryTotal: "总计",
    lineProduct: "产品加购",
    lineOther: "其他服务",

    recordFallback: "其他服务",

    csvHeader: "日期时间,施作项目,总金额",
    csvFilename: "美甲营收报表_${month}.csv",

    greetingMorningLine1: "早安，${name}",
    greetingMorningLine2: "愿今天预约也满满！",
    greetingAfternoonLine1: "午安，${name}",
    greetingAfternoonLine2: "今天也要美美开工～",
    greetingNightLine1: "晚安，${name}",
    greetingNightLine2: "忙碌中也别忘了好好休息、吃饭喔！",
  },
  en: {
    appTitle: "NailCalc",
    languageLabel: "Language",
    languageHint:
      "Defaults to your system language.",
    language_zhTW: "Traditional Chinese",
    language_zhCN: "Simplified Chinese",
    language_en: "English",

    studioNameLabel: "Studio name",
    studioNameHint: "※ This name appears at the top of receipts.",

    pricingTitle: "Pricing",
    pricingLabel: "Pricing",

    sectionRemovalTitle: "Removal",
    sectionRemovalLabel: "Removal",
    sectionBaseTitle: "Base Style",
    sectionBaseLabel: "Base Style",
    sectionAddonsTitle: "Add-ons",
    sectionAddonsLabel: "Add-ons",
    sectionSpaTitle: "Spa & Care",
    sectionSpaLabel: "Spa & Care",
    sectionOthersTitle: "Other Services",
    sectionOthersLabel: "Others",
    sectionDiscountTitle: "Discounts",
    sectionDiscountLabel: "Discount",

    perFinger: "/ nail",

    otherProduct: "Product add-on",
    otherService: "Additional services",

    discountNone: "None",
    discount95: "5% off",
    discount9: "10% off",
    discount85: "15% off",
    discount8: "20% off",
    discountFixed: "-$${v}",
    discountCustom: "Custom discount",

    reportsTitle: "Reports",
    reportsLabel: "Reports",
    monthQuery: "Month",
    revenueMonth: "Revenue",
    visitsMonth: "Clients",
    checkoutRecords: "Checkout history",
    exportCsv: "Export CSV",
    noRecordsMonth: "No records for this month",

    saveChanges: "Save",

    bottomDiscounted: "Discounted",
    copy: "Copy",
    copied: "Copied",
    checkout: "Checkout",

    modalTitle: "Receipt",
    back: "Back",
    copyAndClose: "Copy & close",

    newAddonTitle: "Add add-on item",
    addonNamePh: "Item name",
    addItem: "Add item",
    ariaDeleteAddon: "Delete add-on item",

    newBaseTitle: "Add base style item",
    baseNamePh: "Style name",
    ariaDeleteBase: "Delete base style item",

    errAddonName: "Please enter an item name",
    errPrice: "Please enter a valid price",
    errAddonDup: "This item name already exists",
    errBaseName: "Please enter a style name",
    errBaseDup: "This style name already exists",

    summaryTitle: "Receipt",
    summaryThanks: "Thank you for booking, have a great day!",
    summaryDiscount: "Discounts",
    summaryTotal: "Total",
    lineProduct: "Product add-on",
    lineOther: "Other services",

    recordFallback: "Other services",

    csvHeader: "Date/time,Service items,Total",
    csvFilename: "nail_revenue_${month}.csv",

    greetingMorningLine1: "Good morning, ${name}",
    greetingMorningLine2: "Hope your bookings are full today!",
    greetingAfternoonLine1: "Good afternoon, ${name}",
    greetingAfternoonLine2: "Have a great shift today!",
    greetingNightLine1: "Good evening, ${name}",
    greetingNightLine2: "Don’t forget to rest and eat well.",
  },
};

const tString = (locale, key, vars) => {
  const table = UI_STRINGS[locale] || UI_STRINGS["zh-TW"];
  let s = table[key] ?? UI_STRINGS["zh-TW"][key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      s = s.replaceAll(`\${${k}}`, String(v));
    });
  }
  return s;
};

/** @type {Record<AppLocale, Record<string, Record<string, string>>>} */
const PRICE_LABELS = {
  "zh-TW": {
    removal: {
      "本店 / 純卸甲": "本店 / 純卸甲",
      "本店 / 卸甲續作": "本店 / 卸甲續作",
      "他店 / 純卸甲": "他店 / 純卸甲",
      "他店 / 卸甲續作": "他店 / 卸甲續作",
    },
    base: {
      透明建甲: "透明建甲",
      單色: "單色",
      跳色: "跳色",
      法式: "法式",
      貓眼: "貓眼",
      漸層: "漸層",
    },
    addons: {
      延甲: "延甲",
      水晶: "水晶",
      手繪: "手繪",
      裝飾: "裝飾",
    },
    spa: {
      手部基礎: "手部基礎",
      手部深層: "手部深層",
      足部基礎: "足部基礎",
      足部深層: "足部深層",
    },
  },
  "zh-CN": {
    removal: {
      "本店 / 純卸甲": "本店 / 纯卸甲",
      "本店 / 卸甲續作": "本店 / 卸甲续作",
      "他店 / 純卸甲": "他店 / 纯卸甲",
      "他店 / 卸甲續作": "他店 / 卸甲续作",
    },
    base: {
      透明建甲: "透明延长",
      單色: "单色",
      跳色: "跳色",
      法式: "法式",
      貓眼: "猫眼",
      漸層: "渐变",
    },
    addons: {
      延甲: "延长",
      水晶: "水晶",
      手繪: "手绘",
      裝飾: "装饰",
    },
    spa: {
      手部基礎: "手部基础",
      手部深層: "手部深层",
      足部基礎: "足部基础",
      足部深層: "足部深层",
    },
  },
  en: {
    removal: {
      "本店 / 純卸甲": "Soak-off removal only",
      "本店 / 卸甲續作": "Soak-off removal + new set",
      "他店 / 純卸甲": "Foreign removal",
      "他店 / 卸甲續作": "Foreign removal + new set",
    },
    base: {
      透明建甲: "Clear Builder Gel",
      單色: "Solid Color",
      跳色: "Accent Nails",
      法式: "French Tips",
      貓眼: "Cat Eye",
      漸層: "Ombre",
    },
    addons: {
      延甲: "Nail Extensions",
      水晶: "Builder Gel",
      手繪: "Hand-painted Designs",
      裝飾: "Nail Art",
    },
    spa: {
      手部基礎: "Basic Manicure",
      手部深層: "Deluxe Manicure",
      足部基礎: "Basic Pedicure",
      足部深層: "Deluxe Pedicure",
    },
  },
};

const priceItemLabel = (locale, cat, key) => {
  const map = PRICE_LABELS[locale]?.[cat]?.[key];
  if (map) return map;
  return key;
};

const DEFAULT_ADDONS = { 延甲: 50, 水晶: 100, 手繪: 50, 裝飾: 30 };
const CUSTOM_ADDONS_STORAGE_KEY = "nail_custom_addons";
const DEFAULT_BASE_STYLES = {
  透明建甲: 800,
  單色: 900,
  跳色: 1000,
  法式: 1200,
  貓眼: 1300,
  漸層: 1400,
};
const CUSTOM_BASE_STYLES_STORAGE_KEY = "nail_custom_base_styles";

const getStoredCustomAddons = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_ADDONS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([name, price]) =>
          typeof name === "string" &&
          name.trim() &&
          typeof price === "number" &&
          Number.isFinite(price) &&
          price >= 0
      )
    );
  } catch {
    return {};
  }
};

const getStoredCustomBaseStyles = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_BASE_STYLES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([name, price]) =>
          typeof name === "string" &&
          name.trim() &&
          typeof price === "number" &&
          Number.isFinite(price) &&
          price >= 0
      )
    );
  } catch {
    return {};
  }
};

const getStoredRecords = () => {
  try {
    const raw = localStorage.getItem("nail_records");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const App = () => {
  // 狀態管理
  const [locale, setLocale] = useState(() => getInitialLocale());
  const [studioName, setStudioName] = useState(
    () => localStorage.getItem("studioName") || "My Studio"
  );
  const [view, setView] = useState("calculator");
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newAddonName, setNewAddonName] = useState("");
  const [newAddonPrice, setNewAddonPrice] = useState("");
  const [addonFormError, setAddonFormError] = useState("");
  const [newBaseName, setNewBaseName] = useState("");
  const [newBasePrice, setNewBasePrice] = useState("");
  const [baseFormError, setBaseFormError] = useState("");
  const [records, setRecords] = useState(() => getStoredRecords());

  const t = useMemo(() => {
    return (key, vars) => tString(locale, key, vars);
  }, [locale]);

  // 報表專用月份選擇狀態
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  // 同步介面語言
  useEffect(() => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale]);

  useEffect(() => {
    setAddonFormError("");
    setBaseFormError("");
  }, [locale]);

  // 同步工作室名稱
  useEffect(() => localStorage.setItem("studioName", studioName), [studioName]);
  // 同步紀錄
  useEffect(
    () => localStorage.setItem("nail_records", JSON.stringify(records)),
    [records]
  );

  // 獲取當前年份
  const currentYear = new Date().getFullYear();
  const developerName = "Friendly Cat Group";

  // 價格設定
  const [prices, setPrices] = useState(() => ({
    removal: {
      "本店 / 純卸甲": 300,
      "本店 / 卸甲續作": 100,
      "他店 / 純卸甲": 500,
      "他店 / 卸甲續作": 300,
    },
    base: {
      ...DEFAULT_BASE_STYLES,
      ...getStoredCustomBaseStyles(),
    },
    addons: { ...DEFAULT_ADDONS, ...getStoredCustomAddons() },
    spa: { 手部基礎: 300, 手部深層: 1000, 足部基礎: 500, 足部深層: 1300 },
  }));

  // 同步自訂加購到本機儲存
  useEffect(() => {
    const customAddons = Object.fromEntries(
      Object.entries(prices.addons).filter(([name]) => !(name in DEFAULT_ADDONS))
    );
    localStorage.setItem(
      CUSTOM_ADDONS_STORAGE_KEY,
      JSON.stringify(customAddons)
    );
  }, [prices.addons]);

  // 同步自訂款式到本機儲存
  useEffect(() => {
    const customBase = Object.fromEntries(
      Object.entries(prices.base).filter(([name]) => !(name in DEFAULT_BASE_STYLES))
    );
    localStorage.setItem(
      CUSTOM_BASE_STYLES_STORAGE_KEY,
      JSON.stringify(customBase)
    );
  }, [prices.base]);

  // 選擇狀態
  const [selections, setSelections] = useState({
    removal: null,
    base: null,
    addons: {},
    spa: [],
    customProduct: 0,
    customOther: 0,
    discountType: "none",
    discountVal: 0,
  });

  // 計算邏輯
  const getSubtotal = () => {
    let subtotal = 0;
    if (selections.removal) subtotal += prices.removal[selections.removal] || 0;
    if (selections.base) subtotal += prices.base[selections.base] || 0;
    Object.keys(selections.addons).forEach((key) => {
      subtotal += (prices.addons[key] || 0) * (selections.addons[key] || 0);
    });
    selections.spa.forEach((item) => {
      subtotal += prices.spa[item] || 0;
    });
    subtotal += Number(selections.customProduct) || 0;
    subtotal += Number(selections.customOther) || 0;
    return subtotal;
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    if (selections.discountType === "percent")
      return Math.round(subtotal * (1 - selections.discountVal));
    if (selections.discountType === "fixed") return selections.discountVal;
    return 0;
  };

  const calculateTotal = () => Math.max(0, getSubtotal() - getDiscountAmount());

  const generateSummaryText = () => {
    let text = `🤍 ${studioName} ${t("summaryTitle")} 🤍\n----------------------\n`;
    if (selections.removal)
      text += `▫️ ${priceItemLabel(locale, "removal", selections.removal)}: $${
        prices.removal[selections.removal]
      }\n`;
    if (selections.base)
      text += `▫️ ${priceItemLabel(locale, "base", selections.base)}: $${
        prices.base[selections.base]
      }\n`;
    Object.keys(selections.addons).forEach((key) => {
      if (selections.addons[key] > 0)
        text += `▫️ ${priceItemLabel(locale, "addons", key)} x${
          selections.addons[key]
        }: $${prices.addons[key] * selections.addons[key]}\n`;
    });
    selections.spa.forEach((item) => {
      text += `▫️ ${priceItemLabel(locale, "spa", item)}: $${prices.spa[item]}\n`;
    });
    if (selections.customProduct > 0)
      text += `▫️ ${t("lineProduct")}: $${selections.customProduct}\n`;
    if (selections.customOther > 0)
      text += `▫️ ${t("lineOther")}: $${selections.customOther}\n`;
    const discount = getDiscountAmount();
    if (discount > 0)
      text += `----------------------\n🤍 ${t("summaryDiscount")}: -$${discount}\n`;
    text += `----------------------\n🤍 ${t("summaryTotal")}: $${calculateTotal()}\n\n ${t(
      "summaryThanks"
    )}`;
    return text;
  };

  const copyToClipboard = () => {
    const text = generateSummaryText();
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    document.body.removeChild(textArea);
  };

  // 完成結帳並儲存紀錄
  const finalizePayment = () => {
    const total = calculateTotal();
    const itemsSummary = [
      selections.removal
        ? priceItemLabel(locale, "removal", selections.removal)
        : null,
      selections.base ? priceItemLabel(locale, "base", selections.base) : null,
      ...selections.spa.map((item) => priceItemLabel(locale, "spa", item)),
    ]
      .filter(Boolean)
      .join(", ");
    const now = new Date();
    const dateLocale =
      locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : "zh-TW";
    const newRecord = {
      id: Date.now(),
      date: now.toLocaleString(dateLocale, { hour12: false }), // 例如 "2024/1/19 23:45:00"
      items: itemsSummary || t("recordFallback"),
      amount: total,
      // 輔助過濾欄位
      month: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}`,
    };
    setRecords((prev) => [newRecord, ...prev]);
    copyToClipboard();
    setShowModal(false);
    // 重置選擇
    setSelections({
      removal: null,
      base: null,
      addons: {},
      spa: [],
      customProduct: 0,
      customOther: 0,
      discountType: "none",
      discountVal: 0,
    });
  };

  const deleteRecord = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  // 月份切換邏輯
  const changeMonth = (offset) => {
    const [year, month] = selectedMonth.split("-").map(Number);
    const date = new Date(year, month - 1 + offset, 1);
    setSelectedMonth(
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    );
  };

  // 過濾當前選定月份的紀錄
  const filteredRecords = records.filter((r) => {
    // 兼容舊數據：如果紀錄沒有 month 屬性，嘗試從 date 字串解析
    if (r.month) return r.month === selectedMonth;
    const dateParts = r.date.split("/");
    if (dateParts.length >= 2) {
      const m = `${dateParts[0]}-${String(dateParts[1]).padStart(2, "0")}`;
      return m === selectedMonth;
    }
    return false;
  });

  // 營收導出 CSV (僅導出目前所選月份)
  const exportToCSV = () => {
    if (filteredRecords.length === 0) return;
    let csvContent = `\uFEFF${t("csvHeader")}\n`;
    filteredRecords.forEach((r) => {
      csvContent += `${r.date},"${r.items}",${r.amount}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = t("csvFilename", { month: selectedMonth });
    link.click();
  };

  const toggleSelection = (category, item) => {
    setSelections((prev) => {
      if (category === "removal" || category === "base")
        return { ...prev, [category]: prev[category] === item ? null : item };
      if (category === "spa")
        return {
          ...prev,
          spa: prev.spa.includes(item)
            ? prev.spa.filter((i) => i !== item)
            : [...prev.spa, item],
        };
      return prev;
    });
  };

  const addCustomAddon = () => {
    const name = newAddonName.trim();
    const price = Number(newAddonPrice);

    if (!name) {
      setAddonFormError(t("errAddonName"));
      return;
    }

    if (Number.isNaN(price) || price < 0) {
      setAddonFormError(t("errPrice"));
      return;
    }

    if (prices.addons[name] !== undefined) {
      setAddonFormError(t("errAddonDup"));
      return;
    }

    setPrices((prev) => ({
      ...prev,
      addons: { ...prev.addons, [name]: price },
    }));
    setNewAddonName("");
    setNewAddonPrice("");
    setAddonFormError("");
  };

  const removeCustomAddon = (name) => {
    if (name in DEFAULT_ADDONS) return;

    setPrices((prev) => {
      const nextAddons = { ...prev.addons };
      delete nextAddons[name];
      return { ...prev, addons: nextAddons };
    });

    setSelections((prev) => {
      if (prev.addons[name] === undefined) return prev;
      const nextSelectedAddons = { ...prev.addons };
      delete nextSelectedAddons[name];
      return { ...prev, addons: nextSelectedAddons };
    });
  };

  const addCustomBaseStyle = () => {
    const name = newBaseName.trim();
    const price = Number(newBasePrice);

    if (!name) {
      setBaseFormError(t("errBaseName"));
      return;
    }

    if (Number.isNaN(price) || price < 0) {
      setBaseFormError(t("errPrice"));
      return;
    }

    if (prices.base[name] !== undefined) {
      setBaseFormError(t("errBaseDup"));
      return;
    }

    setPrices((prev) => ({
      ...prev,
      base: { ...prev.base, [name]: price },
    }));
    setNewBaseName("");
    setNewBasePrice("");
    setBaseFormError("");
  };

  const removeCustomBaseStyle = (name) => {
    if (name in DEFAULT_BASE_STYLES) return;

    setPrices((prev) => {
      const nextBase = { ...prev.base };
      delete nextBase[name];
      return { ...prev, base: nextBase };
    });

    setSelections((prev) => {
      if (prev.base !== name) return prev;
      return { ...prev, base: null };
    });
  };

  const SectionHeader = ({ title, label }) => (
    <div className="flex justify-between items-baseline mb-4 pr-1">
      <h2
        style={{ fontSize: theme.fontSize.sectionTitle }}
        className="font-bold"
      >
        {title}
      </h2>
      <span
        style={{ fontSize: theme.fontSize.label, color: theme.textMuted }}
        className="font-medium uppercase tracking-widest"
      >
        {label}
      </span>
    </div>
  );

  const greetingLines = useMemo(() => {
    const hour = new Date().getHours();
    const name = studioName;
    if (hour >= 5 && hour <= 11) {
      return {
        line1: tString(locale, "greetingMorningLine1", { name }),
        line2: tString(locale, "greetingMorningLine2", { name }),
      };
    }
    if (hour >= 12 && hour <= 17) {
      return {
        line1: tString(locale, "greetingAfternoonLine1", { name }),
        line2: tString(locale, "greetingAfternoonLine2", { name }),
      };
    }
    return {
      line1: tString(locale, "greetingNightLine1", { name }),
      line2: tString(locale, "greetingNightLine2", { name }),
    };
  }, [locale, studioName]);

  return (
    <div
      className="min-h-screen bg-[#F6F1EC] text-[#5F4636]"
      style={{
        paddingBottom: "calc(140px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <SplashScreen />

      {/* 導航欄 */}
      <header
        className="bg-white border-b sticky top-0 z-30 px-6 flex justify-between items-center shadow-sm"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 18px)",
          paddingBottom: "18px",
          minHeight: "calc(56px + env(safe-area-inset-top, 0px))",
        }}
      >
        <button
          type="button"
          onClick={() => setView("calculator")}
          className="flex items-center gap-3 text-left"
        >
          <div className="w-9 h-9 bg-[#9F7D6B] rounded-xl flex items-center justify-center">
            <img
              src="/logo-mark.png"
              alt="NailCalc"
              className="w-10 h-10"
              draggable="false"
            />
          </div>
          <h1 className="text-xl font-bold text-[#5F4636]">
            {t("appTitle")}
          </h1>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setView(view === "reports" ? "calculator" : "reports")
            }
            className={`${
              view === "reports" ? "text-[#9F7D6B]" : "text-stone-400"
            }`}
          >
            <Icon name="chart" size={22} />
          </button>
          <button
            onClick={() => setView(view === "admin" ? "calculator" : "admin")}
            className={`${
              view === "admin" ? "text-[#9F7D6B]" : "text-stone-400"
            }`}
          >
            <Icon name="settings" size={22} />
          </button>
        </div>
      </header>

      {view === "calculator" && (
        <div className="p-5 max-w-lg mx-auto space-y-8">
          <p
            className="w-full text-center text-[#9F7D6B] font-bold leading-snug py-2.5 px-4 bg-white/60 border border-stone-200 rounded-3xl"
            style={{ fontSize: theme.fontSize.btnMain }}
          >
            <span className="block">{greetingLines.line1}</span>
            <span className="block mt-1 font-semibold text-[#9F7D6B]/90">
              {greetingLines.line2}
            </span>
          </p>
          {/* 卸甲服務 */}
          <section>
            <SectionHeader
              title={t("sectionRemovalTitle")}
              label={t("sectionRemovalLabel")}
            />
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(prices.removal).map((item) => (
                <button
                  key={item}
                  onClick={() => toggleSelection("removal", item)}
                  className={`p-4 rounded-2xl border transition-all ${
                    selections.removal === item
                      ? "border-[#9F7D6B] bg-[#EBDCD3]"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <div
                    style={{ fontSize: theme.fontSize.btnMain }}
                    className="font-bold"
                  >
                    {priceItemLabel(locale, "removal", item)}
                  </div>
                  <div
                    style={{ fontSize: theme.fontSize.btnSub }}
                    className="text-stone-400"
                  >
                    ${prices.removal[item]}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 款式基礎 */}
          <section>
            <SectionHeader
              title={t("sectionBaseTitle")}
              label={t("sectionBaseLabel")}
            />
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(prices.base).map((item) => (
                <button
                  key={item}
                  onClick={() => toggleSelection("base", item)}
                  className={`p-3 rounded-xl border transition-all ${
                    selections.base === item
                      ? "border-[#9F7D6B] bg-[#EBDCD3]"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <div
                    style={{ fontSize: theme.fontSize.baseBtnMain }}
                    className="font-bold"
                  >
                    {priceItemLabel(locale, "base", item)}
                  </div>
                  <div
                    style={{ fontSize: theme.fontSize.baseBtnSub }}
                    className="opacity-60"
                  >
                    ${prices.base[item]}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 加購造型 */}
          <section>
            <SectionHeader
              title={t("sectionAddonsTitle")}
              label={t("sectionAddonsLabel")}
            />
            <div className="space-y-3">
              {Object.keys(prices.addons).map((item) => (
                <div
                  key={item}
                  className="bg-white p-4 rounded-2xl border border-stone-200 flex justify-between items-center"
                >
                  <div className="flex items-baseline gap-2">
                    <div
                      style={{ fontSize: theme.fontSize.btnMain }}
                      className="font-bold"
                    >
                      {priceItemLabel(locale, "addons", item)}
                    </div>
                    <div
                      style={{ fontSize: theme.fontSize.btnSub }}
                      className="text-stone-400"
                    >
                      ${prices.addons[item]} {t("perFinger")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSelections((p) => ({
                          ...p,
                          addons: {
                            ...p.addons,
                            [item]: Math.max(0, (p.addons[item] || 0) - 1),
                          },
                        }))
                      }
                      className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center"
                    >
                      <Icon name="minus" size={14} />
                    </button>
                    <input
                      type="number"
                      value={selections.addons[item] || 0}
                      onChange={(e) =>
                        setSelections((p) => ({
                          ...p,
                          addons: {
                            ...p.addons,
                            [item]: parseInt(e.target.value) || 0,
                          },
                        }))
                      }
                      onFocus={(e) => e.target.select()}
                      className="w-10 text-center font-bold text-[#9F7D6B] bg-transparent outline-none"
                    />
                    <button
                      onClick={() =>
                        setSelections((p) => ({
                          ...p,
                          addons: {
                            ...p.addons,
                            [item]: (p.addons[item] || 0) + 1,
                          },
                        }))
                      }
                      className="w-8 h-8 rounded-lg bg-[#9F7D6B] text-white flex items-center justify-center"
                    >
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 護理保養 */}
          <section>
            <SectionHeader
              title={t("sectionSpaTitle")}
              label={t("sectionSpaLabel")}
            />
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(prices.spa).map((item) => (
                <button
                  key={item}
                  onClick={() => toggleSelection("spa", item)}
                  className={`p-4 rounded-2xl border transition-all ${
                    selections.spa.includes(item)
                      ? "border-[#9F7D6B] bg-[#EBDCD3]"
                      : "border-stone-200 bg-white"
                  }`}
                >
                  <div
                    style={{ fontSize: theme.fontSize.btnMain }}
                    className="font-bold"
                  >
                    {priceItemLabel(locale, "spa", item)}
                  </div>
                  <div
                    style={{ fontSize: theme.fontSize.btnMain }}
                    className="opacity-50"
                  >
                    ${prices.spa[item]}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 其他加購 */}
          <section>
            <SectionHeader
              title={t("sectionOthersTitle")}
              label={t("sectionOthersLabel")}
            />
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-2xl border border-stone-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-stone-100 p-2 rounded-lg text-[#9F7D6B]">
                    <Icon name="package" size={18} />
                  </div>
                  <span
                    style={{ fontSize: theme.fontSize.btnMain }}
                    className="font-bold"
                  >
                    {t("otherProduct")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-stone-400 text-xs">$</span>
                  <input
                    type="number"
                    className="w-20 text-right font-bold text-[#9F7D6B] bg-stone-50 rounded-lg p-2 focus:outline-none"
                    value={selections.customProduct || ""}
                    onChange={(e) =>
                      setSelections((p) => ({
                        ...p,
                        customProduct: parseInt(e.target.value) || 0,
                      }))
                    }
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-stone-100 p-2 rounded-lg text-[#9F7D6B]">
                    <Icon name="plus" size={18} />
                  </div>
                  <span
                    style={{ fontSize: theme.fontSize.btnMain }}
                    className="font-bold"
                  >
                    {t("otherService")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-stone-400 text-sm">$</span>
                  <input
                    type="number"
                    className="w-20 text-right font-bold text-[#9F7D6B] bg-stone-50 rounded-lg p-2 focus:outline-none"
                    value={selections.customOther || ""}
                    onChange={(e) =>
                      setSelections((p) => ({
                        ...p,
                        customOther: parseInt(e.target.value) || 0,
                      }))
                    }
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 優惠折抵 */}
          <section className="mb-8">
            <SectionHeader
              title={t("sectionDiscountTitle")}
              label={t("sectionDiscountLabel")}
            />
            <div className="bg-white rounded-[1.25rem] p-5 border border-dashed border-[#9F7D6B] space-y-4 shadow-sm">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                {[
                  { k: "none", l: t("discountNone"), t: "none", v: 0 },
                  { k: "p95", l: t("discount95"), t: "percent", v: 0.95 },
                  { k: "p9", l: t("discount9"), t: "percent", v: 0.9 },
                  { k: "p85", l: t("discount85"), t: "percent", v: 0.85 },
                  { k: "p8", l: t("discount8"), t: "percent", v: 0.8 },
                ].map((d) => (
                  <button
                    key={d.k}
                    onClick={() =>
                      setSelections((p) => ({
                        ...p,
                        discountType: d.t,
                        discountVal: d.v,
                      }))
                    }
                    className={`whitespace-nowrap px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selections.discountType === d.t &&
                      selections.discountVal === d.v
                        ? "border-[#9F7D6B] bg-[#EBDCD3] text-[#9F7D6B]"
                        : "border-stone-200 text-stone-400"
                    }`}
                  >
                    {d.l}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {[50, 100, 200].map((v) => (
                  <button
                    key={v}
                    onClick={() =>
                      setSelections((p) => ({
                        ...p,
                        discountType: "fixed",
                        discountVal: v,
                      }))
                    }
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selections.discountType === "fixed" &&
                      selections.discountVal === v
                        ? "border-[#9F7D6B] bg-[#EBDCD3] text-[#9F7D6B]"
                        : "border-stone-200 text-stone-400"
                    }`}
                  >
                    {t("discountFixed", { v })}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-stone-100 pt-4">
                <div className="flex items-center gap-2 text-stone-400">
                  <Icon name="tag" size={16} />{" "}
                  <span className="text-xs">{t("discountCustom")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#9F7D6B] font-bold text-xs">-$</span>
                  <input
                    type="number"
                    className="w-16 text-right font-bold text-[#9F7D6B] bg-stone-50 rounded-lg p-1.5 focus:outline-none"
                    value={
                      selections.discountType === "fixed" &&
                      ![50, 100, 200].includes(selections.discountVal)
                        ? selections.discountVal
                        : ""
                    }
                    onChange={(e) =>
                      setSelections((p) => ({
                        ...p,
                        discountType: "fixed",
                        discountVal: parseInt(e.target.value) || 0,
                      }))
                    }
                    onFocus={(e) => e.target.select()}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 新增與優化：營收報表頁面 (含月份切換) */}
      {view === "reports" && (
        <div className="p-6 max-w-md mx-auto">
          <SectionHeader title={t("reportsTitle")} label={t("reportsLabel")} />

          {/* 月份切換控制項 */}
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-stone-100 mb-6 shadow-sm">
            <button
              onClick={() => changeMonth(-1)}
              className="w-10 h-10 flex items-center justify-center text-[#9F7D6B] hover:bg-stone-50 rounded-xl transition-colors"
            >
              <Icon name="chevronLeft" size={20} />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[12px] text-stone-400 font-bold uppercase tracking-widest leading-none mb-1">
                {t("monthQuery")}
              </span>
              <span className="text-lg font-black text-[#9F7D6B]">
                {selectedMonth.replace("-", " / ")}
              </span>
            </div>
            <button
              onClick={() => changeMonth(1)}
              className="w-10 h-10 flex items-center justify-center text-[#9F7D6B] hover:bg-stone-50 rounded-xl transition-colors"
            >
              <Icon name="chevronRight" size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100">
              <p className="text-center text-[12px] text-stone-400 font-bold uppercase mb-1">
                {t("revenueMonth")}
              </p>
              <p className="text-center text-2xl font-black text-[#9F7D6B]">
                $
                {filteredRecords
                  .reduce((acc, r) => acc + r.amount, 0)
                  .toLocaleString(
                    locale === "en"
                      ? "en-US"
                      : locale === "zh-CN"
                        ? "zh-CN"
                        : "zh-TW"
                  )}
              </p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-stone-100">
              <p className="text-center text-[12px] text-stone-400 font-bold uppercase mb-1">
                {t("visitsMonth")}
              </p>
              <p className="text-center text-2xl font-black text-[#9F7D6B]">
                {filteredRecords.length}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3
              className="font-bold"
              style={{ fontSize: theme.fontSize.sectionTitle }}
            >
              {t("checkoutRecords")}
            </h3>
            <button
              onClick={exportToCSV}
              className="text-[#9F7D6B] text-xs font-bold flex items-center gap-1"
            >
              <Icon name="download" size={14} /> {t("exportCsv")}
            </button>
          </div>

          <div className="space-y-3">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-10 text-stone-300 text-sm italic">
                {t("noRecordsMonth")}
              </div>
            ) : (
              filteredRecords.map((r) => (
                <div
                  key={r.id}
                  className="bg-white p-4 rounded-2xl border border-stone-100 flex justify-between items-center"
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-[10px] text-stone-400">{r.date}</p>
                    <p className="text-sm font-bold truncate">{r.items}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-black text-[#9F7D6B]">
                      ${r.amount}
                    </span>
                    <button
                      onClick={() => deleteRecord(r.id)}
                      className="text-stone-200 hover:text-red-400"
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 管理介面 */}
      {view === "admin" && (
        <div className="p-6 max-w-md mx-auto">
          <div className="mb-10 p-6 bg-white rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
            <label className="text-[10px] font-bold text-stone-400 mb-2 block uppercase tracking-widest">
              {t("studioNameLabel")}
            </label>
            <input
              type="text"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="w-full text-xl font-bold text-[#9F7D6B] bg-transparent outline-none border-b-2 border-stone-100 focus:border-[#9F7D6B] pb-2"
            />
            <p className="text-[10px] text-stone-300 mt-3 font-medium">
              {t("studioNameHint")}
            </p>
          </div>

          <div className="mb-10 p-6 bg-white rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
            <label className="text-[10px] font-bold text-stone-400 mb-2 block uppercase tracking-widest">
              {t("languageLabel")}
            </label>
            <select
              value={locale}
              onChange={(e) => setLocale(/** @type {AppLocale} */ (e.target.value))}
              className="w-full text-sm font-bold bg-stone-50 rounded-2xl px-3 py-3 text-[#5F4636] outline-none border border-stone-100 focus:border-[#9F7D6B]"
            >
              <option value="zh-TW">{t("language_zhTW")}</option>
              <option value="zh-CN">{t("language_zhCN")}</option>
              <option value="en">{t("language_en")}</option>
            </select>
            <p className="text-[10px] text-stone-300 mt-3 font-medium leading-relaxed">
              {t("languageHint")}
            </p>
          </div>

          <h3 className="text-base font-bold mb-3 flex items-baseline">
            {t("pricingTitle")}
            <span className="ml-auto text-[10px] uppercase font-bold text-stone-400 tracking-widest">
              {t("pricingLabel")}
            </span>
          </h3>

          {Object.entries(prices).map(([cat, items]) => (
            <div
              key={cat}
              className="bg-white p-6 rounded-[2rem] mb-6 border border-stone-50 shadow-sm"
            >
              <h4 className="text-[10px] font-bold text-stone-400 mb-2 uppercase">
                {{
                  removal: t("sectionRemovalLabel"),
                  base: t("sectionBaseLabel"),
                  addons: t("sectionAddonsLabel"),
                  spa: t("sectionSpaLabel"),
                }[cat] || cat}
              </h4>

              {Object.entries(items).map(([name, price]) => (
                <div
                  key={name}
                  className="flex justify-between items-baseline py-2 border-b border-stone-100"
                >
                  <span className="text-sm font-bold flex-1 pr-2">
                    {priceItemLabel(locale, cat, name)}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={price}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        setPrices((prev) => ({
                          ...prev,
                          [cat]: { ...prev[cat], [name]: Number(e.target.value) },
                        }))
                      }
                      className="w-20 text-center font-bold bg-stone-50 rounded-3xl px-3 py-1 text-[#9F7D6B] outline-none shadow-sm"
                    />
                    {cat === "addons" && !(name in DEFAULT_ADDONS) && (
                      <button
                        type="button"
                        onClick={() => removeCustomAddon(name)}
                        className="w-8 h-8 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center transition-colors"
                        aria-label={`${t("ariaDeleteAddon")}: ${name}`}
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    )}

                    {cat === "base" && !(name in DEFAULT_BASE_STYLES) && (
                      <button
                        type="button"
                        onClick={() => removeCustomBaseStyle(name)}
                        className="w-8 h-8 rounded-xl border border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center transition-colors"
                        aria-label={`${t("ariaDeleteBase")}: ${name}`}
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {cat === "addons" && (
                <div className="mt-4 pt-4 border-t border-dashed border-stone-200">
                  <p className="text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
                    {t("newAddonTitle")}
                  </p>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newAddonName}
                      onChange={(e) => {
                        setNewAddonName(e.target.value);
                        if (addonFormError) setAddonFormError("");
                      }}
                      placeholder={t("addonNamePh")}
                      className="flex-1 text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2 text-[#5F4636] outline-none border border-stone-100 focus:border-[#9F7D6B]"
                    />
                    <div className="w-24 flex items-center gap-1 min-w-0">
                      <span className="text-stone-400 text-xs font-bold flex-none">$</span>
                      <input
                        type="number"
                        min="0"
                        value={newAddonPrice}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          setNewAddonPrice(e.target.value);
                          if (addonFormError) setAddonFormError("");
                        }}
                        placeholder="0"
                        className="w-0 flex-1 text-sm font-bold bg-stone-50 rounded-2xl py-2 text-center text-[#9F7D6B] outline-none border border-stone-100 focus:border-[#9F7D6B] min-w-0"
                      />
                    </div>
                  </div>
                  {addonFormError && (
                    <p className="text-[11px] text-rose-500 font-medium mb-2">
                      {addonFormError}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={addCustomAddon}
                    className="w-full py-2.5 rounded-2xl bg-[#9F7D6B] text-white text-sm font-bold shadow-sm"
                  >
                    {t("addItem")}
                  </button>
                </div>
              )}

              {cat === "base" && (
                <div className="mt-4 pt-4 border-t border-dashed border-stone-200">
                  <p className="text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
                    {t("newBaseTitle")}
                  </p>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newBaseName}
                      onChange={(e) => {
                        setNewBaseName(e.target.value);
                        if (baseFormError) setBaseFormError("");
                      }}
                      placeholder={t("baseNamePh")}
                      className="flex-1 text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2 text-[#5F4636] outline-none border border-stone-100 focus:border-[#9F7D6B]"
                    />
                    <div className="w-24 flex items-center gap-1 min-w-0">
                      <span className="text-stone-400 text-xs font-bold flex-none">$</span>
                      <input
                        type="number"
                        min="0"
                        value={newBasePrice}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          setNewBasePrice(e.target.value);
                          if (baseFormError) setBaseFormError("");
                        }}
                        placeholder="0"
                        className="w-0 flex-1 text-sm font-bold bg-stone-50 rounded-2xl py-2 text-center text-[#9F7D6B] outline-none border border-stone-100 focus:border-[#9F7D6B] min-w-0"
                      />
                    </div>
                  </div>
                  {baseFormError && (
                    <p className="text-[11px] text-rose-500 font-medium mb-2">
                      {baseFormError}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={addCustomBaseStyle}
                    className="w-full py-2.5 rounded-2xl bg-[#9F7D6B] text-white text-sm font-bold shadow-sm"
                  >
                    {t("addItem")}
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={() => setView("calculator")}
            className="w-full p-4 bg-[#9F7D6B] text-white rounded-[1.25rem] font-bold shadow-lg"
          >
            {t("saveChanges")}
          </button>
        </div>
      )}

      {/* 底部浮動結帳欄 */}
      {view === "calculator" && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-200 z-20"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "18px",
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 18px)",
          }}
        >
          <div className="max-w-md mx-auto flex justify-between items-end">
            <div>
              {getDiscountAmount() > 0 && (
                <p className="text-xs text-[#9F7D6B] font-bold mb-1">
                  {t("bottomDiscounted")} -${getDiscountAmount()}
                </p>
              )}
              <div className="flex items-baseline">
                <span className="text-[#9F7D6B] font-bold text-xl">$</span>
                <span className="text-4xl font-black text-[#9F7D6B] leading-none">
                  {calculateTotal().toLocaleString(
                    locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : "zh-TW"
                  )}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className={`px-5 py-3 rounded-2xl font-bold flex items-center gap-1 transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-stone-100 text-[#9F7D6B]"
                }`}
              >
                <Icon name={copied ? "check" : "copy"} size={16} />{" "}
                {copied ? t("copied") : t("copy")}
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="bg-[#9F7D6B] text-white px-6 py-3 rounded-2xl font-bold"
              >
                {t("checkout")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 結帳明細彈窗 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 shadow-2xl">
            <h3 className="text-center font-bold mb-4">{t("modalTitle")}</h3>
            <div className="bg-stone-50 p-4 rounded-2xl mb-4 max-h-60 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-xs leading-relaxed font-mono">
                {generateSummaryText()}
              </pre>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl bg-stone-100 font-bold text-stone-500"
              >
                {t("back")}
              </button>
              <button
                onClick={finalizePayment}
                className="flex-[2] bg-[#9F7D6B] text-white py-3 px-6 rounded-xl font-bold"
              >
                {t("copyAndClose")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部資訊 */}
      <footer className="mt-10 mb-6 max-w-lg mx-auto px-5 text-center border-t border-stone-200/70 pt-8">
        <div className="text-[10px] font-medium tracking-widest text-[#5F4636]/50 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>NailCalc</span>
          <span aria-label="copyright">©</span>
          <span>{currentYear}</span>
          <span className="text-[#5F4636]/35">•</span>
          <a
            href="https://friendlycatgroup.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#5F4636]/70 underline underline-offset-[3px] decoration-[#5F4636]/35 hover:text-[#5F4636] hover:decoration-[#5F4636]/60 transition-colors"
          >
            {developerName}
          </a>
        </div>

        <div
          className="mt-5 flex items-center justify-center gap-5"
          role="group"
          aria-label="Social & contact"
        >
          <a
            href="https://instagram.com/friendlycatgroup"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram: @friendlycatgroup"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] -m-1 text-[#9F7D6B] hover:text-[#7d634f] active:scale-95 transition-[color,transform] duration-200"
          >
            <Icon name="instagram" size={22} />
          </a>
          <a
            href="mailto:friendlycatgroup@gmail.com"
            aria-label="Email: friendlycatgroup@gmail.com"
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] -m-1 text-[#9F7D6B] hover:text-[#7d634f] active:scale-95 transition-[color,transform] duration-200"
          >
            <Icon name="mail" size={22} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
