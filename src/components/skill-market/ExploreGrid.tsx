import React from "react";
import ExploreCard from "./ExploreCard";
import type { ExploreSkillPost } from "../../data/skillMarket";

interface Props {
  posts: ExploreSkillPost[];
  onSelect: (p: ExploreSkillPost) => void;
}

const ExploreGrid: React.FC<Props> = ({ posts, onSelect }) => (
  <div className="sm-explore-grid">
    {posts.map((p) => <ExploreCard key={p.id} post={p} onClick={onSelect} />)}
  </div>
);

export default ExploreGrid;
