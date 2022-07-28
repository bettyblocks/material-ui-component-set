import {
  color,
  Icon,
  linked,
  prefab,
  ThemeColor,
  wrapper,
} from '@betty-blocks/component-sdk';
import { Alert } from './structures/Alert';
import { options as defaults } from './structures/Alert/options';
import { updateOption } from '../utils';

const attributes = {
  name: 'InnerWrapperTSX',
  category: 'LAYOUT',
  icon: Icon.RowColumnIcon,
  keywords: ['Layout', 'column', 'columns', '1'],
};

const optionRefs = {
  ...defaults,
  background: color('Background color', {
    ref: {
      id: '#AlertOption1',
    },
    value: ThemeColor.DANGER,
  }),
  icon: updateOption(defaults.icon, {
    ref: {
      id: '#AlertOption2',
    },
    value: 'Error',
  }),
  titleText: updateOption(defaults.titleText, {
    ref: {
      id: '#AlertOption3',
    },
    value: ['Error'],
  }),
  bodyText: updateOption(defaults.bodyText, {
    ref: {
      id: '#AlertOption4',
    },
    value: ['*Dynamic value from the Action response*'],
  }),
};

export default prefab('InnerWrapperTSX', attributes, undefined, [
  wrapper(
    {
      label: 'outer wrapper',
      optionCategories: [{ label: 'Foo', members: ['foo'] }],
      options: {
        foo: linked({
          label: 'linkedOptionLabel1',
          value: {
            ref: {
              componentId: '#component1',
              optionId: '#AlertOption1',
            },
          },
        }),
        asd: linked({
          label: 'linkedOptionLabel2',
          value: {
            ref: {
              componentId: '#component1',
              optionId: '#AlertOption2',
            },
          },
        }),
        asdasdsad: linked({
          value: {
            ref: {
              componentId: '#component1',
              optionId: '#AlertOption3',
            },
          },
        }),
        sss: linked({
          value: {
            ref: {
              componentId: '#component1',
              optionId: '#AlertOption4',
            },
          },
        }),
      },
    },
    [
      Alert({
        ref: { id: '#component1' },
        optionCategories: [
          { label: 'Styles', members: ['background'], expanded: true },
        ],
        options: optionRefs,
      }),
    ],
  ),
]);
