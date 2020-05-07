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
    const isContentVisible = isDev && options.isVisibleInDev;

    const classNames = isContentVisible
      ? [
          classes.content,
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')
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
  styles: B => theme => {
    const style = new B.Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      dialog: {
        backgroundColor: 'white',
        margin: '0 auto',
        padding: '1.5rem',
        overflowWrap: 'break-word',
      },
      content: {
        flexGrow: 1,
        flexBasis: '100%',
        paddingTop: getSpacing('M'),
        paddingRight: getSpacing('M'),
        paddingBottom: getSpacing('M'),
        paddingLeft: getSpacing('M'),
      },
      [`@media ${B.mediaMinWidth(768)}`]: {
        content: {
          paddingTop: getSpacing('M', 'Portrait'),
        },
      },
      [`@media ${B.mediaMinWidth(1024)}`]: {
        content: {
          padding: getSpacing('M', 'Landscape'),
        },
      },
      [`@media ${B.mediaMinWidth(1200)}`]: {
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
