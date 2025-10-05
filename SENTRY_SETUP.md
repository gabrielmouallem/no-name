# Sentry Integration Setup

## 📋 Overview

This project uses **Sentry** for error tracking, performance monitoring, and session replay in production.

## 🗂️ Configuration Files

```
Project Root:
├── sentry.client.config.ts           # Client-side configuration
├── sentry.server.config.ts           # Server-side configuration
├── sentry.edge.config.ts             # Edge runtime configuration
├── instrumentation.ts                # Server/Edge loader (Next.js 13+)
├── next.config.ts                    # withSentryConfig wrapper
└── src/
    ├── components/
    │   └── sentry-client-init.tsx    # Client config loader (Turbopack workaround)
    ├── app/
    │   └── layout.tsx                # Imports SentryClientInit
    └── lib/
        └── logger.ts                 # Enhanced logger with Sentry integration
```

## 🔧 Environment Variables

Required in `.env` or `.env.local`:

```bash
# Sentry DSN (required)
SENTRY_DSN=https://your-key@your-org.ingest.sentry.io/your-project-id
NEXT_PUBLIC_SENTRY_DSN=https://your-key@your-org.ingest.sentry.io/your-project-id

# Optional: For source map uploads
SENTRY_ORG=your-org-name
SENTRY_PROJECT=your-project-name
SENTRY_AUTH_TOKEN=your-auth-token
```

## 🎯 Features Enabled

- ✅ **Error Tracking**: Automatic capture of errors and exceptions
- ✅ **Performance Monitoring**: Transaction and span tracking
- ✅ **Session Replay**: Video recordings of user sessions (production only)
- ✅ **Console Integration**: Automatic capture of console errors
- ✅ **Custom Logger**: Enhanced logger with Sentry integration
- ✅ **Source Maps**: Upload disabled (can enable with auth token)

## 📊 Sampling Rates

### Development:
- Traces: 100% (all transactions tracked)
- Session Replay: 0% (disabled for performance)
- Debug Logs: Enabled

### Production:
- Traces: 10% (sampled)
- Session Replay: 10% (sampled)
- Error Replays: 100% (all errors captured)
- Debug Logs: Disabled

## 🚀 Usage

### Manual Error Capture

```typescript
import * as Sentry from "@sentry/nextjs";

try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: { feature: "user-auth" },
    extra: { userId: "123" },
  });
}
```

### Performance Tracking

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.startSpan(
  {
    op: "ui.click",
    name: "Submit Form",
  },
  (span) => {
    span.setAttribute("form_type", "contact");
    // ... your code
  }
);
```

### Using the Custom Logger

```typescript
import { logger } from "@/lib/logger";

// Automatically sends errors to Sentry
logger.error("Payment failed", { orderId: "123" }, error);
logger.warn("Rate limit approaching", { endpoint: "/api/data" });
logger.info("User logged in", { userId: "123" });
logger.debug("Cache hit", { key: "user:123" });
```

## 📚 Documentation

For detailed examples and patterns, see:
- `.cursor/rules/sentry-monitoring.mdc` - Complete guide with examples
- [Official Sentry Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

## ⚠️ Important Notes

### Turbopack Workaround

The `SentryClientInit` component in `src/components/sentry-client-init.tsx` is required because:
- Turbopack doesn't auto-inject client config via `withSentryConfig`
- This component ensures client-side Sentry loads properly
- If you remove Turbopack (`--turbopack` flag), you can delete this component

### Debug Mode

Debug mode is automatically enabled in development and disabled in production via:
```typescript
debug: process.env.NODE_ENV === "development"
```

## 🧪 Testing

To test Sentry integration:

1. **Trigger a client error**:
   ```javascript
   // In browser console
   throw new Error("Test error");
   ```

2. **Check Sentry Dashboard**:
   - Go to https://sentry.io
   - Navigate to Issues tab
   - Verify error appears

3. **Check Performance**:
   - Navigate to Performance tab
   - Verify transactions are being tracked

## 🔄 Maintenance

### Updating Sentry

```bash
npm update @sentry/nextjs
```

### Rotating DSN

1. Generate new DSN in Sentry project settings
2. Update environment variables
3. Restart application

---

**Setup completed on**: October 5, 2025
**Sentry SDK Version**: @sentry/nextjs v10.17.0
**Next.js Version**: 15.5.4 (Turbopack)
