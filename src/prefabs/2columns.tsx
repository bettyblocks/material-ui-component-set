import { Icon, option, prefab } from '@betty-blocks/component-sdk';
import { Column, Row, columnOptions } from './structures';

const attrs = {
  icon: Icon.Layout66Icon,
  category: 'LAYOUT',
  keywords: ['Layout', 'column', 'columns', '2'],
};

const defaultOptions = {
  ...columnOptions,
  columnWidth: option('CUSTOM', {
    ...columnOptions.columnWidth('columnWidth'),
    value: '6',
  }),
  columnWidthTabletLandscape: option('CUSTOM', {
    ...columnOptions.columnWidthTabletLandscape('columnWidthTabletLandscape'),
    value: '6',
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

export default prefab('2 Columns', attrs, undefined, [
  Row({}, [
    Column({ options: defaultOptions }),
    Column({ options: defaultOptions }),
  ]),
]);
