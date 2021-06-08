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
      hideLabel,
      icon,
      linkType,
      linkTo,
      linkToExternal,
      openLinkToExternal,
    } = options;
    const { env, Link: BLink, useText } = B;
    const isDev = env === 'dev';
    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink = linkToExternal && linkToExternal.id !== '';
    const linkToExternalVariable =
      (linkToExternal && useText(linkToExternal)) || '';
    const { value, index } = parent;

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
    if (value === index) {
      styling.wrapper = classes.activeIconColor;
      styling.label = classes.activeLabelColor;
      styling.root = [classes.activeBackgroundColor, classes.root].join(' ');
    } else {
      styling.wrapper = classes.inactiveIconColor;
      styling.label = classes.inactiveLabelColor;
      styling.root = [classes.inactiveBackgroundColor, classes.root].join(' ');
    }

    const BasicButtonComponent = (
      <BottomNavigationAction
        {...generalProps}
        showLabel
        icon={icon !== 'None' && React.createElement(Icons[icon])}
        label={!hideLabel && label}
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
    return {
      wrapper: {
        '& > *': {
          pointerEvents: 'none',
        },
        width: '100%',
        height: '100%',
      },
      root: {
        height: '100%',
        maxWidth: '100% !important',
        width: '100%',
        padding: '0px !important',
      },
      activeIconColor: {
        '& .MuiSvgIcon-root': {
          color: ({ parent: { activeIconColor } }) =>
            style.getColor(activeIconColor),
        },
      },
      inactiveIconColor: {
        '& .MuiSvgIcon-root': {
          color: ({ parent: { inactiveIconColor } }) =>
            style.getColor(inactiveIconColor),
        },
      },
      activeLabelColor: {
        color: ({ parent: { activeLabelColor } }) =>
          style.getColor(activeLabelColor),
      },
      inactiveLabelColor: {
        color: ({ parent: { inactiveLabelColor } }) =>
          style.getColor(inactiveLabelColor),
      },
      activeBackgroundColor: {
        backgroundColor: ({ parent: { activeBackgroundColor } }) => [
          style.getColor(activeBackgroundColor),
          '!important',
        ],
      },
      inactiveBackgroundColor: {
        backgroundColor: ({ parent: { inactiveBackgroundColor } }) => [
          style.getColor(inactiveBackgroundColor),
          '!important',
        ],
      },
    };
  },
}))();
