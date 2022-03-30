declare const artifact: any;

function callAction({ argument }: { argument: string }): void {
  const query = `
    mutation {
      action(id: "${argument}")
    }
  `;

  const req = new Request(`/api/runtime/${artifact.applicationId}`, {
    method: 'POST',
    body: JSON.stringify({
      operationName: null,
      query,
      variables: {},
    }),
    headers: {
      ['content-type']: 'application/json',
    },
  });

  fetch(req);
}
