/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "setCurrentRecord" }] */

function setCurrentRecord({
  argument,
}: {
  event: Event;
  argument: number;
}): number {
  return argument;
}
