(function () {
  var y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());
})();

(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  function setMenuOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    setMenuOpen(open);
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      setMenuOpen(false);
    });
  });
})();

(function () {
  var form = document.getElementById("partner-contact-form");
  if (!form) return;

  /** Same number as site WhatsApp (contact rail / wa.me). */
  var WHATSAPP_PHONE = "919502077555";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var name = String(fd.get("name") || "").trim();
    var org = String(fd.get("organisation") || "").trim();
    var email = String(fd.get("email") || "").trim();
    var message = String(fd.get("message") || "").trim();

    var lines = [
      "NAPA — Let's start a conversation (website form)",
      "",
      "Name: " + name,
      "Organisation: " + org,
      "Email: " + email,
      "",
      message,
    ];
    var text = lines.join("\n");
    var url = "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(text);
    window.location.href = url;
  });
})();

(function () {
  var grid = document.querySelector(".team-grid--animated");
  var section = document.getElementById("team");
  if (!grid || !section) return;

  function revealTeam() {
    grid.classList.add("team-grid--in-view");
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTeam();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealTeam();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealTeam();
          observer.disconnect();
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.08,
    }
  );

  observer.observe(section);
})();

(function () {
  window.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;

    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (nav && toggle && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }

    var h = window.location.hash;
    if (h && h.indexOf("gallery-") === 1) {
      e.preventDefault();
      window.location.hash = "#programmes";
    }
  });
})();
