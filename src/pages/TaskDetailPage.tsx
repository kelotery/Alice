import React from "react";
import { ArrowLeft } from "lucide-react";
import MessageBubble from "../components/MessageBubble";
import TaskExecutionCard from "../components/auto-task/TaskExecutionCard";
import { useAutoTask } from "../store/autoTaskStore";
import type { Message } from "../store/conversationStore";
import type { AutoTask } from "../store/autoTaskStore";

function buildMessages(task: AutoTask): Message[] {
  const replies: Record<string, string> = {
    expired: "老板，任务还没完成哦，别让待办事项越积越多啦！快去看看还有什么没做的，一件一件搞定它～",
    running: "老板，任务已经安排好了，我会在设定时间提醒你。到点后我会继续推进这个任务～",
    nonScheduled: "老板，这个任务目前是非定时任务，需要你手动触发执行。我随时待命～",
    paused: "老板，这个任务目前已暂停，需要恢复后才会继续执行～",
  };
  return [
    { id: "u1", role: "user", content: task.description || "执行任务", createdAt: task.createdAt },
    { id: "a1", role: "assistant", content: replies[task.status] || "老板好呀，这个任务我已经收到了～", createdAt: Date.now() },
  ];
}

const TaskDetailPage: React.FC = () => {
  const { activeTask, goAutoTasks } = useAutoTask();
  if (!activeTask) {
    return (
      <main className="main-content">
        <div className="main-content__inner"><div className="at-empty">未找到任务</div></div>
      </main>
    );
  }
  const messages = buildMessages(activeTask);
  return (
    <main className="main-content">
      <div className="main-content__inner">
        <div className="td-page">
          <div className="td-header">
            <button className="td-back-btn" onClick={goAutoTasks}><ArrowLeft size={20} strokeWidth={2} /></button>
            <h1 className="td-header__title">{activeTask.name}</h1>
          </div>
          <div className="td-msg-list">
            {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
          </div>
          <div className="td-footer"><TaskExecutionCard /></div>
        </div>
      </div>
    </main>
  );
};

export default TaskDetailPage;
