import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { AutoTaskScheduleType } from "../../store/autoTaskStore";

const options: { value: AutoTaskScheduleType; label: string }[] = [
  { value: "nonScheduled", label: "非定时" },
  { value: "once", label: "单次" },
  { value: "interval", label: "每间隔" },
  { value: "daily", label: "每天" },
  { value: "weekly", label: "每周" },
];

interface Props { value: AutoTaskScheduleType; onChange: (v: AutoTaskScheduleType) => void; }

const ScheduleTypeDropdown: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const trig = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const label = options.find((o) => o.value === value)?.label || value;

  useEffect(() => {
    function h(e: MouseEvent) { const t = e.target as Node; if (pop.current && !pop.current.contains(t) && trig.current && !trig.current.contains(t)) setOpen(false); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);

  const getPS = (): React.CSSProperties => {
    if (!open || !trig.current) return { display: "none" };
    const r = trig.current.getBoundingClientRect();
    const popH = 220; const top = r.top - popH - 6;
    return { position: "fixed", top: top > 0 ? top : r.bottom + 6, left: r.left, zIndex: 10000 };
  };

  return (<div className="schedule-type-dropdown">
    <button ref={trig} className="at-field-btn" onClick={() => setOpen(!open)}>{label}</button>
    {open && createPortal(<div ref={pop} className="dropdown-menu" style={getPS()}>
      {options.map((o) => (<div key={o.value} className={`dropdown-menu__item${o.value === value ? " dropdown-menu__item--active" : ""}`} onClick={() => { onChange(o.value); setOpen(false); }}>{o.label}</div>))}
    </div>, document.body)}
  </div>);
};

export default ScheduleTypeDropdown;
