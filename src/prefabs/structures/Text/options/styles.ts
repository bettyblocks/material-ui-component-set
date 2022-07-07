import {
  toggle,
  ThemeColor,
  color,
  showIfTrue,
  option,
} from '@betty-blocks/component-sdk';

export const styles = {
  styles: toggle('Styles', { value: false }),
  textColor: color('Text color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: showIfTrue('styles'),
    },
  }),
  fontWeight: option('CUSTOM', {
    label: 'Font weight',
    value: '400',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '100', value: '100' },
        { name: '200', value: '200' },
        { name: '300', value: '300' },
        { name: '400', value: '400' },
        { name: '500', value: '500' },
        { name: '600', value: '600' },
        { name: '700', value: '700' },
        { name: '800', value: '800' },
        { name: '900', value: '900' },
      ],
      condition: showIfTrue('styles'),
    },
  }),
};
