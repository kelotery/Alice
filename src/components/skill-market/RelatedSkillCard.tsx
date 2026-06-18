import React from "react";
import type { RelatedSkill } from "../../data/skillMarket";

interface Props {
  skill: RelatedSkill;
}

const RelatedSkillCard: React.FC<Props> = ({ skill }) => (
  <div className="rskill">
    <div className="rskill__icon">{skill.icon}</div>
    <div className="rskill__body">
      <div className="rskill__name">{skill.name}</div>
      <div className="rskill__desc">{skill.description}</div>
      <div className="rskill__meta">{skill.source} · {skill.installs} 次安装</div>
    </div>
  </div>
);

export default RelatedSkillCard;
