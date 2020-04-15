(() => ({
  name: 'Tabs',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['TAB_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Tabs, Tab } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { Children, env } = B;
    const {
      defaultValue,
      variant,
      centered,
      orientation,
      scrollButtons,
    } = options;

    const isDev = env === 'dev';
    const [value, setValue] = useState(parseInt(defaultValue, 10) || 0);
    const devValue = parseInt(defaultValue, 10) || 0;
    const currentValue = isDev ? devValue : value;

    const handleChange = (_, newValue) => {
      setValue(newValue);
    };

    const TabGroup = (
      <>
        <div className={classes.tabs}>
          <Tabs
            aria-label="tabs"
            onChange={handleChange}
            value={currentValue}
            variant={variant}
            centered={centered}
            orientation={orientation}
            scrollButtons={scrollButtons}
            classes={{ root: classes.root, indicator: classes.indicator }}
          >
            {[...children].map((child, index) => {
              const { label, icon, disabled, disableRipple } = isDev
                ? {}
                : child.props.options;
              return (
                <Tab
                  label={isDev ? `Tab ${index + 1}` : label}
                  icon={
                    icon && icon !== 'None'
                      ? React.createElement(Icons[icon])
                      : undefined
                  }
                  disabled={disabled}
                  disableRipple={disableRipple}
                />
              );
            })}
          </Tabs>
          <Children value={currentValue}>{children}</Children>
        </div>
      </>
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
    const style = new B.Styling(t);
    return {
      wrapper: {
        '& .MuiTabs-flexContainer > button': {
          pointerEvents: 'none',
        },
      },
      tabs: {
        display: 'flex',
        flexDirection: ({ options: { orientation } }) =>
          orientation === 'horizontal' ? 'column' : 'row',
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
      },
      indicator: {
        backgroundColor: ({ options: { indicatorColor } }) => [
          style.getColor(indicatorColor),
          '!important',
        ],
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
