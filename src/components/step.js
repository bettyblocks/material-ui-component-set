(() => ({
  name: 'Step',
  type: 'STEP_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const { label, icon, disabled, dataComponentAttribute } = options || {};
    const { setStepLabelData, active, isFirstRender } = parent;

    const StepContent =
      isEmpty && isDev ? <div className={classes.empty}>Step</div> : children;

    const StepCmp = (
      <div
        className={includeStyling()}
        data-component={useText(dataComponentAttribute) || 'Step'}
      >
        {active ? StepContent : null}
      </div>
    );

    useEffect(() => {
      if (active && !isFirstRender) {
        B.triggerEvent('OnStepActive');
      } else if (!active && !isFirstRender) {
        B.triggerEvent('OnStepInactive');
      }
    }, [active, isFirstRender]);

    useEffect(() => {
      if (setStepLabelData) {
        setStepLabelData((prev) => ({
          ...prev,
          [`label${index}`]: label,
          [`icon${index}`]: icon,
          [`disabled${index}`]: disabled,
        }));
      }
    }, [setStepLabelData, index, label, icon, disabled]);

    return isDev ? <div className={classes.wrapper}>{StepCmp}</div> : StepCmp;
  })(),
  styles: () => () => ({
    empty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.5rem',
      fontSize: '0.75rem',
      color: '#262A3A',
      textTransform: 'uppercase',
      borderWidth: '0.0625rem',
      borderColor: '#AFB5C8',
      borderStyle: 'dashed',
      backgroundColor: '#F0F1F5',
    },
  }),
}))();
