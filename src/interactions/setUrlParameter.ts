/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "setUrlParameter" }] */

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
  if (typeof event === 'string' || typeof event === 'number') {
    const eventTypeCasted = event as string | number;
    const href = new URL(window.location.href);
    const search =
      typeof eventTypeCasted === 'string'
        ? eventTypeCasted.toLowerCase().trim()
        : eventTypeCasted.toString();

    href.searchParams.set(paramName, search);

    // eslint-disable-next-line no-restricted-globals
    history.push(href.search);
  }
}
