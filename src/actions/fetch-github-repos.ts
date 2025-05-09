"use server";

import { octokit } from "@/lib/github";
import { GithubProject, LanguageInfo } from "@/types/github-project";

export type GithubProjectResponse = {
  projects: GithubProject[];
  totalProjects: number;
  responseTime: number;
};

export const getRepositories = async (): Promise<GithubProjectResponse> => {
  const before: number = performance.now();
  try {
    // Get pinned and regular repositories using the GitHub GraphQL API
    const response = await octokit.graphql<{
      user: {
        pinnedItems: { nodes: any[] };
        repositories: { nodes: any[] };
      };
    }>(graphQlQuery);

    console.log("GitHub API Response:", JSON.stringify(response, null, 2));

    // Invalid response from GitHub
    if (!response?.user) {
      console.error("Invalid GitHub API response:", response);
      return {
        projects: [],
        totalProjects: 0,
        responseTime: performance.now() - before,
      };
    }

    const processLanguages = (repo: any): LanguageInfo[] => {
      if (!repo.languages?.edges?.length) {
        return [];
      }

      return repo.languages.edges.map((edge: any) => ({
        name: edge.node.name,
        color: edge.node.color || "#ccc",
      }));
    };

    // Combine pinned and regular repositories, ensuring pinned ones come first
    const pinnedRepos = response.user.pinnedItems.nodes.map((repo: any) => ({
      ...repo,
      language: repo.language ? { name: repo.language.name } : null,
      languages: processLanguages(repo),
      isPinned: true,
      tags: repo.topics?.nodes?.map((node: any) => node.topic.name) || [],
    }));

    return {
      projects: [
        ...pinnedRepos,
        ...response.user.repositories.nodes
          .filter(
            (repo: any) =>
              !repo.archived &&
              !pinnedRepos.some((pinned: any) => pinned.id === repo.id)
          )
          .map((repo: any) => ({
            ...repo,
            language: repo.language ? { name: repo.language.name } : null,
            languages: processLanguages(repo),
            isPinned: false,
            tags: repo.topics?.nodes?.map((node: any) => node.topic.name) || [],
          })),
      ],
      totalProjects:
        pinnedRepos.length + response.user.repositories.nodes.length,
      responseTime: performance.now() - before,
    };
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return {
      projects: [],
      totalProjects: 0,
      responseTime: performance.now() - before,
    };
  }
};

const graphQlQuery: string = `
        query {
            user(login: "CallMeJasonYT") {
                pinnedItems(first: 6, types: REPOSITORY) {
                    nodes {
                        ... on Repository {
                            id
                            name
                            nameWithOwner
                            description
                            html_url: url
                            stargazers_count: stargazerCount
                            forks: forkCount
                            language: primaryLanguage {
                                name
                            }
                            languages(first: 6, orderBy: {field: SIZE, direction: DESC}) {
                                edges {
                                    node {
                                        name
                                        color
                                    }
                                }
                            }
                            created_at: createdAt
                            updated_at: updatedAt
                            topics: repositoryTopics(first: 10) {
                                nodes {
                                    topic {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
                repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
                    nodes {
                        id
                        name
                        nameWithOwner
                        description
                        html_url: url
                        stargazers_count: stargazerCount
                        forks: forkCount
                        language: primaryLanguage {
                            name
                        }
                        languages(first: 6, orderBy: {field: SIZE, direction: DESC}) {
                            edges {
                                node {
                                    name
                                    color
                                }
                            }
                            
                        }
                        created_at: createdAt
                        updated_at: updatedAt
                        topics: repositoryTopics(first: 10) {
                            nodes {
                                topic {
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    `;
