import { color, Icon, prefab, ThemeColor } from '@betty-blocks/component-sdk';
import { Column } from './structures/Column';
import { options as columnOptions } from './structures/Column/options';
import { DetailViewChild } from './structures/DetailViewChild';

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
          value: ThemeColor.WHITE,
        }),
      },
    },
    [DetailViewChild({}, [])],
  ),
]);
