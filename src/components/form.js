(() => ({
  name: 'Form',
  icon: 'FormIcon',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div>
      {(() => {
        const { Action, Children } = B;

        const {
          actionId,
          model,
          filter,
          formErrorMessage,
          formSuccessMessage,
        } = options;

        const formRef = React.createRef();

        const empty = children.length === 0;
        const isDev = B.env === 'dev';
        const isPristine = empty && isDev;

        return (
          <Action actionId={actionId}>
            {(callAction, { data, loading, error }) => (
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
                    const formData = new FormData(formRef.current);
                    const entries = Array.from(formData);
                    const values = entries.reduce((acc, currentvalue) => {
                      const key = currentvalue[0];
                      const value = currentvalue[1];
                      return { ...acc, [key]: value };
                    }, {});
                    callAction({
                      variables: { input: values },
                    });
                  }}
                  ref={formRef}
                  className={[
                    empty && classes.empty,
                    isPristine && classes.pristine,
                  ].join(' ')}
                >
                  {isPristine && <span>form</span>}
                  {!model || isDev ? (
                    <Children loading={loading}>{children}</Children>
                  ) : (
                    <B.GetAll modelId={model} filter={filter} skip={0} take={1}>
                      {({
                        loading: dataLoading,
                        error: dataError,
                        data: modelData,
                      }) => {
                        if (dataLoading) return 'Loading...';
                        if (dataError) return 'Failed';

                        const item = modelData.results[0];

                        return (
                          <>
                            <B.GetOneProvider key={item.id} value={item}>
                              {children}
                            </B.GetOneProvider>
                          </>
                        );
                      }}
                    </B.GetAll>
                  )}
                </form>
              </>
            )}
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
