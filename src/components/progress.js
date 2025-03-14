(() => ({
  name: 'Progress',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { CircularProgress, LinearProgress } = window.MaterialUI.Core;
    const {
      visible,
      type,
      linearVariant,
      circularVariant,
      value,
      valueBuffer,
      minValue,
      maxValue,
      thickness,
      size,
      dataComponentAttribute,
    } = options;

    const [open, setOpen] = useState(visible);

    useEffect(() => {
      setOpen(visible);
    }, [visible]);

    useEffect(() => {
      B.defineFunction('Show', () => setOpen(true));
      B.defineFunction('Hide', () => setOpen(false));
      B.defineFunction('Show/Hide', () => setOpen((s) => !s));
    }, []);

    const min = parseInt(useText(minValue), 10) || 0;
    const max = parseInt(useText(maxValue), 10) || 100;
    const currentValue =
      parseInt(useText(value), 10) || (env === 'dev' ? 50 : 0);
    const currentValueBuffer = parseInt(useText(valueBuffer), 10) || 0;

    const normalise = (v) => ((v - min) * 100) / (max - min);

    const Progress = type === 'linear' ? LinearProgress : CircularProgress;
    const variant = type === 'linear' ? linearVariant : circularVariant;
    const isBuffer = type === 'linear' && linearVariant === 'buffer';

    const classNames = {
      root: classes.root,
    };

    if (type === 'linear' && isBuffer) {
      classNames.dashedColorPrimary = classes.lighterDashedColor;
      classNames.bar1Buffer = classes.normalBackgroundColor;
      classNames.bar2Buffer = classes.lighterBackgroundColor;
    } else if (type === 'linear') {
      classNames.colorPrimary = classes.lighterBackgroundColor;
      classNames.barColorPrimary = classes.normalBackgroundColor;
    } else {
      classNames.colorPrimary = classes.normalColor;
    }

    const ProgressCmp = (
      <Progress
        classes={classNames}
        className={includeStyling()}
        variant={variant}
        value={normalise(currentValue)}
        valueBuffer={normalise(currentValueBuffer)}
        thickness={useText(thickness)}
        size={useText(size)}
        data-component={useText(dataComponentAttribute) || 'Progress'}
      />
    );

    if (!isDev && !open) return <></>;

    return isDev ? (
      <div className={classes.wrapper}>{ProgressCmp}</div>
    ) : (
      ProgressCmp
    );
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      wrapper: {
        display: ({ options: { type } }) =>
          type === 'circular' ? 'inline-block' : 'block',
        padding: '0.25rem 0',
        width: ({ options: { type } }) => type !== 'circular' && '100%',
      },
      normalBackgroundColor: {
        backgroundColor: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
      },
      normalColor: {
        color: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
      },
      lighterBackgroundColor: {
        backgroundColor: ({ options: { lighterBackgroundColor } }) => [
          style.getColor(lighterBackgroundColor),
          '!important',
        ],
      },
      lighterDashedColor: {
        backgroundImage: ({ options: { lighterBackgroundColor } }) => [
          `radial-gradient(${style.getColor(
            lighterBackgroundColor,
          )} 0%, ${style.getColor(
            lighterBackgroundColor,
          )} 16%, transparent 42%)`,
          '!important',
        ],
      },
      root: {
        width: ({ options: { type } }) => type !== 'circular' && '100%',
        borderRadius: ({ options: { borderRadius } }) => borderRadius,
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
        '&.MuiLinearProgress-root': {
          height: ({ options: { barHeight, type } }) =>
            type === 'linear' && barHeight ? barHeight : null,
        },
      },
    };
  },
}))();
