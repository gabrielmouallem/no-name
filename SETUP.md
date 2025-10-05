# Setup Instructions

## ✅ What's Already Done

1. ✅ Prisma ORM installed and configured
2. ✅ Better-auth with Prisma adapter configured
3. ✅ Database schema created (User, Session, Account, Verification tables)
4. ✅ Sentry error monitoring installed and configured
5. ✅ Environment variables template created
6. ✅ Authentication actions and UI components ready

## 🚀 Next Steps (Manual)

### Step 1: Set up Google OAuth (Optional but Recommended)

Follow the detailed guide in **`GOOGLE_OAUTH_SETUP.md`** to:

1. Create a Google Cloud project
2. Configure OAuth consent screen
3. Get your Client ID and Client Secret
4. Add them to `.env`

**Quick version:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable OAuth and get credentials
4. Add to `.env`:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

See **`GOOGLE_OAUTH_SETUP.md`** for detailed step-by-step instructions with screenshots.

### Step 2: Update .env file

Open `.env` and update the `BETTER_AUTH_SECRET`:

```bash
# Generate a secure secret (run ONE of these commands):

# Option 1: Using Better-auth CLI
npx @better-auth/cli secret

# Option 2: Using OpenSSL (if available)
openssl rand -base64 32

# Option 3: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the generated secret and paste it in `.env`:

```env
BETTER_AUTH_SECRET=your-generated-secret-here
```

### Step 3: Verify Database Migration

The database should already be migrated, but verify:

```bash
# Check if migration was applied
npm run db:studio
```

This opens Prisma Studio in your browser. You should see 4 tables:

- User
- Session
- Account
- Verification

### Step 4: Test the Authentication Flow

```bash
# Start the development server
npm run dev
```

Then:

1. Open http://localhost:3000
2. You'll be redirected to `/login`
3. Click "Sign up" and create an account
4. Test sign in/out

### Step 5: Configure Sentry (Optional - for Production)

When you're ready to deploy:

1. Go to https://sentry.io/ and create a free account
2. Create a new Next.js project
3. Copy your DSN from the project settings
4. Add to `.env`:

```env
SENTRY_DSN=https://your-key@o00000.ingest.us.sentry.io/0000000
NEXT_PUBLIC_SENTRY_DSN=https://your-key@o00000.ingest.us.sentry.io/0000000
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-name
SENTRY_AUTH_TOKEN=your-auth-token
```

**Note:** Sentry is optional for local development. The app will work fine without it.

## 📋 Useful Commands

```bash
# Database
npm run db:migrate        # Create new migration
npm run db:push           # Push schema changes without migration
npm run db:studio         # Open Prisma Studio (GUI)
npm run db:generate       # Regenerate Prisma Client

# Development
npm run dev               # Start dev server
npm run build             # Build for production
npm run start             # Start production server
npm run lint              # Run linter
```

## 🔍 Troubleshooting

### "Failed to initialize database adapter"

- Make sure `.env` file exists with `DATABASE_URL` and `BETTER_AUTH_SECRET`
- Run: `npm run db:push` to sync the schema

### Can't sign in/up

- Check browser console for errors
- Open Prisma Studio: `npm run db:studio`
- Verify tables exist and are empty

### Sentry errors

- Sentry is optional for development
- Comment out Sentry imports if you get errors and aren't ready to configure it

## 📚 What's Configured

### Authentication (Better-auth)

- ✅ Email/password authentication
- ✅ Google OAuth login (configured, needs credentials from Google Console)
- ✅ HTTP-only encrypted cookies
- ✅ Session management
- ✅ Prisma adapter for database

### Database (Prisma + SQLite)

- ✅ User accounts
- ✅ Sessions with expiration
- ✅ Multiple auth providers support (accounts table)
- ✅ Email verification support

### Error Monitoring (Sentry)

- ✅ Client-side error tracking
- ✅ Server-side error tracking
- ✅ Edge runtime support
- ✅ Session replay (configurable)
- ✅ Performance monitoring

### UI Components

- ✅ Login page with validation
- ✅ Sign up page with password confirmation
- ✅ Google "Continue with Google" button
- ✅ Protected home page
- ✅ Modern, responsive design
- ✅ Dark mode support

## 🎯 Next Features to Add

After testing the basic auth flow:

- [ ] Email verification
- [ ] Password reset
- [x] Google OAuth (ready - see GOOGLE_OAUTH_SETUP.md)
- [ ] More OAuth providers (GitHub, Discord, Facebook)
- [ ] User profile management
- [ ] Two-factor authentication
- [ ] Rate limiting

## 📖 Documentation Links

- [Better-auth Docs](https://better-auth.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Sentry Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Next.js 15 Docs](https://nextjs.org/docs)
