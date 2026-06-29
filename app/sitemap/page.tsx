import type { Metadata } from "next";
import { buildSitemapEntries } from "@/lib/seo/sitemap-entries";

export const metadata: Metadata = {
  title: "Sitemap – Atlant Logistics",
  robots: "noindex",
};

function formatDate(date: Date | string | undefined): string {
  if (!date) return "—";
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().slice(0, 10);
}

export default function SitemapPage() {
  const entries = buildSitemapEntries();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", margin: "2rem auto", maxWidth: 1200, color: "#1a1a1a" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Atlant Logistics – Sitemap</h1>
      <p style={{ color: "#555", marginTop: 0 }}>
        {entries.length} URLs across Bulgarian, English and Russian.{" "}
        <a href="/sitemap.xml" style={{ color: "#0b5cab" }}>Raw XML for crawlers →</a>
      </p>

      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "1.5rem", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={th}>URL</th>
            <th style={th}>Last modified</th>
            <th style={th}>Freq.</th>
            <th style={th}>Priority</th>
            <th style={th}>Alternates</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            const alternates = entry.alternates?.languages;
            return (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={td}>
                  <a href={entry.url} style={{ color: "#0b5cab", wordBreak: "break-all" }}>
                    {entry.url}
                  </a>
                </td>
                <td style={td}>{formatDate(entry.lastModified)}</td>
                <td style={td}>{entry.changeFrequency ?? "—"}</td>
                <td style={td}>{entry.priority ?? "—"}</td>
                <td style={{ ...td, fontSize: "0.78rem", color: "#555" }}>
                  {alternates
                    ? Object.entries(alternates)
                        .filter((e): e is [string, string] => Boolean(e[1]))
                        .map(([lang, href]) => (
                          <div key={lang}>
                            <strong>{lang}</strong>:{" "}
                            <a href={href} style={{ color: "#0b5cab", wordBreak: "break-all" }}>{href}</a>
                          </div>
                        ))
                    : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "0.5rem 0.75rem",
  textAlign: "left",
  verticalAlign: "top",
};

const td: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "0.5rem 0.75rem",
  verticalAlign: "top",
};
