import {
  color,
  component,
  PrefabReference,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';

import { updateOption } from '../../../utils';
import {
  alertOptions as defaultOptions,
  categories as defaultCategories,
} from './options';
import { Configuration } from '../Configuration';

export const Alert = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaultOptions) };
  const label = config.label ? config.label : undefined;
  const ref = config.ref ? { ...config.ref } : undefined;
  const optionCategories = config.optionCategories
    ? { ...config.optionCategories }
    : defaultCategories;

  return component(
    'Alert',
    { options, label, ref, optionCategories },
    descendants,
  );
};

const baseFormAlertStyle = {
  textColor: updateOption(defaultOptions.textColor, {
    value: ThemeColor.WHITE,
  }),
  iconColor: updateOption(defaultOptions.iconColor, {
    value: ThemeColor.WHITE,
  }),
  collapsable: updateOption(defaultOptions.collapsable, { value: true }),
  visible: updateOption(defaultOptions.visible, { value: false }),
};

export const FormSuccessAlert = (config: Configuration): PrefabReference => {
  const successAlertOptions = {
    ...defaultOptions,
    ...baseFormAlertStyle,
    icon: updateOption(defaultOptions.icon, {
      value: 'CheckCircle',
    }),
    titleText: updateOption(defaultOptions.titleText, {
      value: ['Success'],
    }),
    bodyText: updateOption(defaultOptions.bodyText, {
      value: ['Form has been submitted successfully.'],
    }),
  };

  return Alert({
    ...config,
    options: { ...successAlertOptions },
  });
};

export const FormErrorAlert = (config: Configuration): PrefabReference => {
  const errorAlertOptions = {
    ...defaultOptions,
    ...baseFormAlertStyle,
    allowTextServerResponse: toggle(
      'Allow to overwrite by the server response',
      { value: true },
    ),
    background: color('Background color', { value: ThemeColor.DANGER }),
    icon: updateOption(defaultOptions.icon, {
      value: 'Error',
    }),
    titleText: updateOption(defaultOptions.titleText, {
      value: ['Error'],
    }),
    bodyText: updateOption(defaultOptions.bodyText, {
      value: ['*Dynamic value from the Action response*'],
    }),
  };

  return Alert({
    ...config,
    options: { ...errorAlertOptions },
  });
};
