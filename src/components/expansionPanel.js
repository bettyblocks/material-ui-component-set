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
    const { useText, env, Icon } = B;
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
      dataComponentAttribute,
      preLoadData,
    } = options;
    const Variant = {
      Title1: 'h1',
      Title2: 'h2',
      Title3: 'h3',
      Title4: 'h4',
      Title5: 'h5',
      Title6: 'h6',
      Body1: 'p',
      Body2: 'p',
    }[options.titleType || 'Body1'];

    const [expanded, setExpanded] = useState(defaultExpanded);
    const [dataShown, setDataShown] = useState(defaultExpanded || preLoadData);

    const closePanel = () => setExpanded(false);
    const openPanel = () => setExpanded(true);
    const togglePanel = () => setExpanded((s) => !s);

    B.defineFunction('Expand', openPanel);
    B.defineFunction('Collapse', closePanel);
    B.defineFunction('Expand/Collapse', togglePanel);
    B.defineFunction('Set Expansion Panel', (value) => {
      if (typeof value === 'boolean') setExpanded(value);
    });

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
      setDataShown(true);
      togglePanel();
    };

    const onChange = (_evt, expandedBool) => {
      B.triggerEvent('onToggle', expandedBool);
      if (expandedBool) {
        B.triggerEvent('onExpand');
        return;
      }
      B.triggerEvent('onCollapse');
    };

    const panelOptions = {
      disabled,
      defaultExpanded,
      square,
      variant,
      elevation: variant === 'flat' ? 0 : elevation,
      expanded,
      'data-component': useText(dataComponentAttribute) || 'ExpansionPanel',
      onChange,
    };

    const panelSummaryOptions = {
      onClick,
      expandIcon: <Icon name="ExpandMore" />,
    };

    const ShowChilderen = <>{dataShown || isDev ? children : ''}</>;

    const ExpansionPanelComponent = (
      <ExpansionPanel {...panelOptions} className={includeStyling()}>
        <ExpansionPanelSummary {...panelSummaryOptions}>
          <Typography variant={Variant} className={classes.panelTitle}>
            {useText(title)}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          {isEmpty ? PlaceHolder : ShowChilderen}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );

    return <div className={classes.panel}>{ExpansionPanelComponent}</div>;
  })(),
  styles: (B) => (theme) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      panelTitle: {
        '&.MuiTypography-root': {
          fontWeight: ({ options: { titleFontWeight } }) => titleFontWeight,
        },
        marginTop: ({ options: { titleSpacing } }) =>
          getSpacing(titleSpacing[0]),
        marginRight: ({ options: { titleSpacing } }) =>
          getSpacing(titleSpacing[1]),
        marginBottom: ({ options: { titleSpacing } }) =>
          getSpacing(titleSpacing[2]),
        marginLeft: ({ options: { titleSpacing } }) =>
          getSpacing(titleSpacing[3]),
        color: ({ options: { titleTextColor } }) =>
          style.getColor(titleTextColor),
        fontFamily: ({ options: { titleType } }) =>
          style.getFontFamily(titleType),
        fontSize: ({ options: { titleType } }) => style.getFontSize(titleType),
        fontWeight: ({ options: { titleFontWeight } }) => titleFontWeight,
        textTransform: ({ options: { titleType } }) =>
          style.getTextTransform(titleType),
        letterSpacing: ({ options: { titleType } }) =>
          style.getLetterSpacing(titleType),
      },

      panelDetails: {
        '&.MuiExpansionPanelDetails-root': {
          display: 'block',
          paddingTop: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[0]),
          paddingRight: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[1]),
          paddingBottom: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[2]),
          paddingLeft: ({ options: { innerSpacing } }) =>
            getSpacing(innerSpacing[3]),
          [`@media ${mediaMinWidth(600)}`]: {
            paddingTop: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[0], 'Portrait'),
            paddingRight: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[1], 'Portrait'),
            paddingBottom: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[2], 'Portrait'),
            paddingLeft: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[3], 'Portrait'),
          },
          [`@media ${mediaMinWidth(960)}`]: {
            paddingTop: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[0], 'Landscape'),
            paddingRight: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[1], 'Landscape'),
            paddingBottom: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[2], 'Landscape'),
            paddingLeft: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[3], 'Landscape'),
          },
          [`@media ${mediaMinWidth(1280)}`]: {
            paddingTop: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[0], 'Desktop'),
            paddingRight: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[1], 'Desktop'),
            paddingBottom: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[2], 'Desktop'),
            paddingLeft: ({ options: { innerSpacing } }) =>
              getSpacing(innerSpacing[3], 'Desktop'),
          },
        },
      },

      panel: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
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
        '&::after': {
          content: '"Expansion panel"',
        },
      },
    };
  },
}))();
