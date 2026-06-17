import React from "react";
import RecommendationCard from "./RecommendationCard";
import type { RecommendationCategory, Recommendation } from "../data/recommendations";
import { recommendationGroups } from "../data/recommendations";

interface Props {
  category: RecommendationCategory;
  onPick?: (rec: Recommendation) => void;
}

const RecommendationGrid: React.FC<Props> = ({ category, onPick }) => {
  const items = recommendationGroups[category] || recommendationGroups["推荐"];
  return (<div className="recommendation-grid">{items.map((rec)=><RecommendationCard key={rec.id} recommendation={rec} onClick={onPick} />)}</div>);
};

export default RecommendationGrid;
