(() => ({
  name: 'Grid',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      defineFunction = () => {},
      env,
      GetAll,
      InteractionScope,
      ModelProvider,
      triggerEvent = () => {},
    } = B;
    const { Grid, Hidden } = window.MaterialUI.Core;
    const isDev = env === 'dev';
    const {
      alignItems,
      alignContent,
      type,
      justify,
      direction,
      spacing,
      wrap,
      zeroMinWidth,
      reverse,
      xsWidth,
      smWidth,
      mdWidth,
      lgWidth,
      xlWidth,
      model,
      filter,
      visibility,
      repeatedItems,
      showError,
    } = options;
    const isEmpty = children.length === 0;
    const isContainer = type === 'container';
    const isItem = type === 'item';
    const displayError = showError === 'built-in';

    const gridDirection = reverse ? `${direction}-reverse` : direction;
    const take = parseInt(repeatedItems, 10) || 50;
    const [isVisible, setIsVisible] = useState(visibility);

    const sizeNames = ['xs', 'sm', 'md', 'lg', 'xl'];
    const only = [];
    const sizes = [xsWidth, smWidth, mdWidth, lgWidth, xlWidth].reduce(
      (acc, w, index) => {
        const name = sizeNames[index];
        let value = '';
        if (w === 'true') {
          value = true;
        } else if (w === 'false') {
          value = false;
        } else if (w === 'auto') {
          value = w;
        } else if (w === 'hidden') {
          only.push(name);
        } else {
          value = parseInt(w, 10);
        }
        acc[name] = value;
        return acc;
      },
      {},
    );

    const gridOptions = {
      alignContent,
      alignItems,
      classes: { root: classes.root },
      container: isContainer,
      direction: gridDirection,
      item: isItem,
      justify,
      spacing,
      wrap,
      zeroMinWidth,
      xs: sizes.xs,
      sm: sizes.sm,
      md: sizes.md,
      lg: sizes.lg,
      xl: sizes.xl,
    };

    const gridRef = React.createRef();
    const numberOfChildren = children.length;

    if (isDev) {
      const repeat = () => {
        if (!gridRef.current || !model || children.length === 0) {
          return;
        }
        Array.from(gridRef.current.children).forEach((child, index) => {
          if (index >= numberOfChildren) {
            child.parentNode.removeChild(child);
          }
        });
        const currentHTML = gridRef.current.innerHTML;
        const newDiv = document.createElement('div');
        newDiv.innerHTML = currentHTML;
        Array.from(newDiv.children).forEach(child => {
          child.classList.add(classes.opac);
        });
        for (let i = 0; i < take - 1; i += 1) {
          gridRef.current.insertAdjacentHTML('beforeend', newDiv.innerHTML);
        }
      };

      React.useEffect(() => {
        const mutationObserver = new MutationObserver(() => {
          repeat();
        });
        mutationObserver.observe(gridRef.current, {
          attributes: true,
          characterData: true,
          childList: false,
          subtree: true,
          attributeOldValue: false,
          characterDataOldValue: false,
        });
        repeat();
      });
    }

    const GridComp = !model ? (
      <Grid {...gridOptions}>{children}</Grid>
    ) : (
      <GetAll modelId={model} filter={filter}>
        {({ loading, error, data }) => {
          if (loading) {
            triggerEvent('onLoad', loading);
            return <span>Loading...</span>;
          }

          if (error && !displayError) {
            triggerEvent('onError', error);
          }
          if (error && displayError) {
            return <span>{error.message}</span>;
          }

          const { results = [] } = data || {};
          if (results.length > 0) {
            triggerEvent('onSuccess', results);
          } else {
            triggerEvent('onNoResults');
          }

          return (
            <Grid {...gridOptions}>
              {results.map(item => (
                <ModelProvider key={item.id} value={item} id={model}>
                  <InteractionScope>{children}</InteractionScope>
                </ModelProvider>
              ))}
            </Grid>
          );
        }}
      </GetAll>
    );

    const ConditionalGrid = <Hidden only={only}>{GridComp}</Hidden>;
    const RuntimeCmp = isVisible ? ConditionalGrid : <></>;

    defineFunction('Show', () => setIsVisible(true));
    defineFunction('Hide', () => setIsVisible(false));
    defineFunction('Show/Hide', () => setIsVisible(s => !s));

    return isDev ? (
      <div
        className={[classes.wrapper, isEmpty ? classes.empty : ''].join(' ')}
        data-type={`grid-${type}`}
      >
        <Grid ref={gridRef} {...gridOptions}>
          {children}
        </Grid>
      </div>
    ) : (
      RuntimeCmp
    );
  })(),
  styles: B => theme => {
    const { env, mediaMinWidth, Styling } = B;
    const isDev = env === 'dev';
    const style = new Styling(theme);
    const getWidth = value => {
      if (value === 'false') {
        return null;
      }
      if (value === 'true') {
        return '100%';
      }
      if (value === 'auto') {
        return 'none';
      }
      return `${Math.round((parseInt(value, 10) / 12) * 10e7) / 10e5}%`;
    };
    const getFlexBasis = value => {
      if (value === 'false') {
        return null;
      }
      if (value === 'true') {
        return 0;
      }
      if (value === 'auto') {
        return 'auto';
      }
      return `${Math.round((parseInt(value, 10) / 12) * 10e7) / 10e5}%`;
    };
    const getFlexGrow = value => {
      if (value === 'false') {
        return null;
      }
      if (value === 'true') {
        return 1;
      }
      return 0;
    };

    return {
      wrapper: {
        display: ({ options: { type } }) => type === 'container' && 'flex',
        boxSizing: 'border-box',
        width: ({ options: { type } }) => type === 'container' && '100%',
        height: ({ options: { height } }) => height,
        flexGrow: ({ options: { xsWidth } }) => getFlexGrow(xsWidth),
        maxWidth: ({ options: { xsWidth } }) => getWidth(xsWidth),
        flexBasis: ({ options: { xsWidth } }) => getFlexBasis(xsWidth),
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        [`@media ${mediaMinWidth(600)}`]: {
          flexGrow: ({ options: { smWidth } }) => getFlexGrow(smWidth),
          maxWidth: ({ options: { smWidth } }) => getWidth(smWidth),
          flexBasis: ({ options: { smWidth } }) => getFlexBasis(smWidth),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          flexGrow: ({ options: { mdWidth } }) => getFlexGrow(mdWidth),
          maxWidth: ({ options: { mdWidth } }) => getWidth(mdWidth),
          flexBasis: ({ options: { mdWidth } }) => getFlexBasis(mdWidth),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          flexGrow: ({ options: { lgWidth } }) => getFlexGrow(lgWidth),
          maxWidth: ({ options: { lgWidth } }) => getWidth(lgWidth),
          flexBasis: ({ options: { lgWidth } }) => getFlexBasis(lgWidth),
        },
        [`@media ${mediaMinWidth(1920)}`]: {
          flexGrow: ({ options: { xlWidth } }) => getFlexGrow(xlWidth),
          maxWidth: ({ options: { xlWidth } }) => getWidth(xlWidth),
          flexBasis: ({ options: { xlWidth } }) => getFlexBasis(xlWidth),
        },
        '& > div': {
          maxWidth: 'none',
          flexBasis: 'auto',
        },
      },
      root: {
        height: ({ options: { height } }) => height,
        minHeight: ({ children, options: { height } }) =>
          children.length === 0 && isDev ? '2.5rem' : height,
        backgroundColor: ({ options: { backgroundColor } }) =>
          style.getColor(backgroundColor),
        '& > div[data-type="grid-item"]': {
          padding: ({ options: { spacing } }) =>
            isDev && `${parseInt(spacing, 10) * 4}px`,
        },
      },
      opac: {
        opacity: 0.3,
      },
      empty: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '2.5rem',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: ({ options: { backgroundColor } }) =>
          backgroundColor === 'Transparent'
            ? '#F0F1F5'
            : style.getColor(backgroundColor),
        '& > div': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '& > div::after': {
          content: '"Grid"',
        },
      },
    };
  },
}))();
