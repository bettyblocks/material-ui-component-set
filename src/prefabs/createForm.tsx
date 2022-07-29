// @ts-nocheck
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

const beforeCreate = ({
  close,
  components: {
    ModelSelector,
    Box,
    GrommetAlertIcon,
    Header,
    Content,
    Field,
    Footer,
    PropertiesSelector,
    Text,
  },
  prefab: originalPrefab,
  prefabs,
  save,
  helpers,
}: any) => {
  const { prepareAction, createUuid } = helpers;
  const [modelId, setModelId] = React.useState('');
  const [properties, setProperties] = React.useState([]);
  const [hasErrors, setHasErrors] = React.useState(false);
  const componentId = createUuid();

  return (
    <>
      <Header onClose={close} title="CreateFormWizard.title" />
      {hasErrors && (
        <Box>
          <GrommetAlertIcon />
          <Text color="orange">An error has occured, contact support</Text>
        </Box>
      )}
      <Content>
        <Field label="CreateFormWizard.selectModel">
          <ModelSelector
            onChange={(newId): void => {
              setModelId(newId);
              setProperties([]);
            }}
            scopedModels={false}
            value={modelId}
          />
        </Field>
        <Field label="CreateFormWizard.selectProperties">
          <PropertiesSelector
            allowRelations
            disabledKinds={[]}
            disabledNames={['created_at', 'updated_at']}
            // TODO: check if component id is needed here
            modelId={modelId}
            onChange={setProperties as any /* these types are wild man */}
            scopedModels={false}
            value={properties as any /* these types are wild man */}
          />
        </Field>
      </Content>
      <Footer
        onClose={close}
        canSave={modelId && properties.length !== 0}
        onSave={async (): Promise<void> => {
          // eslint-disable-next-line no-param-reassign
          originalPrefab.structure[0].id = componentId;
          const result = await prepareAction(
            componentId,
            modelId,
            properties,
            'update',
          );
          return originalPrefab;
        }}
      />
    </>
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
  icon: Icon.CreateFormIcon,
  interactions,
};

const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  modelId: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'modelId' } }),
};

export default prefab('Create Form Beta', attributes, beforeCreate, [
  component(
    'Form Beta',
    { label: 'Create form Beta', options, ref: { id: '#formId' } },
    [
      FormSuccessAlert({ ref: { id: '#alertSuccessId' } }),
      FormErrorAlert({ ref: { id: '#alertErrorId' } }),
    ],
  ),
]);
