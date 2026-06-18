import React from "react";
import type { SkillItem } from "../../data/skillMarket";

interface Props {
  skill: SkillItem;
}

const SkillLibraryCard: React.FC<Props> = ({ skill }) => (
  <div className="scard">
    <div className="scard__icon">{skill.icon}</div>
    <div className="scard__body">
      <div className="scard__name">{skill.name}</div>
      <div className="scard__desc">{skill.description}</div>
      <div className="scard__meta">
        <span className="scard__source">{skill.source}</span>
        <span className="scard__installs">✦ {skill.installs}</span>
      </div>
    </div>
  </div>
);

export default SkillLibraryCard;
