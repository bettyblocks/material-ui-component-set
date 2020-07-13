(() => ({
  name: 'ExpansionPanel',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      ExpansionPanel,
      ExpansionPanelSummary,
      ExpansionPanelDetails,
      Typography,
    } = window.MaterialUI.Core;
    const { ExpandMore } = window.MaterialUI.Icons;
    const { useText, env } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const isPristine = isEmpty && isDev;
    const {
      title,
      disabled,
      defaultExpanded,
      square,
      variant,
      elevation,
    } = options;

    const [expanded, setExpanded] = useState(defaultExpanded);

    const closePanel = () => setExpanded(false);
    const openPanel = () => setExpanded(true);
    const togglePanel = () => setExpanded(s => !s);

    useEffect(() => {
      B.defineFunction('Expand', openPanel);
      B.defineFunction('Collapse', closePanel);
      B.defineFunction('Expand/Collapse', togglePanel);
    }, []);

    useEffect(() => {
      if (isDev) {
        setExpanded(defaultExpanded);
      }
    }, [defaultExpanded, isDev]);

    const PlaceHolder = (
      <div
        className={[
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')}
      />
    );

    const onClick = () => {
      if (isDev) return;
      togglePanel();
    };

    const panelOptions = {
      disabled,
      defaultExpanded,
      square,
      variant,
      elevation: variant === 'flat' ? 0 : elevation,
      expanded,
      onClick,
    };

    const ExpansionPanelComponent = (
      <ExpansionPanel {...panelOptions}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography>{useText(title)}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {isEmpty ? PlaceHolder : children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );

    return isDev ? (
      <div>{ExpansionPanelComponent}</div>
    ) : (
      ExpansionPanelComponent
    );
  })(),
  styles: () => () => ({
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
      '&::after': {
        content: '"Expansion panel"',
      },
    },
  }),
}))();
