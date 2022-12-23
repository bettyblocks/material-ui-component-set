import {
  buttongroup,
  color,
  showIfTrue,
  size,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';

export const styles = (supportImages?: boolean) => ({
  margin: buttongroup(
    'Margin',
    [
      ['None', 'none'],
      ['Dense', 'dense'],
      ['Normal', 'normal'],
    ],
    { value: 'normal' },
  ),
  fullWidth: toggle('Full width', { value: true }),
  ...(supportImages
    ? {
        showImagePreview: toggle('Show Image preview', { value: true }),
        imagePreviewWidth: size('Image preview width', {
          value: '200px',
          configuration: {
            as: 'UNIT',
            condition: showIfTrue('showImagePreview'),
          },
        }),
        imagePreviewHeight: size('Image preview height', {
          value: '112px',
          configuration: {
            as: 'UNIT',
            condition: showIfTrue('showImagePreview'),
          },
        }),
      }
    : {}),

  hideLabel: toggle('Hide label', {
    value: false,
  }),
  labelColor: color('Label color', {
    value: ThemeColor.BLACK,
  }),
  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
  }),
  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
  }),
});
