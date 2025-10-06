import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12 dark:bg-neutral-900/50">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Placeholder */}
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 text-2xl font-bold text-white shadow-lg dark:bg-primary-500 dark:text-black">
            S
          </div>
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Welcome back
          </h1>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm border border-neutral-200 dark:bg-neutral-950/50 dark:border-neutral-700">
          <LoginForm />
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-600 dark:text-primary-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
