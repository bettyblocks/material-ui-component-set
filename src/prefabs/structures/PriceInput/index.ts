import { component, PrefabReference } from '@betty-blocks/component-sdk';

import { updateOption } from '../../../utils';
import { options } from './options';
import { Configuration } from '../Configuration';
import { addChildOptions, optionEvents } from '../TextInput/options/addChild';

export const PriceInput = (
  config: Configuration,
  children: PrefabReference[] = [],
) => {
  const label = config.label ? config.label : 'Price field';
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;

  options.adornmentPosition = updateOption(options.adornmentPosition, {
    value: 'start',
  });

  if (config.inputLabel) {
    options.label = updateOption(options.label, { value: [config.inputLabel] });
  }

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
          options: addChildOptions('price'),
          optionEvents,
        },
      },
    },
    children,
  );
};
