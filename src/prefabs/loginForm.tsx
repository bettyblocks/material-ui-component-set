import * as React from 'react';
import {
  component,
  option,
  prefab,
  BeforeCreateArgs,
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
  helpers,
}: any) => {
  const { createUuid, prepareAction } = helpers;

  const componentId = createUuid();
  const [authProfileId, setAuthProfileId] = React.useState('');
  const [authProfile, setAuthProfile] = React.useState(null);
  const [authProfileInvalid, setAuthProfileInvalid] = React.useState(false);
  console.log('authProfile Prefab', authProfile);

  const [endpoint, setEndpoint] = React.useState(null);
  const [endpointInvalid, setEndpointInvalid] = React.useState(false);
  return (
    <>
      <Header onClose={close} title="CreateFormLoginWizard.title" />
      <Content>
        <Field
          label="CreateFormWizard.selectAuthenticationProfile"
          error={
            authProfileInvalid && (
              <Text color="#e82600">
                CreateFormWizard.selectAuthenticationProfileError
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
          label="CreateFormWizard.selectPage"
          error={
            endpointInvalid && (
              <Text color="#e82600">CreateFormWizard.selectPageError</Text>
            )
          }
        >
          <EndpointSelector
            value={endpoint || ''}
            size="large"
            onChange={(value): void => {
              // setEndpointInvalid(isEmptyEndpoint(value));
              setEndpointInvalid(value);
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
          console.log('auth in onSave', authProfile);

          // if (isEmptyEndpoint(endpoint)) {
          //   setEndpointInvalid(true);
          //   return;
          // }
          // eslint-disable-next-line no-param-reassign
          originalPrefab.structure[0].id = componentId;
          const result = await prepareAction(
            componentId,
            null,
            null,
            'login',
            authProfile,
          );

          console.log('result', result);
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
