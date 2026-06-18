import React, { useRef, useEffect, useState } from "react";
import { Pin, Pencil, Trash2 } from "lucide-react";
import type { Conversation } from "../store/conversationStore";
import { useConversation } from "../store/conversationStore";

interface ConversationItemProps { conversation: Conversation; active: boolean; }

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, active }) => {
  const { selectConversation, pinConversation, renameConversation, deleteConversation } = useConversation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(conversation.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (editing && inputRef.current) { inputRef.current.focus(); inputRef.current.select(); }
  }, [editing]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (editing && inputRef.current && !inputRef.current.contains(e.target as Node)) commitRename();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editing, editTitle]);

  const commitRename = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== conversation.title) renameConversation(conversation.id, trimmed);
    setEditing(false);
    setEditTitle(conversation.title);
  };

  const handleClick = () => { if (!editing) selectConversation(conversation.id); };

  const handleMenuAction = (action: string) => {
    setMenuOpen(false);
    switch (action) {
      case "pin": pinConversation(conversation.id); break;
      case "rename": setEditTitle(conversation.title); setEditing(true); setTimeout(() => inputRef.current?.focus(), 50); break;
      case "delete": if (window.confirm("确认删除该对话？")) deleteConversation(conversation.id); break;
    }
  };

  return (
    <div ref={itemRef} className={`conv-item${active ? " conv-item--active" : ""}`}
      onClick={handleClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") handleClick(); }}>
      <span className="conv-item__dot" />
      {editing ? (
        <input ref={inputRef} className="conv-item__edit-input" value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") { setEditing(false); setEditTitle(conversation.title); } }}
          onBlur={commitRename} onClick={(e) => e.stopPropagation()} />
      ) : (
        <span className="conv-item__title">{conversation.title}</span>
      )}
      {conversation.pinned && !editing && <Pin size={11} className="conv-item__pin-icon" />}
      {(hovered || active || menuOpen) && !editing && (
        <button className="conv-item__more" onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }} aria-label="更多">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="4" cy="8" r="1.5" /><circle cx="8" cy="8" r="1.5" /><circle cx="12" cy="8" r="1.5" />
          </svg>
        </button>
      )}
      {menuOpen && (
        <div ref={menuRef} className="conv-menu" onClick={(e) => e.stopPropagation()}>
          <div className="conv-menu__item" onClick={() => handleMenuAction("pin")}><Pin size={14} /><span>{conversation.pinned ? "取消置顶" : "置顶"}</span></div>
          <div className="conv-menu__item" onClick={() => handleMenuAction("rename")}><Pencil size={14} /><span>重命名</span></div>
          <div className="conv-menu__item conv-menu__item--danger" onClick={() => handleMenuAction("delete")}><Trash2 size={14} /><span>删除</span></div>
        </div>
      )}
    </div>
  );
};

export default ConversationItem;
