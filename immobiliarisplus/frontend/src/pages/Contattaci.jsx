import HeroAssistenza from "../sections/HeroAssistenza";
import ContattiAssistenza from "../sections/ContattiAssistenza";
import FormAssistenza from "../sections/FormAssistenza";

function Contattaci() {
  return(
    <>
    <HeroAssistenza />
    <div className="container">
      <ContattiAssistenza />
      <FormAssistenza />
    </div>
    </>
  )
}

export default Contattaci;
