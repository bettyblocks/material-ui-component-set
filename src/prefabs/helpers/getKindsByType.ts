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
  | 'price';

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
};

const { TEXT, NUMBER } = CreateActionInputVariableKind;
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
};

export const getKindsByType = (type: InputType) => {
  const allowedKinds = inputTypeToKinds[type] || inputTypeToKinds.text;

  const actionInputVariableKind =
    inputTypeToActionInputVariableKind[type] ||
    inputTypeToActionInputVariableKind.text;

  return { allowedKinds, actionInputVariableKind };
};
