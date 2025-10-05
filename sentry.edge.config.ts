import * as Sentry from "@sentry/nextjs";
import { isProduction } from "@/lib/utils";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: isProduction() ? 0.1 : 1.0,

  // Debug mode: enabled in development, disabled in production
  debug: !isProduction(),

  // Automatically capture console errors
  integrations: [Sentry.consoleIntegration()],

  environment: process.env.NODE_ENV,
});