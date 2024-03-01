(() => ({
  name: 'Tabs',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['TAB_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Tabs, Tab } = window.MaterialUI.Core;
    const { Children, env, useText, Icon } = B;
    const {
      defaultValue,
      selectedDesignTabIndex,
      variant,
      centered,
      scrollButtons,
      alignment,
      showAllTabs,
      hideTabs,
      dataComponentAttribute,
      preLoadTabs,
      disableMenuClick,
      layout,
    } = options;

    const orientation =
      alignment === 'top' || alignment === 'bottom' ? 'horizontal' : 'vertical';
    const isDev = env === 'dev';
    const currentTab = isDev ? selectedDesignTabIndex : defaultValue;
    const [value, setValue] = useState(parseInt(currentTab - 1, 10) || 0);
    const [tabData, setTabData] = useState({});
    const [activeTabs, setActiveTabs] = useState([value]);
    const handleChange = (_, newValue) => {
      setValue(newValue);
      if (!activeTabs.includes(newValue)) {
        setActiveTabs((prevActiveTabs) => [...prevActiveTabs, newValue]);
      }
    };
    const setSelectedTab = (index) => {
      setValue(index);
      if (!activeTabs.includes(index)) {
        setActiveTabs((prevActiveTabs) => [...prevActiveTabs, index]);
      }
    };
    useEffect(() => {
      if (isDev) {
        setValue(parseInt(currentTab - 1, 10));
      }
    }, [isDev, currentTab]);

    B.defineFunction('Next tab', () => {
      if (value + 1 >= children.length) return;
      setValue(value + 1);
    });

    B.defineFunction('Previous tab', () => {
      if (value - 1 < 0) return;
      setValue(value - 1);
    });

    const TabsHeader = (
      <Tabs
        aria-label="tabs"
        onChange={handleChange}
        value={value}
        variant={variant}
        centered={centered}
        orientation={orientation}
        scrollButtons={scrollButtons}
        classes={{
          root: layout === 'circle' ? classes.circleRoot : classes.root,
          flexContainer: layout === 'circle' && classes.flexContainer,
          indicator: classes.indicator,
        }}
      >
        {React.Children.map(children, (child, index) => {
          const { options = {} } = child.props;
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
          if (layout === 'circle') {
            return (
              <Tab
                label={
                  <div className={classes.circleWrapper}>
                    <div className={classes.circle}>{index + 1}</div>
                    <div className={classes.circleLabel}>
                      {typeof label === 'string' ? label : useText(label)}
                    </div>
                  </div>
                }
                classes={{
                  textColorInherit: classes.textOpacity,
                  selected: classes.circleSelected,
                  root: classes.circleTabRoot,
                }}
                disabled={disabled}
                disableRipple={disableRipple}
                style={{ pointerEvents: disableMenuClick ? 'none' : 'auto' }}
              />
            );
          }
          return (
            <Tab
              label={
                <div
                  className={classes.labelWrapper}
                  style={{ flexDirection: getFlexDirection() }}
                >
                  <div className={classes.iconWrapper}>
                    {icon && icon !== 'None' ? <Icon name={icon} /> : undefined}
                  </div>
                  <div>
                    {typeof label === 'string' ? label : useText(label)}
                  </div>
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
      <div
        className={includeStyling(classes.tabs)}
        data-component={useText(dataComponentAttribute) || 'Tabs'}
      >
        {!hideTabs && TabsHeader}
        {React.Children.map(
          children,
          (child, index) => {
            const { options: childOptions = {} } = child.props || {};
            return (
              <Children
                index={index}
                value={value}
                tabData={tabData}
                setTabData={setTabData}
                showAllTabs={showAllTabs}
                setSelectedTab={setSelectedTab}
                activeTabs={activeTabs}
                preLoadTabs={isDev || preLoadTabs}
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
        {children.length === 0 ? 'Tabs' : TabGroup}
      </div>
    ) : (
      TabGroup
    );
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, env, Styling } = B;
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
      circleWrapper: {
        flexDirection: 'row',
        display: 'flex',
        textTransform: 'none',
        alignSelf: 'flex-start',
        alignItems: 'center',
      },
      textOpacity: {
        opacity: '1 !important',
        zIndex: '2',
      },
      circleLabel: {
        color: ({ options: { inactiveCircleLabelColor } }) => [
          style.getColor(inactiveCircleLabelColor),
          '!important',
        ],
        textAlign: 'left',
        lineHeight: '1.4',
      },
      circleSelected: {
        '& $circle': {
          backgroundColor: ({ options: { circleColor } }) => [
            style.getColor(circleColor),
            '!important',
          ],
          borderColor: ({ options: { circleBorderColor } }) => [
            style.getColor(circleBorderColor),
            '!important',
          ],
          color: ({ options: { circleTextColor } }) => [
            style.getColor(circleTextColor),
            '!important',
          ],
        },
        '& $circleLabel': {
          color: ({ options: { circleLabelColor } }) => [
            style.getColor(circleLabelColor),
            '!important',
          ],
        },
      },
      circle: {
        height: ({ options: { circleWidth } }) => circleWidth,
        marginRight: '10px',
        width: ({ options: { circleWidth } }) => circleWidth,
        backgroundColor: ({ options: { inactiveCircleColor } }) => [
          style.getColor(inactiveCircleColor),
          '!important',
        ],
        borderRadius: ({ options: { circleWidth } }) => circleWidth,
        borderStyle: 'solid',
        borderColor: ({ options: { inactiveCircleBorderColor } }) => [
          style.getColor(inactiveCircleBorderColor),
          '!important',
        ],
        borderWidth: '1px',
        display: 'flex',
        color: ({ options: { inactiveCircleTextColor } }) => [
          style.getColor(inactiveCircleTextColor),
          '!important',
        ],
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: '0',
      },
      tabs: {
        '& .MuiTab-root': {
          fontFamily: ({ options: { font } }) => style.getFontFamily(font),
          fontSize: ({ options: { font } }) => style.getFontSize(font),
          [`@media ${mediaMinWidth(600)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Portrait'),
          },
          [`@media ${mediaMinWidth(960)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Landscape'),
          },
          [`@media ${mediaMinWidth(1280)}`]: {
            fontSize: ({ options: { font } }) =>
              style.getFontSize(font, 'Desktop'),
          },
        },
        display: 'grid',
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
      circleTabRoot: {
        padding: '6px 10px 6px 0 !important',
        maxWidth: 'none !important',
      },
      flexContainer: {
        width: '100%',
        flexWrap: 'wrap',
      },
      circleRoot: {
        minWidth: '10rem',
        position: 'relative',
        alignSelf: 'flex-start',
        width: ({ options: { circleSideBarWidth } }) => circleSideBarWidth,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '12px',
          left: ({ options: { circleWidth } }) => `calc(${circleWidth} / 2)`,
          bottom: '12px',
          backgroundColor: ({ options: { connectorColor } }) => [
            style.getColor(connectorColor),
            '!important',
          ],
          width: '1px',
          zIndex: '1',
          display: ({ options: { alignment } }) =>
            alignment === 'left' || alignment === 'right' ? 'inherit' : 'none',
        },
      },
      indicator: {
        left: ({ options: { alignment } }) => alignment === 'right' && 0,
        top: ({ options: { alignment } }) => alignment === 'bottom' && 0,
        backgroundColor: ({ options: { indicatorColor, layout } }) => [
          layout === 'circle' ? 'transparent' : style.getColor(indicatorColor),
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
