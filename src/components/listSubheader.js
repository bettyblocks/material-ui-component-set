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

    const ListSubheaderComponent = (
      <ListSubheader className={classes.root} inset={inset}>
        {ItemText}
      </ListSubheader>
    );
    return isDev ? <div>{ListSubheaderComponent}</div> : ListSubheaderComponent;
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
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
