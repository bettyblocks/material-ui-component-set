import { CreateActionInputVariableKind } from '@betty-blocks/component-sdk';

export type InputType =
  | 'autocomplete'
  | 'checkbox'
  | 'checkboxGroup'
  | 'date'
  | 'datetime'
  | 'decimal'
  | 'email'
  | 'file'
  | 'hidden'
  | 'iban'
  | 'image'
  | 'multiAutocomplete'
  | 'number'
  | 'password'
  | 'phone'
  | 'price'
  | 'radio'
  | 'rating'
  | 'richText'
  | 'select'
  | 'text'
  | 'time'
  | 'url';

const inputTypeToAllowedKinds = {
  autocomplete: ['LIST', 'BELONGS_TO'],
  checkbox: ['BOOLEAN'],
  checkboxGroup: ['HAS_AND_BELONGS_TO_MANY', 'HAS_MANY'],
  date: ['DATE'],
  datetime: ['DATE_TIME'],
  decimal: ['DECIMAL', 'NUMBER'],
  email: ['EMAIL_ADDRESS'],
  file: ['FILE'],
  hidden: [
    'BOOLEAN',
    'DECIMAL',
    'INTEGER',
    'PRICE',
    'SERIAL',
    'STRING',
    'TEXT',
  ],
  iban: ['IBAN'],
  image: ['IMAGE'],
  multiAutocomplete: ['HAS_AND_BELONGS_TO_MANY', 'HAS_MANY', 'OBJECT'],
  number: ['INTEGER', 'PRICE'],
  password: ['PASSWORD'],
  phone: ['PHONE_NUMBER'],
  price: ['INTEGER', 'PRICE', 'PRICE_EXPRESSION'],
  radio: ['LIST', 'BELONGS_TO', 'OBJECT'],
  rating: ['DECIMAL'],
  richText: ['RICH_TEXT'],
  select: ['LIST', 'BELONGS_TO'],
  text: ['TEXT', 'URL', 'IBAN', 'STRING'],
  time: ['TIME'],
  url: ['URL'],
};

const { TEXT, NUMBER, CHECKBOX, ARRAY, OBJECT } = CreateActionInputVariableKind;
const allowedActionInputVariableKinds = {
  autocomplete: [TEXT, NUMBER],
  checkbox: [CHECKBOX],
  checkboxGroup: [ARRAY],
  date: [TEXT],
  datetime: [TEXT],
  decimal: [NUMBER],
  email: [TEXT],
  file: [TEXT],
  hidden: [CHECKBOX, NUMBER, TEXT],
  iban: [TEXT],
  image: [TEXT],
  multiAutocomplete: [ARRAY],
  number: [NUMBER],
  password: [TEXT],
  phone: [TEXT],
  price: [NUMBER],
  radio: [TEXT, NUMBER, OBJECT],
  rating: [NUMBER],
  richText: [TEXT],
  select: [TEXT, NUMBER],
  text: [TEXT],
  time: [TEXT],
  url: [TEXT],
};

const inputTypeToActionInputVariableKind = {
  autocomplete: NUMBER,
  checkbox: CHECKBOX,
  checkboxGroup: ARRAY,
  date: TEXT,
  datetime: TEXT,
  decimal: NUMBER,
  email: TEXT,
  file: TEXT,
  hidden: NUMBER,
  iban: TEXT,
  image: TEXT,
  multiAutocomplete: ARRAY,
  number: NUMBER,
  password: TEXT,
  phone: TEXT,
  price: NUMBER,
  radio: NUMBER,
  rating: NUMBER,
  richText: TEXT,
  select: NUMBER,
  text: TEXT,
  time: TEXT,
  url: TEXT,
};

export const getKindsByType = (type: InputType) => {
  const allowedKinds =
    inputTypeToAllowedKinds[type] || inputTypeToAllowedKinds.text;

  const actionInputVariableKind =
    inputTypeToActionInputVariableKind[type] ||
    inputTypeToActionInputVariableKind.text;

  const allowedInputKinds = allowedActionInputVariableKinds[type] || undefined;
  return { allowedKinds, actionInputVariableKind, allowedInputKinds };
};
