import * as React from 'react';
import {
  prefab,
  Icon,
  InteractionType,
  PrefabInteraction,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { Form } from './structures/ActionJSForm';
import { PermissionType } from './types/types';

const beforeCreate = ({
  close,
  components: {
    ButtonGroup,
    ButtonGroupButton,
    ComponentSelector,
    Content,
    Field,
    Footer,
    Header,
    ModelSelector,
    PropertiesSelector,
    Text,
  },
  prefab: originalPrefab,
  save,
  helpers,
}: BeforeCreateArgs) => {
  const {
    BettyPrefabs,
    cloneStructure,
    createBlacklist,
    createUuid,
    makeBettyUpdateInput,
    makeBettyInput,
    prepareAction,
    getPageAuthenticationProfileId,
    getPageName,
    useCurrentPartialId,
    useCurrentPageId,
    setOption,
    camelToSnakeCase,
    useModelQuery,
    PropertyKind,
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
    'BELONGS_TO',
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

  const [modelId, setModelId] = React.useState(null);
  const [model, setModel] = React.useState(null);
  const [idProperty, setIdProperty] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  const [thisPageState, setThisPageState] = React.useState({
    modelId: null,
    component: null,
  });
  const [buttonGroupValue, setButtonGroupValue] = React.useState('anotherPage');

  const permissions: PermissionType = 'inherit';
  const [validationMessage, setValidationMessage] = React.useState('');
  const [anotherPageState, setAnotherPageState] = React.useState({
    modelId: '',
  });
  const pageId = useCurrentPageId();
  const partialId = useCurrentPartialId();
  const componentId = createUuid();
  const pageAuthenticationProfileId = getPageAuthenticationProfileId();
  const pageName = getPageName();
  const modelRequest = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result) => {
      setModel(result.model);
      setIdProperty(result.model.properties.find(({ name }) => name === 'id'));
    },
  });

  const { data } = modelRequest;

  React.useEffect(() => {
    setValidationMessage('');
  }, [buttonGroupValue]);

  const validate = () => {
    if (modelRequest.loading) {
      setValidationMessage(
        'Model details are still loading, please try submitting again.',
      );
      return false;
    }

    switch (buttonGroupValue) {
      case 'anotherPage':
        if (!data || !data.model) {
          setValidationMessage('Model is required.');
          return false;
        }
        if (!anotherPageState.modelId) {
          setValidationMessage('Model id is required.');
          return false;
        }
        break;
      case 'thisPage':
        if (!thisPageState.component) {
          setValidationMessage('Component is required.');
          return false;
        }
        if (!data || !data.model) {
          setValidationMessage('Model is required.');
          return false;
        }
        if (!thisPageState.modelId) {
          setValidationMessage('The selected component does not have a model.');
          return false;
        }
        break;

      default:
        break;
    }
    return true;
  };

  const saveAnotherPage = () => {
    if (!data) {
      // eslint-disable-next-line no-console
      console.error('model query did not complete');
      return;
    }

    if (validate()) {
      const newPrefab = { ...originalPrefab };
      const variableName = `${camelToSnakeCase(data.model.label)}_id`;
      const context = pageId ? { pageId } : { partialId };

      newPrefab.variables = newPrefab.variables || [];

      newPrefab.variables.push({
        ...context,
        kind: 'integer',
        name: variableName,
        ref: {
          id: '#idVariable',
        },
      });

      const structure = newPrefab.structure[0];
      if (structure.type !== 'COMPONENT') {
        // eslint-disable-next-line no-console
        console.error(
          `found "${structure.type}" structure, expected COMPONENT`,
        );
        return;
      }

      setOption(structure, 'model', (option) => ({
        ...option,
        value: anotherPageState.modelId,
      }));

      if (!idProperty) {
        // eslint-disable-next-line no-console
        console.error('unable to set up filter, no id property found');
        return;
      }

      setOption(structure, 'filter', (option) => ({
        ...option,
        value: {
          [(idProperty as any).id]: {
            eq: {
              ref: { id: '#idVariable' },
              name: variableName,
              type: 'VARIABLE',
            },
          },
        },
      }));

      save(newPrefab);
    }
  };

  function saveThisPage() {
    const interaction = {
      name: 'setCurrentRecord',
      sourceEvent:
        thisPageState.component.name === 'DataTable'
          ? 'OnRowClick'
          : 'OnItemClick',
      targetOptionName: 'currentRecord',
      parameters: [
        {
          id: [idProperty.id],
          parameter: 'argument',
        },
      ],
      sourceComponentId: thisPageState.component.id,
      ref: {
        targetComponentId: '#formId',
      },
      type: 'Global' as InteractionType,
    };

    originalPrefab.interactions.push(interaction);
    save(originalPrefab);
  }

  const inputStructure = (inputPrefab: any, prop: any) => {
    if (inputPrefab.type === 'COMPONENT') {
      setOption(inputPrefab, 'property', (options) => ({
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
      <Content>
        <Field
          label="Where is the data coming from?"
          info={
            <Text size="small" color="grey700">
              {buttonGroupValue === 'anotherPage' &&
                'Link from another page to this page, and pass the ID property of the model.'}
              {buttonGroupValue === 'thisPage' &&
                'A component on this page is passing the data to this DataContainer.'}
            </Text>
          }
        >
          <ButtonGroup
            onChange={({ target: { value } }) => {
              setButtonGroupValue(value);
            }}
            value={buttonGroupValue}
            size="large"
          >
            <ButtonGroupButton
              label="Another page"
              value="anotherPage"
              name="dataSourceSelect"
            />
            <ButtonGroupButton
              label="This page"
              value="thisPage"
              name="dataSourceSelect"
            />
          </ButtonGroup>
        </Field>
        {buttonGroupValue === 'anotherPage' && (
          <Field
            label="Model"
            error={
              validationMessage && (
                <Text color="#e82600">{validationMessage}</Text>
              )
            }
            info={
              <Text size="small" color="grey700">
                Select the model where you want to show the data from.
              </Text>
            }
          >
            <ModelSelector
              onChange={(id) => {
                setAnotherPageState((prevState) => ({
                  ...prevState,
                  modelId: id,
                }));
                setModelId(id);
              }}
              margin
              value={anotherPageState.modelId}
            />
          </Field>
        )}
        {buttonGroupValue === 'thisPage' && (
          <Field
            label="Component"
            error={
              validationMessage && (
                <Text color="#e82600">{validationMessage}</Text>
              )
            }
            info={
              <Text size="small" color="grey700">
                Select a component that contains a collection of data, for
                example DataList or DataTable.
              </Text>
            }
          >
            <ComponentSelector
              onChange={(component) => {
                const foundModelId = Object.values<any>(
                  component.options,
                ).reduce(
                  (acc, option) =>
                    option.type === 'MODEL' ||
                    option.type === 'MODEL_AND_RELATION'
                      ? option.value
                      : acc,
                  null,
                );
                setThisPageState((prevState) => ({
                  ...prevState,
                  modelId: foundModelId,
                  component,
                }));
                setModelId(foundModelId);
              }}
              value={thisPageState.component ? thisPageState.component.id : ''}
              placeholder="No components available."
              allowedComponents={['DataTable']}
            />
          </Field>
        )}
      </Content>
      <Content>
        <Field label="select properties">
          <PropertiesSelector
            allowRelations
            disabledKinds={disabledKinds}
            disabledNames={['id', 'created_at', 'updated_at']}
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
          const structure = originalPrefab.structure[0];
          if (structure.type !== 'COMPONENT') {
            // eslint-disable-next-line no-console
            console.error(
              `prefab type "${structure.type}" structure is not of type COMPONENT`,
            );
            return;
          }

          structure.id = componentId;
          const result = await prepareAction(
            componentId,
            idProperty,
            properties,
            'update',
            undefined,
            undefined,
            permissions,
            pageAuthenticationProfileId,
            pageName,
          );

          setOption(structure, 'actionId', (option) => ({
            ...option,
            value: result.action.actionId,
            configuration: { disabled: true },
          }));

          setOption(structure, 'recordVariable', (option) => ({
            ...option,
            value: result.recordInputVariable.id,
          }));

          if (!modelId) {
            // eslint-disable-next-line no-console
            console.error('unable to set model option, no model selected');
            return;
          }
          setOption(structure, 'model', (option) => ({
            ...option,
            value: modelId,
            configuration: {
              disabled: true,
            },
          }));

          // possible helper: given property kind returns prefab name
          Object.values(result.variables).forEach(([property, variable]) => {
            const { kind } = property;
            let input;
            switch (kind) {
              case PropertyKind.BELONGS_TO: {
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
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
                input = makeBettyUpdateInput(
                  BettyPrefabs.STRING,
                  model,
                  property,
                  variable,
                );
                input = inputStructure(input, property);
                structure.descendants.push(input);
              }
            }
          });

          structure.descendants.push(
            cloneStructure(BettyPrefabs.SUBMIT_BUTTON),
          );

          setValidationMessage('');
          switch (buttonGroupValue) {
            case 'anotherPage':
              saveAnotherPage();
              break;
            case 'thisPage':
              saveThisPage();
              break;
            default:
              break;
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
  icon: Icon.UpdateFormIcon,
  interactions,
  variables: [],
};

export default prefab('Update Form', attributes, beforeCreate, [
  Form('Update Form', true),
]);
