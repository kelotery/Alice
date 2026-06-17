import React from "react";
import { ChevronRight, ChevronLeft, Workflow, FileOutput, Eye } from "lucide-react";
import WorkPanelTabs from "./WorkPanelTabs";
import { useConversation } from "../store/conversationStore";

const WorkPanel: React.FC = () => {
  const { state, toggleRightPanel } = useConversation();
  const { activeWorkPanelTab, currentConversation } = state;

  return (
    <div className="work-panel">
      <div className="work-panel__header">
        <button className="work-panel__collapse-btn" onClick={toggleRightPanel} aria-label="折叠面板">
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
        <WorkPanelTabs />
      </div>

      <div className="work-panel__body">
        {activeWorkPanelTab === "log" && <WorkLogPanel />}
        {activeWorkPanelTab === "outputs" && <EmptyPanel icon={<FileOutput size={28} />} text="暂无产出物" />}
        {activeWorkPanelTab === "preview" && <EmptyPanel icon={<Eye size={28} />} text="未选择要预览的文件" />}
      </div>
    </div>
  );
};

// === Sub-panels ===

const WorkLogPanel: React.FC = () => (
  <div className="wp-log">
    {/* Workstation mock area */}
    <div className="wp-log__station">
      <div className="wp-log__desk-card wp-log__desk-card--active">
        <div className="wp-log__desk-avatar">
          <svg width="32" height="32" viewBox="0 0 86 86" fill="none">
            <circle cx="43" cy="43" r="43" fill="#fff" />
            <circle cx="43" cy="43" r="40" fill="#111" />
            <circle cx="33" cy="39" r="3.5" fill="#fff" />
            <circle cx="53" cy="39" r="3.5" fill="#fff" />
            <path d="M38 46 Q43 51 48 46" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="43" cy="59" r="8" fill="#d32f2f" />
          </svg>
        </div>
        <span className="wp-log__desk-name">Marvis</span>
      </div>
      <div className="wp-log__desk-card wp-log__desk-card--dim" />
      <div className="wp-log__desk-card wp-log__desk-card--dim" />
    </div>

    {/* Status */}
    <div className="wp-log__status">
      <div className="wp-log__status-row">
        <span className="wp-log__label">状态</span>
        <span className="wp-log__value wp-log__value--idle">空闲中</span>
      </div>
      <div className="wp-log__status-row">
        <span className="wp-log__label">消耗</span>
        <span className="wp-log__value">5K 会话 Token</span>
      </div>
    </div>

    {/* Timeline */}
    <div className="wp-log__timeline">
      <div className="wp-log__tl-header">Marvis</div>
      <div className="wp-log__tl-item">
        <div className="wp-log__tl-dot" />
        <span>已完成任务</span>
      </div>
    </div>
  </div>
);

const EmptyPanel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="wp-empty">
    <div className="wp-empty__icon">{icon}</div>
    <div className="wp-empty__text">{text}</div>
  </div>
);

export default WorkPanel;
