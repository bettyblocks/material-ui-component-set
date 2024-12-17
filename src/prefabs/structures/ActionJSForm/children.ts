import { property, variable } from '@betty-blocks/component-sdk';

import {
  AutocompleteInput,
  CheckboxGroup,
  CheckboxInput,
  DateTimePicker,
  FileUpload,
  MultiAutocomplete,
  PriceInput,
  RadioInput,
  RatingInput,
  RichTextInput,
  SelectInput,
  TextArea,
  TextInput,
  autocompleteInputOptions,
  checkboxGroupInputOptions,
  checkboxInputOptions,
  dateTimePickerOptions,
  fileUploadOptions,
  multiAutocompleteOptions,
  priceInputOptions,
  radioInputOptions,
  ratingInputOptions,
  richTextOptions,
  selectInputOptions,
  textAreaOptions,
  textInputOptions,
} from '..';

export const inputTypes = [
  TextInput({ label: 'Text field', options: { ...textInputOptions } }),
  SelectInput({ label: 'Select', options: { ...selectInputOptions } }),
  PriceInput({ label: 'Price', options: { ...priceInputOptions } }),
  TextArea({ label: 'Textarea', options: { ...textAreaOptions } }),
];

const defaultOptions = {
  property: property('Property', {
    value: '',
    showInReconfigure: true,
  }),
  label: variable('Label', {
    value: [''],
    showInReconfigure: true,
  }),
};

export const children = [
  TextInput({ options: { ...textInputOptions, ...defaultOptions } }),
  SelectInput({ options: { ...selectInputOptions, ...defaultOptions } }),
  CheckboxInput({ options: { ...checkboxInputOptions, ...defaultOptions } }),
  AutocompleteInput({
    options: { ...autocompleteInputOptions, ...defaultOptions },
  }),
  DateTimePicker({ options: { ...dateTimePickerOptions, ...defaultOptions } }),
  CheckboxGroup({
    options: { ...checkboxGroupInputOptions, ...defaultOptions },
  }),
  RadioInput({ options: { ...radioInputOptions, ...defaultOptions } }),
  MultiAutocomplete({
    options: { ...multiAutocompleteOptions, ...defaultOptions },
  }),
  FileUpload({ options: { ...fileUploadOptions, ...defaultOptions } }),
  RatingInput({ options: { ...ratingInputOptions, ...defaultOptions } }),
  RichTextInput({ options: { ...richTextOptions, ...defaultOptions } }),
];
