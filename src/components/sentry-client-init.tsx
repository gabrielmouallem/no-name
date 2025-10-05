"use client";

// Initialize Sentry client config (required for Turbopack - withSentryConfig doesn't auto-inject)
// This must be a Client Component because replayIntegration is client-side only
import "@/../sentry.client.config";

export function SentryClientInit() {
  return null;
}
