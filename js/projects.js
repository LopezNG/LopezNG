/* ===================================================================
   Projects Page — Image Gallery Carousel
   =================================================================== */
(function () {
  "use strict";

  document.querySelectorAll(".proj-gallery").forEach((gallery) => {
    const track = gallery.querySelector(".proj-gallery-track");
    const images = track.querySelectorAll("img");
    const prevBtn = gallery.querySelector(".proj-gallery-prev");
    const nextBtn = gallery.querySelector(".proj-gallery-next");
    const dotsContainer = gallery.querySelector(".proj-gallery-dots");
    const total = images.length;
    let current = 0;
    let autoTimer = null;

    if (total <= 1) {
      /* hide controls when there's only one image */
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      return;
    }

    /* ---- Build dots ---- */
    for (let i = 0; i < total; i++) {
      const dot = document.createElement("button");
      dot.className = "proj-gallery-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Go to image ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll(".proj-gallery-dot");

    function goTo(index) {
      current = ((index % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
      resetAuto();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); prev(); });
    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); next(); });

    /* ---- Auto-advance ---- */
    function startAuto() {
      autoTimer = setInterval(next, 5000);
    }
    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    gallery.addEventListener("mouseenter", () => clearInterval(autoTimer));
    gallery.addEventListener("mouseleave", startAuto);

    startAuto();

    /* ---- Touch / swipe support ---- */
    let touchStartX = 0;
    let touchEndX = 0;

    gallery.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallery.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const delta = touchStartX - touchEndX;
      if (Math.abs(delta) > 50) {
        delta > 0 ? next() : prev();
      }
    }, { passive: true });

    /* ---- Keyboard support (when focused) ---- */
    gallery.setAttribute("tabindex", "0");
    gallery.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    });
  });
})();
