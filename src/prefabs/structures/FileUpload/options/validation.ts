import { text, toggle, variable } from '@betty-blocks/component-sdk';

export const validation = {
  required: toggle('Required'),
  hideDefaultError: toggle('Hide default error', {
    value: false,
  }),
  accept: variable('Accept files', {
    value: ['*'],
  }),
  maxFileSize: text('Max file size (mb)', {
    value: '',
  }),
  maxFileSizeMessage: variable('Invalid max file size message', {
    value: ['maximum size exceeded'],
  }),
};
