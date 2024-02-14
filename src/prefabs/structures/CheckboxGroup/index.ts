import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { checkboxGroupInputOptions } from './options/index';

export const CheckboxGroup = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || checkboxGroupInputOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;

  const categories = [
    {
      label: 'Validation Options',
      expanded: false,
      members: ['required', 'validationValueMissing', 'showError'],
    },
    {
      label: 'Styling',
      expanded: false,
      members: [
        'checkboxColor',
        'checkboxColorChecked',
        'hideLabel',
        'labelColor',
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
    'CheckboxGroup',
    { options, ref, style, label, optionCategories: categories },
    descendants,
  );
};
