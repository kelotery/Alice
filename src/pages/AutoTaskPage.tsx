import React from "react";
import AutoTaskToolbar from "../components/auto-task/AutoTaskToolbar";
import AutoTaskCard from "../components/auto-task/AutoTaskCard";
import CreateAutoTaskModal from "../components/auto-task/CreateAutoTaskModal";
import { useAutoTask } from "../store/autoTaskStore";

const AutoTaskPage: React.FC = () => {
  const { filteredTasks } = useAutoTask();

  return (
    <main className="main-content">
      <div className="main-content__inner">
        <div className="at-page">
          <h1 className="at-page__title">自动任务</h1>
          <p className="at-page__subtitle">
            请保持电脑开机并运行客户端，否则在关机、休眠或退出客户端时，自动任务无法执行
          </p>
          <AutoTaskToolbar />
          <div className="at-card-list">
            {filteredTasks.map((task) => (
              <AutoTaskCard key={task.id} task={task} />
            ))}
            {filteredTasks.length === 0 && (
              <div className="at-empty">暂无匹配的自动任务</div>
            )}
          </div>
        </div>
      </div>
      <CreateAutoTaskModal />
    </main>
  );
};

export default AutoTaskPage;
