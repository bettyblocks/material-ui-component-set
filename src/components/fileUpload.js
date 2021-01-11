(() => ({
  name: 'FileUpload',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText, useFileUpload, getCustomModelAttribute } = B;
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
      showImagePreview,
      type,
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

    const handleChange = e => {
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
          B.triggerEvent('onError', errorData);
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
            B.triggerEvent('onSuccess', succeededData);
          } else {
            B.triggerEvent('onNoResults');
          }
          if (failedData.length > 0) {
            B.triggerEvent('onError', formattedFailedData);
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
      <IconButton
        size="small"
        className={classes.remove}
        onClick={file ? () => removeFileFromList(file.url) : {}}
      >
        <Delete className={classes.deleteIcon} fontSize="small" />
      </IconButton>
    );
    const FileDetails = ({ file }) => (
      <div className={classes.fileDetails}>
        <Typography variant="body1" noWrap className={classes.span}>
          {file ? file.name : 'File name'}
        </Typography>
        <div className={classes.fileDetailList}>
          <p className={classes.fileDetail}>Size</p>
          <div className={classes.divider} />
          <p className={classes.fileDetail}>Type</p>
        </div>
      </div>
    );

    const DevUploadedFile = () => {
      switch (type) {
        case 'list':
          return (
            <>
              <Hr />
              <div className={classes.fileList}>
                {showImagePreview && <div className={classes.devImage} />}
                <FileDetails />
                <DeleteButton />
              </div>
            </>
          );
        case 'grid':
        default:
          return <>grid</>;
      }
    };

    const UploadedFile = ({ file }) => (
      <>
        <Hr />
        <div className={classes.fileList}>
          {showImagePreview && (
            <div
              style={{
                backgroundImage: `url("${file.url}")`,
              }}
              className={classes.image}
            />
          )}
          <FileDetails file={file} />
          <DeleteButton file={file} />
        </div>
      </>
    );

    const UploadingFile = () => (
      <>
        <Hr />
        <div className={classes.fileList}>
          {showImagePreview && (
            <div className={classes.placeholderImage}>
              <CloudUpload />
            </div>
          )}
          <div className={classes.fileDetails}>
            <Typography variant="body1" noWrap className={classes.span}>
              Uploading
            </Typography>
          </div>
        </div>
      </>
    );

    const Control = (
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
        {loading && B.triggerEvent('onLoad')}
        <div className={classes.messageContainer}>
          {data &&
            data.length > 0 &&
            data.map(file => <UploadedFile file={file} />)}
          {loading && <UploadingFile />}
        </div>
      </FormControl>
    );

    useEffect(() => {
      if (files.length > 0) {
        uploadFile();
      }
    }, [files]);

    B.defineFunction('clearFileUpload', e => clearFiles(e));

    return isDev ? (
      <div>
        <div className={classes.root}>{Control}</div>
        <DevUploadedFile />
      </div>
    ) : (
      Control
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    const { color: colorFunc } = B;
    const getOpacColor = (col, val) => colorFunc.alpha(col, val);
    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
      },
      label: {
        marginLeft: [0, '!important'],
        pointerEvents: B.env === 'dev' && 'none',
        alignItems: ['start', '!important'],
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
        marginRight: ['1rem', '!important'],
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
        paddingTop: '1.25rem',
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
      fileList: {
        display: 'flex',
        alignItems: 'center',
      },
      devImage: {
        display: 'flex',
        overflow: 'hidden',
        margin: '0.9375rem',
        borderStyle: 'dashed',
        borderColor: '#AFB5C8',
        borderRadius: '0.3rem',
        borderWidth: '0.0625rem',
        backgroundColor: '#F0F1F5',
        border: '2px dashed black',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      deleteIcon: {
        color: `${t.colors.light}!important`,
      },
      placeholderImage: {
        color: 'white',
        display: 'flex',
        overflow: 'hidden',
        margin: '0.9375rem',
        alignItems: 'center',
        borderRadius: '0.3rem',
        justifyContent: 'center',
        backgroundColor: t.colors.warning,
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
      },
      image: {
        overflow: 'hidden',
        margin: '0.9375rem',
        borderRadius: '0.3rem',
        backgroundSize: 'cover',
        width: ({ options: { imagePreviewWidth } }) => imagePreviewWidth,
        height: ({ options: { imagePreviewHeight } }) => imagePreviewHeight,
        backgroundImage: 'url("")',
      },
      fileDetails: {
        flexGrow: 1,
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
        marginLeft: '0.625rem',
        backgroundColor: t.colors.light,
        marginRight: '0.625rem',
      },
      hr: {
        height: 1,
        margin: 0,
        border: 'none',
        backgroundColor: t.colors.light,
      },
      remove: {
        margin: '0.9375rem!important',
        padding: '0.25rem!important',
      },
    };
  },
}))();
