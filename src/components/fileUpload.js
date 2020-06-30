(() => ({
  name: 'FileUpload',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      env,
      useText,
      getProperty,
      getActionInput,
      Children,
      useFileUpload,
    } = B;
    const {
      FormControl,
      FormControlLabel,
      FormHelperText,
      Button,
      Typography,
    } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const {
      property,
      label,
      propertyLabelOverride,
      actionInputId,
      required,
      error,
      disabled,
      helperText,
      fullWidth,
      size,
      position,
      accept,
      margin,
      variant,
      icon,
      iconPosition,
      buttonText,
      multiple,
    } = options;

    const isDev = env === 'dev';
    const inputRef = React.createRef();
    const [uploads, setUploads] = useState({
      files: [],
      data: [],
    });
    const helper = useText(helperText);
    const propLabel =
      property && getProperty(property) && getProperty(property).label;
    const propLabelOverride = useText(propertyLabelOverride);
    const propertyLabelText = isDev ? '{{ property label }}' : propLabel;
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : useText(label);
    const requiredText = required ? '*' : '';

    const actionInput = getActionInput(actionInputId);

    const handleChange = e => {
      setUploads({
        files: e.target.files,
        data: [],
      });
    };

    const clearFiles = e => {
      e.preventDefault();
      setUploads({
        files: [],
        data: [],
      });
    };

    const { files, data } = uploads;

    const [uploadFile, { loading, error: uploadError } = {}] = useFileUpload({
      options: {
        variables: {
          fileList: Array.from(files),
        },
        onCompleted: uploadData => {
          const { uploadFiles } = uploadData;
          setUploads({
            ...uploads,
            data: uploadFiles,
          });
        },
      },
    });

    const UploadComponent = (
      <div
        className={[
          classes.control,
          fullWidth ? classes.fullwidth : '',
          position === 'start' ? classes.start : '',
          position === 'end' ? classes.end : '',
        ].join(' ')}
      >
        <input
          accept={accept}
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
        <Typography variant="body1" noWrap className={classes.span}>
          {data.length === 0 && 'Select file(s)...'}
          {data.length === 1 && data[0].name}
          {data.length > 1 && `Selected ${data.length} files`}
          {data.length > 0 && (
            <input
              type="hidden"
              name={actionInput && actionInput.name}
              value={data.map(d => d.url).join(',')}
            />
          )}
        </Typography>
      </div>
    );

    const Control = (
      <FormControl
        fullWidth={fullWidth}
        required={required}
        error={error}
        disabled={disabled}
        margin={margin}
      >
        <div className={classes.labelWrapper}>
          <FormControlLabel
            control={UploadComponent}
            label={`${labelText}${requiredText}`}
            labelPlacement={position}
            classes={{
              root: classes.label,
            }}
          />
          <Children disabled={disabled || files.length === 0}>
            {children}
          </Children>
        </div>
        <div className={classes.messageContainer}>
          {loading && <span>Uploading...</span>}
          {uploadError && (
            <span className={classes.error}>{uploadError.message}</span>
          )}
        </div>
        {helper && <FormHelperText>{helper}</FormHelperText>}
      </FormControl>
    );

    useEffect(() => {
      if (files.length > 0) {
        uploadFile();
      }
    }, [files]);

    useEffect(() => {
      B.defineFunction('clearFileUpload', e => clearFiles(e));
    }, []);

    return isDev ? <div className={classes.root}>{Control}</div> : Control;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
      },
      labelWrapper: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      },
      label: {
        pointerEvents: B.env === 'dev' && 'none',
        alignItems: ({ options: { position } }) =>
          position === 'top' || position === 'bottom'
            ? ['start', '!important']
            : 'center',
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
        marginLeft: ['1rem', '!important'],
        marginRight: ['1rem', '!important'],
      },
      start: {
        marginLeft: '1rem',
      },
      end: {
        marginRight: '1rem',
      },
      button: {
        color: ({ options: { variant, textColor, background } }) => [
          style.getColor(variant === 'icon' ? background : textColor),
          '!important',
        ],
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
      error: {
        color: style.getColor('Danger'),
      },
    };
  },
}))();
