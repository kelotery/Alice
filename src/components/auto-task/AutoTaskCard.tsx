import React, { useRef, useEffect, useState } from "react";
import type { AutoTask } from "../../store/autoTaskStore";
import { useAutoTask } from "../../store/autoTaskStore";
import { Trash2 } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  running: "进行中",
  nonScheduled: "非定时",
  paused: "已暂停",
  expired: "已过期",
};

function formatDate(dateStr?: string, timeStr?: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length < 3) return dateStr;
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);
  let text = `${month}月${day}日`;
  if (timeStr) text += ` ${timeStr}`;
  return text;
}

interface Props {
  task: AutoTask;
}

const AutoTaskCard: React.FC<Props> = ({ task }) => {
  const { viewAutoTask, deleteAutoTask } = useAutoTask();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="at-card">
      <div className="at-card__top">
        <div className="at-card__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <span className="at-card__name">{task.name}</span>
      </div>
      <div className="at-card__desc">{task.description}</div>
      <div className="at-card__divider" />
      <div className="at-card__bottom">
        <span className={`at-card__status at-card__status--${task.status}`}>
          {STATUS_LABELS[task.status] || task.status}
        </span>
        {task.date && <span className="at-card__datetime">{formatDate(task.date, task.time)}</span>}
        <div className="at-card__spacer" />
        <button className="at-pill-btn at-pill-btn--small" onClick={() => viewAutoTask(task.id)}>查看</button>
        <button className="at-card__more-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="3" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="13" r="1.5"/>
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div ref={menuRef} className="at-card-menu" onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-menu__item dropdown-menu__item--danger" onClick={() => {
            if (window.confirm("确认删除该自动任务？")) deleteAutoTask(task.id);
            setMenuOpen(false);
          }}>
            <Trash2 size={14} /><span>删除</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoTaskCard;
