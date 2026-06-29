/** Paths that must not be indexed or crawled (no locale prefix). */
export const CRAWL_DISALLOW_PATHS = [
  "/admin",
  "/admin/",
  "/api/",
  "/_next/",
] as const;

/** Known AI / LLM crawlers — same public rules, admin still blocked. */
export const AI_CRAWLER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "anthropic-ai",
  "ClaudeBot",
  "PerplexityBot",
  "Applebot-Extended",
] as const;
