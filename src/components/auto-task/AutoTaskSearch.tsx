import React from "react";
import { Search } from "lucide-react";
import { useAutoTask } from "../../store/autoTaskStore";

const AutoTaskSearch: React.FC = () => {
  const { state, setAutoTaskSearch, toggleAutoTaskSearch } = useAutoTask();

  // Default: always show the search box expanded
  return (
    <div className="at-search-box at-search-box--expanded">
      <Search size={17} strokeWidth={2.25} className="at-search-box__icon" />
      <input className="at-search-box__input" placeholder="搜索任务" value={state.autoTaskSearch}
        onChange={(e) => setAutoTaskSearch(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Escape") setAutoTaskSearch(""); }} />
    </div>
  );
};

export default AutoTaskSearch;
