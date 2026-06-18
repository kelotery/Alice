import React, { useState } from "react";
import type { SkillMarketTab } from "../data/skillMarket";

interface Props {
  active: SkillMarketTab;
  onChange: (tab: SkillMarketTab) => void;
}

const SkillMarketTabs: React.FC<Props> = ({ active, onChange }) => (
  <div className="sm-tabs">
    <span className={`sm-tabs__tab${active === "explore" ? " sm-tabs__tab--active" : ""}`}
      onClick={() => onChange("explore")}>探索发现</span>
    <span className={`sm-tabs__tab${active === "library" ? " sm-tabs__tab--active" : ""}`}
      onClick={() => onChange("library")}>Skill库</span>
  </div>
);

export default SkillMarketTabs;
