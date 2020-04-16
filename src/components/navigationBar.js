(() => ({
  name: 'NavigationBar',
  icon: 'NavbarIcon',
  type: 'BODY_COMPONENT',
  allowedTypes: ['NAVIGATION_ITEM'],
  orientation: 'HORIZONTAL',
  jsx: (
    <header>
      {(() => {
        const [activeState, setActiveState] = useState(false);
        const showPlaceholder = children.length === 0;
        const { endpoint, logoUrl, brandName } = options;
        const isPristine = showPlaceholder && B.env === 'dev' && !logoUrl;

        return (
          <div className={classes.navigationContainer}>
            {logoUrl && (
              <div className={classes.logoWrapper}>
                {endpoint ? (
                  <B.Link
                    endpoint={endpoint}
                    className={classes.navigationLink}
                  >
                    <img
                      src={logoUrl}
                      alt={`${brandName} Logo`}
                      className={classes.logo}
                    />
                  </B.Link>
                ) : (
                  <img
                    src={logoUrl}
                    alt={`${brandName} Logo`}
                    className={classes.logo}
                  />
                )}
              </div>
            )}
            <div className={classes.brandWrapper}>
              {endpoint ? (
                <B.Link endpoint={endpoint} className={classes.navigationLink}>
                  <h1 className={classes.brand}>{brandName}</h1>
                </B.Link>
              ) : (
                <h1 className={classes.brand}>{brandName}</h1>
              )}
            </div>
            <button
              type="button"
              className={classes.button}
              onClick={() => setActiveState(state => !state)}
            >
              <span
                className={[
                  classes.navigationIcon,
                  activeState ? classes.activeNavigationIcon : '',
                ].join(' ')}
              />
            </button>
            <nav
              className={[
                classes.navigation,
                activeState ? classes.activeNavigation : '',
              ].join(' ')}
            >
              <ul
                className={[
                  classes.navigationList,
                  showPlaceholder ? classes.empty : '',
                  isPristine ? classes.pristine : '',
                ].join(' ')}
              >
                {isPristine ? 'Navigation bar' : children}
              </ul>
            </nav>
          </div>
        );
      })()}
    </header>
  ),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      navigationContainer: {
        position: 'relative',
        zIndex: 998,
        backgroundColor: style.getColor('Primary'),
        minHeight: '4rem',
        boxShadow: '0 0.125rem 0.625rem 0 rgba(0,0,0,0.1)',
      },
      logoWrapper: {
        display: 'block',
        float: 'left',
        padding: '1rem 0 1rem 1rem',
        fontSize: 0,
      },
      logo: {
        width: 'auto',
        height: 'auto',
        maxWidth: '20rem',
        maxHeight: '2rem',
      },
      brandWrapper: {
        float: 'left',
        display: 'flex',
        height: '4rem',
        alignItems: 'center',
      },
      brand: {
        margin: 0,
        color: style.getColor('White'),
        padding: '0 1rem 0',
        boxSizing: 'border-box',
        maxHeight: '4rem',
        whiteSpace: 'nowrap',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '1rem',
        fontWeight: '500',
        [`@media ${B.mediaMinWidth(768)}`]: {
          fontSize: '1.125rem',
        },
        [`@media ${B.mediaMinWidth(1200)}`]: {
          fontSize: '1.25rem',
        },
      },
      navigationLink: {
        display: 'block',
        textDecoration: 'none',
      },
      navigation: {
        position: 'absolute',
        width: '100%',
        top: '4rem',
        boxShadow: '0 0.125rem 0.625rem 0 rgba(0,0,0,0.1)',
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'max-height 0.2s ease-out',

        [`@media ${B.mediaMinWidth(1024)}`]: {
          position: 'static',
          width: 'auto',
          boxShadow: 'none',
          maxHeight: 'none',
          paddingRight: '1rem',
        },
      },
      activeNavigation: {
        maxHeight: '26.25rem',
        overflowY: 'auto',

        [`@media ${B.mediaMinWidth(1024)}`]: {
          position: 'static',
          boxShadow: 'none',
          maxHeight: 'none',
        },
      },
      navigationList: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        display: 'block',
        clear: 'both',
        backgroundColor: style.getColor('White'),

        [`@media ${B.mediaMinWidth(1024)}`]: {
          clear: 'none',
          float: 'right',
          backgroundColor: 'transparent',
        },
      },
      button: {
        appearance: 'none',
        display: 'block',
        float: 'right',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        padding: '1.9375rem 1.4375rem',
        position: 'relative',
        'user-select': 'none',

        '&:hover': {
          backgroundColor: 'rgba(0,0,0,0.08)',
        },

        '&:focus, &:active': {
          outline: 'none',
          backgroundColor: 'rgba(0,0,0,0.24)',
        },

        [`@media ${B.mediaMinWidth(1024)}`]: {
          display: 'none',
        },
      },
      navigationIcon: {
        backgroundColor: style.getColor('White'),
        display: 'block',
        height: '0.125rem',
        position: 'relative',
        transition: 'background-color .2s ease-out',
        width: '1.125rem',

        '&::before, &::after': {
          backgroundColor: style.getColor('White'),
          content: '""',
          display: 'block',
          height: '100%',
          position: 'absolute',
          transition: 'all .2s ease-out',
          width: '100%',
        },

        '&::before': {
          top: '0.3125rem',
        },

        '&::after': {
          top: '-0.3125rem',
        },
      },
      activeNavigationIcon: {
        backgroundColor: 'transparent',

        '&::before': {
          top: '0',
          transform: 'rotate(-45deg)',
        },

        '&::after': {
          top: '0',
          transform: 'rotate(45deg)',
        },
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '4rem',
        height: '100%',
        width: '100%',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
      },
      pristine: {
        borderWidth: () => '0.0625rem',
        borderColor: () => '#AFB5C8',
        borderStyle: () => 'dashed',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();
