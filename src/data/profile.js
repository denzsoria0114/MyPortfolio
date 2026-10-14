// ------------------------------------------------------------------
// All of the portfolio's content lives here. Edit this file to make
// the site yours — no component changes needed.
//
// Logos: { color: "#hex", glyph: "orbit" | "flower" | "hash" | "cap" |
//          "cube" | "book" | "spark" | "bolt" | "leaf" }
//        or { color: "#hex", text: "AB" } for initials.
// Dates: "Jan 2025", "2025" or "Present" — durations are computed.
//        Leave start/end out to hide the dates (e.g. education).
// ------------------------------------------------------------------

import { signature } from "./signature";

export const profile = {
  name: "Denver Soria",
  role: "Digital Solutions Analyst",
  bio: "Building Power Platform solutions that automate workflows and help teams work faster, with clearer controls.",

  // Profile photo (any image in src/assets; it's cropped to a square).
  // Set to null to show the illustrated avatar instead.
  avatarSrc: new URL("../assets/doggienice.jpg", import.meta.url).href,
  // Colors for the illustrated avatar shown when no photo is found.
  avatarIllustration: {
    skin: "#c68e6e",
    hair: "#231812",
    shirt: "#ebe6dc",
    backdrop: "#cfc0a6",
  },
  showSignature: true,
  // Your traced signature (src/data/signature.js). Set to null to use a
  // signature generated from your name instead.
  signature,

  // Sidebar facts. Icons: "pin" | "phone" | "briefcase" | "globe" | "clock" | "mail" | "spark" | "cap"
  // Add href to make one a link.
  details: [
    { icon: "pin", label: "Mandaluyong City, Metro Manila" },
    { icon: "phone", label: "+63 992 652 6934", href: "tel:+639926526934" },
    { icon: "spark", label: "Power Platform & workflow automation" },
  ],

  // Icons: "linkedin" | "x" | "github" | "dribbble" | "instagram" | "mail" | "globe"
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/denver-soria-17b77837a/", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/denzsoria0114", icon: "github" },
  ],

  email: "denversoria17@gmail.com",

  // "Download CV" builds a designed PDF from this file. To hand out your own
  // PDF instead, put it at public/cv.pdf.
  cvUrl: "/cv.pdf",
  cvPageSize: "A4", // or "LETTER"

  headline: "Digital Solutions Analyst",
  tagline:
    "Designing scalable business solutions that improve operational efficiency, governance, and decision-making.",
  // Little speech bubbles when someone clicks the hero illustration.
  heroQuips: [
    "flow ran ✓",
    "request approved!",
    "5+ workflows automated",
    "TAT down 20–30%",
    "audit trail ✓",
    "live in production",
  ],

  about: [
    "Digital Solutions Analyst with experience in workflow automation, Power Platform development, overall process improvement, and operations support. Proven track record of designing scalable business solutions that improve operational efficiency, governance, and decision-making.",
  ],
  // Clicking one highlights the roles below that list the same skill.
  keySkills: [
    "Power Apps",
    "Power Automate",
    "SharePoint",
    "SDLC",
    "Workflow Automation",
    "Process Improvement",
    "Stakeholder Management",
    "Operational Support",
    "Client Relations",
    "Documentation Control",
  ],

  // Role fields: title, start, end, and optionally type ("Full-Time"), location,
  // summary, highlights (bullets) and skills (tags that the key skills filter).
  experience: [
    {
      company: "Global Dominion Financing Incorporated",
      logo: { color: "#2d5bd7", text: "GD" },
      roles: [
        {
          title: "Digital Solutions Analyst",
          location: "Pasig City",
          start: "Jan 2026",
          end: "Present",
          highlights: [
            "Designed and deployed Power Platform solutions (Power Apps, Power Automate, SharePoint) that digitized manual process and improved processing efficiency by automating 5+ workflows.",
          ],
          skills: ["Power Apps", "Power Automate", "SharePoint", "Workflow Automation", "Process Improvement"],
        },
      ],
    },
    {
      company: "Asialink Finance Corporation",
      logo: { color: "#d9481c", text: "AF" },
      roles: [
        {
          title: "Digital Solutions Analyst",
          location: "Pasig City",
          start: "Jan 2026",
          end: "Jun 2026",
          highlights: [
            "Designed and deployed Power Platform solutions (Power Apps, Power Automate, SharePoint) that digitized manual process and improved processing efficiency by automating 5+ workflows.",
            "Led end-to-end SDLC, from requirements gathering through UAT, deployment, and post-production support.",
            "Partnered with department heads to identify automation opportunities, reducing turnaround time by 20 – 30% and operational bottlenecks.",
            "Delivered dashboards used by 16+ departments and workflow controls that enhanced visibility, full-audit trail, governance and decision-making.",
          ],
          skills: [
            "Power Apps",
            "Power Automate",
            "SharePoint",
            "SDLC",
            "Workflow Automation",
            "Process Improvement",
            "Stakeholder Management",
          ],
        },
      ],
    },
    {
      company: "GoodDeal Financing Inc.",
      logo: { color: "#0f8a6c", text: "GF" },
      roles: [
        {
          title: "Operations Specialist",
          location: "Pasig City",
          start: "Nov 2025",
          end: "Dec 2025",
          highlights: [
            "Manage end-to-end client operations, ensuring turnaround time (TAT) by at least 100% of desired target, monitoring monthly of total manpower efficiency, and quality standards.",
            "Analyze daily operational reports and coordinate with MIS to improve reporting accuracy and support management decisions.",
            "Drive process improvements with Operations leadership to enhance process efficiency, service quality, and lead management.",
          ],
          skills: ["Operational Support", "Process Improvement", "Stakeholder Management", "Client Relations"],
        },
      ],
    },
    {
      company: "Mighty Hand Chemical Trading",
      logo: { color: "#8a4fd1", text: "MH" },
      roles: [
        {
          title: "Administrative Officer",
          location: "Pasig City",
          start: "Oct 2022",
          end: "Sept 2025",
          highlights: [
            "Oversaw daily administrative and operational activities to maintain smooth and efficient business operations.",
            "Managed client inquiries, order processing, and delivery coordination to ensure timely service and customer satisfaction.",
            "Maintained organized records, assisted with supplier material inspections, and ensured office readiness.",
          ],
          skills: ["Operational Support", "Client Relations", "Documentation Control"],
        },
      ],
    },
  ],

  // Project fields: name, summary, and optionally year, tags and links [{ label, href }].
  projects: [
    // Hidden until the description is written:
    // {
    //   name: "Coaching Log Web Application",
    //   logo: { color: "#b45309", glyph: "book" },
    //   summary: "",
    //   tags: [],
    // },
    {
      name: "Airfare Booking Request System",
      logo: { color: "#0e7490", glyph: "spark" },
      summary:
        "Developed the backend process automation and approval platform with 6+ flows using Power Automate and SharePoint that digitized internal travel request process with audit trail history for traceability and transparency.",
      tags: ["Power Automate", "SharePoint", "Workflow Automation"],
    },
    {
      name: "Ticketing System",
      logo: { color: "#be185d", glyph: "bolt" },
      summary:
        "Developed the backend process automation and workflow management system using Power Automate and SharePoint that streamlined ticket submission, status tracking, assignment routing, SLA monitoring, and resolution workflows for internal support requests.",
      tags: ["Power Automate", "SharePoint", "Workflow Automation"],
    },
  ],

  education: [
    {
      school: "Pangasinan State University – San Carlos Campus",
      degree: "Bachelor of Science in Information Technology",
      logo: { color: "#1f7a5a", glyph: "cap" },
    },
  ],

  // Skill groups shown as tabs. Each item can have:
  //   level (0–100) → a meter with Expert / Advanced / Proficient / Familiar
  //   years         → shown next to the name
  // Items without a level are shown as simple tags.
  skills: [
    {
      name: "Power Platform",
      items: [{ name: "Power Apps" }, { name: "Power Automate" }, { name: "SharePoint" }],
    },
    {
      name: "Delivery",
      items: [
        { name: "SDLC" },
        { name: "Workflow Automation" },
        { name: "Process Improvement" },
        { name: "Documentation Control" },
      ],
    },
    {
      name: "Operations",
      items: [{ name: "Operational Support" }, { name: "Stakeholder Management" }, { name: "Client Relations" }],
    },
  ],

  contact: {
    // Shows a green "available" badge in the Contact section.
    available: false,
    availableLabel: "Open to opportunities",
    title: "Let's make work flow better",
    text: "Have a manual process that needs automating, a workflow that needs better controls, or just want to talk Power Platform? Send me a message and I'll get back to you.",
  },

  // Search engines and link previews (LinkedIn, Slack, iMessage…). Filled into
  // index.html at build time. Set siteUrl once the site is live, and add a
  // 1200×630 image at public/og.png for the preview card.
  seo: {
    siteUrl: "", // e.g. "https://yourname.dev"
    description:
      "Denver Soria is a Digital Solutions Analyst in Metro Manila who builds Power Platform solutions — Power Apps, Power Automate and SharePoint — that automate workflows and improve operations.",
    image: "/og.png",
  },

  // Shown in the footer as local time.
  city: "Metro Manila",
  timeZone: "Asia/Manila",

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
    preparingCv: "Preparing CV…",
    skipToContent: "Skip to content",
    all: "All",
  },
};
