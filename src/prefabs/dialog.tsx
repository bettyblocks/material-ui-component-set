import {
  prefab,
  Icon,
  option,
  sizes,
  variable,
  font,
} from '@betty-blocks/component-sdk';
import { Box } from './structures/Box';
import { Column } from './structures/Column';
import { Dialog } from './structures/Dialog';
import { Paper } from './structures/Paper';
import { Row } from './structures/Row';
import { Text } from './structures/Text';
import { options as rOptions } from './structures/Row/options';
import { options as cOptions } from './structures/Column/options';
import { options as bOptions } from './structures/Box/options';
import { options as tOptions } from './structures/Text/options';

const attr = {
  icon: Icon.DialogIcon,
  category: 'CONTENT',
  keywords: [
    'Content',
    'dialog',
    'popup',
    'modal',
    'pop-up',
    'popover',
    'pop-over',
  ],
};

const rowOptions = { ...rOptions };
rowOptions.maxRowWidth = option('CUSTOM', {
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

const columnOptions = { ...cOptions };
columnOptions.columnWidth = option('CUSTOM', {
  value: 'flexible',
  label: 'Column width',
  configuration: {
    as: 'DROPDOWN',
    dataType: 'string',
    allowedInput: [
      { name: 'Fit content', value: 'fitContent' },
      { name: 'Flexible', value: 'flexible' },
      { name: 'Hidden', value: 'hidden' },
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
      { name: '6', value: '6' },
      { name: '7', value: '7' },
      { name: '8', value: '8' },
      { name: '9', value: '9' },
      { name: '10', value: '10' },
      { name: '11', value: '11' },
      { name: '12', value: '12' },
    ],
  },
});
columnOptions.columnWidthTabletLandscape = option('CUSTOM', {
  value: 'flexible',
  label: 'Column width',
  configuration: {
    as: 'DROPDOWN',
    dataType: 'string',
    allowedInput: [
      { name: 'Fit content', value: 'fitContent' },
      { name: 'Flexible', value: 'flexible' },
      { name: 'Hidden', value: 'hidden' },
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
      { name: '6', value: '6' },
      { name: '7', value: '7' },
      { name: '8', value: '8' },
      { name: '9', value: '9' },
      { name: '10', value: '10' },
      { name: '11', value: '11' },
      { name: '12', value: '12' },
    ],
  },
});
columnOptions.columnWidthTabletPortrait = option('CUSTOM', {
  value: 'flexible',
  label: 'Column width',
  configuration: {
    as: 'DROPDOWN',
    dataType: 'string',
    allowedInput: [
      { name: 'Fit content', value: 'fitContent' },
      { name: 'Flexible', value: 'flexible' },
      { name: 'Hidden', value: 'hidden' },
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
      { name: '6', value: '6' },
      { name: '7', value: '7' },
      { name: '8', value: '8' },
      { name: '9', value: '9' },
      { name: '10', value: '10' },
      { name: '11', value: '11' },
      { name: '12', value: '12' },
    ],
  },
});
columnOptions.columnWidthMobile = option('CUSTOM', {
  value: 'flexible',
  label: 'Column width',
  configuration: {
    as: 'DROPDOWN',
    dataType: 'string',
    allowedInput: [
      { name: 'Fit content', value: 'fitContent' },
      { name: 'Flexible', value: 'flexible' },
      { name: 'Hidden', value: 'hidden' },
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
      { name: '6', value: '6' },
      { name: '7', value: '7' },
      { name: '8', value: '8' },
      { name: '9', value: '9' },
      { name: '10', value: '10' },
      { name: '11', value: '11' },
      { name: '12', value: '12' },
    ],
  },
});

const boxOptions = { ...bOptions };
boxOptions.alignment = option('CUSTOM', {
  value: 'space-between',
  label: 'Alignment',
  configuration: {
    as: 'BUTTONGROUP',
    dataType: 'string',
    allowedInput: [
      { name: 'None', value: 'none' },
      { name: 'Left', value: 'flex-start' },
      { name: 'Center', value: 'center' },
      { name: 'Right', value: 'flex-end' },
      { name: 'Justified', value: 'space-between' },
    ],
  },
});
boxOptions.innerSpacing = sizes('Inner space', {
  value: ['M', 'M', '0rem', 'M'],
});

const textOptions = { ...tOptions };
textOptions.content = variable('Content', {
  value: ['Dialog'],
  configuration: {
    as: 'MULTILINE',
  },
});
textOptions.type = font('Type', { value: 'Title4' });

export default prefab('Dialog (TS)', attr, undefined, [
  Dialog({}, [
    Paper({}, [
      Row({ options: rowOptions }, [
        Column({ options: columnOptions }, [
          Box({ options: boxOptions }, [Text({ options: textOptions }, [])]),
          Box({}, []),
          Box({ options: boxOptions }, []),
        ]),
      ]),
    ]),
  ]),
]);
