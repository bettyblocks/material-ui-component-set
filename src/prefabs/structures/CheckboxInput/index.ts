import { component, PrefabReference } from '@betty-blocks/component-sdk';
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
      label: 'Validation Options',
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
      label: 'Advanced Options',
      expanded: false,
      members: ['dataComponentAttribute'],
    },
  ];

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
