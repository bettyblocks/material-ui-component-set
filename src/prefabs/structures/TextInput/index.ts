import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { Configuration } from '../Configuration';
import { options as defaults } from './options/index';

export const TextInput = (
  config: Configuration,
  children: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const ref = config.ref ? { ...config.ref } : undefined;

  const categories = [
    {
      label: 'Validation Options',
      expanded: false,
      members: [
        'required',
        'validationValueMissing',
        'pattern',
        'validationPatternMismatch',
        'minLength',
        'validationTooShort',
        'maxLength',
        'validationTooLong',
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

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.validationPattern) {
    options.pattern = updateOption(options.pattern, {
      value: [config.validationPattern],
    });
  }

  if (config.inputLabel) {
    options.label = updateOption(options.label, { value: [config.inputLabel] });
  }

  if (config.pattern) {
    options.pattern = updateOption(options.pattern, {
      value: config.pattern,
      configuration: {
        ...(<object>options.pattern('pattern').configuration),
        placeholder: config.pattern,
      },
    });
  }

  if (config.adornmentIcon) {
    options.adornmentIcon = updateOption(options.adornmentIcon, {
      value: config.adornmentIcon,
    });
  }

  return component(
    'TextInput',
    { label: config.label, options, ref, optionCategories: categories },
    children,
  );
};
