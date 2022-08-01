import * as React from 'react';
import {
  prefab,
  Icon,
  InteractionType,
  PrefabInteraction,
} from '@betty-blocks/component-sdk';
import { Form } from './structures/ActionJSForm';

const beforeCreate = ({
  close,
  components: {
    Box,
    ButtonGroup,
    ButtonGroupButton,
    ComponentSelector,
    Content,
    Field,
    Footer,
    GrommetAlertIcon,
    Header,
    ModelSelector,
    PropertiesSelector,
    Text,
  },
  prefab: originalPrefab,
  save,
  helpers,
}: any) => {
  const {
    BettyPrefabs,
    PropertyKind,
    cloneStructure,
    createUuid,
    makeBettyInput,
    prepareAction,
    useCurrentPartialId,
    useCurrentPageId,
    setOption,
    camelToSnakeCase,
    useModelQuery,
  } = helpers;

  const [modelId, setModelId] = React.useState(null);
  const [model, setModel] = React.useState(null);
  const [idProperty, setIdProperty] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  const [hasErrors, setHasErrors] = React.useState(false);
  const [thisPageState, setThisPageState] = React.useState({
    modelId: null,
    component: null,
  });
  const [buttonGroupValue, setButtonGroupValue] = React.useState('anotherPage');

  const [validationMessage, setValidationMessage] = React.useState('');
  const [anotherPageState, setAnotherPageState] = React.useState({
    modelId: '',
  });
  const pageId = useCurrentPageId();
  const partialId = useCurrentPartialId();
  const componentId = createUuid();

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
    if (validate()) {
      const newPrefab = { ...originalPrefab };
      const variableName = `${camelToSnakeCase(data.model.label)}_id`;
      const context = pageId ? { pageId } : { partialId };

      newPrefab.variables.push({
        ...context,
        kind: 'integer',
        name: variableName,
        ref: {
          id: '#idVariable',
        },
      });

      setOption(newPrefab.structure[0], 'model', (option) => ({
        ...option,
        value: anotherPageState.modelId,
      }));

      setOption(newPrefab.structure[0], 'filter', (option) => ({
        ...option,
        value: {
          [idProperty.id]: {
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
    let sourceEvent;
    switch (thisPageState.component.name) {
      case 'DataTable': {
        sourceEvent = 'OnRowClick';
        break;
      }
      case 'DataList': {
        sourceEvent = 'sendItemId';
        break;
      }

      default: {
        sourceEvent = 'OnItemClick';
      }
    }

    const interaction = {
      name: 'Filter',
      sourceEvent,
      parameters: [
        {
          id: [idProperty.id],
          parameter: 'property',
          resolveValue: false,
          operator: 'eq',
        },
      ],
      sourceComponentId: thisPageState.component.id,
      ref: {
        targetComponentId: '#formId',
      },
      type: 'Custom',
    };

    originalPrefab.interactions.push(interaction);
    save(originalPrefab);
  }

  return (
    <>
      <Header onClose={close} title="Configure form" />
      {hasErrors && (
        <Box>
          <GrommetAlertIcon />
          <Text color="orange">An error has occured, contact support</Text>
        </Box>
      )}
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
              allowedComponents={['DataTable', 'DataList']}
            />
          </Field>
        )}
      </Content>
      <Content>
        <Field label="select properties">
          <PropertiesSelector
            allowRelations
            disabledKinds={[]}
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
          // eslint-disable-next-line no-param-reassign
          originalPrefab.structure[0].id = componentId;
          const result = await prepareAction(
            componentId,
            idProperty,
            properties,
            'update',
          );
          const structure = originalPrefab.structure[0];

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
            const { kind } = property;
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
            // eslint-disable-next-line no-console
            return console.warn('PropertyKind not found');
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
  category: 'FORMV2',
  icon: Icon.UpdateFormIcon,
  interactions,
  variables: [],
};

export default prefab('Update Form Beta', attributes, beforeCreate, [Form()]);
