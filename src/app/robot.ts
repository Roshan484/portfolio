/**
 * Checks if a given route is allowed.
 * All routes are allowed except 'roshan_dasboard'.
 *
 * @param route - The route to check
 * @returns true if allowed, false otherwise
 */
export function isRouteAllowed(route: string): boolean {
  return route !== "roshan_dashboard";
}

export default isRouteAllowed;
