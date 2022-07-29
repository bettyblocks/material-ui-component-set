import {
  toggle,
  color,
  ThemeColor,
  option,
  showIfTrue,
} from '@betty-blocks/component-sdk';

export const styles = {
  styles: toggle('Styles', { value: true }),
  textColor: color('Text color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: {
        type: 'SHOW',
        option: 'styles',
        comparator: 'EQ',
        value: true,
      },
    },
  }),
  fontWeight: option('CUSTOM', {
    value: '800',
    label: 'Font weight',
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
