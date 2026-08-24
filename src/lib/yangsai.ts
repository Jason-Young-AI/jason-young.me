import type { ProjectEntry, PublicationEntry } from "@/types/content";

type YangsAiAuthor = {
  name: string;
  isFirstAuthor?: boolean;
  isCorrespondingAuthor?: boolean;
};

type YangsAiPublication = {
  id: string;
  kind: string;
  title: string;
  venue?: string;
  publishedOn: string;
  authors: YangsAiAuthor[];
  bibtex?: string;
  paperUrl?: string;
  preprintUrl?: string;
  otherUrl?: string;
  codeUrl?: string;
  selected?: boolean;
};

type YangsAiProject = {
  id: string;
  title: string;
  summary: string;
  status: "active" | "completed" | "paused";
  updatedOn: string;
  projectUrl?: string;
  codeUrl?: string;
  selected?: boolean;
};

type YangsAiResearchPayload = {
  publications: YangsAiPublication[];
  projects: YangsAiProject[];
};

const endpoint =
  import.meta.env.PUBLIC_YANGSAI_RESEARCH_API ?? "https://yangs.ai/api/research.json";

const defaultYangsAiBase = "https://yangs.ai";

const resolveYangsAiBase = () => {
  try {
    const url = new URL(endpoint);
    return `${url.protocol}//${url.host}`;
  } catch {
    return defaultYangsAiBase;
  }
};

const yangsAiBase = resolveYangsAiBase();

let cached: Promise<{
  publications: PublicationEntry[];
  projects: ProjectEntry[];
}> | null = null;

const emptyResearchData = {
  publications: [] as PublicationEntry[],
  projects: [] as ProjectEntry[],
};

const parseDate = (value: string) => {
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return date;
  }
  return new Date(`${value}-01`);
};

const publicationToEntry = (item: YangsAiPublication): PublicationEntry => {
  const correspondingAuthors = item.authors
    .filter((author) => author.isCorrespondingAuthor)
    .map((author) => author.name);
  const venueTag = item.venue ? [item.venue] : [];

  return {
    slug: item.id,
    collection: "publications",
    data: {
      title: item.title,
      summary: item.venue
        ? `Published as ${item.kind} at ${item.venue}.`
        : `Published as ${item.kind}.`,
      abstract: "",
      authors: item.authors.map((author) => author.name),
      correspondingAuthors:
        correspondingAuthors.length > 0 ? correspondingAuthors : undefined,
      position: item.venue ?? "Publication",
      date: parseDate(item.publishedOn).toISOString(),
      tags: [item.kind, ...venueTag],
      type: item.kind,
      select: Boolean(item.selected),
      arxivLink: item.preprintUrl,
      officialLink: item.otherUrl ?? item.paperUrl,
      href: item.otherUrl ?? item.paperUrl ?? item.preprintUrl,
      bibtex: item.bibtex,
      yangsAiDetailUrl: `${yangsAiBase}/research/publications/#${item.id}`,
    },
  };
};

const projectToEntry = (item: YangsAiProject): ProjectEntry => ({
  slug: item.id,
  collection: "projects",
  data: {
    title: item.title,
    summary: item.summary,
    authors: [],
    date: parseDate(item.updatedOn).toISOString(),
    tags: [item.status],
    select: Boolean(item.selected),
    sourceLink: item.codeUrl,
    href: item.projectUrl ?? item.codeUrl,
  },
});

export async function getYangsAiResearchData() {
  if (!cached) {
    cached = (async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
        }

        const payload = (await response.json()) as YangsAiResearchPayload;
        const publications = Array.isArray(payload.publications)
          ? payload.publications
          : [];
        const projects = Array.isArray(payload.projects) ? payload.projects : [];

        return {
          publications: publications
            .map(publicationToEntry)
            .sort(
              (a, b) =>
                new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
            ),
          projects: projects
            .map(projectToEntry)
            .sort(
              (a, b) =>
                new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
            ),
        };
      } catch (error) {
        console.warn(
          `[yangsai] Failed to fetch remote research data from ${endpoint}. Falling back to empty data.`,
          error,
        );
        return emptyResearchData;
      }
    })();
  }

  return cached;
}
