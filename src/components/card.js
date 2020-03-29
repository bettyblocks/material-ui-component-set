(() => ({
  name: 'Card',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Card, CardHeader, CardContent } = window.MaterialUI.Core;
    const { raised, variant, title, subTitle } = options;
    const isDev = B.env === 'dev';
    const card = (
      <Card variant={variant} raised={raised}>
        {title.length || subTitle.length ? (
          <CardHeader title={title} subheader={subTitle} />
        ) : (
          ''
        )}
        <CardContent>
          {!children.length & isDev ? 'Card' : children}
        </CardContent>
      </Card>
    );
    return isDev ? <div>{card}</div> : card;
  })(),
  styles: () => () => ({}),
}))();
