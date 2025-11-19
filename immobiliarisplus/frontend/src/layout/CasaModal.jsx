import { useCasa } from "../store/CasaContext";
import FeatureIcon from "../components/FeatureIcon"; // opzionale, se lo hai

export default function CasaModal() {
  // prendo modale e casa selezionata dal context
  const { modalOpen, selectedCasa, closeCasaModal } = useCasa();

  // se non è aperta o non ci sono dati, nulla da renderizzare
  if (!modalOpen || !selectedCasa) return null;

  const c = selectedCasa;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[720px] max-h-[85vh] overflow-y-auto rounded-xl p-6 shadow-xl">
        {/* header modale */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Dettagli immobile</h2>
            <p className="text-sm text-gray-500">{c.id}</p>
          </div>
          <div>
            <button
              onClick={closeCasaModal}
              className="text-gray-500 hover:text-gray-700"
            >
              Chiudi
            </button>
          </div>
        </div>

        {/* contenuto modale */}
        <div className="space-y-4 text-sm text-gray-700">
          {/* Indirizzo */}
          <section>
            <h3 className="font-medium">Indirizzo</h3>
            <p>{c.property.address}</p>
          </section>

          {/* Dati immobile */}
          <section>
            <h3 className="font-medium">Dati immobile</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>Tipo: {c.property.propertyType}</div>
              <div>Condizione: {c.property.condition}</div>
              <div>Superficie: {c.property.surfaceM2} m²</div>
              <div>Stanze: {c.details?.rooms ?? "-"}</div>
              <div>Bagni: {c.details?.bathrooms ?? "-"}</div>
              <div>Piano: {c.details?.floor ?? "-"}</div>
            </div>

            {/* features */}
            <div className="mt-2 flex gap-2 flex-wrap">
              {c.details &&
                Object.entries(c.details.features || {}).map(
                  ([k, v]) => v && <FeatureIcon key={k} label={k} />
                )}
            </div>
          </section>

          {/* Dati proprietario */}
          <section>
            <h3 className="font-medium">Proprietario</h3>
            <div>
              {c.contact?.name} {c.contact?.surname}
            </div>
            <div>{c.contact?.email}</div>
            <div>{c.contact?.phone}</div>
          </section>

          {/* Gestione / Stato */}
          <section>
            <h3 className="font-medium">Gestione</h3>
            <div>Agente: {c.assignedAgent || "Non assegnato"}</div>
            <div>Valutazione stimata: {c.valuationRange}</div>
            <div>Valutazione finale: {c.valuationFinal || "—"}</div>
            <div>Stato: {c.status}</div>
            <div>Documenti caricati: {c.documents?.length || 0}</div>
          </section>
        </div>

        {/* azioni */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={closeCasaModal}
            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Chiudi
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Salva modifiche
          </button>
        </div>
      </div>
    </div>
  );
}
