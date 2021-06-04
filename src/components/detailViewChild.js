(() => ({
  name: 'DetailViewChild',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT', 'CONTAINER_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { labelText, property, sideBySide } = options;
    const { env, useText, getProperty } = B;
    const labelIsEmpty = labelText.length === 0;
    const propertyIsEmpty =
      property.length === 0 || property.type === null || property.id === '';
    const isDev = env === 'dev';
    const isPristine = propertyIsEmpty && isDev;

    const { name: propertyName, label: propertyLabel } =
      getProperty(property) || {};

    const Tag = {
      Title1: 'h1',
      Title2: 'h2',
      Title3: 'h3',
      Title4: 'h4',
      Title5: 'h5',
      Title6: 'h6',
      Body1: 'p',
      Body2: 'p',
    }[options.type || 'Body1'];

    const parsedContent = labelIsEmpty ? propertyLabel : useText(labelText);
    const propName = isDev ? `{{ ${propertyName} }}` : useText([property]);

    const Content =
      children.length > 0 ? (
        children
      ) : (
        <Tag className={classes.content}>
          {isPristine ? (
            <span className={classes.placeholder}>Select property</span>
          ) : (
            propName
          )}
        </Tag>
      );

    return (
      <div className={sideBySide ? classes.flex : null}>
        <Tag className={`${classes.content} ${classes.label}`}>
          {isPristine && labelIsEmpty ? (
            <span className={classes.placeholder}>Select label: </span>
          ) : (
            `${parsedContent}: `
          )}
        </Tag>
        {Content}
      </div>
    );
  })(),
  styles: B => t => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    const getPath = (path, data) =>
      path.reduce((acc, next) => {
        if (acc === undefined || acc[next] === undefined) {
          return undefined;
        }
        return acc[next];
      }, data);

    return {
      content: {
        display: 'block',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        textAlign: ({ options: { textAlignment } }) => textAlignment,
        padding: 0,
        whiteSpace: 'pre-wrap',
        color: ({ options: { textColor, type, styles } }) =>
          styles
            ? style.getColor(textColor)
            : getPath(['theme', 'typography', type, 'color'], style),
        fontFamily: ({ options: { type } }) => style.getFontFamily(type),
        fontSize: ({ options: { type } }) => style.getFontSize(type),
        // fontWeight: ({ options: { fontWeight, type, styles } }) =>
        //   styles
        //     ? fontWeight
        //     : getPath(['theme', 'typography', type, 'fontWeight'], style),
        textTransform: ({ options: { type } }) => style.getTextTransform(type),
        letterSpacing: ({ options: { type } }) => style.getLetterSpacing(type),
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Portrait'),
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
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Landscape'),
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
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Desktop'),
        },
      },
      link: {
        textDecoration: ['none', '!important'],
        color: ['inherit', '!important'],
      },
      placeholder: {
        color: '#dadde4',
      },
      label: {
        fontWeight: ({ options: { fontWeight, type, styles } }) =>
          styles
            ? fontWeight
            : getPath(['theme', 'typography', type, 'fontWeight'], style),
      },
      flex: {
        display: 'flex',
      },
    };
  },
}))();
