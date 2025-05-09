import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_API_KEY,
  log: {
    debug: console.debug,
    info: console.info,
    warn: console.warn,
    error: console.error,
  },
  baseUrl: "https://api.github.com",
});
