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
    languageLabelTag: "Language",
    language_zhTW: "繁體中文",
    language_zhCN: "简体中文",
    language_en: "English",

    studioNameLabel: "工作室名稱",
    studioNameLabelTag: "Studio Name",
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
    addonStyleAdminHint: "結帳時輸入金額",

    otherProduct: "產品加購",
    otherService: "其他服務",

    discountNone: "無",
    discount95: "95折",
    discount9: "9折",
    discount85: "85折",
    discount8: "8折",
    discountFixed: "折 ${v}",
    discountCustom: "自定義折抵",
    discountPresetTitle: "優惠折抵",
    discountPresetPercentLabel: "折扣百分比",
    discountPresetFixedLabel: "固定折抵金額",

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
    customerTab: "客戶",
    customerPageTitle: "客戶管理",
    customerLabel: "選擇客戶",
    customerOptional: "可跳過，之後可補",
    customerSearchPh: "搜尋姓名、IG 或電話",
    noCustomer: "未指定客戶",
    manageCustomers: "管理客戶",
    customerName: "名字",
    customerPhone: "電話",
    customerIg: "IG",
    customerNote: "客戶備註",
    customerVisitNote: "備註",
    customerVisitNotePh: "例如：特殊設計、使用色號、延甲長度",
    addCustomer: "新增客戶",
    customerRequired: "請先輸入客戶名字",
    customerTotalSpent: "總消費",
    customerVisits: "來店次數",
    customerLastVisit: "最近一次",
    customerHistory: "歷史紀錄",
    noCustomerData: "尚無客戶資料",
    noCustomerHistory: "這位客戶尚無消費紀錄",
    saveNote: "儲存備註",
    customerCount: "客戶數",
    sortRecent: "最近來店",
    sortName: "姓名",
    sortSpent: "總消費",
    addCustomerHint: "新增客戶",
    noSearchResult: "找不到符合的客戶",
    customerQuickAdd: "找不到客戶？新增「${name}」",
    deleteCustomer: "Delete",
    confirmDeleteCustomer: "確定要刪除這位客戶嗎？已綁定的紀錄會保留，但不再連結此客戶。",

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
    languageLabelTag: "Language",
    language_zhTW: "繁体中文",
    language_zhCN: "简体中文",
    language_en: "English",

    studioNameLabel: "工作室名称",
    studioNameLabelTag: "Studio Name",
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
    addonStyleAdminHint: "结账时输入金额",

    otherProduct: "产品加购",
    otherService: "其他服务",

    discountNone: "无",
    discount95: "95折",
    discount9: "9折",
    discount85: "85折",
    discount8: "8折",
    discountFixed: "减 ${v}",
    discountCustom: "自定义抵扣",
    discountPresetTitle: "优惠抵扣",
    discountPresetPercentLabel: "折扣百分比（例如 90 会显示 9折）",
    discountPresetFixedLabel: "固定抵扣金额",

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
    customerTab: "客户",
    customerPageTitle: "客户管理",
    customerLabel: "选择客户",
    customerOptional: "可跳过，之后可补",
    customerSearchPh: "搜索姓名、IG 或电话",
    noCustomer: "未指定客户",
    manageCustomers: "管理客户",
    customerName: "名字",
    customerPhone: "电话",
    customerIg: "IG",
    customerNote: "客户备注",
    customerVisitNote: "本次备注",
    customerVisitNotePh: "例如：特殊设计、补强、折扣原因",
    addCustomer: "新增客户",
    customerRequired: "请先输入客户名字",
    customerTotalSpent: "总消费",
    customerVisits: "到店次数",
    customerLastVisit: "最近一次",
    customerHistory: "历史记录",
    noCustomerData: "暂无客户资料",
    noCustomerHistory: "该客户暂无消费记录",
    saveNote: "保存备注",
    customerCount: "客户数",
    sortRecent: "最近到店",
    sortName: "姓名",
    sortSpent: "总消费",
    addCustomerHint: "新增客户",
    noSearchResult: "找不到符合的客户",
    customerQuickAdd: "找不到客户？新增「${name}」",
    deleteCustomer: "Delete",
    confirmDeleteCustomer: "确定要删除该客户吗？已绑定的记录会保留，但不再关联此客户。",

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
    languageLabelTag: "Language",
    language_zhTW: "Traditional Chinese",
    language_zhCN: "Simplified Chinese",
    language_en: "English",

    studioNameLabel: "Studio Name",
    studioNameLabelTag: "Studio Name",
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
    sectionDiscountTitle: "Discount",
    sectionDiscountLabel: "Discount",

    perFinger: "/ nail",
    addonStyleAdminHint: "Enter amount at checkout",

    otherProduct: "Product add-on",
    otherService: "Additional services",

    discountNone: "None",
    discount95: "5% off",
    discount9: "10% off",
    discount85: "15% off",
    discount8: "20% off",
    discountFixed: "-$${v}",
    discountCustom: "Custom discount",
    discountPresetTitle: "Discount",
    discountPresetPercentLabel: "Percent values",
    discountPresetFixedLabel: "Fixed amount options",

    reportsTitle: "Reports",
    reportsLabel: "Reports",
    monthQuery: "Month",
    revenueMonth: "Revenue",
    visitsMonth: "Clients",
    checkoutRecords: "Checkout History",
    exportCsv: "Export CSV",
    noRecordsMonth: "No records for this month",

    saveChanges: "Save",

    bottomDiscounted: "Discounted",
    copy: "Copy",
    copied: "Copied",
    checkout: "Checkout",
    customerTab: "Customers",
    customerPageTitle: "Customer Management",
    customerLabel: "Customer",
    customerOptional: "Optional, add later anytime",
    customerSearchPh: "Search by name, phone, or IG",
    noCustomer: "Not specified",
    manageCustomers: "Manage customers",
    customerName: "Name",
    customerPhone: "Phone",
    customerIg: "IG",
    customerNote: "Customer note",
    customerVisitNote: "Visit note",
    customerVisitNotePh: "Ex: special design, reinforcement, discount reason",
    addCustomer: "Add customer",
    customerRequired: "Please enter customer name",
    customerTotalSpent: "Total spent",
    customerVisits: "Visits",
    customerLastVisit: "Last visit",
    customerHistory: "History",
    noCustomerData: "No customers yet",
    noCustomerHistory: "No records for this customer yet",
    saveNote: "Save note",
    customerCount: "Customers",
    sortRecent: "Recent",
    sortName: "Name",
    sortSpent: "Spending",
    addCustomerHint: "Add Customer",
    noSearchResult: "No matching customers",
    customerQuickAdd: "No matches? Add \"${name}\"",
    deleteCustomer: "Delete",
    confirmDeleteCustomer:
      "Delete this customer? Existing records will be kept but unlinked.",

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
    summaryDiscount: "Discount",
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

const formatZhDiscountFromPercent = (percent) => {
  if (!Number.isFinite(percent) || percent <= 0) return "0折";
  const zhe = percent / 10;
  const str = Number.isInteger(zhe) ? String(zhe) : zhe.toFixed(1);
  return `${str}折`;
};

const discountPercentLabel = (locale, percent) => {
  if (locale === "en") {
    const off = Math.max(0, 100 - percent);
    return `${off}% off`;
  }
  return formatZhDiscountFromPercent(percent);
};

const formatShortDateFromId = (locale, id) => {
  const ts = Number(id);
  if (!Number.isFinite(ts) || ts <= 0) return "-";
  const localeCode = locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : "zh-TW";
  return new Date(ts).toLocaleDateString(localeCode, {
    month: "2-digit",
    day: "2-digit",
  });
};

/** IG 與電話並列一行，中間用間隔號；僅填其一則只顯示該項。 */
const customerContactSubtitle = (c) => {
  const ig = String(c.ig || "").trim().replace(/^@+/, "");
  const phone = String(c.phone || "").trim();
  const parts = [];
  if (ig) parts.push(`@${ig}`);
  if (phone) parts.push(phone);
  if (parts.length === 0) return "-";
  return parts.join(" · ");
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
      造型: "造型",
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
      造型: "造型",
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
      造型: "Nail Art",
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

const DEFAULT_ADDONS = { 延甲: 50, 水晶: 100, 造型: 0 };
const CUSTOM_ADDONS_STORAGE_KEY = "nail_custom_addons";
const ADDON_QUICK_QTY_TARGETS = new Set(["延甲", "水晶"]);
/** 加購項目：結帳時直接輸入總金額（非每指單價 × 指數） */
const ADDON_DIRECT_AMOUNT_KEYS = new Set(["造型"]);
const ADDON_QUICK_QTY_VALUES = [3, 5, 10];
const DEFAULT_BASE_STYLES = {
  透明建甲: 800,
  單色: 900,
  跳色: 1000,
  法式: 1200,
  貓眼: 1300,
  漸層: 1400,
};
const CUSTOM_BASE_STYLES_STORAGE_KEY = "nail_custom_base_styles";
const CUSTOMERS_STORAGE_KEY = "nail_customers";
const DISCOUNT_PRESETS_STORAGE_KEY = "nail_discount_presets";
const DEFAULT_DISCOUNT_PRESETS = {
  percentValues: [95, 90, 85, 80],
  fixedValues: [50, 100, 200],
};

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

const getStoredCustomers = () => {
  try {
    const raw = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (c) =>
        c &&
        typeof c === "object" &&
        typeof c.id === "number" &&
        typeof c.name === "string"
    );
  } catch {
    return [];
  }
};

const getStoredDiscountPresets = () => {
  try {
    const raw = localStorage.getItem(DISCOUNT_PRESETS_STORAGE_KEY);
    if (!raw) return DEFAULT_DISCOUNT_PRESETS;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return DEFAULT_DISCOUNT_PRESETS;
    const percentValues = Array.isArray(parsed.percentValues)
      ? parsed.percentValues
          .map((v) => Number(v))
          .filter((v) => Number.isFinite(v) && v > 0 && v <= 100)
      : DEFAULT_DISCOUNT_PRESETS.percentValues;
    const fixedValues = Array.isArray(parsed.fixedValues)
      ? parsed.fixedValues
          .map((v) => Number(v))
          .filter((v) => Number.isFinite(v) && v >= 0)
      : DEFAULT_DISCOUNT_PRESETS.fixedValues;
    return {
      percentValues:
        percentValues.length > 0
          ? percentValues.slice(0, 4)
          : DEFAULT_DISCOUNT_PRESETS.percentValues,
      fixedValues:
        fixedValues.length > 0
          ? fixedValues.slice(0, 3)
          : DEFAULT_DISCOUNT_PRESETS.fixedValues,
    };
  } catch {
    return DEFAULT_DISCOUNT_PRESETS;
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
  const [customers, setCustomers] = useState(() => getStoredCustomers());
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [checkoutNote, setCheckoutNote] = useState("");
  const [customerForm, setCustomerForm] = useState({
    name: "",
    phone: "",
    ig: "",
    note: "",
  });
  const [customerFormError, setCustomerFormError] = useState("");
  const [activeCustomerId, setActiveCustomerId] = useState(null);
  const [customerDirectoryQuery, setCustomerDirectoryQuery] = useState("");
  const [customerSort, setCustomerSort] = useState("recent");
  const [discountPresets, setDiscountPresets] = useState(() =>
    getStoredDiscountPresets()
  );

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
  useEffect(
    () => localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers)),
    [customers]
  );
  useEffect(() => {
    localStorage.setItem(
      DISCOUNT_PRESETS_STORAGE_KEY,
      JSON.stringify(discountPresets)
    );
  }, [discountPresets]);

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
      const sel = selections.addons[key] || 0;
      if (ADDON_DIRECT_AMOUNT_KEYS.has(key)) {
        subtotal += Math.max(0, Number(sel) || 0);
      } else {
        subtotal += (prices.addons[key] || 0) * sel;
      }
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

  const selectedCustomer = useMemo(
    () => customers.find((c) => c.id === selectedCustomerId) || null,
    [customers, selectedCustomerId]
  );

  const filteredCustomers = useMemo(() => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) => {
      const name = String(c.name || "").toLowerCase();
      const ig = String(c.ig || "").toLowerCase();
      const phone = String(c.phone || "").toLowerCase();
      return name.includes(q) || ig.includes(q) || phone.includes(q);
    });
  }, [customers, customerSearch]);

  const customerStatsMap = useMemo(() => {
    const map = {};
    records.forEach((r) => {
      if (!r.customerId) return;
      if (!map[r.customerId]) {
        map[r.customerId] = {
          totalSpent: 0,
          visits: 0,
          lastVisit: "",
          lastRecordId: 0,
        };
      }
      map[r.customerId].totalSpent += Number(r.amount) || 0;
      map[r.customerId].visits += 1;
      map[r.customerId].lastVisit = r.date;
      map[r.customerId].lastRecordId = Math.max(
        map[r.customerId].lastRecordId,
        Number(r.id) || 0
      );
    });
    return map;
  }, [records]);

  const sortedCustomers = useMemo(() => {
    const q = customerDirectoryQuery.trim().toLowerCase();
    const filtered = customers.filter((c) => {
      if (!q) return true;
      return (
        String(c.name || "").toLowerCase().includes(q) ||
        String(c.ig || "").toLowerCase().includes(q) ||
        String(c.phone || "").toLowerCase().includes(q)
      );
    });
    return filtered.sort((a, b) => {
      if (customerSort === "name") return a.name.localeCompare(b.name, "zh-Hant");
      if (customerSort === "spent") {
        const aSpent = customerStatsMap[a.id]?.totalSpent || 0;
        const bSpent = customerStatsMap[b.id]?.totalSpent || 0;
        return bSpent - aSpent;
      }
      const aRecent = customerStatsMap[a.id]?.lastRecordId || 0;
      const bRecent = customerStatsMap[b.id]?.lastRecordId || 0;
      return bRecent - aRecent;
    });
  }, [customerDirectoryQuery, customers, customerSort, customerStatsMap]);

  const customerLinkedSpendTotal = useMemo(
    () =>
      records
        .filter((r) => r.customerId)
        .reduce((acc, r) => acc + (Number(r.amount) || 0), 0),
    [records]
  );

  const customerSpentKpiDisplay = useMemo(() => {
    const loc = locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : "zh-TW";
    return `$${customerLinkedSpendTotal.toLocaleString(loc)}`;
  }, [customerLinkedSpendTotal, locale]);

  const customerVisitCountKpi = useMemo(
    () => records.filter((r) => r.customerId).length,
    [records]
  );

  const kpiValueSizeClass = (displayText) => {
    const len = String(displayText).length;
    if (len >= 15) return "text-sm leading-none";
    if (len >= 12) return "text-base leading-none";
    if (len >= 9) return "text-lg leading-none";
    if (len >= 7) return "text-xl leading-none";
    return "text-2xl leading-none";
  };

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
      const v = selections.addons[key];
      if (!v || v <= 0) return;
      if (ADDON_DIRECT_AMOUNT_KEYS.has(key)) {
        text += `▫️ ${priceItemLabel(locale, "addons", key)}: $${Math.round(
          Number(v) || 0
        )}\n`;
      } else {
        text += `▫️ ${priceItemLabel(locale, "addons", key)} x${v}: $${
          prices.addons[key] * v
        }\n`;
      }
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
    if (checkoutNote.trim()) {
      text += `▫️ ${t("customerVisitNote")}: ${checkoutNote.trim()}\n`;
    }
    text += `----------------------\n🤍 ${t("summaryTotal")}: $${calculateTotal()}\n\n${t(
      "summaryThanks"
    )}`;
    return text.trim();
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
      customerId: selectedCustomer?.id || null,
      customerName: selectedCustomer?.name || "",
      visitNote: checkoutNote.trim(),
      // 輔助過濾欄位
      month: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}`,
    };
    setRecords((prev) => [newRecord, ...prev]);
    copyToClipboard();
    setShowModal(false);
    setCheckoutNote("");
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

  const addCustomer = () => {
    const name = customerForm.name.trim();
    if (!name) {
      setCustomerFormError(t("customerRequired"));
      return;
    }
    const newCustomer = {
      id: Date.now(),
      name,
      phone: customerForm.phone.trim(),
      ig: customerForm.ig.trim().replace(/^@+/, ""),
      note: customerForm.note.trim(),
      createdAt: new Date().toISOString(),
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    setSelectedCustomerId(newCustomer.id);
    setActiveCustomerId(newCustomer.id);
    setCustomerForm({ name: "", phone: "", ig: "", note: "" });
    setCustomerFormError("");
  };

  const quickAddCustomerFromSearch = () => {
    const name = customerSearch.trim();
    if (!name) return;
    const newCustomer = {
      id: Date.now(),
      name,
      phone: "",
      ig: "",
      note: "",
      createdAt: new Date().toISOString(),
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    setSelectedCustomerId(newCustomer.id);
    setActiveCustomerId(newCustomer.id);
  };

  const updateCustomerField = (customerId, field, value) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, [field]: value } : c))
    );
  };

  const updateRecordNote = (recordId, note) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === recordId ? { ...r, visitNote: note } : r))
    );
  };

  const deleteCustomer = (customerId) => {
    const shouldDelete = window.confirm(t("confirmDeleteCustomer"));
    if (!shouldDelete) return;

    setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    setRecords((prev) =>
      prev.map((r) =>
        r.customerId === customerId ? { ...r, customerId: null } : r
      )
    );
    setSelectedCustomerId((prev) => (prev === customerId ? null : prev));
    setActiveCustomerId((prev) => (prev === customerId ? null : prev));
  };

  const updateDiscountPercentPreset = (index, value) => {
    const nextValue = Math.max(0, Math.min(100, Number(value) || 0));
    setDiscountPresets((prev) => {
      const next = [...prev.percentValues];
      next[index] = nextValue;
      return { ...prev, percentValues: next };
    });
  };

  const updateDiscountFixedPreset = (index, value) => {
    const nextValue = Math.max(0, Number(value) || 0);
    setDiscountPresets((prev) => {
      const next = [...prev.fixedValues];
      next[index] = nextValue;
      return { ...prev, fixedValues: next };
    });
  };

  const SectionHeader = ({ title, label }) => {
    const showLabel =
      label &&
      (locale !== "en" ||
        String(title).trim().toLowerCase() !==
          String(label).trim().toLowerCase());
    return (
      <div className="flex justify-between items-baseline mb-4 pr-1">
        <h2
          style={{ fontSize: theme.fontSize.sectionTitle }}
          className="font-bold"
        >
          {title}
        </h2>
        {showLabel ? (
          <span
            style={{ fontSize: theme.fontSize.label, color: theme.textMuted }}
            className="font-medium uppercase tracking-widest"
          >
            {label}
          </span>
        ) : null}
      </div>
    );
  };

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
        paddingBottom:
          view === "calculator"
            ? "calc(116px + env(safe-area-inset-bottom, 0px))"
            : "calc(40px + env(safe-area-inset-bottom, 0px))",
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
            onClick={() =>
              setView(view === "customers" ? "calculator" : "customers")
            }
            className={`${
              view === "customers" ? "text-[#9F7D6B]" : "text-stone-400"
            }`}
            title={t("customerTab")}
          >
            <Icon name="list" size={22} />
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
            className="w-full text-center leading-snug py-1 px-2 bg-transparent border-0"
            style={{ fontSize: theme.fontSize.btnMain }}
          >
            <span className="block font-bold text-[#9F7D6B]">{greetingLines.line1}</span>
            <span className="block mt-1 text-sm text-[#9F7D6B]">
              {greetingLines.line2}
            </span>
          </p>
          <section className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm space-y-2">
            <div className="flex flex-col items-center justify-center gap-1 mb-1 text-center">
              <h3 className="font-bold text-sm">{t("customerLabel")}</h3>
              {locale !== "en" ? (
                <span className="text-[10px] font-medium uppercase tracking-widest text-stone-400">
                  Customer
                </span>
              ) : null}
            </div>
            <input
              type="text"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              placeholder={t("customerSearchPh")}
              className="w-full text-sm font-medium text-center bg-stone-50 rounded-full px-4 py-2.5 outline-none border border-stone-100 focus:border-[#9F7D6B]"
            />
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => setSelectedCustomerId(null)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border text-center ${
                  selectedCustomerId === null
                    ? "border-[#9F7D6B] bg-[#EBDCD3] text-[#9F7D6B]"
                    : "border-stone-200 bg-white text-stone-500"
                }`}
              >
                {t("noCustomer")}
              </button>
            </div>
            {customerSearch.trim() ? (
              filteredCustomers.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {filteredCustomers.slice(0, 6).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCustomerId(c.id)}
                      className={`px-3 py-2 rounded-xl text-left border ${
                        selectedCustomerId === c.id
                          ? "border-[#9F7D6B] bg-[#EBDCD3] text-[#9F7D6B]"
                          : "border-stone-200 bg-white text-stone-500"
                      }`}
                    >
                      <p className="text-xs font-bold truncate">{c.name}</p>
                      <p className="text-[11px] opacity-80 truncate mt-0.5">
                        {customerContactSubtitle(c)}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={quickAddCustomerFromSearch}
                  className="w-full py-2.5 rounded-2xl text-xs font-bold border border-[#9F7D6B] bg-[#EBDCD3] text-[#9F7D6B]"
                >
                  {t("customerQuickAdd", {
                    name:
                      customerSearch.trim().length > 24
                        ? `${customerSearch.trim().slice(0, 24)}…`
                        : customerSearch.trim(),
                  })}
                </button>
              )
            ) : null}
          </section>
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
                    style={{
                      fontSize: theme.fontSize.btnMain,
                      color: theme.textMain,
                    }}
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
                    style={{
                      fontSize: theme.fontSize.btnMain,
                      color: theme.textMain,
                    }}
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
                  className="bg-white p-4 rounded-2xl border border-stone-200"
                >
                  {ADDON_DIRECT_AMOUNT_KEYS.has(item) ? (
                    <div className="flex justify-between items-center gap-3">
                      <div
                        style={{ fontSize: theme.fontSize.btnMain }}
                        className="font-bold"
                      >
                        {priceItemLabel(locale, "addons", item)}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-stone-400 text-xs">$</span>
                        <input
                          type="number"
                          className="w-20 text-right font-bold text-[#9F7D6B] bg-stone-50 rounded-lg p-2 focus:outline-none"
                          value={selections.addons[item] || ""}
                          onChange={(e) =>
                            setSelections((p) => ({
                              ...p,
                              addons: {
                                ...p.addons,
                                [item]: Math.max(
                                  0,
                                  parseInt(e.target.value, 10) || 0
                                ),
                              },
                            }))
                          }
                          onFocus={(e) => e.target.select()}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center gap-3">
                        <div className="flex items-baseline gap-2">
                          <div
                            style={{ fontSize: theme.fontSize.btnMain }}
                            className="font-bold"
                          >
                            {priceItemLabel(locale, "addons", item)}
                          </div>
                          <div
                            style={{
                              fontSize: theme.fontSize.btnMain,
                              color: theme.textMain,
                            }}
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
                                  [item]: Math.max(
                                    0,
                                    (p.addons[item] || 0) - 1
                                  ),
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
                      {ADDON_QUICK_QTY_TARGETS.has(item) && (
                        <div className="mt-3 w-[7.5rem] ml-auto flex items-center justify-between">
                          {ADDON_QUICK_QTY_VALUES.map((qty) => (
                            <button
                              key={qty}
                              type="button"
                              onClick={() =>
                                setSelections((p) => ({
                                  ...p,
                                  addons: {
                                    ...p.addons,
                                    [item]: qty,
                                  },
                                }))
                              }
                              className={`w-8 h-8 rounded-lg border text-xs font-bold transition-colors ${
                                (selections.addons[item] || 0) === qty
                                  ? "border-[#9F7D6B] bg-[#EBDCD3] text-[#9F7D6B]"
                                  : "border-stone-200 bg-white text-[#9F7D6B]"
                              }`}
                            >
                              {qty}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
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
                    style={{
                      fontSize: theme.fontSize.btnMain,
                      color: theme.textMain,
                    }}
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
                  ...discountPresets.percentValues.map((percent, idx) => ({
                    k: `p_${idx}_${percent}`,
                    l: discountPercentLabel(locale, percent),
                    t: "percent",
                    v: percent / 100,
                  })),
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
                        : "border-stone-200 text-[#5F4636]"
                    }`}
                  >
                    {d.l}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {discountPresets.fixedValues.map((v) => (
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
                        : "border-stone-200 text-[#5F4636]"
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
                  <span className="text-[#5F4636] font-bold text-xs">-$</span>
                  <input
                    type="number"
                    className="w-16 text-right font-bold text-[#5F4636] bg-stone-50 rounded-lg p-1.5 focus:outline-none"
                    value={
                      selections.discountType === "fixed" &&
                      !discountPresets.fixedValues.includes(selections.discountVal)
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
              <div className="text-center py-10 text-sm text-stone-500">
                {t("noRecordsMonth")}
              </div>
            ) : (
              filteredRecords.map((r) => (
                <div
                  key={r.id}
                  className="bg-white p-4 rounded-2xl border border-stone-100"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs text-stone-500">{r.date}</p>
                      <p className="text-sm font-bold text-[#5F4636] leading-snug truncate">
                        {r.items}
                      </p>
                      <p className="text-xs text-stone-500 truncate">
                        {t("customerLabel")}: {r.customerName || t("noCustomer")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-bold text-[#9F7D6B] tabular-nums">
                        ${r.amount}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteRecord(r.id)}
                        className="text-stone-300 hover:text-stone-500"
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <textarea
                      value={r.visitNote || ""}
                      onChange={(e) => updateRecordNote(r.id, e.target.value)}
                      placeholder={t("customerVisitNotePh")}
                      className="w-full min-h-11 text-xs bg-stone-50 rounded-xl px-3 py-1.5 text-[#5F4636] placeholder:text-stone-400 outline-none border border-stone-100 focus:border-[#9F7D6B]"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {view === "customers" && (
        <div className="p-6 max-w-md mx-auto">
          <SectionHeader title={t("customerPageTitle")} label="CRM" />

          <div className="mb-5 space-y-2 sm:space-y-3">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="min-w-0 bg-white p-3 sm:p-4 rounded-3xl shadow-sm border border-stone-100 flex flex-col justify-center">
                <p className="text-center text-[12px] text-stone-400 font-bold uppercase mb-1">
                  {t("customerCount")}
                </p>
                <p
                  className={`text-center font-black tabular-nums text-[#9F7D6B] max-w-full min-w-0 px-0.5 ${kpiValueSizeClass(
                    String(customers.length)
                  )}`}
                >
                  {customers.length}
                </p>
              </div>
              <div className="min-w-0 bg-white p-3 sm:p-4 rounded-3xl shadow-sm border border-stone-100 flex flex-col justify-center">
                <p className="text-center text-[12px] text-stone-400 font-bold uppercase mb-1">
                  {t("customerVisits")}
                </p>
                <p
                  className={`text-center font-black tabular-nums text-[#9F7D6B] max-w-full min-w-0 px-0.5 ${kpiValueSizeClass(
                    String(customerVisitCountKpi)
                  )}`}
                >
                  {customerVisitCountKpi}
                </p>
              </div>
            </div>
            <div className="min-w-0 bg-white p-3 sm:p-4 rounded-3xl shadow-sm border border-stone-100 flex flex-col items-center justify-center text-center">
              <p className="text-center text-[12px] text-stone-400 font-bold uppercase mb-1">
                {t("customerTotalSpent")}
              </p>
              <p
                className={`text-center font-black tabular-nums text-[#9F7D6B] max-w-full min-w-0 px-1 ${kpiValueSizeClass(
                  customerSpentKpiDisplay
                )}`}
              >
                {customerSpentKpiDisplay}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm mb-6">
            <input
              type="text"
              value={customerDirectoryQuery}
              onChange={(e) => setCustomerDirectoryQuery(e.target.value)}
              placeholder={t("customerSearchPh")}
              className="w-full text-sm font-medium text-center bg-stone-50 rounded-full px-4 py-2.5 text-[#5F4636] outline-none border border-stone-100 focus:border-[#9F7D6B]"
            />
          </div>

          <div className="space-y-2 mb-6">
            {customers.length === 0 ? (
              <div className="text-center py-8 text-stone-300 text-sm italic">
                {t("noCustomerData")}
              </div>
            ) : sortedCustomers.length === 0 ? (
              <div className="text-center py-8 text-stone-300 text-sm italic">
                {t("noSearchResult")}
              </div>
            ) : (
              sortedCustomers.map((c) => {
                const stats = customerStatsMap[c.id] || {
                  totalSpent: 0,
                  visits: 0,
                  lastVisit: "-",
                  lastRecordId: 0,
                };
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() =>
                      setActiveCustomerId((prev) => (prev === c.id ? null : c.id))
                    }
                    className={`w-full text-left bg-white p-4 rounded-2xl border transition-all ${
                      activeCustomerId === c.id
                        ? "border-[#9F7D6B] shadow-sm bg-[#FFFCFA]"
                        : "border-stone-100 hover:border-stone-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-base font-bold text-[#5F4636] truncate">{c.name}</p>
                        <p className="text-sm text-stone-500 mt-0.5 truncate">
                          {customerContactSubtitle(c)}
                        </p>
                      </div>
                      <div className="shrink-0 text-right min-w-0">
                        <p className="text-base font-bold tabular-nums text-[#9F7D6B] leading-tight">
                          ${stats.totalSpent.toLocaleString(
                            locale === "en"
                              ? "en-US"
                              : locale === "zh-CN"
                                ? "zh-CN"
                                : "zh-TW"
                          )}
                        </p>
                        <p className="text-sm font-medium text-stone-600 leading-tight mt-1">
                          {stats.visits} {t("customerVisits")}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {activeCustomerId && (
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
              {(() => {
                const customer = customers.find((c) => c.id === activeCustomerId);
                if (!customer) return null;
                const stats = customerStatsMap[customer.id] || {
                  totalSpent: 0,
                  visits: 0,
                  lastVisit: "-",
                  lastRecordId: 0,
                };
                const lastVisitLabel = formatShortDateFromId(locale, stats.lastRecordId);
                const spentLocale =
                  locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : "zh-TW";
                const spentDisplay = `$${stats.totalSpent.toLocaleString(spentLocale)}`;
                const history = records.filter((r) => r.customerId === customer.id);
                return (
                  <>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="text-base font-bold">{customer.name}</h3>
                      <button
                        type="button"
                        onClick={() => deleteCustomer(customer.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 text-[#9F7D6B] text-xs font-bold hover:bg-stone-50 transition-colors"
                      >
                        <Icon name="trash" size={12} />
                        {t("deleteCustomer")}
                      </button>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-stone-50 rounded-xl min-h-[5rem] px-2 py-2 flex flex-col items-center justify-center">
                          <p className="max-w-full text-center text-[12px] font-bold uppercase leading-snug text-stone-400 mb-1">
                            {t("customerVisits")}
                          </p>
                          <p className="text-xl font-black text-[#9F7D6B] leading-none tabular-nums">
                            {stats.visits}
                          </p>
                        </div>
                        <div className="bg-stone-50 rounded-xl min-h-[5rem] px-2 py-2 flex flex-col items-center justify-center">
                          <p className="max-w-full text-center text-[12px] font-bold uppercase leading-snug text-stone-400 mb-1">
                            {t("customerLastVisit")}
                          </p>
                          <p className="text-xl font-black text-[#9F7D6B] leading-none truncate max-w-full tabular-nums">
                            {lastVisitLabel}
                          </p>
                        </div>
                      </div>
                      <div className="bg-stone-50 rounded-xl px-3 py-3 flex flex-col items-center justify-center text-center">
                        <p className="max-w-full text-center text-[12px] font-bold uppercase leading-snug text-stone-400 mb-1">
                          {t("customerTotalSpent")}
                        </p>
                        <p
                          className={`max-w-full min-w-0 text-center font-black tabular-nums leading-none text-[#9F7D6B] ${kpiValueSizeClass(
                            spentDisplay
                          )}`}
                        >
                          {spentDisplay}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <input
                        type="text"
                        value={customer.phone || ""}
                        onChange={(e) =>
                          updateCustomerField(customer.id, "phone", e.target.value)
                        }
                        placeholder={t("customerPhone")}
                        className="w-full text-sm font-medium bg-stone-50 rounded-2xl px-3 py-2.5 text-[#5F4636] outline-none border border-stone-100 focus:border-[#9F7D6B]"
                      />
                      <div className="w-full flex items-center gap-1 bg-stone-50 rounded-2xl px-3 py-2.5 text-[#5F4636] outline-none border border-stone-100 focus-within:border-[#9F7D6B]">
                        <span className="text-sm font-bold text-stone-400">@</span>
                        <input
                          type="text"
                          value={customer.ig || ""}
                          onChange={(e) =>
                            updateCustomerField(
                              customer.id,
                              "ig",
                              e.target.value.replace(/^@+/, "")
                            )
                          }
                          placeholder={t("customerIg")}
                          className="w-full text-sm font-medium bg-transparent outline-none"
                        />
                      </div>
                    </div>
                    <textarea
                      value={customer.note || ""}
                      onChange={(e) =>
                        updateCustomerField(customer.id, "note", e.target.value)
                      }
                      placeholder={t("customerNote")}
                      className="w-full min-h-20 text-sm bg-stone-50 rounded-2xl px-3 py-2.5 text-[#5F4636] outline-none border border-stone-100 focus:border-[#9F7D6B] mb-4"
                    />
                    <h4 className="text-sm font-bold mb-2">{t("customerHistory")}</h4>
                    <div className="space-y-2">
                      {history.length === 0 ? (
                        <p className="text-xs text-stone-300 italic">{t("noCustomerHistory")}</p>
                      ) : (
                        history.map((r) => (
                          <div key={r.id} className="bg-stone-50 rounded-xl p-3">
                            <p className="text-[10px] text-stone-400">{r.date}</p>
                            <p className="text-sm font-bold">{r.items}</p>
                            <p className="text-xs font-bold text-[#9F7D6B]">${r.amount}</p>
                            {r.visitNote && (
                              <p className="text-xs text-stone-500 mt-1">
                                {t("customerVisitNote")}: {r.visitNote}
                              </p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          <h3 className="text-base font-bold mb-3 mt-6 flex items-baseline">
            {t("addCustomerHint")}
            <span className="ml-auto text-[10px] uppercase font-bold text-stone-400 tracking-widest">
              ADD CUSTOMER
            </span>
          </h3>
          <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-3">
            <input
              type="text"
              value={customerForm.name}
              onChange={(e) => {
                setCustomerForm((p) => ({ ...p, name: e.target.value }));
                if (customerFormError) setCustomerFormError("");
              }}
              placeholder={`${t("customerName")} *`}
              className="w-full text-sm font-bold bg-stone-50 rounded-2xl px-3 py-2.5 text-[#5F4636] outline-none border border-stone-100 focus:border-[#9F7D6B]"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={customerForm.phone}
                onChange={(e) =>
                  setCustomerForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder={t("customerPhone")}
                className="w-full text-sm font-medium bg-stone-50 rounded-2xl px-3 py-2.5 text-[#5F4636] outline-none border border-stone-100 focus:border-[#9F7D6B]"
              />
              <div className="w-full flex items-center gap-1 bg-stone-50 rounded-2xl px-3 py-2.5 text-[#5F4636] outline-none border border-stone-100 focus-within:border-[#9F7D6B]">
                <span className="text-sm font-bold text-stone-400">@</span>
                <input
                  type="text"
                  value={customerForm.ig}
                  onChange={(e) =>
                    setCustomerForm((p) => ({
                      ...p,
                      ig: e.target.value.replace(/^@+/, ""),
                    }))
                  }
                  placeholder={t("customerIg")}
                  className="w-full text-sm font-medium bg-transparent outline-none"
                />
              </div>
            </div>
            <textarea
              value={customerForm.note}
              onChange={(e) =>
                setCustomerForm((p) => ({ ...p, note: e.target.value }))
              }
              placeholder={t("customerNote")}
              className="w-full min-h-20 text-sm font-medium bg-stone-50 rounded-2xl px-3 py-2.5 text-[#5F4636] outline-none border border-stone-100 focus:border-[#9F7D6B]"
            />
            {customerFormError && (
              <p className="text-[11px] text-rose-500 font-medium">{customerFormError}</p>
            )}
            <button
              type="button"
              onClick={addCustomer}
              className="w-full py-2.5 rounded-2xl bg-[#9F7D6B] text-white text-sm font-bold shadow-sm"
            >
              {t("addCustomer")}
            </button>
          </div>
        </div>
      )}

      {/* 管理介面 */}
      {view === "admin" && (
        <div className="p-6 max-w-md mx-auto">
          <h3 className="text-base font-bold mb-3 flex items-baseline">
            {t("studioNameLabel")}
            {locale !== "en" ? (
              <span className="ml-auto text-[10px] uppercase font-bold text-stone-400 tracking-widest">
                {t("studioNameLabelTag")}
              </span>
            ) : null}
          </h3>
          <div className="mb-10 px-4 py-3.5 bg-white rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center border-b-2 border-stone-100 py-2.5 focus-within:border-[#9F7D6B] transition-colors">
              <input
                type="text"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                onFocus={(e) => e.target.select()}
                className="w-full min-h-0 flex-1 border-0 bg-transparent py-0 text-xl font-bold leading-tight text-[#9F7D6B] outline-none"
              />
            </div>
            <p className="mt-3 text-xs font-medium leading-relaxed text-[#5F4636]">
              {t("studioNameHint")}
            </p>
          </div>

          <h3 className="text-base font-bold mb-3 flex items-baseline">
            {t("languageLabel")}
            {locale !== "en" ? (
              <span className="ml-auto text-[10px] uppercase font-bold text-stone-400 tracking-widest">
                {t("languageLabelTag")}
              </span>
            ) : null}
          </h3>
          <div className="mb-10 px-4 py-3.5 bg-white rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
            <select
              value={locale}
              onChange={(e) => setLocale(/** @type {AppLocale} */ (e.target.value))}
              className="w-full min-h-[2.75rem] appearance-none bg-stone-50 bg-no-repeat rounded-full border border-stone-100 py-2.5 pl-4 pr-12 text-sm font-bold leading-normal text-[#5F4636] outline-none focus:border-[#9F7D6B]"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5F4636" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'
                )}")`,
                backgroundPosition: "right 0.875rem center",
                backgroundSize: "1.125rem",
              }}
            >
              <option value="zh-TW">{t("language_zhTW")}</option>
              <option value="zh-CN">{t("language_zhCN")}</option>
              <option value="en">{t("language_en")}</option>
            </select>
          </div>

          <h3 className="text-base font-bold mb-3 flex items-baseline">
            {t("pricingTitle")}
            {locale !== "en" ? (
              <span className="ml-auto text-[10px] uppercase font-bold text-stone-400 tracking-widest">
                {t("pricingLabel")}
              </span>
            ) : null}
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
                    {cat === "addons" && ADDON_DIRECT_AMOUNT_KEYS.has(name) ? (
                      <span className="text-[11px] font-medium text-stone-400 text-right max-w-[10rem]">
                        {t("addonStyleAdminHint")}
                      </span>
                    ) : (
                      <input
                        type="number"
                        value={price}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          setPrices((prev) => ({
                            ...prev,
                            [cat]: {
                              ...prev[cat],
                              [name]: Number(e.target.value),
                            },
                          }))
                        }
                        className="w-20 text-center font-bold bg-stone-50 rounded-3xl px-3 py-1 text-[#9F7D6B] outline-none shadow-sm"
                      />
                    )}
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

          <h3 className="text-base font-bold mb-3 flex items-baseline">
            {t("discountPresetTitle")}
            {locale !== "en" ? (
              <span className="ml-auto text-[10px] uppercase font-bold text-stone-400 tracking-widest">
                {t("sectionDiscountLabel")}
              </span>
            ) : null}
          </h3>

          <div className="bg-white p-6 rounded-[2rem] mb-6 border border-stone-50 shadow-sm">
            <p className="text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
              {t("discountPresetPercentLabel")}
            </p>
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {discountPresets.percentValues.map((v, idx) => (
                <div
                  key={`percent-${idx}`}
                  className="bg-stone-50 rounded-2xl px-2 py-2.5 border border-stone-100 flex flex-col justify-center"
                >
                  <div className="h-8 flex items-center justify-center gap-0.5">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={v}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        updateDiscountPercentPreset(idx, e.target.value)
                      }
                      className="w-12 h-8 text-center text-xl leading-8 font-bold text-[#9F7D6B] bg-transparent outline-none"
                    />
                    <span className="h-8 flex items-center text-sm text-[#9F7D6B] font-bold">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-center mt-1.5 font-medium leading-snug text-[#5F4636]">
                    {discountPercentLabel(locale, v)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-widest">
              {t("discountPresetFixedLabel")}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {discountPresets.fixedValues.map((v, idx) => (
                <div
                  key={`fixed-${idx}`}
                  className="h-12 flex items-center justify-center gap-0.5 bg-stone-50 rounded-2xl px-2 py-2 border border-stone-100"
                >
                  <span className="shrink-0 text-xs font-bold tabular-nums leading-none text-[#9F7D6B]">
                    -$
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={v}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => updateDiscountFixedPreset(idx, e.target.value)}
                    className="h-8 w-11 min-w-0 flex-none text-center text-xl leading-8 font-bold tabular-nums text-[#9F7D6B] bg-transparent outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
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
            <p className="text-xs text-stone-400 mb-2">
              {t("customerLabel")}: {selectedCustomer?.name || t("noCustomer")}
            </p>
            <textarea
              value={checkoutNote}
              onChange={(e) => setCheckoutNote(e.target.value)}
              placeholder={t("customerVisitNotePh")}
              className="w-full min-h-20 text-xs bg-stone-50 rounded-xl px-3 py-2 text-[#5F4636] outline-none border border-stone-100 focus:border-[#9F7D6B] mb-3"
            />
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
      <footer className="mt-5 mb-1 max-w-lg mx-auto px-5 text-center pt-4">
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
          className="mt-2.5 flex items-center justify-center gap-5"
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
