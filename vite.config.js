import { existsSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { profile } from "./src/data/profile.js";

const escape = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Writes the page title, description, social-preview (Open Graph / Twitter) tags and
 * search-engine data into index.html from src/data/profile.js, so link previews work
 * without JavaScript. (In dev, restart `npm run dev` to see edits to these tags.)
 */
function seoFromProfile() {
  const { name, role, email, socials, seo = {} } = profile;
  const site = (seo.siteUrl || "").replace(/\/$/, "");
  const title = `${name} — ${role}`;
  const description = seo.description || profile.bio;
  const hasImage = seo.image && existsSync(`public${seo.image}`);
  const image = hasImage ? site + seo.image : null;

  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<meta name="author" content="${escape(name)}" />`,
    `<meta name="theme-color" content="#faf6f0" media="(prefers-color-scheme: light)" />`,
    `<meta name="theme-color" content="#15110e" media="(prefers-color-scheme: dark)" />`,
    site && `<link rel="canonical" href="${escape(site)}/" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    site && `<meta property="og:url" content="${escape(site)}/" />`,
    image && `<meta property="og:image" content="${escape(image)}" />`,
    `<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
    image && `<meta name="twitter:image" content="${escape(image)}" />`,
    existsSync("public/apple-touch-icon.png") && `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name,
      jobTitle: role,
      email: `mailto:${email}`,
      ...(site && { url: site }),
      sameAs: socials.map((s) => s.href),
    }).replace(/</g, "\\u003c")}</script>`,
  ].filter(Boolean);

  return {
    name: "seo-from-profile",
    transformIndexHtml: (html) => html.replace("<!-- seo -->", tags.join("\n    ")),
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFromProfile()],
  // 5173 is used by another project. If 5174 is busy, Vite tries 5175, 5176, …
  server: { port: 5174 },
  preview: { port: 4174 },
  // The PDF library behind "Download CV" is large but loads only on demand.
  build: { chunkSizeWarningLimit: 1400 },
});
