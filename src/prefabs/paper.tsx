import { Icon, option, prefab } from '@betty-blocks/component-sdk';
import { Column, Row, Paper, rowOptions } from './structures';

const attr = {
  icon: Icon.PaperIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '1'],
};

export default prefab('Paper', attr, undefined, [
  Paper({}, [
    Row(
      {
        options: {
          ...rowOptions,
          maxRowWidth: option('CUSTOM', {
            ...rowOptions.maxRowWidth('maxRowWidth'),
            value: 'Full',
          }),
        },
      },
      [Column({}, [])],
    ),
  ]),
]);
