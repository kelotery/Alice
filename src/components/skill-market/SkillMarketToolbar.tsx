import React from "react";
import SkillSearchBox from "./SkillSearchBox";
import SkillSortDropdown from "./SkillSortDropdown";
import type { SkillSortMode } from "../../data/skillMarket";

interface Props {
  showMySkills?: boolean;
  sortMode: SkillSortMode;
  onSortChange: (v: SkillSortMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const SkillMarketToolbar: React.FC<Props> = ({ showMySkills, sortMode, onSortChange, searchQuery, onSearchChange }) => (
  <div className="sm-toolbar">
    <SkillSearchBox value={searchQuery} onChange={onSearchChange} />
    <SkillSortDropdown value={sortMode} onChange={onSortChange} />
    {showMySkills && (
      <button className="sm-pill-btn sm-pill-btn--my" onClick={() => alert("我的技能功能下一阶段接入。")}>
        我的技能
      </button>
    )}
  </div>
);

export default SkillMarketToolbar;
