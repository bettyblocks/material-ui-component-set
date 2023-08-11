import * as React from 'react';
import {
  prefab,
  Icon,
  InteractionType,
  PrefabInteraction,
} from '@betty-blocks/component-sdk';
import { Form } from './structures/ActionJSForm';
import { PermissionType } from './types/types';

const beforeCreate = ({
  close,
  components: {
    Content,
    Field,
    Footer,
    Header,
    ModelSelector,
    PropertiesSelector,
    Text,
    Box,
    Toggle,
    BBTooltip,
    CircleQuestion,
    TextInput,
    FormField,
  },
  prefab: originalPrefab,
  save,
  helpers,
}: any) => {
  const {
    BettyPrefabs,
    PropertyKind,
    cloneStructure,
    createBlacklist,
    createUuid,
    makeBettyInput,
    prepareAction,
    getPageAuthenticationProfileId,
    getPageName,
    setOption,
    useModelQuery,
  } = helpers;

  const disabledKinds = createBlacklist([
    'BOOLEAN',
    'DATE',
    'DATE_TIME',
    'DECIMAL',
    'EMAIL_ADDRESS',
    'RICH_TEXT',
    'ENUM',
    'FILE',
    'FLOAT',
    'GOOGLE_DOCUMENT',
    'HAS_ONE',
    'HAS_AND_BELONGS_TO_MANY',
    'HAS_MANY',
    'IBAN',
    'IMAGE',
    'INTEGER',
    'LIST',
    'MINUTES',
    'PASSWORD',
    'PERIODIC_COUNT',
    'PHONE_NUMBER',
    'PRICE',
    'STRING',
    'TEXT',
    'TIME',
    'URL',
  ]);

  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState('');
  const [idProperty, setIdProperty] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  const [modelBased, setmodelBased] = React.useState(true);
  const [actionName, setActionName] = React.useState('');
  const permissions: PermissionType = 'inherit';
  const pageAuthenticationProfileId = getPageAuthenticationProfileId();
  const pageName = getPageName();

  const [validationMessage, setValidationMessage] = React.useState('');
  const componentId = createUuid();

  const modelRequest = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result) => {
      setModel(result.model);
      setIdProperty(result.model.properties.find(({ name }) => name === 'id'));
    },
  });

  const validate = () => {
    if (modelRequest.loading) {
      setValidationMessage(
        'Model details are still loading, please try submitting again.',
      );
      return false;
    }

    return true;
  };

  const inputStructure = (inputPrefab: any, prop: any) => {
    if (inputPrefab.type === 'COMPONENT') {
      setOption(inputPrefab, 'property', (options: any) => ({
        ...options,
        optionRef: {
          id: `#PropertyInput${prop.id}`,
        },
      }));
      setOption(inputPrefab, 'label', (options: any) => ({
        ...options,
        value: [''],
        optionRef: {
          sourceId: `#PropertyInput${prop.id}`,
          inherit: [{ name: '$name', id: '$id', type: 'PROPERTY_LABEL' }],
        },
      }));
    }
    return inputPrefab;
  };

  return (
    <>
      <Header onClose={close} title="Configure form" />
      <Box
        as="header"
        direction="row"
        justify="between"
        align="center"
        margin="0 2rem"
      >
        <Text size="0.875rem" color="grey700">
          You can set up a form based on a model and selected properties so that
          your form is created with matching inputs.
          <br />
          You can turn off the switch to not base your form on a model within
          your app and manually configure it.
        </Text>
      </Box>
      <Content>
        <Box margin="-0.5rem 0 0.5rem 0">
          <Field label="Model based form">
            {/* TODO: fix onChange bug and move setmodelBased to Toggle onChange */}
            <FormField onClick={(): void => setmodelBased(!modelBased)}>
              <Toggle
                checked={modelBased}
                onChange={(): any => null}
                color="purple"
              />
            </FormField>
          </Field>
        </Box>
        {modelBased ? (
          <>
            <Field
              label="Select model"
              error={
                validationMessage && (
                  <Text color="#e82600">{validationMessage}</Text>
                )
              }
            >
              <ModelSelector
                onChange={(id) => {
                  setModelId(id);
                }}
                value={modelId}
                margin
              />
            </Field>
            <Field label="Select properties">
              <PropertiesSelector
                allowRelations
                disabledKinds={disabledKinds}
                disabledNames={['created_at', 'id', 'updated_at']}
                modelId={modelId}
                onChange={setProperties}
                scopedModels={false}
                value={properties}
              />
            </Field>
          </>
        ) : (
          <Box margin="0 36.5rem 0 0" width="20rem">
            <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                color="grey700"
                weight="bold"
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  marginRight: '0.1rem',
                }}
              >
                Action name
              </Text>
              <CircleQuestion
                color="grey500"
                size="small"
                data-tip="You can later find this action in the action <br /> overview with the name you now choose"
                data-for="action-tooltip"
              />
              <BBTooltip
                id="action-tooltip"
                place="top"
                type="dark"
                effect="solid"
                multiline
              />
            </Box>
            <TextInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setActionName(e.target.value)
              }
              color="orange"
            />
          </Box>
        )}
      </Content>
      <Footer
        onClose={close}
        canSave={(modelId && properties.length !== 0) || actionName}
        onSave={async (): Promise<void> => {
          // eslint-disable-next-line no-param-reassign
          originalPrefab.structure[0].id = componentId;
          const result = await prepareAction(
            componentId,
            idProperty,
            properties,
            modelBased ? 'empty' : 'custom',
            null,
            actionName,
            permissions,
            pageAuthenticationProfileId,
            pageName,
          );

          const structure = originalPrefab.structure[0];
          if (modelBased) {
            Object.values(result.variables).map(([property, variable]) => {
              const { kind } = property;
              let input;

              switch (kind) {
                case PropertyKind.BELONGS_TO: {
                  input = makeBettyInput(
                    BettyPrefabs.AUTO_COMPLETE,
                    model,
                    property,
                    variable,
                    result.relatedIdProperties,
                    result.relatedModelIds,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.HAS_MANY:
                case PropertyKind.HAS_AND_BELONGS_TO_MANY: {
                  input = makeBettyInput(
                    BettyPrefabs.MULTI_AUTO_COMPLETE,
                    model,
                    property,
                    variable,
                    result.relatedIdProperties,
                    result.relatedModelIds,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.DATE_TIME: {
                  input = makeBettyInput(
                    BettyPrefabs.DATE_TIME,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.DATE: {
                  input = makeBettyInput(
                    BettyPrefabs.DATE,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.TIME: {
                  input = makeBettyInput(
                    BettyPrefabs.TIME,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.DECIMAL: {
                  input = makeBettyInput(
                    BettyPrefabs.DECIMAL,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.EMAIL_ADDRESS: {
                  input = makeBettyInput(
                    BettyPrefabs.EMAIL_ADDRESS,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.FILE: {
                  input = makeBettyInput(
                    BettyPrefabs.FILE,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.IMAGE: {
                  input = makeBettyInput(
                    BettyPrefabs.IMAGE,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.IBAN: {
                  input = makeBettyInput(
                    BettyPrefabs.IBAN,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.LIST: {
                  input = makeBettyInput(
                    BettyPrefabs.LIST,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.PASSWORD: {
                  input = makeBettyInput(
                    BettyPrefabs.PASSWORD,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.PHONE_NUMBER: {
                  input = makeBettyInput(
                    BettyPrefabs.PHONE_NUMBER,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.PRICE: {
                  input = makeBettyInput(
                    BettyPrefabs.PRICE,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.URL: {
                  input = makeBettyInput(
                    BettyPrefabs.URL,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.STRING: {
                  input = makeBettyInput(
                    BettyPrefabs.STRING,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.TEXT: {
                  input = makeBettyInput(
                    BettyPrefabs.TEXT,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.INTEGER: {
                  input = makeBettyInput(
                    BettyPrefabs.INTEGER,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.BOOLEAN: {
                  input = makeBettyInput(
                    BettyPrefabs.BOOLEAN,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                case PropertyKind.RICH_TEXT: {
                  input = makeBettyInput(
                    BettyPrefabs.RICH_TEXT,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                  break;
                }
                default: {
                  input = makeBettyInput(
                    BettyPrefabs.STRING,
                    model,
                    property,
                    variable,
                  );
                  input = inputStructure(input, property);
                  structure.descendants.push(input);
                }
              }
              // eslint-disable-next-line no-console
              return console.warn('PropertyKind not found');
            });
          } else {
            structure.descendants.push(cloneStructure(BettyPrefabs.STRING));
          }
          structure.descendants.push(
            cloneStructure(BettyPrefabs.SUBMIT_BUTTON),
          );

          setValidationMessage('');

          if (validate()) {
            const newPrefab = { ...originalPrefab };

            setOption(newPrefab.structure[0], 'actionId', (options) => ({
              ...options,
              value: result.action.actionId,
              configuration: { disabled: true },
            }));

            setOption(newPrefab.structure[0], 'model', (options) => ({
              ...options,
              value: modelId,
              configuration: {
                disabled: true,
              },
            }));

            if (!modelBased) {
              const textInputprefab = structure.descendants.find(
                (descendant: { name: string }) =>
                  descendant.name === 'TextInput',
              );

              const actionVariableOption = textInputprefab.options.find(
                (option: { type: string }) =>
                  option.type === 'ACTION_JS_VARIABLE',
              );

              const textInputVariableId = result.variables[
                Object.keys(result.variables)[0]
              ].find(
                (varArray: { kind: string }) => varArray?.kind === 'STRING',
              ).id;

              setOption(
                textInputprefab,
                actionVariableOption.key,
                (option) => ({
                  ...option,
                  value: textInputVariableId,
                  configuration: {
                    condition: {
                      type: 'SHOW',
                      option: 'actionVariableOption',
                      comparator: 'EQ',
                      value: 'actionVariableOption',
                    },
                  },
                }),
              );
            }

            save(newPrefab);
          }
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
  category: 'FORM',
  icon: Icon.FormIcon,
  interactions,
};

export default prefab('Form', attributes, beforeCreate, [Form('Form', true)]);
