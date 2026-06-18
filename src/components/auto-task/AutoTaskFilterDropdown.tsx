import React, { useRef, useEffect, useState } from "react";
import type { AutoTaskFilter } from "../../store/autoTaskStore";
import { useAutoTask } from "../../store/autoTaskStore";
import { Check } from "lucide-react";

const filters: { value: AutoTaskFilter; label: string }[] = [
  { value: "all", label: "全部项" },
  { value: "running", label: "进行中" },
  { value: "nonScheduled", label: "非定时" },
  { value: "paused", label: "已暂停" },
  { value: "expired", label: "已过期" },
];

const AutoTaskFilterDropdown: React.FC = () => {
  const { state, setAutoTaskFilter } = useAutoTask();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const label = filters.find((f) => f.value === state.autoTaskFilter)?.label || "全部项";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="at-filter-dropdown" ref={ref}>
      <button className="at-pill-btn at-pill-btn--filter" onClick={() => setOpen(!open)}>
        {label} <span className="at-pill-btn__arrow">▾</span>
      </button>
      {open && (
        <div className="dropdown-menu dropdown-menu--wide">
          {filters.map((f) => (
            <div key={f.value}
              className={`dropdown-menu__item${f.value === state.autoTaskFilter ? " dropdown-menu__item--active" : ""}`}
              onClick={() => { setAutoTaskFilter(f.value); setOpen(false); }}>
              <span>{f.label}</span>
              {f.value === state.autoTaskFilter && <Check size={14} strokeWidth={2.5} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoTaskFilterDropdown;
