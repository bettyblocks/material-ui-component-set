import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { options } from './options';
import { Configuration } from '../Configuration';
import {
  addChildOptions as defaultAddChildOptions,
  optionEvents,
} from '../TextInput/options/addChild';
import { updateOption } from '../../../utils';

export const DecimalInput = (
  config: Configuration,
  children: PrefabReference[] = [],
) => {
  const label = config.label ? config.label : undefined;
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;

  if (config.inputLabel) {
    options.label = updateOption(options.label, { value: [config.inputLabel] });
  }

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.inputType === 'number') {
    options.decimalScale = updateOption(options.decimalScale, {
      label: 'Decimal scale',
      value: 0,
    });

    options.showGroupSeparator = updateOption(options.showGroupSeparator, {
      value: false,
    });
  }

  const addChildOptions = [
    ...(config.optionTemplates?.addChild?.options ||
      defaultAddChildOptions(config.inputType || 'decimal')),
  ];

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
          options: addChildOptions,
          optionEvents,
        },
      },
    },
    children,
  );
};
