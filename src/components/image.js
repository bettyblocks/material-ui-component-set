(() => ({
  name: 'Image',
  icon: 'ImageIcon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const imgUrl = B.Text({ value: options.imgUrl });

    return (
      <figure
        className={[classes.figure, !imgUrl ? classes.empty : ''].join(' ')}
      >
        {imgUrl ? (
          <img
            className={classes.media}
            src={imgUrl}
            alt={B.Text({ value: options.imgAlt })}
          />
        ) : (
          <div className={classes.placeholderWrapper}>
            <svg className={classes.placeholder} viewBox="0 0 86 48">
              <rect x="19.5" y="8.5" rx="2" />
              <path d="M61.1349945 29.020979v3.9160839H25v-2.5379375l6.5998225-4.9892478 5.6729048 4.2829541 13.346858-11.2981564L61.1349945 29.020979zm-22.5-10.270979c0 1.0416667-.3645833 1.9270833-1.09375 2.65625S35.9266612 22.5 34.8849945 22.5s-1.9270833-.3645833-2.65625-1.09375-1.09375-1.6145833-1.09375-2.65625.3645833-1.9270833 1.09375-2.65625S33.8433278 15 34.8849945 15s1.9270833.3645833 2.65625 1.09375 1.09375 1.6145833 1.09375 2.65625z" />
            </svg>
          </div>
        )}
      </figure>
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      figure: {
        fontSize: 0,
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        boxSizing: 'border-box',
        overflow: 'hidden',
      },
      empty: {
        position: 'relative',
        width: ({ options: { width } }) => width || '100%',
        height: ({ options: { height } }) => height || 'inherit',
        backgroundColor: '#F0F1F5',
        border: '0.0625rem dashed #AFB5C8',
        paddingBottom: ({ options: { height } }) =>
          (!height || height === '100%') && '62.5%',
      },
      media: {
        width: ({ options: { width } }) => width || 'auto',
        height: ({ options: { height } }) => height || 'auto',
      },
      placeholderWrapper: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      placeholder: {
        maxHeight: '100%',
        width: 86,
        height: 48,

        '& > rect': {
          stroke: '#AFB5C8',
          fill: '#F7F8FA',
          width: 47,
          height: 31,
        },

        '& > path': {
          fill: '#666D85',
        },
      },
      [`@media ${B.mediaMinWidth(768)}`]: {
        figure: {
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
        figure: {
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
        figure: {
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
