import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { Configuration } from '../Configuration';
import { optionsResolver } from './options/index';
import {
  addChildOptions as defaultAddChildOptions,
  optionEvents,
} from './options/addChild';

export const TextInput = (
  config: Configuration,
  children: PrefabReference[] = [],
) => {
  const options = {
    ...(config.options || optionsResolver(config.inputType || 'text')),
  };
  const addChildOptions = [
    ...(config.optionTemplates?.addChild?.options ||
      defaultAddChildOptions(config.inputType || 'text')),
  ];

  const ref = config.ref ? { ...config.ref } : undefined;

  const categories = [
    {
      label: 'Validations',
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
      label: 'Advanced',
      expanded: false,
      members: ['dataComponentAttribute', 'searchParam', 'debounceDelay'],
    },
  ];

  const label = config.label ? config.label : 'Text field';

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.validationPattern) {
    options.pattern = updateOption(options.pattern, {
      value: [config.validationPattern],
    });
  }

  if (config.inputLabel) {
    options.label = updateOption(options.label, { ...config.inputLabel });
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

  if (config.dataComponentAttribute) {
    options.dataComponentAttribute = updateOption(
      options.dataComponentAttribute,
      {
        value: [config.dataComponentAttribute],
      },
    );
  }

  if (config.value) {
    options.value = updateOption(options.value, { ...config.value });
  }

  return component(
    'TextInput',
    {
      label,
      options,
      ref,
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
