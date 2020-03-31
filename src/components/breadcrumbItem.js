(() => ({
  name: 'BreadcrumbItem',
  icon: 'BreadcrumbItemIcon',
  category: 'NAVIGATION',
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

    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    const breadcrumbItem = <Link endpoint={endpoint}>{content}</Link>;

    return isDev ? <div>{breadcrumbItem}</div> : breadcrumbItem;
  })(),
  styles: () => () => ({}),
}))();
