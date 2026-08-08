import { ImageResponse } from "next/og";

import { theme } from "@/lib/theme";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.parentOrganization}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time by Next's built-in ImageResponse, so the card stays
 * in step with content/site.ts rather than being a stale exported PNG.
 *
 * TODO [§9] — swap the wordmark for the club logo once an SVG exists.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: theme.ink,
        padding: 80,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: 96, height: 8, backgroundColor: theme.maize }} />
        <div
          style={{
            marginTop: 40,
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: theme.paper,
          }}
        >
          {site.abbreviation}
        </div>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column", color: theme.paper }}
      >
        <div style={{ fontSize: 44, fontWeight: 700 }}>{site.name}</div>
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {`${site.parentOrganization} · ${site.location}`}
        </div>
      </div>
    </div>,
    size,
  );
}
