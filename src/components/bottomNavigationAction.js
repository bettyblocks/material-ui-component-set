(() => ({
  name: 'BottomNavigationAction',
  type: 'BOT_NAV_COMPONENT',
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
    const { maxChild, value, index } = parent;

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

    const styling = {};
    if (value === index && !customStyle) {
      styling.wrapper = classes.activeNavigation;
    } else {
      styling.wrapper = classes.inactiveNavigation;
    }
    if (customStyle) {
      styling.wrapper = classes.customStyle;
      styling.buttonLabel = classes.labelColor;
      styling.root = classes.navControl;
    }

    const BasicButtonComponent = (
      <BottomNavigationAction
        {...generalProps}
        showLabel={maxChild || value === index}
        icon={icon !== 'None' && React.createElement(Icons[icon])}
        label={label}
        classes={styling}
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
