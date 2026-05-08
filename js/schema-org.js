(function () {
  function siteBase() {
    try {
      var u = new URL(window.location.href);
      var p = u.pathname;
      if (!p.endsWith("/")) {
        p = p.replace(/\/[^/]+$/, "/") || "/";
      }
      return u.origin + p;
    } catch (e) {
      return "";
    }
  }

  var base = siteBase();
  var logoUrl = "";
  try {
    logoUrl = base ? new URL("assets/logo.png", base).href : "";
  } catch (e) {}

  var orgId = base ? base.replace(/\/?$/, "/") + "#organization" : undefined;
  var org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "New Age Pulmonologists Association",
    alternateName: "NAPA",
    description:
      "New Age Pulmonologists Association (NAPA): a national society of 150+ pulmonologists focused on peer dialogue, sport and wellness, mentorship, and programmes beyond standard CME.",
    email: "thenapaindia@gmail.com",
    sameAs: ["https://www.instagram.com/thenapaindia/"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No 37, HMT Officers Colony, HT Road, Alwal Hills, Alwal",
      addressLocality: "Medchal",
      addressRegion: "Telangana",
      postalCode: "500010",
      addressCountry: "IN",
    },
  };

  if (orgId) org["@id"] = orgId;
  if (base) org.url = base.replace(/\/?$/, "/");
  if (logoUrl) org.logo = logoUrl;

  var el = document.createElement("script");
  el.type = "application/ld+json";
  el.textContent = JSON.stringify(org);
  document.head.appendChild(el);
})();
