/**
 * PostHog refuses to identify or merge these ids (cannot_merge_with_illegal_distinct_id), compared
 * trimmed and case-insensitive. Check before calling identify() with an id that comes from a
 * session, a form or a database row.
 */
const ILLEGAL_DISTINCT_IDS = new Set([
  "",
  "anonymous",
  "guest",
  "distinctid",
  "distinct_id",
  "id",
  "not_authenticated",
  "email",
  "undefined",
  "true",
  "false",
  "[object object]",
  "nan",
  "none",
  "null",
  "0",
]);

export function isLegalDistinctId(id: unknown): id is string {
  return typeof id === "string" && !ILLEGAL_DISTINCT_IDS.has(id.trim().toLowerCase());
}
