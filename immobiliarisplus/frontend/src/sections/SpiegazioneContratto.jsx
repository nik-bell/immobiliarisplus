import Card from "../components/Card";

export default function SpiegazioneContratto() {

    return (
        <Card className="bg-white rounded-xl shadow-lg p-8 max-w-2xl my-4 mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-black">
                Cos'è il contratto di vendita in esclusiva?
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
                Il contratto di vendita in esclusiva è un accordo tra te (il proprietario) e
                ImmobiliariPLUS, con cui ci affidi il mandato esclusivo di vendere il tuo immobile
                per un periodo di tempo stabilito.
            </p>
            <p className="text-gray-700 leading-relaxed">
                Questo significa che saremo l'unica agenzia a promuovere e gestire la vendita della
                tua proprietà, garantendoti massima attenzione, strategia dedicata e risultati più
                rapidi.
            </p>
        </Card>
    );
}

