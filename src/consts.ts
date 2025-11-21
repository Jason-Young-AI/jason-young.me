import type { Site, Page, Links, Socials, FriendLinks } from "@/types/types"

// Global
export const SITE: Site = {
  TITLE: "Jason Young",
  DESCRIPTION: "Welcome! This is Jason's personal homepage. My Chinese name is 杨郑鑫, and its Pinyin Romanization is Zhengxin Yang.",
  AUTHOR: "Jason Young  ( 杨郑鑫 / Zhengxin Yang )",
}

// Publications Page
export const PUBLICATIONS: Page = {
  TITLE: "Publications",
  DESCRIPTION: "All Publications I Have Published.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "All Projects I Have Worked On.",
}

// Posts Page
export const POSTS: Page = {
  TITLE: "Posts",
  DESCRIPTION: "All Posts I Have Written.",
}

// CV Page
export const CV: Page = {
  TITLE: "CV",
  DESCRIPTION: "My Curriculum Vitae.",
}

// Hidden Page
export const Hidden: Page = {
  TITLE: "Hidden Space",
  DESCRIPTION: "My Personal Space.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Publications", 
    HREF: "/publications", 
  },
  { 
    TEXT: "Projects", 
    HREF: "/projects", 
  },
  { 
    TEXT: "Posts", 
    HREF: "/posts", 
  },
  { 
    TEXT: "CV", 
    HREF: "/cv", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "E-Mail",
    ICON: "email", 
    TEXT: "AI.Jason.Young@outlook.com",
    HREF: "mailto:AI.Jason.Young@outlook.com",
  },
  { 
    NAME: "GitHub",
    ICON: "github",
    TEXT: "Jason-Young-AI",
    HREF: "https://github.com/Jason-Young-AI"
  },
]

// Friend Links
export const FRIEND_LINKS: FriendLinks = [
  {
    NAME: "Yangs AI",
    DESCRIPTION: "Group Website",
    HREF: "https://yangs.ai",
    ICON: "/icons/yangs-ai.svg",
    COLOR: "purple"
  },
  {
    NAME: "Fresh",
    DESCRIPTION: "Friendly Research Resources Hub",
    HREF: "https://fresh.research.jason-young.me/",
    ICON: "/icons/fresh.svg",
    COLOR: "violet"
  },
  {
    NAME: "BenchCouncil",
    DESCRIPTION: "International Open Benchmark Council",
    HREF: "https://www.benchcouncil.org/",
    ICON: "/icons/benchcouncil.svg",
    COLOR: "fuchsia"
  }
]