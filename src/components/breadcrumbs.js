(() => ({
  name: 'Breadcrumbs',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BREADCRUMB_ITEM'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText, Icon } = B;
    const isDev = env === 'dev';
    const { Breadcrumbs, Link } = window.MaterialUI.Core;
    const {
      separatorType,
      separatorText,
      separatorIcon,
      maxItems,
      itemsAfterCollapse,
      itemsBeforeCollapse,
      dataComponentAttribute,
    } = options;

    const isEmpty = children.length === 0;
    const isPristine = isEmpty && isDev;
    const PlaceHolder = (
      <div
        className={[
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')}
      />
    );

    let separator = separatorText;
    if (separatorType === 'icon') {
      separator = <Icon name={separatorIcon} />;
    }

    const breadcrumbsOptions = {
      separator,
      itemsAfterCollapse: parseInt(itemsAfterCollapse, 10),
      itemsBeforeCollapse: parseInt(itemsBeforeCollapse, 10),
      'data-component': useText(dataComponentAttribute) || 'Breadcrumbs',
    };
    if (!isDev && maxItems !== '0') {
      breadcrumbsOptions.maxItems = parseInt(maxItems, 10);
    }
    if (!isDev) {
      const historyObj = useHistory();
      console.log('ho', historyObj);
    }

    const NewBreadcrumbs = () => {
      const historyObj = useHistory();

      const pathName =
        historyObj.location.state.stateReturn + historyObj.location.pathname;

      console.log(pathName);
      const breadcrumbArray = pathName.split('/');
      console.log(breadcrumbArray);
      const output = breadcrumbArray.map((crumb) => (
        <Link key={crumb} href={crumb}>
          {crumb}
        </Link>
      ));

      return output;
    };

    const breadcrumbs =
      children.length > 0 ? (
        <Breadcrumbs {...breadcrumbsOptions} aria-label="breadcrumb">
          {children}
        </Breadcrumbs>
      ) : (
        PlaceHolder
      );
    return isDev ? (
      <div>{breadcrumbs}</div>
    ) : (
      <Breadcrumbs {...breadcrumbsOptions}>{NewBreadcrumbs()}</Breadcrumbs>
    );
  })(),
  styles: () => () => ({
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
      '&::after': {
        content: '"Breadcrumbs"',
      },
    },
  }),
}))();
