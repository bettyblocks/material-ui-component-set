(() => ({
  name: 'CustomDataContainer',
  type: 'BODY_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const { model, currentRecord } = options;

        if (B.isDev) return <span>press play dummy</span>;

        if (!currentRecord) return <span>no current record</span>;

        console.log('THINGS', { model, currentRecord });

        return (
          <B.GetAll modelId={model} filter={currentRecord}>
            {({ loading, error, data }) => <div>{JSON.stringify(data)}</div>}
          </B.GetAll>
        );
      })()}
    </div>
  ),
  styles: () => () => ({}),
}))();
