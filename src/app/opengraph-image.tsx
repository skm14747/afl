import { ImageResponse } from "next/og";

export const alt = "AstrologyForLove — Free Zodiac Compatibility Calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          background: "linear-gradient(135deg, #27101F 0%, #310D25 30%, #54152F 60%, #310D25 100%)",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Pink nebula glow */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(228,93,145,0.20) 0%, transparent 70%)",
            top: "10%",
            left: "30%",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(242,169,196,0.12) 0%, transparent 70%)",
            bottom: "5%",
            right: "15%",
            display: "flex",
          }}
        />

        {/* Stars */}
        {[
          { x: 100, y: 80, s: 3 },
          { x: 300, y: 150, s: 2 },
          { x: 500, y: 60, s: 3 },
          { x: 750, y: 200, s: 2 },
          { x: 900, y: 100, s: 3 },
          { x: 1050, y: 180, s: 2 },
          { x: 200, y: 400, s: 2 },
          { x: 400, y: 500, s: 3 },
          { x: 700, y: 450, s: 2 },
          { x: 950, y: 520, s: 2 },
          { x: 150, y: 250, s: 2 },
          { x: 850, y: 350, s: 3 },
        ].map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: star.x,
              top: star.y,
              width: star.s,
              height: star.s,
              borderRadius: "50%",
              background: "rgba(242,169,196,0.6)",
            }}
          />
        ))}

        {/* Heart icon */}
        <div
          style={{
            fontSize: 48,
            marginBottom: 24,
            color: "#E45D91",
            display: "flex",
          }}
        >
          ♥
        </div>

        {/* Brand */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            color: "#FFF5F5",
            letterSpacing: "-0.02em",
            marginBottom: 16,
            display: "flex",
          }}
        >
          AstrologyForLove
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#E45D91",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: 32,
            display: "flex",
          }}
        >
          Written in the Stars. Felt in the Heart.
        </div>

        {/* Divider */}
        <div
          style={{
            width: 120,
            height: 1,
            background: "linear-gradient(90deg, transparent, #E45D91, transparent)",
            marginBottom: 28,
            display: "flex",
          }}
        />

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 40,
            color: "#F2A9C4",
            fontSize: 18,
          }}
        >
          <span style={{ display: "flex" }}>♀ Venus Signs</span>
          <span style={{ display: "flex" }}>☽ Moon Phases</span>
          <span style={{ display: "flex" }}>☿ Synastry Charts</span>
          <span style={{ display: "flex" }}>♂ Mars Chemistry</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
