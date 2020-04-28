(() => ({
  name: 'Modal',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={B.env === 'dev' ? classes.panel : ''}>
      {(() => {
        const { env } = B;
        const { Modal } = window.MaterialUI.Core;

        const isEmpty = children.length === 0;
        const isDev = env === 'dev';
        const isPristine = isEmpty && isDev;

        const [open, setOpen] = React.useState(false);

        useEffect(() => {
          B.defineFunction('handleOpenModal', e => {
            e.preventDefault();

            setOpen(true);
          });

          B.defineFunction('handleCloseModal', e => {
            e.preventDefault();

            setOpen(false);
          });
        }, []);

        return (
          <div>
            {isDev && options.isVisibleInDev ? (
              <div
                className={[
                  classes.content,
                  isEmpty ? classes.empty : '',
                  isPristine ? classes.pristine : '',
                ].join(' ')}
              >
                {isPristine ? 'Panel' : children}
              </div>
            ) : (
              ''
            )}

            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div className={classes.modal}>{children}</div>
            </Modal>
          </div>
        );
      })()}
    </div>
  ),
  styles: B => theme => {
    const style = new B.Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      modal: {
        background: 'white',
        width: '50%',
        margin: '0 auto',
        padding: '20px',
        overflowWrap: 'break-word',
      },
      panel: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        height: 'auto',
        minHeight: 1,
        backgroundColor: 'transparent',
        borderWidth: '0.125rem',
        borderColor: ({ options: { panelColor } }) =>
          style.getColor(panelColor) || style.getColor('Primary'),
        borderStyle: 'solid',
        borderRadius: '0.125rem',
        overflow: 'auto',
        boxSizing: 'border-box',
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
        panel: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        content: {
          paddingTop: getSpacing('M', 'Portrait'),
        },
      },
      [`@media ${B.mediaMinWidth(1024)}`]: {
        panel: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        content: {
          padding: getSpacing('M', 'Landscape'),
        },
      },
      [`@media ${B.mediaMinWidth(1200)}`]: {
        panel: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
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
