interface Page {
  name: string;
  url: string;
}

function redirect({ redirectTo }: { redirectTo: Page }): void {
  const { url } = redirectTo;

  window.location.href = url;
}
