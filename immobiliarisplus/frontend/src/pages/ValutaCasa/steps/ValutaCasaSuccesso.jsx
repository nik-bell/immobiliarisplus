import useValutaCasaForm from "../useValutaCasaForm";
import CardContattiValutaCasa from "../../../sections/CardContattiValutaCasa";
import CosaSuccedeValutazione from "../../../sections/CosaSuccedeValutazione";
import MailInArrivo from "../../../sections/MailInArrivo";
import CtaValutazioneSuccesso from "../../../sections/CtaValutazioneSuccesso";
import ScrollToTop from "../../../components/ScrollToTop";

export default function ValutaCasaSuccesso() {
    const { state } = useValutaCasaForm();

    const submitMessage = state.submitMessage || "La tua richiesta è stata inviata con successo.";

    return (
        <div className="max-w-6xl mx-auto mb-8  p-8 text-center">
            <ScrollToTop />
            <svg
                className="w-16 h-16 text-teal-500 mx-auto my-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>

            <h2 className="text-3xl font-semibold pb-4 text-indigo-900">Richiesta ricevuta con successo!</h2>
            <p className="pb-6 text-xl text-gray-700 font-medium">
                {submitMessage}
            </p>

            <p className="mt-4 text-gray-600">
                Presto riceverai una conferma via email all'indirizzo che ci hai fornito. Controlla la tua posta elettronica per la valutazione dettagliata.
            </p>

            <CardContattiValutaCasa />
            <CosaSuccedeValutazione />
            <MailInArrivo />
            <CtaValutazioneSuccesso />
        </div>
    );
}