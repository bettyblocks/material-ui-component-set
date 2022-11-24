/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
(() => ({
  name: 'FilterComponent',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env } = B;
    const { MenuItem, TextField } = window.MaterialUI.Core;
    const {
      // alignment,
      // valignment,
      // transparent,
      // backgroundColor,
      // borderColor,
      // backgroundUrl,
      // dataComponentAttribute,
      modelId,
    } = options;
    const isDev = env === 'dev';
    const [groups, setGroups] = React.useState([
      {
        id: 0,
        operator: '_and',
        groups: [
          {
            id: 1,
            operator: '_or',
            groups: [],
            rows: [
              {
                index: 0,
                propertyValue: '',
                operator: 'eq',
                rightValue: '',
              },
            ],
          },
          {
            id: 2,
            operator: '_and',
            groups: [
              {
                id: 1,
                operator: '_or',
                groups: [],
                rows: [
                  {
                    index: 0,
                    propertyValue: '',
                    operator: 'eq',
                    rightValue: '',
                  },
                ],
              },
              {
                id: 2,
                operator: '_and',
                groups: [],
                rows: [
                  {
                    index: 0,
                    propertyValue: '',
                    operator: 'eq',
                    rightValue: '',
                  },
                ],
              },
            ],
            rows: [
              {
                index: 0,
                propertyValue: '',
                operator: 'eq',
                rightValue: '',
              },
            ],
          },
        ],
        rows: [
          {
            index: 0,
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

    const filterProps = (properties, id) => {
      return Object.values(properties).filter((props) => {
        return props.modelId === id;
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

    const renderTree = (tree, count = 0) => {
      return (
        <>
          {tree.map((node) => (
            <div key={node.id} style={{ marginLeft: `${10 * count}px` }}>
              <div>{node.operator}</div>
              <hr />
              {node.rows.map((row) => {
                return <div key={row.index}>{row.index}</div>;
              })}
              {node.groups && renderTree(node.groups, count + 1)}
            </div>
          ))}
        </>
      );
    };

    const filterBuilder = () => {
      const { properties } = artifact;
      const filteredProps = filterProps(properties, modelId);

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
