import React, { useState, useCallback } from "react";
import { Search, Bell } from "lucide-react";
import { FolderOpen, FileText, Image, Monitor } from "lucide-react";
import NavItem, { mainNavItems } from "./NavItem";
import SidebarSection, { type SidebarSectionItem } from "./SidebarSection";
import ConversationList from "./ConversationList";
import { useConversation } from "../store/conversationStore";

const knowledgeItems: SidebarSectionItem[] = [
  { id: "apps", label: "应用", icon: FolderOpen },
  { id: "docs", label: "文档", icon: FileText, expandable: true },
  { id: "gallery", label: "图库", icon: Image, expandable: true },
  { id: "this-pc", label: "此电脑", icon: Monitor, expandable: true },
];

interface SidebarProps { onNewChat?: () => void; onAutoTask?: () => void; currentPage?: string; }

function getActiveNav(cp: string): string {
  if (cp === "taskDetail" || cp === "autoTasks") return "auto-task";
  if (cp === "chat") return "";
  return "new-chat";
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage = "home" }) => {
  const { goHome, goAutoTasks } = useConversation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState(getActiveNav(currentPage));
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  React.useEffect(() => { setActiveNav(getActiveNav(currentPage)); }, [currentPage]);

  const handleToggle = useCallback((id: string) => {
    setExpandedIds((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  }, []);

  const renderSubItems = useCallback((id: string) => {
    const m: Record<string, string[]> = { docs: ["报告.pdf","方案.docx","笔记.txt"], gallery: ["照片","截屏","设计稿"], "this-pc": ["桌面","下载","文档"] };
    return (m[id]||[]).map((s)=><div key={s} className="sidebar-section__sub-item">{s}</div>);
  }, []);

  return (
    <aside className="sidebar">
      <div className="logo">Marvis</div>
      <div className="search-box">
        <span className="search-box__icon"><Search size={17} strokeWidth={2.5} /></span>
        <input type="text" className="search-box__input" placeholder="搜索" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
      </div>
      <nav className="main-nav">
        {mainNavItems.map((item)=>(
          <NavItem key={item.id} item={item} active={activeNav===item.id}
            onClick={()=>{
              if (item.id==="new-chat") goHome();
              if (item.id==="auto-task") goAutoTasks();
            }} />
        ))}
      </nav>
      <SidebarSection title="本地知识库" items={knowledgeItems} expandedIds={expandedIds} onToggle={handleToggle} renderSubItems={renderSubItems} />
      <ConversationList />
      <div className="user-bar">
        <div className="user-bar__left">
          <div className="user-bar__avatar">
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#d0d0d0"/><circle cx="16" cy="12" r="6" fill="#999"/><ellipse cx="16" cy="28" rx="10" ry="7" fill="#999"/></svg>
          </div>
          <span className="user-bar__name">有珠子</span>
        </div>
        <span className="user-bar__bell"><Bell size={18} strokeWidth={2.5} /></span>
      </div>
    </aside>
  );
};

export default Sidebar;
