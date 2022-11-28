(() => ({
  name: 'FilterComponent',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env } = B;
    const { MenuItem, TextField, Button, ButtonGroup } = window.MaterialUI.Core;
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
        groups: [
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
        ],
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
    const operatorList = [
      'eq',
      'neq',
      'starts_with',
      'ends_with',
      'contains',
      'matches',
      'does_not_match',
    ];

    useEffect(() => {
      console.log(groups);
    }, [groups]);

    const filterProps = (properties, id, kind) => {
      return Object.values(properties).filter((props) => {
        return props.modelId === id && props.kind === kind;
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
      return {
        [prop]: {
          [op]: right,
        },
      };
    };

    const updateRowProperty = (rowId, tree, propertyToUpdate, newValue) => {
      return tree.map((group) => {
        const foundRow = group.rows.filter((row) => row.rowId === rowId);
        if (foundRow.length === 0) {
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

    const addGroup = (tree, groupId) => {
      const newGroup = {
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
      };

      return tree.map((group) => {
        if (group.id === groupId) {
          group.groups.push(newGroup);
          return group;
        }
        group.groups = addGroup(group.groups, groupId);
        return group;
      });
    };

    const addGroupButton = (group) => {
      return (
        <button
          type="button"
          onClick={() => setGroups(addGroup(groups, group.id))}
        >
          add group
        </button>
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
        group.groups = addFilter(group.groups, groupId);
        return group;
      });
    };

    const addFilterButton = (group) => {
      return (
        <button
          type="button"
          onClick={() => {
            setGroups(addFilter(groups, group.id));
          }}
        >
          add row
        </button>
      );
    };

    const deleteFilter = (tree, rowId) => {
      return tree.map((group) => {
        const foundRow = group.rows.filter((row) => row.rowId === rowId);
        if (foundRow.length === 0) {
          group.groups = deleteFilter(group.groups, rowId);
          return group;
        }
        group.rows = group.rows.filter((row) => row.rowId !== rowId);
        return group;
      });
    };

    const deleteGroup = (tree, groupId) => {
      return tree.map((group) => {
        const foundGroup = group.groups.filter((g) => g.id === groupId);
        if (foundGroup.length === 0) {
          group.groups = deleteGroup(group.groups, groupId);
          return group;
        }
        group.groups = group.groups.filter((grp) => grp.id !== groupId);
        return group;
      });
    };

    const filterRow = (row) => {
      const { properties } = artifact;
      const filteredProps = filterProps(properties, modelId, 'string');
      return (
        <div key={row.rowId} style={{ width: '100%', marginBottom: '10px' }}>
          <TextField
            value={
              row.propertyValue === ''
                ? filteredProps[0].name
                : row.propertyValue
            }
            select
            variant="outlined"
            style={{ marginRight: '10px' }}
            onChange={(e) => {
              console.log('group', groups);
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
            {filteredProps.map((prop) => renderOption(prop.name, prop.label))}
          </TextField>
          <TextField
            value={row.operator}
            select
            variant="outlined"
            style={{ marginRight: '10px' }}
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
            {operatorList.map((op) => {
              return renderOption(op, op);
            })}
          </TextField>
          <TextField
            value={row.rightValue}
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
          <button
            type="button"
            onClick={() => {
              setGroups(deleteFilter(groups, row.rowId));
            }}
          >
            Delete
          </button>
        </div>
      );
    };

    const renderTree = (tree, count = 0) => {
      return (
        <>
          {tree.map((node) => (
            <div
              key={node.id}
              style={{
                marginLeft: `${10 * count}px`,
                border: '1px solid black',
              }}
            >
              <div>{node.operator}</div>
              <ButtonGroup size="small">
                <Button
                  disableElevation
                  variant="contained"
                  color={node.operator === '_and' ? 'primary' : 'default'}
                  onClick={() => {
                    setGroups(
                      updateGroupProperty(node.id, groups, 'operator', '_and'),
                    );
                  }}
                >
                  AND
                </Button>
                <Button
                  disableElevation
                  variant="contained"
                  color={node.operator === '_or' ? 'primary' : 'default'}
                  onClick={() => {
                    setGroups(
                      updateGroupProperty(node.id, groups, 'operator', '_or'),
                    );
                  }}
                >
                  OR
                </Button>
              </ButtonGroup>
              {addGroupButton(node)}
              {addFilterButton(node)}
              {count !== 0 && (
                <Button
                  type="button"
                  onClick={() => {
                    setGroups(deleteGroup(groups, node.id));
                  }}
                >
                  Del Group
                </Button>
              )}
              <hr />
              {node.rows.map((row) => filterRow(row, node.id))}
              {node.groups && renderTree(node.groups, count + 1)}
            </div>
          ))}
        </>
      );
    };

    const filterBuilder = () => {
      return <div>{renderTree(groups)}</div>;
    };

    return isDev ? <div className={classes.wrapper}>DEV</div> : filterBuilder();
  })(),
  styles: (B) => (theme) => {
    const { color: colorFunc, env, mediaMinWidth, Styling, useText } = B;
    const style = new Styling(theme);
    const isDev = env === 'dev';
    const getColorAlpha = (col, val) => colorFunc.alpha(col, val);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      wrapper: {
        display: 'flex',
        flexShrink: ({ options: { stretch } }) => (stretch ? 1 : 0),
        flexGrow: ({ options: { stretch } }) => (stretch ? 1 : 0),
        height: ({ options: { height } }) => height,
        minHeight: 0,
        flexBasis: 'auto',
        flexDirection: 'column',
        alignContent: 'stretch',
        boxSizing: 'border-box',
        position: ({ options: { position } }) =>
          position === 'fixed' && isDev ? 'absolute' : position,
        top: ({ options: { top } }) => top,
        right: ({ options: { right } }) => right,
        bottom: ({ options: { bottom } }) => bottom,
        left: ({ options: { left } }) => left,
        width: ({ options: { width } }) => width,
        '& > div': {
          flexShrink: [1, '!important'],
          flexGrow: [1, '!important'],
        },
      },
      root: {
        boxSizing: 'border-box',
        height: ({ options: { height } }) => (isDev ? '100%' : height),
        minHeight: 0,
        position: ({ options: { position } }) =>
          (!isDev && position) || 'unset',
        top: ({ options: { top } }) => !isDev && top,
        right: ({ options: { right } }) => !isDev && right,
        bottom: ({ options: { bottom } }) => !isDev && bottom,
        left: ({ options: { left } }) => !isDev && left,
        width: ({ options: { width } }) => !isDev && width,
        flexShrink: ({ options: { stretch } }) => (stretch ? 1 : 0),
        flexGrow: ({ options: { stretch } }) => (stretch ? 1 : 0),
        transition: 'opacity 0.5s ease-out',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        paddingTop: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[0]),
        paddingRight: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[1]),
        paddingBottom: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[2]),
        paddingLeft: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Portrait'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Portrait'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Portrait'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Portrait'),
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
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Landscape'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Landscape'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Landscape'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Landscape'),
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
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0], 'Desktop'),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1], 'Desktop'),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2], 'Desktop'),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3], 'Desktop'),
        },
      },
      filtercomp: {
        marginRight: '10px',
      },
      background: {
        backgroundColor: ({
          options: { backgroundColor, backgroundColorAlpha },
        }) =>
          backgroundColor === 'Transparent'
            ? style.getColor(backgroundColor)
            : getColorAlpha(
                style.getColor(backgroundColor),
                backgroundColorAlpha / 100,
              ),
        backgroundImage: ({ options: { backgroundUrl } }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const image = useText(backgroundUrl);
          return image && `url("${image}")`;
        },
        backgroundSize: ({ options: { backgroundSize } }) => backgroundSize,
        backgroundPosition: ({ options: { backgroundPosition } }) =>
          backgroundPosition,
        backgroundRepeat: ({ options: { backgroundRepeat } }) =>
          backgroundRepeat,
        backgroundAttachment: ({ options: { backgroundAttachment } }) =>
          backgroundAttachment,
      },
      border: {
        borderWidth: ({ options: { borderWidth, borderStyle, borderColor } }) =>
          borderWidth && borderStyle && borderColor ? borderWidth : 0,
        borderStyle: ({ options: { borderStyle } }) => borderStyle,
        borderColor: ({ options: { borderColor } }) =>
          style.getColor(borderColor),
        borderRadius: ({ options: { borderRadius } }) => borderRadius,
      },
      empty: {
        display: ['flex', '!important'],
        justifyContent: ['center', '!important'],
        alignItems: 'center',
        height: ['2.5rem', '!important'],
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();
