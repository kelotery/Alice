import React, { useState } from "react";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (q: string) => void;
}

const SkillSearchBox: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button className="sm-pill-btn sm-pill-btn--icon" onClick={() => setOpen(true)}>
        <Search size={17} strokeWidth={2.25} />
      </button>
    );
  }

  return (
    <div className="sm-search-box">
      <Search size={17} strokeWidth={2.25} className="sm-search-box__icon" />
      <input className="sm-search-box__input" placeholder="搜索技能" value={value}
        onChange={(e) => onChange(e.target.value)} autoFocus
        onKeyDown={(e) => { if (e.key === "Escape") { onChange(""); setOpen(false); } }}
        onBlur={() => { if (!value) setOpen(false); }} />
    </div>
  );
};

export default SkillSearchBox;
