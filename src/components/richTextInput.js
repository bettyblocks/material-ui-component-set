(() => ({
  name: 'RichTextInput',
  type: 'FORM_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  dependencies: [
    {
      label: 'Slate',
      package: 'npm:slate@0.86.0',
      imports: ['*'],
    },
    {
      label: 'SlateHistory',
      package: 'npm:slate-history@0.66.0',
      imports: ['*'],
    },
    {
      label: 'SlateReact',
      package: 'npm:slate-react@0.86.0',
      imports: ['*'],
    },
    {
      label: 'SlateHyperscript',
      package: 'npm:slate-hyperscript@0.77.0',
      imports: ['*'],
    },
    // {
    //   label: 'MuiExtraIcons',
    //   package: 'npm:@material-ui/icons@4.11.2',
    //   imports: ['*'],
    // },
  ],
  jsx: (() => {
    const {
      Slate: { createEditor, Editor, Text, Element, Transforms, Node },
      SlateReact: { Editable, withReact, Slate, useSlate },
      SlateHistory: { withHistory },
      SlateHyperscript: { jsx },
      // MuiExtraIcons: {
      //   FormatBold,
      //   FormatAlignCenter,
      //   FormatAlignJustify,
      //   FormatAlignLeft,
      //   FormatAlignRight,
      //   FormatItalic,
      //   FormatListBulleted,
      //   FormatListNumbered,
      //   FormatQuote,
      //   FormatUnderlined,
      //   StrikethroughS,
      //   FirstPage,
      // },
    } = dependencies;
    const { Icons: allIcons } = window.MaterialUI;
    // const extraIcons = {
    //   FormatBold,
    //   FormatAlignCenter,
    //   FormatAlignJustify,
    //   FormatAlignLeft,
    //   FormatAlignRight,
    //   FormatItalic,
    //   FormatListBulleted,
    //   FormatListNumbered,
    //   FormatQuote,
    //   FormatUnderlined,
    //   StrikethroughS,
    //   FirstPage,
    // };
    // const allIcons = { ...Icons, ...extraIcons };
    const { FormHelperText, SvgIcon } = window.MaterialUI.Core;
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
      showCodeInline,
      showCodeBlock,
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
    const customIcons = {
      FormatBold:
        'M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z',
      FormatAlignCenter:
        'M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z',
      FormatAlignJustify:
        'M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z',
      FormatAlignLeft:
        'M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z',
      FormatAlignRight:
        'M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z',
      FormatItalic: 'M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z',
      FormatListBulleted:
        'M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z',
      FormatListNumbered:
        'M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z',
      FormatQuote: 'M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z',
      FormatUnderlined:
        'M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z',
      StrikethroughS:
        'M6.85 7.08C6.85 4.37 9.45 3 12.24 3c1.64 0 3 .49 3.9 1.28.77.65 1.46 1.73 1.46 3.24h-3.01c0-.31-.05-.59-.15-.85-.29-.86-1.2-1.28-2.25-1.28-1.86 0-2.34 1.02-2.34 1.7 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.21-.34-.54-.89-.54-1.92zM21 12v-2H3v2h9.62c1.15.45 1.96.75 1.96 1.97 0 1-.81 1.67-2.28 1.67-1.54 0-2.93-.54-2.93-2.51H6.4c0 .55.08 1.13.24 1.58.81 2.29 3.29 3.3 5.67 3.3 2.27 0 5.3-.89 5.3-4.05 0-.3-.01-1.16-.48-1.94H21V12z',
      FirstPage: 'M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z',
    };

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

    if (isDev) {
      useEffect(() => {
        Transforms.delete(editor, {
          at: {
            anchor: Editor.start(editor, []),
            focus: Editor.end(editor, []),
          },
        });
        Transforms.insertNodes(editor, deserialize(parsed.body));
        Transforms.delete(editor, {
          at: Editor.start(editor, [0]),
        });
      }, [valueProp]);
    }

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
        if (
          key === 'tab' &&
          lastNode[1].length > 2 &&
          lastNode[1][lastNode[1].length - 2] !== 0
        ) {
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

      if (
        event.key === 'Backspace' &&
        (isBlockActive(editor, 'numbered-list', 'type') ||
          isBlockActive(editor, 'bulleted-list', 'type'))
      ) {
        if (editor.selection.focus.offset === 0) {
          Transforms.setNodes(editor, { type: 'none' });
          if (
            editor.children[editor.selection.anchor.path[0]].children[0]
              .type === 'none'
          ) {
            if (isBlockActive(editor, 'numbered-list', 'type')) {
              toggleBlock(editor, 'numbered-list');
              return;
            }
            toggleBlock(editor, 'bullet-list');
          }
        }
      }

      if (event.key === 'Enter') {
        if (isBlockActive(editor, 'bulleted-list', 'type') && !event.shiftKey) {
          handleListdepth('bulleted-list', 'enter', event);
        } else if (
          isBlockActive(editor, 'numbered-list', 'type') &&
          !event.shiftKey
        ) {
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

      if (event.shiftKey) {
        if (event.key === 's') {
          event.preventDefault();
          if (showStrikethrough) toggleMark(editor, 'strikethrough');
        } else if (event.key === 'c') {
          event.preventDefault();
          if (showCodeInline) toggleMark(editor, 'code');
        }
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

    const Button = React.forwardRef(
      ({ active, disable, icon, ...props }, ref) => {
        const IconButton = allIcons[icon];
        if (IconButton) {
          return (
            <IconButton
              {...props}
              ref={ref}
              className={`${classes.toolbarButton} ${
                disable ? 'disabled' : ''
              } ${active ? 'active' : ''}`}
            />
          );
        }
        return (
          <SvgIcon
            {...props}
            ref={ref}
            className={`${classes.toolbarButton} ${disable ? 'disabled' : ''} ${
              active ? 'active' : ''
            }`}
          >
            <path d={customIcons[icon]} />
          </SvgIcon>
        );
      },
    );

    function BlockButton({ format, icon, disable }) {
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
            if (disable) return;
            toggleBlock(ownEditor, format);
          }}
          icon={icon}
          disable={disable}
        />
      );
    }

    function MarkButton({ format, icon, disable }) {
      const ownEditor = useSlate();
      return (
        <Button
          disable={disable}
          active={isMarkActive(ownEditor, format)}
          onMouseDown={(event) => {
            event.preventDefault();
            if (disable) return;
            toggleMark(ownEditor, format);
          }}
          icon={icon}
        />
      );
    }

    const HistoryButton = React.forwardRef(
      ({ action, icon, ...props }, ref) => {
        const IconButton = allIcons[icon];
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

    const [amountOfHeadersInSelection, setAmountOfHeadersInSelection] =
      useState(1);
    let selectionTimeout;

    document.onselectionchange = () => {
      const whitelistedTypes = [
        'heading-one',
        'heading-two',
        'heading-three',
        'heading-four',
        'heading-five',
        'heading-six',
        'paragraph',
      ];
      if (document.getSelection()) {
        clearTimeout(selectionTimeout);
        selectionTimeout = setTimeout(() => {
          if (!document.getSelection().isCollapsed) {
            if (editor.selection !== null && editor.selection.anchor !== null) {
              const anchor = editor.selection.anchor.path[0];
              const focus = editor.selection.focus.path[0];
              if (whitelistedTypes.includes(editor.children[anchor].type)) {
                setAmountOfHeadersInSelection(Math.abs(anchor - focus) + 1);
              }
            }
          } else {
            setAmountOfHeadersInSelection(0);
            setAmountOfHeadersInSelection(1);
          }
        }, 500);
      }
    };

    function DropdownItem({ format, text, tag }) {
      const Tag = tag;
      if (
        amountOfHeadersInSelection === 1 &&
        isBlockActive(editor, format, 'type')
      ) {
        if (activeStyleName !== text) {
          setActiveStyleName(text);
        }
      } else if (
        isBlockActive(editor, format, 'type') &&
        activeStyleName !== '\u00A0'
      ) {
        setActiveStyleName('\u00A0');
      }
      return (
        <li
          className={`${classes.dropdownItem} ${
            isBlockActive(editor, format, 'type') &&
            amountOfHeadersInSelection === 1
              ? 'active'
              : ''
          }`}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, format);
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
      const ArrowDown = allIcons.KeyboardArrowDown;
      return (
        <div className={classes.toolbarDropdown} ref={styleSelectorRef}>
          <button
            type="button"
            aria-haspopup="true"
            aria-label="Text styles"
            onMouseDown={(event) => {
              event.preventDefault();
              setShowDropdown((prev) => !prev);
            }}
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
                </div>
                {(showCodeInline || showCodeBlock) && (
                  <div className={classes.toolbarSubGroup}>
                    {showCodeInline && <MarkButton format="code" icon="Code" />}
                    {showCodeBlock && (
                      <BlockButton format="code" icon="DeveloperMode" />
                    )}
                  </div>
                )}
                <div className={classes.toolbarSubGroup}>
                  {showNumberedList && (
                    <BlockButton
                      format="numbered-list"
                      icon="FormatListNumbered"
                      disable={isBlockActive(editor, 'bulleted-list')}
                    />
                  )}
                  {showBulletedList && (
                    <BlockButton
                      format="bulleted-list"
                      icon="FormatListBulleted"
                      disable={isBlockActive(editor, 'numbered-list')}
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
        overflow: 'auto',
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
        '&.disabled': {
          color: ({ options: { buttonDisabledColor } }) => [
            style.getColor(buttonDisabledColor),
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
        overflow: 'auto',
        height: 'min-content',
        maxHeight: ({ options: { height } }) => `calc(${height} - 44px)`,
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
