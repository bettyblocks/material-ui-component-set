(() => ({
  name: 'Tabs',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['TAB_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Tabs, Tab } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { Children, env, useText } = B;
    const {
      defaultValue,
      variant,
      centered,
      scrollButtons,
      alignment,
      showAllTabs,
      hideTabs,
    } = options;

    const orientation =
      alignment === 'top' || alignment === 'bottom' ? 'horizontal' : 'vertical';
    const isDev = env === 'dev';
    const [value, setValue] = useState(parseInt(defaultValue - 1, 10) || 0);
    const [tabData, setTabData] = useState({});

    const handleChange = (_, newValue) => {
      setValue(newValue);
    };

    const setSelectedTab = index => {
      setValue(index);
    };

    useEffect(() => {
      if (isDev) {
        setValue(parseInt(defaultValue - 1, 10));
      }
    }, [isDev, defaultValue]);

    const TabsHeader = (
      <Tabs
        aria-label="tabs"
        onChange={handleChange}
        value={value}
        variant={variant}
        centered={centered}
        orientation={orientation}
        scrollButtons={scrollButtons}
        classes={{ root: classes.root, indicator: classes.indicator }}
      >
        {React.Children.map(children, (child, index) => {
          const { options } = child.props;
          const {
            label = tabData[`label${index}`] || [`Tab`],
            icon = tabData[`icon${index}`] || 'None',
            iconAlignment = tabData[`iconAlignment${index}`] || 'top',
            disabled = tabData[`disabled${index}`] || false,
            disableRipple = tabData[`disableRipple${index}`] || false,
          } = isDev ? {} : options;

          function getFlexDirection() {
            switch (iconAlignment) {
              case 'top':
                return 'column';
              case 'right':
                return 'row-reverse';
              case 'bottom':
                return 'column-reverse';
              default:
                return 'row';
            }
          }

          return (
            <Tab
              label={
                <div
                  className={classes.labelWrapper}
                  style={{ flexDirection: getFlexDirection() }}
                >
                  <div className={classes.iconWrapper}>
                    {icon && icon !== 'None'
                      ? React.createElement(Icons[icon])
                      : undefined}
                  </div>
                  <div>{useText(label)}</div>
                </div>
              }
              disabled={disabled}
              disableRipple={disableRipple}
            />
          );
        })}
      </Tabs>
    );

    const TabGroup = (
      <div className={classes.tabs}>
        {!hideTabs && TabsHeader}
        {React.Children.map(children, (child, index) => {
          const { options: childOptions = {} } = child.props || {};

          return (
            <Children
              index={index}
              value={value}
              tabData={tabData}
              setTabData={setTabData}
              showAllTabs={showAllTabs}
              setSelectedTab={setSelectedTab}
            >
              {React.cloneElement(child, { ...childOptions })}
            </Children>
          );
        })}
      </div>
    );
    return isDev ? (
      <div
        className={[
          classes.wrapper,
          children.length === 0 && classes.empty,
        ].join(' ')}
      >
        {children.length === 0 ? 'Tabs' : TabGroup}
      </div>
    ) : (
      TabGroup
    );
  })(),
  styles: B => t => {
    const { env, Styling } = B;
    const style = new Styling(t);
    const isDev = env === 'dev';

    return {
      wrapper: {
        height: ({ options: { height } }) => height,
        width: ({ options: { width } }) => width,
        '& .MuiTabs-flexContainer > button': {
          pointerEvents: 'none',
        },
      },
      tabs: {
        display: 'flex',
        height: ({ options: { height } }) => (isDev ? '100%' : height),
        width: ({ options: { width } }) => (isDev ? '100%' : width),
        flexDirection: ({ options: { alignment } }) => {
          switch (alignment) {
            case 'top':
              return 'column';
            case 'right':
              return 'row-reverse';
            case 'bottom':
              return 'column-reverse';
            default:
              return 'row';
          }
        },
      },
      root: {
        backgroundColor: ({ options: { appBarColor } }) => [
          style.getColor(appBarColor),
          '!important',
        ],
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        minWidth: '10rem',
      },
      indicator: {
        left: ({ options: { alignment } }) => alignment === 'right' && 0,
        top: ({ options: { alignment } }) => alignment === 'bottom' && 0,
        backgroundColor: ({ options: { indicatorColor } }) => [
          style.getColor(indicatorColor),
          '!important',
        ],
      },
      labelWrapper: {
        display: 'flex',
        alignItems: 'center',
      },
      iconWrapper: {
        marginLeft: 5,
        marginRight: 5,
        display: 'flex',
        alignItems: 'center',
      },
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
    };
  },
}))();
