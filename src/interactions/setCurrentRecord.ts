/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "setCurrentRecord" }] */

function setCurrentRecord({
  argument,
}: {
  event: unknown;
  argument: number;
}): number {
  return argument;
}
