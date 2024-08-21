import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Jason Young",
  DESCRIPTION: "Welcome! It is Jason's Personal Website.",
  AUTHOR: "Jason Young",
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

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
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