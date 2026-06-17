import React from "react";
import { ConversationProvider, useConversation } from "./store/conversationStore";
import { AutoTaskProvider, useAutoTask } from "./store/autoTaskStore";
import AppTitleBar from "./components/AppTitleBar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import AutoTaskPage from "./pages/AutoTaskPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import "./styles/marvis-home.css";
import "./styles/chat-page.css";
import "./styles/auto-task.css";
import "./styles/task-detail.css";

type AppPage2 = "home" | "chat" | "autoTasks" | "taskDetail";

const AppInner: React.FC = () => {
  const { state: convState, goHome } = useConversation();
  const { state: atState, goAutoTasks } = useAutoTask();

  let currentPage: AppPage2 = "home";
  if (atState.activeTaskId) {
    currentPage = "taskDetail";
  } else if (convState.pageMode === "chat") {
    currentPage = "chat";
  } else if (convState.pageMode === "autoTasks") {
    currentPage = "autoTasks";
  } else {
    currentPage = "home";
  }

  return (
    <div className="app">
      <AppTitleBar />
      <div className="app__body">
        <Sidebar onNewChat={goHome} onAutoTask={goAutoTasks} currentPage={currentPage} />
        {currentPage === "home" && <HomePage />}
        {currentPage === "chat" && <ChatPage />}
        {currentPage === "autoTasks" && <AutoTaskPage />}
        {currentPage === "taskDetail" && <TaskDetailPage />}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <ConversationProvider>
    <AutoTaskProvider>
      <AppInner />
    </AutoTaskProvider>
  </ConversationProvider>
);

export default App;
