(() => ({
  name: 'Conditional',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      type,
      left,
      right,
      compare,
      visible: initVisibility,
      dataComponentAttribute,
      displayLogic,
    } = options;
    const { useText, env, useLogic } = B;
    const isDev = env === 'dev';
    const isPristine = isDev && children.length === 0;
    const isSingleRule = type === 'singleRule';

    const canBeNumber = (value) => {
      return (
        value !== '' &&
        (typeof value === 'string' || typeof value === 'number') &&
        !isNaN(value)
      );
    };

    const mounted = useRef(false);
    const leftText = useText(left);
    const rightText = useText(right);
    const [leftValue, setLeftValue] = useState(leftText);
    const [rightValue, setRightValue] = useState(rightText);
    const [visible, setVisible] = useState();
    const logic = useLogic(displayLogic);

    const evalCondition = () => {
      if (!initVisibility && leftValue === '' && rightValue === '') {
        return false;
      }

      const [leftParsed, rightParsed] =
        canBeNumber(leftValue) && canBeNumber(rightValue)
          ? [parseFloat(leftValue), parseFloat(rightValue)]
          : [leftValue.toString(), rightValue.toString()];

      switch (compare) {
        case 'neq':
          return leftParsed !== rightParsed;
        case 'contains':
          return leftParsed.indexOf(rightParsed) > -1;
        case 'notcontains':
          return leftParsed.indexOf(rightParsed) < 0;
        case 'gt':
          return leftParsed > rightParsed;
        case 'lt':
          return leftParsed < rightParsed;
        case 'gteq':
          return leftParsed >= rightParsed;
        case 'lteq':
          return leftParsed <= rightParsed;
        default:
          return leftParsed === rightParsed;
      }
    };

    const checkCondition = evalCondition();

    useEffect(() => {
      setLeftValue(leftText);
      setRightValue(rightText);
    }, [leftText, rightText, setLeftValue, setRightValue]);

    useEffect(() => {
      setVisible(checkCondition);
    }, [checkCondition]);

    useEffect(() => {
      if (visible) {
        B.triggerEvent('isTrue', true);
      } else {
        B.triggerEvent('isFalse', false);
      }
      if (mounted.current) {
        B.triggerEvent('onChange', visible);
      }
    }, [visible]);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    B.defineFunction('Hide', () => setVisible(false));
    B.defineFunction('Show', () => setVisible(true));
    B.defineFunction('Show/Hide', () => setVisible((s) => !s));
    B.defineFunction('Set Visibility', (value) => {
      if (typeof value === 'boolean') setVisible(value);
    });

    const getValue = (evt) => {
      const value = (evt && evt.target && evt.target.value) || evt;
      return `${value}`;
    };
    B.defineFunction('Set Left Value', (evt) => setLeftValue(getValue(evt)));
    B.defineFunction('Set Right Value', (evt) => setRightValue(getValue(evt)));

    if (isSingleRule && !isDev && !visible) {
      return <></>;
    }

    if (!isSingleRule && !isDev && !logic) {
      return <></>;
    }

    return (
      <div
        className={children.length === 0 ? classes.empty : undefined}
        data-component={useText(dataComponentAttribute) || 'Conditional'}
      >
        {isPristine ? 'Conditional' : children}
      </div>
    );
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
