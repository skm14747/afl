import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #310D25 0%, #54152F 50%, #B52D52 100%)",
          borderRadius: "36px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle nebula glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: "70%",
            height: "70%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(228,93,145,0.25) 0%, transparent 70%)",
          }}
        />
        {/* Heart shape */}
        <svg
          width="100"
          height="90"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#E45D91"
          />
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="url(#ahg)"
          />
          {/* Highlight shimmer */}
          <ellipse cx="8.5" cy="7.5" rx="3" ry="2.5" fill="white" opacity="0.15" />
          <defs>
            <linearGradient id="ahg" x1="2" y1="3" x2="22" y2="21">
              <stop offset="0%" stopColor="#F2A9C4" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#DDA5A0" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#E45D91" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    { ...size }
  );
}
