(() => ({
  name: 'Progress',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { defineFunction = () => {}, env, useText } = B;
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
    } = options;

    const [open, setOpen] = useState(visible);

    useEffect(() => {
      setOpen(visible);
    }, [visible]);

    defineFunction('Show', () => setOpen(true));
    defineFunction('Hide', () => setOpen(false));
    defineFunction('Show/Hide', () => setOpen(s => !s));

    const min = parseInt(useText(minValue), 10) || 0;
    const max = parseInt(useText(maxValue), 10) || 100;
    const currentValue =
      parseInt(useText(value), 10) || (env === 'dev' ? 50 : 0);
    const currentValueBuffer = parseInt(useText(valueBuffer), 10) || 0;

    const normalise = v => ((v - min) * 100) / (max - min);

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
        variant={variant}
        value={normalise(currentValue)}
        valueBuffer={currentValueBuffer}
        thickness={useText(thickness)}
        size={useText(size)}
      />
    );

    if (!isDev && !open) return <></>;

    return isDev ? (
      <div className={classes.wrapper}>{ProgressCmp}</div>
    ) : (
      ProgressCmp
    );
  })(),
  styles: B => t => {
    const { color: colorFunc, mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    const getLighterColor = (col, val) => colorFunc.lighten(col, val);
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
        backgroundColor: ({ options: { color } }) => [
          getLighterColor(style.getColor(color), 0.7),
          '!important',
        ],
      },
      lighterDashedColor: {
        backgroundImage: ({ options: { color } }) => [
          `radial-gradient(${getLighterColor(
            style.getColor(color),
            0.7,
          )} 0%, ${getLighterColor(
            style.getColor(color),
            0.7,
          )} 16%, transparent 42%)`,
          '!important',
        ],
      },
      root: {
        width: ({ options: { type } }) => type !== 'circular' && '100%',
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
