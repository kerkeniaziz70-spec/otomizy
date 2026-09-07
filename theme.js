(function () {
  var root = document.documentElement;
  var stored = null;
  try {
    stored = localStorage.getItem("otomizy-theme");
  } catch (e) {}
  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  }

  window.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var isDark;
      if (current === "dark") {
        isDark = false;
      } else if (current === "light") {
        isDark = true;
      } else {
        isDark = !window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      var next = isDark ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("otomizy-theme", next);
      } catch (e) {}
    });
  });
})();
