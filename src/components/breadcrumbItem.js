(() => ({
  name: 'BreadcrumbItem',
  icon: 'BreadcrumbItemIcon',
  type: 'BREADCRUMB_ITEM',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const isDev = B.env === 'dev';
    const { Link, useText } = B;
    const { endpoint, breadcrumbContent } = options;

    const content = isDev
      ? breadcrumbContent.join(' ')
      : useText(breadcrumbContent);

    const breadcrumbItem = (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link className={classes.link} endpoint={endpoint}>
        {content}
      </Link>
    );

    return isDev ? <div>{breadcrumbItem}</div> : breadcrumbItem;
  })(),
  styles: () => () => ({
    link: {
      color: 'black',
      textDecoration: 'none',
    },
  }),
}))();
