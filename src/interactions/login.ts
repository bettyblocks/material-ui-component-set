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
  if (event) {
    const isValid = event.isValid || false;
    const url = redirectTo.url || location.pathname;

    if (isValid) {
      const { jwtToken, refreshToken } = event;
      localStorage.setItem('TOKEN', jwtToken);
      localStorage.setItem('REFRESH_TOKEN', refreshToken);
      window.location.href = url;
    }
  }
}
