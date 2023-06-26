import { Icon, option, prefab } from '@betty-blocks/component-sdk';
import { Column, Row, columnOptions } from './structures';

const attrs = {
  icon: Icon.Layout444Icon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '3'],
};

const defaultOptions = {
  ...columnOptions,
  columnWidth: option('CUSTOM', {
    ...columnOptions.columnWidth('columnWidth'),
    value: '4',
  }),
  columnWidthTabletLandscape: option('CUSTOM', {
    ...columnOptions.columnWidthTabletLandscape('columnWidthTabletLandscape'),
    value: '4',
  }),
  columnWidthTabletPortrait: option('CUSTOM', {
    ...columnOptions.columnWidthTabletPortrait('columnWidthTabletPortrait'),
    value: '12',
  }),
  columnWidthMobile: option('CUSTOM', {
    ...columnOptions.columnWidthMobile('columnWidthMobile'),
    value: '12',
  }),
};

export default prefab('3 Columns', attrs, undefined, [
  Row({}, [
    Column({ options: defaultOptions }),
    Column({ options: defaultOptions }),
    Column({ options: defaultOptions }),
  ]),
]);
