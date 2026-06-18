import React from "react";
import type { Message } from "../store/conversationStore";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  if (message.role === "user") {
    return (
      <div className="msg-row msg-row--user">
        <div className="msg-bubble msg-bubble--user">{message.content}</div>
      </div>
    );
  }

  return (
    <div className="msg-row msg-row--assistant">
      <div className="msg-avatar">
        <svg width="36" height="36" viewBox="0 0 86 86" fill="none">
          <circle cx="43" cy="43" r="43" fill="#fff" />
          <circle cx="43" cy="43" r="40" fill="#111" />
          <ellipse cx="43" cy="48" rx="22" ry="14" fill="#fff" opacity="0.12" />
          <circle cx="33" cy="39" r="3.5" fill="#fff" />
          <circle cx="53" cy="39" r="3.5" fill="#fff" />
          <path d="M38 46 Q43 51 48 46" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="43" cy="60" r="9" fill="#d32f2f" />
        </svg>
      </div>
      <div>
        <div className="msg-sender">Marvis</div>
        <div className="msg-bubble msg-bubble--assistant">{message.content}</div>
        <div className="msg-actions">
          <button className="msg-action-btn" title="复制">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          </button>
          <button className="msg-action-btn" title="点赞">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" /><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
            </svg>
          </button>
          <button className="msg-action-btn" title="点踩">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" /><path d="M17 2h2.67a2 2 0 012 1.7l1.38 9a2 2 0 01-2 2.3H17" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
