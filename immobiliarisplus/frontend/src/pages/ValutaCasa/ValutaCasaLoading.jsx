/**
 * @file ValutaCasaLoading.jsx
 * @description Full-screen loading overlay shown while processing the valuation.
 */
export default function ValutaCasaLoading() {
  /**
   * Displays a centered spinner and contextual text.
   * @returns {JSX.Element}
   */
  return (
    <div className="fixed inset-0 bg-white/92 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-700"></div>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-900">Elaborazione della valutazione...</h2>
        <p className="text-gray-600">Stiamo analizzando i dati della tua proprietà.</p>
        <p className="text-gray-500 text-sm mt-4">Questo potrebbe richiedere qualche secondo.</p>
      </div>
    </div>
  );
}
