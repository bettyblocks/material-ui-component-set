(() => ({
  name: 'SideNavigation',
  icon: 'SideNavigationIcon',
  category: 'LAYOUT',
  type: 'SIDE_NAVIGATION',
  allowedTypes: ['SIDE_NAVITEM'],
  orientation: 'VERTICAL',
  jsx: (
    <div className={classes.root}>
      {(() => {
        const { innerWidth } = window;
        const { collapsed } = options;
        const defaultClosed = collapsed || innerWidth < 768;
        const [closedInRuntime, setClosedInRuntime] = useState(defaultClosed);
        const isEmpty = children.length === 0;

        const isPristine = isEmpty && B.env === 'dev';
        const sideNavClosed =
          (B.env === 'dev' && collapsed) ||
          (B.env === 'prod' && closedInRuntime);

        return (
          <>
            <button
              type="button"
              className={[
                classes.toggle,
                sideNavClosed ? classes.closed : classes.open,
              ].join(' ')}
              onClick={() => setClosedInRuntime(value => !value)}
            >
              <span className={classes.arrow} />
            </button>

            <div
              className={[
                classes.sidenav,
                sideNavClosed ? classes.closed : classes.open,
              ].join(' ')}
            >
              <div className={classes.wrapper}>
                <span className={classes.title}>
                  <B.Text value={options.title} />
                </span>
                {isPristine ? (
                  <p className={[classes.empty, classes.pristine].join(' ')}>
                    Side Navigation
                  </p>
                ) : (
                  <ol className={classes.navItems}>{children}</ol>
                )}
              </div>
            </div>
          </>
        );
      })()}
    </div>
  ),
  styles: B => {
    const { theme } = B;
    return {
      root: {
        backgroundColor: 'transparent',
        boxShadow: '0 .125rem .625rem 0 rgba(0,0,0,0.3)',
        position: 'relative',
      },
      sidenav: {
        height: '100%',
        width: '16rem',
        transition:
          B.env === 'dev'
            ? 'none'
            : 'width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        backgroundColor: theme.getColor('White'),
        position: 'relative',
        overflow: 'hidden',
        left: 0,
        '&$closed': {
          width: 0,
          padding: 0,
          '& $wrapper': {
            left: '-16rem',
          },
        },
      },
      toggle: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        transition:
          B.env === 'dev' ? 'none' : 'left 0.4s cubic-bezier(.25,.8,.25,1)',
        color: theme.getColor('Black'),
        padding: '1.25rem 1rem',
        lineHeight: 0,
        fontSize: 0,
        border: 'none',
        outline: 'none',
        backgroundColor: theme.getColor('White'),
        cursor: 'pointer',
        '&$open': {
          left: '13.5rem',
          transition:
            B.env === 'dev' ? 'none' : 'left 0.4s cubic-bezier(.25,.8,.25,1)',
          '& $arrow::after': {
            transform: 'rotate(135deg)',
          },
        },
        '&$closed': {
          boxShadow:
            '.125rem .125rem .25rem 0 rgba(0,0,0,0.1), .25rem .25rem .3125rem 0 rgba(0,0,0,0.07), .0625rem .0625rem .625rem 0 rgba(0,0,0,0.06)',
          borderRadius: '0 1.5rem 1.5rem 0',
        },
      },
      arrow: {
        display: 'inline-block',
        fontSize: '1rem',
        pointerEvents: 'none',
        transition:
          B.env === 'dev' ? 'none' : 'transform 225ms cubic-bezier(.4,0,.2,1)',
        '&::after': {
          borderStyle: 'solid',
          borderWidth: '0 0.125rem 0.125rem 0',
          content: '""',
          display: 'inline-block',
          padding: '0.1875rem',
          transform: 'rotate(-45deg)',
          verticalAlign: 'middle',
          cursor: 'pointer',
          color: 'rgba(0,0,0,.54)',
        },
      },
      open: {},
      closed: {},
      wrapper: {
        width: '16rem',
        height: '100%',
        left: 0,
        transition:
          B.env === 'dev' ? 'none' : 'left 0.4s cubic-bezier(.25,.8,.25,1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      },
      title: {
        padding: '.75rem',
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        fontWeight: '500',
        minHeight: '1.5rem',
        color: theme.getColor('Black'),
        [`@media ${B.mediaMinWidth(1024)}`]: {
          paddingLeft: '1.5rem',
        },
      },
      navItems: {
        overflowY: 'auto',
        padding: 0,
        margin: 0,
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '4rem',
        width: '14rem',
        height: 'calc(100% - 2rem)',
        margin: B.env === 'prod' ? 0 : '1rem',
        fontSize: '0.75rem',
      },
      pristine: {
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
        border: '0.0625rem dashed #AFB5C8',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();
