/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "logout" }] */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface History {
  push(url: string): string;
}

interface Page {
  name: string;
  url: string;
}

function logout({ redirectTo }: { event: Event; redirectTo: Page }): void {
  const { url } = redirectTo;
  localStorage.removeItem('TOKEN');
  localStorage.removeItem('REFRESH_TOKEN');
  if (url) {
    // eslint-disable-next-line no-restricted-globals
    history.push(url);
  }
}
