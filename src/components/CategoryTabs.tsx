import React from "react";
import type { RecommendationCategory } from "../data/recommendations";

const categories: RecommendationCategory[] = ["推荐", "办公学习", "电脑设置", "生活日常", "游戏娱乐"];

interface CategoryTabsProps { active: RecommendationCategory | string; onSelect: (cat: RecommendationCategory) => void; }

const CategoryTabs: React.FC<CategoryTabsProps> = ({ active, onSelect }) => (
  <div className="category-tabs">
    {categories.map((cat) => (
      <span key={cat} className={`category-tabs__tab${cat === active ? " category-tabs__tab--active" : ""}`}
        onClick={() => onSelect(cat)} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(cat); }}>
        {cat}
      </span>
    ))}
  </div>
);

export default CategoryTabs;
