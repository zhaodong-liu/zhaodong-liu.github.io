// Bilingual (English / Chinese) toggle.
// Stores preference in localStorage as "lang" ("en" or "zh").

let determineLangSetting = () => {
  let lang = localStorage.getItem("lang");
  if (lang !== "en" && lang !== "zh") {
    const nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    lang = nav.startsWith("zh") ? "zh" : "en";
  }
  return lang;
};

let applyLang = (lang) => {
  document.documentElement.setAttribute("data-lang", lang);
  document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");

  document.querySelectorAll("[data-i18n-en], [data-i18n-zh]").forEach((el) => {
    const txt = el.getAttribute(lang === "zh" ? "data-i18n-zh" : "data-i18n-en");
    if (txt !== null) el.textContent = txt;
  });
};

let setLang = (lang) => {
  localStorage.setItem("lang", lang);
  applyLang(lang);
};

let toggleLang = () => {
  setLang(determineLangSetting() === "zh" ? "en" : "zh");
};

let initLang = () => {
  applyLang(determineLangSetting());
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("lang-toggle");
    if (btn) btn.addEventListener("click", toggleLang);
  });
};

initLang();
