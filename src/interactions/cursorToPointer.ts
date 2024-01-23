/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "cursorToPointer" }] */

function isEventType(event: any): event is Event {
  return 'target' in event;
}

function cursorToPointer({ event }: { event: unknown }): void {
  if (isEventType(event)) {
    // eslint-disable-next-line no-param-reassign
    (event.target as HTMLAnchorElement).style.cursor = 'pointer';
  }
}
