(() => ({
  name: 'Panel',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.panel}>
      {(() => {
        const { env, Text } = B;
        const isDev = env === 'dev';
        const isEmpty = children.length === 0;
        const isPristine = isEmpty && isDev;

        return (
          <>
            {options.panelTitle && (
              <div className={classes.title}>
                <Text value={options.panelTitle} />
              </div>
            )}
            <div
              className={[
                classes.content,
                isEmpty ? classes.empty : '',
                isPristine ? classes.pristine : '',
              ].join(' ')}
            >
              {isPristine ? 'Panel' : children}
            </div>
          </>
        );
      })()}
    </div>
  ),
  styles: B => theme => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      panel: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        height: 'auto',
        minHeight: 1,
        backgroundColor: 'transparent',
        borderWidth: '0.125rem',
        borderColor: ({ options: { panelColor } }) =>
          style.getColor(panelColor) || style.getColor('Primary'),
        borderStyle: 'solid',
        borderRadius: '0.125rem',
        overflow: 'auto',
        boxSizing: 'border-box',
      },
      title: {
        margin: '0',
        display: 'block',
        paddingRight: '0.5rem',
        paddingLeft: '0.5rem',
        paddingTop: '0.4375rem',
        paddingBottom: '0.5625rem',
        fontFamily: style.getFontFamily('Body1'),
        fontSize: '1rem',
        fontWeight: style.getFontWeight('Body1'),
        textTransform: style.getTextTransform('Body1'),
        letterSpacing: style.getLetterSpacing('Body1'),
        color: ({ options: { color } }) =>
          style.getColor(color) || style.getColor('White'),
        backgroundColor: ({ options: { panelColor } }) =>
          style.getColor(panelColor) || style.getColor('Primary'),
        borderBottomWidth: '0.125rem',
        borderBottomColor: ({ options: { panelColor } }) =>
          style.getColor(panelColor) || style.getColor('Primary'),
        borderBottomStyle: 'solid',
      },
      content: {
        flexGrow: 1,
        flexBasis: '100%',
        paddingTop: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[0]),
        paddingRight: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[1]),
        paddingBottom: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[2]),
        paddingLeft: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[3]),
      },
      [`@media ${mediaMinWidth(600)}`]: {
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
        paddingTop: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[0], 'Desktop'),
        paddingRight: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[1], 'Desktop'),
        paddingBottom: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[2], 'Desktop'),
        paddingLeft: ({ options: { innerSpacing } }) =>
          getSpacing(innerSpacing[3], 'Desktop'),
      },
      [`@media ${mediaMinWidth(600)}`]: {
        panel: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        title: {
          paddingRight: getSpacing('M', 'Portrait'),
          paddingLeft: getSpacing('M', 'Portrait'),
          fontSize: style.getFontSize('Body1', 'Portrait'),
        },
        content: {
          paddingTop: getSpacing('M', 'Portrait'),
        },
      },
      [`@media ${mediaMinWidth(960)}`]: {
        panel: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        title: {
          paddingRight: getSpacing('M', 'Landscape'),
          paddingLeft: getSpacing('M', 'Landscape'),
          fontSize: style.getFontSize('Body1', 'Landscape'),
        },
        content: {
          padding: getSpacing('M', 'Landscape'),
        },
      },
      [`@media ${mediaMinWidth(1280)}`]: {
        panel: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
        title: {
          paddingRight: getSpacing('M', 'Desktop'),
          paddingLeft: getSpacing('M', 'Desktop'),
          fontSize: style.getFontSize('Body1', 'Desktop'),
        },
        content: {
          padding: getSpacing('M', 'Desktop'),
        },
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: () => 'center',
        minHeight: '4rem',
        height: '100%',
        margin: '1rem',
        fontSize: '0.75rem',
      },
      pristine: {
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
        border: '0.0625rem dashed #AFB5C8',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();
