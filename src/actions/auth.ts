"use server";

import { auth } from "@/lib/auth";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";
import { getFieldErrors, getUserMessage } from "@/lib/errors";
import { redirect } from "next/navigation";
import { logger } from "@/lib/logger";

export type AuthActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string> | null;
};

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validated = signInSchema.parse(rawData);

    // Better-auth handles cookies automatically
    await auth.api.signInEmail({
      body: validated,
    });

    logger.info("User signed in", { email: validated.email });

    // Redirect on success
    redirect("/");
  } catch (error) {
    const fieldErrors = getFieldErrors(error);
    if (fieldErrors) {
      return {
        success: false,
        fieldErrors,
      };
    }

    logger.error(
      "Sign in failed",
      { email: formData.get("email") },
      error instanceof Error ? error : undefined
    );

    return {
      success: false,
      error: getUserMessage(error),
    };
  }
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validated = signUpSchema.parse(rawData);

    // Better-auth handles cookies automatically
    await auth.api.signUpEmail({
      body: {
        name: validated.name,
        email: validated.email,
        password: validated.password,
      },
    });

    logger.info("User signed up", {
      email: validated.email,
      name: validated.name,
    });

    // Redirect on success
    redirect("/");
  } catch (error) {
    const fieldErrors = getFieldErrors(error);
    if (fieldErrors) {
      return {
        success: false,
        fieldErrors,
      };
    }

    logger.error(
      "Sign up failed",
      { email: formData.get("email"), name: formData.get("name") },
      error instanceof Error ? error : undefined
    );

    return {
      success: false,
      error: getUserMessage(error),
    };
  }
}
