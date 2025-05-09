export type LanguageInfo = {
  name: string;
  color: string;
};

export type GithubProject = {
  id: number;
  name: string;
  nameWithOwner: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks: number;
  language: {
    name: string;
  } | null;
  languages: LanguageInfo[];
  created_at: string;
  updated_at: string;
  isPinned: boolean;
  tags: string[];
  topics?: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
};
