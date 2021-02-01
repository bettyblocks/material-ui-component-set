(() => ({
  name: 'BreadcrumbItem',
  type: 'BREADCRUMB_ITEM',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Link, useText, env } = B;
    const isDev = env === 'dev';
    const { Typography } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { endpoint, breadcrumbContent, icon, iconPosition } = options;
    const content = useText(breadcrumbContent);
    const hasEndpoint = endpoint && endpoint.id !== '';

    const isEmpty = breadcrumbContent.length === 0 && icon === 'None';
    const isPristine = isEmpty && isDev;
    const PlaceHolder = (
      <div
        className={[
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')}
      />
    );

    const IconComponent =
      icon !== 'None' &&
      React.createElement(Icons[icon], {
        className: classes[`icon${iconPosition}`],
      });

    const ItemContent = (
      <>
        {iconPosition === 'start' && IconComponent}
        {content}
        {iconPosition === 'end' && IconComponent}
      </>
    );

    const BreadcrumbChildren = isEmpty ? PlaceHolder : ItemContent;

    const breadcrumbItem = hasEndpoint ? (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        className={[classes.content, classes.link].join(' ')}
        endpoint={endpoint}
      >
        {BreadcrumbChildren}
      </Link>
    ) : (
      <Typography className={classes.content}>{BreadcrumbChildren}</Typography>
    );

    return isDev ? (
      <div className={classes.root}>{breadcrumbItem}</div>
    ) : (
      breadcrumbItem
    );
  })(),
  styles: B => t => {
    const { Styling } = B;
    const style = new Styling(t);
    return {
      root: {
        '& > *': {
          pointerEvents: 'none',
        },
      },
      content: {
        display: 'flex',
        color: ({ options: { textColor } }) => style.getColor(textColor),
      },
      link: {
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      iconstart: {
        marginRight: ({ options: { breadcrumbContent } }) =>
          breadcrumbContent.length > 0 && style.getSpacing('M', 'Mobile'),
      },
      iconend: {
        marginLeft: ({ options: { breadcrumbContent } }) =>
          breadcrumbContent.length > 0 && style.getSpacing('M', 'Mobile'),
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '1rem',
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
        '&::after': {
          content: '"Breadcrumb Item"',
        },
      },
    };
  },
}))();
