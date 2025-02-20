import { component, PrefabReference } from '@betty-blocks/component-sdk';

import { updateOption } from '../../../utils';
import { Configuration } from '../Configuration';
import { checkboxInputOptions } from './options/index';
import { addChildOptions, optionEvents } from '../TextInput/options/addChild';

export const CheckboxInput = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || checkboxInputOptions) };
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
        'checkboxColor',
        'checkboxColorChecked',
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

  if (config.inputLabel) {
    options.label = updateOption(options.label, { value: [config.inputLabel] });
  }

  if (config.value) {
    options.value = updateOption(options.value, { ...config.value });
  }

  return component(
    'CheckboxInput',
    {
      options,
      ref,
      style,
      label,
      optionCategories: categories,
      optionTemplates: {
        addChild: {
          options: addChildOptions('checkbox'),
          optionEvents,
        },
      },
    },
    descendants,
  );
};
