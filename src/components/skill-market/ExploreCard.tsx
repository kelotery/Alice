import React from "react";
import type { ExploreSkillPost } from "../../data/skillMarket";

interface Props {
  post: ExploreSkillPost;
  onClick: (p: ExploreSkillPost) => void;
}

// Mock poster covers — each variant has a different visual theme
const POSTER_THEMES: Record<string, { bg: string; accent: string; icon: string; sub: string; tag?: string }> = {
  product: { bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", accent: "rgba(255,255,255,0.15)", icon: "📦", sub: "6 个 skill 全包 · 从拉条到画原型", tag: "产品工作流" },
  ranking: { bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", accent: "rgba(255,255,255,0.15)", icon: "🏆", sub: "社区民间高手都在装的 Skill", tag: "TOP 10" },
  github: { bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", accent: "rgba(255,255,255,0.15)", icon: "⭐", sub: "GitHub 技能雷达 · 6月榜单", tag: "GitHub TOP 10" },
  reading: { bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", accent: "rgba(255,255,255,0.15)", icon: "📚", sub: "一句话让 AI 帮你理书、荐书、导笔记", tag: "微信读书" },
  research: { bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", accent: "rgba(0,0,0,0.06)", icon: "🧠", sub: "6 种思维框架 · AI 深度思考", tag: "思维合集" },
  poster: { bg: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", accent: "rgba(255,255,255,0.15)", icon: "🎨", sub: "输入一句话 · AI 自动排版设计", tag: "AI 设计" },
  invoice: { bg: "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)", accent: "rgba(255,255,255,0.15)", icon: "🧾", sub: "发票识别 · 分类 · 报销单一条龙", tag: "财务工具" },
  office: { bg: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)", accent: "rgba(0,0,0,0.06)", icon: "☕", sub: "邮件 · 会议 · 周报 · 数据全外包", tag: "不加班" },
  aiPersona: { bg: "linear-gradient(135deg, #f5576c 0%, #ff6a88 100%)", accent: "rgba(255,255,255,0.15)", icon: "🤖", sub: "把你的思维风格装进 AI", tag: "AI 分身" },
  health: { bg: "linear-gradient(135deg, #667eea 0%, #5e5ce6 100%)", accent: "rgba(255,255,255,0.15)", icon: "🩺", sub: "拍个照 · AI 帮你划重点", tag: "健康" },
  game: { bg: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)", accent: "rgba(255,255,255,0.15)", icon: "🎮", sub: "自动抓取最新兑换码 · 一秒领取", tag: "游戏福利" },
  finance: { bg: "linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)", accent: "rgba(0,0,0,0.06)", icon: "🌱", sub: "气候分析 · 种植规划 · 收益预估", tag: "种植" },
};

const ExploreCard: React.FC<Props> = ({ post, onClick }) => {
  const theme = POSTER_THEMES[post.coverVariant] || POSTER_THEMES["product"];

  return (
    <div className="ecard" onClick={() => onClick(post)}>
      {/* Poster Cover */}
      <div className="ecard__cover" style={{ background: theme.bg }}>
        {/* Decorative circles */}
        <div className="ecard__cover-decor ecard__cover-decor--1" style={{ background: theme.accent }} />
        <div className="ecard__cover-decor ecard__cover-decor--2" style={{ background: theme.accent }} />
        {/* Tag */}
        {theme.tag && <span className="ecard__cover-tag">{theme.tag}</span>}
        {/* Badge */}
        {post.badge && <span className="ecard__cover-badge">{post.badge}</span>}
        {/* Content */}
        <div className="ecard__cover-content">
          <div className="ecard__cover-icon">{theme.icon}</div>
          <div className="ecard__cover-title">{post.title}</div>
          <div className="ecard__cover-sub">{theme.sub}</div>
        </div>
      </div>

      {/* Card Body */}
      <div className="ecard__body">
        <div className="ecard__body-title">{post.title}</div>
        <div className="ecard__body-meta">
          <div className="ecard__author">
            <span className="ecard__avatar">{post.authorName[0]}</span>
            <span className="ecard__author-name">{post.authorName}</span>
          </div>
          <div className="ecard__stats">
            <span className="ecard__stat">❤ {post.likes}</span>
            <span className="ecard__stat">💬 {post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
