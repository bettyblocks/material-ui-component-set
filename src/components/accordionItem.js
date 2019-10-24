(() => ({
  name: 'AccordionItem',
  icon: 'AccordionItemIcon',
  category: 'LAYOUT',
  type: 'ACCORDION_ITEM',
  allowedTypes: [
    'ALERT',
    'BREADCRUMB',
    'BUTTON',
    'DATATABLE',
    'DIVIDER',
    'FORM',
    'IMAGE',
    'PARTIAL',
    'PANEL',
    'PROGRESS',
    'TABS',
    'TEXT',
  ],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      <div>
        <button
          type="button"
          className={[
            classes.title,
            options.selected ? classes.activeTitle : '',
          ].join(' ')}
          data-type="accordion-title"
          onClick={() => {
            if (options.selectItem) {
              options.selectItem(options.itemIndex);
            }
          }}
        >
          <span className={classes.content}>
            <B.Text value={options.itemTitle} />
          </span>
          <span className={classes.indicator} />
        </button>
        <div
          className={[
            classes.item,
            options.selected ? classes.activeItem : '',
          ].join(' ')}
          data-type="accordion-item"
        >
          {children.length === 0 && B.env === 'dev' ? (
            <div className={classes.empty}>Accordion item</div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  ),
  styles: B => {
    const { theme } = B;
    return {
      root: {
        display: 'block',
        backgroundColor: theme.getColor('White'),
        boxShadow:
          '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
      },
      title: {
        appearance: 'none',
        width: '100%',
        textAlign: 'left',
        border: 'none',
        transition: 'background-color 0.2s ease-out',
        fontSize: '0.9375rem',
        padding: '0 1.5rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'border-box',
        height: '3rem',
        color: theme.getColor('Black'),
        backgroundColor: theme.getColor('White'),

        '&:hover, &:focus': {
          outline: 'none',
          backgroundColor: B.color.darken(theme.getColor('White'), 0.08),
        },
        '&:active': {
          backgroundColor: B.color.darken(theme.getColor('White'), 0.24),
        },
      },
      activeTitle: {
        height: '4rem',
        '& $indicator': {
          marginTop: '0.25rem',
          transform: 'rotate(180deg)',
        },
      },
      empty: {
        color: '#262A3A',
        boxSizing: 'border-box',
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '4rem',
        height: '100%',
        width: '100%',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
      },
      content: {
        flex: 1,
        pointerEvents: 'none',
      },
      indicator: {
        display: 'inline-block',
        fontSize: 0,
        marginTop: '-0.25rem',
        pointerEvents: 'none',
        transition: 'transform 225ms cubic-bezier(.4,0,.2,1)',

        '&::after': {
          borderStyle: 'solid',
          borderWidth: '0 0.125rem 0.125rem 0',
          content: '""',
          display: 'inline-block',
          padding: '0.1875rem',
          transform: 'rotate(45deg)',
          verticalAlign: 'middle',
          cursor: 'pointer',
          color: 'rgba(0,0,0,.54)',
        },
      },
      item: {
        height: 0,
        overflow: 'hidden',
        padding: '0 1.5rem',
        transition: 'height 225ms cubic-bezier(.4,0,.2,1)',
      },
      activeItem: {
        height: 'auto',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      },
    };
  },
}))();
