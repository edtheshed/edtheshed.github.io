/**
 * Theming.
 *
 * Supports the preferred color scheme of the operation system as well as
 * the theme choice of the user.
 *
 */
const themeToggle = document.querySelector(".theme-toggle");
const chosenTheme = window.localStorage && window.localStorage.getItem("theme");
const chosenThemeIsDark = chosenTheme == "dark";
const chosenThemeIsLight = chosenTheme == "light";

// Detect the color scheme the operating system prefers.
function detectOSColorTheme() {
  if (chosenThemeIsDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else if (chosenThemeIsLight) {
    document.documentElement.setAttribute("data-theme", "light");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

// Update giscus theme to match site theme.
function setGiscusTheme(theme) {
  const origin = window.location.origin;
  const giscusTheme = theme === "light"
    ? origin + "/css/giscus-theme-light.css"
    : origin + "/css/giscus-theme.css";
  const iframe = document.querySelector("iframe.giscus-frame");
  if (iframe) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: giscusTheme } } },
      "https://giscus.app"
    );
  }
}

// Switch the theme.
function switchTheme(e) {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);
  setGiscusTheme(newTheme);
}

// When giscus iframe loads, sync its theme with the current site theme.
window.addEventListener("message", function (event) {
  if (event.origin !== "https://giscus.app") return;
  if (!(typeof event.data === "object" && event.data.giscus)) return;
  const currentTheme = document.documentElement.getAttribute("data-theme");
  setGiscusTheme(currentTheme);
});

// Event listener
if (themeToggle) {
  themeToggle.addEventListener("click", switchTheme, false);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());

  detectOSColorTheme();
} else {
  localStorage.removeItem("theme");
}
