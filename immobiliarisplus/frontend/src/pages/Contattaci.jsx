import HeroAssistenza from "../sections/HeroAssistenza";
import ContattiAssistenza from "../sections/ContattiAssistenza";
import FormAssistenza from "../sections/FormAssistenza";
import FAQAssistenza from "../sections/FAQAssistenza";

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
  )
}

export default Contattaci;
