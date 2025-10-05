# No Name SaaS App

A modern Next.js 15 application with authentication, built with TypeScript and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **React**: 19.1.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4
- **Authentication**: Better-auth
- **Data Fetching**: TanStack React Query
- **Validation**: Zod
- **UI Components**: Ark UI / Park UI

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Generate a secure secret for Better Auth:

```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows (PowerShell):
# Use the generated key and update BETTER_AUTH_SECRET in .env.local
```

5. Update `.env.local` with your configuration values

### Development

1. Initialize the database (first time only):

```bash
npm run db:init
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will automatically redirect you to the login page. Create an account using the sign-up page!

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── api/         # API routes
│   └── ...          # Pages
├── components/       # Reusable components
├── lib/             # Utility functions and configs
├── providers/       # React context providers
├── actions/         # Server Actions
├── types/           # Shared TypeScript types
└── hooks/           # Custom hooks
```

## Authentication

This project uses Better-auth for secure authentication with:

- HTTP-only encrypted cookies
- Email and password authentication
- Session management
- Server-side validation

## Development Guidelines

- Server Components by default
- Client Components only when needed (interactivity, hooks)
- Use kebab-case for file names
- Hooks always in `/hooks` folder as `use-hook-name.ts`
- Follow the workspace rules in `.cursor/rules/`

## License

Private - All rights reserved
