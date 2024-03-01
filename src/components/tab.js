(() => ({
  name: 'Tab',
  type: 'TAB_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Typography, Box } = window.MaterialUI.Core;
    const { env, useText } = B;
    const isDev = env === 'dev';
    const {
      label,
      icon,
      disabled,
      disableRipple,
      iconAlignment,
      dataComponentAttribute,
    } = options;
    const {
      value,
      tabData,
      setTabData,
      showAllTabs,
      setSelectedTab,
      index,
      activeTabs,
      preLoadTabs,
    } = parent;
    const isActive = value === index || showAllTabs;
    const parsedLabel = useText(label);

    const doSetTab = () => {
      setSelectedTab(index);
    };

    B.defineFunction('Select', doSetTab);

    function EmptyBox() {
      if (!isDev) return null;

      return (
        <Box className={classes.empty} p={3}>
          Tab
        </Box>
      );
    }

    const TabPanel = (isActive || !isDev) && (
      <Typography
        component="div"
        role="tabpanel"
        hidden={!isActive}
        aria-labelledby="tabs"
        classes={{ root: classes.root }}
        data-component={useText(dataComponentAttribute) || 'Tab'}
        className={includeStyling()}
      >
        {children.length > 0 &&
        (activeTabs.indexOf(index) !== -1 || showAllTabs || preLoadTabs) ? (
          children
        ) : (
          <EmptyBox />
        )}
      </Typography>
    );

    const labelChanged = () =>
      JSON.stringify(tabData[`label${index}`] || '') !==
      JSON.stringify(parsedLabel);

    const iconChanged = () => tabData[`icon${index}`] !== icon;

    const iconAlignmentChanged = () =>
      tabData[`iconAlignment${index}`] !== iconAlignment;

    const disabledChanged = () => tabData[`disabled${index}`] !== disabled;

    const disabledRippleChanged = () =>
      tabData[`disableRipple${index}`] !== disableRipple;

    const hasChange = () =>
      labelChanged() ||
      iconChanged() ||
      iconAlignmentChanged() ||
      disabledChanged() ||
      disabledRippleChanged();

    useEffect(() => {
      if (setTabData && hasChange()) {
        setTabData({
          ...tabData,
          [`label${index}`]: parsedLabel,
          [`icon${index}`]: icon,
          [`disabled${index}`]: disabled,
          [`disableRipple${index}`]: disableRipple,
          [`iconAlignment${index}`]: iconAlignment,
        });
      }
    }, [
      index,
      setTabData,
      tabData,
      label,
      icon,
      iconAlignment,
      disabled,
      disableRipple,
    ]);

    return isDev ? (
      <div
        className={[classes.root, !isActive ? classes.hidden : ''].join(' ')}
      >
        {TabPanel}
      </div>
    ) : (
      TabPanel
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
