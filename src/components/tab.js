(() => ({
  name: 'Tab',
  icon: 'TabIcon',
  category: 'LAYOUT',
  type: 'TAB',
  allowedTypes: ['TAB_ITEM'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      {(() => {
        const activeTabAsNumber = parseInt(options.tabIndex, 10) || 0;
        const activeTabIndex =
          activeTabAsNumber >= children.length || activeTabAsNumber < 0
            ? 0
            : activeTabAsNumber;
        const [activeTab, setActive] = useState(activeTabIndex);
        const [labels, setLabels] = useState({});
        const { Children, env } = B;
        const isEmpty = children.length === 0;
        const isPristine = isEmpty && env === 'dev';
        const tabIndex = env === 'dev' ? activeTabIndex : activeTab;

        const renderTabButtons = (
          { props: { id, options: { tabLabel } = {} } },
          idx,
        ) => {
          const defaultTabTitle = tabLabel || 'Tab Title';
          return (
            <button
              type="button"
              key={id}
              className={[
                classes.tabLabel,
                (env === 'prod' && idx === activeTab) ||
                (env === 'dev' && idx === activeTabIndex)
                  ? classes.activeTab
                  : '',
              ].join(' ')}
              onClick={() => setActive(idx)}
            >
              {env === 'prod' ? defaultTabTitle : labels[idx] || 'Tab Title'}
            </button>
          );
        };

        return (
          <div
            className={[
              classes.tabContainer,
              isEmpty ? classes.empty : '',
              isPristine ? classes.pristine : '',
            ].join(' ')}
          >
            {isPristine ? (
              'Tab'
            ) : (
              <>
                <div className={classes.tabList}>
                  {children.map(renderTabButtons)}
                </div>
                <Children
                  activeTab={tabIndex}
                  setLabel={(label, id) =>
                    setLabels(value => ({
                      ...value,
                      [id]: label,
                    }))
                  }
                >
                  {children}
                </Children>
              </>
            )}
          </div>
        );
      })()}
    </div>
  ),
  styles: B => {
    const { theme } = B;
    return {
      tabContainer: {
        position: 'relative',
        backgroundColor: theme.getColor('White'),
        display: 'flex',
        flexDirection: 'column',
      },
      tabList: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        display: 'flex',
        backgroundColor: theme.getColor('White'),
        height: '3rem',
        borderBottom: '0.0625rem solid rgba(0,0,0,.12)',
        overflowX: 'auto',
      },
      tabLabel: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        position: 'relative',
        flex: '1 0 auto',
        textTransform: 'capitalize',
        padding: '0 1.5rem',
        minWidth: '10rem',
        fontSize: '1rem',
        cursor: B.env === 'prod' ? 'pointer' : 'default',
        pointerEvents: B.env === 'dev' ? 'none' : 'default',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        borderBottomWidth: '0.125rem',
        borderBottomStyle: 'solid',
        borderBottomColor: 'transparent',
        transition: 'background-color 0.15s ease-in-out',
        '&:hover, &:focus': {
          backgroundColor: B.color.alpha(theme.getColor('Primary'), 0.1),
        },
      },
      activeTab: {
        borderBottomColor: theme.getColor('Primary'),
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
    };
  },
}))();
