import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Администрация – Atlant Logistics",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Condensed:wght@400;600;700;800;900&family=Sofia+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-['Sofia_Sans',system-ui,sans-serif] antialiased"
        style={{ background: "#F4F4F2" }}
      >
        {children}
      </body>
    </html>
  );
}
