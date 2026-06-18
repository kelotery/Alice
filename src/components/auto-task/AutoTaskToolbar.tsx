import React from "react";
import AutoTaskSearch from "./AutoTaskSearch";
import AutoTaskFilterDropdown from "./AutoTaskFilterDropdown";
import { useAutoTask } from "../../store/autoTaskStore";

const AutoTaskToolbar: React.FC = () => {
  const { openCreateTaskModal } = useAutoTask();

  return (
    <div className="at-toolbar">
      <div className="at-toolbar__left">
        <AutoTaskSearch />
        <AutoTaskFilterDropdown />
      </div>
      <button className="at-pill-btn at-pill-btn--primary" onClick={openCreateTaskModal}>
        <span style={{ fontSize: 18, lineHeight: 1, marginRight: 4 }}>+</span> 新建自动任务
      </button>
    </div>
  );
};

export default AutoTaskToolbar;
