/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "setUrlParam" }] */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface History {
  push(url: string): string;
}

function setUrlParameter({
  event,
  paramName,
}: {
  event: Event;
  paramName: string;
}): void {
  if (typeof event !== 'string') {
    return;
  }
  const search = (event as string).toLowerCase().trim();
  const href = new URL(window.location.href);
  href.searchParams.set(paramName, search);
  // eslint-disable-next-line no-restricted-globals
  history.push(href.search);
}
