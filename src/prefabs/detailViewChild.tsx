import { color, Icon, prefab, ThemeColor } from '@betty-blocks/component-sdk';
import { Column, columnOptions, DetailViewChild } from './structures';

const attrs = {
  icon: Icon.DetailViewIcon,
  keywords: ['detail', 'view', 'data', 'collection'],
  category: 'DATA',
};

export default prefab('Detail view child', attrs, undefined, [
  Column(
    {
      options: {
        ...columnOptions,
        backgroundColor: color('Background color', {
          ...columnOptions.backgroundColor('backgroundColor'),
          value: ThemeColor.WHITE,
        }),
      },
    },
    [DetailViewChild({}, [])],
  ),
]);
