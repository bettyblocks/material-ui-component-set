(() => ({
  name: 'Badge',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Badge } = window.MaterialUI.Core;
    const { env, useText } = B;
    const {
      content,
      color,
      showZero,
      invisible,
      anchorOrigin,
      variant,
    } = options;
    const isEmpty = children.length === 0;
    const Content = useText(content);
    const anchorOriginSplit = anchorOrigin.split(',');
    const anchorOriginObj = {
      horizontal: anchorOriginSplit[0],
      vertical: anchorOriginSplit[1],
    };

    const isDev = env === 'dev';
    const isPristine = isEmpty && B.env === 'dev';

    const BadgeComponent = (
      <div
        className={[
          classes.root,
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')}
      >
        <Badge
          badgeContent={Content}
          color={color}
          invisible={invisible}
          showZero={showZero}
          anchorOrigin={anchorOriginObj}
          variant={variant}
        >
          {isEmpty ? 'PlaceHolder' : children}
        </Badge>
      </div>
    );

    return isDev ? <div>{BadgeComponent}</div> : BadgeComponent;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const convertSizes = sizes =>
      sizes.map(size => style.getSpacing(size)).join(' ');
    return {
      root: {
        margin: ({ options: { margin } }) => convertSizes(margin),
        display: 'inline-flex',
        justifyContent: 'center',
        verticalAlign: 'middle',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
      empty: {
        display: ['flex', '!important'],
        justifyContent: ['center', '!important'],
        alignItems: 'center',
        height: ['2.5rem', '!important'],
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        width: '100px',
      },
    };
  },
}))();
