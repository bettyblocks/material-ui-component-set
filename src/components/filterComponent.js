(() => ({
  name: 'FilterComponent',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, Icon } = B;
    const { MenuItem, TextField, Button, ButtonGroup, IconButton } =
      window.MaterialUI.Core;
    const { modelId } = options;
    const isDev = env === 'dev';
    const makeId = (length = 16) => {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i += 1) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    };
    const [groups, setGroups] = React.useState([
      {
        id: makeId(),
        operator: '_and',
        groups: [],
        rows: [
          {
            rowId: makeId(),
            propertyValue: '',
            operator: 'eq',
            rightValue: '',
          },
        ],
      },
    ]);
    const [groupsOperator, setGroupsOperator] = React.useState('_and');

    const stringKinds = [
      'string',
      'string_expression',
      'email_address',
      'serial',
      'zipcode',
      'url',
      'text',
      'text_expression',
    ];
    const numberKinds = [
      'count',
      'decimal',
      'decimal_expression',
      'float',
      'integer',
      'integer_expression',
      'price',
      'price_expression',
      'phone_number',
    ];

    // const booleanKinds = ['boolean', 'boolean_expression'];

    const relationKinds = ['has_and_belongs_to_many', 'has_many', 'has_one'];

    const operatorList = [
      {
        operator: 'eq',
        label: 'Equals',
        kinds: ['*'],
      },
      {
        operator: 'neq',
        label: 'Is not equal to',
        kinds: ['*'],
      },
      {
        operator: 'ex',
        label: 'Exists',
        kinds: ['*'],
      },
      {
        operator: 'nex',
        label: 'Not exists',
        kinds: ['*'],
      },
      {
        operator: 'starts_with',
        label: 'Starts with',
        kinds: [...stringKinds],
      },
      {
        operator: 'ends_with',
        label: 'Ends with',
        kinds: [...stringKinds],
      },
      {
        operator: 'regex',
        label: 'Contains',
        kinds: [...stringKinds],
      },
      {
        operator: 'matches',
        label: 'Matches with',
        kinds: [...stringKinds],
      },
      {
        operator: 'does_not_match',
        label: 'Does not match',
        kinds: [...stringKinds],
      },
      {
        operator: 'gt',
        label: 'Greater than',
        kinds: [...numberKinds],
      },
      {
        operator: 'lt',
        label: 'Lower than',
        kinds: [...numberKinds],
      },
      {
        operator: 'gteq',
        label: 'Greater than or equal',
        kinds: [...numberKinds],
      },
      {
        operator: 'lteq',
        label: 'Lower than or equal',
        kinds: [...numberKinds],
      },
    ];
    const filterProps = (properties, id) => {
      return Object.values(properties).filter((prop) => {
        return prop.modelId === id && !relationKinds.includes(prop.kind);
      });
    };
    const filterOperators = (kind, operators) => {
      if (!kind) return operators;
      return operators.filter((op) => {
        return op.kinds.includes(kind) || op.kinds.includes('*');
      });
    };
    const renderOption = (key, value) => {
      return (
        <MenuItem key={key} value={key}>
          {value}
        </MenuItem>
      );
    };
    const makeFilterChild = (prop, op, right) => {
      switch (op) {
        case 'ex':
          return {
            [prop]: {
              exists: true,
            },
          };

        case 'nex':
          return {
            [prop]: {
              does_not_exist: 0,
            },
          };

        default:
          return {
            [prop]: {
              [op]: right,
            },
          };
      }
    };
    const makeFilter = (tree) => {
      return {
        where: {
          [groupsOperator]: tree.map((node) => {
            return {
              [node.operator]: node.rows.map((subnode) => {
                return makeFilterChild(
                  subnode.propertyValue,
                  subnode.operator,
                  subnode.rightValue,
                );
              }),
            };
          }),
        },
      };
    };
    const updateRowProperty = (rowId, tree, propertyToUpdate, newValue) => {
      return tree.map((group) => {
        const foundRow = group.rows.filter((row) => row.rowId === rowId);
        if (foundRow.length === 0) {
          // eslint-disable-next-line no-param-reassign
          group.groups = updateRowProperty(
            rowId,
            group.groups,
            propertyToUpdate,
            newValue,
          );
          return group;
        }
        group.rows.map((row) => {
          const newRow = row;
          if (row.rowId === rowId) {
            newRow[propertyToUpdate] = newValue;
          }
          return newRow;
        });
        return group;
      });
    };
    const updateGroupProperty = (groupId, tree, propertyToUpdate, newValue) => {
      return tree.map((group) => {
        if (group.id === groupId) {
          const newGroup = group;
          newGroup[propertyToUpdate] = newValue;
          return newGroup;
        }
        const foundGroup = group.groups.filter((g) => g.id === groupId);
        if (foundGroup.length === 0) {
          // eslint-disable-next-line no-param-reassign
          group.groups = updateGroupProperty(
            groupId,
            group.groups,
            propertyToUpdate,
            newValue,
          );
          return group;
        }
        group.groups.map((grp) => {
          const newGroup = grp;
          if (grp.id === groupId) {
            newGroup[propertyToUpdate] = newValue;
          }
          return newGroup;
        });
        return group;
      });
    };
    const deleteFilter = (tree, rowId) => {
      return tree.map((group) => {
        const foundRow = group.rows.filter((row) => row.rowId === rowId);
        if (foundRow.length === 0) {
          // eslint-disable-next-line no-param-reassign
          group.groups = deleteFilter(group.groups, rowId);
          return group;
        }
        // eslint-disable-next-line no-param-reassign
        group.rows = group.rows.filter((row) => row.rowId !== rowId);
        return group;
      });
    };
    const filterRow = (row, deletable) => {
      // eslint-disable-next-line no-undef
      const { properties } = artifact || {};

      const filteredProps = filterProps(properties, modelId);
      console.log(filteredProps);
      // set initial dropdown value
      if (row.propertyValue === '') {
        setGroups(
          updateRowProperty(
            row.rowId,
            groups,
            'propertyValue',
            filteredProps[0].id,
          ),
        );
      }
      const selectedIndex = filteredProps.findIndex(
        (prop) => prop.id === row.propertyValue,
      );
      const selectedProp = filteredProps[selectedIndex];
      const isNumberType = numberKinds.includes(selectedProp.kind);
      const isSpecialType = row.operator === 'ex' || row.operator === 'nex';
      return (
        <div key={row.rowId} style={{ width: '100%', marginBottom: '10px' }}>
          <TextField
            value={row.propertyValue}
            select
            size="small"
            variant="outlined"
            style={{ marginRight: '10px', width: '33%' }}
            onChange={(e) => {
              setGroups(
                updateRowProperty(
                  row.rowId,
                  groups,
                  'propertyValue',
                  e.target.value,
                ),
              );
            }}
          >
            {filteredProps.map((prop) => renderOption(prop.id, prop.label))}
          </TextField>
          <TextField
            size="small"
            value={row.operator}
            select
            variant="outlined"
            style={{ marginRight: '10px', width: '15%' }}
            onChange={(e) => {
              setGroups(
                updateRowProperty(
                  row.rowId,
                  groups,
                  'operator',
                  e.target.value,
                ),
              );
            }}
          >
            {filterOperators(selectedProp.kind, operatorList).map((op) => {
              return renderOption(op.operator, op.label);
            })}
          </TextField>
          {!isSpecialType && (
            <TextField
              size="small"
              value={row.rightValue}
              type={isNumberType ? 'number' : 'text'}
              style={{ width: '33%' }}
              variant="outlined"
              onChange={(e) => {
                setGroups(
                  updateRowProperty(
                    row.rowId,
                    groups,
                    'rightValue',
                    e.target.value,
                  ),
                );
              }}
            />
          )}
          <IconButton
            aria-label="delete"
            disabled={!deletable}
            onClick={() => {
              setGroups(deleteFilter(groups, row.rowId));
            }}
          >
            <Icon name="Delete" fontSize="small" />
          </IconButton>
        </div>
      );
    };
    const addGroupButton = () => {
      return (
        <Button
          type="button"
          style={{ textTransform: 'none' }}
          variant="outlined"
          classes={{ outlined: classes.addFilterButton }}
          onClick={() => {
            setGroups([
              ...groups,
              {
                id: makeId(),
                operator: '_or',
                groups: [],
                rows: [
                  {
                    rowId: makeId(),
                    propertyValue: '',
                    operator: 'eq',
                    rightValue: '',
                  },
                ],
              },
            ]);
          }}
        >
          <Icon name="Add" fontSize="small" />
          Add filter group
        </Button>
      );
    };
    const addFilter = (tree, groupId) => {
      const newRow = {
        rowId: makeId(),
        propertyValue: '',
        operator: 'eq',
        rightValue: '',
      };

      return tree.map((group) => {
        if (group.id === groupId) {
          group.rows.push(newRow);
          return group;
        }
        // eslint-disable-next-line no-param-reassign
        group.groups = addFilter(group.groups, groupId);
        return group;
      });
    };
    const addFilterButton = (group) => {
      return (
        <Button
          type="button"
          style={{ textTransform: 'none' }}
          onClick={() => {
            setGroups(addFilter(groups, group.id));
          }}
        >
          <Icon name="Add" fontSize="small" />
          Add filter row
        </Button>
      );
    };
    const deleteGroup = (tree, groupId) => {
      const newTree = tree.slice();
      const foundIndex = newTree.findIndex((g) => g.id === groupId);

      if (foundIndex > -1) {
        newTree.splice(foundIndex, 1);
      }
      return newTree;
    };
    const operatorSwitch = (node) => {
      return (
        <ButtonGroup size="small" className={classes.operator}>
          <Button
            disableElevation
            variant="contained"
            classes={{ containedPrimary: classes.highlight }}
            color={node.operator === '_and' ? 'primary' : 'default'}
            onClick={() => {
              setGroups(
                updateGroupProperty(node.id, groups, 'operator', '_and'),
              );
            }}
          >
            and
          </Button>
          <Button
            disableElevation
            variant="contained"
            classes={{ containedPrimary: classes.highlight }}
            color={node.operator === '_or' ? 'primary' : 'default'}
            onClick={() => {
              setGroups(
                updateGroupProperty(node.id, groups, 'operator', '_or'),
              );
            }}
          >
            or
          </Button>
        </ButtonGroup>
      );
    };
    const renderTree = (tree) => {
      return (
        <>
          {tree.map((node, index) => (
            <>
              <div key={node.id} className={classes.filter}>
                {operatorSwitch(node)}
                <div className={classes.deleteGroup}>
                  <IconButton
                    disabled={index === 0}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const newGroups = deleteGroup(groups, node.id);
                      setGroups(newGroups);
                    }}
                  >
                    <Icon name="Delete" fontSize="small" />
                  </IconButton>
                </div>
                {node.rows.map((row) => filterRow(row, node.rows.length > 1))}
                {addFilterButton(node)}
              </div>
              {index + 1 < tree.length && (
                <ButtonGroup size="small">
                  <Button
                    disableElevation
                    variant="contained"
                    color={groupsOperator === '_and' ? 'primary' : 'default'}
                    classes={{ containedPrimary: classes.highlight }}
                    onClick={() => {
                      setGroupsOperator('_and');
                    }}
                  >
                    and
                  </Button>
                  <Button
                    disableElevation
                    variant="contained"
                    color={groupsOperator === '_or' ? 'primary' : 'default'}
                    classes={{ containedPrimary: classes.highlight }}
                    onClick={() => {
                      setGroupsOperator('_or');
                    }}
                  >
                    or
                  </Button>
                </ButtonGroup>
              )}
            </>
          ))}
          {addGroupButton(groups)}
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (tree) {
                B.triggerEvent('onSubmit', makeFilter(tree));
                console.log(makeFilter(tree));
              }
            }}
            classes={{ contained: classes.saveButton }}
            style={{ textTransform: 'none' }}
            variant="contained"
          >
            Apply filter
          </Button>
        </>
      );
    };
    return isDev ? (
      <div className={`${classes.root} ${classes.pristine}`}>Filter</div>
    ) : (
      <div className={classes.root}>{renderTree(groups)}</div>
    );
  })(),
  styles: (B) => (theme) => {
    const { env, Styling, mediaMinWidth } = B;
    const isDev = env === 'dev';
    const style = new Styling(theme);
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
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
        width: ({ options: { width } }) => !isDev && width,
        height: ({ options: { height } }) => (isDev ? '100%' : height),
        minHeight: 0,
      },
      saveButton: {
        backgroundColor: ({ options: { highlightColor } }) => [
          style.getColor(highlightColor),
          '!important',
        ],
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        float: 'right',
      },
      addFilterButton: {
        borderColor: ({ options: { highlightColor } }) => [
          style.getColor(highlightColor),
          '!important',
        ],
        border: '1px solid',
      },
      highlight: {
        backgroundColor: ({ options: { highlightColor } }) => [
          style.getColor(highlightColor),
          '!important',
        ],
      },
      icons: {
        color: ({ options: { highlightColor } }) => [
          style.getColor(highlightColor),
          '!important',
        ],
      },
      filter: {
        border: '1px solid',
        borderRadius: '10px',
        borderColor: ({ options: { borderColor } }) => [
          style.getColor(borderColor),
          '!important',
        ],
        padding: '15px',
        marginTop: '15px',
        marginBottom: '15px',
        position: 'relative',
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
      },
      filterInput: {
        width: '33%',
      },
      operator: {
        position: 'absolute',
        height: '25px',
        margin: '0px',
        top: '1.2rem',
        right: '0.5rem',
      },
      deleteGroup: {
        position: 'absolute',
        margin: '0px',
        top: '0.6rem',
        right: '6.5rem',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
        display: ['flex', '!important'],
        justifyContent: ['center', '!important'],
        alignItems: 'center',
        height: ['2.5rem', '!important'],
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
      },
    };
  },
}))();
