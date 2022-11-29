(() => ({
  name: 'FilterComponent',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
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

    const filterRow = (row, deletable) => {
      const { properties } = artifact;
      const filteredProps = filterProps(properties, modelId, 'string');
      return (
        <div key={row.rowId} style={{ width: '100%', marginBottom: '10px' }}>
          <TextField
            value={row.propertyValue}
            select
            size="small"
            variant="outlined"
            style={{ marginRight: '10px' }}
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
            {filteredProps.map((prop) => renderOption(prop.name, prop.label))}
          </TextField>
          <TextField
            size="small"
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
            size="small"
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
          Add group
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
          Add row
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
                      console.log('grps', groups);
                      const newGroups = deleteGroup(groups, node.id);
                      console.log('nodeid', node.id);
                      console.log('newGrps', newGroups);
                      setGroups(newGroups);
                    }}
                  >
                    <Icon name="Delete" fontSize="small" />
                  </IconButton>
                </div>
                {node.rows.map((row) => filterRow(row, node.rows.length > 1))}
                {addFilterButton(node)}
                {/* 
              nested groups
              {node.groups &&
                node.groups.length > 1 &&
                renderTree(node.groups, count + 1)} */}
              </div>
              {index + 1 < tree.length && (
                <ButtonGroup size="small">
                  <Button
                    disableElevation
                    variant="contained"
                    color={groupsOperator === '_and' ? 'primary' : 'default'}
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
              console.log(makeFilter(tree));
            }}
          >
            Save
          </Button>
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
      filter: {
        boxShadow:
          'rgb(102 109 133 / 5%) 0px -0.0625rem 0.0625rem 0px, rgb(102 109 133 / 20%) 0px 0.0625rem 0.25rem 0px',
        borderRadius: '0.25rem',
        position: 'relative',
        padding: '0.5rem',
        flexShrink: '0',
        marginBottom: '15px',
        marginTop: '15px',
      },
      operator: {
        position: 'absolute',
        margin: '0px',
        top: '0.5rem',
        right: '0.5rem',
      },
      deleteGroup: {
        position: 'absolute',
        margin: '0px',
        top: '0.2rem',
        right: '6.5rem',
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
