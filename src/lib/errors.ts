import { ZodError } from "zod";

export function getUserMessage(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues[0]?.message || "Please check your input.";
  }
  return "Something went wrong. Please try again.";
}

export function getFieldErrors(
  error: unknown
): Record<string, string> | null {
  if (!(error instanceof ZodError)) return null;
  return error.issues.reduce(
    (acc: Record<string, string>, err) => {
      const path = err.path.join(".");
      acc[path] = err.message;
      return acc;
    },
    {} as Record<string, string>
  );
}
