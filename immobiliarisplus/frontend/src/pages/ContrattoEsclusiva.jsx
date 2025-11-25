import HeroContrattoEsclusiva from "../sections/HeroContrattoEsclusiva";
import SpiegazioneContratto from '../sections/SpiegazioneContratto';

function ContattoEsclusiva() {
    return (
        <>
            <HeroContrattoEsclusiva />
            <div className="container xl:px-32">
                <SpiegazioneContratto />
            </div>
        </>
    )
}

export default ContattoEsclusiva;