(() => ({
  name: 'detailViewVertical',
  type: 'BODY_COMPONENT',
  allowedTypes: ['STEP_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { GetOne, env, getIdProperty, Children } = B;
    const { model, filter, currentRecord, title } = options;

    const isDev = env === 'dev';
    const [, setOptions] = useOptions();

    const getFilter = React.useCallback(() => {
      if (isDev || !currentRecord || !model) {
        return filter;
      }
      const idProperty = getIdProperty(model);

      return {
        [idProperty.id]: { eq: currentRecord },
      };
    }, [isDev, filter, currentRecord, model]);

    const selectedFilter = getFilter();

    B.defineFunction('setCurrentRecord', value => {
      const id = Number(value);
      if (typeof id === 'number') {
        setOptions({
          currentRecord: id,
        });
      }
    });

    const Header = () => <h3>{title}</h3>;

    const Table = () => (
      <>
        <Header />
        <table>
          <GetOne modelId={model} filter={selectedFilter}>
            {({ loading, error, data, refetch }) => {
              if (!loading && data && data.id) {
                B.triggerEvent('onSuccess', data);
              } else {
                B.triggerEvent('onNoResults');
              }

              if (error) {
                B.triggerEvent('onError', error.message);
              }

              B.defineFunction('Refetch', () => {
                refetch();
              });

              return <Children data={data}>{children}</Children>;
            }}
          </GetOne>
        </table>
      </>
    );

    return (
      <div className={classes.root}>
        <Table />
      </div>
    );
  })(),
  styles: B => t => {
    const { mediaMinWidth, Styling } = B;
    const newStyling = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : newStyling.getSpacing(idx, device);
    return {
      root: {
        paddingTop: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[0]),
        paddingRight: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[1]),
        paddingBottom: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[2]),
        paddingLeft: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Portrait'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Portrait'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Portrait'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Landscape'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Landscape'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Landscape'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Desktop'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Desktop'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Desktop'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Desktop'),
        },
      },
    };
  },
}))();
