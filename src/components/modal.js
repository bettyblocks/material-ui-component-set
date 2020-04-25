(() => ({
  name: 'Modal',
  icon: 'PanelIcon',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.panel}>
      {(() => {
        const isEmpty = children.length === 0;

        const isPristine = isEmpty && B.env === 'dev';

        const isDev = B.env === 'dev';
        const { Modal, Button} = window.MaterialUI.Core

        const [open, setOpen] = React.useState(false);

        const handleOpen = () => setOpen(true)
        const handleClose = () => setOpen(false)

        return (
          <div>
            <div>
                <Button 
                    color="primary" 
                    onClick={handleOpen}
                    readonly={isDev}>
                  Test button
                </Button>
                
                {isDev ? <div className={[
                    classes.content,
                    isEmpty ? classes.empty : '',
                    isPristine ? classes.pristine : '',
                  ].join(' ')}>
                  {isPristine ? 'Panel' : children}
              </div> : ''}
              

              <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
              > 
                    <B.Children><div style={{background: "white"}}>{children}</div></B.Children>
              </Modal>
            </div>
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
      title: {
        margin: '0',
        display: 'block',
        paddingRight: '0.5rem',
        paddingLeft: '0.5rem',
        paddingTop: '0.4375rem',
        paddingBottom: '0.5625rem',
        fontFamily: style.getFontFamily('Body1'),
        fontSize: '1rem',
        fontWeight: style.getFontWeight('Body1'),
        textTransform: style.getTextTransform('Body1'),
        letterSpacing: style.getLetterSpacing('Body1'),
        color: ({ options: { color } }) =>
          style.getColor(color) || style.getColor('White'),
        backgroundColor: ({ options: { panelColor } }) =>
          style.getColor(panelColor) || style.getColor('Primary'),
        borderBottomWidth: '0.125rem',
        borderBottomColor: ({ options: { panelColor } }) =>
          style.getColor(panelColor) || style.getColor('Primary'),
        borderBottomStyle: 'solid',
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
        title: {
          paddingRight: getSpacing('M', 'Portrait'),
          paddingLeft: getSpacing('M', 'Portrait'),
          fontSize: style.getFontSize('Body1', 'Portrait'),
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
        title: {
          paddingRight: getSpacing('M', 'Landscape'),
          paddingLeft: getSpacing('M', 'Landscape'),
          fontSize: style.getFontSize('Body1', 'Landscape'),
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
        title: {
          paddingRight: getSpacing('M', 'Desktop'),
          paddingLeft: getSpacing('M', 'Desktop'),
          fontSize: style.getFontSize('Body1', 'Desktop'),
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
