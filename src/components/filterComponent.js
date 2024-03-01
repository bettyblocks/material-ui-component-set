(() => ({
  name: 'Filter',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, Icon } = B;
    const { MenuItem, TextField, Button, ButtonGroup, IconButton, Checkbox } =
      window.MaterialUI.Core;
    const { DateFnsUtils } = window.MaterialUI;
    const {
      MuiPickersUtilsProvider,
      KeyboardDatePicker,
      KeyboardDateTimePicker,
    } = window.MaterialUI.Pickers;

    const { modelId, propertyWhiteList } = options;
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

    const initialState = [
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
    ];
    const [groups, setGroups] = React.useState(initialState);
    const [groupsOperator, setGroupsOperator] = React.useState('_and');

    const stringKinds = [
      'string',
      'string_expression',
      'email_address',
      'zipcode',
      'url',
      'text',
      'text_expression',
      'rich_text',
      'auto_increment',
      'phone_number',
      'iban',
      'list',
    ];
    const numberKinds = [
      'serial',
      'count',
      'decimal',
      'decimal_expression',
      'float',
      'integer',
      'integer_expression',
      'price',
      'price_expression',
      'minutes',
    ];
    const dateKinds = ['date', 'date_expression'];
    const dateTimeKinds = ['date_time_expression', 'date_time', 'time'];
    const booleanKinds = ['boolean', 'boolean_expression'];
    const forbiddenKinds = [
      'has_and_belongs_to_many',
      'has_many',
      'has_one',
      'belongs_to',
      'image',
      'file',
      'password',
      'pdf',
      'multi_image',
      'multi_file',
    ];
    const operatorList = [
      {
        operator: 'eq',
        label: 'Equals',
        kinds: ['*'],
      },
      {
        operator: 'neq',
        label: 'Does not equal',
        kinds: ['*'],
      },
      {
        operator: 'ex',
        label: 'Exists',
        kinds: ['*'],
      },
      {
        operator: 'nex',
        label: 'Does not exist',
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
        operator: 'matches',
        label: 'Contains',
        kinds: [...stringKinds],
      },
      {
        operator: 'does_not_match',
        label: 'Does not contain',
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
        label: 'Greater than or equals',
        kinds: [...numberKinds],
      },
      {
        operator: 'lteq',
        label: 'Lower than or equals',
        kinds: [...numberKinds],
      },
      {
        operator: 'gt',
        label: 'Is after',
        kinds: [...dateKinds, ...dateTimeKinds],
      },
      {
        operator: 'lt',
        label: 'Is before',
        kinds: [...dateKinds, ...dateTimeKinds],
      },
      {
        operator: 'gteg',
        label: 'Is after or at',
        kinds: [...dateKinds, ...dateTimeKinds],
      },
      {
        operator: 'lteq',
        label: 'Is before or at',
        kinds: [...dateKinds, ...dateTimeKinds],
      },
    ];
    B.defineFunction('Add filter group', () => {
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
    });

    B.defineFunction('Reset advanced filter', () => {
      setGroups(initialState);
    });

    const whiteListItems =
      (propertyWhiteList && propertyWhiteList.split(',')) || [];
    const filterProps = (properties, id) => {
      return Object.values(properties).filter((prop) => {
        return (
          // Always add the id
          (prop.modelId === id && prop.name === 'id') ||
          // Add all properties besides the forbidden
          (prop.modelId === id &&
            !forbiddenKinds.includes(prop.kind) &&
            whiteListItems.length === 0) ||
          // Only add properties who are whitelisted and not forbidden
          (prop.modelId === id &&
            !forbiddenKinds.includes(prop.kind) &&
            whiteListItems.length > 0 &&
            whiteListItems.includes(prop.name))
        );
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
      if (!modelId) return <p>Please select a model</p>;
      // eslint-disable-next-line no-undef
      const { properties } = artifact || {};

      const filteredProps = filterProps(properties, modelId).sort((a, b) =>
        a.name.localeCompare(b.name),
      );
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
      const isDateType = dateKinds.includes(selectedProp.kind);
      const isDateTimeType = dateTimeKinds.includes(selectedProp.kind);
      const isBooleanType = booleanKinds.includes(selectedProp.kind);
      const isSpecialType = row.operator === 'ex' || row.operator === 'nex';
      const inputType = () => {
        if (isNumberType) return 'number';
        return 'text';
      };
      const isTextType =
        !isSpecialType && !isBooleanType && !isDateTimeType && !isDateType;
      return (
        <div key={row.rowId} style={{ width: '100%', marginBottom: '10px' }}>
          <TextField
            value={row.propertyValue}
            classes={{ root: classes.textFieldHighlight }}
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
              setGroups(updateRowProperty(row.rowId, groups, 'rightValue', ''));
            }}
          >
            {filteredProps.map((prop) => renderOption(prop.id, prop.label))}
          </TextField>
          <TextField
            size="small"
            value={row.operator}
            classes={{ root: classes.textFieldHighlight }}
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
          {isTextType && (
            <TextField
              size="small"
              value={row.rightValue}
              classes={{ root: classes.textFieldHighlight }}
              type={inputType()}
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
          {isBooleanType && !isSpecialType && (
            <Checkbox
              checked={row.rightValue}
              classes={{ checked: classes.checkBox }}
              onChange={(e) => {
                setGroups(
                  updateRowProperty(
                    row.rowId,
                    groups,
                    'rightValue',
                    e.target.checked,
                  ),
                );
              }}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          )}
          {isDateType && !isSpecialType && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="none"
                classes={{
                  toolbar: classes.datePicker,
                  daySelected: classes.datePicker,
                  root: classes.textFieldHighlight,
                }}
                size="small"
                value={row.rightValue === '' ? null : row.rightValue}
                initialFocusedDate={new Date()}
                style={{ width: '33%', margin: '0px' }}
                id="date-picker-dialog"
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                allowKeyboardControl={false}
                onChange={(date) => {
                  const dateValue = date.toISOString().split('T')[0];
                  setGroups(
                    updateRowProperty(
                      row.rowId,
                      groups,
                      'rightValue',
                      dateValue,
                    ),
                  );
                }}
              />
            </MuiPickersUtilsProvider>
          )}
          {isDateTimeType && !isSpecialType && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                margin="none"
                classes={{
                  toolbar: classes.datePicker,
                  daySelected: classes.datePicker,
                  root: classes.textFieldHighlight,
                }}
                id="date-picker-dialog"
                style={{ width: '33%', margin: '0px' }}
                size="small"
                value={row.rightValue === '' ? null : row.rightValue}
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                allowKeyboardControl={false}
                onChange={(date) => {
                  setGroups(
                    updateRowProperty(
                      row.rowId,
                      groups,
                      'rightValue',
                      date.toISOString(),
                    ),
                  );
                }}
              />
            </MuiPickersUtilsProvider>
          )}
          {deletable && (
            <IconButton
              aria-label="delete"
              onClick={() => {
                setGroups(deleteFilter(groups, row.rowId));
              }}
            >
              <Icon name="Delete" fontSize="small" />
            </IconButton>
          )}
        </div>
      );
    };
    const filterRowDev = () => {
      return (
        <div style={{ width: '100%', marginBottom: '10px' }}>
          <TextField
            disabled
            select
            size="small"
            variant="outlined"
            style={{ marginRight: '10px', width: '33%' }}
          />
          <TextField
            size="small"
            disabled
            select
            variant="outlined"
            style={{ marginRight: '10px', width: '15%' }}
          />
          <TextField
            size="small"
            disabled
            type="text"
            style={{ width: '33%' }}
            variant="outlined"
          />
          <IconButton aria-label="delete" disabled>
            <Icon name="Delete" fontSize="small" />
          </IconButton>
        </div>
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
    const addFilterButton = (group, dev) => {
      return (
        <Button
          type="button"
          disabled={dev}
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
    const operatorSwitch = (node, dev) => {
      return (
        <ButtonGroup size="small" className={classes.operator} disabled={dev}>
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
    const renderTree = (tree, dev) => {
      return (
        <>
          {tree.map((node, index) => (
            <>
              <div key={node.id} className={classes.filter}>
                {tree.length > 1 && (
                  <div className={classes.deleteGroup}>
                    <IconButton
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
                )}
                {operatorSwitch(node, dev)}

                {node.rows.map((row) =>
                  dev ? filterRowDev() : filterRow(row, node.rows.length > 1),
                )}
                {addFilterButton(node, dev)}
              </div>
              {index + 1 < tree.length && (
                <ButtonGroup size="small" disabled={dev}>
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
        </>
      );
    };

    B.defineFunction('Apply filter', () => {
      B.triggerEvent('onSubmit', makeFilter(groups));
    });

    return isDev ? (
      <div className={includeStyling(classes.root)}>
        {renderTree(groups, true)}
      </div>
    ) : (
      <div className={includeStyling(classes.root)}>{renderTree(groups)}</div>
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
      textFieldHighlight: {
        '& .MuiInputBase-root': {
          '&.Mui-focused, &.Mui-focused:hover': {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline':
              {
                borderColor: ({ options: { highlightColor } }) => [
                  style.getColor(highlightColor),
                  '!important',
                ],
              },
          },
        },
      },
      checkBox: {
        color: ({ options: { highlightColor } }) => [
          style.getColor(highlightColor),
          '!important',
        ],
      },
      datePicker: {
        backgroundColor: ({ options: { highlightColor } }) => [
          style.getColor(highlightColor),
          '!important',
        ],
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
        borderRadius: ({ options: { borderRadius } }) => borderRadius,
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
        bottom: '15px',
        right: '15px',
      },
      deleteGroup: {
        position: 'absolute',
        margin: '0px',
        top: '0.6rem',
        right: '0.5rem',
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
