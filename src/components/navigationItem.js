(() => ({
  name: 'NavigationItem',
  icon: 'NavItemIcon',
  category: 'NAVIGATION',
  type: 'NAVIGATION_ITEM',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (
    <li className={classes.navigationItem}>
      {(() => {
        const { navigationContent, endpointId } = options;

        if (navigationContent.length === 0)
          return (
            <span
              className={[
                classes.navigationLink,
                B.env === 'dev' ? classes.placeholder : classes.hidden,
              ].join(' ')}
            >
              Empty item
            </span>
          );

        return (
          navigationContent.length > 0 &&
          (B.env === 'prod' && endpointId ? (
            <B.Link endpointId={endpointId} className={classes.navigationLink}>
              <B.Text value={navigationContent} />
            </B.Link>
          ) : (
            <span className={classes.navigationLink}>
              <B.Text value={navigationContent} />
            </span>
          ))
        );
      })()}
    </li>
  ),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      navigationItem: {
        position: 'relative',
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        borderRadius: '0.125rem',
        height: '3.5rem',

        [`@media ${B.mediaMinWidth(1024)}`]: {
          float: 'left',
          height: '4rem',
        },
      },
      navigationLink: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '0.875rem',
        fontWeight: '400',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        paddingTop: '0.5rem',
        paddingRight: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '0.5rem',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease-in-out',
        justifyContent: 'center',
        color: style.getColor('Primary'),
        height: 'calc(100% - 1rem)',

        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
        '&:focus, &:active': {
          backgroundColor: 'rgba(0, 0, 0, 0.24)',
        },
        [`@media ${B.mediaMinWidth(768)}`]: {
          fontSize: '1rem',
        },
        [`@media ${B.mediaMinWidth(1024)}`]: {
          color: style.getColor('White'),
          paddingRight: '1rem',
          paddingLeft: '1rem',
        },
      },
      icon: {
        marginRight: ({ options: { navigationContent } }) =>
          navigationContent && '0.5rem',
        width: '1rem',
      },
      placeholder: {
        color: '#DADDE4',
      },
      hidden: {
        opacity: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      },
    };
  },
}))();
