import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY,
  baseUrl: "https://api.github.com",
});
