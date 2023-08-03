import * as React from 'react';
import {
  Icon,
  InteractionType,
  PrefabInteraction,
  prefab,
} from '@betty-blocks/component-sdk';
import { Form } from './structures/ActionJSForm';
import { PermissionType } from './types/types';

const beforeCreate = ({
  close,
  components: {
    AuthenticationProfileSelector,
    Content,
    EndpointSelector,
    Field,
    Footer,
    Header,
    Text,
  },
  prefab: originalPrefab,
  save,
  helpers,
}: any) => {
  const {
    createUuid,
    prepareAction,
    PropertyKind,
    makeBettyInput,
    getPageName,
    BettyPrefabs,
    setOption,
    cloneStructure,
    useModelQuery,
  } = helpers;

  const componentId = createUuid();
  const [authProfileId, setAuthProfileId] = React.useState('');
  const [authProfile, setAuthProfile] = React.useState(null);
  const [authProfileInvalid, setAuthProfileInvalid] = React.useState(false);
  const [endpoint, setEndpoint] = React.useState(null);
  const [endpointInvalid, setEndpointInvalid] = React.useState(false);
  const [model, setModel] = React.useState(null);

  const permissions: PermissionType = 'public';

  const isEmptyEndpoint = (value): boolean =>
    !value || Object.keys(value).length === 0 || value.id === '';

  const modelId = (authProfile && authProfile.loginModel) || '';
  const pageName = getPageName();

  useModelQuery({
    skip: !modelId,
    variables: { id: modelId },
    onCompleted: (result) => {
      setModel(result.model);
    },
  });

  function serializeParameters(obj: Object) {
    return Object.entries(obj).map(([name, entry]) => ({
      name,
      value: entry.map((v) => JSON.stringify(v)),
    }));
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
      <Header onClose={close} title="Configure login form" />
      <Content>
        <Field
          label="Authentication profile"
          error={
            authProfileInvalid && (
              <Text color="#e82600">
                Selecting an authentication profile is required
              </Text>
            )
          }
        >
          <AuthenticationProfileSelector
            onChange={(
              authenticationProfileId,
              authenticationProfileObject,
            ): void => {
              setAuthProfileInvalid(false);
              setAuthProfileId(authenticationProfileId);
              setAuthProfile(authenticationProfileObject);
            }}
            value={authProfileId}
          />
        </Field>
        <Field
          label="Redirect page"
          error={
            endpointInvalid && (
              <Text color="#e82600">Selecting a page is required</Text>
            )
          }
        >
          <EndpointSelector
            value={endpoint || ''}
            size="large"
            onChange={(value): void => {
              setEndpointInvalid(isEmptyEndpoint(value));
              setEndpoint(value);
            }}
          />
        </Field>
      </Content>
      <Footer
        onClose={close}
        onSave={async (): Promise<void> => {
          if (!authProfileId) {
            setAuthProfileInvalid(true);
            return;
          }

          if (isEmptyEndpoint(endpoint)) {
            setEndpointInvalid(true);
            return;
          }

          if (!model) {
            // eslint-disable-next-line no-console
            console.warn('Model not found');
          }

          const pageAuthenticationProfileId = undefined;

          // eslint-disable-next-line no-param-reassign
          originalPrefab.structure[0].id = componentId;
          const result = await prepareAction(
            componentId,
            null,
            null,
            'login',
            authProfile,
            undefined,
            permissions,
            pageAuthenticationProfileId,
            pageName,
          );

          const structure = originalPrefab.structure[0];

          if (authProfile.properties[0].kind === 'PASSWORD') {
            authProfile.properties.reverse();
          }

          authProfile.properties.forEach((property) => {
            const { kind, name } = property;
            let input;
            const variable = result.variables.find(
              (foundVariable) => foundVariable.name === name,
            );

            switch (kind) {
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
              default:
                break;
            }
            // eslint-disable-next-line no-console
            return console.warn('PropertyKind not found');
          });

          structure.descendants.push(
            cloneStructure(BettyPrefabs.SUBMIT_BUTTON),
          );

          const newPrefab = { ...originalPrefab };

          newPrefab.interactions[0].parameters = [
            {
              parameter: 'redirectTo',
              pageId: endpoint.pageId,
              endpointId: endpoint.id,
              parameters: serializeParameters(endpoint.params),
            },
          ];

          // eslint-disable-next-line @typescript-eslint/no-shadow
          setOption(newPrefab.structure[0], 'actionId', (options) => ({
            ...options,
            value: result.action.actionId,
            configuration: { disabled: true },
          }));

          if (authProfile) {
            setOption(newPrefab.structure[0], 'model', (options) => ({
              ...options,
              value: authProfile.loginModel,
              configuration: {
                disabled: true,
              },
            }));
          }

          save(newPrefab);
        }}
      />
    </>
  );
};

const interactions: PrefabInteraction[] = [
  {
    type: InteractionType.Global,
    name: 'login',
    sourceEvent: 'onActionSuccess',
    ref: {
      sourceComponentId: '#formId',
    },
    parameters: [],
  },
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
  icon: Icon.LoginFormIcon,
  interactions,
};

export default prefab('Login Form', attributes, beforeCreate, [
  Form('Login Form'),
]);
