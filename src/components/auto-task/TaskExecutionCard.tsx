import React from "react";
import { useAutoTask } from "../../store/autoTaskStore";

const TaskExecutionCard: React.FC = () => {
  const { activeTask } = useAutoTask();
  if (!activeTask) return null;

  const STATUS_LABELS: Record<string, string> = {
    running: "进行中", nonScheduled: "非定时", paused: "已暂停", expired: "已过期",
  };

  return (
    <div className="tec-card">
      <div className="tec-card__top">
        <div className="tec-card__info">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span className="tec-card__name">{activeTask.name}</span>
          <span className={`at-card__status at-card__status--${activeTask.status}`}>
            {STATUS_LABELS[activeTask.status] || activeTask.status}
          </span>
          {activeTask.date && (
            <span className="tec-card__datetime">{activeTask.date} {activeTask.time || ""}</span>
          )}
        </div>
      </div>
      <div className="tec-card__desc">{activeTask.description}</div>
      <div className="tec-card__actions">
        <button className="at-pill-btn at-pill-btn--small" onClick={() => alert("编辑任务功能下一阶段接入。")}>编辑任务</button>
        <button className="at-pill-btn at-pill-btn--small" onClick={() => alert("立即执行功能已触发，当前为前端 mock。")}>立即执行</button>
        <button className="at-card__more-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskExecutionCard;
