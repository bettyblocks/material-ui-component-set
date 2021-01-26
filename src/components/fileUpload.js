(() => ({
  name: 'FileUpload',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      defineFunction = () => {},
      env,
      getCustomModelAttribute,
      useFileUpload,
      useText,
      triggerEvent = () => {},
    } = B;
    const {
      FormControl,
      FormControlLabel,
      FormHelperText,
      Button,
      Typography,
      IconButton,
    } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { Delete, CloudUpload } = Icons;
    const {
      hideDefaultError,
      disabled,
      helperText,
      fullWidth,
      size,
      accept,
      margin,
      variant,
      icon,
      iconPosition,
      buttonText,
      multiple,
      hideLabel,
      customModelAttribute: customModelAttributeObj,
      nameAttribute,
      type,
      showImagePreview,
    } = options;

    const isDev = env === 'dev';
    const inputRef = React.createRef();
    const [uploads, setUploads] = useState({
      files: [],
      data: [],
      failureMessage: [],
    });
    const helper = useText(helperText);
    const { id: customModelAttributeId, label = [] } = customModelAttributeObj;
    const labelText = useText(label);
    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );
    const { name: customModelAttributeName, validations: { required } = {} } =
      customModelAttribute || {};
    const nameAttributeValue = useText(nameAttribute);
    const requiredText = required ? '*' : '';
    const [uploadedFileArray, setUploadedFileArray] = useState([]);

    const formatBytes = bytes => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat(bytes / k ** i).toFixed()} ${sizes[i]}`;
    };

    const handleChange = e => {
      setUploadedFileArray(prev => [...prev, ...e.target.files]);
      setUploads({
        ...uploads,
        files: e.target.files,
      });
    };

    const clearFiles = e => {
      e.preventDefault();
      setUploads({
        files: [],
        data: [],
        failureMessage: [],
      });
    };

    const { files, data, failureMessage } = uploads;

    const acceptedValue = useText(accept) || 'image/*';
    const acceptList = acceptedValue.split(',').map(item => item.trim());
    const helperValue =
      !hideDefaultError && failureMessage.length > 0 ? failureMessage : helper;

    const [uploadFile, { loading } = {}] = useFileUpload({
      options: {
        variables: {
          fileList: Array.from(files),
          mimeType: acceptList,
        },
        onError: errorData => {
          triggerEvent('onError', errorData);
          setUploads({
            ...uploads,
            failureMessage: [errorData.message],
          });
        },
        onCompleted: uploadData => {
          const { uploadFiles } = uploadData;

          const [succeededData, failedData] = uploadFiles.reduce(
            (result, d) => {
              result[d.url.startsWith('http') ? 0 : 1].push(d);
              return result;
            },
            [[], []],
          );

          const formattedFailedData = failedData.map(d => (
            <div>{`File: ${d.name} failed with error: ${d.url}`}</div>
          ));

          if (succeededData.length > 0) {
            triggerEvent('onSuccess', succeededData);
          } else {
            triggerEvent('onNoResults');
          }
          if (failedData.length > 0) {
            triggerEvent('onError', formattedFailedData);
          }
          setUploads({
            ...uploads,
            data: multiple ? data.concat(succeededData) : succeededData,
            failureMessage: formattedFailedData,
          });
        },
      },
    });

    const removeFileFromList = fileUrl => {
      const newList = data.filter(d => d.url !== fileUrl);
      setUploads({
        ...uploads,
        data: newList,
      });
    };

    const UploadComponent = (
      <div
        className={[classes.control, fullWidth ? classes.fullwidth : ''].join(
          ' ',
        )}
      >
        <input
          accept={acceptedValue}
          className={classes.input}
          multiple={multiple}
          type="file"
          onChange={handleChange}
          ref={inputRef}
        />
        <Button
          size={size}
          variant={variant}
          classes={{
            root: classes.button,
            contained: classes.contained,
            outlined: classes.outlined,
          }}
          component="span"
          disabled={disabled}
          startIcon={
            variant !== 'icon' &&
            icon !== 'None' &&
            iconPosition === 'start' &&
            React.createElement(Icons[icon])
          }
          endIcon={
            variant !== 'icon' &&
            icon !== 'None' &&
            iconPosition === 'end' &&
            React.createElement(Icons[icon])
          }
        >
          {variant === 'icon'
            ? React.createElement(Icons[icon === 'None' ? 'Error' : icon], {
                fontSize: size,
              })
            : useText(buttonText)}
        </Button>
        {data.length > 0 && (
          <input
            type="hidden"
            name={nameAttributeValue || customModelAttributeName}
            value={data.map(d => d.url).join(',')}
          />
        )}
      </div>
    );

    const Hr = () => <hr className={classes.hr} />;

    const DeleteButton = ({ file }) => (
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
          <Delete className={classes.deleteIcon} fontSize="small" />
        </IconButton>
      </div>
    );
    const FileDetails = ({ file, fileType, fileSize }) => (
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

    const DevUploadedFile = () => {
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
    };

    const UploadedFile = ({ file }) => {
      const uploadedFile = uploadedFileArray.find(
        item => item.name === file.name,
      );

      if (!multiple) {
        B.triggerEvent('onFileUpload', file.url);
      }

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
                    fileType={uploadedFile.type}
                    fileSize={uploadedFile.size}
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
                    fileType={uploadedFile.type}
                    fileSize={uploadedFile.size}
                  />
                </div>
                <DeleteButton file={file} />
              </div>
            </>
          );
      }
    };

    const UploadingFile = () => {
      switch (type) {
        case 'grid':
          return (
            <div className={classes.gridView}>
              <div className={classes.gridItem}>
                {showImagePreview && (
                  <div className={classes.gridUploadingImage}>
                    <CloudUpload />
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
                    <CloudUpload />
                  </div>
                )}
                <div className={classes.fileDetails}>
                  <span>Uploading</span>
                </div>
              </div>
            </>
          );
      }
    };

    const Control = () => (
      <FormControl
        fullWidth={fullWidth}
        required={required}
        error={!hideDefaultError && failureMessage.length > 0}
        disabled={disabled}
        margin={margin}
      >
        <FormControlLabel
          control={UploadComponent}
          label={hideLabel ? '' : `${labelText}${requiredText}`}
          labelPlacement="top"
          classes={{
            root: classes.label,
          }}
        />
        <FormHelperText classes={{ root: classes.helper }}>
          {helperValue}
        </FormHelperText>
        <div className={classes.messageContainer}>
          {data &&
            data.length > 0 &&
            data.map(file => <UploadedFile file={file} />)}
          {loading && <UploadingFile />}
        </div>
      </FormControl>
    );

    useEffect(() => {
      if (loading) {
        triggerEvent('onLoad');
      }
    }, [loading]);

    useEffect(() => {
      if (files.length > 0) {
        uploadFile();
      }
    }, [files]);

    defineFunction('clearFileUpload', e => clearFiles(e));

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
  styles: B => t => {
    const { color: colorFunc, env, Styling } = B;
    const style = new Styling(t);
    const getOpacColor = (col, val) => colorFunc.alpha(col, val);
    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
      },
      label: {
        marginLeft: '0!important',
        pointerEvents: env === 'dev' && 'none',
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
      control: {
        display: 'inline-flex',
        alignItems: 'center',
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
      button: {
        color: ({ options: { variant, buttonTextColor, background } }) => [
          style.getColor(variant === 'icon' ? background : buttonTextColor),
          '!important',
        ],
        '&.Mui-disabled': {
          pointerEvents: 'none',
          opacity: '0.7',
        },
      },
      contained: {
        backgroundColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
      },
      outlined: {
        borderColor: ({ options: { background } }) => [
          style.getColor(background),
          '!important',
        ],
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
