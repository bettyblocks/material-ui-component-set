/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "refetchPageVariable" }] */

interface PageVariableId {
  id: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function refetchPageVariable({
  event,
  pageVariableId,
}: {
  event: Event;
  pageVariableId: PageVariableId;
}): void {
  // @ts-ignore
  const promise = window.dispatcher(
    // @ts-ignore
    window.pageEmptyApi.endpoints[`get${pageVariableId}`].initiate(),
  );
  const { refetch } = promise;

  refetch();
}
