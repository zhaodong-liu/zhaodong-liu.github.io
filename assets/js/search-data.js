// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-lt-span-class-quot-lang-en-quot-gt-projects-lt-span-gt-lt-span-class-quot-lang-zh-quot-gt-项目-lt-span-gt",
          title: "&lt;span class=&quot;lang-en&quot;&gt;projects&lt;/span&gt;&lt;span class=&quot;lang-zh&quot;&gt;项目&lt;/span&gt;",
          description: "My projects我的项目",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-lt-span-class-quot-lang-en-quot-gt-repositories-lt-span-gt-lt-span-class-quot-lang-zh-quot-gt-代码仓库-lt-span-gt",
          title: "&lt;span class=&quot;lang-en&quot;&gt;repositories&lt;/span&gt;&lt;span class=&quot;lang-zh&quot;&gt;代码仓库&lt;/span&gt;",
          description: "My open-source projects and research implementations.我的开源项目与科研代码实现。",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-lt-span-class-quot-lang-en-quot-gt-cv-lt-span-gt-lt-span-class-quot-lang-zh-quot-gt-简历-lt-span-gt",
          title: "&lt;span class=&quot;lang-en&quot;&gt;cv&lt;/span&gt;&lt;span class=&quot;lang-zh&quot;&gt;简历&lt;/span&gt;",
          description: "My Curriculum Vitae个人简历",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-successfully-completed-summer-research-project-on-traffic-aware-route-optimization-under-prof-zhibin-chen-at-nyu-shanghai-在上海纽约大学-陈志斌教授-指导下-顺利完成考虑交通灯时间的驾驶路线优化暑期科研项目",
          title: 'Successfully completed summer research project on traffic-aware route optimization under Prof. Zhibin Chen...',
          description: "",
          section: "News",},{id: "news-started-research-on-generative-retrieval-for-recommendation-systems-under-prof-hongyi-wen-at-nyu-shanghai-在上海纽约大学-文宏毅教授-指导下-开展推荐系统中的生成式检索研究",
          title: 'Started research on Generative Retrieval for Recommendation Systems under Prof. Hongyi Wen at...',
          description: "",
          section: "News",},{id: "news-started-a-data-engineer-internship-at-mcdonald-s-china-data-strategy-department-i-ll-be-working-on-exciting-projects-involving-database-schema-design-ai-powered-recommendation-algorithms-and-data-visualization-tools-入职麦当劳中国数据战略部门-担任数据工程师实习生-参与的项目涉及数据库结构设计-ai-驱动的推荐算法以及数据可视化工具",
          title: 'Started a data engineer internship at McDonald’s China Data Strategy Department. I’ll be...',
          description: "",
          section: "News",},{id: "news-wrapped-up-four-months-as-a-data-engineer-at-mcdonald-s-china-data-strategy-department-came-away-with-hands-on-experience-translating-fuzzy-business-questions-into-validated-enterprise-data-maps-navigating-the-trade-offs-between-offline-retrieval-quality-and-production-latency-and-learning-how-an-ai-agent-earns-trust-in-a-non-technical-analyst-s-daily-workflow-结束在麦当劳中国数据战略部门为期四个月的数据工程师实习-收获了将模糊业务问题转化为可验证的企业级数据地图的实战经验-理解了离线检索质量与线上延迟之间的权衡-也学到了如何让一个-ai-agent-真正融入非技术分析师的日常工作流",
          title: 'Wrapped up four months as a data engineer at McDonald’s China Data Strategy...',
          description: "",
          section: "News",},{id: "projects-music-snippet-classification音乐片段分类",
          title: 'Music Snippet Classification音乐片段分类',
          description: "Ensemble of ResNet34 models for classifying music audio snippets by singer gender基于 ResNet34 集成模型的音乐片段歌者性别分类",
          section: "Projects",handler: () => {
              window.location.href = "/projects/audio_classification/";
            },},{id: "projects-carbon-14-bomb-pulse-modeling-for-tissue-age基于碳-14-弹丸脉冲模型的组织年龄分析",
          title: 'Carbon-14 Bomb-Pulse Modeling for Tissue Age基于碳-14 弹丸脉冲模型的组织年龄分析',
          description: "From deterministic PDEs to stochastic agent-based models for inferring tissue and cell age from atmospheric Carbon-14从确定性 PDE 到随机粒子模型，基于大气碳-14 推断组织与细胞年龄",
          section: "Projects",handler: () => {
              window.location.href = "/projects/c14_tissue_age/";
            },},{id: "projects-llm-based-chemical-retrosynthesis基于大语言模型的化学逆合成",
          title: 'LLM-based Chemical Retrosynthesis基于大语言模型的化学逆合成',
          description: "Fine-tuning pretrained language models for predicting chemical reaction pathways微调预训练语言模型以预测化学反应路径",
          section: "Projects",handler: () => {
              window.location.href = "/projects/chemical_retrosynthesis/";
            },},{id: "projects-collaborative-piano协作钢琴",
          title: 'Collaborative Piano协作钢琴',
          description: "A networked real-time piano application with recording, playback, and chat features支持联网实时演奏、录音、回放与聊天功能的钢琴应用",
          section: "Projects",handler: () => {
              window.location.href = "/projects/collaborative_piano/";
            },},{id: "projects-fantasy-sports-league梦幻体育联盟",
          title: 'Fantasy Sports League梦幻体育联盟',
          description: "A comprehensive database system for managing fantasy sports leagues with real-time tracking面向梦幻体育联盟的综合数据库系统，支持实时追踪",
          section: "Projects",handler: () => {
              window.location.href = "/projects/fantasy_sports_database/";
            },},{id: "projects-multimodal-gen-rec多模态生成式推荐",
          title: 'Multimodal Gen Rec多模态生成式推荐',
          description: "Collaborative Learning with Action-aware Image-text Representation Optimization (CLAIRO)基于行为感知的图文表征协同学习与优化 (CLAIRO)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/recommendation_system/";
            },},{id: "projects-traffic-aware-route-optimization考虑交通灯的路线优化",
          title: 'Traffic-Aware Route Optimization考虑交通灯的路线优化',
          description: "Optimizing driving routes considering real-time traffic light timings结合实时交通信号时序的驾驶路线优化",
          section: "Projects",handler: () => {
              window.location.href = "/projects/route_optimization/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%7A%6C%34%37%38%39@%6E%79%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/zhaodong-liu", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/zhaodong_liuu", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
