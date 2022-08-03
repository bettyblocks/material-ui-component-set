import { component } from '@betty-blocks/component-sdk';
import { FormErrorAlert, FormSuccessAlert } from '../Alert';
import { options } from './options';

export const Form = (label: string) => {
  return component('Form Beta', { label, options, ref: { id: '#formId' } }, [
    FormSuccessAlert({ ref: { id: '#alertSuccessId' } }),
    FormErrorAlert({ ref: { id: '#alertErrorId' } }),
  ]);
};
