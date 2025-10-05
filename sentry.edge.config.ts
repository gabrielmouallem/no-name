import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Debug mode: enabled in development, disabled in production
  debug: process.env.NODE_ENV === "development",

  // Automatically capture console errors
  integrations: [
    Sentry.consoleIntegration(),
  ],

  environment: process.env.NODE_ENV,
});