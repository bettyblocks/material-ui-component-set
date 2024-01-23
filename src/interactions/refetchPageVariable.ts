// @ts-nocheck
interface PageVariableId {
  id: string;
}


function refetchPageVariable({ event, pageVariableId }: { event: Event, pageVariableId: PageVariableId }): void {
  console.log({ pageVariableId });

  debugger;
  const promise = window.pageEmptyApi.endpoints.get12d8a94f6f714ecd8a7ea5fc22e28789.initiate();
  const { refetch } = promise
  console.log({ refetch, promise });
  console.log('fired');


  refetch();
}