import { component, PrefabReference } from '@betty-blocks/component-sdk';

import { updateOption } from '../../../utils';
import { Configuration } from '../Configuration';
import { options as defaults } from './options';
import {
  addChildOptions,
  optionActions,
} from '../SelectInput/options/addChild';

export const RadioInput = (
  config: Configuration,
  children: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;

  const categories = [
    {
      label: 'Validations',
      expanded: false,
      members: ['required', 'validationValueMissing'],
    },
    {
      label: 'Styling',
      expanded: false,
      members: [
        'hideLabel',
        'radioColor',
        'radioColorChecked',
        'labelColor',
        'textColor',
        'helperColor',
        'errorColor',
      ],
    },
    {
      label: 'Advanced',
      expanded: false,
      members: ['dataComponentAttribute'],
    },
  ];

  if (config.value) {
    options.value = updateOption(options.value, { ...config.value });
  }

  return component(
    'RadioInput',
    {
      options,
      style,
      ref,
      label,
      optionCategories: categories,
      optionTemplates: {
        addChild: { options: addChildOptions('radio'), optionActions },
      },
    },
    children,
  );
};
