/**
 * @file PrivacyPolicy.jsx
 * @description Privacy policy component that loads and displays Iubenda privacy policy embed.
 *              Dynamically loads the Iubenda script on component mount.
 */

import { useEffect } from "react";

/**
 * PrivacyPolicy
 *
 * Component that loads the Iubenda privacy policy script and renders a linked embed.
 * The script is loaded on mount and handles browser compatibility for event listeners.
 *
 * @returns {JSX.Element} Anchor element linking to Iubenda privacy policy.
 */
function PrivacyPolicy() {
  useEffect(() => {
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
  }, []);

  return (
    <>
      <a
        href="https://www.iubenda.com/privacy-policy/92486862"
        className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe"
        title="Privacy Policy"
      >
        Privacy Policy
      </a>
      <br />
    </>
  );
}

export default PrivacyPolicy;
