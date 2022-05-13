import { toggle, variable, icon } from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';

export const options = {
  visible: toggle('Toggle visibility', {
    value: true,
    configuration: { as: 'VISIBILITY' },
  }),
  bodyText: variable('Body text', {
    value: ['Type your content here...'],
  }),
  allowTextServerResponse: toggle('Allow to overwrite by the server response', {
    value: false,
  }),
  titleText: variable('Title text', {
    value: [''],
  }),
  allowTitleServerResponse: toggle(
    'Allow to overwrite by the server response',
    {
      value: false,
    },
  ),
  icon: icon('Icon', {
    value: 'None',
  }),
  collapsable: toggle('Collapsable', {
    value: false,
  }),
  ...styles,
  ...advanced,
};
