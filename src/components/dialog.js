(() => ({
  name: 'Dialog',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env } = B;
    const { Dialog } = window.MaterialUI.Core;

    const isEmpty = children.length === 0;
    const isDev = env === 'dev';
    const isPristine = isDev && isEmpty;
    const isContentVisible = isDev && options.visible;

    const classNames = isContentVisible
      ? [isEmpty ? classes.empty : '', isPristine ? classes.pristine : ''].join(
          ' ',
        )
      : '';

    const [open, setOpen] = React.useState(false);
    const devContent = isContentVisible && !isEmpty ? children : 'Dialog';

    useEffect(() => {
      B.defineFunction('handleDialogOpen', e => {
        e.preventDefault();
        setOpen(true);
      });

      B.defineFunction('handleDialogClose', e => {
        e.preventDefault();
        setOpen(false);
      });
    }, []);

    return (
      <div className={classNames}>
        {isDev ? devContent : ''}

        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className={classes.dialog}>{children}</div>
        </Dialog>
      </div>
    );
  })(),
  styles: () => () => ({
    dialog: {
      backgroundColor: 'white',
      margin: '0 auto',
      padding: '1.5rem',
      overflowWrap: 'break-word',
    },
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: () => 'center',
      minHeight: '4rem',
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
  }),
}))();
