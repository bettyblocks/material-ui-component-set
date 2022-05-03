/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "navigateToOutputUrl" }] */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface History {
  push(url: string): string;
}

function navigateToOutputUrl({ event }: { event: Event }): void {
  if (typeof event !== 'string') {
    // eslint-disable-next-line no-console
    console.warn('Event passed to navigateToOutputUrl is not a string');
    return;
  }

  if ((event as string).match(/https?:\/\//)) {
    window.location.href = event;
  }

  if ((event as string).charAt(0) === '/') {
    // eslint-disable-next-line no-restricted-globals
    history.push(event);
  }

  // eslint-disable-next-line no-console
  console.warn(
    'Event passed to navigateToOutputUrl is not a valid url or path',
  );
}
