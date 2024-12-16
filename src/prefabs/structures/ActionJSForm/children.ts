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

export const inputTypes = [
  {
    label: 'Text (single line)',
    structure: [TextInput({ options: { ...textInputOptions } })],
  },
  {
    label: 'Select',
    structure: [SelectInput({ options: { ...selectInputOptions } })],
  },
  {
    label: 'Price',
    structure: [PriceInput({ options: { ...priceInputOptions } })],
  },
  {
    label: 'TextArea',
    structure: [TextArea({ options: { ...textAreaOptions } })],
  },
];

export const children = [
  TextInput({
    options: { ...textInputOptions, ...defaultOptions },
  }),
  SelectInput({
    options: { ...selectInputOptions, ...defaultOptions },
  }),
  CheckboxInput({
    options: { ...checkboxInputOptions, ...defaultOptions },
  }),
  AutocompleteInput({
    options: { ...autocompleteInputOptions, ...defaultOptions },
  }),
  DateTimePicker({
    options: { ...dateTimePickerOptions, ...defaultOptions },
  }),
  CheckboxGroup({
    options: { ...checkboxGroupInputOptions, ...defaultOptions },
  }),
  RadioInput({
    options: { ...radioInputOptions, ...defaultOptions },
  }),
  MultiAutocomplete({
    options: { ...multiAutocompleteOptions, ...defaultOptions },
  }),
  FileUpload({
    options: { ...fileUploadOptions, ...defaultOptions },
  }),
  RatingInput({
    options: { ...ratingInputOptions, ...defaultOptions },
  }),
  RichTextInput({
    options: { ...richTextOptions, ...defaultOptions },
  }),
];
