import React from "react";
import { MessageSquarePlus, Bot, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItemData { id: string; label: string; icon: LucideIcon; }
export const mainNavItems: NavItemData[] = [
  { id: "new-chat", label: "新建对话", icon: MessageSquarePlus },
  { id: "auto-task", label: "自动任务", icon: Bot },
  { id: "skill-market", label: "技能广场", icon: Store },
];

interface NavItemProps { item: NavItemData; active?: boolean; onClick?: () => void; }

const NavItem: React.FC<NavItemProps> = ({ item, active = false, onClick }) => {
  const Icon = item.icon;
  return (
    <div className={`nav-item${active ? " nav-item--active" : ""}`} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); }}>
      <span className="nav-item__icon"><Icon size={19} strokeWidth={2.25} /></span>
      <span>{item.label}</span>
    </div>
  );
};
export default NavItem;
