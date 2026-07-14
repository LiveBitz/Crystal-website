import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdf3f5 0%, #fae6ea 50%, #f3cdd6 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 80,
            width: 28,
            height: 28,
            background: "#d9afa0",
            transform: "rotate(45deg)",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 72,
            right: 80,
            width: 28,
            height: 28,
            background: "#d9afa0",
            transform: "rotate(45deg)",
            borderRadius: 4,
          }}
        />

        <div
          style={{
            display: "flex",
            padding: "10px 28px",
            borderRadius: 999,
            border: "2px solid #b98776",
            color: "#3a1f3d",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Genuine Crystal Bracelets
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 128,
            fontWeight: 700,
            color: "#3a1f3d",
            fontFamily: "serif",
            letterSpacing: -2,
          }}
        >
          {SITE_NAME}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            color: "#b87a88",
            letterSpacing: 2,
          }}
        >
          Ancient Wisdom, Modern Living
        </div>
      </div>
    ),
    { ...size },
  );
}
