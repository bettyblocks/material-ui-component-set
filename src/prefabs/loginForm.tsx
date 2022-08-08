import * as React from 'react';
import {
  Icon,
  InteractionType,
  PrefabInteraction,
  prefab,
} from '@betty-blocks/component-sdk';
import { Form } from './structures/ActionJSForm';

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

  const isEmptyEndpoint = (value): boolean =>
    !value || Object.keys(value).length === 0 || value.id === '';

  const modelId = (authProfile && authProfile.loginModel) || '';

  useModelQuery({
    skip: !modelId,
    variables: { id: modelId },
    onCompleted: (result) => {
      setModel(result.model);
    },
  });

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

          // eslint-disable-next-line no-param-reassign
          originalPrefab.structure[0].id = componentId;
          const result = await prepareAction(
            componentId,
            null,
            null,
            'login',
            authProfile,
          );

          const structure = originalPrefab.structure[0];

          if (authProfile.properties[0].kind === 'PASSWORD') {
            authProfile.properties.reverse();
          }

          authProfile.properties.forEach((property) => {
            const { kind, name } = property;
            const variable = result.variables.find(
              (foundVariable) => foundVariable.name === name,
            );

            switch (kind) {
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

          // eslint-disable-next-line @typescript-eslint/no-shadow
          setOption(newPrefab.structure[0], 'actionId', (options) => ({
            ...options,
            value: result.action.actionId,
            configuration: { disabled: true },
          }));

          if (authProfile) {
            setOption(newPrefab.structure[0], 'modelId', (options) => ({
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
  category: 'FORMV2',
  icon: Icon.LoginFormIcon,
  interactions,
};

export default prefab('Login Form Beta', attributes, beforeCreate, [
  Form('Login Form Beta'),
]);
