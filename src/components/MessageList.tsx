import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { useConversation } from "../store/conversationStore";

const MessageList: React.FC = () => {
  const { currentConversation } = useConversation();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation?.messages]);

  if (!currentConversation) return null;

  return (
    <div className="msg-list">
      {currentConversation.messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
