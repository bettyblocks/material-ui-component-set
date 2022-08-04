import * as React from 'react';
import {
  component,
  option,
  prefab,
  PrefabInteraction,
  InteractionType,
  Icon,
  model,
} from '@betty-blocks/component-sdk';
import { FormErrorAlert } from './structures/Alert';

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
  } = helpers;

  const componentId = createUuid();
  const [authProfileId, setAuthProfileId] = React.useState('');
  const [authProfile, setAuthProfile] = React.useState(null);
  const [authProfileInvalid, setAuthProfileInvalid] = React.useState(false);

  const [endpoint, setEndpoint] = React.useState(null);
  const [endpointInvalid, setEndpointInvalid] = React.useState(false);

  const isEmptyEndpoint = (value): boolean =>
    !value || Object.keys(value).length === 0 || value.id === '';
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

          // possible helper: given property kind returns prefab name
          // TODO: add or remove model parameter
          Object.values(result.variables).map(([property, variable]) => {
            const { kind } = property;
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

          const newPrefab = { ...originalPrefab };

          // eslint-disable-next-line @typescript-eslint/no-shadow
          setOption(newPrefab.structure[0], 'actionId', (option) => ({
            ...option,
            value: result.action.actionId,
            configuration: { disabled: true },
          }));

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

const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  modelId: model('Model'),
};

export default prefab('Login Form Beta', attributes, beforeCreate, [
  component(
    'Form Beta',
    { label: 'Login form Beta', options, ref: { id: '#formId' } },
    [FormErrorAlert({ ref: { id: '#alertErrorId' } })],
  ),
]);
