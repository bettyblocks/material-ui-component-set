import { style, themeColor, staticColor } from '@betty-blocks/component-sdk';

export const basis = {
  backgroundColor: themeColor('primary'),
  borderColor: themeColor('primary'),
  borderRadius: ['0.25rem'],
  borderStyle: 'none',
  borderWidth: ['0rem'],
  boxShadow:
    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  color: themeColor('white'),
  fontFamily: 'Roboto',
  fontSize: '0.875rem',
  fontStyle: 'normal',
  fontWeight: '500',
  letterSpacing: 'normal',
  lineHeight: '1',
  padding: ['1.5rem', '1rem', '0.6875rem', '1rem'],
  textDecoration: 'none',
  textTransform: 'uppercase',
};

export const states = {
  disabled: {
    backgroundColor: themeColor('secondary'),
    color: staticColor('#ff00ff'),
  },
};

export default style('Button', {
  name: 'outline',
  basis,
  states,
});
