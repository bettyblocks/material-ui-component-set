/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "setLanguage" }] */

function setLanguage({ event }: { event: Event }): void {
  if (typeof event !== 'string') {
    return;
  }
  const locale = (event as string).toLowerCase().trim();
  const currentCookies = document.cookie.split('; ');
  const BBLocaleIndex = currentCookies.indexOf(`BBLocale=${locale}`);
  const hasCookie = BBLocaleIndex > -1;
  if (!hasCookie) {
    // check if app is used in an iFrame
    if (window.location !== window.parent.location) {
      document.cookie = `BBLocale=${locale};path=/;SameSite=None;Secure`;
    } else {
      document.cookie = `BBLocale=${locale};path=/`;
    }
    window.location.reload();
  }
}
