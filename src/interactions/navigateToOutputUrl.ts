interface History {
  push(url: string): string;
}

function navigateToOutputUrl({ event }: { event: Event }): void {
  if (typeof event !== 'string') {
    console.warn('Event passed to navigateToOutputUrl is not a string');
    return;
  }

  if ((event as string).match(/https?:\/\//)) {
    window.location.href = event;
  }

  if ((event as string).charAt(0) === '/') {
    history.push(event);
  }

  console.warn(
    'Event passed to navigateToOutputUrl is not a valid url or path',
  );
}
