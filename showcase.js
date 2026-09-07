(function () {
  window.addEventListener("DOMContentLoaded", function () {
    var videos = document.querySelectorAll(".showcase-video");
    if (!videos.length) return;

    function loadSrc(v) {
      if (v.dataset.src) {
        v.src = v.dataset.src;
        v.removeAttribute("data-src");
        v.load();
      }
    }

    if (!("IntersectionObserver" in window)) {
      videos.forEach(function (v) {
        loadSrc(v);
        v.play().catch(function () {});
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          v.dataset.inView = entry.isIntersecting ? "1" : "0";
          if (entry.isIntersecting) {
            loadSrc(v);
            v.play().catch(function () {});
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: "200px 0px", threshold: 0.35 }
    );

    videos.forEach(function (v) {
      io.observe(v);
      v.addEventListener("mouseenter", function () {
        loadSrc(v);
        v.play().catch(function () {});
      });
      v.addEventListener("mouseleave", function () {
        if (v.dataset.inView !== "1") v.pause();
      });
    });
  });
})();
