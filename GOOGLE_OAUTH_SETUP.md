# Google OAuth Setup Guide

## 📋 Overview

This guide will walk you through setting up Google OAuth for your application.

## 🚀 Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Name your project (e.g., "My SaaS App")
4. Click **"Create"**

## 🔑 Step 2: Configure OAuth Consent Screen

1. In the left sidebar, go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** (unless you have Google Workspace)
3. Click **"Create"**

### Fill in the required information:

**App information:**

- App name: `Your App Name`
- User support email: `your-email@example.com`
- App logo: (optional but recommended)

**App domain:**

- Application home page: `http://localhost:3000` (for development)
- Authorized domains: (leave empty for development)

**Developer contact information:**

- Email: `your-email@example.com`

4. Click **"Save and Continue"**
5. On the **Scopes** page, click **"Save and Continue"** (default scopes are fine)
6. On the **Test users** page, click **"Save and Continue"**

## 🎫 Step 3: Create OAuth 2.0 Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ Create Credentials"** → **"OAuth client ID"**
3. Choose **"Web application"**

### Configure the OAuth client:

**Name:** `Web Client` (or any name you prefer)

**Authorized JavaScript origins:**

- Development: `http://localhost:3000`
- Production: `https://yourdomain.com`

**Authorized redirect URIs:**

- Development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://yourdomain.com/api/auth/callback/google`

4. Click **"Create"**

## 📝 Step 4: Copy Credentials

After creating, you'll see a modal with:

- **Client ID**: `xxxxx.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-xxxxx`

**Copy these values!** You'll need them for your `.env` file.

## 🔒 Step 5: Add to Environment Variables

Open your `.env` file and add:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

## ✅ Step 6: Test the Integration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Click **"Continue with Google"**

4. You should see the Google sign-in popup

5. Sign in with your Google account

6. You'll be redirected back to your app and signed in!

## 🌐 Step 7: Production Setup

When deploying to production:

1. Go back to **Google Cloud Console** → **Credentials**
2. Edit your OAuth client
3. Update **Authorized JavaScript origins:**
   - Add: `https://yourdomain.com`
4. Update **Authorized redirect URIs:**
   - Add: `https://yourdomain.com/api/auth/callback/google`
5. Update **OAuth consent screen** with production domains
6. Update `.env` on your production server with the same credentials

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"

- Make sure your redirect URI in Google Console **exactly matches**:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://yourdomain.com/api/auth/callback/google`
- No trailing slashes!
- Check http vs https

### Error: "Access blocked: This app's request is invalid"

- Make sure you've configured the OAuth consent screen
- Add your email as a test user if the app is not published

### Google button not working

- Check browser console for errors
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set in `.env`
- Make sure you restarted the dev server after adding env vars

### "No refresh token"

- The app is already configured with `accessType: "offline"` and `prompt: "select_account consent"`
- This ensures you always get a refresh token

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Better-auth Google Provider Docs](https://www.better-auth.com/docs/authentication/google)
- [OAuth Consent Screen Guide](https://support.google.com/cloud/answer/10311615)

## 🎯 Next Steps

After Google OAuth is working:

- [ ] Add more OAuth providers (GitHub, Discord, etc.)
- [ ] Customize Google account linking
- [ ] Add scopes for additional Google services (Drive, Calendar, etc.)
- [ ] Publish your OAuth consent screen (for production)

## 🔐 Security Notes

- ✅ Client secrets are stored server-side only
- ✅ HTTP-only cookies used for sessions
- ✅ PKCE flow for added security
- ✅ Refresh tokens stored securely in database
- Never commit `.env` file to version control!
