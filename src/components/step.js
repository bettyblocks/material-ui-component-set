(() => ({
  name: 'Step',
  type: 'STEP_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, triggerEvent } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const { label, icon } = options || {};
    const { stepLabelData, setStepLabelData, active, isFirstRender } = parent;

    const StepContent =
      isEmpty && isDev ? <div className={classes.empty}>Step</div> : children;

    const StepCmp = <>{active ? StepContent : null}</>;

    useEffect(() => {
      if (active && !isFirstRender) {
        triggerEvent('OnStepActive');
      } else if (!active && !isFirstRender) {
        triggerEvent('OnStepInactive');
      }
    }, [active, isFirstRender]);

    useEffect(() => {
      if (setStepLabelData) {
        setStepLabelData({
          ...stepLabelData,
          [`label${index}`]: label,
          [`icon${index}`]: icon,
        });
      }
    }, [setStepLabelData, index, label, icon]);

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
