import { property, variable } from '@betty-blocks/component-sdk';

import {
  AutocompleteInput,
  CheckboxGroup,
  CheckboxInput,
  DateTimePicker,
  FileUpload,
  MultiAutocomplete,
  RadioInput,
  RatingInput,
  RichTextInput,
  SelectInput,
  TextInput,
  autocompleteInputOptions,
  checkboxGroupInputOptions,
  checkboxInputOptions,
  dateTimePickerOptions,
  fileUploadOptions,
  multiAutocompleteOptions,
  radioInputOptions,
  ratingInputOptions,
  richTextOptions,
  selectInputOptions,
  textInputOptions,
} from '..';

import {
  autocompleteInput,
  checkboxGroupInput,
  checkboxinput,
  datePickerInput,
  dateTimePickerInput,
  decimalinput,
  emailinput,
  fileUploadInput,
  hiddeninput,
  ibaninput,
  imageUploadInput,
  multiAutocomplete,
  numberinput,
  passwordinput,
  phoneinput,
  priceinput,
  radioinput,
  ratingInput,
  richTextInput,
  selectinput,
  switchInput,
  textareainput,
  textinput,
  timePickerInput,
  urlinput,
} from '../..';

export const inputTypes = [
  autocompleteInput,
  checkboxGroupInput,
  checkboxinput,
  datePickerInput,
  dateTimePickerInput,
  decimalinput,
  emailinput,
  fileUploadInput,
  hiddeninput,
  ibaninput,
  imageUploadInput,
  multiAutocomplete,
  numberinput,
  passwordinput,
  phoneinput,
  priceinput,
  radioinput,
  ratingInput,
  richTextInput,
  selectinput,
  switchInput,
  textareainput,
  textinput,
  timePickerInput,
  urlinput,
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
