/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "cursorToPointer" }] */

function cursorToPointer({ event }: { event: unknown }): void {
  function isEventType(unknownEvent: any): unknownEvent is Event {
    return 'target' in unknownEvent;
  }
  if (isEventType(event)) {
    // eslint-disable-next-line no-param-reassign
    (event.target as HTMLAnchorElement).style.cursor = 'pointer';
  }
}
