import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { options } from './options';
import { Configuration } from '../Configuration';
import { addChildOptions, optionEvents } from '../TextInput/options/addChild';

export const DecimalInput = (
  config: Configuration,
  children: PrefabReference[] = [],
) => {
  const label = config.label ? config.label : undefined;
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;

  const categories = [
    {
      label: 'Validation Options',
      expanded: false,
      members: [
        'required',
        'validationValueMissing',
        'minValue',
        'validationTooLow',
        'maxValue',
        'validationTooHigh',
      ],
    },
    {
      label: 'Styling',
      expanded: false,
      members: [
        'hideLabel',
        'backgroundColor',
        'borderColor',
        'borderHoverColor',
        'borderFocusColor',
        'labelColor',
        'textColor',
        'placeholderColor',
        'helperColor',
        'errorColor',
      ],
    },
    {
      label: 'Advanced Options',
      expanded: false,
      members: ['debounceDelay', 'dataComponentAttribute'],
    },
  ];

  return component(
    'DecimalInput',
    {
      options,
      style,
      ref,
      label,
      optionCategories: categories,
      optionTemplates: {
        addChild: {
          options: addChildOptions('decimal'),
          optionEvents,
        },
      },
    },
    children,
  );
};
