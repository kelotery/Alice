import React, { useRef, useEffect, useState } from "react";
import type { SkillSortMode } from "../../data/skillMarket";

interface Props {
  value: SkillSortMode;
  onChange: (v: SkillSortMode) => void;
}

const opts: { value: SkillSortMode; label: string }[] = [
  { value: "hot", label: "最热" },
  { value: "latest", label: "最新" },
];

const SkillSortDropdown: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const label = opts.find((o) => o.value === value)?.label || "最热";

  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="sm-sort-dropdown" ref={ref}>
      <button className="sm-pill-btn" onClick={() => setOpen(!open)}>{label} ▾</button>
      {open && (
        <div className="sm-dropdown-menu">
          {opts.map((o) => (
            <div key={o.value} className={`sm-dropdown-item${o.value === value ? " sm-dropdown-item--active" : ""}`}
              onClick={() => { onChange(o.value); setOpen(false); }}>
              {o.label} {o.value === value && "✓"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillSortDropdown;
