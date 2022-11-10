(() => ({
  name: 'switchCase',
  type: 'CASE_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { switchCase, compare, defaultCase, dataComponentAttribute } =
      options;
    const {
      index,
      value,
      showAllCases,
      defaultActive,
      evalShowDefault,
      variable,
    } = parent;

    const leftValue = !isDev && useText(variable);
    const rightValue = !isDev && useText(switchCase);
    const evalDev = () => showAllCases || value === index;

    const evalCondition = () => {
      if (defaultCase) {
        return defaultActive;
      }

      const leftAsNumber = parseFloat(leftValue);
      const rightAsNumber = parseFloat(rightValue);

      if (leftValue === '' && rightValue === '') {
        return false;
      }

      switch (compare) {
        case 'neq':
          return leftValue !== rightValue;
        case 'contains':
          return leftValue.indexOf(rightValue) > -1;
        case 'notcontains':
          return leftValue.indexOf(rightValue) < 0;
        case 'gt':
          return leftAsNumber > rightAsNumber;
        case 'lt':
          return leftAsNumber < rightAsNumber;
        case 'gteq':
          return leftAsNumber >= rightAsNumber;
        case 'lteq':
          return leftAsNumber <= rightAsNumber;
        default:
          return leftValue === rightValue;
      }
    };

    const isActive = isDev ? evalDev() : evalCondition();

    useEffect(() => {
      if (!isDev) {
        evalShowDefault({
          index,
          isActive: defaultCase ? false : isActive,
          defaultCase,
        });
      }
    });

    function EmptyBox() {
      if (!isDev) {
        return null;
      }

      return <div className={classes.empty}>Case</div>;
    }

    const CasePanel =
      (isActive || !isDev) &&
      (children.length > 0 && isActive ? <>{children}</> : <EmptyBox />);

    return isDev ? (
      <div
        className={[classes.root, !isActive ? classes.hidden : ''].join(' ')}
        data-component={useText(dataComponentAttribute) || 'Case'}
      >
        {CasePanel}
      </div>
    ) : (
      CasePanel
    );
  })(),
  styles: (B) => () => {
    const { env } = B;
    const isDev = env === 'dev';

    return {
      hidden: {
        display: 'none',
      },
      root: {
        height: ({ options: { height } }) => (isDev ? '100%' : height),
        width: ({ options: { width } }) => (isDev ? '100%' : width),
      },
      empty: {
        height: '100%',
        width: '100%',
        display: 'flex',
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
