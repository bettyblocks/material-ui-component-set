(() => ({
  name: 'DataTableColumn',
  icon: 'DataTableColumnIcon',
  category: 'DATATABLE',
  type: 'DATATABLE_COLUMN',
  allowedTypes: ['TEXT', 'IMAGE', 'BUTTON'],
  orientation: 'VERTICAL',
  jsx: (
    <div className={classes.column}>
      {(() => {
        const { value, page, order, field, headerOnly } = parent || {};
        const { env, GetOneProvider, getProperty, Link } = B;

        if (env === 'dev') {
          if (headerOnly) {
            const headerText =
              options.headerText.length === 0 && options.property
                ? '{property}'
                : options.headerText;
            return (
              <>
                <div className={classes.heading}>
                  <span className={classes.columnHeadingLink}>
                    {headerText}
                    {options.property && (
                      <i
                        className={[
                          classes.columnHeadingIcon,
                          order === 'desc'
                            ? 'zmdi zmdi-long-arrow-up'
                            : 'zmdi zmdi-long-arrow-down',
                        ].join(' ')}
                      />
                    )}
                  </span>
                </div>
              </>
            );
          }

          return (
            <>
              <div className={classes.content}>{children}</div>
            </>
          );
        }

        function TableHeading({ heading, search }) {
          const {
            location: { pathname },
          } = useRouter();

          const to = [
            pathname,
            '?',
            page ? `page=${page}&` : '',
            search ? `search=${search}&` : '',
            `sort=${heading}&`,
            order && field === heading
              ? `order=${order === 'desc' ? 'asc' : 'desc'}`
              : 'order=asc',
          ].join('');

          const headingText =
            options.headerText.length > 0
              ? options.headerText
              : heading
                  .split('')
                  .map((char, charIndex) => {
                    const charUppercased = char.toUpperCase();

                    if (charIndex === 0) {
                      return charUppercased;
                    }

                    if (char === charUppercased) {
                      return ` ${char.toLowerCase()}`;
                    }

                    return char;
                  })
                  .join('');

          return (
            <Link key={heading} to={to} className={classes.columnHeadingLink}>
              {headingText}
              <i
                className={[
                  classes.columnHeadingIcon,
                  field === heading &&
                    (order === 'desc'
                      ? 'zmdi zmdi-long-arrow-up'
                      : 'zmdi zmdi-long-arrow-down'),
                ].join(' ')}
              />
            </Link>
          );
        }

        const propertyName = options.property
          ? getProperty(options.property) && getProperty(options.property).name
          : '';

        const searchParam = '';

        return (
          <>
            {headerOnly ? (
              <>
                <div className={classes.heading}>
                  {propertyName && (
                    <TableHeading heading={propertyName} search={searchParam} />
                  )}
                  {!propertyName && options.headerText}
                </div>
              </>
            ) : (
              <div className={classes.content}>
                <GetOneProvider value={value}>{children}</GetOneProvider>
              </div>
            )}
          </>
        );
      })()}
    </div>
  ),
  styles: B => {
    const { theme, env } = B;
    return {
      column: {
        display: 'table-cell',
        fontFamily: theme.getFontFamily('Body1'),
        fontSize: theme.getFontSize('Body1'),
        fontWeight: theme.getFontWeight('Body1'),
        textTransform: theme.getTextTransform('Body1'),
        textAlign: ({ options: { horizontalAlignment } }) =>
          horizontalAlignment,
        letterSpacing: theme.getLetterSpacing('Body1'),
        color: theme.getFontColor('Body1'),
        borderBottom: `0.0625rem solid ${theme.getColor('Accent1')}`,
        pointerEvents: ({ parent }) =>
          parent && parent.headerOnly && env === 'dev' ? 'none' : null,
        [`@media ${B.mediaMinWidth(768)}`]: {
          fontSize: theme.getFontSize('Body1', 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(1024)}`]: {
          fontSize: theme.getFontSize('Body1', 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1200)}`]: {
          fontSize: theme.getFontSize('Body1', 'Desktop'),
        },
      },
      heading: {
        padding: '0.75rem 1rem 0.75rem 0',
        boxSizing: 'border-box',
        color: ({ options: { type } }) => theme.getFontColor(type),
        fontFamily: ({ options: { type } }) => theme.getFontFamily(type),
        fontSize: ({ options: { type } }) => theme.getFontSize(type),
        fontWeight: ({ options: { type } }) => theme.getFontWeight(type),
        textTransform: ({ options: { type } }) => theme.getTextTransform(type),
        letterSpacing: ({ options: { type } }) => theme.getLetterSpacing(type),
        lineHeight: '1.2',
        [`@media ${B.mediaMinWidth(768)}`]: {
          fontSize: ({ options: { type } }) =>
            theme.getFontSize(type, 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(1024)}`]: {
          fontSize: ({ options: { type } }) =>
            theme.getFontSize(type, 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1200)}`]: {
          fontSize: ({ options: { type } }) =>
            theme.getFontSize(type, 'Desktop'),
        },
      },
      content: {
        padding: '0.75rem 1rem 0.75rem 0',
      },
      columnHeadingLink: {
        display: 'inline-flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        color: ({ options: { type } }) => theme.getFontColor(type),
      },
      columnHeadingIcon: {
        position: 'relative',
        top: '0.0625rem',
        margin: [0, '0.5rem'],
        fontSize: theme.getFont('Body2').Mobile,
        fontWeight: theme.getFont('Body2').fontWeight,
        textTransform: theme.getFont('Body2').textTransform,
        letterSpacing: theme.getFont('Body2').letterSpacing,
        lineHeight: '1.2',
        color: theme.getFont('Body2').color,
      },
    };
  },
}))();
