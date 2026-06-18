export type ExploreCategory = "all" | "office" | "entertainment" | "life" | "content" | "finance" | "research";
export type SkillLibraryCategory = "all" | "office" | "computer" | "life" | "entertainment";
export type SkillSortMode = "hot" | "latest";

export type RelatedSkill = {
  id: string; name: string; icon: string; description: string;
  source: "GitHub" | "SkillHub" | "ClawHub" | "Claude"; installs: string;
};

export type ExploreSkillPost = {
  id: string; title: string; cover: string; coverVariant: string; category: ExploreCategory;
  authorName: string; likes: number; comments: number; badge?: "合集" | "榜单";
  sortScore: number; createdAt: number; summary: string; detail: string;
  relatedSkills: RelatedSkill[];
};

export type SkillItem = {
  id: string; name: string; icon: string; description: string; category: SkillLibraryCategory;
  source: "GitHub" | "SkillHub" | "ClawHub" | "Claude"; installs: string;
  sortScore: number; createdAt: number;
};

// === Explore Posts (24 total, ~4 per category) ===

const NOW = Date.now();
const D = (d: number) => NOW - 86400000 * d;

export const explorePosts: ExploreSkillPost[] = [
  // office (4)
  { id:"e1",title:"产品经理一站搭子：从拉条到画原型",cover:"gradient-1",coverVariant:"product",category:"office",authorName:"数字游民小李",likes:234,comments:45,badge:"合集",sortScore:980,createdAt:D(2),summary:"6个Skill全包：需求分析、竞品调研、PRD生成、原型设计、数据埋点、版本复盘。",detail:"这套合集包含6个Skill：需求分析助手、竞品调研工具、PRD生成器、原型设计辅助、数据埋点建议、版本复盘模板。全部由社区资深产品经理调校，适合0-3年产品新人。",relatedSkills:[{id:"r1",name:"demand-analyzer",icon:"📋",description:"拆解用户需求，生成结构化文档",source:"ClawHub",installs:"1.2k"},{id:"r2",name:"prd-generator",icon:"📝",description:"根据要点生成PRD文档",source:"ClawHub",installs:"1.5k"},{id:"r3",name:"proto-helper",icon:"🎨",description:"文字描述到线框图一键生成",source:"GitHub",installs:"760"}]},
  { id:"e8",title:"不加班 Skill：把杂活全外包给 AI",cover:"gradient-8",coverVariant:"office",category:"office",authorName:"下班积极分子",likes:1200,comments:234,sortScore:1000,createdAt:D(1),summary:"邮件草拟、会议纪要、周报生成、数据清洗，统统交给AI。",detail:"包含8个自动化Skill：邮件助手、会议纪要、周报生成器、数据清洗工、PPT美化师、翻译助手、文件整理、搜索增强。安装量已破万，好评率98%。",relatedSkills:[{id:"r18",name:"email-ai",icon:"📧",description:"AI邮件助手",source:"ClawHub",installs:"3.4k"},{id:"r19",name:"meeting-notes",icon:"📋",description:"会议纪要生成",source:"SkillHub",installs:"2.9k"},{id:"r20",name:"weekly-report",icon:"📅",description:"周报自动生成",source:"ClawHub",installs:"2.2k"}]},
  { id:"e13",title:"会议纪要自动生成",cover:"gradient-3",coverVariant:"office",category:"office",authorName:"效率达人",likes:567,comments:89,sortScore:880,createdAt:D(13),summary:"语音/文字一键转会议纪要，自动标注待办和决策。",detail:"支持中英文会议录音转文字，AI提取关键信息生成结构化纪要。自动标注：参会人、议题、决议、待办事项、下次会议时间。支持导出Markdown/Word/Notion。",relatedSkills:[{id:"r26",name:"meeting-transcriber",icon:"🎙️",description:"会议录音转文字+纪要",source:"ClawHub",installs:"1.8k"},{id:"r19",name:"meeting-notes",icon:"📋",description:"会议纪要生成",source:"SkillHub",installs:"2.9k"},{id:"r27",name:"action-tracker",icon:"✅",description:"待办事项追踪",source:"GitHub",installs:"640"}]},
  { id:"e14",title:"GitHub AI爆款盘点",cover:"gradient-3",coverVariant:"github",category:"office",authorName:"GitHub Skills",likes:432,comments:87,badge:"榜单",sortScore:970,createdAt:D(4),summary:"GitHub上最受欢迎的AI技能本月排名大洗牌。",detail:"6月GitHub AI Skills下载量排行榜更新。ClawHub社区的多个Skill冲入TOP10。git-pro-agent、obsidian-ai等工具类Skill下载量飙升。",relatedSkills:[{id:"r10",name:"git-pro-agent",icon:"🚀",description:"AI驱动的Git操作助手",source:"GitHub",installs:"4.1k"},{id:"r11",name:"obsidian-ai",icon:"📓",description:"Obsidian笔记AI增强",source:"GitHub",installs:"2.3k"}]},
  // entertainment (4)
  { id:"e2",title:"6月 ClawHub TOP10 榜出炉",cover:"gradient-2",coverVariant:"ranking",category:"entertainment",authorName:"ClawHub官方",likes:567,comments:123,badge:"榜单",sortScore:990,createdAt:D(3),summary:"社区民间高手都在装的Skill榜单，前十名有大半是新面孔。",detail:"6月ClawHub TOP10揭晓！前十名中6个首次上榜。TOP3被frontend-design、multi-search-engine和humanizer占据。女娲.SKILL和ontology杀入前十。",relatedSkills:[{id:"r7",name:"frontend-design",icon:"🎨",description:"一句话生成前端页面",source:"ClawHub",installs:"3.2k"},{id:"r8",name:"multi-search-engine",icon:"🔎",description:"多搜索引擎聚合查询",source:"ClawHub",installs:"2.8k"},{id:"r9",name:"humanizer",icon:"✍️",description:"AI文本人性化润色",source:"ClawHub",installs:"2.5k"}]},
  { id:"e11",title:"三国冰河兑换码一键速取",cover:"gradient-11",coverVariant:"game",category:"entertainment",authorName:"游戏达人",likes:234,comments:89,sortScore:880,createdAt:D(11),summary:"自动获取最新兑换码并一键兑换，不错过福利。",detail:"支持多个热门游戏兑换码自动获取。监控官方社区和社交媒体，实时抓取并分类存储。首批支持：三国冰河、原神、崩坏星穹铁道。",relatedSkills:[{id:"r24",name:"game-codes",icon:"🎮",description:"游戏兑换码助手",source:"ClawHub",installs:"760"}]},
  { id:"e16",title:"不用刷半小时豆瓣",cover:"gradient-5",coverVariant:"ranking",category:"entertainment",authorName:"电影爱好者",likes:456,comments:67,sortScore:860,createdAt:D(16),summary:"AI帮你快速筛选口碑好片，周末窝沙发看正合适。",detail:"搜索豆瓣/IMDb近2年评分7.5以上的悬疑电影。给出5部推荐，含片名、评分、导演、推荐理由和观影场景。标注是否有恐怖元素或烧脑内容。",relatedSkills:[{id:"r28",name:"movie-picker",icon:"🎬",description:"智能电影推荐",source:"SkillHub",installs:"1.3k"}]},
  { id:"e17",title:"今天你的城市音乐是什么",cover:"gradient-6",coverVariant:"aiPersona",category:"entertainment",authorName:"音乐探索者",likes:321,comments:54,sortScore:840,createdAt:D(17),summary:"结合城市天气和个人偏好，推荐一首适合今天的歌。",detail:"获取当前城市天气数据，分析音乐播放历史确定偏好。匹配天气+时段+偏好，推荐3首合适歌曲并说明理由。",relatedSkills:[{id:"r29",name:"weather-music",icon:"🎵",description:"天气匹配音乐推荐",source:"ClawHub",installs:"890"}]},
  // life (4)
  { id:"e4",title:"微信读书官方 Skill：一句话让 AI 帮你理书、荐书、导笔记",cover:"gradient-4",coverVariant:"reading",category:"life",authorName:"微信读书团队",likes:890,comments:156,sortScore:960,createdAt:D(5),summary:"梳理书架、推荐好书、导出读书笔记，读书效率翻倍。",detail:"智能理书：根据阅读历史自动分类整理书架。AI荐书：基于偏好精准推荐。笔记导出：一键导出Markdown/PDF。阅读总结：AI提炼核心观点。",relatedSkills:[{id:"r12",name:"weread-helper",icon:"📚",description:"微信读书AI助手",source:"Claude",installs:"5.6k"}]},
  { id:"e10",title:"看懂体检报告：AI 帮你划重点",cover:"gradient-10",coverVariant:"health",category:"life",authorName:"健康第一",likes:345,comments:56,sortScore:900,createdAt:D(10),summary:"拍照上传体检报告，AI逐项解读并标注异常。",detail:"OCR识别体检报告所有指标。逐项解释含义和正常范围，自动标记异常指标。支持与往年数据对比分析趋势。支持主流体检机构报告格式。",relatedSkills:[{id:"r23",name:"health-report",icon:"🩺",description:"体检报告解读",source:"SkillHub",installs:"1.1k"}]},
  { id:"e18",title:"身份证合页打印",cover:"gradient-7",coverVariant:"invoice",category:"life",authorName:"文档小助手",likes:198,comments:32,sortScore:820,createdAt:D(18),summary:"搜索身份证正反面，合并排版为一页A4 PDF。",detail:"在桌面、文档、图片目录搜索身份证正反面图片。自动识别正面(国徽面)和反面(人像面)。上下排列居中排版，输出PDF文件。",relatedSkills:[{id:"r30",name:"id-card-pdf",icon:"🪪",description:"身份证合页打印",source:"SkillHub",installs:"670"}]},
  { id:"e19",title:"整理剪贴板历史",cover:"gradient-1",coverVariant:"product",category:"life",authorName:"效率探索者",likes:156,comments:28,sortScore:800,createdAt:D(19),summary:"把分开复制的信息汇总到整洁的表格。",detail:"从剪贴板历史提取最近复制的姓名、手机号、地址等信息。自动识别信息类型，填入结构化表格。检查信息完整性，输出TSV/Markdown格式。",relatedSkills:[{id:"r31",name:"clipboard-organizer",icon:"📋",description:"剪贴板整理工具",source:"ClawHub",installs:"520"}]},
  // content (4)
  { id:"e6",title:"会做海报的 AI",cover:"gradient-6",coverVariant:"poster",category:"content",authorName:"设计师小王",likes:678,comments:98,sortScore:930,createdAt:D(7),summary:"输入一句话，AI帮你生成专业级海报。",detail:"自动排版、配色建议、字体推荐、素材检索。支持社交媒体、印刷品等多种尺寸。包含电商促销、活动宣传、招聘启事等模板库。",relatedSkills:[{id:"r15",name:"poster-ai",icon:"🖼️",description:"AI海报生成器",source:"GitHub",installs:"2.1k"}]},
  { id:"e9",title:"AI 赛博人格蒸馏：把你装进 AI 里",cover:"gradient-9",coverVariant:"aiPersona",category:"content",authorName:"AI研究者老张",likes:567,comments:134,sortScore:920,createdAt:D(9),summary:"分析你的对话和写作风格，训练AI分身。",detail:"通过分析对话记录、写作风格、决策模式，训练具有你个人风格的AI模型。可用于自动回复消息、草拟文档、数字分身参加会议。隐私安全：数据仅保存在本地。",relatedSkills:[{id:"r22",name:"personality-distill",icon:"🤖",description:"人格蒸馏引擎",source:"ClawHub",installs:"980"}]},
  { id:"e20",title:"小红书封面标题生成器",cover:"gradient-5",coverVariant:"poster",category:"content",authorName:"内容创作者",likes:432,comments:78,sortScore:870,createdAt:D(20),summary:"输入笔记内容，自动生成吸引人的封面标题和文案。",detail:"分析笔记主题和内容风格，生成5个备选封面标题。提供配色方案和排版建议。支持多平台适配（小红书/抖音/微博）。包含爆款标题模板库。",relatedSkills:[{id:"r32",name:"social-title-gen",icon:"✍️",description:"社媒标题生成",source:"ClawHub",installs:"1.4k"}]},
  { id:"e21",title:"短视频脚本拆解助手",cover:"gradient-12",coverVariant:"product",category:"content",authorName:"视频创作人",likes:298,comments:56,sortScore:850,createdAt:D(21),summary:"拆解热门短视频的脚本结构，学习爆款逻辑。",detail:"输入一条短视频链接，AI自动拆解：开头钩子、转折点、高潮设置、结尾行动号召。给出脚本结构图和可复用的创作模板。",relatedSkills:[{id:"r33",name:"script-analyzer",icon:"🎬",description:"短视频脚本分析",source:"SkillHub",installs:"960"}]},
  // finance (4)
  { id:"e7",title:"月底发票一堆？",cover:"gradient-7",coverVariant:"invoice",category:"finance",authorName:"财务小助手",likes:456,comments:72,sortScore:910,createdAt:D(8),summary:"发票识别、分类、汇总、生成报销单一条龙。",detail:"拍照识票自动识别发票信息。自动归类、一键生成报销表格。税务分析计算可抵扣税额。支持增值税普通/专用/电子发票。",relatedSkills:[{id:"r16",name:"invoice-ocr",icon:"🧾",description:"发票OCR识别",source:"ClawHub",installs:"1.6k"},{id:"r17",name:"expense-report",icon:"📊",description:"自动生成报销单",source:"SkillHub",installs:"890"}]},
  { id:"e12",title:"种植收益规划",cover:"gradient-12",coverVariant:"finance",category:"finance",authorName:"绿手指",likes:189,comments:34,sortScore:860,createdAt:D(12),summary:"从选种到收获，AI全程提供气候、土壤、收益分析。",detail:"根据地理位置和气候推荐种植品种。规划种植时间和轮作方案，预估产量和收益。提供病虫害防治建议。支持阳台、庭院、社区花园等场景。",relatedSkills:[{id:"r25",name:"garden-planner",icon:"🌱",description:"种植规划助手",source:"SkillHub",installs:"420"}]},
  { id:"e22",title:"同花顺概念核心标的盘点",cover:"gradient-1",coverVariant:"github",category:"finance",authorName:"股市观察者",likes:345,comments:89,sortScore:890,createdAt:D(22),summary:"查看机器人概念板块行情，整理核心标的分析报告。",detail:"查看板块涨跌幅、成交额、换手率和资金流向。列出市值前20个股，标注龙头股和活跃股。区分核心业务、概念参股、题材炒作三类。",relatedSkills:[{id:"r34",name:"stock-analyzer",icon:"📈",description:"股票分析工具",source:"ClawHub",installs:"2.3k"}]},
  { id:"e23",title:"每周资产复盘报告",cover:"gradient-3",coverVariant:"finance",category:"finance",authorName:"理财规划师",likes:234,comments:45,sortScore:830,createdAt:D(23),summary:"自动汇总每周收支，生成资产复盘报告。",detail:"连接银行/支付宝/微信账单数据，自动分类收支。生成周度资产变化趋势图。标注异常支出和优化建议。输出PDF/Markdown格式报告。",relatedSkills:[{id:"r35",name:"asset-tracker",icon:"💰",description:"资产追踪报告",source:"SkillHub",installs:"1.1k"}]},
  // research (4)
  { id:"e3",title:"6月 GitHub 下载榜 TOP10 出炉啦",cover:"gradient-3",coverVariant:"github",category:"research",authorName:"GitHub Skills",likes:432,comments:87,badge:"榜单",sortScore:970,createdAt:D(4),summary:"ClawHub社区贡献的多个Skill冲入前十。",detail:"6月GitHub AI Skills下载量排行榜。ClawHub社区的多个Skill冲入GitHub Trending TOP10。git-pro-agent、obsidian-ai等工具类Skill下载量飙升。",relatedSkills:[{id:"r10",name:"git-pro-agent",icon:"🚀",description:"AI驱动的Git操作助手",source:"GitHub",installs:"4.1k"},{id:"r11",name:"obsidian-ai",icon:"📓",description:"Obsidian笔记AI增强",source:"GitHub",installs:"2.3k"}]},
  { id:"e5",title:"六位顶级头脑陪你想",cover:"gradient-5",coverVariant:"research",category:"research",authorName:"思维工坊",likes:345,comments:67,sortScore:940,createdAt:D(6),summary:"六种思维框架的AI Skill合集。",detail:"包含：第一性原理分解器、六顶思考帽、SWOT分析、逆向思维生成器、类比思维引擎、系统思考建模。适合战略决策、产品规划和创意发想。",relatedSkills:[{id:"r13",name:"first-principles",icon:"🧠",description:"第一性原理思维",source:"ClawHub",installs:"1.8k"},{id:"r14",name:"six-hats",icon:"🎩",description:"六顶思考帽",source:"SkillHub",installs:"920"}]},
  { id:"e15",title:"5min 速通 arXiv 论文",cover:"gradient-1",coverVariant:"product",category:"research",authorName:"学术速读者",likes:678,comments:123,sortScore:950,createdAt:D(15),summary:"用5分钟读懂一篇arXiv论文的核心贡献和方法。",detail:"一句话核心贡献、研究背景与问题动机、方法概述(流程图描述)、关键实验与结果、论文局限性与未来方向。输出Markdown格式速读报告。",relatedSkills:[{id:"r36",name:"arxiv-digest",icon:"📄",description:"arXiv论文速读",source:"ClawHub",installs:"3.1k"}]},
  { id:"e24",title:"Deep Research 阅读助手",cover:"gradient-10",coverVariant:"research",category:"research",authorName:"深度研究者",likes:567,comments:98,sortScore:920,createdAt:D(24),summary:"多轮搜索、资料整理和引用管理一站式完成。",detail:"支持多轮深度搜索和自动资料归档。自动提取引文信息并生成参考文献列表。支持中文/英文文献的摘要翻译和关键信息提取。",relatedSkills:[{id:"r37",name:"deep-research",icon:"🔬",description:"深度研究助手",source:"ClawHub",installs:"2.6k"}]},
];

// === Skill Items (20 total, ~4 per category) ===

export const skillItems: SkillItem[] = [
  // office (4)
  { id:"s1",name:"frontend-design",icon:"🎨",description:"一句话生成前端页面，支持React/Vue/HTML。",category:"office",source:"ClawHub",installs:"3.2k",sortScore:990,createdAt:D(5)},
  { id:"s2",name:"brainstorming",icon:"💡",description:"AI头脑风暴工具，快速产出创意并筛选评分。",category:"office",source:"SkillHub",installs:"2.8k",sortScore:970,createdAt:D(10)},
  { id:"s14",name:"Deep Research Skill",icon:"📚",description:"多轮搜索、资料整理和引用管理。",category:"office",source:"ClawHub",installs:"2.6k",sortScore:950,createdAt:D(7)},
  { id:"s16",name:"business-writing",icon:"📝",description:"商业写作助手，支持邮件、报告、提案等。",category:"office",source:"ClawHub",installs:"1.9k",sortScore:920,createdAt:D(14)},
  { id:"s19",name:"meeting-notes",icon:"📋",description:"从录音/文字自动生成结构化会议纪要。",category:"office",source:"SkillHub",installs:"2.9k",sortScore:930,createdAt:D(12)},
  // computer (4)
  { id:"s6",name:"multi-search-engine",icon:"🔎",description:"同时查询多个搜索引擎，聚合去重排序。",category:"computer",source:"ClawHub",installs:"2.8k",sortScore:980,createdAt:D(3)},
  { id:"s10",name:"skill-creator",icon:"🔧",description:"帮助创建和发布新Skill的开发辅助工具。",category:"computer",source:"ClawHub",installs:"2.3k",sortScore:960,createdAt:D(12)},
  { id:"s4",name:"skill-vetter",icon:"✅",description:"Skill质量检测，自动检查代码和文档。",category:"computer",source:"GitHub",installs:"2.1k",sortScore:950,createdAt:D(20)},
  { id:"s7",name:"Find Skills",icon:"🔍",description:"智能搜索和发现Skill，支持多平台对比。",category:"computer",source:"SkillHub",installs:"1.7k",sortScore:920,createdAt:D(30)},
  { id:"s20",name:"system-cleaner",icon:"🧹",description:"系统垃圾清理和启动项优化工具。",category:"computer",source:"GitHub",installs:"1.5k",sortScore:880,createdAt:D(35)},
  // life (4)
  { id:"s11",name:"同花顺股票接口",icon:"📈",description:"对接同花顺数据，支持行情监控和自选股。",category:"life",source:"ClawHub",installs:"1.2k",sortScore:850,createdAt:D(40)},
  { id:"s12",name:"weather-china",icon:"🌤️",description:"中国城市天气预报，7天预报和预警。",category:"life",source:"SkillHub",installs:"980",sortScore:830,createdAt:D(45)},
  { id:"s21",name:"invoice-helper",icon:"🧾",description:"发票OCR识别和报销单自动生成。",category:"life",source:"ClawHub",installs:"1.6k",sortScore:860,createdAt:D(38)},
  { id:"s22",name:"clipboard-manager",icon:"📋",description:"剪贴板历史管理和结构化整理。",category:"life",source:"SkillHub",installs:"720",sortScore:800,createdAt:D(50)},
  { id:"s23",name:"health-report-reader",icon:"🩺",description:"体检报告拍照解读，异常指标自动标注。",category:"life",source:"SkillHub",installs:"1.1k",sortScore:840,createdAt:D(42)},
  // entertainment (4)
  { id:"s3",name:"humanizer",icon:"✍️",description:"让AI生成的文本更像人类写的，支持多语言。",category:"entertainment",source:"ClawHub",installs:"2.5k",sortScore:960,createdAt:D(15)},
  { id:"s5",name:"canvas design",icon:"🖼️",description:"基于Canvas的AI设计工具，支持海报卡片。",category:"entertainment",source:"ClawHub",installs:"1.9k",sortScore:940,createdAt:D(25)},
  { id:"s18",name:"女娲.SKILL",icon:"🌟",description:"AI内容创作全流程，从选题到发布一站式。",category:"entertainment",source:"ClawHub",installs:"2.2k",sortScore:940,createdAt:D(6)},
  { id:"s15",name:"baoyu-comic",icon:"🎭",description:"暴走漫画风格生成器，输入文案生成四格。",category:"entertainment",source:"GitHub",installs:"1.6k",sortScore:910,createdAt:D(22)},
  { id:"s17",name:"Surprise Me",icon:"🎁",description:"随机推荐一个有趣的Skill，每天发现新工具。",category:"entertainment",source:"SkillHub",installs:"780",sortScore:800,createdAt:D(50)},
];

export const exploreCategories: { value: ExploreCategory; label: string; emoji: string }[] = [
  { value: "all", label: "全部", emoji: "" },
  { value: "office", label: "办公效率", emoji: "🚀" },
  { value: "entertainment", label: "休闲娱乐", emoji: "😊" },
  { value: "life", label: "生活服务", emoji: "☕" },
  { value: "content", label: "内容创作", emoji: "✍️" },
  { value: "finance", label: "理财投资", emoji: "💰" },
  { value: "research", label: "学术研究", emoji: "🎓" },
];

export const libraryCategories: { value: SkillLibraryCategory; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "office", label: "办公学习" },
  { value: "computer", label: "电脑设置" },
  { value: "life", label: "生活日常" },
  { value: "entertainment", label: "休闲娱乐" },
];
