function setLanguage({ event }: { event: Event }): void {
  if (typeof event !== 'string') {
    return;
  }
  const locale = (event as string).toLowerCase().trim();
  const currentCookies = document.cookie.split('; ');
  const BBLocaleIndex = currentCookies.indexOf(`BBLocale=${locale}`);
  const hasCookie = BBLocaleIndex > -1;
  if (!hasCookie) {
    document.cookie = `BBLocale = ${locale}`;
    window.location.reload();
  }
}
