(() => ({
  name: 'BottomNavigation',
  type: 'BODY_COMPONENT',
  allowedTypes: ['BOT_NAV_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { BottomNavigation } = window.MaterialUI.Core;
    const { env, Children } = B;
    const {
      defaultValue,
      activeIconColor,
      activeLabelColor,
      activeBackgroundColor,
      inactiveIconColor,
      inactiveLabelColor,
      inactiveBackgroundColor,
    } = options;
    const isDev = env === 'dev';
    const [value, setValue] = useState(parseInt(defaultValue - 1, 10) || 0);

    const handleChange = (_, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      if (isDev) {
        setValue(parseInt(defaultValue - 1, 10));
      }
    }, [isDev, defaultValue]);

    const bottomNavComponent = (
      <div className={[isDev ? classes.dev : '', classes.root].join(' ')}>
        <BottomNavigation onChange={handleChange} value={value}>
          {React.Children.map(children, (child, index) => (
            <Children
              index={index}
              value={value}
              activeIconColor={activeIconColor}
              activeLabelColor={activeLabelColor}
              activeBackgroundColor={activeBackgroundColor}
              inactiveIconColor={inactiveIconColor}
              inactiveLabelColor={inactiveLabelColor}
              inactiveBackgroundColor={inactiveBackgroundColor}
              maxChild={children.length <= 3}
            >
              {child}
            </Children>
          ))}
        </BottomNavigation>
      </div>
    );

    return isDev ? (
      <div className={classes.wrapper}>{bottomNavComponent}</div>
    ) : (
      bottomNavComponent
    );
  })(),
  styles: () => () => ({
    wrapper: {
      height: ({ options: { height } }) => height,
      '& .MuiBottomNavigation-root > button': {
        pointerEvents: 'none',
      },
      position: 'fixed',
      bottom: '0px',
      right: '0px',
      left: '329px',
    },
    root: {
      position: 'fixed',
      bottom: '0px',
      left: '0px',
      width: '100%',
      zIndex: '1201 !important',
      '& .MuiBottomNavigation-root': {
        height: ({ options: { height } }) => height,
        justifyContent: 'space-around',
        alignItems: 'center',
      },
    },
    dev: {
      left: '329px',
      right: '0',
      width: 'auto',
    },
  }),
}))();
