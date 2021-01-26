(() => ({
  name: 'ListSubheader',
  type: 'LIST_SUBHEADER',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { ListSubheader } = window.MaterialUI.Core;
    const { text, inset } = options;
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

    return (
      <ListSubheader className={classes.root} inset={inset}>
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
