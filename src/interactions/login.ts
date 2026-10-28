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
    const payload = jwtToken
      .split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const decodedToken = JSON.parse(window.atob(payload));
    if (decodedToken && decodedToken.locale) {
      document.cookie = `BBLocale=${decodedToken.locale};path=/`;
    }

    const d = new Date(0);
    const e = d.toUTCString();
    document.cookie = `betty_jwt=none; expires=${e}; SameSite=Lax; path=/`;

    localStorage.setItem('TOKEN', jwtToken);
    localStorage.setItem('REFRESH_TOKEN', refreshToken);

    const navigate = (redirectUrl?: string): void => {
      if (redirectUrl) {
        window.location.replace(redirectUrl);
      } else {
        // eslint-disable-next-line no-restricted-globals
        history.push(url);
      }
    };

    const oauthState = new URLSearchParams(window.location.search).get(
      'oauth_state',
    );

    if (!oauthState) {
      navigate();
      return;
    }

    fetch(`/api/runtime/${decodedToken.app_uuid}`, {
      body: JSON.stringify({
        operationName: 'ToOAuthCode',
        query:
          'mutation ToOAuthCode($oauthState: String!) { toOAuthCode(oauthState: $oauthState) { redirectUrl } }',
        variables: { oauthState },
      }),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((body) => body?.data?.toOAuthCode?.redirectUrl)
      .catch(() => undefined)
      .then(navigate);
  }
}
