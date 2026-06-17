import React, { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { useConversation } from "../store/conversationStore";

const ChatInputBar: React.FC = () => {
  const { sendMessage, currentConversation } = useConversation();
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasContent = input.trim().length > 0;

  const handleSend = () => {
    if (!hasContent || !currentConversation) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="chat-input-bar">
      <textarea
        className="chat-input-bar__textarea"
        placeholder="请输入任务，交给我来帮你完成"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        rows={2}
      />
      <div className="chat-input-bar__bottom">
        <button className="task-input-card__file-btn" onClick={() => fileInputRef.current?.click()}>
          <Plus size={17} strokeWidth={2.25} /><span>选择文件</span>
        </button>
        <input ref={fileInputRef} type="file" style={{ display: "none" }} />
        <button
          className={`task-input-card__send-btn${hasContent ? " task-input-card__send-btn--active" : ""}`}
          onClick={handleSend}
          disabled={!hasContent}
          aria-label="发送"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInputBar;
