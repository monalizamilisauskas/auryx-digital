/* Origem da visita (rastreamento dos anúncios): guarda a primeira e a última origem por 90 dias neste navegador.
   Origem = utm_* do link, fbclid (clique em anúncio da Meta) ou o site de onde a pessoa veio.
   O kit e o cadastro mandam isso para o banco junto com o e-mail que a pessoa digitou. Nada é enviado só por visitar. */
(function () {
  var K = "auryx_origem", VALIDADE = 90 * 864e5;
  function ler() { try { var g = JSON.parse(localStorage.getItem(K) || "null"); return g && Date.now() - g.t < VALIDADE ? g : null; } catch (e) { return null; } }
  try {
    var p = new URLSearchParams(location.search), o = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"].forEach(function (k) { var v = p.get(k); if (v) o[k] = v.slice(0, 120); });
    try { if (document.referrer) { var h = new URL(document.referrer).hostname; if (h && h !== location.hostname) o.ref = h; } } catch (e) {}
    var g = ler(), tem = Object.keys(o).length > 0;
    if (tem || !g) {
      o.pagina = location.pathname; o.em = new Date().toISOString().slice(0, 10);
      g = { t: Date.now(), primeira: g ? g.primeira : o, ultima: tem ? o : (g ? g.ultima : null) };
      localStorage.setItem(K, JSON.stringify(g));
    }
  } catch (e) {}
  window.auryxOrigem = function () {
    var g = ler() || {};
    return { primeira: g.primeira || {}, ultima: g.ultima || g.primeira || {} };
  };
})();
