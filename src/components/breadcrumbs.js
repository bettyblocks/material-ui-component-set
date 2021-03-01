(() => ({
  name: 'Breadcrumbs',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BREADCRUMB_ITEM'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { Breadcrumbs } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const {
      separatorType,
      separatorText,
      separatorIcon,
      maxItems,
      itemsAfterCollapse,
      itemsBeforeCollapse,
      testing,
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
      separator = React.createElement(Icons[separatorIcon]);
    }

    const breadcrumbsOptions = {
      separator,
      itemsAfterCollapse: parseInt(itemsAfterCollapse, 10),
      itemsBeforeCollapse: parseInt(itemsBeforeCollapse, 10),
    };
    if (!isDev && maxItems !== '0') {
      breadcrumbsOptions.maxItems = parseInt(maxItems, 10);
    }

    function testingTag() {
      if (testing && testing.length > 0) {
        return useText(testing);
      }
      return 'breadcrumbs';
    }

    const breadcrumbs =
      children.length > 0 ? (
        <Breadcrumbs
          {...breadcrumbsOptions}
          aria-label="breadcrumb"
          data-component={testingTag()}
        >
          {children}
        </Breadcrumbs>
      ) : (
        PlaceHolder
      );
    return isDev ? <div>{breadcrumbs}</div> : breadcrumbs;
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
