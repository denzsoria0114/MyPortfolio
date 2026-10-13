// ------------------------------------------------------------------
// All of the portfolio's content lives here. Edit this file to make
// the site yours — no component changes needed.
//
// Logos: { color: "#hex", glyph: "orbit" | "flower" | "hash" | "cap" |
//          "cube" | "book" | "spark" | "bolt" | "leaf" }
//        or { color: "#hex", text: "AB" } for initials.
// Dates: "Jan 2025", "2025" or "Present" — durations are computed.
// ------------------------------------------------------------------

export const profile = {
  name: "Oliver Rowland",
  role: "Full Stack Developer",
  bio: "Focused on high-performance web development, clean interfaces, and reliable backend systems.",

  // Put a square photo at public/avatar.jpg to replace the illustration.
  avatarSrc: "/avatar.jpg",
  // Colors for the illustrated avatar shown when no photo is found.
  avatarIllustration: {
    skin: "#c68e6e",
    hair: "#231812",
    shirt: "#ebe6dc",
    backdrop: "#cfc0a6",
  },
  showSignature: true,

  // Sidebar facts. Icons: "pin" | "briefcase" | "globe" | "clock" | "mail" | "spark" | "cap"
  details: [
    { icon: "pin", label: "Houston, Texas" },
    { icon: "briefcase", label: "5+ years experience" },
    { icon: "globe", label: "Open to remote work" },
  ],

  // Icons: "linkedin" | "x" | "github" | "dribbble" | "instagram" | "mail" | "globe"
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "X", href: "https://x.com", icon: "x" },
    { label: "Dribbble", href: "https://dribbble.com", icon: "dribbble" },
  ],

  email: "hello@oliverrowland.dev",

  // Put your CV at public/cv.pdf. If it's missing, a plain-text CV is
  // generated from this file instead.
  cvUrl: "/cv.pdf",

  headline: "Full Stack Developer",
  tagline:
    "Building scalable web applications with clean architecture, modern tools, and thoughtful user experience.",
  // Little speech bubbles when someone clicks the hero illustration.
  heroQuips: [
    "deployed ✓",
    "tests passing",
    "shipped!",
    "0 bugs (so far)",
    "p95 → 120ms",
    "merged to main",
  ],

  about: [
    "I'm a full stack developer with experience building web applications focused on performance, scalability, and usability. I specialize in creating responsive frontend interfaces, developing reliable backend systems, and working across the full product development process using modern technologies and clean development practices.",
  ],
  // Clicking one highlights the roles below that list the same skill.
  keySkills: [
    "React & Next.js",
    "Node.js & APIs",
    "Responsive interfaces",
    "Backend architecture",
    "TypeScript",
    "Database management",
    "Performance optimization",
  ],

  experience: [
    {
      company: "Northstack",
      logo: { color: "#3450f0", glyph: "orbit" },
      roles: [
        {
          title: "Senior Full Stack Developer",
          type: "Full-Time",
          start: "Jan 2025",
          end: "Present",
          summary:
            "Leading full-stack development for scalable web applications and reliable digital products across teams.",
          highlights: [
            "Improved platform performance and stability",
            "Built frontend and backend product features",
            "Collaborated with product and engineering teams",
          ],
          skills: [
            "React & Next.js",
            "Node.js & APIs",
            "Backend architecture",
            "TypeScript",
            "Performance optimization",
          ],
        },
        {
          title: "Full Stack Developer",
          type: "Full-Time",
          start: "Jan 2023",
          end: "Dec 2024",
          summary:
            "Worked on responsive web applications, API integrations, and backend systems using modern frameworks.",
          skills: ["React & Next.js", "Node.js & APIs", "Database management", "TypeScript"],
        },
      ],
    },
    {
      company: "Pixelbase",
      logo: { color: "#ef4a26", glyph: "flower" },
      roles: [
        {
          title: "Frontend Developer",
          type: "Full-Time",
          start: "Apr 2021",
          end: "Dec 2022",
          summary:
            "Developed responsive user interfaces and interactive web experiences for client and internal digital products, focusing on usability, accessibility, and performance.",
          skills: ["React & Next.js", "Responsive interfaces", "Performance optimization"],
        },
      ],
    },
    {
      company: "CloudCore",
      logo: { color: "#7b2fe0", glyph: "hash" },
      roles: [
        {
          title: "Junior Web Developer",
          type: "Part-Time",
          start: "Aug 2020",
          end: "May 2021",
          summary:
            "Supported frontend and backend development tasks while contributing to modern web projects, maintaining internal systems, and improving workflow efficiency.",
          highlights: [
            "Assisted in developing responsive website interfaces",
            "Worked with REST APIs and backend integrations",
          ],
          skills: ["Responsive interfaces", "Node.js & APIs", "Database management"],
        },
      ],
    },
  ],

  projects: [
    {
      name: "Ledgerline",
      year: "2025",
      logo: { color: "#0f766e", glyph: "bolt" },
      summary:
        "Real-time expense dashboard for small finance teams, with role-based access, CSV import and live budget alerts.",
      tags: ["React & Next.js", "Node.js & APIs", "PostgreSQL"],
      links: [
        { label: "Live site", href: "https://example.com" },
        { label: "Source", href: "https://github.com" },
      ],
    },
    {
      name: "Shiplog",
      year: "2024",
      logo: { color: "#b45309", glyph: "leaf" },
      summary:
        "Open-source changelog generator that turns merged pull requests into tidy, categorised release notes.",
      tags: ["TypeScript", "GitHub Actions", "CLI"],
      links: [{ label: "Source", href: "https://github.com" }],
    },
    {
      name: "Atlas UI",
      year: "2023",
      logo: { color: "#be185d", glyph: "spark" },
      summary:
        "Accessible component library with theming tokens, adopted across four internal products.",
      tags: ["React", "Tailwind CSS", "Accessibility"],
      links: [
        { label: "Docs", href: "https://example.com" },
        { label: "Source", href: "https://github.com" },
      ],
    },
  ],

  education: [
    {
      school: "Lakeshore State University",
      degree: "B.S. in Computer Science",
      start: "Aug 2016",
      end: "May 2020",
      summary: "Focused on distributed systems, databases, and human-computer interaction.",
      notes: ["Graduated with honors", "Teaching assistant for Intro to Web Development"],
      logo: { color: "#1f7a5a", glyph: "cap" },
    },
    {
      school: "Open Cloud Academy",
      degree: "Cloud Architecture Certificate",
      start: "Mar 2022",
      end: "Aug 2022",
      summary: "Designing, deploying and observing resilient services on managed cloud infrastructure.",
      logo: { color: "#d99a1e", glyph: "cube" },
    },
  ],

  // level: 0–100 → Expert (90+), Advanced (80+), Proficient (65+), Familiar
  skills: [
    {
      name: "Frontend",
      items: [
        { name: "React & Next.js", level: 95, years: 5 },
        { name: "TypeScript", level: 90, years: 5 },
        { name: "Tailwind CSS", level: 88, years: 4 },
        { name: "Accessibility", level: 78, years: 3 },
      ],
    },
    {
      name: "Backend",
      items: [
        { name: "Node.js & APIs", level: 92, years: 5 },
        { name: "PostgreSQL", level: 84, years: 4 },
        { name: "GraphQL", level: 76, years: 3 },
        { name: "Redis", level: 68, years: 2 },
      ],
    },
    {
      name: "Tooling",
      items: [
        { name: "Docker", level: 82, years: 4 },
        { name: "AWS", level: 74, years: 3 },
        { name: "CI/CD", level: 80, years: 4 },
        { name: "Testing", level: 86, years: 5 },
      ],
    },
  ],

  contact: {
    // Shows a green "available" badge in the sidebar and the Contact section.
    available: true,
    availableLabel: "Available for new projects",
    title: "Let's build something good",
    text: "Have a product in mind, a team that needs another pair of hands, or just want to talk shop? My inbox is open, and I usually reply within a day.",
  },

  // Search engines and link previews (LinkedIn, Slack, iMessage…). Filled into
  // index.html at build time. Set siteUrl once the site is live, and add a
  // 1200×630 image at public/og.png for the preview card.
  seo: {
    siteUrl: "", // e.g. "https://yourname.dev"
    description:
      "Oliver Rowland is a full stack developer in Houston building fast, reliable web applications with React, Node.js and TypeScript.",
    image: "/og.png",
  },

  // Shown in the footer as local time.
  city: "Houston",
  timeZone: "America/Chicago",

  labels: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    skills: "Skills",
    contact: "Contact",
    contactMe: "Contact Me",
    keySkills: "Key skills:",
    viewExperience: "View Experience",
    downloadCv: "Download CV",
    downloadCvText: "Download CV (.txt)", // shown until public/cv.pdf exists
    currently: "Currently",
    skipToContent: "Skip to content",
    all: "All",
  },
};
