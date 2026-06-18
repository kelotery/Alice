import React from "react";
import { ArrowLeft } from "lucide-react";
import type { ExploreSkillPost } from "../../data/skillMarket";
import RelatedSkillCard from "./RelatedSkillCard";

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

interface Props {
  post: ExploreSkillPost;
  onBack: () => void;
}

const SkillDetailPage: React.FC<Props> = ({ post, onBack }) => {
  const theme = POSTER_THEMES[post.coverVariant] || POSTER_THEMES["product"];

  return (
    <div className="sm-detail-grid">
      {/* Left: Media */}
      <div className="sm-detail-media">
        <button className="sm-detail-back" onClick={onBack}><ArrowLeft size={20} strokeWidth={2} /></button>
        <div className="sm-detail-poster" style={{ background: theme.bg }}>
          <div className="sm-detail-poster-decor sm-detail-poster-decor--1" style={{ background: theme.accent }} />
          <div className="sm-detail-poster-decor sm-detail-poster-decor--2" style={{ background: theme.accent }} />
          {theme.tag && <span className="sm-detail-poster-tag">{theme.tag}</span>}
          {post.badge && <span className="sm-detail-poster-badge">{post.badge}</span>}
          <div className="sm-detail-poster-content">
            <div className="sm-detail-poster-icon">{theme.icon}</div>
            <div className="sm-detail-poster-title">{post.title}</div>
            <div className="sm-detail-poster-sub">{theme.sub}</div>
          </div>
        </div>
        <div className="sm-detail-dots">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={`sm-detail-dot${i === 0 ? " sm-detail-dot--active" : ""}`} />
          ))}
        </div>
      </div>

      {/* Right: Content */}
      <div className="sm-detail-content">
        <div className="sm-detail-scroll">
          <h1 className="sm-detail-title">{post.title}</h1>
          <div className="sm-detail-meta">
            <span>{post.authorName}</span>
            <span className="sm-detail-meta-sep">·</span>
            <span>
              {post.category === "office" ? "办公效率" : post.category === "entertainment" ? "休闲娱乐" : post.category === "life" ? "生活服务" : post.category === "content" ? "内容创作" : post.category === "finance" ? "理财投资" : post.category === "research" ? "学术研究" : post.category}
            </span>
          </div>
          <div className="sm-detail-divider" />
          <div className="sm-detail-body">
            {post.detail.split("\n").map((p, i) => p ? <p key={i}>{p}</p> : <br key={i} />)}
          </div>

          <div className="sm-detail-related">
            <div className="sm-detail-related-title">
              {post.badge === "合集" ? "合集内的工具" : post.badge === "榜单" ? "榜单内的工具" : "相关工具"}
              <span className="sm-detail-related-count">（{post.relatedSkills.length}个）</span>
            </div>
            <div className="sm-detail-related-list">
              {post.relatedSkills.map((s) => (
                <RelatedSkillCard key={s.id} skill={s} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom interaction bar */}
        <div className="sm-detail-interact">
          <input className="sm-detail-comment-input" placeholder="快来参与讨论吧" />
          <div className="sm-detail-actions">
            <button className="sm-detail-action-btn">❤ {post.likes}</button>
            <button className="sm-detail-action-btn">💬 {post.comments}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailPage;
