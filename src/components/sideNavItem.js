(() => ({
  name: 'SideNavItem',
  icon: 'NavItemIcon',
  category: 'NAVIGATION',
  type: 'SIDE_NAVITEM',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (
    <li className={classes.navigationItem}>
      {(() => {
        const { navigationContent, endpointId } = options;
        if (!navigationContent)
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
  styles: B => {
    const { theme } = B;
    return {
      navigationItem: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        borderRadius: '0.125rem',
        minHeight: '2rem',
      },
      navigationLink: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '0.875rem',
        fontWeight: '400',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        padding: '0.75rem',
        lineHeight: '1.5rem',
        textDecoration: 'none',
        cursor: B.env === 'prod' ? 'pointer' : 'default',
        transition: 'background-color 0.15s ease-in-out',
        color: theme.getColor('Primary'),

        '&:hover': {
          backgroundColor:
            B.env === 'prod' ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
        },
        '&:focus, &:active': {
          backgroundColor:
            B.env === 'prod' ? 'rgba(0, 0, 0, 0.24)' : 'transparent',
        },
        [`@media ${B.mediaMinWidth(768)}`]: {
          fontSize: '1rem',
        },
        [`@media ${B.mediaMinWidth(1024)}`]: {
          color: theme.getColor('Primary'),
          paddingRight: '1rem',
          paddingLeft: '1.5rem',
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
