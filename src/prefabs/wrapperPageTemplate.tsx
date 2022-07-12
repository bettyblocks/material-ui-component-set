import {
  Icon,
  prefab as makePrefab,
  toggle,
  wrapper,
  linked,
} from '@betty-blocks/component-sdk';
import { Column } from './structures/Column';
import { options as columnOptions } from './structures/Column/options';
import { Row } from './structures/Row';

const attr = {
  name: 'Wrapper Page Template',
  icon: Icon.DataList,
  type: 'page',
  description: 'This is a test for the wrapper component with TSX components',
  detail:
    'This is a lot of text and I need to fill this up, so that the card in the page templates is filled nicely. Also: Enjoy this image of a dog! :)',
  previewUrl: 'https://preview.betty.app/card-and-list-view',
  previewImage:
    'https://assets.bettyblocks.com/db829f94c9eb4896a0be42f916940bf1_assets/files/postthissnoot',
  category: 'LAYOUT',
};

export default makePrefab('A new journey', attr, undefined, [
  wrapper(
    {
      label: 'outer wrapper',
      options: [
        linked({
          label: 'Column visibility',
          value: {
            ref: {
              componentId: '#1column',
              optionId: '#columnVisible',
            },
          },
        }),
      ],
    },
    [
      Row({}, [
        Column(
          {
            ref: { id: '#1column' },
            options: {
              ...columnOptions,
              visible: toggle('Toggle visibility', {
                ref: { id: '#columnVisible' },
                value: true,
                configuration: {
                  as: 'VISIBILITY',
                },
              }),
            },
          },
          [],
        ),
      ]),
    ],
  ),
]);
