(() => ({
  name: 'CardMedia',
  type: 'CARD_MEDIA',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { CardMedia } = window.MaterialUI.Core;
    const isDev = B.env === 'dev';
    const { image, title } = options;
    const cardMedia = (
      <CardMedia
        className={classes.root}
        image={image}
        title={title}
        component="img"
      />
    );

    return isDev ? <div>{cardMedia}</div> : cardMedia;
  })(),
  styles: () => () => ({
    root: {
      height: '140px',
    },
  }),
}))();
