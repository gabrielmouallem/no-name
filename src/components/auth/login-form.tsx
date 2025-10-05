"use client";

import { useActionState } from "react";
import { signInAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "./google-sign-in-button";
import { AuthDivider } from "./auth-divider";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInAction, {
    success: false,
    error: undefined,
    fieldErrors: null,
  });

  return (
    <div>
      <GoogleSignInButton />
      <div className="space-y-6">
        <AuthDivider />

        <form action={formAction} className="space-y-6">
          {state.error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800 dark:bg-red-900/10 dark:border-red-900/20 dark:text-red-400">
              {state.error}
            </div>
          )}

          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              error={state.fieldErrors?.email}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              error={state.fieldErrors?.password}
              required
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
