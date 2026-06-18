import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface Recommendation {
  id: number;
  title: string;
  description: string;
  prompt: string;
  icon: string;
  iconBg: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onClick?: (rec: Recommendation) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, onClick }) => (
  <div className="recommendation-card" onClick={() => onClick?.(recommendation)}>
    <div className="recommendation-card__header">
      <div className="recommendation-card__icon" style={{ background: recommendation.iconBg }}>{recommendation.icon}</div>
    </div>
    <div className="recommendation-card__title">{recommendation.title}</div>
    <div className="recommendation-card__desc">{recommendation.description}</div>
    <div className="recommendation-card__arrow"><ArrowUpRight size={16} strokeWidth={2} /></div>
  </div>
);

export default RecommendationCard;
