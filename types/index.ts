/** Generic server-action result discriminated union. */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
