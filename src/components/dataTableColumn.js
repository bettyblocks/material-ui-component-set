(() => ({
  name: 'DataTableColumn',
  type: 'DATATABLE_COLUMN',
  allowedTypes: ['CONTENT_COMPONENT', 'CONTAINER_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { env, getProperty, useProperty, useEndpoint, useText } = B;
    const { TableCell, TableSortLabel } = window.MaterialUI.Core;
    const {
      horizontalAlignment,
      headerText,
      property,
      content,
      sortable,
    } = options;
    const { headerOnly, handleSort, orderBy, linkTo, handleRowClick, context } =
      parent || {};
    const { type } = property;
    const propertyArray = [property].flat();
    const { name: propertyName, label: propertyLabel } =
      getProperty(property) || {};
    const { field, order = 'asc' } = orderBy || {};
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const contentPlaceholder = isDev && isEmpty ? 'Select property' : '\u00A0';

    let myEndpoint = null;
    if (linkTo) {
      myEndpoint = useEndpoint(linkTo);
    }

    const bodyText = useText(content);
    const prodProperty = useProperty(property);
    const propContent = isDev ? `{{ ${propertyName} }}` : prodProperty;

    let columnText = propertyName ? propContent : contentPlaceholder;
    if (type === 'ME_PROPERTY') {
      columnText = isDev ? `{{ ${propertyName} }}` : useText([property]);
    }

    if (bodyText) {
      columnText = bodyText;
    }

    const header = useText(headerText);
    let columnHeaderText = propertyLabel || contentPlaceholder;
    if (header) {
      columnHeaderText = header;
    }

    const isSortable = propertyName && sortable;

    const createSortHandler = prop => {
      const sortOrder = order === 'asc' ? 'desc' : 'asc';
      handleSort(prop, sortOrder);
    };

    const isFilterSelected = fields => {
      if (!fields || fields.length !== propertyArray.length) return false;

      for (let index = 0; index < fields.length; index += 1) {
        if (fields[index] !== propertyArray[index]) return false;
      }

      return true;
    };

    const Content =
      children.length > 0 ? (
        children
      ) : (
        <span className={classes.content}>{columnText}</span>
      );

    const Header = isSortable ? (
      <TableSortLabel
        classes={{ root: classes.columnSort }}
        active={isFilterSelected(field)}
        direction={isFilterSelected(field) && order ? order : 'asc'}
        onClick={() => createSortHandler(propertyArray)}
      >
        <span className={classes.columnHeader}>{columnHeaderText}</span>
      </TableSortLabel>
    ) : (
      <span className={classes.columnHeader}>{columnHeaderText}</span>
    );

    return isDev ? (
      <div
        className={[
          classes.tableColumn,
          !headerOnly ? classes.tableColumnBody : '',
          !headerOnly ? 'MuiTableCell-root' : '',
        ].join(' ')}
      >
        {headerOnly ? (
          <TableCell align={horizontalAlignment} component="div">
            {Header}
          </TableCell>
        ) : (
          Content
        )}
      </div>
    ) : (
      <TableCell
        classes={{ root: classes.root }}
        align={horizontalAlignment}
        onClick={() => handleRowClick && handleRowClick(myEndpoint, context)}
      >
        {headerOnly ? Header : Content}
      </TableCell>
    );
  })(),
  styles: B => theme => {
    const { env, mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const isDev = env === 'dev';
    return {
      tableColumn: {
        display: 'table-cell',
        verticalAlign: 'middle',
        width: ({ options: { width } }) => width || 'auto',
        '& > div': {
          display: 'block',
        },
      },
      tableColumnBody: {
        textAlign: ({ options: { horizontalAlignment } }) => [
          horizontalAlignment,
          '!important',
        ],
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
        borderColor: ({ options: { borderColor } }) => [
          style.getColor(borderColor),
          '!important',
        ],
      },
      root: {
        display: isDev && ['block', '!important'],
        width: ({ options: { width } }) => width || 'auto',
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
        [`@media ${mediaMinWidth(600)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Desktop'),
        },
      },
      content: {
        color: ({ options: { bodyType } }) => style.getFontColor(bodyType),
        fontFamily: ({ options: { bodyType } }) =>
          style.getFontFamily(bodyType),
        fontSize: ({ options: { bodyType } }) => style.getFontSize(bodyType),
        fontWeight: ({ options: { bodyType } }) =>
          style.getFontWeight(bodyType),
        textTransform: ({ options: { bodyType } }) =>
          style.getTextTransform(bodyType),
        letterSpacing: ({ options: { bodyType } }) =>
          style.getLetterSpacing(bodyType),
        lineHeight: '1.2',
        [`@media ${mediaMinWidth(600)}`]: {
          fontSize: ({ options: { bodyType } }) =>
            style.getFontSize(bodyType, 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          fontSize: ({ options: { bodyType } }) =>
            style.getFontSize(bodyType, 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          fontSize: ({ options: { bodyType } }) =>
            style.getFontSize(bodyType, 'Desktop'),
        },
      },
      columnSort: {
        pointerEvents: isDev && 'none',
        '& .MuiSvgIcon-root': {
          opacity: isDev && 0.5,
        },
      },
    };
  },
}))();
