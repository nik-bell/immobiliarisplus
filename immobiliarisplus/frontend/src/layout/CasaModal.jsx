import { useState, useEffect } from "react";
import { useCasa } from "../store/CasaContext";
import { useAuth } from "../store/AuthContext";
import FeatureIcon from "../components/FeatureIcon";

export default function CasaModal() {
  const { modalOpen, selectedCasa, closeCasaModal, setAllCases, openCasaModal } = useCasa();

  const { userType } = useAuth();

  if (!modalOpen || !selectedCasa) return null;

  const c = selectedCasa;

  // draft per edit inline
  const [draft, setDraft] = useState(c);

  // editing flags per section
  const [editing, setEditing] = useState({ info: false, contact: false, agent: false, notes: false });

  useEffect(() => {
    setDraft(selectedCasa);
    setEditing({ info: false, contact: false, agent: false, notes: false });
  }, [selectedCasa]);

  // view: 'details' (default) or 'documents'
  const [view, setView] = useState("details");
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [newDocName, setNewDocName] = useState("");

  const updateDraftProperty = (key, value) => {
    setDraft((d) => ({ ...d, property: { ...d.property, [key]: value } }));
  };

  const updateDraftContact = (key, value) => {
    setDraft((d) => ({ ...d, contact: { ...d.contact, [key]: value } }));
  };

  const updateDraftRoot = (key, value) => {
    setDraft((d) => ({ ...d, [key]: value }));
  };

  const saveSection = (section) => {
    const updated = { ...draft };
    setAllCases((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    // update selectedCasa in context so modal shows saved values
    openCasaModal(updated);
    setEditing((e) => ({ ...e, [section]: false }));
  };

  const cancelSection = (section) => {
    setDraft(selectedCasa);
    setEditing((e) => ({ ...e, [section]: false }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-gray-800">Dettagli lead</h2>
              {userType === "admin" && (
                <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded">Admin</span>
              )}
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <span className="i-lucide-map-pin" />
              <span className="truncate max-w-[36rem]">{c.property.address}</span>
            </p>
          </div>

          <button
            onClick={closeCasaModal}
            aria-label="Chiudi"
            className="p-2 rounded-lg hover:bg-gray-200 text-gray-600 transition"
          >
            <span className="text-lg">✕</span>
          </button>
        </div>

        {/* Top actions removed — assign button moved to footer */}

        {/* Main content */}
          <div className="px-8 py-4 space-y-4 text-sm text-gray-700">
            {/* Menu toggle: Dettagli / Documenti */}
            <div className="flex items-center justify-start gap-3">
              <div className="inline-flex rounded-md bg-gray-100 p-1">
                <button
                  onClick={() => setView("details")}
                  className={`px-3 py-1 rounded text-sm ${view === "details" ? "bg-white shadow" : "text-gray-600"}`}
                >
                  Dettagli
                </button>
                <button
                  onClick={() => setView("documents")}
                  className={`px-3 py-1 rounded text-sm ${view === "documents" ? "bg-white shadow" : "text-gray-600"}`}
                >
                  Documenti
                </button>
              </div>
            </div>
            {view === "documents" ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Documenti</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setView("details")}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Torna ai dettagli
                    </button>
                    <button
                      onClick={() => setShowAddDoc(true)}
                      className="px-3 py-1 bg-emerald-600 text-white rounded text-sm"
                    >
                      Aggiungi documento
                    </button>
                  </div>
                </div>

                {(!draft.documents || draft.documents.length === 0) && !showAddDoc && (
                  <div className="text-gray-600">Nessun documento presente al momento.</div>
                )}

                {draft.documents && draft.documents.length > 0 && (
                  <ul className="space-y-2">
                    {draft.documents.map((doc) => (
                      <li key={doc.id} className="flex items-center justify-between bg-white p-3 rounded shadow-sm border">
                        <div className="text-sm text-gray-800">{doc.name}</div>
                        <div className="flex items-center gap-2">
                          <a href={doc.url || '#'} className="text-emerald-600 text-sm hover:underline">Apri</a>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {showAddDoc && (
                  <div className="mt-3 bg-white p-4 rounded shadow-sm border">
                    <label className="text-xs text-gray-500">Nome documento</label>
                    <input value={newDocName} onChange={(e) => setNewDocName(e.target.value)} className="w-full border rounded px-3 py-2 mt-1 text-sm" />
                    <div className="mt-3 flex gap-2">
                      <button
                        className="px-3 py-1 bg-emerald-600 text-white rounded text-sm"
                        onClick={() => {
                          if (!newDocName) return;
                          const newDoc = { id: Date.now().toString(), name: newDocName };
                          const updated = { ...draft, documents: [...(draft.documents || []), newDoc] };
                          setAllCases((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
                          openCasaModal(updated);
                          setDraft(updated);
                          setNewDocName("");
                          setShowAddDoc(false);
                        }}
                      >
                        Aggiungi
                      </button>
                      <button className="px-3 py-1 border rounded text-sm" onClick={() => setShowAddDoc(false)}>Annulla</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 flex flex-col gap-6">
                {/* Informazioni immobile */}
                <section className="bg-white p-5 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Informazioni immobile</h3>
                    <button
                      className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700"
                      onClick={() => setEditing((e) => ({ ...e, info: !e.info }))}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                      <span>Modifica</span>
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 text-gray-700">
                    {editing.info ? (
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-gray-500">Superficie (m²)</label>
                        <input className="border rounded px-3 py-2 text-sm" type="number" value={draft.property.surfaceM2 ?? ''} onChange={(e) => updateDraftProperty('surfaceM2', Number(e.target.value))} />
                        <label className="text-xs text-gray-500">Valutazione AVM</label>
                        <input className="border rounded px-3 py-2 text-sm" type="text" value={draft.valuationRange ?? ''} onChange={(e) => updateDraftRoot('valuationRange', e.target.value)} />
                        <label className="text-xs text-gray-500">Tipologia</label>
                        <input className="border rounded px-3 py-2 text-sm" type="text" value={draft.property.propertyType ?? ''} onChange={(e) => updateDraftProperty('propertyType', e.target.value)} />
                        <label className="text-xs text-gray-500">Stato</label>
                        <input className="border rounded px-3 py-2 text-sm" type="text" value={draft.property.condition ?? ''} onChange={(e) => updateDraftProperty('condition', e.target.value)} />

                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1 bg-emerald-600 text-white rounded text-sm" onClick={() => saveSection('info')}>Conferma</button>
                          <button className="px-3 py-1 border rounded text-sm" onClick={() => cancelSection('info')}>Annulla</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div><span className="font-medium">Superficie:</span> {draft.property.surfaceM2} m²</div>
                        <div><span className="font-medium">Valutazione AVM:</span> {draft.valuationRange}</div>
                        <div><span className="font-medium">Tipologia:</span> {draft.property.propertyType}</div>
                        <div><span className="font-medium">Stato:</span> {draft.property.condition}</div>
                      </>
                    )}
                  </div>
                </section>

                {/* Contatto proprietario */}
                <section className="bg-white p-5 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Contatto proprietario</h3>
                    <button className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700" onClick={() => setEditing((e) => ({ ...e, contact: !e.contact }))}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                      <span>Modifica</span>
                    </button>
                  </div>

                  <div className="space-y-1 text-gray-700">
                    {editing.contact ? (
                      <div className="flex flex-col gap-2">
                        <div>
                          <label className="text-xs text-gray-500">Nome</label>
                          <input className="border rounded px-3 py-2 text-sm w-full" value={draft.contact?.name ?? ''} onChange={(e) => updateDraftContact('name', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Cognome</label>
                          <input className="border rounded px-3 py-2 text-sm w-full" value={draft.contact?.surname ?? ''} onChange={(e) => updateDraftContact('surname', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Email</label>
                          <input className="border rounded px-3 py-2 text-sm w-full" value={draft.contact?.email ?? ''} onChange={(e) => updateDraftContact('email', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Telefono</label>
                          <input className="border rounded px-3 py-2 text-sm w-full" value={draft.contact?.phone ?? ''} onChange={(e) => updateDraftContact('phone', e.target.value)} />
                        </div>

                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1 bg-emerald-600 text-white rounded text-sm" onClick={() => saveSection('contact')}>Conferma</button>
                          <button className="px-3 py-1 border rounded text-sm" onClick={() => cancelSection('contact')}>Annulla</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="font-medium">{draft.contact?.name} {draft.contact?.surname}</div>
                        <div className="text-sm text-gray-600">{draft.contact?.email}</div>
                        <div className="text-sm text-gray-600">{draft.contact?.phone}</div>
                      </>
                    )}
                  </div>
                </section>

                <section className="bg-white p-5 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Altri dettagli</h3>
                      <button className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700" onClick={() => setEditing((e) => ({ ...e, agent: !e.agent }))}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                        <span>Modifica</span>
                      </button>
                    </div>

                    <div className="text-gray-700">
                      {editing.agent ? (
                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-gray-500">Assegnato ad</label>
                          <input className="border rounded px-3 py-2 text-sm" value={draft.assignedAgent ?? ''} onChange={(e) => updateDraftRoot('assignedAgent', e.target.value)} />
                          <label className="text-xs text-gray-500">Valutazione finale</label>
                          <input className="border rounded px-3 py-2 text-sm" value={draft.valuationFinal ?? ''} onChange={(e) => updateDraftRoot('valuationFinal', e.target.value)} />

                          <div className="mt-3 flex gap-2">
                            <button className="px-3 py-1 bg-emerald-600 text-white rounded text-sm" onClick={() => saveSection('agent')}>Conferma</button>
                            <button className="px-3 py-1 border rounded text-sm" onClick={() => cancelSection('agent')}>Annulla</button>
                          </div>
                        </div>
                      ) : (
                        <>{draft.extraInfo || "Nessun dettaglio aggiuntivo."}</>
                      )}
                    </div>
                </section>
              </div>

              {/* Right column: note */}
              <aside className="md:col-span-1">
                <section className="bg-white p-5 rounded-xl shadow-sm sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Note</h3>
                    <button className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700" onClick={() => setEditing((e) => ({ ...e, notes: !e.notes }))}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                      <span>Modifica</span>
                    </button>
                  </div>

                  <div className="text-sm text-gray-600">
                    {editing.notes ? (
                      <div className="flex flex-col gap-2">
                        <textarea className="border rounded px-3 py-2 text-sm min-h-[120px]" value={draft.notes ?? ''} onChange={(e) => updateDraftRoot('notes', e.target.value)} />
                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1 bg-emerald-600 text-white rounded text-sm" onClick={() => saveSection('notes')}>Conferma</button>
                          <button className="px-3 py-1 border rounded text-sm" onClick={() => cancelSection('notes')}>Annulla</button>
                        </div>
                      </div>
                    ) : (
                      <>{draft.notes || "Nessuna nota disponibile."}</>
                    )}
                  </div>
                </section>
              </aside>
            </div>
          )}
          </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-3xl flex justify-end items-center gap-3">
          {userType === "admin" && (
            <button
              className="px-4 py-2 bg-emerald-600 text-white rounded-md font-medium shadow-sm hover:bg-emerald-700 transition text-sm"
            >
              Cambia agente assegnato
            </button>
          )}

          <button
            onClick={closeCasaModal}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
