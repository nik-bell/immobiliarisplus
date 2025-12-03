import HeroAssistenza from "../sections/HeroAssistenza";
import ContattiAssistenza from "../sections/ContattiAssistenza";
import FormAssistenza from "../sections/FormAssistenza";
import FAQAssistenza from "../sections/FAQAssistenza";

/**
 * Contact page for user assistance.
 * Displays the hero section, contact information, support form, and FAQ.
 *
 * @component
 * @returns {JSX.Element} The full support & contact page layout.
 */
function Contattaci() {
  return(
    <>
      <HeroAssistenza />
      <div className="container xl:px-32">
        <ContattiAssistenza />
        <FormAssistenza />
        <FAQAssistenza />
      </div>
    </>
  );
}

export default Contattaci;
