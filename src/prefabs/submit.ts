import { prefab, component, text, Icon } from '@betty-blocks/component-sdk';

const attributes = {
  category: 'FORM',
  icon: Icon.ButtonIcon,
};

const options = {
  label: text('Label', { value: 'Submit' }),
};

export default prefab('SubmitButton', attributes, undefined, [
  component('SubmitButton', { options }, []),
]);
