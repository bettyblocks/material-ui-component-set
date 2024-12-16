import {
  CreateActionInputVariableKind,
  property,
  variable,
} from '@betty-blocks/component-sdk';

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

const propertyOption = (
  allowedKinds: string[],
  actionInputType: CreateActionInputVariableKind,
) => {
  return {
    property: property('Property', {
      value: '',
      showInReconfigure: true,
      showInAddChild: true,
      optionRef: {
        id: '#propertyRef',
      },
      configuration: {
        allowedKinds,
        createActionInputVariable: {
          type: actionInputType,
        },
      },
    }),
  };
};

const labelOption = {
  label: variable('Label', {
    value: [''],
    showInReconfigure: true,
    optionRef: {
      sourceId: '#propertyRef',
      inherit: [{ name: '$name', id: '$id', type: 'PROPERTY_LABEL' }],
    },
  }),
};

export const inputTypes = [
  {
    label: 'Text (single line)',
    structure: [
      TextInput({
        label: 'Text (single line) input',
        inputLabel: 'Text (single line)',
        type: 'text',
        options: {
          ...textInputOptions,
          ...labelOption,
          ...propertyOption(
            ['TEXT', 'URL', 'IBAN', 'STRING'],
            CreateActionInputVariableKind.TEXT,
          ),
        },
      }),
    ],
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
