/**
 * @file CasaTableRow.jsx
 * @description Table row renderer for a single "casa" (property/case). Renders
 *              table cells for address, size, valuation, status, assigned agent
 *              and action controls. Handles row click to open modal and admin
 *              delete flow.
 */

/**
 * Employee shape used in casa objects.
 * @typedef {Object} Employee
 * @property {string|number} id - Employee identifier.
 * @property {string} [name] - First name.
 * @property {string} [surname] - Last name.
 * @property {string} [email] - Email.
 */

/**
 * Casa (case/property) shape.
 * @typedef {Object} Casa
 * @property {string|number} id - Casa identifier.
 * @property {Object} [property] - Property details.
 * @property {string} [property.address] - Property address.
 * @property {number} [property.sizeMq] - Size in square meters.
 * @property {number|string|null} [valuationFinal] - Final valuation or placeholder.
 * @property {string} [status] - Internal status key.
 * @property {string} [statusLabel] - Human readable status label.
 * @property {Employee|string|null} [assignedAgent] - Assigned agent (object, label or null).
 */

/**
 * Props for CasaTableRow.
 * @typedef {Object} CasaTableRowProps
 * @property {Casa} casa - Casa object to render in the row.
 */

/**
 * CasaTableRow
 *
 * Renders a single row for the CasaTable. Shows AgentSelector and delete controls
 * only to admin users. Emits modal open events and handles deletion using API.
 *
 * @param {CasaTableRowProps} props
 * @param {Casa} props.casa - Casa to render.
 * @returns {JSX.Element}
 */
import { useState } from "react";
import { useCasa } from "../../store/CasaContext";
import Badge from "./Badge";
import StatusDropdown from "./StatusDropdown";
import { useAuth } from "../../store/AuthContext";
import AgentSelector from "./AgentSelector";
import DeleteConfirmationModal from "../../layout/DeleteConfirmationModal";
import { deleteValuation } from "../../api/api";

export default function CasaTableRow({ casa }) {
  const { openCasaModal, setAllCases } = useCasa();
  const { userType } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Row click handler: opens modal
  const handleRowClick = () => {
    openCasaModal(casa);
  };

  // Info icon click handler: stops propagation and opens modal
  const handleInfoClick = (e) => {
    e.stopPropagation(); // prevents the click on the button from triggering the entire tr twice
    openCasaModal(casa);
  };

  // Delete button click handler
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!casa?.id) return;
    
    const success = await deleteValuation(casa.id);
    
    if (success) {
      // Remove from local state
      setAllCases((prev) => prev.filter((x) => x.id !== casa.id));
      setShowDeleteConfirm(false);
    } else {
      // Handle error
      setShowDeleteConfirm(false);
      alert('Errore durante l\'eliminazione del record');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const fmtCurrency = (v) => {
    if (v == null || v === "") return null;
    const n = Number(v);
    if (Number.isFinite(n)) return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n);
    return String(v);
  };

  const extractRange = (c) => {
    if (!c) return null;
    // prefer already-computed string
    if (c.valuationRange) return c.valuationRange;
    if (c.valuation_range) return c.valuation_range;
    // nested valuation object
    const v = c.valuation ?? c.valuation_data ?? null;
    if (!v) return null;
    if (typeof v === 'string' && v.trim() !== '') return v;
    if (Array.isArray(v.range)) {
      const a = fmtCurrency(v.range[0]);
      const b = fmtCurrency(v.range[1]);
      if (a && b) return `${a} - ${b}`;
    }
    if (v.range && typeof v.range === 'string') return v.range;
    if (v.min != null && v.max != null) return `${fmtCurrency(v.min)} - ${fmtCurrency(v.max)}`;
    if (v.from != null && v.to != null) return `${fmtCurrency(v.from)} - ${fmtCurrency(v.to)}`;
    // fallback to final if present
    if (v.final != null) return fmtCurrency(v.final);
    return null;
  };

  

  // helper removed: AgentSelector handles label formatting

  return (
    <>
    <tr
      onClick={handleRowClick}
      className="hover:bg-gray-50 cursor-pointer transition"
    >
      {/* Address */}
      <td className="px-4 py-3">{casa.property?.address ?? ''}</td>

      {/* Mq */}
      <td className="px-4 py-3">{casa.property?.sizeMq ?? ''} m²</td>

      {/* Final valuation */}
      <td className="px-4 py-3">{typeof casa.valuationFinal === 'number' ? new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(casa.valuationFinal) : (casa.valuationFinal ?? '-')}</td>

      {/* Status with badge */}
      <td className="px-4 py-3">
        <StatusDropdown casa={casa} />
      </td>

      {/* Assigned agent (visible only to admin) */}
      {userType === "admin" && (
        <td className="px-4 py-3 relative" onClick={(e) => e.stopPropagation()}>
          <AgentSelector casa={casa} />
        </td>
      )}
      {/* Actions: info icon that opens modal */}
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleInfoClick}
            aria-label={`Info ${casa.id}`}
            className="p-1 rounded hover:bg-gray-100"
          >
            {/* simple info icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
          </button>
          {userType === "admin" && (
            <button
              onClick={handleDeleteClick}
              aria-label={`Elimina ${casa.id}`}
              className="p-1 rounded hover:bg-red-50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </td>
    </tr>
    {/* Delete confirmation modal */}
    <DeleteConfirmationModal
      isOpen={showDeleteConfirm}
      onCancel={handleDeleteCancel}
      onConfirm={handleDeleteConfirm}
      leadAddress={casa.property?.address}
    />
    </>
  );
}
