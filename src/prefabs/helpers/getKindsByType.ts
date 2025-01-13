import { CreateActionInputVariableKind } from '@betty-blocks/component-sdk';

export type InputType =
  | 'date'
  | 'datetime'
  | 'decimal'
  | 'email'
  | 'iban'
  | 'number'
  | 'password'
  | 'phone'
  | 'text'
  | 'time'
  | 'url'
  | 'file'
  | 'price'
  | 'checkbox'
  | 'checkboxGroup'
  | 'image'
  | 'hidden';

const inputTypeToKinds = {
  date: ['DATE'],
  datetime: ['DATE_TIME'],
  decimal: ['DECIMAL'],
  email: ['EMAIL_ADDRESS'],
  iban: ['IBAN'],
  number: ['INTEGER', 'PRICE'],
  password: ['PASSWORD'],
  phone: ['PHONE_NUMBER'],
  text: ['TEXT', 'URL', 'IBAN', 'STRING'],
  time: ['TIME'],
  url: ['URL'],
  price: ['INTEGER', 'PRICE', 'PRICE_EXPRESSION'],
  checkbox: ['BOOLEAN'],
  checkboxGroup: ['HAS_AND_BELONGS_TO_MANY', 'HAS_MANY', 'LIST'],
  file: ['FILE'],
  image: ['IMAGE'],
  hidden: [
    'BOOLEAN',
    'DECIMAL',
    'INTEGER',
    'PRICE',
    'SERIAL',
    'STRING',
    'TEXT',
  ],
};

const { TEXT, NUMBER, CHECKBOX, ARRAY } = CreateActionInputVariableKind;
const inputTypeToActionInputVariableKind = {
  date: TEXT,
  datetime: TEXT,
  decimal: NUMBER,
  email: TEXT,
  iban: TEXT,
  number: NUMBER,
  password: TEXT,
  phone: TEXT,
  text: TEXT,
  time: TEXT,
  url: TEXT,
  price: NUMBER,
  checkbox: CHECKBOX,
  checkboxGroup: ARRAY,
  file: TEXT,
  image: TEXT,
  hidden: TEXT,
};

export const getKindsByType = (type: InputType) => {
  const allowedKinds = inputTypeToKinds[type] || inputTypeToKinds.text;

  const actionInputVariableKind =
    inputTypeToActionInputVariableKind[type] ||
    inputTypeToActionInputVariableKind.text;

  return { allowedKinds, actionInputVariableKind };
};
