import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/*
  Content-Security-Policy
  - 'unsafe-inline' (script/style) is required by Next's bootstrap, the inline
    theme script, and Motion's inline styles. 'unsafe-eval' is added in DEV
    only (Turbopack/React-Refresh need it); production omits it.
  - 'wasm-unsafe-eval' future-proofs the 3D pipeline (e.g. Draco/Basis) without
    allowing JS eval.
  - img https: covers Google review avatars + map tiles; frame google.com is
    the Maps embed; connect ws: is the dev HMR socket.
*/
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' https://places.googleapis.com${isDev ? " ws: http://localhost:*" : ""}`,
  "frame-src https://www.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
