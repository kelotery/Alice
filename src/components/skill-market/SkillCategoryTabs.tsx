import React from "react";

interface Props {
  items: { value: string; label: string; emoji?: string }[];
  active: string;
  onChange: (v: string) => void;
}

const SkillCategoryTabs: React.FC<Props> = ({ items, active, onChange }) => (
  <div className="sm-cat-tabs">
    {items.map((c) => (
      <button key={c.value} className={`sm-cat-tab${active === c.value ? " sm-cat-tab--active" : ""}`}
        onClick={() => onChange(c.value)}>
        {c.emoji && <span className="sm-cat-tab__emoji">{c.emoji}</span>}
        {c.label}
      </button>
    ))}
  </div>
);

export default SkillCategoryTabs;
