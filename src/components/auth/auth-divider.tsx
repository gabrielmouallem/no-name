export function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-4 text-neutral-500 dark:bg-[#111111] dark:text-neutral-400">
          Or continue with
        </span>
      </div>
    </div>
  );
}
