import React from "react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SidebarSectionItem { id: string; label: string; icon: LucideIcon; expandable?: boolean; }
interface SidebarSectionProps {
  title?: string;
  items: SidebarSectionItem[];
  expandedIds?: Set<string>;
  onToggle?: (id: string) => void;
  renderSubItems?: (id: string) => React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, items, expandedIds, onToggle, renderSubItems }) => (
  <div className="sidebar-section">
    {title && <div className="sidebar-section__title">{title}</div>}
    {items.map((item) => {
      const Icon = item.icon;
      const isExpanded = expandedIds?.has(item.id);
      return (
        <React.Fragment key={item.id}>
          <div className="sidebar-section__item"
            onClick={() => item.expandable && onToggle?.(item.id)}
            role="button" tabIndex={0}
            onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && item.expandable) onToggle?.(item.id); }}>
            <div className="sidebar-section__item-left">
              <span className="sidebar-section__item-icon"><Icon size={19} strokeWidth={2.25} /></span>
              <span>{item.label}</span>
            </div>
            {item.expandable && (
              <span className={`sidebar-section__item-arrow${isExpanded ? " sidebar-section__item-arrow--open" : ""}`}>
                <ChevronDown size={14} strokeWidth={2.5} />
              </span>
            )}
          </div>
          {item.expandable && isExpanded && renderSubItems && (
            <div className="sidebar-section__sub">{renderSubItems(item.id)}</div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default SidebarSection;
