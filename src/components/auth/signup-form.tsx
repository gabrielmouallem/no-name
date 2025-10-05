"use client";

import { useActionState } from "react";
import { signUpAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "./google-sign-in-button";
import { AuthDivider } from "./auth-divider";

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, {
    success: false,
    error: undefined,
    fieldErrors: null,
  });

  return (
    <div className="space-y-6">
      <GoogleSignInButton />

      <AuthDivider />

      <form action={formAction} className="space-y-6">
        {state.error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/10 dark:text-red-400">
            {state.error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            error={state.fieldErrors?.name}
            required
          />
        </div>

        <div className="space-y-2">
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

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            error={state.fieldErrors?.password}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            error={state.fieldErrors?.confirmPassword}
            required
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </div>
  );
}
