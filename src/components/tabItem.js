(() => ({
  name: 'TabItem',
  icon: 'TabItemIcon',
  category: 'TAB',
  type: 'TAB_ITEM',
  allowedTypes: ['ROW'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const { activeTab, setLabel } = parent;
        const active = activeTab === index;
        const { tabLabel } = options;

        const isEmpty = children.length === 0;
        const isPristine = isEmpty && B.env === 'dev';

        useEffect(() => {
          setLabel(tabLabel, index);
        }, [tabLabel, index]);

        return (
          <div
            className={[
              active ? classes.tabItem : classes.inactive,
              isEmpty && active ? classes.empty : '',
              isPristine ? classes.pristine : '',
            ].join(' ')}
          >
            {isPristine ? 'Tab Item' : children}
          </div>
        );
      })()}
    </div>
  ),
  styles: B => {
    const { theme } = B;
    return {
      tabItem: {
        position: 'relative',
        display: 'block',
        textOverflow: 'ellipsis',
        borderRadius: '0.125rem',
        padding: '1rem',
      },
      inactive: {
        display: 'none',
      },
      tabLink: {
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
        color: theme.getColor('Primary'),
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
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
      hidden: {
        opacity: 0,
        pointerEvents: 'none',
        userSelect: 'none',
      },
    };
  },
}))();
