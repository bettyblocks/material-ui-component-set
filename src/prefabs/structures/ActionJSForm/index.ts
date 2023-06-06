import { component } from '@betty-blocks/component-sdk';
import { FormErrorAlert, FormSuccessAlert } from '../Alert';
import { options, categories as optionCategories } from './options';

export const Form = (label: string, showSuccessAlert?: boolean) => {
  if (showSuccessAlert) {
    return component(
      'Form',
      { label, options, optionCategories, ref: { id: '#formId' } },
      [
        FormSuccessAlert({ ref: { id: '#alertSuccessId' } }),
        FormErrorAlert({ ref: { id: '#alertErrorId' } }),
      ],
    );
  }

  return component(
    'Form',
    { label, options, optionCategories, ref: { id: '#formId' } },
    [FormErrorAlert({ ref: { id: '#alertErrorId' } })],
  );
};
