import HeroContrattoEsclusiva from "../sections/HeroContrattoEsclusiva";
import SpiegazioneContratto from '../sections/SpiegazioneContratto';
import PercheScegliereEsclusiva from '../sections/PercheScegliereEsclusiva';
import ComeFunzionaContratto from "../sections/ComeFunzionaContratto";
import InclusioneContratto from "../sections/InclusioneContratto";
import FAQContratto from "../sections/FAQContratto";

function ContattoEsclusiva() {
    return (
        <>
            <HeroContrattoEsclusiva />
            <div className="container xl:px-32">
                <SpiegazioneContratto />
                <PercheScegliereEsclusiva />
                <ComeFunzionaContratto />
                <InclusioneContratto />
                <FAQContratto />
            </div>
        </>
    )
}

export default ContattoEsclusiva;