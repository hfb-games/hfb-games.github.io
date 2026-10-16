// Builds the sticky table of contents from the page headings. Pure progressive
// enhancement: without JS the document reads fine, it just has no sidebar.
(function () {
  var toc = document.getElementById("toc-links");
  var card = document.getElementById("doc");
  if (!toc || !card) return;
  var heads = card.querySelectorAll("h2");
  var links = [];
  heads.forEach(function (h, i) {
    if (!h.id) h.id = "s" + (i + 1);
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    toc.appendChild(a);
    links.push(a);
  });
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove("on"); });
      var hit = toc.querySelector('a[href="#' + e.target.id + '"]');
      if (hit) hit.classList.add("on");
    });
  }, { rootMargin: "-90px 0px -70% 0px" });
  heads.forEach(function (h) { io.observe(h); });
})();
