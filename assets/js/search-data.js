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
            },},{id: "projects-tissue-age-modeling-on-carbon-14碳-14-组织年龄建模",
          title: 'Tissue Age Modeling on Carbon-14碳-14 组织年龄建模',
          description: "Inferring tissue and cell age from atmospheric Carbon-14 using deterministic and stochastic DEs.基于确定性与随机微分方程，从大气碳-14 推断组织与细胞年龄。",
          section: "Projects",handler: () => {
              window.location.href = "/projects/c14_tissue_age/";
            },},{id: "projects-efficient-retrosynthesis-with-pretrained-lm-fine-tuning基于预训练语言模型微调的高效化学逆合成",
          title: 'Efficient Retrosynthesis with Pretrained LM Fine-Tuning基于预训练语言模型微调的高效化学逆合成',
          description: "Fine-tuning pretrained language models for predicting chemical reaction pathways微调预训练语言模型以预测化学反应路径",
          section: "Projects",handler: () => {
              window.location.href = "/projects/chemical_retrosynthesis/";
            },},{id: "projects-collaborative-piano协作钢琴",
          title: 'Collaborative Piano协作钢琴',
          description: "A networked real-time piano application with recording, playback, and chat features支持联网实时演奏、录音、回放与聊天功能的钢琴应用",
          section: "Projects",handler: () => {
              window.location.href = "/projects/collaborative_piano/";
            },},{id: "projects-fantasy-sports-league-database梦幻体育联赛数据库",
          title: 'Fantasy Sports League Database梦幻体育联赛数据库',
          description: "A comprehensive database system for managing fantasy sports leagues with real-time tracking面向梦幻体育联盟的综合数据库系统，支持实时追踪",
          section: "Projects",handler: () => {
              window.location.href = "/projects/fantasy_sports_database/";
            },},{id: "projects-generative-retrieval-for-multimodal-recommendation-system多模态推荐系统的生成式检索",
          title: 'Generative Retrieval for Multimodal Recommendation System多模态推荐系统的生成式检索',
          description: "Collaborative Learning with Action-aware Image-text Representation Optimization (CLAIRO)基于行为感知的图文表征协同学习与优化 (CLAIRO)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/recommendation_system/";
            },},{id: "projects-energy-aware-route-optimization-under-traffic-light-timing考虑交通信号灯时长的能耗感知路线优化",
          title: 'Energy-Aware Route Optimization Under Traffic-Light Timing考虑交通信号灯时长的能耗感知路线优化',
          description: "Optimizing driving routes considering real-time traffic light timings结合实时交通信号时序的驾驶路线优化",
          section: "Projects",handler: () => {
              window.location.href = "/projects/route_optimization/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%7A%68%61%6F%64%6F%6E%6C@%61%6E%64%72%65%77.%63%6D%75.%65%64%75", "_blank");
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
