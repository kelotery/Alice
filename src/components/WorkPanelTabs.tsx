import React from "react";
import { useConversation, type WorkPanelTab } from "../store/conversationStore";

const tabs: { key: WorkPanelTab; label: string }[] = [
  { key: "log", label: "工作日志" },
  { key: "outputs", label: "产出物" },
  { key: "preview", label: "预览" },
];

const WorkPanelTabs: React.FC = () => {
  const { state, setWorkPanelTab } = useConversation();
  const active = state.activeWorkPanelTab;

  return (
    <div className="wp-tabs">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={`wp-tabs__tab${active === t.key ? " wp-tabs__tab--active" : ""}`}
          onClick={() => setWorkPanelTab(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default WorkPanelTabs;
