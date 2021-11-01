interface Event {
  isValid: boolean;
  jwtToken: string;
  refreshToken: string;
}

interface Page {
  name: string;
  url: string;
}

interface History {
  push(url: string): string;
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
      document.cookie = `BBLocale=${decodedToken.locale}`;
    }

    localStorage.setItem('TOKEN', jwtToken);
    localStorage.setItem('REFRESH_TOKEN', refreshToken);
    history.push(url);
  }
}
