import React, { useState, useRef } from "react";
import { Plus, ArrowUp, X } from "lucide-react";

const TaskInputCard: React.FC = () => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasContent = input.trim().length > 0;

  const handleSend = () => { if (!hasContent) return; setInput(""); setSelectedFile(null); };
  const handleFileClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (file) setSelectedFile(file.name); e.target.value = "";
  };
  const handleRemoveFile = () => setSelectedFile(null);
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <div className="task-input-card">
      <textarea className="task-input-card__textarea" placeholder="请输入任务，交给我来帮你完成"
        value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} rows={3} />
      <div className="task-input-card__bottom">
        <div className="task-input-card__file-area">
          <button className="task-input-card__file-btn" onClick={handleFileClick}>
            <Plus size={17} strokeWidth={2.25} /><span>选择文件</span>
          </button>
          <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />
          {selectedFile && (
            <span className="task-input-card__file-name">
              {selectedFile}
              <span className="task-input-card__file-remove" onClick={handleRemoveFile}><X size={14} strokeWidth={2} /></span>
            </span>
          )}
        </div>
        <button className={`task-input-card__send-btn${hasContent ? " task-input-card__send-btn--active" : ""}`}
          onClick={handleSend} disabled={!hasContent} aria-label="发送">
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default TaskInputCard;
