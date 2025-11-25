import HeroContrattoEsclusiva from "../sections/HeroContrattoEsclusiva";
import SpiegazioneContratto from '../sections/SpiegazioneContratto';
import PercheScegliereEsclusiva from '../sections/PercheScegliereEsclusiva';
import ComeFunzionaContratto from "../sections/ComeFunzionaContratto";
import InclusioneContratto from "../sections/InclusioneContratto";

function ContattoEsclusiva() {
    return (
        <>
            <HeroContrattoEsclusiva />
            <div className="container xl:px-32">
                <SpiegazioneContratto />
                <PercheScegliereEsclusiva />
                <ComeFunzionaContratto />
                <InclusioneContratto />
            </div>
        </>
    )
}

export default ContattoEsclusiva;