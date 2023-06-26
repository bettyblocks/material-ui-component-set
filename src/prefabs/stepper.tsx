import { Icon, prefab, variable } from '@betty-blocks/component-sdk';
import { Stepper, Step, stepOptions } from './structures';

const attr = {
  icon: Icon.StepperIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'step'],
};

export default prefab('Stepper', attr, undefined, [
  Stepper({}, [
    Step(
      {
        options: {
          ...stepOptions,
          label: variable('Label', {
            ...stepOptions.label('label'),
            value: ['Step 1'],
          }),
        },
      },
      [],
    ),
    Step(
      {
        options: {
          ...stepOptions,
          label: variable('Label', {
            ...stepOptions.label('label'),
            value: ['Step 2'],
          }),
        },
      },
      [],
    ),
  ]),
]);
