import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  devIndicators: false,

  /*
    Security headers.

    Content-Security-Policy is intentionally NOT set here yet: Next.js injects
    inline bootstrap scripts, so a CSP without a per-request nonce will break the
    app. Before launch, add middleware that generates a nonce and sets:

      default-src 'self';
      img-src 'self' data: blob:;
      script-src 'self' 'nonce-<generated>' 'strict-dynamic';
      style-src 'self' 'unsafe-inline';
      font-src 'self';
      connect-src 'self';
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';

    See .claude/skills/security-protocol/SKILL.md.
  */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

