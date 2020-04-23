(() => ({
    name: 'Modal',
    icon: 'AlertIcon',
    type: 'CONTENT_COMPONENT',
    allowedTypes: [],
    orientation: 'HORIZONTAL',
    jsx: (() => {
        const isDev = B.env === 'dev';
        const { Modal } = window.MaterialUI.Core

        const [open, setOpen] = React.useState(false);
        
        const handleOpen = () => setOpen(true)
        const handleClose = () => setOpen(false)
        
        const useStyles =  window.MaterialUI.Core.makeStyles(theme => ({
            paper: {
              position: "absolute",
              width: 400,
              backgroundColor: theme.palette.background.paper,
              border: "2px solid #000",
              boxShadow: theme.shadows[5],
              padding: theme.spacing(2, 4, 3)
            }
          }));

        const classes = useStyles()

        const body = (
            <div className={classes.paper}>
              <h2 id="simple-modal-title">{options.title}</h2>
              <p id="simple-modal-description">{options.description}</p>
            </div>
          )

        const ModalPanel = (
            <>
                <div>
                    <button type="button" onClick={handleOpen}>{options.buttonTitle}</button>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body}
                    </Modal>
                </div>
            </>
        )
        

        return isDev ? <div>Modal here</div> : ModalPanel
    })(),
    styles: B => theme => {
    },
  }))();
  