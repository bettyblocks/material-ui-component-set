(() => ({
  name: 'Link',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Link } = window.MaterialUI.Core;
    const { env } = B;
    const {
      color,
      linkTo,
      linkToExternal,
      linkType,
      underline,
      linkName,
    } = options;
    const isEmpty = children.length === 0;
    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink = linkToExternal && linkToExternal.id !== '';

    const isDev = env === 'dev';
    const isPristine = isEmpty && B.env === 'dev';

    const LinkComponent = (
      <Link
        href={
          linkType === 'external' && hasExternalLink
            ? linkToExternal
            : undefined
        }
        component={linkType === 'internal' && hasLink ? B.Link : undefined}
        endpoint={linkType === 'internal' && hasLink ? linkTo : undefined}
        color={color}
        underline={underline}
      >
        {isPristine ? (
          <div className={[classes.pristine, classes.empty].join(' ')}>
            Link
          </div>
        ) : isEmpty ? (
          linkName
        ) : (
          children
        )}
      </Link>
    );

    return isDev ? <div>{LinkComponent}</div> : LinkComponent;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);

    return {
      root: {
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
        width: '100%',
      },
    };
  },
}))();
