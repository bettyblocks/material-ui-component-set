import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { options } from './options';
import { Configuration } from '../Configuration';

export const PriceInput = (
  config: Configuration,
  children: PrefabReference[] = [],
) => {
  const label = config.label ? config.label : undefined;
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;

  options.adornmentPosition = updateOption(options.adornmentPosition, {
    value: 'start',
  });

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
    { options, style, ref, label, optionCategories: categories },
    children,
  );
};
