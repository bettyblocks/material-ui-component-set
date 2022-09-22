(() => ({
  name: 'RichTextInput',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      Slate: SlateP,
      SlateReact,
      SlateHistory,
      SlateHyperscript,
      Icons,
    } = window.MaterialUI;
    const { FormHelperText } = window.MaterialUI.Core;
    const { Editable, withReact, Slate, useSlate } = SlateReact;
    const { createEditor, Editor, Text } = SlateP;
    const { jsx } = SlateHyperscript;
    const { withHistory } = SlateHistory;
    const { useText, env } = B;
    const {
      actionVariableId: name,
      value: valueProp,
      placeholder,
      disabled,
      helperText,
      label,
      hideLabel,
      showBold,
      showItalic,
      showUnderlined,
      showStrikethrough,
    } = options;
    const isDev = env === 'dev';

    const [currentValue, setCurrentValue] = useState(useText(valueProp));
    const labelText = useText(label);

    const isMarkActive = (editor, format) => {
      const marks = Editor.marks(editor);
      return marks ? marks[format] === true : false;
    };

    const toggleMark = (editor, format) => {
      const isActive = isMarkActive(editor, format);

      if (isActive) {
        Editor.removeMark(editor, format);
      } else {
        Editor.addMark(editor, format, true);
      }
    };

    const serialize = (node) => {
      if (Text.isText(node)) {
        let string = node.text;
        if (node.bold) {
          string = `<b>${string}</b>`;
        }
        if (node.italic) {
          string = `<i>${string}</i>`;
        }
        if (node.underline) {
          string = `<u>${string}</u>`;
        }
        if (node.strikethrough) {
          string = `<s>${string}</s>`;
        }
        return string;
      }

      const children =
        node.children && node.children.map((n) => serialize(n)).join('');

      switch (node.type) {
        case 'paragraph':
          return `<p>${children}</p>`;
        default:
          return children;
      }
    };

    const ELEMENT_TAGS = {
      A: (el) => ({ type: 'link', url: el.getAttribute('href') }),
      BLOCKQUOTE: () => ({ type: 'quote' }),
      H1: () => ({ type: 'heading-one' }),
      H2: () => ({ type: 'heading-two' }),
      H3: () => ({ type: 'heading-three' }),
      H4: () => ({ type: 'heading-four' }),
      H5: () => ({ type: 'heading-five' }),
      H6: () => ({ type: 'heading-six' }),
      IMG: (el) => ({ type: 'image', url: el.getAttribute('src') }),
      LI: () => ({ type: 'list-item' }),
      OL: () => ({ type: 'numbered-list' }),
      P: () => ({ type: 'paragraph' }),
      PRE: () => ({ type: 'code' }),
      UL: () => ({ type: 'bulleted-list' }),
    };

    // COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
    const TEXT_TAGS = {
      CODE: () => ({ code: true }),
      DEL: () => ({ strikethrough: true }),
      EM: () => ({ italic: true }),
      I: () => ({ italic: true }),
      S: () => ({ strikethrough: true }),
      STRONG: () => ({ bold: true }),
      B: () => ({ bold: true }),
      U: () => ({ underline: true }),
    };

    const IS_MAC =
      typeof window !== 'undefined' &&
      /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

    const deserialize = (el) => {
      if (el.nodeType === 3) {
        return el.textContent;
      }
      if (el.nodeType !== 1) {
        return null;
      }
      if (el.nodeName === 'BR') {
        return '\n';
      }

      const { nodeName } = el;
      let parent = el;

      if (
        nodeName === 'PRE' &&
        el.childNodes[0] &&
        el.childNodes[0].nodeName === 'CODE'
      ) {
        // eslint-disable-next-line prefer-destructuring
        parent = el.childNodes[0];
      }
      let children = Array.from(parent.childNodes).map(deserialize).flat();

      if (children.length === 0) {
        children = [{ text: '' }];
      }

      if (el.nodeName === 'BODY') {
        return [jsx('element', { type: 'paragraph' }, children)];
      }

      if (ELEMENT_TAGS[nodeName]) {
        const attrs = ELEMENT_TAGS[nodeName](el);
        return jsx('element', attrs, children);
      }

      if (TEXT_TAGS[nodeName]) {
        const attrs = TEXT_TAGS[nodeName](el);
        return children.map((child) => jsx('text', attrs, child));
      }

      return children;
    };

    function Leaf({ attributes, children, leaf }) {
      if (leaf.bold) {
        // eslint-disable-next-line no-param-reassign
        children = <strong>{children}</strong>;
      }

      if (leaf.code) {
        // eslint-disable-next-line no-param-reassign
        children = <code>{children}</code>;
      }

      if (leaf.italic) {
        // eslint-disable-next-line no-param-reassign
        children = <em>{children}</em>;
      }

      if (leaf.underline) {
        // eslint-disable-next-line no-param-reassign
        children = <u>{children}</u>;
      }

      if (leaf.strikethrough) {
        // eslint-disable-next-line no-param-reassign
        children = <s>{children}</s>;
      }

      return <span {...attributes}>{children}</span>;
    }

    const onChangeHandler = (value) => {
      setCurrentValue(value.map((row) => serialize(row)).join(''));
      B.triggerEvent('onChange', currentValue);
    };

    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = React.useMemo(
      () => withHistory(withReact(createEditor())),
      [],
    );

    const parsed = new DOMParser().parseFromString(
      useText(valueProp),
      'text/html',
    );
    const fragment = deserialize(parsed.body);

    const onKeyDownHandler = (event) => {
      if (IS_MAC) {
        if (!event.metaKey) {
          return;
        }
      } else if (!event.ctrlKey) {
        return;
      }

      if (event.shiftKey && event.key === 's') {
        event.preventDefault();
        if (showStrikethrough) toggleMark(editor, 'strikethrough');
      }

      switch (event.key) {
        case 'b': {
          event.preventDefault();
          if (showBold) toggleMark(editor, 'bold');
          break;
        }
        case 'i': {
          event.preventDefault();
          if (showItalic) toggleMark(editor, 'italic');
          break;
        }
        case 'u': {
          event.preventDefault();
          if (showUnderlined) toggleMark(editor, 'underline');
          break;
        }
        default:
          break;
      }
    };

    function CodeElement({ attributes, children }) {
      return (
        <pre {...attributes}>
          <code>{children}</code>
        </pre>
      );
    }

    function DefaultElement({ attributes, children }) {
      return <p {...attributes}>{children}</p>;
    }

    const renderElement = useCallback((props) => {
      switch (props.element.type) {
        case 'code':
          return CodeElement(props);
        case 'paragraph':
        default:
          return DefaultElement(props);
      }
    });

    const Button = React.forwardRef(({ active, icon, ...props }, ref) => {
      const IconButton = Icons[icon];
      return (
        <IconButton
          {...props}
          ref={ref}
          className={`${classes.toolbarButton} ${active ? 'active' : ''}`}
        />
      );
    });

    function MarkButton({ format, icon }) {
      const ownEditor = useSlate();
      return (
        <Button
          active={isMarkActive(ownEditor, format)}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(ownEditor, format);
          }}
          icon={icon}
        />
      );
    }

    return (
      <div className={classes.root}>
        {labelText && !hideLabel && (
          <FormHelperText className={classes.label}>{labelText}</FormHelperText>
        )}
        <div className={classes.editorWrapper}>
          <Slate
            editor={editor}
            value={fragment}
            onChange={(value) => {
              onChangeHandler(value);
            }}
          >
            <div className={classes.toolbar}>
              {showBold && <MarkButton format="bold" icon="FormatBold" />}
              {showItalic && <MarkButton format="italic" icon="FormatItalic" />}
              {showUnderlined && (
                <MarkButton format="underline" icon="FormatUnderlined" />
              )}
              {showStrikethrough && (
                <MarkButton format="strikethrough" icon="StrikethroughS" />
              )}
            </div>
            <Editable
              className={classes.editor}
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              placeholder={placeholder}
              readOnly={isDev || disabled}
              onKeyDown={(event) => {
                onKeyDownHandler(event);
              }}
            />
          </Slate>
          <input type="hidden" name={name} value={currentValue} />
        </div>
        {helperText && (
          <FormHelperText classes={{ root: classes.helper }}>
            {helperText}
          </FormHelperText>
        )}
      </div>
    );
  })(),
  styles: (B) => (t) => {
    const { Styling, env, mediaMinWidth } = B;
    const isDev = env === 'dev';
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      root: {
        paddingTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        paddingRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        paddingBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        paddingLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        [`@media ${mediaMinWidth(600)}`]: {
          paddingTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          paddingRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          paddingBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          paddingLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          paddingTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          paddingRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          paddingBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          paddingLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          paddingTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          paddingRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          paddingBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          paddingLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
        width: ({ options: { width } }) => width,
        height: ({ options: { height } }) => height,
      },
      label: {
        color: ({ options: { labelColor } }) => [
          style.getColor(labelColor),
          '!important',
        ],
        whiteSpace: 'nowrap',
        margin: '0 14px !important',
      },
      editor: {
        padding: '0.5px 14px',
        color: isDev && 'rgb(0, 0, 0)',
      },
      helper: {
        color: ({ options: { helperColor } }) => [
          style.getColor(helperColor),
          '!important',
        ],
        '&.Mui-error': {
          color: ({ options: { errorColor } }) => [
            style.getColor(errorColor),
            '!important',
          ],
        },
        margin: '0 14px !important',
      },
      toolbar: {
        padding: '16px 16px 0px 8px',
      },
      toolbarButton: {
        color: ({ options: { buttonColor } }) => [style.getColor(buttonColor)],
        padding: '0px 8px',
        cursor: 'pointer',
        '&:hover': {
          color: ({ options: { buttonHoverColor } }) => [
            style.getColor(buttonHoverColor),
          ],
        },
        '&.active': {
          color: ({ options: { buttonActiveColor } }) => [
            style.getColor(buttonActiveColor),
          ],
        },
      },
      editorWrapper: {
        border: '1px solid',
        borderRadius: '4px',
        borderColor: ({ options: { borderColor } }) => [
          style.getColor(borderColor),
        ],
        pointerEvents: isDev && 'none',
        '&:hover': {
          borderColor: ({ options: { borderHoverColor } }) => [
            style.getColor(borderHoverColor),
          ],
        },
        '&:focus-within': {
          borderColor: ({ options: { borderFocusColor } }) => [
            style.getColor(borderFocusColor),
          ],
        },
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
        ],
      },
    };
  },
}))();
