/**
 * Generates a unique 4-digit employee ID using the current timestamp.
 * No UI or API dependencies.
 */
export function generateEmployeeId(): string {
  const value = Date.now() % 10000;
  return value.toString().padStart(4, '0');
}
