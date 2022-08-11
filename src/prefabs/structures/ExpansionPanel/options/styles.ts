import {
  font,
  color,
  ThemeColor,
  dropdown,
  sizes,
} from '@betty-blocks/component-sdk';

export const styles = {
  titleType: font('Title type', {
    value: 'Body1',
  }),
  titleTextColor: color('Title text color', {
    value: ThemeColor.BLACK,
  }),
  titleFontWeight: dropdown(
    'Title font weight',
    [
      ['100', '100'],
      ['200', '200'],
      ['300', '300'],
      ['400', '400'],
      ['500', '500'],
      ['600', '600'],
      ['700', '700'],
      ['800', '800'],
      ['900', '900'],
    ],
    {
      value: '400',
    },
  ),
  titleSpacing: sizes('Title outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
};
