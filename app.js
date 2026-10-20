(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // scroll reveal
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduce) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  // counter
  var num = document.querySelector("[data-count]");
  if (num) {
    var target = +num.dataset.count;
    if (reduce) { num.textContent = target; }
    else {
      var cio = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        cio.disconnect();
        var t0 = performance.now();
        (function tick(t) {
          var p = Math.min((t - t0) / 1200, 1);
          num.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      }, { threshold: 0.4 });
      cio.observe(num);
    }
  }

  // live chat demo
  var chat = document.getElementById("chat");
  var rows = document.querySelectorAll(".ex-row");
  if (!chat) return;
  var script = [
    ["them", "Salut, el robe noire mawjouda ?"],
    ["me", "Bonjour Sarra 👋 Oui, la robe longue noire est disponible. Quelle taille vous faut-il ?"],
    ["them", "M. W tawsil l Sousse kaddéch ?"],
    ["me", "Taille M en stock ✅ Livraison à Sousse en 24-48h, paiement à la livraison. Je confirme la commande ?"],
    ["them", "Behi, confirmi"],
    ["me", "C'est enregistré ! Vous recevrez un appel de confirmation. Merci Sarra 🙏"]
  ];
  var reveal = [1, 3, 3, 4, 5, 5]; // rows shown after each message index

  function play() {
    chat.innerHTML = "";
    rows.forEach(function (r) { r.classList.remove("show"); });
    var shown = 0;
    script.forEach(function (m, i) {
      setTimeout(function () {
        var d = document.createElement("div");
        d.className = "msg " + m[0];
        d.textContent = m[1];
        chat.appendChild(d);
        requestAnimationFrame(function () { d.classList.add("show"); });
        while (chat.children.length > 5) chat.removeChild(chat.firstChild);
        var upTo = [0, 2, 3, 4, 5, 6][i];
        for (; shown < upTo; shown++) rows[shown].classList.add("show");
      }, reduce ? 0 : i * 1800 + 600);
    });
    if (!reduce) setTimeout(play, script.length * 1800 + 4500);
  }

  var started = false;
  var dio = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting && !started) { started = true; play(); }
  }, { threshold: 0.3 });
  dio.observe(document.getElementById("demo"));
})();
