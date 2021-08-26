interface Event {
  id: string;
}

interface Page {
  name: string;
  resolvePath: (input: Record<string, string>) => string;
  url: string;
}

function hello(args: { event: Event; page: Page }): void {
  const { event, page } = args;

  const url = page.resolvePath(event as any);

  console.log(url);

  window.location.href = url;
}
