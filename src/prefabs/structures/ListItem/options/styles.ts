import { color, ThemeColor, option, font } from '@betty-blocks/component-sdk';

export const styles = {
  font: font('Title text style', { value: 'Body1' }),
  titleColor: color('Title color', {
    value: ThemeColor.BLACK,
  }),
  titleWeight: option('CUSTOM', {
    label: 'Title Font weight',
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
    },
  }),
  subtitleFont: font('Subtitle text style', { value: 'Body1' }),
  subtitleColor: color('Subtitle color', {
    value: ThemeColor.SECONDARY,
  }),
  subtitleWeight: option('CUSTOM', {
    label: 'Subtitle Font weight',
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
    },
  }),
};
