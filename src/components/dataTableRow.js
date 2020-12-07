(() => ({
  name: 'DataTableRow',
  type: 'DATATABLE_ROW',
  allowedTypes: ['DATATABLE_COLUMN'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { headerOnly, handleSort, orderBy } = parent;

    return (
      <tr className={headerOnly ? classes.headerOnly : null}>
        <B.Children
          headerOnly={headerOnly}
          handleSort={handleSort}
          orderBy={orderBy}
        >
          {children}
        </B.Children>
      </tr>
    );
  })(),
  styles: B => theme => {
    const { isDev, env, Styling } = B;
    const style = new Styling(theme);
    return {
      headerOnly: {
        backgroundColor: props =>
          props.parent?.backgroundHeader
            ? [style.getColor(props.parent?.backgroundHeader), '!important']
            : [],
        '& div': {
          borderBottom: `${isDev ? '0.0625rem solid #cccccc' : 0}`,
        },
        '& th, & div[role="columnheader"]': {
          borderBottom: `${isDev ? 0 : '0.0625rem solid #cccccc!important'}`,
          backgroundColor: props =>
            props.parent?.backgroundHeader
              ? [style.getColor(props.parent?.backgroundHeader), '!important']
              : [],
        },
      },
    };
  },
}))();
