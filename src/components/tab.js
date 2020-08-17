(() => ({
  name: 'Tab',
  type: 'TAB_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Typography, Box } = window.MaterialUI.Core;
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { label, icon, disabled, disableRipple } = options;
    const { value, tabData, setTabData } = parent;
    const isActive = value === index;

    const emptyBox = (
      <Box className={classes.empty} p={3}>
        Tab
      </Box>
    );

    const TabPanel = (isActive || !isDev) && (
      <Typography
        component="div"
        role="tabpanel"
        hidden={!isActive}
        aria-labelledby="tabs"
      >
        {children.length === 0 ? emptyBox : children}
      </Typography>
    );

    const labelChanged = () => {
      const currentLabel = tabData[`label${index}`]
        ? useText(tabData[`label${index}`])
        : '';
      return currentLabel !== useText(label);
    };

    const iconChanged = () => tabData[`icon${index}`] !== icon;

    const disabledChanged = () => tabData[`disabled${index}`] !== disabled;

    const disabledRippleChanged = () =>
      tabData[`disableRipple${index}`] !== disableRipple;

    const hasChange = () =>
      labelChanged() ||
      iconChanged() ||
      disabledChanged() ||
      disabledRippleChanged();

    useEffect(() => {
      if (setTabData && hasChange()) {
        setTabData({
          ...tabData,
          [`label${index}`]: label,
          [`icon${index}`]: icon,
          [`disabled${index}`]: disabled,
          [`disableRipple${index}`]: disableRipple,
        });
      }
    }, [setTabData, tabData, label, icon, disabled, disableRipple]);

    return isDev ? <div>{TabPanel}</div> : TabPanel;
  })(),
  styles: () => () => ({
    empty: {
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
  }),
}))();
