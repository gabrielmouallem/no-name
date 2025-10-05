export function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-4 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
          Or continue with
        </span>
      </div>
    </div>
  );
}
