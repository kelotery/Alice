import React from "react";
import SkillLibraryCard from "./SkillLibraryCard";
import type { SkillItem } from "../../data/skillMarket";

interface Props {
  skills: SkillItem[];
}

const SkillLibraryGrid: React.FC<Props> = ({ skills }) => (
  <div className="sm-library-grid">
    {skills.map((s) => <SkillLibraryCard key={s.id} skill={s} />)}
  </div>
);

export default SkillLibraryGrid;
