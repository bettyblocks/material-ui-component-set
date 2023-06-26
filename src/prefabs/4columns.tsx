import { Icon, option, prefab } from '@betty-blocks/component-sdk';
import { Column, Row, columnOptions } from './structures';

const attrs = {
  icon: Icon.Layout3333Icon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '4'],
};

const defaultOptions = {
  ...columnOptions,
  columnWidth: option('CUSTOM', {
    ...columnOptions.columnWidth('columnWidth'),
    value: '3',
  }),
  columnWidthTabletLandscape: option('CUSTOM', {
    ...columnOptions.columnWidthTabletLandscape('columnWidthTabletLandscape'),
    value: '6',
  }),
  columnWidthTabletPortrait: option('CUSTOM', {
    ...columnOptions.columnWidthTabletPortrait('columnWidthTabletPortrait'),
    value: '6',
  }),
  columnWidthMobile: option('CUSTOM', {
    ...columnOptions.columnWidthMobile('columnWidthMobile'),
    value: '6',
  }),
};

export default prefab('4 Columns', attrs, undefined, [
  Row({}, [
    Column({ options: defaultOptions }),
    Column({ options: defaultOptions }),
    Column({ options: defaultOptions }),
    Column({ options: defaultOptions }),
  ]),
]);
