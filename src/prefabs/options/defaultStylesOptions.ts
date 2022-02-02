import { showIfTrue, color, toggle } from '@betty-blocks/component-sdk';

const stylesAttrs = {
  configuration: { condition: showIfTrue('styles') },
};

export const defaultStylesOptions = {
  styles: toggle('Styles'),
  backgroundColor: color('Background color', {
    value: 'White',
    ...stylesAttrs,
  }),
  borderColor: color('Border color', {
    value: 'Accent1',
    ...stylesAttrs,
  }),
  borderHoverColor: color('Border color (hover)', {
    value: 'Black',
    ...stylesAttrs,
  }),
  borderFocusColor: color('Border color (focus)', {
    value: 'Primary',
    ...stylesAttrs,
  }),
  hideLabel: toggle('Hide label', stylesAttrs),
  labelColor: color('Label color', {
    value: 'Accent3',
    ...stylesAttrs,
  }),
  textColor: color('Text color', {
    value: 'Black',
    ...stylesAttrs,
  }),
  placeholderColor: color('Placeholder color', {
    value: 'Light',
    ...stylesAttrs,
  }),
  helperColor: color('Helper color', {
    value: 'Accent2',
    ...stylesAttrs,
  }),
  errorColor: color('Error color', {
    value: 'Danger',
    ...stylesAttrs,
  }),
};
