import ComeVendere from "../sections/ComeVendere";
import CtaVendita from "../sections/CtaVendita";
import HeroVendiCasa from "../sections/HeroVendiCasa";

/**
 * Page component for the "Vendi Casa" (Sell Your Home) section.
 *
 * Displays the hero section, an explanation of the selling process,
 * and a final call-to-action.
 *
 * @component
 * @returns {JSX.Element} The rendered Sell Home page.
 */
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
