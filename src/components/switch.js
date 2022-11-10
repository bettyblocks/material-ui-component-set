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

    const isDev = env === 'dev';
    const currentCase = isDev ? activeDesignIndex : variable;
    const [value, setValue] = useState(parseInt(currentCase - 1, 10) || 0);
    const [defaultActive, setDefaultActive] = useState(false);

    useEffect(() => {
      if (isDev) {
        setValue(parseInt(currentCase - 1, 10));
      }
    }, [isDev, currentCase]);

    let cases = [];
    const casesContain = (prop) =>
      cases.findIndex((item) => item && item[prop] === true) !== -1;

    const evalShowDefault = ({ index, isActive, defaultCase }) => {
      const caseIndex = cases.findIndex((item) => item && item.index === index);
      if (caseIndex === -1) {
        cases = [...cases, { index, isActive, defaultCase }];
      } else {
        cases[caseIndex] = { index, isActive, defaultCase };
      }

      const hasDefault = casesContain('defaultCase');
      const casesMatchChildren = cases.length === children.length;
      const hasActive = casesMatchChildren && casesContain('isActive');

      setDefaultActive(hasDefault && !hasActive);
    };

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
                defaultActive={defaultActive}
                evalShowDefault={evalShowDefault}
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
