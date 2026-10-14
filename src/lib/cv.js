// "Download CV": serves public/cv.pdf when you've added one, otherwise builds a
// PDF from profile.js (see cvPdf.jsx).

function triggerDownload(href, filename) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const slug = (name) => name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "cv";

/** True when the CV file (e.g. public/cv.pdf) really exists. */
export async function cvFileExists(url) {
  if (!url) return false;
  try {
    const res = await fetch(url, { method: "HEAD" });
    // Dev servers answer missing files with index.html, so check the type too.
    return res.ok && !(res.headers.get("content-type") || "").includes("text/html");
  } catch {
    return false;
  }
}

/** Starts loading the PDF builder early (e.g. when the button is hovered). */
export const prefetchCvBuilder = () => import("./cvPdf.jsx").catch(() => {});

/** Downloads the CV as a PDF. Returns a toast message. */
export async function downloadCv(profile, hasFile) {
  const filename = `${slug(profile.name)}-cv.pdf`;
  if (hasFile) {
    triggerDownload(profile.cvUrl, filename);
    return "CV downloaded";
  }
  // The PDF library is loaded only now, on first click.
  const { renderCvPdf } = await import("./cvPdf.jsx");
  const url = URL.createObjectURL(await renderCvPdf(profile));
  triggerDownload(url, filename);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return "CV downloaded";
}
