import { prefab } from '@betty-blocks/component-sdk';
import { doSomething } from './utils/doSomething';

const foo = prefab(
  'Foo',
  {
    category: 'Form',
    icon: 'TextInputIcon',
  },
  undefined,
  [],
);

export default foo;
