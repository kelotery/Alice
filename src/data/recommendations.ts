import type { Recommendation } from "../components/RecommendationCard";
export type RecommendationCategory = "推荐" | "办公学习" | "电脑设置" | "生活日常" | "游戏娱乐";

const BLACK_MYTH_PROMPT = "检测本机硬件配置,对比黑神话悟空官方及实测性能数据,评估本机可运行的画质等级与预期帧率。一、硬件检测:获取CPU、GPU、内存、硬盘信息及系统版本。二、配置对比:对比各档需求标注达标情况。三、性能预估:给出各分辨率预估帧率。四、瓶颈分析与优化建议。五、综合评分与结论。";

const r1: Recommendation[] = [
  { id: 11, title: "深京航班特价速查", description: "帮我在飞常准App查询深圳飞北京机票", icon: "✈️", iconBg: "#e8f4fd", prompt: "查询下周六深圳飞北京的机票。按价格排序,标注时间,提供中转方案,按推荐指数排名。" },
  { id: 12, title: "机器人概念核心标的盘点", description: "帮我在同花顺看机器人概念板块", icon: "🤖", iconBg: "#fde8e8", prompt: "查看机器人概念板块行情,列出市值前20个股,标注龙头股和活跃股,输出板块分析报告和风险提示。" },
  { id: 13, title: "白皮书秒变PPT", description: "我需要做一个PPT用于宣讲前沿知识", icon: "📊", iconBg: "#e8fde8", prompt: "阅读材料提炼15-20页PPT大纲,每页含标题和要点,标注视觉建议,输出Markdown格式。" },
  { id: 14, title: "本地发票整理&报销", description: "查找本机最近一个季度的发票文件", icon: "🧾", iconBg: "#fdf5e8", prompt: "扫描发票PDF和图片,提取号码日期金额税额,汇总Excel按日期排序,标注异常发票。" },
  { id: 15, title: "5min速通arXiv论文!", description: "请帮我深度拆解这篇论文", icon: "📄", iconBg: "#f0e8fd", prompt: "用5分钟能读完的方式呈现:核心贡献、研究背景、方法概述、关键实验结果、论文局限。输出Markdown。" },
  { id: 16, title: "不用刷半小时豆瓣", description: "帮我找下口碑好的悬疑电影", icon: "🍿", iconBg: "#fde8f3", prompt: "搜索近2年评分7.5以上的悬疑电影,给出5部推荐,包含片名评分导演推荐理由和观影场景。" },
];

const r2: Recommendation[] = [
  { id: 21, title: "GitHub AI爆款盘点", description: "检索GitHub本周Trending AI项目", icon: "🐙", iconBg: "#e8f4fd", prompt: "筛选Star增长最快的10个AI项目,每个包含项目名Star数功能技术栈,生成Markdown周报。" },
  { id: 22, title: "本地发票整理&报销", description: "查找本机发票文件", icon: "🧾", iconBg: "#fdf5e8", prompt: "扫描发票提取关键字段,汇总Excel按日期排序,标注异常发票。" },
  { id: 23, title: "白皮书秒变PPT", description: "需要做一个PPT", icon: "📊", iconBg: "#e8fde8", prompt: "提炼15-20页PPT大纲,每页含标题要点和视觉建议,输出Markdown。" },
  { id: 24, title: "英语晨读材料", description: "生成英文科技新闻晨读材料", icon: "📰", iconBg: "#f0e8fd", prompt: "从3天新闻中选3-5条,每条含英文标题200词摘要3个生词释义,输出Markdown。" },
  { id: 25, title: "5min速通arXiv论文!", description: "深度拆解论文", icon: "📄", iconBg: "#f0e8fd", prompt: "用5分钟呈现:核心贡献、方法、实验结果、局限。输出Markdown。" },
  { id: 26, title: "PPT一键升级有救了", description: "找到最近编辑的PPT给出优化建议", icon: "💡", iconBg: "#e8fde8", prompt: "分析PPT的内容逻辑和视觉表达,给出具体修改方案和优先级,输出改进清单。" },
];

const r3: Recommendation[] = [
  { id: 31, title: "给电脑来次全面体检", description: "给你的电脑做一次全方位体检", icon: "🩺", iconBg: "#e8f4fd", prompt: "检查磁盘性能安全和电池,生成可视化体检报告,标注各项目健康状态和优化建议。" },
  { id: 32, title: "电脑版屏幕使用时间", description: "建立类似iPhone屏幕使用时间工具", icon: "📱", iconBg: "#fde8f3", prompt: "统计各应用使用时长和时段分布,生成日报和周报,标注需控制的应用。" },
  { id: 33, title: "每天一张治愈系壁纸", description: "搭建自动化桌面壁纸管理方案", icon: "🖼️", iconBg: "#f0e8fd", prompt: "从Unsplash等图源每日获取壁纸并自动设置,记录历史支持回看收藏。" },
  { id: 34, title: "不常用大应用清理", description: "扫描不常用又占地方的大应用", icon: "🧹", iconBg: "#fdf5e8", prompt: "扫描超30天未用且超500MB的应用,标注名称磁盘占用和建议操作。" },
  { id: 35, title: "开启深色模式", description: "启用夜间护眼模式", icon: "🌙", iconBg: "#e8fde8", prompt: "切换深色主题开启暖色温降低亮度,自动检测并切换,建议定时设置。" },
  { id: 36, title: "一键诊断电脑没声音", description: "检查电脑声音问题", icon: "🔊", iconBg: "#fde8e8", prompt: "检查音频服务播放设备音量和驱动,逐项诊断并自动修复。输出诊断结果。" },
];

const r4: Recommendation[] = [
  { id: 41, title: "深京航班特价速查", description: "帮我在飞常准App查询深圳飞北京机票", icon: "✈️", iconBg: "#e8f4fd", prompt: "查询各航空公司实时票价,按价格排序标注时间和余票,提供中转方案。" },
  { id: 42, title: "把回忆做成动态相册", description: "扫描电脑挑出最有故事感的照片", icon: "📸", iconBg: "#fde8f3", prompt: "筛选过去一年20-30张最佳照片,每张配温暖描述文字,输出HTML动态相册。" },
  { id: 43, title: "AI给你的人设画个像", description: "扫描本机文件生成数字分身报告", icon: "🎭", iconBg: "#f0e8fd", prompt: "分析应用文档和图片,生成幽默个人画像包含职业标签兴趣雷达图和生活评分。" },
  { id: 44, title: "机器人概念核心标的盘点", description: "查看机器人概念板块个股", icon: "🤖", iconBg: "#fde8e8", prompt: "查看板块行情列出市值前20个股标注龙头股,输出板块分析报告。" },
  { id: 45, title: "身份证合页打印", description: "将身份证正反面合并为PDF", icon: "🪪", iconBg: "#e8fde8", prompt: "搜索身份证正反面图片,排布在一页A4纸上,输出PDF文件。" },
  { id: 46, title: "整理剪贴板历史", description: "把剪贴板信息汇总到表格", icon: "📋", iconBg: "#fdf5e8", prompt: "从剪贴板提取姓名手机号地址等信息,填入结构化表格,检查完整性。" },
];

const r5: Recommendation[] = [
  { id: 51, title: "不用刷半小时豆瓣", description: "帮我找下口碑好的悬疑电影", icon: "🍿", iconBg: "#fde8f3", prompt: "搜索近2年评分7.5以上的悬疑电影,给出5部推荐含片名评分导演推荐理由。" },
  { id: 52, title: "黑神话悟空 vs 你的设备", description: "检测本机硬件配置对比黑神话悟空", icon: "🐒", iconBg: "#fde8e8", prompt: BLACK_MYTH_PROMPT },
  { id: 53, title: "一键开启勿扰模式", description: "把电脑切换到勿扰模式", icon: "🔕", iconBg: "#e8f4fd", prompt: "关闭所有通知弹窗和声音提醒,设置45分钟专注计时器,计时结束恢复。" },
  { id: 54, title: "今天你的城市音乐是什么", description: "结合天气和音乐偏好推荐歌曲", icon: "🎵", iconBg: "#f0e8fd", prompt: "获取当前城市天气,分析音乐偏好,推荐3首合适歌曲并说明推荐理由。" },
  { id: 55, title: "直播开黑前电脑体检", description: "检查电脑状态满足直播需求", icon: "⚽", iconBg: "#e8fde8", prompt: "检测网络带宽延迟,关闭不必要后台应用,检查浏览器版本,输出就绪报告。" },
  { id: 56, title: "哈哈哈哈哈6更新自动提醒", description: "设置综艺更新自动提醒", icon: "📺", iconBg: "#fdf5e8", prompt: "搜索该综艺播出时间和平台,设置每期播出前30分钟桌面提醒。" },
];

export const recommendationGroups: Record<RecommendationCategory, Recommendation[]> = {
  推荐: r1, 办公学习: r2, 电脑设置: r3, 生活日常: r4, 游戏娱乐: r5,
};

export const recommendations: Recommendation[] = r1;
