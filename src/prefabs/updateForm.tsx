import * as React from 'react';
import {
  prefab,
  Icon,
  InteractionType,
  PrefabInteraction,
  option,
  model,
  filter,
  component,
} from '@betty-blocks/component-sdk';
import { FormErrorAlert, FormSuccessAlert } from './structures/Alert';
import { updateOption } from '../utils';
import { options as defaults } from './structures/Alert/options';

const beforeCreate = ({
  close,
  components: {
    ModelSelector,
    Header,
    Content,
    Field,
    Footer,
    PropertiesSelector,
  },
  prefab: originalPrefab,
  prefabs,
  save,
  helpers,
}: any) => {
  const {
    prepareAction,
    createUuid,
    cloneStructure,
    makeBettyInput,
    PropertyKind,
    BettyPrefabs,
  } = helpers;
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState(null);
  const [idProperty, setIdProperty] = React.useState('');
  const [properties, setProperties] = React.useState([]);
  // const [hasErrors, setHasErrors] = React.useState(false);
  const componentId = createUuid();

  return (
    <>
      <Header onClose={close} title="CreateFormWizard.title" />
      {/* {hasErrors && (
        <Box>
          <GrommetAlertIcon />
          <Text color="orange">An error has occured, contact support</Text>
        </Box>
      )} */}
      <Content>
        <Field label="CreateFormWizard.selectModel">
          <ModelSelector
            onQueryCompleted={({
              model: { properties: allProperties },
              model: selectedModel,
            }): void => {
              setIdProperty(
                allProperties.find((property) => {
                  return property.name === 'id';
                }),
              );

              setModel(selectedModel);
            }}
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
            idProperty,
            properties,
            'update',
          );
          const structure = originalPrefab.structure[0];

          const setOption = (structure, key, transform): void => {
            const index = structure.options.findIndex(
              (option) => option.key === key,
            );
            if (index === -1) {
              console.warn(
                `unable to set option. option '${key}' is missing on ${structure.name}`,
              );

              return;
            }

            // eslint-disable-next-line no-param-reassign
            structure.options[index] = transform(structure.options[index]);
          };

          setOption(structure, 'actionId', (option) => ({
            ...option,
            value: result.action.actionId,
            configuration: { disabled: true },
          }));

          setOption(structure, 'modelId', (option) => ({
            ...option,
            value: modelId,
            configuration: {
              disabled: true,
            },
          }));

          // possible helper: given property kind returns prefab name
          Object.values(result.variables).map(([property, variable]) => {
            const kind = property.kind;
            switch (kind) {
              case PropertyKind.BELONGS_TO: {
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.AUTO_COMPLETE,
                    model,
                    property,
                    variable,
                    result.relatedIdProperties,
                  ),
                );
                break;
              }
              case PropertyKind.HAS_MANY:
              case PropertyKind.HAS_AND_BELONGS_TO_MANY:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.MULTI_AUTO_COMPLETE,
                    model,
                    property,
                    variable,
                    result.relatedIdProperties,
                  ),
                );
                break;
              case PropertyKind.DATE_TIME:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.DATE_TIME,
                    model,
                    property,
                    variable,
                  ),
                );
                break;
              case PropertyKind.DATE:
                structure.descendants.push(
                  makeBettyInput(BettyPrefabs.DATE, model, property, variable),
                );
                break;
              case PropertyKind.TIME:
                structure.descendants.push(
                  makeBettyInput(BettyPrefabs.TIME, model, property, variable),
                );
                break;
              case PropertyKind.DECIMAL:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.DECIMAL,
                    model,
                    property,
                    variable,
                  ),
                );
                break;
              case PropertyKind.EMAIL_ADDRESS:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.EMAIL_ADDRESS,
                    model,
                    property,
                    variable,
                  ),
                );
                break;
              case PropertyKind.IBAN:
                structure.descendants.push(
                  makeBettyInput(BettyPrefabs.IBAN, model, property, variable),
                );
                break;
              case PropertyKind.LIST:
                structure.descendants.push(
                  makeBettyInput(BettyPrefabs.LIST, model, property, variable),
                );
                break;
              case PropertyKind.PASSWORD:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.PASSWORD,
                    model,
                    property,
                    variable,
                  ),
                );
                break;
              case PropertyKind.PHONE_NUMBER:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.PHONE_NUMBER,
                    model,
                    property,
                    variable,
                  ),
                );
                break;
              case PropertyKind.PRICE:
                structure.descendants.push(
                  makeBettyInput(BettyPrefabs.PRICE, model, property, variable),
                );
                break;
              case PropertyKind.URL:
                structure.descendants.push(
                  makeBettyInput(BettyPrefabs.URL, model, property, variable),
                );
                break;
              case PropertyKind.STRING:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.STRING,
                    model,
                    property,
                    variable,
                  ),
                );
                break;
              case PropertyKind.TEXT:
                structure.descendants.push(
                  makeBettyInput(BettyPrefabs.TEXT, model, property, variable),
                );
                break;
              case PropertyKind.INTEGER:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.INTEGER,
                    model,
                    property,
                    variable,
                  ),
                );
                break;
              case PropertyKind.BOOLEAN:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.BOOLEAN,
                    model,
                    property,
                    variable,
                  ),
                );
                break;
              default:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.STRING,
                    model,
                    property,
                    variable,
                  ),
                );
            }
          });

          structure.descendants.push(
            makeBettyInput(
              BettyPrefabs.HIDDEN,
              model,
              idProperty,
              result.resultVariable,
            ),
          );

          structure.descendants.push(
            cloneStructure(prefabs, BettyPrefabs.SUBMIT_BUTTON),
          );

          save(originalPrefab);
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
