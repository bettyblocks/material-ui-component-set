/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "refetchPageVariable" }] */

interface PageVariableId {
  id: string;
}
function refetchPageVariable({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  event,
  pageVariableId,
}: {
  event: Event;
  pageVariableId: PageVariableId;
}): void {
  (<any>window).refetchPageVariable(pageVariableId);
}
