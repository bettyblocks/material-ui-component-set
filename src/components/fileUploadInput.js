(() => ({
  name: 'FileUploadInput',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText, Icon, usePresignedUpload } = B;
    const { FormControl, FormHelperText, Typography, IconButton } =
      window.MaterialUI.Core;
    const {
      actionVariableId: name,
      hideDefaultError,
      required,
      disabled,
      label,
      helperText,
      fullWidth,
      requiredMessage: requiredMessageRaw,
      maxFileSize,
      maxFileSizeMessage: maxFileSizeMessageRaw,
      accept,
      margin,
      multiple,
      hideLabel,
      type,
      showImagePreview,
      dataComponentAttribute = ['FileUpload'],
    } = options;

    const isDev = env === 'dev';
    const inputRef = React.createRef();
    const [uploads, setUploads] = useState({
      // is updated by the html element and mutations
      files: [], // html element
      data: [], // mutation
      failureMessage: [],
    });
    const [, setUploadedFileArray] = useState([]); // is updated only by the file html element
    const helper = useText(helperText);
    const labelText = useText(label);
    const [validationMessage, setValidationMessage] = React.useState('');
    const requiredMessage = useText(requiredMessageRaw);
    const maxFileSizeMessage = useText(maxFileSizeMessageRaw);
    const requiredText = required ? '*' : '';
    const dataComponentAttributeValue = useText(dataComponentAttribute);

    const formatBytes = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat(bytes / k ** i).toFixed()} ${sizes[i]}`;
    };

    const validateFiles = (files) => {
      const filesArray = files ? Array.from(files) : [];

      if (required) {
        if (filesArray.length === 0) {
          setValidationMessage(requiredMessage);
          return false;
        }
      }

      if (maxFileSize > 0) {
        const isFileSizeExceeded = filesArray.some(
          (file) => file.size / 1000000 > maxFileSize,
        );
        if (isFileSizeExceeded) {
          setValidationMessage(maxFileSizeMessage);
          return false;
        }
      }
    };

    const handleChange = (e) => {
      setUploadedFileArray((prev) => [...prev, ...e.target.files]);
      setUploads({
        ...uploads,
        files: e.target.files,
      });

      validateFiles(e.target.files);
    };

    const clearFiles = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      setUploads({
        files: [],
        data: [],
        failureMessage: [],
      });
    };

    const { files, failureMessage } = uploads;

    const data = [];

    const acceptedValue = useText(accept) || 'image/*';
    const acceptList = acceptedValue.split(',').map((item) => item.trim());
    const helperValue =
      !hideDefaultError && failureMessage.length > 0 ? failureMessage : helper;

    const removeFileFromList = (fileUrl) => {
      const newList = data.filter((d) => d.url !== fileUrl);
      setUploads({
        ...uploads,
        data: newList,
      });
    };

    function UploadComponent() {
      // Renders the button and the files you select
      return (
        <div data-component={dataComponentAttributeValue}>
          <input
            accept={acceptedValue}
            className={classes.input}
            multiple={multiple}
            type="file"
            onChange={handleChange}
            ref={inputRef}
          />
          {children}
          {files && ( // TODO: change to showing only what is from the html element
            <input type="hidden" name={name} value={files} />
          )}
        </div>
      );
    }

    function Hr() {
      return <hr className={classes.hr} />;
    }

    function DeleteButton({ file }) {
      return (
        <div className={classes.deleteButtonWrapper}>
          <IconButton
            size="small"
            className={classes.remove}
            onClick={() => {
              if (file) {
                removeFileFromList(file.url);
                if (!multiple) {
                  B.triggerEvent('onFileRemove');
                }
              }
            }}
          >
            <Icon
              name="Delete"
              className={classes.deleteIcon}
              fontSize="small"
            />
          </IconButton>
        </div>
      );
    }

    function FileDetails({ file, fileType, fileSize }) {
      return (
        <div className={classes.fileDetails}>
          <Typography variant="body1" noWrap className={classes.span}>
            {file ? file.name : 'File name'}
          </Typography>
          <div className={classes.fileDetailList}>
            <p className={classes.fileDetail}>
              {isDev ? 'Size' : formatBytes(fileSize)}
            </p>
            <div className={classes.divider} />
            <p className={classes.fileDetail}>
              {isDev ? 'Type' : fileType.replace('image/', '.')}
            </p>
          </div>
        </div>
      );
    }

    function DevUploadedFile() {
      switch (type) {
        case 'grid':
          return (
            <div className={classes.gridView}>
              <div className={classes.gridItem}>
                {showImagePreview && <div className={classes.gridDevImage} />}
                <div className={classes.gridItemDetails}>
                  <FileDetails />
                  <DeleteButton />
                </div>
              </div>
            </div>
          );
        case 'list':
        default:
          return (
            <>
              <Hr />
              <div className={classes.listView}>
                <div className={classes.fileDetailList}>
                  {showImagePreview && <div className={classes.devImage} />}
                  <FileDetails />
                </div>
                <DeleteButton />
              </div>
            </>
          );
      }
    }

    function UploadedFile({ file }) {
      switch (type) {
        case 'grid':
          return (
            <div className={classes.gridView}>
              <div className={classes.gridItem}>
                {showImagePreview && (
                  <div
                    style={{
                      backgroundImage: `url("${file.url}")`,
                    }}
                    className={classes.gridImage}
                  />
                )}
                <div className={classes.gridItemDetails}>
                  <FileDetails
                    file={file}
                    fileType={file.type}
                    fileSize={file.size}
                  />
                  <DeleteButton file={file} />
                </div>
              </div>
            </div>
          );
        case 'list':
        default:
          return (
            <>
              <Hr />
              <div className={classes.listView}>
                <div className={classes.fileDetailList}>
                  {showImagePreview && (
                    <div
                      style={{
                        backgroundImage: `url("${file.url}")`,
                      }}
                      className={classes.image}
                    />
                  )}
                  <FileDetails
                    file={file}
                    fileType={file.type}
                    fileSize={file.size}
                  />
                </div>
                <DeleteButton file={file} />
              </div>
            </>
          );
      }
    }

    function UploadingFile() {
      switch (type) {
        case 'grid':
          return (
            <div className={classes.gridView}>
              <div className={classes.gridItem}>
                {showImagePreview && (
                  <div className={classes.gridUploadingImage}>
                    <Icon name="CloudUpload" />
                  </div>
                )}
                <div className={classes.gridItemDetails}>
                  <span>Uploading</span>
                </div>
              </div>
            </div>
          );
        case 'list':
        default:
          return (
            <>
              <Hr />
              <div className={classes.listView}>
                {showImagePreview && (
                  <div className={classes.uploadingImage}>
                    <Icon name="CloudUpload" />
                  </div>
                )}
                <div className={classes.fileDetails}>
                  <span>Uploading</span>
                </div>
              </div>
            </>
          );
      }
    }

    const Label = isDev ? 'div' : 'label';

    function Control() {
      const filesArray = files ? Array.from(files) : [];
      return (
        <FormControl
          fullWidth={fullWidth}
          required={required}
          error={!!validationMessage}
          disabled={disabled}
          margin={margin}
        >
          <Label className={classes.label}>
            {hideLabel ? '' : `${labelText}${requiredText}`}
            <UploadComponent />
          </Label>
          <FormHelperText classes={{ root: classes.helper }}>
            {validationMessage}
          </FormHelperText>
          <div className={classes.messageContainer}>
            {filesArray && // TODO: show only files form the html element
              filesArray.length > 0 &&
              filesArray.map((file) => (
                <UploadedFile key={file.name} file={file} />
              ))}
          </div>
        </FormControl>
      );
    }

    useEffect(() => {
      B.defineFunction('clearFileUpload', (e) => clearFiles(e));
    }, []);

    return isDev ? (
      <div>
        <div className={classes.root}>
          <Control />
        </div>
        <DevUploadedFile />
      </div>
    ) : (
      <Control />
    );
  })(),
  styles: (B) => (t) => {
    const { color: colorFunc, Styling } = B;
    const style = new Styling(t);
    const getOpacColor = (col, val) => colorFunc.alpha(col, val);
    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
      },
      label: {
        marginLeft: '0!important',
        alignItems: 'start!important',
        color: ({ options: { labelColor } }) => [
          style.getColor(labelColor),
          '!important',
        ],
        '&.Mui-error': {
          color: ({ options: { errorColor } }) => [
            style.getColor(errorColor),
            '!important',
          ],
        },
        '&.Mui-disabled': {
          pointerEvents: 'none',
          opacity: '0.7',
        },
      },
      helper: {
        color: ({ options: { helperColor } }) => [
          style.getColor(helperColor),
          '!important',
        ],
        '&.Mui-error': {
          color: ({ options: { errorColor } }) => [
            style.getColor(errorColor),
            '!important',
          ],
        },
      },
      input: {
        display: 'none',
      },
      fullwidth: {
        display: 'flex',
        width: '100%',
      },
      span: {
        flex: 1,
        textAlign: 'start',
        marginBottom: '0.1875rem!important',
        marginRight: '1rem!important',
      },
      messageContainer: {
        flexWrap: 'wrap',
        paddingTop: '1.25rem',
        display: ({ options: { type } }) =>
          type === 'grid' ? 'flex' : 'block',
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        '& .MuiIconButton-root': {
          color: ({ options: { textColor } }) => [
            getOpacColor(style.getColor(textColor), 0.54),
            '!important',
          ],
        },
      },
      listView: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      gridView: {
        display: 'flex',
      },
      gridItem: {
        display: 'flex',
        borderRadius: '0.3125rem',
        flexDirection: 'column',
        border: ' 0.0625rem solid #eee',
        marginRight: '1rem',
        marginBottom: '1rem',
      },
      gridItemDetails: {
        maxWidth: ({ options: { imagePreviewWidth, showImagePreview } }) =>
          showImagePreview ? imagePreviewWidth : 'auto',
        display: 'flex',
        margin: '1rem',
        justifyContent: 'space-between',
      },
      devImage: {
        display: 'flex',
        overflow: 'hidden',
        margin: '1rem',
        borderStyle: 'dashed',
        borderColor: '#AFB5C8',
        borderRadius: '0.3125rem',
        borderWidth: '0.0625rem',
        border: '0.125rem dashed black',
        backgroundColor: '#F0F1F5',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      gridDevImage: {
        extend: 'devImage',

        margin: 0,
        borderRadius: '0.3125rem 0.3125rem 0 0',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      deleteIcon: {
        color: `${t.colors.light}!important`,
      },
      uploadingImage: {
        border: 'none',
        color: 'white',
        display: 'flex',
        overflow: 'hidden',
        margin: '1rem',
        alignItems: 'center',
        borderRadius: '0.3125rem',
        justifyContent: 'center',
        backgroundColor: t.colors.warning,
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      gridUploadingImage: {
        extend: 'uploadingImage',

        margin: 0,
        borderRadius: '0.3125rem 0.3125rem 0 0',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      image: {
        overflow: 'hidden',
        margin: '1rem',
        borderRadius: '0.3125rem',
        backgroundSize: 'cover',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      gridImage: {
        margin: 0,
        overflow: 'hidden',
        backgroundSize: 'cover',
        borderRadius: '0.3125rem 0.3125rem 0 0',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      fileDetails: {
        flexGrow: 1,
        maxWidth: ({
          options: { type, imagePreviewWidth, showImagePreview },
        }) =>
          showImagePreview && type === 'grid'
            ? `calc(${imagePreviewWidth} - 60px)`
            : 'auto',
        display: 'flex',
        flexDirection: 'column',
      },
      fileDetail: {
        margin: 0,
        color: t.colors.medium,
      },
      fileDetailList: {
        display: 'flex',
        alignItems: 'center',
      },
      divider: {
        width: '0.1875rem',
        height: '0.1875rem',
        borderRadius: '50%',
        marginLeft: '1rem',
        backgroundColor: t.colors.light,
        marginRight: '1rem',
      },
      hr: {
        height: 1,
        margin: 0,
        border: 'none',
        backgroundColor: t.colors.light,
      },
      deleteButtonWrapper: {
        margin: ({ options: { type } }) => (type === 'grid' ? 0 : '1rem'),
      },
      remove: {
        height: '1.875rem',
        padding: '0.25rem!important',
      },
    };
  },
}))();
