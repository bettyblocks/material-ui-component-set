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
  prefabs,
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
    useCreateEndpointVariable,
    useEndpointVariable,
    useModelQuery,
  } = helpers;
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState(null);
  const [idProperty, setIdProperty] = React.useState('');
  const [properties, setProperties] = React.useState([]);
  const [hasErrors, setHasErrors] = React.useState(false);
  const [thisPageState, setThisPageState] = React.useState({
    modelId: null,
    component: null,
  });
  const [buttonGroupValue, setButtonGroupValue] = React.useState('anotherPage');
  const componentId = createUuid();
  const skipModelQuery = !modelId || !!(model && model.id === modelId);

  const endpointVarsRequest = useEndpointVariables();
  const [
    mutation,
    createEndpointVarRequest,
  ] = useCreateEndpointVariable();

  const modelRequest = useModelQuery({
    variables: { id: modelId },
    skip: skipModelQuery,
    onCompleted: (result) => {
      setModel(result.model);
      setIdProperty(result.model.properties.find(({ name }) => name === 'id'));
    },
  });

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
          label="where is the data coming from?"
          info={
            <Text size="small" color="grey700">
              {buttonGroupValue === 'anotherPage' &&
                'Link from another page to this page, and pass the ID property of the model.'}
              {buttonGroupValue === 'thisPage' &&
                `A component on this page is passing the data to this ${originalPrefab.name}.`}
              {buttonGroupValue === 'loggedInUser' &&
                `Data from the logged in user can be used inside this ${originalPrefab.name}`}
            </Text>
          }
        >
          <ButtonGroup
            onChange={({ target: { value } }): void => {
              setButtonGroupValue(value);
              setModelId('');
            }}
            value={buttonGroupValue}
            size="large"
          >
            <ButtonGroupButton
              label="another page"
              value="anotherPage"
              name="dataSourceSelect"
            />
            <ButtonGroupButton
              label="this page"
              value="thisPage"
              name="dataSourceSelect"
            />
          </ButtonGroup>
        </Field>

        <Field label="select model">
          {buttonGroupValue === 'anotherPage' && (
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
          )}
          {buttonGroupValue === 'thisPage' && (
            <ComponentSelector
              onChange={(component): void => {
                const foundModelId = Object.values<any>(
                  component.options,
                ).reduce(
                  (acc, componentOption) =>
                    componentOption.type === 'MODEL' ||
                    componentOption.type === 'MODEL_AND_RELATION'
                      ? componentOption.value
                      : acc,
                  null,
                );
                setIdProperty(foundModelId);
                setThisPageState((prevState) => ({
                  ...prevState,
                  modelId: foundModelId,
                  component,
                }));
                setModelId(foundModelId as string);
                setProperties([]);
              }}
              value={thisPageState.component ? thisPageState.component.id : ''}
              placeholder="No components available."
              allowedComponents={['DataTable', 'DataList']}
            />
          )}
        </Field>
        <Field label="select properties">
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

          if (buttonGroupValue === 'anotherPage') {
            // const ifRefactor = !!filter.__or;
            // let finalFilter;
            // if (ifRefactor) {
            //     finalFilter = {
            //         __and: [
            //             where,
            //             ...filter.__or;
            //         ]
            //     }
            // } else {
            //   finalFilter = [...filter.__and, where]
            // }
            // setOption(structure, 'filter', (option) => ({
            //   ...option,
            //   value: filter as any,
            // }));
          }

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

          let interaction;
          if (buttonGroupValue === 'thisPage') {
            const inheritComponent = thisPageState.component;
            interaction = {
              sourceEvent:
                inheritComponent.name === 'DataTable'
                  ? 'sendRowId'
                  : 'sendItemId',
              name: 'setFormRecord',
              parameters: [
                {
                  id: componentId,
                  parameter: 'argument',
                },
              ],
              type: 'Custom',
              sourceComponentId: inheritComponent.id,
              targetComponentId: componentId,
            };
          }

          if (interaction) {
            originalPrefab.interactions.push(interaction);
          }

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
  interactions: [],
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
