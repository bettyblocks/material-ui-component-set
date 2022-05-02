declare interface Page {
  name: string;
  url: string;
}

// This is added here, because it is needed in the interactions folder. We use `history` as a global there. This should probably be setup in a better way.
interface History {
  push(url: string): string;
}
