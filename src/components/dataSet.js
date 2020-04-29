(() => ({
  name: 'dataSet',
  type: 'DATASET',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const dataProperty = B.getProperty(options.dataProperty);
    const isDev = B.env === 'dev';
    const colors = useRef(null);
    const uuid = useRef(null);

    useEffect(() => {
      uuid.current = parent.uuid;
    }, []);

    useEffect(() => {
      const style = getComputedStyle(colors.current);
      if (!isDev && dataProperty) {
        const dataLabel = B.useText(options.dataLabel);
        parent.addProp({
          label: dataLabel,
          name: dataProperty.name,
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
          uuid: uuid.current,
        });
      }
      if (isDev) {
        parent.addProp({
          label: 'Dev',
          name: 'Dev',
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
          uuid: uuid.current,
        });
      }
    }, [options.borderColor, options.backgroundColor]);

    return (
      <div className={classes.root}>
        <div ref={colors} className={classes.colors}></div>
        <div className={classes.labelSquare}></div>
        <div className={classes.labelText}>
          {<B.Text value={options.dataLabel} />}
        </div>
      </div>
    );
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    return {
      root: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
      },
      labelText: {
        fontSize: '12px',
        color: 'grey',
      },
      labelSquare: {
        height: '10px',
        width: '38px',
        borderStyle: 'solid',
        borderWidth: '3px',
        borderColor: ({ options: { borderColor } }) =>
          style.getColor(borderColor),
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        marginRight: '4px',
      },
      colors: {
        display: 'nonde',
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        borderColor: ({ options: { borderColor } }) =>
          style.getColor(borderColor),
      },
    };
  },
}))();
