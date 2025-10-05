import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Debug mode: enabled in development, disabled in production
  debug: process.env.NODE_ENV === "development",

  // Capture 100% of errors with replay
  replaysOnErrorSampleRate: 1.0,

  // Session replay sampling: disabled in dev, 10% in production
  replaysSessionSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  environment: process.env.NODE_ENV,
});