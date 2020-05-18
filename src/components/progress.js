(() => ({
  name: 'Progress',
  icon: 'ProgressBarIcon',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const { CircularProgress, LinearProgress } = window.MaterialUI.Core;
    const {
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

    const min = parseInt(useText(minValue), 10) || 0;
    const max = parseInt(useText(maxValue), 10) || 100;
    const currentValue = parseInt(useText(value), 10) || 50;
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

    return isDev ? (
      <div className={classes.wrapper}>{ProgressCmp}</div>
    ) : (
      ProgressCmp
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const { color: colorFunc } = B;
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    const getLighterColor = (col, val) => colorFunc.lighten(col, val);
    return {
      wrapper: {
        display: ({ options: { type } }) =>
          type === 'circular' ? 'inline-block' : 'block',
        padding: '0.25rem 0',
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
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        [`@media ${B.mediaMinWidth(768)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
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
        },
        '&.MuiLinearProgress-root': {
          height: ({ options: { barHeight, type } }) =>
            type === 'linear' && barHeight ? barHeight : null,
        },
      },
    };
  },
}))();
