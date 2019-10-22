(() => ({
  name: 'DataTable',
  icon: 'DataTable',
  category: 'DATA',
  type: 'DATATABLE',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      {(() => {
        const { env, getProperty, GetAll, Link } = B;

        const take = parseInt(options.take, 10) || 50;

        if (env === 'dev' || !options.model) {
          return (
            <div className={classes.table}>
              <div className={classes.row}>
                <div
                  className={[classes.column, classes.columnHeading].join(' ')}
                >
                  Heading
                </div>
              </div>
              {Array.from(Array(take).keys()).map(key => (
                <div key={key} className={classes.row}>
                  <div className={classes.column}>
                    You are either in the builder environment or the model id
                    you selected is incorrect
                  </div>
                </div>
              ))}
            </div>
          );
        }

        const [isTyping, setIsTyping] = useState(false);

        const {
          location: { search: querystring = '' },
          history,
        } = useRouter();

        const queryParams = new URLSearchParams(querystring);

        /* ####### Filters ####### */

        function buildFilter(where, [lhs, operator, rhs]) {
          if (!lhs || !rhs) {
            return null;
          }

          const lhsProperty = getProperty(lhs);

          if (!lhsProperty) {
            return null;
          }

          const { name: propertyName, kind } = lhsProperty;

          const rhsValue = ['serial', 'integer'].includes(kind)
            ? parseInt(rhs, 10)
            : rhs;

          return {
            [propertyName]: {
              [operator]: rhsValue,
            },
          };
        }

        let where = {};

        const filter = buildFilter(where, options.filter);

        if (filter !== null) {
          where = filter;
        }

        const searchParam = queryParams.get('search') || '';
        const searchProp = getProperty(options.searchProperty);

        if (searchProp && searchParam !== '') {
          where[searchProp.name] = {
            ...(where[searchProp.name] ? where[searchProp.name] : {}),
            regex: searchParam,
          };
        }

        /* ####################### */

        const page = parseInt(queryParams.get('page'), 10) || undefined;
        const field = queryParams.get('sort') || '';
        const order = queryParams.get('order');

        const variables = Object.assign(
          {
            skip: page ? (page - 1) * take : 0,
            take,
          },
          field && {
            sort: {
              field,
              order: order.toUpperCase(),
            },
          },
          Object.keys(where).length !== 0 && {
            where,
          },
        );

        return (
          <>
            <div className={classes.tableHeader}>
              <div>
                {options.title && (
                  <h1 className={classes.title}>{options.title}</h1>
                )}
              </div>
              {searchProp && (
                <Search
                  name={searchProp.name}
                  search={searchParam}
                  isTyping={isTyping}
                  setIsTyping={setIsTyping}
                />
              )}
            </div>
            <GetAll
              modelId={options.model}
              __SECRET_VARIABLES_DO_NOT_USE={variables}
            >
              {({ loading, error, data }) => {
                if (loading) {
                  return <LoadingTable numberOfItems={take} />;
                }

                if (error) {
                  return <EmptyTable text="Something went terribly wrong" />;
                }

                const { totalCount, results } = data;

                if (results.length === 0) {
                  return <EmptyTable text="No results" />;
                }

                const resultKeys = Object.keys(results[0]);

                const propertyNames = options.properties.map(id => {
                  const property = getProperty(id);
                  return property && property.name;
                });

                return (
                  <>
                    <div className={classes.table}>
                      <div className={classes.row}>
                        {resultKeys
                          .filter(
                            heading =>
                              options.properties.length === 0 ||
                              propertyNames.includes(heading),
                          )
                          .map(heading => (
                            <TableHeading
                              heading={heading}
                              search={searchParam}
                            />
                          ))}
                      </div>
                      {results.map(value => (
                        <div key={value[0]} className={classes.row}>
                          {Object.keys(value)
                            .filter(
                              val =>
                                options.properties.length === 0 ||
                                propertyNames.includes(val),
                            )
                            .map((val, index) => (
                              <div
                                key={`${resultKeys[index]}`}
                                className={classes.column}
                              >
                                {value[val]}
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                    <div className={classes.tableFooter}>
                      <Pagination
                        totalCount={totalCount}
                        resultCount={results.length}
                        search={searchParam}
                      />
                    </div>
                  </>
                );
              }}
            </GetAll>
          </>
        );

        /* Private components */

        // eslint-disable-next-line no-shadow
        function Search({ name, search, isTyping, setIsTyping }) {
          const inputRef = React.createRef();

          const {
            location: { pathname },
          } = useRouter();

          React.useEffect(() => {
            if (isTyping) {
              inputRef.current.focus();
            }
          });

          return (
            <div className={classes.searchWrapper}>
              <i
                className={[classes.searchIcon, 'zmdi zmdi-search'].join(' ')}
              />
              <input
                className={classes.search}
                type="text"
                value={search}
                onChange={({ target: { value } }) =>
                  history.push(`${pathname}?search=${value}`)
                }
                ref={inputRef}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                placeholder={`Search on ${name}`}
              />
            </div>
          );
        }

        function EmptyTable({ text }) {
          return (
            <div className={classes.table}>
              <div className={classes.row}>
                <div className={classes.column}>{text}</div>
              </div>
            </div>
          );
        }

        function LoadingTable({ numberOfItems }) {
          const skeletonHeadingClass = [
            classes.skeleton,
            classes.skeletonHeading,
          ].join(' ');

          return (
            <>
              <div className={classes.table}>
                <div className={classes.row}>
                  <div
                    className={[classes.column, classes.columnHeading].join(
                      ' ',
                    )}
                  >
                    <div className={skeletonHeadingClass} />
                  </div>
                  <div
                    className={[classes.column, classes.columnHeading].join(
                      ' ',
                    )}
                  >
                    <div className={skeletonHeadingClass} />
                  </div>
                  <div
                    className={[classes.column, classes.columnHeading].join(
                      ' ',
                    )}
                  >
                    <div className={skeletonHeadingClass} />
                  </div>
                </div>
                {Array.from(Array(numberOfItems).keys()).map(idx => (
                  <div key={idx} className={classes.row}>
                    <div className={classes.column}>
                      <div className={classes.skeleton} />
                    </div>
                    <div className={classes.column}>
                      <div className={classes.skeleton} />
                    </div>
                    <div className={classes.column}>
                      <div className={classes.skeleton} />
                    </div>
                  </div>
                ))}
              </div>

              <div className={classes.tableFooter}>
                <span className={classes.paginationInfoSkeleton} />
                <div className={classes.paginationSkeleton}>
                  <div className={classes.arrowSkeleton} />
                  <div className={classes.arrowSkeleton} />
                </div>
              </div>
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

          return (
            <div
              key={heading}
              className={[classes.column, classes.columnHeading].join(' ')}
            >
              <Link to={to} className={classes.columnHeadingLink}>
                {heading
                  .split('')
                  .map((char, index) => {
                    const charUppercased = char.toUpperCase();

                    if (index === 0) {
                      return charUppercased;
                    }

                    if (char === charUppercased) {
                      return ` ${char.toLowerCase()}`;
                    }

                    return char;
                  })
                  .join('')}
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
            </div>
          );
        }

        function Pagination({ totalCount, resultCount, search }) {
          const {
            location: { pathname },
          } = useRouter();

          const firstItem = page ? (page - 1) * take : 0;

          return (
            <>
              <span>
                {firstItem + 1}
                {firstItem + 1 !== totalCount &&
                  ` - ${firstItem + resultCount}`}{' '}
                of {totalCount}
              </span>
              <div className={classes.pagination}>
                {typeof page !== 'undefined' && page > 1 ? (
                  <Link
                    className={[classes.arrow, 'zmdi zmdi-chevron-left'].join(
                      ' ',
                    )}
                    to={[
                      pathname,
                      '?',
                      page ? `page=${page - 1}&` : '',
                      search ? `search=${search}&` : '',
                      field ? `sort=${field}&` : '',
                      order ? `order=${order}` : '',
                    ].join('')}
                  />
                ) : (
                  <span
                    className={[
                      classes.arrow,
                      classes.arrowDisabled,
                      'zmdi zmdi-chevron-left',
                    ].join(' ')}
                  />
                )}
                {(typeof page === 'undefined' ? 1 : page) <
                totalCount / take ? (
                  <Link
                    className={[classes.arrow, 'zmdi zmdi-chevron-right'].join(
                      ' ',
                    )}
                    to={[
                      pathname,
                      '?',
                      page ? `page=${page + 1}&` : 'page=2&',
                      search ? `search=${search}&` : '',
                      field ? `sort=${field}&` : '',
                      order ? `order=${order}` : '',
                    ].join('')}
                  />
                ) : (
                  <span
                    className={[
                      classes.arrow,
                      classes.arrowDisabled,
                      'zmdi zmdi-chevron-right',
                    ].join(' ')}
                  />
                )}
              </div>
            </>
          );
        }
      })()}
    </div>
  ),
  styles: B => theme => {
    const style = new B.Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
      },
      tableHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '4rem',
      },
      title: {
        margin: 0,
        fontFamily: style.getFontFamily('Title2'),
        fontSize: style.getFontSize('Title2'),
        fontWeight: style.getFontWeight('Title2'),
        textTransform: style.getTextTransform('Title2'),
        letterSpacing: style.getLetterSpacing('Title2'),
        color: style.getFontColor('Title2'),
      },
      searchWrapper: {
        display: 'flex',
        alignItems: 'center',
        padding: [0, '0.5rem'],
        borderBottom: [1, 'solid', '#000'],
      },
      searchIcon: {
        fontSize: '1.25rem',
        marginRight: '1rem',
      },
      search: {
        padding: ['0.25rem', 0],
        fontSize: '1rem',
        border: 'none',
        outline: 'none',
      },
      table: {
        display: 'table',
        width: '100%',
        borderCollapse: 'collapse',
      },
      row: {
        display: 'table-row',
      },
      column: {
        display: 'table-cell',
        padding: '0.75rem 1rem 0.75rem 0',
        fontFamily: style.getFontFamily('Body1'),
        fontSize: style.getFontSize('Body1'),
        fontWeight: style.getFontWeight('Body1'),
        textTransform: style.getTextTransform('Body1'),
        letterSpacing: style.getLetterSpacing('Body1'),
        color: style.getFontColor('Body1'),
        borderBottom: `0.0625rem solid ${style.getColor('Accent1')}`,
        [`@media ${B.mediaMinWidth(768)}`]: {
          fontSize: style.getFontSize('Body1', 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(1024)}`]: {
          fontSize: style.getFontSize('Body1', 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1200)}`]: {
          fontSize: style.getFontSize('Body1', 'Desktop'),
        },
      },
      columnHeading: {
        fontFamily: style.getFont('Body2').fontFamily,
        fontSize: style.getFont('Body2').Mobile,
        fontWeight: style.getFont('Body2').fontWeight,
        textTransform: style.getFont('Body2').textTransform,
        letterSpacing: style.getFont('Body2').letterSpacing,
        lineHeight: '1.2',
        color: style.getFont('Body2').color,
        [`@media ${B.mediaMinWidth(768)}`]: {
          fontSize: style.getFont('Body2').Portrait,
        },
        [`@media ${B.mediaMinWidth(1024)}`]: {
          fontSize: style.getFont('Body2').Landscape,
        },
        [`@media ${B.mediaMinWidth(1200)}`]: {
          fontSize: style.getFont('Body2').Desktop,
        },
        borderBottomWidth: '0.125rem',
      },
      columnHeadingLink: {
        display: 'flex',
        alignItems: 'center',
        color: style.getFont('Body2').color,
        whiteSpace: 'nowrap',
        textDecoration: 'none',
      },
      columnHeadingIcon: {
        position: 'relative',
        top: '0.0625rem',
        margin: [0, '0.5rem'],
      },
      skeleton: {
        height: `calc(${style.getFont('Body1').Mobile} * 1.2)`,
        [`@media ${B.mediaMinWidth(768)}`]: {
          height: `calc(${style.getFont('Body1').Portrait} * 1.2)`,
        },
        [`@media ${B.mediaMinWidth(1024)}`]: {
          height: `calc(${style.getFont('Body1').Landscape} * 1.2)`,
        },
        [`@media ${B.mediaMinWidth(1200)}`]: {
          height: `calc(${style.getFont('Body1').Desktop} * 1.2)`,
        },
      },
      skeletonHeading: {
        height: `calc(${style.getFont('Body2').Mobile} * 1.15)`,
        [`@media ${B.mediaMinWidth(768)}`]: {
          height: `calc(${style.getFont('Body2').Portrait} * 1.15)`,
        },
        [`@media ${B.mediaMinWidth(1024)}`]: {
          height: `calc(${style.getFont('Body2').Landscape} * 1.15)`,
        },
        [`@media ${B.mediaMinWidth(1200)}`]: {
          height: `calc(${style.getFont('Body2').Desktop} * 1.15)`,
        },
        backgroundColor: '#eee',
        borderRadius: 8,
        overflow: 'hidden',
        '&::after': {
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(90deg, #eee 25%, #fff 50%, #eee 75%)',
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: '150%',
          borderRadius: `calc(${style.getFont('Body2').Landscape} / 2)`,
          content: '""',
          animation: 'loading 1.5s infinite',
        },
      },
      '@keyframes loading': {
        to: {
          backgroundPositionX: '-150%',
        },
      },
      tableFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: ['0.75rem', 0],
      },
      paginationInfoSkeleton: {
        height: 'calc(1rem * 1.2)',
        width: 100,
        backgroundColor: '#eee',
        borderRadius: 'calc(1rem / 2)',
        '&::after': {
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(90deg, #eee 25%, #fff 50%, #eee 75%)',
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: '150%',
          borderRadius: 'calc(1rem / 2)',
          content: '""',
          animation: 'loading 1.5s infinite',
        },
      },
      pagination: {
        marginLeft: '1rem',
      },
      paginationSkeleton: {
        marginLeft: '1rem',
      },
      arrow: {
        padding: '1rem',
        fontSize: '1.625rem',
        color: '#000',
        textDecoration: 'none',
      },
      arrowDisabled: { color: '#ccc' },
      arrowSkeleton: {
        display: 'inline-block',
        height: 'calc(1.625rem * 1.2)',
        width: 'calc(1.625rem * 1.2)',
        margin: '0.75rem 0.375rem',
        backgroundColor: '#eee',
        borderRadius: '50%',
        '&::after': {
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(90deg, #eee 25%, #fff 50%, #eee 75%)',
          backgroundSize: '200% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: '150%',
          borderRadius: '50%',
          content: '""',
          animation: 'loading 1.5s infinite',
        },
      },
      [`@media ${B.mediaMinWidth(768)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
      },
      [`@media ${B.mediaMinWidth(1024)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
      },
      [`@media ${B.mediaMinWidth(1200)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
    };
  },
}))();
