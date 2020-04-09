(() => ({
  name: 'ExpansionPanel',
  category: 'LAYOUT',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      ExpansionPanel,
      ExpansionPanelSummary,
      ExpansionPanelDetails,
      Typography,
    } = window.MaterialUI.Core;
    const { ExpandMore } = window.MaterialUI.Icons;
    const { useText, env } = B;
    const isDev = env === 'dev';
    const { title, disabled } = options;
    const titleText = title.map(t => (t.name ? t.name : t)).join(' ');
    const ExpansionPanelComponent = (
      <ExpansionPanel disabled={disabled}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography>{isDev ? titleText : useText(title)}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
      </ExpansionPanel>
    );

    return isDev ? (
      <div>{ExpansionPanelComponent}</div>
    ) : (
      ExpansionPanelComponent
    );
  })(),
  styles: () => () => ({}),
}))();
