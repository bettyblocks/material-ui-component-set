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

textOptions.content = variable('Content', {
  value: ['Powered by Betty Blocks'],
  configuration: { as: 'MULTILINE' },
});
textOptions.type = font('Text style', { value: ['Body1'] });
textOptions.textAlignment = option('CUSTOM', {
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
});
textOptions.textColor = color('Text color', {
  value: ThemeColor.MEDIUM,
});

boxOptions.innerSpacing = sizes('Inner space', {
  value: ['L', 'L', 'L', 'L'],
});

export default prefab('Footer', attrs, undefined, [
  Box({ options: boxOptions }, [Text({ options: textOptions })]),
]);
