interface Page {
  name: string;
  url: string;
}

interface History {
  push(url: string): string;
}

function logout({
  event,
  redirectTo,
}: {
  event: Event;
  redirectTo: Page;
}): void {
  const { url } = redirectTo;
  localStorage.removeItem('TOKEN');
  localStorage.removeItem('REFRESH_TOKEN');
  if (url) {
    history.push(url);
  }
}
