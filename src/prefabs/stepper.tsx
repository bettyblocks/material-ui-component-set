import { Icon, prefab, variable } from '@betty-blocks/component-sdk';
import { Step } from './structures/Step';
import { Stepper } from './structures/Stepper';
import { options } from './structures/Step/options';

const attr = {
  icon: Icon.StepperIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'step'],
};

const stepOptionsA = { ...options };
const stepOptionsB = { ...options };
stepOptionsA.label = variable('Label', { value: ['Step 1'] });
stepOptionsB.label = variable('Label', { value: ['Step 2'] });

export default prefab('Stepper', attr, undefined, [
  Stepper({}, [
    Step({ options: stepOptionsA }, []),
    Step({ options: stepOptionsB }, []),
  ]),
]);
