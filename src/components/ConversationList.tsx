import React from "react";
import { MessageSquare } from "lucide-react";
import ConversationItem from "./ConversationItem";
import { useConversation } from "../store/conversationStore";

const ConversationList: React.FC = () => {
  const { state } = useConversation();
  const { conversations, currentConversationId } = state;
  const sorted = [...conversations].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.updatedAt - a.updatedAt;
  });
  const officeConvs = sorted.filter((c) => c.group === "办公室");

  return (
    <div className="sidebar-section">
      <div className="sidebar-section__title">对话</div>
      <div className="sidebar-section__item" style={{ cursor: "default" }}>
        <div className="sidebar-section__item-left">
          <span className="sidebar-section__item-icon"><MessageSquare size={19} strokeWidth={2.25} /></span>
          <span>办公室</span>
        </div>
      </div>
      <div className="conv-list">
        {officeConvs.map((conv) => (
          <ConversationItem key={conv.id} conversation={conv} active={conv.id === currentConversationId} />
        ))}
        {officeConvs.length === 0 && <div className="conv-list__empty">暂无历史对话</div>}
      </div>
    </div>
  );
};

export default ConversationList;
