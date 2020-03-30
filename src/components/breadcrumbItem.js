(() => ({
  name: 'BreadcrumbItem',
  icon: 'BreadcrumbItemIcon',
  category: 'NAVIGATION',
  type: 'BREADCRUMB_ITEM',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const isDev = B.env === 'dev';
    const { Link } = B;
    const { endpoint, breadcrumbContent } = options;
    const breadcrumbItem = <Link endpoint={endpoint}>{breadcrumbContent}</Link>;

    return isDev ? <div>{breadcrumbItem}</div> : breadcrumbItem;
  })(),
  styles: {},
}))();
