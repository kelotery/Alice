import React from "react";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import ChatInputBar from "../components/ChatInputBar";
import WorkPanel from "../components/WorkPanel";
import RightPanelToggle from "../components/RightPanelToggle";
import { useConversation } from "../store/conversationStore";

const ChatPage: React.FC = () => {
  const { state } = useConversation();
  const panelOpen = state.rightPanelOpen;
  return (
    <div className={`chat-page${panelOpen ? " chat-page--panel-open" : " chat-page--panel-closed"}`}>
      <div className="chat-main">
        {!panelOpen && <div className="chat-main__toggle-area"><RightPanelToggle /></div>}
        <ChatHeader />
        <MessageList />
        <ChatInputBar />
      </div>
      {panelOpen && <WorkPanel />}
    </div>
  );
};

export default ChatPage;
