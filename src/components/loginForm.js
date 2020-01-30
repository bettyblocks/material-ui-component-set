(() => ({
  name: '@betty-blocks/default/LoginForm',
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
    'ALERT',
    'TEXT',
    'BUTTON',
    'DIVIDER',
    'IMAGE',
    'CONTAINER_COMPONENT',
    'FORM_COMPONENT',
    'CONTENT_COMPONENT',
  ],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={classes.root}>
      {(() => {
        const { env, Action, Children, getEndpoint } = B;

        // eslint-disable-next-line
        const history = env === 'dev' ? { push: x => x } : useHistory();

        const {
          actionId,
          formErrorMessage,
          formSuccessMessage,
          formEndpoint,
        } = options;

        const [state, setState] = useState({});
        const { url } =
          B.env !== 'dev' && formEndpoint && getEndpoint(formEndpoint);

        const empty = children.length === 0;
        const isPristine = empty && B.env === 'dev';

        const isJWT = input => {
          const parts = input.split('.');
          return parts.length === 3 && input.startsWith('ey');
        };

        return (
          <Action actionId={actionId}>
            {(callAction, { data, loading, error }) => {
              if (
                data &&
                data[`action${actionId}`] &&
                isJWT(data[`action${actionId}`])
              ) {
                localStorage.setItem('TOKEN', data[`action${actionId}`]);
              }
              if (data && url) {
                history.push(url);
              }
              return (
                <>
                  <div className={classes.messageContainer}>
                    {error && (
                      <span className={classes.error}>{formErrorMessage}</span>
                    )}
                    {data && (
                      <span className={classes.success}>
                        {formSuccessMessage}
                      </span>
                    )}
                  </div>

                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      callAction({
                        variables: { input: state },
                      });
                    }}
                    className={[
                      classes.form,
                      empty && classes.empty,
                      isPristine && classes.pristine,
                    ].join(' ')}
                  >
                    {isPristine && <span>form</span>}
                    <Children
                      state={state}
                      setState={setState}
                      loading={loading}
                    >
                      {children}
                    </Children>
                  </form>
                </>
              );
            }}
          </Action>
        );
      })()}
    </div>
  ),
  styles: B => t => {
    const style = new B.Styling(t);

    return {
      error: {
        color: style.getColor('Danger'),
      },
      success: {
        color: style.getColor('Success'),
      },
      messageContainer: {
        marginBottom: '0.5rem',
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: ({ options: { columnHeight } }) =>
          columnHeight ? 0 : '4rem',
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
