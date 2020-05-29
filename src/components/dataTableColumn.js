(() => ({
  name: 'DataTableColumn',
  type: 'DATATABLE_COLUMN',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { env, GetOneProvider, useText, getProperty } = B;
    const { TableCell, TableSortLabel } = window.MaterialUI.Core;
    const { horizontalAlignment, headerText, property } = options;
    const { headerOnly, value, handleSort, orderBy } = parent || {};
    const { name: propertyName } = getProperty(property) || {};
    const { field, order = 'asc' } = orderBy || {};

    const isDev = env === 'dev';

    const createSortHandler = prop => {
      const sortOrder = order === 'asc' ? 'desc' : 'asc';
      handleSort(prop, sortOrder);
    };

    const ColumnChildren = value ? (
      <GetOneProvider value={value}>{children}</GetOneProvider>
    ) : (
      children
    );

    const headerLabel = useText(headerText) || propertyName;

    const Header = property ? (
      <TableSortLabel
        classes={{ root: classes.columnSort }}
        active={field === propertyName}
        direction={field === propertyName && order ? order : 'asc'}
        onClick={() => createSortHandler(propertyName)}
      >
        <span className={classes.columnHeader}>{headerLabel}</span>
      </TableSortLabel>
    ) : (
      <span className={classes.columnHeader}>{headerLabel}</span>
    );

    return isDev ? (
      <div className={classes.column}>
        <TableCell
          align={horizontalAlignment}
          component="div"
          classes={{ root: classes.root }}
        >
          {headerOnly ? Header : children}
        </TableCell>
      </div>
    ) : (
      <TableCell classes={{ root: classes.root }} align={horizontalAlignment}>
        {headerOnly ? Header : ColumnChildren}
      </TableCell>
    );
  })(),
  styles: B => theme => {
    const { env, Styling } = B;
    const style = new Styling(theme);
    const isDev = env === 'dev';
    return {
      column: {
        display: 'table-cell',
      },
      root: {
        display: isDev && ['block', '!important'],
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
        borderColor: ({ options: { borderColor } }) => [
          style.getColor(borderColor),
          '!important',
        ],
      },
      columnHeader: {
        color: ({ options: { type } }) => style.getFontColor(type),
        fontFamily: ({ options: { type } }) => style.getFontFamily(type),
        fontSize: ({ options: { type } }) => style.getFontSize(type),
        fontWeight: ({ options: { type } }) => style.getFontWeight(type),
        textTransform: ({ options: { type } }) => style.getTextTransform(type),
        letterSpacing: ({ options: { type } }) => style.getLetterSpacing(type),
        lineHeight: '1.2',
        [`@media ${B.mediaMinWidth(768)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(1024)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1200)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Desktop'),
        },
      },
      columnSort: {
        pointerEvents: isDev && 'none',
      },
    };
  },
}))();
