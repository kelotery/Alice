import React, { useRef } from "react";
import AssistantHeader from "../components/AssistantHeader";
import CategoryTabs from "../components/CategoryTabs";
import RecommendationGrid from "../components/RecommendationGrid";
import { useConversation } from "../store/conversationStore";
import type { RecommendationCategory, Recommendation } from "../data/recommendations";

const HomePage: React.FC = () => {
  const { createConversation } = useConversation();
  const [taskInput, setTaskInput] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<RecommendationCategory>("推荐");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) return;
    setTaskInput("");
    createConversation(trimmed);
  };

  const handlePickRecommendation = (rec: Recommendation) => {
    setTaskInput(rec.prompt);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  return (
    <main className="main-content">
      <div className="main-content__inner">
        <AssistantHeader />
        <div className="task-input-card">
          <textarea ref={textareaRef} className="task-input-card__textarea" placeholder="请输入任务，交给我来帮你完成" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} rows={3} />
          <div className="task-input-card__bottom">
            <div className="task-input-card__file-area">
              <button className="task-input-card__file-btn"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg><span>选择文件</span></button>
            </div>
            <button className={`task-input-card__send-btn${taskInput.trim().length > 0 ? " task-input-card__send-btn--active" : ""}`} onClick={handleSend} disabled={!taskInput.trim()} aria-label="发送">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
            </button>
          </div>
        </div>
        <CategoryTabs active={activeCategory} onSelect={setActiveCategory} />
        <RecommendationGrid category={activeCategory} onPick={handlePickRecommendation} />
      </div>
    </main>
  );
};

export default HomePage;
