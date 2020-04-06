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
    const isDev = B.env === 'dev';
    const { title, disabled } = options;
    const ExpansionPanelComponent = (
      <ExpansionPanel disabled={disabled}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography>{title}</Typography>
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
