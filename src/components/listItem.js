(() => ({
  name: 'ListItem',
  icon: 'PanelIcon',
  type: 'LIST_ITEM_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const { text } = options;

        const { env, Link } = B;
        const isDev = env === 'dev';

        const { Icons } = window.MaterialUI;
        const { ListItem, ListItemIcon, ListItemText } = window.MaterialUI.Core;

        const { icon, size, linkType, linkTo, linkToExternal } = options;

        const generalProps = {
          href: linkType === 'external' ? linkToExternal : undefined,
          target: linkType === 'external' && '_blank',
          component: linkType === 'internal' ? Link : !isDev && 'a',
          endpoint: linkType === 'internal' ? linkTo : undefined,
        };

        const listItemComponent = props => (
          <ListItem {...props} button key={text}>
            {icon !== 'None' && (
              <ListItemIcon>
                {React.createElement(Icons[icon], {
                  fontSize: size,
                })}
              </ListItemIcon>
            )}

            <ListItemText primary={text} />
          </ListItem>
        );

        return (
          <div disabled={isDev} className={isDev && classes.pristine}>
            {listItemComponent(generalProps)}
          </div>
        );
      })()}
    </div>
  ),
  styles: () => () => ({
    pristine: {
      color: '#262A3A',
      textTransform: 'uppercase',
      boxSizing: 'border-box',
      border: '0.0625rem dashed #AFB5C8',
    },
  }),
}))();
