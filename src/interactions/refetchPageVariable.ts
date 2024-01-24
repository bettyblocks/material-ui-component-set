/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "refetchPageVariable" }] */

interface PageVariableId {
  id: string;
}


function refetchPageVariable({
  event,
  pageVariableId
}: {
  event: Event,
  pageVariableId: PageVariableId
}): void {
  // @ts-ignore
  const promise = window.dispatcher(window.pageEmptyApi.endpoints[`get${pageVariableId}`].initiate());
  const { refetch } = promise;

  refetch();
}