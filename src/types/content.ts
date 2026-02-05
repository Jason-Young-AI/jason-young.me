// --- publications ---
export type PublicationData = {
  title: string;
  summary: string;
  abstract: string;
  authors: string[];
  cofirstAuthors?: string[];
  correspondingAuthors?: string[];
  position: string;
  date: string; // .astro toISOString
  tags: string[];
  type: string;
  draft?: boolean;
  select?: boolean;
  arxivLink?: string;
  officialLink?: string;
};

export type PublicationEntry = {
  slug: string;
  collection: "publications"
  data: PublicationData;
};

// --- projects ---
export type ProjectData = {
  title: string;
  summary: string;
  authors: string[];
  date: string;
  tags: string[];
  draft?: boolean;
  select?: boolean;
  sourceLink?: string;
};

export type ProjectEntry = {
  slug: string;
  collection: "projects"
  data: ProjectData;
};

// --- posts ---
export type PostData = {
  title: string;
  summary: string;
  authors: string[];
  date: string;
  tags: string[];
  draft?: boolean;
  select?: boolean;
  originalLink?: string;
};

export type PostEntry = {
  slug: string;
  collection: "posts"
  data: PostData;
};

// --- cv ---
export type CVData = {
  title: string;
  subtitle: string;
  order: number;
  draft?: boolean;
};

export type CVEntry = {
  slug: string;
  collection: "cv"
  data: CVData;
};