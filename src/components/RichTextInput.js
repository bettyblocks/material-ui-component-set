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
    const { createEditor, Editor, Text, Element, Transforms, Node } = SlateP;
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
      showCode,
      showNumberedList,
      showBulletedList,
      showLeftAlign,
      showCenterAlign,
      showRightAlign,
      showJustifyAlign,
    } = options;
    const isDev = env === 'dev';

    const [currentValue, setCurrentValue] = useState(
      useText(valueProp, { rawValue: true }),
    );
    const labelText = useText(label);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeStyleName, setActiveStyleName] = useState('Body 1');

    const isMarkActive = (editor, format) => {
      const marks = Editor.marks(editor);
      return marks ? marks[format] === true : false;
    };

    const isBlockActive = (editor, format, blockType = 'type') => {
      const { selection } = editor;
      if (!selection) return false;

      const [match] = Array.from(
        Editor.nodes(editor, {
          at: Editor.unhangRange(editor, selection),
          match: (n) =>
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            n[blockType] === format,
        }),
      );

      return !!match;
    };

    const isHeadingActive = (editor) => {
      const { selection } = editor;
      if (!selection) return false;

      const [match] = Array.from(
        Editor.nodes(editor, {
          at: Editor.unhangRange(editor, selection),
          match: (n) =>
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            [
              'heading-one',
              'heading-two',
              'heading-three',
              'heading-four',
              'heading-five',
              'heading-six',
            ].includes(n.type),
        }),
      );

      return !!match;
    };

    const LIST_TYPES = ['numbered-list', 'bulleted-list'];
    const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

    const toggleBlock = (editor, format) => {
      const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
      );
      const isList = LIST_TYPES.includes(format);

      Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          LIST_TYPES.includes(n.type) &&
          !TEXT_ALIGN_TYPES.includes(format),
        split: true,
      });
      let newProperties;
      if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
          align: isActive ? undefined : format,
        };
      } else {
        newProperties = {
          // eslint-disable-next-line no-nested-ternary
          type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        };
      }
      Transforms.setNodes(editor, newProperties);

      if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
      }
    };

    const toggleMark = (editor, format) => {
      const isActive = isMarkActive(editor, format);

      if (isActive) {
        Editor.removeMark(editor, format);
      } else {
        Editor.addMark(editor, format, true);
      }
    };

    function isEditorFocussed(editor) {
      return editor.selection !== null;
    }

    function focusEditor(editor) {
      Transforms.select(editor, {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      });
    }

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
        if (node.code) {
          string = `<code>${string}</code>`;
        }
        return string;
      }

      const children =
        node.children && node.children.map((n) => serialize(n)).join('');
      const align = node.align ? ` align="${node.align}"` : '';
      switch (node.type) {
        case 'heading-one':
          return `<h1${align}>${children}</h1>`;
        case 'heading-two':
          return `<h2${align}>${children}</h2>`;
        case 'heading-three':
          return `<h3${align}>${children}</h3>`;
        case 'heading-four':
          return `<h4${align}>${children}</h4>`;
        case 'heading-five':
          return `<h5${align}>${children}</h5>`;
        case 'heading-six':
          return `<h6${align}>${children}</h6>`;
        case 'paragraph':
          return `<p${align}>${children}</p>`;
        case 'numbered-list':
          return `<ol${align}>${children}</ol>`;
        case 'bulleted-list':
          return `<ul${align}>${children}</ul>`;
        case 'list-item':
          return `<li${align}>${children}</li>`;
        case 'code':
          return `<pre${align}><code>${children}</code></pre>`;
        default:
          return children;
      }
    };

    const ELEMENT_TAGS = {
      A: (el) => ({ type: 'link', url: el.getAttribute('href') }),
      BLOCKQUOTE: () => ({ type: 'quote' }),
      H1: (el) => ({ type: 'heading-one', align: el.getAttribute('align') }),
      H2: (el) => ({ type: 'heading-two', align: el.getAttribute('align') }),
      H3: (el) => ({ type: 'heading-three', align: el.getAttribute('align') }),
      H4: (el) => ({ type: 'heading-four', align: el.getAttribute('align') }),
      H5: (el) => ({ type: 'heading-five', align: el.getAttribute('align') }),
      H6: (el) => ({ type: 'heading-six', align: el.getAttribute('align') }),
      IMG: (el) => ({ type: 'image', url: el.getAttribute('src') }),
      LI: (el) => ({ type: 'list-item', align: el.getAttribute('align') }),
      OL: (el) => ({ type: 'numbered-list', align: el.getAttribute('align') }),
      P: (el) => ({ type: 'paragraph', align: el.getAttribute('align') }),
      PRE: (el) => ({ type: 'code', align: el.getAttribute('align') }),
      UL: (el) => ({ type: 'bulleted-list', align: el.getAttribute('align') }),
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

      if (ELEMENT_TAGS[nodeName]) {
        const attrs = ELEMENT_TAGS[nodeName](el);
        return jsx('element', attrs, children);
      }

      if (TEXT_TAGS[nodeName]) {
        const attrs = TEXT_TAGS[nodeName](el);
        return children.map((child) => jsx('text', attrs, child));
      }

      if (!Element.isElementList(children)) {
        const attrs = ELEMENT_TAGS.P(el);
        children = jsx('element', attrs, children);
      }

      if (el.nodeName === 'BODY') {
        return jsx('fragment', {}, children);
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

    const handleListdepth = (listKind, key, event) => {
      const isList = isBlockActive(editor, listKind, 'type');
      if (isList) {
        const lastNode = Node.last(editor, editor.selection.focus.path);
        if (
          key === 'shiftTab' ||
          (key === 'enter' && lastNode[0].text === '')
        ) {
          if (key === 'enter') event.preventDefault();
          Transforms.unwrapNodes(editor, {
            match: (n) =>
              !Editor.isEditor(n) &&
              Element.isElement(n) &&
              LIST_TYPES.includes(n.type),
            split: true,
          });
          const parentNode = Node.parent(
            editor,
            editor.selection.focus.path.slice(0, -1),
          );
          if (LIST_TYPES.includes(parentNode.type)) {
            Transforms.setNodes(editor, { type: 'list-item' });
          } else {
            Transforms.setNodes(editor, { type: 'paragraph' });
          }
        }
        if (key === 'tab') {
          Transforms.setNodes(editor, {
            type: 'list-item',
            children: [{ text: '' }],
          });
          Transforms.wrapNodes(editor, {
            type: listKind,
            children: [],
          });
        }
      }
    };

    const onKeyDownHandler = (event) => {
      if (event.shiftKey && event.key === 'Tab') {
        event.preventDefault();
        handleListdepth('bulleted-list', 'shiftTab');
        handleListdepth('numbered-list', 'shiftTab');
        return;
      }

      if (event.key === 'Enter') {
        if (isBlockActive(editor, 'bulleted-list', 'type')) {
          handleListdepth('bulleted-list', 'enter', event);
        } else if (isBlockActive(editor, 'numbered-list', 'type')) {
          handleListdepth('numbered-list', 'enter', event);
        } else if (isHeadingActive(editor)) {
          event.preventDefault();
          Transforms.insertNodes(editor, {
            children: [{ text: '' }],
            type: 'paragraph',
          });
        } else if (event.shiftKey) {
          event.preventDefault();
          editor.insertText('\n');
        } else if (isBlockActive(editor, 'code')) {
          event.preventDefault();
          Transforms.insertNodes(editor, {
            children: [{ text: '' }],
            type: 'paragraph',
          });
        }
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        handleListdepth('bulleted-list', 'tab');
        handleListdepth('numbered-list', 'tab');
        return;
      }

      if (IS_MAC) {
        if (!event.metaKey) {
          return;
        }
      } else if (!event.ctrlKey) {
        return;
      }

      if (event.altKey) {
        switch (event.keyCode) {
          case 49:
            event.preventDefault();
            toggleBlock(editor, 'heading-one');
            break;
          case 50:
            event.preventDefault();
            toggleBlock(editor, 'heading-two');
            break;
          case 51:
            event.preventDefault();
            toggleBlock(editor, 'heading-three');
            break;
          case 52:
            event.preventDefault();
            toggleBlock(editor, 'heading-four');
            break;
          case 53:
            event.preventDefault();
            toggleBlock(editor, 'heading-five');
            break;
          case 54:
            event.preventDefault();
            toggleBlock(editor, 'heading-six');
            break;
          case 55:
            event.preventDefault();
            toggleBlock(editor, 'paragraph');
            break;
          case 56:
            event.preventDefault();
            toggleBlock(editor, 'paragraph');
            break;
          default:
            break;
        }
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
        case 'Backspace': {
          event.preventDefault();
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

    function DefaultElement({ attributes, children, element: { align } }) {
      return (
        <p style={{ textAlign: align }} {...attributes}>
          {children}
        </p>
      );
    }

    function NumberedListElement({ attributes, children, element: { align } }) {
      return (
        <ol style={{ textAlign: align }} {...attributes}>
          {children}
        </ol>
      );
    }

    function BulletedListElement({ attributes, children, element: { align } }) {
      return (
        <ul style={{ textAlign: align }} {...attributes}>
          {children}
        </ul>
      );
    }

    function ListItemElement({ attributes, children, element: { align } }) {
      return (
        <li style={{ textAlign: align }} {...attributes}>
          {children}
        </li>
      );
    }

    function HeadingElement(
      { attributes, children, element: { align } },
      type,
    ) {
      const HeadingType = type;
      return (
        <HeadingType style={{ textAlign: align }} {...attributes}>
          {children}
        </HeadingType>
      );
    }

    const renderElement = useCallback((props) => {
      switch (props.element.type) {
        case 'code':
          return CodeElement(props);
        case 'numbered-list':
          return NumberedListElement(props);
        case 'bulleted-list':
          return BulletedListElement(props);
        case 'list-item':
          return ListItemElement(props);
        case 'heading-one':
          return HeadingElement(props, 'h1');
        case 'heading-two':
          return HeadingElement(props, 'h2');
        case 'heading-three':
          return HeadingElement(props, 'h3');
        case 'heading-four':
          return HeadingElement(props, 'h4');
        case 'heading-five':
          return HeadingElement(props, 'h5');
        case 'heading-six':
          return HeadingElement(props, 'h6');
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

    function BlockButton({ format, icon }) {
      const ownEditor = useSlate();
      return (
        <Button
          active={isBlockActive(
            ownEditor,
            format,
            TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
          )}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(ownEditor, format);
          }}
          icon={icon}
        />
      );
    }

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

    const HistoryButton = React.forwardRef(
      ({ action, icon, ...props }, ref) => {
        const IconButton = Icons[icon];
        return (
          <IconButton
            {...props}
            ref={ref}
            className={classes.toolbarButton}
            onMouseDown={(event) => {
              event.preventDefault();
              if (action === 'undo') editor.undo();
              if (action === 'redo') editor.redo();
            }}
          />
        );
      },
    );

    const CodeButton = React.forwardRef(({ ...props }, ref) => {
      const IconButton = Icons.Code;
      const ownEditor = useSlate();
      const activeMark = isMarkActive(ownEditor, 'code');
      const activeBlock = isBlockActive(ownEditor, 'code');

      return (
        <IconButton
          {...props}
          ref={ref}
          className={`${classes.toolbarButton} ${
            activeMark || activeBlock ? 'active' : ''
          }`}
          onMouseDown={(event) => {
            event.preventDefault();
            if (!isEditorFocussed(ownEditor)) {
              focusEditor(ownEditor);
            }
            if (editor.selection.focus !== null) {
              const lastNode = Node.last(
                ownEditor,
                editor.selection.focus.path,
              );
              if (activeBlock || lastNode[0].text === '') {
                toggleBlock(ownEditor, 'code');
                return;
              }
              toggleMark(ownEditor, 'code');
            }
          }}
        />
      );
    });

    function DropdownItem({ format, text, tag }) {
      const ownEditor = useSlate();
      const Tag = tag;
      if (isBlockActive(ownEditor, format, 'type')) {
        if (activeStyleName !== text) setActiveStyleName(text);
      }
      return (
        <li
          className={`${classes.dropdownItem} ${
            isBlockActive(ownEditor, format, 'type') ? 'active' : ''
          }`}
          onClick={() => {
            toggleBlock(ownEditor, format);
            setShowDropdown(false);
          }}
          aria-hidden="true"
        >
          <div>
            <Tag className={classes.dropdownItemTag}>{text}</Tag>
          </div>
        </li>
      );
    }

    function Dropdown() {
      return (
        <ul className={`${classes.dropdown} ${showDropdown ? 'show' : ''}`}>
          <DropdownItem format="paragraph" text="Body 1" tag="p" />
          <DropdownItem format="heading-one" text="Title 1" tag="h1" />
          <DropdownItem format="heading-two" text="Title 2" tag="h2" />
          <DropdownItem format="heading-three" text="Title 3" tag="h3" />
          <DropdownItem format="heading-four" text="Title 4" tag="h4" />
          <DropdownItem format="heading-five" text="Title 5" tag="h5" />
          <DropdownItem format="heading-six" text="Title 6" tag="h6" />
        </ul>
      );
    }

    function TextStyleSelector() {
      const styleSelectorRef = useRef();
      useEffect(() => {
        const handler = (event) => {
          if (
            showDropdown &&
            styleSelectorRef.current &&
            !styleSelectorRef.current.contains(event.target)
          ) {
            setShowDropdown(false);
          }
        };
        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);
        return () => {
          // Cleanup the event listener
          document.removeEventListener('mousedown', handler);
          document.removeEventListener('touchstart', handler);
        };
      }, [showDropdown]);
      const ArrowDown = Icons.KeyboardArrowDown;
      return (
        <div className={classes.toolbarDropdown} ref={styleSelectorRef}>
          <button
            type="button"
            aria-haspopup="true"
            aria-label="Text styles"
            onClick={() => setShowDropdown((prev) => !prev)}
            className={classes.dropdownButton}
          >
            <span className={classes.dropdownButtonText}>
              {activeStyleName}
            </span>
            {/* <span> */}
            <ArrowDown className={classes.dropdownButtonIcon} />
            {/* </span> */}
          </button>
          <Dropdown />
        </div>
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
              <div className={classes.toolbarGroup}>
                <TextStyleSelector />
                <div className={classes.toolbarSubGroup}>
                  {showBold && <MarkButton format="bold" icon="FormatBold" />}
                  {showItalic && (
                    <MarkButton format="italic" icon="FormatItalic" />
                  )}
                  {showUnderlined && (
                    <MarkButton format="underline" icon="FormatUnderlined" />
                  )}
                  {showStrikethrough && (
                    <MarkButton format="strikethrough" icon="StrikethroughS" />
                  )}
                  {showCode && <CodeButton />}
                </div>
                <div className={classes.toolbarSubGroup}>
                  {showNumberedList && (
                    <BlockButton
                      format="numbered-list"
                      icon="FormatListNumbered"
                    />
                  )}
                  {showBulletedList && (
                    <BlockButton
                      format="bulleted-list"
                      icon="FormatListBulleted"
                    />
                  )}
                </div>
                <div className={classes.toolbarSubGroup}>
                  {showLeftAlign && (
                    <BlockButton format="left" icon="FormatAlignLeft" />
                  )}
                  {showCenterAlign && (
                    <BlockButton format="center" icon="FormatAlignCenter" />
                  )}
                  {showRightAlign && (
                    <BlockButton format="right" icon="FormatAlignRight" />
                  )}
                  {showJustifyAlign && (
                    <BlockButton format="justify" icon="FormatAlignJustify" />
                  )}
                </div>
              </div>
              <div className={classes.toolbarGroup}>
                <HistoryButton action="undo" icon="Undo" />
                <HistoryButton action="redo" icon="Redo" />
              </div>
            </div>
            <Editable
              className={classes.editor}
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              placeholder={
                <span className={classes.placeholderText}>{placeholder}</span>
              }
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
        height: ({ options: { height } }) => height,
        overflow: 'overlay',
        '& pre': {
          backgroundColor: '#eee',
          padding: '10px',
          '& code': {
            padding: '0',
          },
        },
        '& code': {
          backgroundColor: '#eee',
          padding: '3px',
        },
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
        padding: '16px 8px 0px 8px',
        display: 'flex',
        justifyContent: 'space-between',
      },
      toolbarGroup: {
        display: 'flex',
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
      toolbarDropdown: {
        position: 'relative',
      },
      dropdown: {
        position: 'absolute',
        left: 'auto',
        zIndex: 9999,
        minWidth: '8rem',
        padding: '0.5rem 0',
        listStyle: 'none',
        backgroundColor: '#fff',
        borderRadius: '0.5rem',
        display: 'none',
        boxShadow:
          'rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 31%) 0px 0px 1px',
        '&.show': {
          display: 'block',
        },
      },
      dropdownButton: {
        display: 'inline-flex',
        maxWitdh: '100%',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        padding: '4px',
        border: '0',
        borderRadius: '5px',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: '#f4f5f7',
        },
      },
      dropdownButtonText: {
        minWidth: '50px',
      },
      dropdownButtonIcon: {
        fontSize: '1rem !important',
      },
      dropdownItem: {
        padding: '8px 16px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f4f5f7',
        },
        '&.active': {
          backgroundColor: '#6c798f',
          color: '#ffffff',
        },
      },
      dropdownItemTag: {
        margin: '0px',
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
          boxShadow: ({ options: { borderFocusColor } }) => [
            `0 0 0 1px ${style.getColor(borderFocusColor)}`,
          ],
        },
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
        ],
      },
      placeholderText: {
        color: ({ options: { placeholderColor } }) => [
          style.getColor(placeholderColor),
        ],
      },
    };
  },
}))();
