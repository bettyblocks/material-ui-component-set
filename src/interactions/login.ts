/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "login" }] */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface History {
  push(url: string): string;
}

interface Event {
  isValid: boolean;
  jwtToken: string;
  refreshToken: string;
}

interface Page {
  name: string;
  url: string;
}

function login({
  event,
  redirectTo,
}: {
  event: Event;
  redirectTo: Page;
}): void {
  const { isValid, jwtToken, refreshToken } = event;
  const { url } = redirectTo;

  if (isValid) {
    const decodedToken = JSON.parse(window.atob(jwtToken.split('.')[1]));
    if (decodedToken && decodedToken.locale) {
      document.cookie = `BBLocale=${decodedToken.locale};path=/`;
    }

    const d = new Date(0);
    const e = d.toUTCString();
    document.cookie = `betty_jwt=none; expires=${e}; SameSite=Lax`;

    localStorage.setItem('TOKEN', jwtToken);
    localStorage.setItem('REFRESH_TOKEN', refreshToken);
    // eslint-disable-next-line no-restricted-globals
    history.push(url);
  }
}
