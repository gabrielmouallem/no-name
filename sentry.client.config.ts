import * as Sentry from "@sentry/nextjs";
import { isClient, isProduction, maybe } from "@/lib/utils";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: isProduction() ? 0.1 : 1.0,

  // Debug mode: enabled in development, disabled in production
  debug: !isProduction(),

  // Capture 100% of errors with replay
  replaysOnErrorSampleRate: 1.0,

  // Session replay sampling: disabled in dev, 10% in production
  replaysSessionSampleRate: isProduction() ? 0.1 : 0,

  integrations: [
    ...maybe(
      isClient,
      () => Sentry.replayIntegration?.({
        maskAllText: true,
        blockAllMedia: true,
      })
    ),
  ],

  environment: process.env.NODE_ENV,
});