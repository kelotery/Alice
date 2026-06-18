import React, { useState } from "react";
import SkillMarketTabs from "../components/skill-market/SkillMarketTabs";
import SkillCategoryTabs from "../components/skill-market/SkillCategoryTabs";
import SkillSearchBox from "../components/skill-market/SkillSearchBox";
import SkillSortDropdown from "../components/skill-market/SkillSortDropdown";
import ExploreGrid from "../components/skill-market/ExploreGrid";
import SkillLibraryGrid from "../components/skill-market/SkillLibraryGrid";
import SkillDetailPage from "../components/skill-market/SkillDetailPage";
import SkillEmptyState from "../components/skill-market/SkillEmptyState";
import type {
  SkillMarketTab, ExploreCategory, SkillLibraryCategory, SkillSortMode, ExploreSkillPost,
} from "../data/skillMarket";
import { explorePosts, skillItems, exploreCategories, libraryCategories } from "../data/skillMarket";

const SkillMarketPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SkillMarketTab>("explore");
  const [exploreCat, setExploreCat] = useState<ExploreCategory>("all");
  const [libraryCat, setLibraryCat] = useState<SkillLibraryCategory>("all");
  const [sortMode, setSortMode] = useState<SkillSortMode>("hot");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<ExploreSkillPost | null>(null);

  const filteredExplore = explorePosts
    .filter((p) => exploreCat === "all" || p.category === exploreCat)
    .filter((p) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.authorName.toLowerCase().includes(q);
    })
    .sort((a, b) => sortMode === "hot" ? b.sortScore - a.sortScore : b.createdAt - a.createdAt);

  const filteredLibrary = skillItems
    .filter((s) => libraryCat === "all" || s.category === libraryCat)
    .filter((s) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.source.toLowerCase().includes(q);
    })
    .sort((a, b) => sortMode === "hot" ? b.sortScore - a.sortScore : b.createdAt - a.createdAt);

  if (selectedPost) {
    return (
      <div className="sm-detail-page">
        <SkillDetailPage post={selectedPost} onBack={() => setSelectedPost(null)} />
      </div>
    );
  }

  const catItems = activeTab === "explore"
    ? exploreCategories.map(c => ({ value: c.value, label: c.label, emoji: c.emoji }))
    : libraryCategories.map(c => ({ value: c.value, label: c.label }));

  return (
    <div className="sm-page">
      {/* Tabs */}
      <SkillMarketTabs active={activeTab} onChange={(t) => { setActiveTab(t); setSearchQuery(""); }} />

      {/* Filter row */}
      <div className="sm-filter-row">
        <SkillCategoryTabs
          items={catItems}
          active={activeTab === "explore" ? exploreCat : libraryCat}
          onChange={(v) => activeTab === "explore" ? setExploreCat(v as ExploreCategory) : setLibraryCat(v as SkillLibraryCategory)}
        />
        <div className="sm-tools">
          <SkillSearchBox value={searchQuery} onChange={setSearchQuery} />
          <SkillSortDropdown value={sortMode} onChange={setSortMode} />
          {activeTab === "library" && (
            <button className="sm-pill-btn sm-pill-btn--my" onClick={() => alert("我的技能功能下一阶段接入。")}>
              我的技能
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="sm-body">
        {activeTab === "explore" && (
          filteredExplore.length > 0
            ? <ExploreGrid posts={filteredExplore} onSelect={setSelectedPost} />
            : <SkillEmptyState />
        )}
        {activeTab === "library" && (
          filteredLibrary.length > 0
            ? <SkillLibraryGrid skills={filteredLibrary} />
            : <SkillEmptyState />
        )}
      </div>
    </div>
  );
};

export default SkillMarketPage;
