// The downloadable PDF CV, built from src/data/profile.js with @react-pdf/renderer.
// This file is only loaded when someone clicks "Download CV", so it doesn't slow the site down.
//
// Design: a print version of the portfolio — Poppins throughout, the accent color used
// sparingly, company logos with a timeline, and the signature at the end.

import { Document, Font, Link, Page, Path, StyleSheet, Svg, Text, View, pdf } from "@react-pdf/renderer";
// Same font as the site (react-pdf needs .woff rather than .woff2).
import poppins400 from "@fontsource/poppins/files/poppins-latin-400-normal.woff";
import poppins500 from "@fontsource/poppins/files/poppins-latin-500-normal.woff";
import poppins600 from "@fontsource/poppins/files/poppins-latin-600-normal.woff";
import { duration } from "./dates";

Font.register({
  family: "Poppins",
  fonts: [{ src: poppins400 }, { src: poppins500, fontWeight: 500 }, { src: poppins600, fontWeight: 600 }],
});
// Keep words whole instead of hyphenating them.
Font.registerHyphenationCallback((word) => [word]);

// Print colors: same family as the site, tuned for white paper.
const C = {
  ink: "#1f1512",
  text: "#463b36",
  muted: "#75695f",
  line: "#e6e0d9",
  soft: "#f4efe9",
  accent: "#c03d27",
};

const s = StyleSheet.create({
  page: {
    paddingTop: 46,
    paddingBottom: 58,
    paddingHorizontal: 50,
    fontFamily: "Poppins",
    fontSize: 8.8,
    color: C.text,
  },

  // header
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: 24 },
  name: { fontWeight: 500, fontSize: 26, lineHeight: 1.1, color: C.ink, letterSpacing: -0.3 },
  role: { fontSize: 11, color: C.muted, marginTop: 2 },
  contact: { alignItems: "flex-end", gap: 2.5, fontSize: 8.6 },
  contactLink: { color: C.text, textDecoration: "none" },
  rule: { flexDirection: "row", alignItems: "center", marginTop: 16, marginBottom: 4 },
  ruleAccent: { width: 34, height: 2, backgroundColor: C.accent },
  ruleLine: { flexGrow: 1, height: 0.75, backgroundColor: C.line },

  // sections
  section: { marginTop: 18 },
  sectionHead: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 9 },
  h2: { fontWeight: 500, fontSize: 13, color: C.ink },
  headLine: { flexGrow: 1, height: 0.75, backgroundColor: C.line },
  // Line height is set in points, only on wrapping text (react-pdf scales multipliers twice).
  paragraph: { color: C.text, lineHeight: "13.4pt" },

  // chips
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 6 },
  chip: {
    fontSize: 7.6,
    lineHeight: 1.2,
    color: C.text,
    backgroundColor: C.soft,
    paddingVertical: 2.4,
    paddingHorizontal: 5.5,
    borderRadius: 2,
  },
  chipYears: { color: C.muted },

  // timeline items (experience / projects / education)
  company: { flexDirection: "row", gap: 11, marginBottom: 12 },
  rail: { width: 16, alignItems: "center" },
  logo: { width: 16, height: 16, borderRadius: 3.5, alignItems: "center", justifyContent: "center" },
  logoText: { color: "#ffffff", fontWeight: 600, fontSize: 7.5 },
  railLine: { flexGrow: 1, width: 0.75, backgroundColor: C.line, marginTop: 4, marginBottom: 2 },
  roles: { flex: 1, gap: 10 },
  itemHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
  h3: { fontWeight: 500, fontSize: 11, color: C.ink },
  meta: { fontSize: 8.6, color: C.muted, marginTop: 1.5 },
  dates: { fontSize: 8.6, color: C.text, textAlign: "right" },
  duration: { fontSize: 7.6, color: C.muted, textAlign: "right", marginTop: 1 },
  summary: { marginTop: 3, lineHeight: "13.4pt" },
  bullets: { marginTop: 3, gap: 1.5 },
  bullet: { flexDirection: "row", gap: 6 },
  bulletText: { flex: 1, lineHeight: "13.4pt" },
  bulletDot: { color: C.accent },
  links: { flexDirection: "row", gap: 12, marginTop: 5 },
  link: { fontSize: 8.4, color: C.accent, textDecoration: "none" },

  // skills
  skillRow: { flexDirection: "row", gap: 12, marginBottom: 7 },
  skillGroup: { width: 86, fontWeight: 500, fontSize: 9.5, color: C.ink, paddingTop: 1 },

  // closing
  closing: { marginTop: 22, alignItems: "flex-end" },
  signName: { fontSize: 8.4, color: C.muted, marginTop: 2 },
  footer: {
    position: "absolute",
    bottom: 26,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.6,
    color: C.muted,
    borderTopWidth: 0.75,
    borderTopColor: C.line,
    paddingTop: 7,
  },
});

/** "https://www.linkedin.com/in/me/" → "linkedin.com/in/me" */
const prettyUrl = (href) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function SectionTitle({ children }) {
  return (
    <View style={s.sectionHead}>
      <Text style={s.h2}>{children}</Text>
      <View style={s.headLine} />
    </View>
  );
}

/** A titled list whose heading always stays on the same page as its first item. */
function ListSection({ title, items, children: renderItem }) {
  if (!items.length) return null;
  return (
    <View style={s.section}>
      <View wrap={false}>
        <SectionTitle>{title}</SectionTitle>
        {renderItem(items[0])}
      </View>
      {items.slice(1).map(renderItem)}
    </View>
  );
}

function Logo({ logo, name }) {
  const text = logo?.text ?? name.trim().charAt(0).toUpperCase();
  return (
    <View style={[s.logo, { backgroundColor: logo?.color ?? "#6b6b6b" }]}>
      <Text style={s.logoText}>{text}</Text>
    </View>
  );
}

function Bullets({ items }) {
  if (!items?.length) return null;
  return (
    <View style={s.bullets}>
      {items.map((item) => (
        <View key={item} style={s.bullet}>
          <Text style={s.bulletDot}>•</Text>
          <Text style={s.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function Tags({ items }) {
  if (!items?.length) return null;
  return (
    <View style={s.chips}>
      {items.map((t) => (
        <Text key={t} style={s.chip}>
          {t}
        </Text>
      ))}
    </View>
  );
}

function ItemHead({ title, meta, start, end, now }) {
  const length = start && end ? duration(start, end, now) : "";
  return (
    <View style={s.itemHead}>
      <View style={{ flex: 1 }}>
        <Text style={s.h3}>{title}</Text>
        {meta && <Text style={s.meta}>{meta}</Text>}
      </View>
      {(start || end) && (
        <View>
          <Text style={s.dates}>{[start, end].filter(Boolean).join(" – ")}</Text>
          {length && <Text style={s.duration}>{length}</Text>}
        </View>
      )}
    </View>
  );
}

function Signature({ signature }) {
  if (!signature) return null;
  const [, , w, h] = signature.viewBox.split(" ").map(Number);
  const height = 58;
  return (
    <Svg viewBox={signature.viewBox} width={(height * w) / h} height={height}>
      {signature.strokes.map((stroke, i) => (
        <Path
          key={i}
          d={stroke.d}
          fill="none"
          stroke={C.ink}
          strokeWidth={signature.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}

export function CvDocument({ profile: p, now = new Date() }) {
  const location = p.details.find((d) => d.icon === "pin")?.label;
  const phone = p.details.find((d) => d.icon === "phone");
  const site = p.seo?.siteUrl;
  return (
    <Document title={`${p.name} — CV`} author={p.name} subject={`${p.role} curriculum vitae`} creator={p.name}>
      <Page size={p.cvPageSize ?? "A4"} style={s.page}>
        {/* header */}
        <View style={s.header}>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{p.name}</Text>
            <Text style={s.role}>{p.role}</Text>
          </View>
          <View style={s.contact}>
            <Link src={`mailto:${p.email}`} style={s.contactLink}>
              {p.email}
            </Link>
            {phone && (
              <Link src={phone.href ?? `tel:${phone.label.replace(/[^+\d]/g, "")}`} style={s.contactLink}>
                {phone.label}
              </Link>
            )}
            {location && <Text>{location}</Text>}
            {site && (
              <Link src={site} style={s.contactLink}>
                {prettyUrl(site)}
              </Link>
            )}
            {p.socials
              .filter((x) => x.icon !== "mail")
              .map((x) => (
                <Link key={x.label} src={x.href} style={s.contactLink}>
                  {prettyUrl(x.href)}
                </Link>
              ))}
          </View>
        </View>
        <View style={s.rule}>
          <View style={s.ruleAccent} />
          <View style={s.ruleLine} />
        </View>

        {/* about */}
        {(p.about.length > 0 || p.keySkills.length > 0) && (
          <View style={s.section}>
            <SectionTitle>{p.labels.about}</SectionTitle>
            {p.about.map((para, i) => (
              <Text key={i} style={[s.paragraph, i > 0 && { marginTop: 5 }]}>
                {para}
              </Text>
            ))}
            <Tags items={p.keySkills} />
          </View>
        )}

        {/* experience */}
        <ListSection title={p.labels.experience} items={p.experience}>
          {(co) => (
            <View key={co.company} style={s.company} wrap={co.roles.length > 1}>
              <View style={s.rail}>
                <Logo logo={co.logo} name={co.company} />
                {co.roles.length > 1 && <View style={s.railLine} />}
              </View>
              <View style={s.roles}>
                {co.roles.map((r) => (
                  <View key={r.title + r.start} wrap={false}>
                    <ItemHead
                      title={r.title}
                      meta={[co.company, r.type, r.location].filter(Boolean).join("  ·  ")}
                      start={r.start}
                      end={r.end}
                      now={now}
                    />
                    {r.summary && <Text style={s.summary}>{r.summary}</Text>}
                    <Bullets items={r.highlights} />
                    <Tags items={r.skills} />
                  </View>
                ))}
              </View>
            </View>
          )}
        </ListSection>

        {/* projects */}
        <ListSection title={p.labels.projects} items={p.projects ?? []}>
          {(pr) => (
            <View key={pr.name} style={s.company} wrap={false}>
              <View style={s.rail}>
                <Logo logo={pr.logo} name={pr.name} />
              </View>
              <View style={s.roles}>
                <View>
                  <ItemHead title={pr.name} start={pr.year} now={now} />
                  {pr.summary && <Text style={s.summary}>{pr.summary}</Text>}
                  <Tags items={pr.tags} />
                  {pr.links?.length > 0 && (
                    <View style={s.links}>
                      {pr.links.map((l) => (
                        <Link key={l.label} src={l.href} style={s.link}>
                          {l.label}: {prettyUrl(l.href)}
                        </Link>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </ListSection>

        {/* education */}
        <ListSection title={p.labels.education} items={p.education}>
          {(e) => (
            <View key={e.school + e.degree} style={s.company} wrap={false}>
              <View style={s.rail}>
                <Logo logo={e.logo} name={e.school} />
              </View>
              <View style={s.roles}>
                <View>
                  <ItemHead title={e.degree} meta={e.school} start={e.start} end={e.end} now={now} />
                  {e.summary && <Text style={s.summary}>{e.summary}</Text>}
                  <Bullets items={e.notes} />
                </View>
              </View>
            </View>
          )}
        </ListSection>

        {/* skills */}
        {p.skills.length > 0 && (
          <View style={s.section} wrap={false}>
            <SectionTitle>{p.labels.skills}</SectionTitle>
            {p.skills.map((g) => (
              <View key={g.name} style={s.skillRow}>
                <Text style={s.skillGroup}>{g.name}</Text>
                <View style={[s.chips, { flex: 1, marginTop: 0 }]}>
                  {g.items.map((i) => (
                    <Text key={i.name} style={s.chip}>
                      {i.name}
                      {i.years ? (
                        <Text style={s.chipYears}>{`  ${i.years} ${i.years === 1 ? "yr" : "yrs"}`}</Text>
                      ) : null}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* signature */}
        {p.showSignature && p.signature && (
          <View style={s.closing} wrap={false}>
            <Signature signature={p.signature} />
            <Text style={s.signName}>{p.name}</Text>
          </View>
        )}
        <View style={s.footer} fixed>
          <Text>{`${p.name}  ·  ${p.role}`}</Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}

/** Renders the CV to a PDF Blob. */
export function renderCvPdf(profile) {
  return pdf(<CvDocument profile={profile} />).toBlob();
}
