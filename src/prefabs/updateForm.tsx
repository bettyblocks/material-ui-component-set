import * as React from 'react';
import {
  component,
  option,
  prefab,
  model,
  filter,
  BeforeCreateArgs,
  Icon,
  InteractionType,
  PrefabInteraction,
} from '@betty-blocks/component-sdk';
import { FormErrorAlert, FormSuccessAlert } from './structures/Alert';
import { updateOption } from '../utils';
import { options as defaults } from './structures/Alert/options';

const beforeCreate = ({
  close,
  components: { CreateFormUpdateWizard },
  prefab: originalPrefab,
  prefabs,
  save,
}: BeforeCreateArgs) => {
  return (
    <CreateFormUpdateWizard
      close={close}
      prefab={originalPrefab}
      prefabs={prefabs}
      save={save}
    />
  );
};

const interactions: PrefabInteraction[] = [
  {
    type: InteractionType.Custom,
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#alertErrorId',
      sourceComponentId: '#formId',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Show',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#formId',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#formId',
    },
  },
  {
    type: InteractionType.Custom,
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#alertErrorId',
      sourceComponentId: '#formId',
    },
  },
];

const attributes = {
  category: 'FORMV2',
  icon: Icon.UpdateFormIcon,
  interactions,
};

const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  modelId: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'modelId' } }),
};

const updateFormAlertOptions = {
  bodyText: updateOption(defaults.bodyText, {
    value: ['Record successfully updated'],
  }),
};

export default prefab('Update Form Beta', attributes, beforeCreate, [
  component(
    'Form Beta',
    { label: 'Update form Beta', options, ref: { id: '#formId' } },
    [
      FormSuccessAlert({
        options: updateFormAlertOptions,
        ref: { id: '#alertSuccessId' },
      }),
      FormErrorAlert({ ref: { id: '#alertErrorId' } }),
    ],
  ),
]);
