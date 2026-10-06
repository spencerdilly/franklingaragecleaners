(() => {
  /* Nav: a slightly deeper shadow once the page has scrolled */
  const nav = document.querySelector(".nav");
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:40px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => nav.classList.toggle("is-scrolled", !e.isIntersecting)).observe(sentinel);

  /* Sections fade up once, when they scroll into view */
  const sections = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    sections.forEach((el) => io.observe(el));
  } else {
    sections.forEach((el) => el.classList.add("in"));
  }
})();
