import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { options as defaults } from './options';
import { addChildOptions, optionEvents } from '../SelectInput/options/addChild';

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
      label: 'Validation Options',
      expanded: false,
      members: ['required', 'hideAsterisk', 'validationValueMissing'],
    },
    {
      label: 'Styling',
      expanded: false,
      members: [
        'hideLabel',
        'helperTextPosition',
        'radioColor',
        'radioColorChecked',
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
    'RadioInput',
    {
      options,
      style,
      ref,
      label,
      optionCategories: categories,
      optionTemplates: {
        addChild: { options: addChildOptions('radio'), optionEvents },
      },
    },
    children,
  );
};
