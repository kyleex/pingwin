/**
 * An array of public routes that are accessible to public users.
 * These routes does not require authentication.
 * @type {string[]}
 */

export const publicRoutes = ["/", "/new-verification"];

/**
 * An array of routes use for authentication.
 * These routes redirect logged in users to the home page.
 * @type {string[]}
 */

export const authRoutes = ["/login", "/register"];

/**
 * The prefix for the API authentication routes.
 * Routes that starts with this prefix are used for API authentication purposes.
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in .
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";
