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
  },
  prefab: originalPrefab,
  save,
  helpers,
}: any) => {
  const disabledKinds = [
    'AUTO_INCREMENT',
    'BOOLEAN_EXPRESSION',
    'COUNT',
    'DATE_EXPRESSION',
    'DATE_TIME_EXPRESSION',
    'DECIMAL_EXPRESSION',
    'INTEGER_EXPRESSION',
    'LOGIN_TOKEN',
    'MINUTES_EXPRESSION',
    'MULTI_FILE',
    'MULTI_IMAGE',
    'PDF',
    'PRICE_EXPRESSION',
    'SERIAL',
    'SIGNED_PDF',
    'STRING_EXPRESSION',
    'SUM',
    'TEXT_EXPRESSION',
    'ZIPCODE',
    'OBJECT',
  ];

  const {
    BettyPrefabs,
    PropertyKind,
    cloneStructure,
    createUuid,
    makeBettyInput,
    prepareAction,
    getPageAuthenticationProfileId,
    getPageName,
    setOption,
    useModelQuery,
  } = helpers;

  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState(null);
  const [idProperty, setIdProperty] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  const permissions: PermissionType = 'inherit';

  const [validationMessage, setValidationMessage] = React.useState('');
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

  const validate = () => {
    if (modelRequest.loading) {
      setValidationMessage(
        'Model details are still loading, please try submitting again.',
      );
      return false;
    }

    return true;
  };

  return (
    <>
      <Header onClose={close} title="Configure form" />
      <Content>
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
            'create',
            undefined,
            undefined,
            permissions,
            pageAuthenticationProfileId,
            pageName,
          );

          const structure = originalPrefab.structure[0];

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
                    result.relatedModelIds,
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
                    result.relatedModelIds,
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
              case PropertyKind.FILE:
                structure.descendants.push(
                  makeBettyInput(BettyPrefabs.FILE, model, property, variable),
                );
                break;
              case PropertyKind.IMAGE:
                structure.descendants.push(
                  makeBettyInput(BettyPrefabs.IMAGE, model, property, variable),
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
              case PropertyKind.RICH_TEXT:
                structure.descendants.push(
                  makeBettyInput(
                    BettyPrefabs.RICH_TEXT,
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
  icon: Icon.CreateFormIcon,
  interactions,
};

export default prefab('Create Form', attributes, beforeCreate, [
  Form('Create Form', true),
]);
