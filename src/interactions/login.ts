interface Event {
  isValid?: boolean;
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
  if (!event?.isValid) return;

  const { jwtToken, refreshToken } = event;
  const { url } = redirectTo;

  localStorage.setItem('TOKEN', jwtToken);
  localStorage.setItem('REFRESH_TOKEN', refreshToken);
  window.location.href = url;
}
