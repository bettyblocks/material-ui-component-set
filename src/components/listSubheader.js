(() => ({
  name: 'ListSubheader',
  type: 'LIST_SUBHEADER',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { ListSubheader } = window.MaterialUI.Core;
    const { text, inset, testing } = options;
    const { env, useText } = B;
    const isDev = env === 'dev';

    const content = useText(text);
    const isEmpty = content === '';

    const ItemText =
      isEmpty && isDev ? (
        <span className={classes.placeholder}>Empty content</span>
      ) : (
        <>{content}</>
      );

    function testingTag() {
      if (testing && testing.length > 0) {
        return useText(testing);
      }
      return 'listsubheader';
    }

    return (
      <ListSubheader
        className={classes.root}
        inset={inset}
        data-component={testingTag()}
      >
        {ItemText}
      </ListSubheader>
    );
  })(),
  styles: B => t => {
    const { Styling } = B;
    const style = new Styling(t);
    return {
      root: {
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
      },
      placeholder: {
        color: '#dadde4',
      },
    };
  },
}))();
