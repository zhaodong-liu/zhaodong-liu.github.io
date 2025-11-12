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
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "My research projects",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "My open-source projects and research implementations.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "My Curriculum Vitae",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-successfully-completed-summer-research-project-on-traffic-aware-route-optimization-under-prof-zhibin-chen",
          title: 'Successfully completed summer research project on traffic-aware route optimization under Prof. Zhibin Chen....',
          description: "",
          section: "News",},{id: "news-started-research-on-generative-retrieval-for-recommendation-systems-under-prof-hongyi-wen-at-nyu-shanghai",
          title: 'Started research on Generative Retrieval for Recommendation Systems under Prof. Hongyi Wen at...',
          description: "",
          section: "News",},{id: "projects-llm-based-chemical-retrosynthesis",
          title: 'LLM-based Chemical Retrosynthesis',
          description: "Fine-tuning pretrained language models for predicting chemical reaction pathways",
          section: "Projects",handler: () => {
              window.location.href = "/projects/chemical_retrosynthesis/";
            },},{id: "projects-collaborative-piano",
          title: 'Collaborative Piano',
          description: "A networked real-time piano application with recording, playback, and chat features",
          section: "Projects",handler: () => {
              window.location.href = "/projects/collaborative_piano/";
            },},{id: "projects-fantasy-sports-league",
          title: 'Fantasy Sports League',
          description: "A comprehensive database system for managing fantasy sports leagues with real-time tracking",
          section: "Projects",handler: () => {
              window.location.href = "/projects/fantasy_sports_database/";
            },},{id: "projects-generative-retrieval-for-recommendation-system",
          title: 'Generative Retrieval for Recommendation System',
          description: "Multimodal user behavior prediction using advanced tokenization methods",
          section: "Projects",handler: () => {
              window.location.href = "/projects/recommendation_system/";
            },},{id: "projects-traffic-aware-route-optimization",
          title: 'Traffic-Aware Route Optimization',
          description: "Optimizing driving routes considering real-time traffic light timings",
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
