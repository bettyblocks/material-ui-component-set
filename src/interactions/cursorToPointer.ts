/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "cursorToPointer" }] */

function cursorToPointer({ event }: { event: Event }): void {
  // eslint-disable-next-line no-param-reassign
  (event.target as HTMLAnchorElement).style.cursor = 'pointer';
}
