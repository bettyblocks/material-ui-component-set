import {
  color,
  component,
  OptionProducer,
  PrefabComponent,
  PrefabReference,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';

import { updateOption } from '../../../utils';
import { options as defaults } from './options';

export interface Configuration {
  options?: Record<string, OptionProducer>;
  ref?: PrefabComponent['ref'];
}

export const Alert = (config: Configuration): PrefabReference => {
  const options = { ...defaults, ...config.options };

  return component('Alert', { ...config, options }, []);
};

const baseFormAlertStyle = {
  textColor: updateOption(defaults.textColor, { value: ThemeColor.WHITE }),
  iconColor: updateOption(defaults.iconColor, { value: ThemeColor.WHITE }),
  collapsable: updateOption(defaults.collapsable, { value: true }),
  visible: updateOption(defaults.visible, { value: false }),
};

export const FormSuccessAlert = (config: Configuration): PrefabReference => {
  const successAlertOptions = {
    ...baseFormAlertStyle,
    icon: updateOption(defaults.icon, {
      value: 'CheckCircle',
    }),
    titleText: updateOption(defaults.titleText, {
      value: ['Success'],
    }),
    bodyText: updateOption(defaults.bodyText, {
      value: ['Form has been submitted successfully.'],
    }),
  };

  return Alert({
    ...config,
    options: { ...successAlertOptions, ...config.options },
  });
};

export const FormErrorAlert = (config: Configuration): PrefabReference => {
  const errorAlertOptions = {
    ...baseFormAlertStyle,
    allowTextServerResponse: toggle(
      'Allow to overwrite by the server response',
      { value: true },
    ),
    background: color('Background color', { value: ThemeColor.DANGER }),
    icon: updateOption(defaults.icon, {
      value: 'Error',
    }),
    titleText: updateOption(defaults.titleText, {
      value: ['Error'],
    }),
    bodyText: updateOption(defaults.bodyText, {
      value: ['*Dynamic value from the Action response*'],
    }),
  };

  return Alert({
    ...config,
    options: { ...errorAlertOptions, ...config.options },
  });
};
