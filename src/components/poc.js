(() => ({
  name: 'Poc',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  styleType: 'BUTTON',
  jsx: (() => {
    const { Button, withStyles } = window.MaterialUI.Core;
    const StyledButton = withStyles({
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
      label: {
        textTransform: 'capitalize',
      },
    })(Button);

    return <StyledButton>Anton</StyledButton>;
  })(),
  styles: () => () => {},
}))();
