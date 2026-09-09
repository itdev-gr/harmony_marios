import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { redirects } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  redirects,
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
