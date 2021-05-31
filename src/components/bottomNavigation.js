(() => ({
  name: 'BottomNavigation',
  type: 'BODY_COMPONENT',
  allowedTypes: ['NAV_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { BottomNavigation } = window.MaterialUI.Core;
    const { env, Children } = B;
    const { defaultValue, activeColor, inactiveColor } = options;
    const isDev = env === 'dev';
    const [value, setValue] = useState(parseInt(defaultValue - 1, 10) || 0);
    const [navData, setNavData] = useState({});

    const handleChange = (_, newValue) => {
      setValue(newValue);
    };

    const setSelectedNav = index => {
      setValue(index);
    };

    useEffect(() => {
      if (isDev) {
        setValue(parseInt(defaultValue - 1, 10));
      }
    }, [isDev, defaultValue]);

    const bottomNavComponent = (
      <div className={[isDev ? classes.dev : '', classes.root].join(' ')}>
        <BottomNavigation onChange={handleChange} value={value}>
          {React.Children.map(children, (child, index) => {
            navData[`label${index}`] = [`Item`];
            navData[`icon${index}`] = 'Add';
            const { options: childOptions = {} } = child.props || {};

            if (index >= 5) {
              return null;
            }

            return (
              <Children
                index={index}
                value={value}
                navData={navData}
                setNavData={setNavData}
                setSelectedNav={setSelectedNav}
                activeColor={activeColor}
                inactiveColor={inactiveColor}
                maxChild={children.length <= 3}
              >
                {React.cloneElement(child, {
                  ...childOptions,
                })}
              </Children>
            );
          })}
        </BottomNavigation>
      </div>
    );

    return isDev ? (
      <div className={classes.wrapper}>{bottomNavComponent}</div>
    ) : (
      bottomNavComponent
    );
  })(),
  styles: B => t => {
    const { Styling } = B;
    const style = new Styling(t);
    return {
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
        width: '100%',
        zIndex: '1201 !important',
        '& .MuiBottomNavigation-root': {
          height: ({ options: { height } }) => height,
          backgroundColor: ({ options: { backgroundColor } }) => [
            style.getColor(backgroundColor),
            '!important',
          ],
          justifyContent: 'space-around',
          alignItems: 'center',
        },
      },
      dev: {
        left: '329px',
        right: '0',
        width: 'auto',
      },
    };
  },
}))();
