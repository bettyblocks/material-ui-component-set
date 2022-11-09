(() => ({
  name: 'switch',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CASE_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Children, env, useText } = B;
    const {
      variable,
      activeDesignIndex,
      showAllCases,
      dataComponentAttribute,
    } = options;

    // eslint-disable-next-line no-debugger
    debugger;

    const isDev = env === 'dev';
    const currentCase = isDev ? activeDesignIndex : variable;
    const [value, setValue] = useState(parseInt(currentCase - 1, 10) || 0);
    useEffect(() => {
      if (isDev) {
        setValue(parseInt(currentCase - 1, 10));
      }
    }, [isDev, currentCase]);

    const Switch = (
      <div
        className={classes.cases}
        data-component={useText(dataComponentAttribute) || 'Switch'}
      >
        {React.Children.map(
          children,
          (child, index) => {
            const { options: childOptions = {} } = child.props || {};
            return (
              <Children
                index={index}
                value={value}
                variable={variable}
                showAllCases={showAllCases}
              >
                {React.cloneElement(child, { ...childOptions })}
              </Children>
            );
          },
          {},
        )}
      </div>
    );
    return isDev ? (
      <div
        className={[
          classes.wrapper,
          children.length === 0 && classes.empty,
        ].join(' ')}
      >
        {children.length === 0 ? 'Switch' : Switch}
      </div>
    ) : (
      Switch
    );
  })(),
  styles: (B) => () => {
    const { env } = B;
    const isDev = env === 'dev';

    return {
      wrapper: {
        height: ({ options: { height } }) => height,
        width: ({ options: { width } }) => width,
        '& .MuiCases-flexContainer > button': {
          pointerEvents: 'none',
        },
      },
      cases: {
        display: 'flex',
        flexDirection: 'column',
        height: ({ options: { height } }) => (isDev ? '100%' : height),
        width: ({ options: { width } }) => (isDev ? '100%' : width),
      },
      empty: {
        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '4rem',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();
