import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { getEmployees, assignEmployeeToDashboard } from "../../api/api";
import { useCasa } from "../../store/CasaContext";

/**
 * Employee object shape.
 * @typedef {Object} Employee
 * @property {string|number} id - Employee identifier.
 * @property {string} [name] - First name.
 * @property {string} [surname] - Last name.
 * @property {string} [email] - Email address.
 */

/**
 * Casa object shape.
 * @typedef {Object} Casa
 * @property {string|number} id - Casa identifier.
 * @property {Employee|string|null} [assignedAgent] - Currently assigned agent (object, label string, or null).
 */

/**
 * AgentSelector
 *
 * Button that opens a small popup allowing selection and assignment of an employee to a casa dashboard.
 *
 * @param {{casa: Casa}} props
 * @param {Casa} props.casa - Casa for which to assign an agent.
 * @returns {JSX.Element}
 */
export default function AgentSelector({ casa }) {
  const { refreshCases } = useCasa();
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState({});

  // Load employees on mount
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const list = await getEmployees();
      if (!mounted) return;
      if (Array.isArray(list)) setEmployees(list);
      setLoading(false);
    }
    load();
    return () => (mounted = false);
  }, []);

  // Close popup on outside click
  useEffect(() => {
    const onDoc = (e) => {
      const t = e.target;
      if (buttonRef.current && buttonRef.current.contains(t)) return;
      if (popupRef.current && popupRef.current.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Update popup position on open and on window resize/scroll
  useEffect(() => {
    function updatePos() {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const top = rect.bottom + window.scrollY;
      const left = rect.left + window.scrollX;
      const width = 256;
      setPopupStyle({ position: "absolute", top: `${top}px`, left: `${left}px`, width: `${width}px`, zIndex: 9999 });
    }
    if (open) {
      updatePos();
      window.addEventListener("resize", updatePos);
      window.addEventListener("scroll", updatePos, true);
      return () => {
        window.removeEventListener("resize", updatePos);
        window.removeEventListener("scroll", updatePos, true);
      };
    }
  }, [open]);

  // Filter employees based on query
  const filtered = employees
    .filter((emp) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        String(emp.name || "").toLowerCase().includes(q) ||
        String(emp.surname || "").toLowerCase().includes(q) ||
        String(emp.email || "").toLowerCase().includes(q)
      );
    })
    .slice(0, 8);

  /**
   * Assign an employee to the casa dashboard.
   *
   * @param {Employee} emp - Employee to assign.
   * @returns {Promise<void>}
   */
  const handleAssign = async (emp) => {
    setLoading(true);
    await assignEmployeeToDashboard(casa.id, emp.id);
    setLoading(false);
    setOpen(false);
    if (typeof refreshCases === "function") await refreshCases();
  };

  // Popup content for selecting an agent
  const popup = (
    <div ref={popupRef} style={popupStyle} className="bg-white border border-gray-200 rounded shadow-lg p-2">
      <input
        className="w-full px-2 py-1 border rounded text-sm mb-2"
        placeholder="Cerca agente..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
      <div className="max-h-48 overflow-auto">
        {loading && <div className="text-sm text-gray-500 p-2">Caricamento...</div>}
        {!loading && filtered.length === 0 && (
          <div className="text-sm text-gray-500 p-2">Nessun risultato</div>
        )}
        {!loading &&
          filtered.map((emp) => (
            <div
              key={emp.id}
              className="px-2 py-2 hover:bg-gray-50 rounded cursor-pointer text-sm flex items-center justify-between"
              onClick={(e) => { e.stopPropagation(); handleAssign(emp); }}
            >
              <div>
                <div className="font-medium">{emp.name} {emp.surname}</div>
                <div className="text-xs text-gray-500">{emp.email}</div>
              </div>
              <div className="text-xs text-gray-400">Assegna</div>
            </div>
          ))}
      </div>
    </div>
  );

  /**
   * Get display label for the assigned agent.
   *
   * Handles three forms: null, string label, or Employee object.
   *
   * @param {null|Employee|string} a - Assigned agent representation.
   * @returns {string|null} Display label or null when none.
   */
  function getAssignedLabel(a) {
    if (!a) return null;
    if (typeof a === "string") return a;
    if (a.name || a.surname) return `${a.name || ""} ${a.surname || ""}`.trim();
    if (a.email) return a.email;
    return String(a);
  }

  return (
    <div className="relative" ref={buttonRef}>
      <button
        className="w-full text-left flex items-center justify-between gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); setOpen((s) => !s); }}
        title={casa.assignedAgent ? `Assegnato a ${getAssignedLabel(casa.assignedAgent)}` : "Assegna agente"}
      >
        <span className="text-sm text-gray-700">{getAssignedLabel(casa.assignedAgent) || "-"}</span>
        <span className="text-gray-400">▾</span>
      </button>

      {open && createPortal(popup, document.body)}
    </div>
  );
}
