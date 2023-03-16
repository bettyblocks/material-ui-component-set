function cursorToPointer({ event }: { event: Event }): void {
  (event.target as HTMLAnchorElement).style.cursor = 'pointer';
}
