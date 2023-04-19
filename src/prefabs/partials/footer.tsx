import {
  Icon,
  ThemeColor,
  color,
  font,
  option,
  prefab,
  sizes,
  variable,
} from '@betty-blocks/component-sdk';
import { Box, Text, textOptions, boxOptions } from '../structures';

const attrs = {
  icon: Icon.ContainerIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'footer'],
  description: 'This is the footer partial',
};

// eslint-disable-next-line import/no-default-export
export default prefab('Footer', attrs, undefined, [
  Box(
    {
      options: {
        ...boxOptions,
        innerSpacing: sizes('Inner space', {
          value: ['L', 'L', 'L', 'L'],
        }),
      },
    },
    [
      Text({
        options: {
          ...textOptions,
          content: variable('Content', {
            value: ['Powered by Betty Blocks'],
            configuration: { as: 'MULTILINE' },
          }),
          type: font('Text style', { value: ['Body1'] }),
          textAlignment: option('CUSTOM', {
            label: 'Text Alignment',
            value: 'center',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'Left', value: 'left' },
                { name: 'Center', value: 'center' },
                { name: 'Right', value: 'right' },
              ],
            },
          }),
          textColor: color('Text color', {
            value: ThemeColor.MEDIUM,
          }),
        },
      }),
    ],
  ),
]);
