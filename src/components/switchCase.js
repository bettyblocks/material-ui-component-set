(() => ({
  name: 'switchCase',
  type: 'CASE_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Typography, Box } = window.MaterialUI.Core;
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { switchCase, compare, dataComponentAttribute } = options;
    const { value, showAllCases, variable } = parent;

    // eslint-disable-next-line no-debugger
    debugger;
    const leftValue = !isDev && useText(variable);
    const rightValue = !isDev && useText(switchCase);

    const evalCondition = () => {
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

    const isActive = isDev ? showAllCases || value === index : evalCondition();

    function EmptyBox() {
      if (!isDev) return null;

      return (
        <Box className={classes.empty} p={3}>
          Case
        </Box>
      );
    }

    const CasePanel = (isActive || !isDev) && (
      <Typography
        component="div"
        role="tabpanel"
        hidden={!isActive}
        aria-labelledby="tabs"
        classes={{ root: classes.root }}
        data-component={useText(dataComponentAttribute) || 'Case'}
      >
        {children.length > 0 && isActive ? children : <EmptyBox />}
      </Typography>
    );

    return isDev ? (
      <div
        className={[classes.root, !isActive ? classes.hidden : ''].join(' ')}
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
      wrapper: {
        height: ({ options: { height } }) => height,
        width: ({ options: { width } }) => width,
      },
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
