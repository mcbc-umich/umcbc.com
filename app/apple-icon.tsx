import { ImageResponse } from "next/og";

import { theme } from "@/lib/theme";
import { site } from "@/content/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon. TODO [§9] — replace with the club mark once sourced. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.ink,
        color: theme.maize,
        fontSize: 68,
        fontWeight: 800,
        letterSpacing: "-0.02em",
      }}
    >
      {site.abbreviation}
    </div>,
    size,
  );
}
