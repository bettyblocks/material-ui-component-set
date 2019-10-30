(() => ({
  name: 'Text',
  icon: 'HeadingIcon',
  category: 'CONTENT',
  type: 'TEXT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
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
    return (
      <Tag className={classes.content}>
        {options.content.length > 0 && <B.Text value={options.content} />}
        {options.content.length === 0 && B.env === 'dev' && (
          <span className={classes.placeholder}>Empty content</span>
        )}
      </Tag>
    );
  })(),
  styles: B => {
    const { theme } = B;
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : theme.getSpacing(idx, device);
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
        color: ({ options: { type } }) => theme.getFontColor(type),
        fontFamily: ({ options: { type } }) => theme.getFontFamily(type),
        fontSize: ({ options: { type } }) => theme.getFontSize(type),
        fontWeight: ({ options: { type } }) => theme.getFontWeight(type),
        textTransform: ({ options: { type } }) => theme.getTextTransform(type),
        letterSpacing: ({ options: { type } }) => theme.getLetterSpacing(type),
        [`@media ${B.mediaMinWidth(768)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
          fontSize: ({ options: { type } }) =>
            theme.getFontSize(type, 'Portrait'),
        },
        [`@media ${B.mediaMinWidth(1024)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
          fontSize: ({ options: { type } }) =>
            theme.getFontSize(type, 'Landscape'),
        },
        [`@media ${B.mediaMinWidth(1200)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
          fontSize: ({ options: { type } }) =>
            theme.getFontSize(type, 'Desktop'),
        },
      },
      placeholder: {
        color: '#dadde4',
      },
    };
  },
}))();
