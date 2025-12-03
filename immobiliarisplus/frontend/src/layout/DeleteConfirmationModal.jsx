export default function DeleteConfirmationModal({ isOpen, onCancel, onConfirm, leadAddress }) {
  /**
   * Do not render anything when the modal is closed.
   * @returns {null|JSX.Element}
   */
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Conferma eliminazione</h3>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-gray-700 mb-2">
            Sei sicuro di voler eliminare questa richiesta?
          </p>
          {leadAddress && (
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 mb-3">
              <span className="font-medium">Indirizzo:</span> {leadAddress}
            </p>
          )}
          <p className="text-sm text-red-600 font-medium">
            ⚠️ Questa operazione è irreversibile
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition"
          >
            Annulla
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Elimina
          </button>
        </div>
      </div>
    </div>
  );
}
