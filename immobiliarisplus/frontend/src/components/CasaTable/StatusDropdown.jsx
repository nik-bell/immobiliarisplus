import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../store/AuthContext";
import Badge from "./Badge";
import StatusChip from "./StatusChip";
import { updateValuationDashboard } from "../../api/api";
import { mapValuationStatusLabel, ALL_STATUS_ENUMS, mapUIStatusToEnum, mapListItem, mapStatus } from "../../utils/mappers";
import { useCasa } from "../../store/CasaContext";

export default function StatusDropdown({ casa }) {
  const { userType } = useAuth();
  const { setAllCases, openCasaModal, modalOpen, selectedCasa } = useCasa();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState({});

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

  useEffect(() => {
    function updatePos() {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const top = rect.bottom + window.scrollY;
      const left = rect.left + window.scrollX;
      const width = 280;
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

  const currentUIKey = casa?.status;

  const handleSelect = async (enumValue) => {
    setLoading(true);
    try {
      const serverUpdated = await updateValuationDashboard(casa.id, { status: enumValue });
      if (serverUpdated) {
        const mapped = mapListItem(serverUpdated);
        setAllCases((prev) => prev.map((x) => (x.id === mapped.id ? mapped : x)));
        setOpen(false);
        // Only refresh/open the modal if it's already open for this casa.
        // This prevents changing status from the table from opening the modal.
        if (modalOpen && selectedCasa?.id === casa.id) {
          openCasaModal({ id: casa.id });
        }
      }
    } catch (err) {
      console.error("StatusDropdown: failed to update status", err);
    } finally {
      setLoading(false);
    }
  };

  // non-admin: show plain badge with label
  if (userType !== "admin") {
    return <Badge status={casa.status} label={casa.statusLabel} />;
  }

  const popup = (
    <div ref={popupRef} style={popupStyle} className="bg-white border border-gray-200 rounded shadow-lg p-3">
      <div className="flex gap-2 flex-wrap">
        {ALL_STATUS_ENUMS.map((e) => {
          const label = mapValuationStatusLabel(e);
          const uiKey = mapStatus(e);
          const active = uiKey === currentUIKey;
          return (
            <button
              key={e}
              onClick={(ev) => { ev.stopPropagation(); handleSelect(e); }}
              className="flex-shrink-0"
              disabled={loading}
            >
              <StatusChip statusKey={uiKey} label={label} active={active} />
            </button>
          );
        })}
      </div>
    </div>
  );

  // render button that mimics AgentSelector: shows selected label + chevron
  function getSelectedLabel() {
    return casa.statusLabel || mapValuationStatusLabel(mapUIStatusToEnum(casa.status) || "NOT_ASSIGNED");
  }

  return (
    <div className="relative" ref={buttonRef}>
      <button
        className="w-full text-left flex items-center justify-between gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); setOpen((s) => !s); }}
        title={`Stato: ${getSelectedLabel()}`}
      >
        <div className="flex items-center gap-2">
          <StatusChip statusKey={currentUIKey} label={getSelectedLabel()} />
        </div>
        <span className="text-gray-400">▾</span>
      </button>

      {open && createPortal(popup, document.body)}
    </div>
  );
}
