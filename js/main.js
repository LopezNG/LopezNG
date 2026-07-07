/* ===================================================================
   Portfolio — shared interactions
=================================================================== */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      const open = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // close menu after choosing a link
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  /* ---------- Shrink header into a floating pill on scroll ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const SCROLL_THRESHOLD = 24; // px scrolled before transforming
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll(); // set correct state on load (e.g. when refreshing mid-page)
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Auto year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Duplicate marquee content for a seamless loop ----------
     Markup: a .marquee-track containing items. We clone its contents
     once so the -50% translate animation wraps perfectly.            */
  document.querySelectorAll(".marquee-track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- Reveal-on-scroll (progressive enhancement) ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = "opacity 500ms ease, transform 500ms ease";
      io.observe(el);
    });
  }
})();
