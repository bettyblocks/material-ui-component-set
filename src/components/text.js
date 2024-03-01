(() => ({
  name: 'Text',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      content,
      linkType,
      linkTo,
      linkToExternal,
      linkTarget,
      useInnerHtml,
      dataComponentAttribute,
    } = options;
    const { Link } = window.MaterialUI.Core;
    const { env, useText, Link: BLink } = B;
    const isEmpty = content.length === 0;
    const isDev = env === 'dev';
    const isPristine = isEmpty && isDev;

    const Tag = useInnerHtml
      ? 'div'
      : {
          Title1: 'h1',
          Title2: 'h2',
          Title3: 'h3',
          Title4: 'h4',
          Title5: 'h5',
          Title6: 'h6',
          Body1: 'p',
          Body2: 'p',
        }[options.type || 'Body1'];

    const parsedContent = useText(content);
    const hasLink = linkType === 'internal' && linkTo && linkTo.id !== '';
    const hasExternalLink =
      linkType === 'external' && linkToExternal && linkToExternal.id !== '';
    const linkToExternalText =
      (linkToExternal && useText(linkToExternal)) || '';
    let linkedContent = parsedContent;
    if (isDev && !isPristine) {
      linkedContent = '';
      content.forEach((value) => {
        if (typeof value === 'string' || value instanceof String) {
          linkedContent += value;
        } else {
          linkedContent += `<span class="${classes.nowrap}" >${value.name}</span>`;
        }
      });
    } else if (isDev) {
      linkedContent = `<span class=${classes.placeholder}>Empty content</span>`;
    }
    if (hasLink || hasExternalLink) {
      linkedContent = (
        <Link
          className={includeStyling(classes.link)}
          href={hasExternalLink ? linkToExternalText : undefined}
          target={linkTarget}
          rel={linkTarget === '_blank' ? 'noopener' : ''}
          component={hasLink ? BLink : undefined}
          endpoint={hasLink ? linkTo : undefined}
        >
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: linkedContent,
            }}
          />
        </Link>
      );
    }

    if (isDev && !(hasLink || hasExternalLink)) {
      linkedContent = (
        <Tag
          className={includeStyling(classes.content)}
          data-component={useText(dataComponentAttribute) || 'Text'}
          dangerouslySetInnerHTML={{ __html: linkedContent }}
        />
      );
    } else {
      linkedContent = (
        <Tag
          className={includeStyling(classes.content)}
          data-component={useText(dataComponentAttribute) || 'Text'}
        >
          {linkedContent}
        </Tag>
      );
    }

    return useInnerHtml && !isDev ? (
      <Tag
        className={includeStyling(classes.content)}
        dangerouslySetInnerHTML={{ __html: parsedContent }}
        data-component={useText(dataComponentAttribute) || 'Text'}
      />
    ) : (
      linkedContent
    );
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      content: {
        display: 'block',
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        textAlign: ({ options: { textAlignment } }) => textAlignment,
        padding: 0,
        whiteSpace: 'pre-wrap',
        color: ({ options: { textColor, type } }) => {
          return textColor === '[Inherit]'
            ? style.getFontColor(type)
            : style.getColor(textColor);
        },
        fontFamily: ({ options: { type } }) =>
          `var(--text-fontFamily-${type.toString().toLowerCase()})`,
        fontSize: ({ options: { type } }) =>
          `var(--text-fontSize-${type.toString().toLowerCase()})`,
        fontStyle: ({ options: { type } }) =>
          `var(--text-fontStyle-${type.toString().toLowerCase()})`,
        fontWeight: ({ options }) => {
          return options.fontWeight === '[Inherit]'
            ? style.getFontWeight(options.type)
            : options.fontWeight;
        },
        textTransform: ({ options: { type } }) => style.getTextTransform(type),
        letterSpacing: ({ options: { type } }) => style.getLetterSpacing(type),
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Portrait'),
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
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Landscape'),
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
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Desktop'),
        },
      },
      nowrap: {
        whiteSpace: 'nowrap',
        marginBottom: '-4px',
      },
      link: {
        textDecoration: ['none', '!important'],
        color: ['inherit', '!important'],
      },
      placeholder: {
        color: '#dadde4',
      },
    };
  },
}))();
