(() => ({
  name: 'Form',
  icon: 'FormIcon',
  category: 'FORM',
  type: 'FORM',
  allowedTypes: [
    'DATE_PICKER',
    'DATE_TIME_PICKER',
    'TIME_PICKER',
    'NUMBER_INPUT',
    'PASSWORD_INPUT',
    'DROPDOWN',
    'MULTISELECT',
    'CHECKBOX',
    'TEXT_INPUT',
    'TEXT_AREA',
    'PRICE_INPUT',
    'EMAIL_INPUT',
    'RADIO_BUTTON_GROUP',
    'FILE_INPUT',
    'IMAGE_INPUT',
    'SUBMIT_BUTTON',
  ],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      {(() => {
        const [state, setState] = useState({});
        const [status, setStatus] = useState(null);
        const [showValid, setShowValid] = useState(null);
        const showPlaceholder = children.length === 0;
        const isPristine = showPlaceholder && B.env === 'dev';
        const ref = React.createRef();
        const initState = {};

        const handleChange = ({ target: { name, value } }) => {
          const newState = {
            ...initState,
            ...state,
            [name]: value,
          };
          setStatus(null);
          setState(newState);
        };

        const postData = () => {
          const redirect = B.getEndpoint(options.redirect) || '';
          const formData = new FormData();
          const newState = {
            ...initState,
            ...state,
          };
          Object.keys(newState).forEach(key => {
            formData.append(key, newState[key]);
          });
          fetch(options.resourceUrl, {
            method: 'POST',
            body: formData,
          })
            .then(result => {
              if (result.status === 200) {
                setStatus('success');
                if (redirect) {
                  const currentLocation = window.location.href.substring(
                    0,
                    window.location.href.lastIndexOf('/'),
                  );

                  const redirectUrl = redirect.url.startsWith('/')
                    ? redirect.url
                    : `/${redirect.url}`;

                  window.location.href = currentLocation + redirectUrl;
                }
              } else {
                setStatus('error');
              }
            })
            .catch(() => {
              setStatus('error');
            });
        };

        const validateForm = () => {
          setShowValid(true);
          const formElement = ref.current;
          const requiredFields = formElement.querySelectorAll(':required');
          const requiredFieldArray = Array.from(requiredFields);
          const remainingFields = requiredFieldArray.reduce(
            (accumulator, currentValue) => {
              if (currentValue.value !== '') {
                return accumulator - 1;
              }
              return accumulator;
            },
            requiredFieldArray.length,
          );
          return remainingFields === 0;
        };

        const submitForm = () => {
          if (validateForm()) {
            setStatus('waiting');
            postData();
          }
        };

        const childrenWithProps = React.Children.map(children, child => {
          const totalOptions = child.props.options || {};

          if ('formComponentName' in totalOptions) {
            totalOptions.handleChange = handleChange;
            totalOptions.showValid = showValid;
            initState[totalOptions.formComponentName] =
              totalOptions.formComponentValue;
          }

          if ('submitButtonText' in totalOptions) {
            totalOptions.onClick = submitForm;
            totalOptions.formStatus = status;
            totalOptions.buttonDisabled =
              (status && status === 'waiting') || !options.resourceUrl;
          }

          return React.cloneElement(child, {
            options: { ...totalOptions },
          });
        });

        return (
          <form
            action={options.resourceUrl}
            method="POST"
            encType="multipart/form-data"
            className={classes.form}
            ref={ref}
          >
            <div
              className={[
                showPlaceholder ? classes.empty : '',
                isPristine ? classes.pristine : '',
              ].join(' ')}
            >
              {isPristine ? 'Form' : childrenWithProps}
            </div>
            {status && status === 'success' && (
              <p className={classes.success}>{options.formSuccessMessage}</p>
            )}
            {status && status === 'error' && (
              <p className={classes.error}>{options.formErrorMessage}</p>
            )}
          </form>
        );
      })()}
    </div>
  ),
  styles: B => t => {
    const style = new B.Styling(t);
    const { base } = t;
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
      },
      form: {
        extend: base,
        position: 'relative',
      },
      normal: {
        padding: '0 1rem',
        fontSize: '0.875rem',
        height: '2.25rem',
      },
      success: {
        color: style.getColor('Success'),
      },
      error: {
        color: style.getColor('Danger'),
      },
      [`@media ${B.mediaMinWidth(768)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
      },
      [`@media ${B.mediaMinWidth(1024)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
      },
      [`@media ${B.mediaMinWidth(1200)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '4rem',
        height: '100%',
        width: '100%',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
      },
    };
  },
}))();
