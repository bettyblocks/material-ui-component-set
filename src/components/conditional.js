(() => ({
  name: 'Conditional',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (
    <div className={children.length === 0 ? classes.empty : undefined}>
      {(() => {
        const { useText, env } = B;
        const isDev = env === 'dev';
        const isPristine = isDev && children.length === 0;

        const evalCondition = () => {
          const left = useText(options.left);
          const { compare } = options;
          const right = useText(options.right);

          if (compare === 'not_eq') {
            return left !== right;
          }

          return left === right;
        };
        const initialVisibility = isDev || evalCondition();
        const [visible, setVisible] = useState(initialVisibility);

        useEffect(() => {
          B.defineFunction('Hide', () => setVisible(false));
          B.defineFunction('Show', () => setVisible(true));
          B.defineFunction('Toggle', () => setVisible(s => !s));
        }, []);

        if (!visible) return null;
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
