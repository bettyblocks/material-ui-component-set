(() => ({
  name: 'Partial',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      {(() => {
        const { env, getPartial } = B;
        const { dataComponentAttribute } = options;
        if (env === 'prod') {
          const { partialReferenceId } = options;

          const partial = getPartial(partialReferenceId);

          if (partial) {
            const { asset } = partial;
            return React.createElement(
              // eslint-disable-next-line
              React.lazy(() => System.import(`./assets/partials/${asset}`)),
              {
                'data-component': dataComponentAttribute || 'Partial',
              },
            );
          }
        }
        return (
          <div
            className={classes.root}
            data-component={dataComponentAttribute || 'Partial'}
          >
            {children}
          </div>
        );
      })()}
    </div>
  ),
  styles: () => () => ({
    root: {
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      width: '100%',
    },
  }),
}))();
