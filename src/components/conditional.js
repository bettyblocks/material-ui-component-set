(() => ({
  name: 'Conditional',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      left,
      right,
      compare,
      visible: initVisibility,
      dataComponentAttribute,
    } = options;
    const { useText, env } = B;
    const isDev = env === 'dev';
    const isPristine = isDev && children.length === 0;
    const mounted = useRef(false);
    const leftText = useText(left);
    const rightText = useText(right);
    const [leftValue, setLeftValue] = useState(leftText);
    const [rightValue, setRightValue] = useState(rightText);
    const [visible, setVisible] = useState();
    const evalCondition = () => {
      const leftAsNumber = parseFloat(leftValue);
      const rightAsNumber = parseFloat(rightValue);

      if (!initVisibility && leftValue === '' && rightValue === '') {
        return false;
      }

      switch (compare) {
        case 'neq':
          return leftValue !== rightValue;
        case 'contains':
          return leftValue.indexOf(rightValue) > -1;
        case 'notcontains':
          return leftValue.indexOf(rightValue) < 0;
        case 'gt':
          return leftAsNumber > rightAsNumber;
        case 'lt':
          return leftAsNumber < rightAsNumber;
        case 'gteq':
          return leftAsNumber >= rightAsNumber;
        case 'lteq':
          return leftAsNumber <= rightAsNumber;
        default:
          return leftValue === rightValue;
      }
    };

    const checkCondition = evalCondition();

    useEffect(() => {
      setLeftValue(leftValue);
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

    if (!isDev && !visible) return <></>;

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
