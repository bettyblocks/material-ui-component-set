(() => ({
  name: 'Icon',
  icon: 'IconIcon',
  category: 'LAYOUT',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Icons } = window.MaterialUI;
    const isDev = B.env === 'dev';
    const { icon } = options;
    const IconComponent = React.createElement(Icons['FileCopy']);

    return isDev ? <div>{IconComponent}</div> : IconComponent;
  })(),
  styles: {},
}))();
