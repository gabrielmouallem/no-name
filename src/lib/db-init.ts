import { auth } from "./auth";

/**
 * Initialize the Better Auth database tables
 * Run this once to set up the authentication tables
 */
export async function initDatabase() {
  try {
    console.log("Initializing Better Auth database...");
    
    // Better Auth will automatically create tables on first request
    // This is just a helper to trigger the initialization
    await auth.api.getSession({
      headers: new Headers(),
    });
    
    console.log("Database initialized successfully!");
    return true;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    return false;
  }
}
