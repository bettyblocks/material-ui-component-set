/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
(() => ({
  name: 'TextEditor',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { Slate: SlateP, SlateReact, SlateHistory } = window.MaterialUI;
    const { Editable, withReact, useSlate, Slate } = SlateReact;
    const {
      Editor,
      Transforms,
      createEditor,
      Descendant,
      Element: SlateElement,
    } = SlateP;
    const { withHistory } = SlateHistory;

    const initialValue = [
      {
        type: 'paragraph',
        children: [
          { text: 'This is editable ' },
          { text: 'rich', bold: true },
          { text: ' text, ' },
          { text: 'much', italic: true },
          { text: ' better than a ' },
          { text: '<textarea>', code: true },
          { text: '!' },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: "Since it's rich text, you can do things like turn a selection of text ",
          },
          { text: 'bold', bold: true },
          {
            text: ', or add a semantically rendered block quote in the middle of the page, like this:',
          },
        ],
      },
      {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }],
      },
      {
        type: 'paragraph',
        align: 'center',
        children: [{ text: 'Try it out for yourself!' }],
      },
    ];

    function Leaf({ attributes, children, leaf }) {
      if (leaf.bold) {
        children = <strong>{children}</strong>;
      }

      if (leaf.code) {
        children = <code>{children}</code>;
      }

      if (leaf.italic) {
        children = <em>{children}</em>;
      }

      if (leaf.underline) {
        children = <u>{children}</u>;
      }

      return <span {...attributes}>{children}</span>;
    }

    // const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = React.useMemo(
      () => withHistory(withReact(createEditor())),
      [],
    );

    return (
      <div width="100%" height="100%">
        <Slate editor={editor} value={initialValue}>
          <Editable renderLeaf={renderLeaf} />
        </Slate>
      </div>
    );
  })(),
  styles: (B) => (theme) => {
    const style = new B.Styling(theme);
    return {
      root: {},
    };
  },
}))();
