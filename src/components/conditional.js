(() => ({
  name: 'Conditional',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={children.length === 0 ? classes.empty : undefined}>
      {(() => {
        const { left, right, compare } = options;
        const { useText, env } = B;
        const isDev = env === 'dev';
        const isPristine = isDev && children.length === 0;
        const mounted = useRef(false);
        const [leftValue, setLeftValue] = useState(useText(left));
        const [rightValue, setRightValue] = useState(useText(right));

        const evalCondition = () => {
          const leftAsNumber = parseFloat(leftValue);
          const rightAsNumber = parseFloat(rightValue);

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
        const initialVisibility = options.visible ? checkCondition : false;
        const [visible, setVisible] = useState(false);

        useEffect(() => {
          setVisible(evalCondition());
        }, [leftValue, rightValue]);

        useEffect(() => {
          setVisible(initialVisibility);
        }, []);

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
        B.defineFunction('Show/Hide', () => setVisible(s => !s));
        B.defineFunction('Set Visibility', value => {
          if (typeof value === 'boolean') setVisible(value);
        });
        B.defineFunction('Set Left Value', value => {
          if (typeof value === 'object') {
            value.length == undefined
              ? setLeftValue(value.target.value)
              : setLeftValue(value.map(String));
          } else {
            setLeftValue(value.toString());
          }
        });
        B.defineFunction('Set Right Value', value => {
          if (typeof value === 'object') {
            value.length == undefined
              ? setRightValue(value.target.value)
              : setRightValue(value.map(String));
          } else {
            setRightValue(value.toString());
          }
        });

        if (!isDev && !visible) return null;
        return isPristine ? 'Conditional' : children;
      })()}
    </div>
  ),
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
