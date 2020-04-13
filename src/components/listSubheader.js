(() => ({
  name: 'ListSubheader',
  type: 'LIST_SUBHEADER',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { ListSubheader } = window.MaterialUI.Core;
    const { text, inset } = options;
    const isDev = B.env === 'dev';

    const ListSubheaderComponent = (
      <ListSubheader inset={inset}>{text}</ListSubheader>
    );
    return isDev ? <div>{ListSubheaderComponent}</div> : ListSubheaderComponent;
  })(),
  styles: () => () => ({}),
}))();
