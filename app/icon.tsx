import { ImageResponse } from "next/og";

import { theme } from "@/lib/theme";
import { site } from "@/content/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Browser tab icon. TODO [§9] — replace with the club mark once sourced. */
export default function Icon() {
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
        fontSize: 40,
        fontWeight: 800,
      }}
    >
      {site.abbreviation.charAt(0)}
    </div>,
    size,
  );
}
