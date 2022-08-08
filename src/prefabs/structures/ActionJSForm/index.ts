import { component } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { FormErrorAlert, FormSuccessAlert } from '../Alert';
import { options as alertOptions } from '../Alert/options';
import { options } from './options';

export const Form = () => {
  const updateFormAlertOptions = {
    bodyText: updateOption(alertOptions.bodyText, {
      value: ['Record successfully updated'],
    }),
  };

  return component(
    'Form Beta',
    { label: 'Update form Beta', options, ref: { id: '#formId' } },
    [
      FormSuccessAlert({
        options: updateFormAlertOptions,
        ref: { id: '#alertSuccessId' },
      }),
      FormErrorAlert({ ref: { id: '#alertErrorId' } }),
    ],
  );
};
