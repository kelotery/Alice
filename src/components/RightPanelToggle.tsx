import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useConversation } from "../store/conversationStore";

const RightPanelToggle: React.FC = () => {
  const { toggleRightPanel } = useConversation();
  return (
    <button className="rp-toggle" onClick={toggleRightPanel} aria-label="展开面板">
      <ChevronLeft size={20} strokeWidth={2} />
    </button>
  );
};

export default RightPanelToggle;
