import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Check if code is running on the client side (browser)
 * @returns true if running in browser, false if on server
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Check if code is running on the server side
 * @returns true if running on server, false if in browser
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Check if running in production environment
 * @returns true if NODE_ENV is production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Safely execute a function only on the client side and check if the result exists
 * @param getter - Function that returns the value to check
 * @returns The value if on client and it exists, undefined otherwise
 * 
 * @example
 * ```typescript
 * // Check if property exists on client
 * const integration = clientOnly(() => Sentry.replayIntegration);
 * 
 * // Use with optional chaining
 * const value = clientOnly(() => window.myGlobal?.someProperty);
 * 
 * // Use in conditional
 * if (clientOnly(() => window.analytics)) {
 *   window.analytics.track('event');
 * }
 * ```
 */
export function clientOnly<T>(getter: () => T | undefined): T | undefined {
  if (!isClient()) return undefined;
  
  try {
    const value = getter();
    return value ?? undefined;
  } catch {
    return undefined;
  }
}

/**
 * Execute a callback only on the client side, useful for side effects
 * @param callback - Function to execute on client
 * @returns The result of the callback if on client, undefined otherwise
 * 
 * @example
 * ```typescript
 * // Execute side effect only on client
 * onClient(() => {
 *   localStorage.setItem('key', 'value');
 * });
 * 
 * // Get a value only on client
 * const stored = onClient(() => localStorage.getItem('key'));
 * ```
 */
export function onClient<T>(callback: () => T): T | undefined {
  return isClient() ? callback() : undefined;
}

/**
 * Functional composition helper - executes functions left to right (pipe)
 * @param fns - Functions to compose
 * @returns Composed function
 * 
 * @example
 * ```typescript
 * const getAnalytics = pipe(
 *   () => window.analytics,
 *   (analytics) => analytics?.initialize()
 * );
 * ```
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduce((result, fn) => fn(result), arg);
}

/**
 * Check if value exists (not null, undefined, or false)
 * @param value - Value to check
 * @returns The value if it exists, undefined otherwise
 * 
 * @example
 * ```typescript
 * const value = exists(window.myGlobal);
 * ```
 */
export function exists<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined;
}

/**
 * Higher-order function: only execute getter if condition is true
 * @param condition - Boolean or function that returns boolean
 * @param getter - Function to execute if condition is true
 * @returns The result if condition is true, undefined otherwise
 * 
 * @example
 * ```typescript
 * const integration = when(
 *   isClient(),
 *   () => Sentry.replayIntegration
 * );
 * ```
 */
export function when<T>(
  condition: boolean | (() => boolean),
  getter: () => T
): T | undefined {
  const shouldExecute = typeof condition === "function" ? condition() : condition;
  return shouldExecute ? getter() : undefined;
}

/**
 * Type for predicate functions (functions that return boolean)
 */
type Predicate = () => boolean;

/**
 * Generic safe value getter with composable predicates
 * Returns value wrapped in array for easy spreading, or empty array
 * @param predicates - One or more conditions that must all be true
 * @param getter - Function that returns the value
 * @returns Array with value if all predicates pass and value exists, empty array otherwise
 * 
 * @example
 * ```typescript
 * // Simple client check
 * integrations: [
 *   ...maybe(isClient, () => Sentry.replayIntegration?.({ ... })),
 * ]
 * 
 * // Multiple conditions
 * const config = maybe(
 *   isClient,
 *   () => !isProduction(),
 *   () => window.debugConfig
 * );
 * 
 * // Custom predicates
 * integrations: [
 *   ...maybe(
 *     isClient,
 *     () => !!Sentry.replayIntegration,
 *     () => Sentry.replayIntegration({ ... })
 *   ),
 * ]
 * ```
 */
export function maybe<T>(
  ...args: [...Predicate[], () => T | undefined]
): T[] {
  // Last argument is the getter, rest are predicates
  const getter = args[args.length - 1] as () => T | undefined;
  const predicates = args.slice(0, -1) as Predicate[];
  
  // Check all predicates
  for (const predicate of predicates) {
    try {
      if (!predicate()) return [];
    } catch {
      return [];
    }
  }
  
  // Execute getter
  try {
    const value = getter();
    return value !== undefined && value !== null ? [value] : [];
  } catch {
    return [];
  }
}

/**
 * Convenience wrapper for client-side only values
 * @param getter - Function that returns the value
 * @returns Array with value if on client and exists, empty array otherwise
 * 
 * @example
 * ```typescript
 * integrations: [
 *   ...maybeClient(() => Sentry.replayIntegration?.({ ... })),
 * ]
 * ```
 */
export function maybeClient<T>(getter: () => T | undefined): T[] {
  return maybe(isClient, getter);
}