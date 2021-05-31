(() => ({
  name: 'BottomNavigationAction',
  type: 'NAV_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { BottomNavigationAction } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const {
      label,
      icon,
      linkType,
      linkTo,
      linkToExternal,
      openLinkToExternal,
      customStyle,
    } = options;
    const { env, Link: BLink, useText } = B;
    const isDev = env === 'dev';
    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink = linkToExternal && linkToExternal.id !== '';
    const linkToExternalVariable =
      (linkToExternal && useText(linkToExternal)) || '';
    const {
      maxChild,
      value,
      navData,
      setNavData,
      setSelectedNav,
      index,
    } = parent;

    const doSetNav = () => {
      setSelectedNav(index);
    };

    B.defineFunction('SelectNav', doSetNav);

    const labelChanged = () => {
      const currentLabel = navData[`label${index}`]
        ? useText(navData[`label${index}`])
        : '';
      return currentLabel !== useText(label);
    };

    const iconChanged = () => navData[`icon${index}`] !== icon;

    const hasChange = () => labelChanged() || iconChanged();

    useEffect(() => {
      if (setNavData && hasChange()) {
        setNavData({
          ...navData,
          [`label${index}`]: label,
          [`icon${index}`]: icon,
        });
      }
    }, [index, setNavData, label, icon]);

    const generalProps = {
      tabindex: isDev && -1,
      target:
        linkType === 'external' && hasExternalLink
          ? openLinkToExternal
          : undefined,
      href:
        linkType === 'external' && hasExternalLink
          ? linkToExternalVariable
          : undefined,
      component: linkType === 'internal' && hasLink ? BLink : undefined,
      endpoint: linkType === 'internal' && hasLink ? linkTo : undefined,
    };

    function styling() {
      let wrapper = '';
      let buttonLabel = '';
      let root = '';
      if (value === index && !customStyle) {
        wrapper = classes.activeNavigation;
      } else {
        wrapper = classes.inactiveColor;
      }
      if (customStyle) {
        wrapper = classes.customStyle;
        buttonLabel = classes.labelColor;
        root = classes.navControl;
      }

      return {
        root,
        wrapper,
        label: buttonLabel,
      };
    }

    const BasicButtonComponent = (
      <BottomNavigationAction
        {...generalProps}
        showLabel={maxChild || value === index}
        icon={icon !== 'None' && React.createElement(Icons[icon])}
        label={label}
        classes={styling()}
        value={value}
      />
    );

    return isDev ? (
      <div className={classes.wrapper}>{BasicButtonComponent}</div>
    ) : (
      BasicButtonComponent
    );
  })(),
  styles: B => t => {
    const { Styling } = B;
    const style = new Styling(t);
    const convertSizes = sizes =>
      sizes.map(size => style.getSpacing(size)).join(' ');
    return {
      wrapper: {
        '& > *': {
          pointerEvents: 'none',
        },
        padding: ({ options: { innerSpacing } }) => convertSizes(innerSpacing),
      },
      root: {
        padding: ({ options: { innerSpacing } }) => convertSizes(innerSpacing),
      },
      navControl: {
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
      },
      customStyle: {
        '& .MuiSvgIcon-root': {
          color: ({ options: { iconColor } }) => [
            style.getColor(iconColor),
            '!important',
          ],
        },
      },
      labelColor: {
        color: ({ options: { labelColor } }) => [
          style.getColor(labelColor),
          '!important',
        ],
      },
      activeNavigation: {
        color: ({ parent: { activeColor } }) => style.getColor(activeColor),
      },
      inactiveNavigation: {
        color: ({ parent: { inactiveColor } }) => style.getColor(inactiveColor),
      },
    };
  },
}))();
