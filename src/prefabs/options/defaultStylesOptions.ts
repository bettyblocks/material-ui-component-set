import { showIfTrue, color, toggle, ThemeColor } from '@betty-blocks/component-sdk';

const stylesAttrs = {
  configuration: { condition: showIfTrue('styles') },
};

export const defaultStylesOptions = {
  styles: toggle('Styles'),
  backgroundColor: color('Background color', {
    value: ThemeColor.WHITE,
    ...stylesAttrs,
  }),
  borderColor: color('Border color', {
    value: ThemeColor.ACCENT_1,
    ...stylesAttrs,
  }),
  borderHoverColor: color('Border color (hover)', {
    value: ThemeColor.BLACK,
    ...stylesAttrs,
  }),
  borderFocusColor: color('Border color (focus)', {
    value: ThemeColor.PRIMARY,
    ...stylesAttrs,
  }),
  hideLabel: toggle('Hide label', stylesAttrs),
  labelColor: color('Label color', {
    value: ThemeColor.ACCENT_3,
    ...stylesAttrs,
  }),
  textColor: color('Text color', {
    value: ThemeColor.BLACK,
    ...stylesAttrs,
  }),
  placeholderColor: color('Placeholder color', {
    value: ThemeColor.LIGHT,
    ...stylesAttrs,
  }),
  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
    ...stylesAttrs,
  }),
  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
    ...stylesAttrs,
  }),
};
