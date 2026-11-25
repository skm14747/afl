import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col items-center justify-center antialiased"
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#0d0712",
          color: "#f5f0eb",
        }}
      >
        <div className="text-center px-6 max-w-lg">
          <p
            className="text-6xl font-light mb-4"
            style={{ color: "#b52d52" }}
          >
            404
          </p>
          <h1 className="text-2xl font-medium mb-3">
            Page not found
          </h1>
          <p className="text-sm mb-8" style={{ color: "#a0a0a0" }}>
            The page you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ background: "#b52d52" }}
          >
            ← Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
