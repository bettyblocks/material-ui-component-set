/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "redirect" }] */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface History {
  push(url: string): string;
}

interface Page {
  name: string;
  resolvePath: (input: Record<string, string>) => string;
  url: string;
}

function redirect({
  event,
  redirectTo,
}: {
  event: Event;
  redirectTo: Page;
}): void {
  let { url } = redirectTo;

  if (
    typeof event === 'object' &&
    event !== null &&
    typeof (event as any).id === 'number'
  ) {
    url = redirectTo.resolvePath(event as any);
  }

  // eslint-disable-next-line no-restricted-globals
  history.push(url);
}
