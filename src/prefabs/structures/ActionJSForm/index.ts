import { component } from '@betty-blocks/component-sdk';
import { FormErrorAlert, FormSuccessAlert } from '../Alert';
import { options } from './options';

export const Form = (label: string, showSuccessAlert?: boolean) => {
  if (showSuccessAlert) {
    return component('Form Beta', { label, options, ref: { id: '#formId' } }, [
      FormSuccessAlert({ ref: { id: '#alertSuccessId' } }),
      FormErrorAlert({ ref: { id: '#alertErrorId' } }),
    ]);
  }

  return component('Form Beta', { label, options, ref: { id: '#formId' } }, [
    FormErrorAlert({ ref: { id: '#alertErrorId' } }),
  ]);
};
