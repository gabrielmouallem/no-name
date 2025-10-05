import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                Welcome back, {session.user.name}!
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {session.user.email}
              </p>
            </div>
            <form action="/api/auth/sign-out" method="POST">
              <Button type="submit" variant="outline">
                Sign out
              </Button>
            </form>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-gray-50">
                Dashboard
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your dashboard content goes here
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-gray-50">
                Settings
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage your account settings
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-gray-50">
                Analytics
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                View your analytics and insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
