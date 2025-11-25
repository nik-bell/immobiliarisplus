import ComeVendere from "../sections/ComeVendere";
import CtaVendita from "../sections/CtaVendita";
import HeroVendiCasa from "../sections/HeroVendiCasa";

function VendiCasa() {
  return (
    <>
      <HeroVendiCasa />
      <div className="container xl:px-64">
        <ComeVendere />
        <CtaVendita />
      </div>
    </>
  )
}

export default VendiCasa;
