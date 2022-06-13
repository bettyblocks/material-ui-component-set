import { Icon, option, prefab } from '@betty-blocks/component-sdk';
import { Row } from './structures/Row';
import { Column } from './structures/Column';
import { Paper } from './structures/Paper';
import { options } from './structures/Row/options/index';

const attr = {
  icon: Icon.PaperIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '1'],
};
options.maxRowWidth = option('CUSTOM', {
  label: 'Width',
  value: 'Full',
  configuration: {
    as: 'BUTTONGROUP',
    dataType: 'string',
    allowedInput: [
      { name: 'S', value: 'S' },
      { name: 'M', value: 'M' },
      { name: 'L', value: 'L' },
      { name: 'XL', value: 'XL' },
      { name: 'Full', value: 'Full' },
    ],
  },
});

export default prefab('Paper', attr, undefined, [
  Paper({}, [Row({ options }, [Column({}, [])])]),
]);
