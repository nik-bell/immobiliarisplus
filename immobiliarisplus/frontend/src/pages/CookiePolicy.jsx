import { useEffect } from "react";

function CookiePolicy() {
  useEffect(() => {
    const loadIubendaScript = () => {
      (function (w, d) {
        var loader = function () {
          var s = d.createElement("script"),
            tag = d.getElementsByTagName("script")[0];
          s.src = "https://cdn.iubenda.com/iubenda.js";
          tag.parentNode.insertBefore(s, tag);
        };

        if (w.addEventListener) {
          w.addEventListener("load", loader, false);
        } else if (w.attachEvent) {
          w.attachEvent("onload", loader);
        } else {
          w.onload = loader;
        }
      })(window, document);
    };

    loadIubendaScript();
  }, []);

  return (
    <a
      href="https://www.iubenda.com/privacy-policy/92486862/cookie-policy"
      className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe"
      title="Cookie Policy"
    >
      Cookie Policy
    </a>
  );
}

export default CookiePolicy;
