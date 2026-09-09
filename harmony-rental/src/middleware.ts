import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude API routes, Next internals, /stay (locale-free token-gated pages), and files with an extension.
  matcher: ["/((?!api|_next|stay|.*\\..*).*)"],
};
