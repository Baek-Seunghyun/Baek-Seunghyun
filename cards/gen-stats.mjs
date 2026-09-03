// Renders the GitHub stats card to a static SVG with the upstream github-readme-stats renderer.
// Self-hosted in this repo so the README never depends on a third-party Vercel instance.
// usage: PAT_1=<token> node cards/gen-stats.mjs [upstreamDir=github-readme-stats] [out=cards/stats.svg]
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [upstream = "github-readme-stats", out = "cards/stats.svg"] = process.argv.slice(2);
const load = (p) => import(pathToFileURL(resolve(upstream, p)).href);
const { fetchStats } = await load("src/fetchers/stats.js");
const { renderStatsCard } = await load("src/cards/stats.js");

const stats = await fetchStats("Baek-Seunghyun", true);
const svg = renderStatsCard(stats, {
  theme: "tokyonight",
  show_icons: true,
  hide_border: true,
  include_all_commits: true,
});
writeFileSync(out, svg);
console.log(`wrote ${out}`, { stars: stats.totalStars, commits: stats.totalCommits, rank: stats.rank?.level });
