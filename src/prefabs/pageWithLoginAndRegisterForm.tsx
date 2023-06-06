import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  PrefabReference,
  BeforeCreateArgs,
  PrefabComponent,
  InteractionType,
  PrefabInteraction,
  option,
  sizes,
  wrapper,
  linked,
  size,
  variable,
  text,
  ThemeColor,
  color,
  showIf,
  font,
  buttongroup,
  childSelector,
  component,
  toggle,
  PrefabComponentOption,
  icon,
} from '@betty-blocks/component-sdk';
import {
  Box as BoxPrefab,
  columnOptions,
  Column,
  boxOptions,
  Row,
  rowOptions,
  Grid,
  gridOptions,
  Media,
  mediaOptions,
  textOptions,
  Text as TextComponent,
  Tabs,
  tabsOptions,
  Tab,
  tabOptions,
  FormErrorAlert,
  OpenPageButton,
  openPageButtonOptions,
  submitButtonOptions,
  SubmitButton,
  Alert,
  alertOptions,
} from './structures';
import {
  AuthenticationProfile,
  Endpoint,
  IdPropertyProps,
  ModelProps,
  ModelQuery,
  Properties,
} from './types';
import { options as defaults } from './structures/ActionJSForm/options';

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
      targetComponentId: '#registerAlertErrorId',
      sourceComponentId: '#formId',
    },
  },
  {
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#registerAlertErrorId',
      sourceComponentId: '#registerFormId',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#registerFormId',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#registerBtn',
      sourceComponentId: '#registerFormId',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionDone',
    ref: {
      targetComponentId: '#registerBtn',
      sourceComponentId: '#registerFormId',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#registerFormId',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#registerAlertErrorId',
      sourceComponentId: '#registerFormId',
    },
    type: InteractionType.Custom,
  },
];

const attrs = {
  icon: Icon.LoginFormIcon,
  type: 'page',
  description: 'Page with a ready to use login form, register form and image.',
  detail:
    'It takes a few clicks to set up your login and register page. Connect your model to the forms and feel free to customize your image to your liking.',
  previewUrl: 'https://preview.betty.app/login-and-register',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Login_And_Register.jpg',
  category: 'LAYOUT',
  isPublicPage: true,
  interactions,
};

const beforeCreate = ({
  save,
  close,
  prefab: originalPrefab,
  components: {
    Header,
    Content,
    Footer,
    Field,
    Box,
    Button,
    Text,
    EndpointSelector,
    AuthenticationProfileSelector,
    PropertiesSelector,
  },
  helpers: {
    createUuid,
    createBlacklist,
    prepareAction,
    PropertyKind,
    makeBettyInput,
    BettyPrefabs,
    setOption,
    useModelQuery,
    cloneStructure,
  },
}: BeforeCreateArgs) => {
  const componentId = createUuid();
  const [authProfileId, setAuthProfileId] = React.useState('');
  const [redirectTo, setRedirectTo] = React.useState({});
  const [authProfile, setAuthProfile] = React.useState<AuthenticationProfile>();
  const [showAuthValidation, setShowAuthValidation] = React.useState(false);
  const [showPropertiesValidation, setShowPropertiesValidation] =
    React.useState(false);
  const [showEndpointValidation, setShowEndpointValidation] =
    React.useState(false);
  const [registerProperties, setRegisterProperties] = React.useState<
    Properties[]
  >([]);
  const [stepNumber, setStepNumber] = React.useState(1);
  const [modelProp, setModel] = React.useState<ModelProps>();
  const [endpoint, setEndpoint] = React.useState<Endpoint>();
  const [properties, setProperties] = React.useState<Properties[]>([]);
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();

  function treeSearch(
    dirName: string,
    array: PrefabReference[],
  ): PrefabComponent | undefined {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < array.length; i++) {
      const q = array[i];
      if (q.type === 'COMPONENT') {
        if (q.ref && q.ref.id === dirName) {
          return q;
        }
      }
      if (q.type !== 'PARTIAL' && q.descendants && q.descendants.length) {
        const result = treeSearch(dirName, q.descendants);
        if (result) return result;
      }
    }
    return undefined;
  }

  const modelId = (authProfile && authProfile.loginModel) || '';
  useModelQuery({
    skip: !modelId,
    variables: { id: modelId },
    onCompleted: ({ model: dataModel }: ModelQuery) => {
      setModel(dataModel);
      setIdProperty(
        dataModel.properties.find(
          ({ name }: { name: string }) => name === 'id',
        ),
      );
    },
  });

  function serializeParameters(obj: Object) {
    return Object.entries(obj).map(([name, entry]) => ({
      name,
      value: entry.map((v: JSON) => JSON.stringify(v)),
    }));
  }

  const isEmpty = (value: Properties[]) =>
    !value || Object.keys(value).length === 0;

  const isEmptyEndpoint = (value: Endpoint): boolean =>
    !value || Object.keys(value).length === 0 || value.id === '';

  const disabledKinds = createBlacklist([
    'BOOLEAN',
    'DATE',
    'DATE_TIME',
    'DECIMAL',
    'EMAIL_ADDRESS',
    'ENUM',
    'FILE',
    'FLOAT',
    'GOOGLE_DOCUMENT',
    'HAS_ONE',
    'IBAN',
    'IMAGE',
    'INTEGER',
    'LIST',
    'MINUTES',
    'PASSWORD',
    'PERIODIC_COUNT',
    'PHONE_NUMBER',
    'PRICE',
    'SERIAL',
    'STRING',
    'TEXT',
    'TIME',
    'URL',
    'ZIPCODE',
  ]);

  const stepper = {
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <>
            <Field
              label="Select an authentication profile"
              error={
                showAuthValidation && (
                  <Text color="#e82600">
                    Selecting an authentication profile is required
                  </Text>
                )
              }
            >
              <Text
                size="small"
                color="grey700"
                as="div"
                margin={{ bottom: '0.5rem' }}
              >
                The input fields used in the login form are automatically
                generated based on the username and password property of the
                selected authentication profile.
              </Text>
              <AuthenticationProfileSelector
                onChange={(
                  id: string,
                  authProfileObject: AuthenticationProfile,
                ) => {
                  setShowAuthValidation(false);
                  setAuthProfileId(id);
                  setAuthProfile(authProfileObject);
                }}
                value={authProfileId}
              />
            </Field>
            <Field
              label="Redirect after successful login"
              error={
                showEndpointValidation && (
                  <Text color="#e82600">Selecting an endpoint is required</Text>
                )
              }
            >
              <EndpointSelector
                value={redirectTo}
                size="large"
                onChange={(value: Endpoint): void => {
                  setShowEndpointValidation(isEmptyEndpoint(value));
                  setRedirectTo(value);
                  setEndpoint(value);
                }}
              />
            </Field>
          </>
        );
      }

      if (!authProfile) throw new Error("Can't find auth profile");

      return (
        <Field
          label="Input fields in the register form"
          error={
            showPropertiesValidation && (
              <Text color="#e82600">Select at least one property</Text>
            )
          }
        >
          <Text
            size="small"
            color="grey700"
            as="div"
            margin={{ bottom: '0.5rem' }}
          >
            The selected properties will show up as input fields in the register
            form.
          </Text>
          <PropertiesSelector
            modelId={authProfile.loginModel}
            value={registerProperties}
            onChange={(value: Properties[]) => {
              setRegisterProperties(value);
              setProperties(value);
            }}
            scopedModels={false}
            disabledNames={['created_at', 'updated_at', 'id']}
            disabledKinds={disabledKinds}
          />
        </Field>
      );
    },
    onSave: async () => {
      const newPrefab = { ...originalPrefab };

      const inputStructure = (
        textValue: string,
        inputPrefab: PrefabReference,
      ): PrefabReference => {
        const boxPrefab = cloneStructure('Box');
        if (boxPrefab.type === 'COMPONENT') {
          setOption(
            boxPrefab,
            'innerSpacing',
            (options: PrefabComponentOption) => ({
              ...options,
              value: ['0rem', '0rem', 'M', '0rem'],
            }),
          );
        }
        const textPrefab = cloneStructure('Text');
        if (textPrefab.type === 'COMPONENT') {
          setOption(
            textPrefab,
            'content',
            (options: PrefabComponentOption) => ({
              ...options,
              value: [textValue],
              configuration: { as: 'MULTILINE' },
            }),
          );
          setOption(textPrefab, 'type', (options: PrefabComponentOption) => ({
            ...options,
            value: ['Body1'],
          }));
          setOption(
            textPrefab,
            'outerSpacing',
            (options: PrefabComponentOption) => ({
              ...options,
              value: ['0rem', '0rem', 'S', '0rem'],
            }),
          );
        }
        if (boxPrefab.type === 'COMPONENT') {
          boxPrefab.descendants.push(textPrefab);
          boxPrefab.descendants.push(inputPrefab);
        }

        return boxPrefab;
      };

      if (!authProfile) {
        setShowAuthValidation(true);
        return;
      }

      if (isEmpty(registerProperties)) {
        setShowPropertiesValidation(true);
        return;
      }

      if (!modelProp) throw new Error('Model not found');

      const formObject = treeSearch('#formId', newPrefab.structure);
      const registerFormObject = treeSearch(
        '#registerFormId',
        newPrefab.structure,
      );
      if (!formObject) throw new Error('Login form could not be found');
      formObject.id = componentId;

      if (!registerFormObject)
        throw new Error('Register form could not be found');

      if (!idProperty) throw new Error('Property id is not set');

      const result = await prepareAction(
        componentId,
        idProperty,
        properties,
        'create',
        undefined,
        undefined,
        'public',
      );

      const resultAuth = await prepareAction(
        componentId,
        // this typing is wrong hence the ts ignore
        // @ts-ignore
        undefined,
        null,
        'login',
        authProfile,
      );

      if (authProfile) {
        if (authProfile.properties) {
          if (authProfile.properties[0].kind === 'PASSWORD') {
            authProfile.properties.reverse();
          }

          const loginFormBox = treeSearch(
            '#loginFormBoxRef',
            newPrefab.structure,
          );
          if (!loginFormBox) throw new Error('Login box could not be found');

          const registerFormBox = treeSearch(
            '#registerFormBoxRef',
            newPrefab.structure,
          );
          if (!registerFormBox)
            throw new Error('Register box could not be found');

          Object.values(result.variables).forEach(
            ([prop, inputVariable]): void => {
              const { kind } = prop;
              if (!kind) {
                // eslint-disable-next-line no-console
                console.warn('PropertyKind not found');
              }

              const newInput = () => {
                const bettyInput = (prefabName: string): PrefabReference => {
                  const inputPrefab = makeBettyInput(
                    prefabName,
                    modelProp,
                    prop,
                    inputVariable,
                  );
                  if (inputPrefab.type === 'COMPONENT') {
                    setOption(
                      inputPrefab,
                      'hideLabel',
                      (originalOption: PrefabComponentOption) => ({
                        ...originalOption,
                        value: true,
                      }),
                    );
                    setOption(
                      inputPrefab,
                      'margin',
                      (originalOption: PrefabComponentOption) => ({
                        ...originalOption,
                        value: 'none',
                      }),
                    );
                    setOption(
                      inputPrefab,
                      'required',
                      (originalOption: PrefabComponentOption) => ({
                        ...originalOption,
                        value: true,
                      }),
                    );
                  }
                  return inputPrefab;
                };
                switch (kind) {
                  case PropertyKind.EMAIL_ADDRESS:
                    return inputStructure(
                      prop.label,
                      bettyInput(BettyPrefabs.EMAIL_ADDRESS),
                    );
                  case PropertyKind.PASSWORD:
                    return inputStructure(
                      prop.label,
                      bettyInput(BettyPrefabs.PASSWORD),
                    );
                  case PropertyKind.BOOLEAN:
                    return inputStructure(
                      prop.label,
                      bettyInput(BettyPrefabs.BOOLEAN),
                    );
                  default:
                    return inputStructure(
                      prop.label,
                      bettyInput(BettyPrefabs.STRING),
                    );
                }
              };
              const newInputPrefabs = newInput();

              registerFormBox.descendants.push(newInputPrefabs);
            },
          );

          authProfile.properties.forEach((prop) => {
            const { kind, name } = prop;

            const vari = Object.values(resultAuth.variables).find((v) => {
              // this typing is also wrong probably hence the ts-ignore
              // @ts-ignore
              return v?.name === name;
            });

            const inputPrefabs = () => {
              const bettyInput = (prefabName: string): PrefabReference => {
                if (modelProp !== null && vari && 'options' in vari) {
                  const inputPrefab = makeBettyInput(
                    prefabName,
                    modelProp,
                    prop,
                    vari,
                  );
                  if (inputPrefab.type === 'COMPONENT') {
                    setOption(
                      inputPrefab,
                      'hideLabel',
                      (originalOption: PrefabComponentOption) => ({
                        ...originalOption,
                        value: true,
                      }),
                    );
                    setOption(
                      inputPrefab,
                      'margin',
                      (originalOption: PrefabComponentOption) => ({
                        ...originalOption,
                        value: 'none',
                      }),
                    );
                    setOption(
                      inputPrefab,
                      'required',
                      (originalOption: PrefabComponentOption) => ({
                        ...originalOption,
                        value: true,
                      }),
                    );
                  }
                  return inputPrefab;
                }
                throw new Error('Could not return the prefab');
              };
              switch (kind) {
                case PropertyKind.EMAIL_ADDRESS:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.EMAIL_ADDRESS),
                  );
                case PropertyKind.PASSWORD:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.PASSWORD),
                  );
                default:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.STRING),
                  );
              }
            };
            const formInputPrefabs = inputPrefabs();
            loginFormBox.descendants.push(formInputPrefabs);

            if (!kind) {
              throw new Error('PropertyKind not found');
            }
          });
        }

        if (
          newPrefab.interactions &&
          endpoint &&
          endpoint.params &&
          'parameters' in newPrefab.interactions[0]
        ) {
          newPrefab.interactions[0].parameters = [
            {
              parameter: 'redirectTo',
              pageId: endpoint.pageId,
              endpointId: endpoint.id,
              parameters: serializeParameters(endpoint.params),
            },
          ];
        }

        setOption(formObject, 'actionId', (options: PrefabComponentOption) => ({
          ...options,
          value: resultAuth.action.actionId,
          configuration: { disabled: true },
        }));

        setOption(formObject, 'model', (options: PrefabComponentOption) => ({
          ...options,
          value: authProfile.loginModel,
          configuration: {
            disabled: true,
          },
        }));

        setOption(
          registerFormObject,
          'actionId',
          (options: PrefabComponentOption) => ({
            ...options,
            value: result.action.actionId,
            configuration: { disabled: true },
          }),
        );

        setOption(
          registerFormObject,
          'model',
          (options: PrefabComponentOption) => ({
            ...options,
            value: modelId,
          }),
        );
      }

      save(newPrefab);
    },
    buttons: () => (
      <Box direction="row" justify="between">
        <Box direction="row" margin="2rem">
          <Button
            label="Previous"
            size="large"
            background={{ color: '#f0f1f5' }}
            onClick={() => {
              if (stepNumber === 1) {
                return;
              }
              const newStepnumber = stepNumber - 1;
              setStepNumber(newStepnumber);
            }}
            margin={{ right: '5px' }}
            disabled={stepNumber === 1}
          />
          <Button
            label="Next"
            size="large"
            disabled={stepNumber === stepper.stepAmount}
            onClick={() => {
              if (!authProfile) {
                setShowAuthValidation(true);
                return;
              }
              const newStepnumber = stepNumber + 1;
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </Box>
        <Box>
          <Footer
            onClose={close}
            onSave={stepper.onSave}
            canSave={stepNumber === stepper.stepAmount}
          />
        </Box>
      </Box>
    ),
    progressBar: () => {
      return (
        <Box
          justify="center"
          margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
        >
          <Text size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
            stepper.stepAmount + 1
          }`}</Text>
        </Box>
      );
    },
    stepAmount: 2,
  };

  return (
    <>
      <Header onClose={close} title="Configure login and register form" />
      {stepper.progressBar()}
      <Content>
        <Field>{stepper.setStep(stepNumber)}</Field>
      </Content>
      {stepper.buttons()}
    </>
  );
};

export default makePrefab(
  'User, account login and register',
  attrs,
  beforeCreate,
  [
    Row(
      {
        options: {
          ...rowOptions,
          maxRowWidth: option('CUSTOM', {
            label: 'Width',
            value: 'Full',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                { name: 'S', value: 'S' },
                { name: 'M', value: 'M' },
                { name: 'L', value: 'L' },
                { name: 'XL', value: 'XL' },
                { name: 'Full', value: 'Full' },
              ],
            },
          }),
        },
      },
      [
        Column(
          {
            options: {
              ...columnOptions,
              innerSpacing: sizes('Inner space', {
                value: ['0rem', '0rem', '0rem', '0rem'],
              }),
              columnWidth: option('CUSTOM', {
                label: 'Column width',
                value: '12',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Fit content', value: 'fitContent' },
                    { name: 'Flexible', value: 'flexible' },
                    { name: 'Hidden', value: 'hidden' },
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '7', value: '7' },
                    { name: '8', value: '8' },
                    { name: '9', value: '9' },
                    { name: '10', value: '10' },
                    { name: '11', value: '11' },
                    { name: '12', value: '12' },
                  ],
                },
              }),
              columnWidthTabletLandscape: option('CUSTOM', {
                label: 'Column width (tablet landscape)',
                value: '12',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
                    { name: 'Flexible', value: 'flexible' },
                    { name: 'Hidden', value: 'hidden' },
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '7', value: '7' },
                    { name: '8', value: '8' },
                    { name: '9', value: '9' },
                    { name: '10', value: '10' },
                    { name: '11', value: '11' },
                    { name: '12', value: '12' },
                  ],
                },
              }),
              columnWidthTabletPortrait: option('CUSTOM', {
                label: 'Column width (tablet portrait)',
                value: '12',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
                    { name: 'Flexible', value: 'flexible' },
                    { name: 'Hidden', value: 'hidden' },
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '7', value: '7' },
                    { name: '8', value: '8' },
                    { name: '9', value: '9' },
                    { name: '10', value: '10' },
                    { name: '11', value: '11' },
                    { name: '12', value: '12' },
                  ],
                },
              }),
              columnWidthMobile: option('CUSTOM', {
                label: 'Column width (mobile)',
                value: '12',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: 'Fit content',
                      value: 'fitContent',
                    },
                    { name: 'Flexible', value: 'flexible' },
                    { name: 'Hidden', value: 'hidden' },
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '7', value: '7' },
                    { name: '8', value: '8' },
                    { name: '9', value: '9' },
                    { name: '10', value: '10' },
                    { name: '11', value: '11' },
                    { name: '12', value: '12' },
                  ],
                },
              }),
            },
          },
          [
            Grid(
              {
                options: {
                  ...gridOptions,
                },
              },
              [
                Grid(
                  {
                    options: {
                      ...gridOptions,
                      direction: option('CUSTOM', {
                        value: 'column',
                        label: 'Direction',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Horizontal', value: 'row' },
                            { name: 'Vertical', value: 'column' },
                          ],
                          condition: showIf('type', 'EQ', 'container'),
                        },
                      }),
                    },
                  },
                  [
                    wrapper(
                      {
                        label: 'Login and register',
                        options: {
                          pageTitle: linked({
                            label: 'Page title',
                            value: {
                              ref: {
                                componentId: '#titleTextPrefab',
                                optionId: '#pageTitle',
                              },
                            },
                          }),
                          shownTab: linked({
                            label: 'Show design tab',
                            value: {
                              ref: {
                                componentId: '#formTabs',
                                optionId: '#formTabsSelectedDesignTabIndex',
                              },
                            },
                          }),
                        },
                      },
                      [
                        BoxPrefab(
                          {
                            options: {
                              ...boxOptions,
                              height: size('Height', {
                                value: '100vh',
                                configuration: {
                                  as: 'UNIT',
                                },
                              }),
                              backgroundSize: buttongroup(
                                'Background size',
                                [
                                  ['Initial', 'initial'],
                                  ['Contain', 'contain'],
                                  ['Cover', 'cover'],
                                ],
                                {
                                  value: 'cover',
                                  configuration: {
                                    dataType: 'string',
                                  },
                                },
                              ),
                              backgroundUrl: variable('Background url', {
                                value: [
                                  'https://assets.bettyblocks.com/7730f33d3a624ec6b5383b5dc26c79d6_assets/files/login-background.jpeg',
                                ],
                              }),
                              innerSpacing: sizes('Inner space', {
                                value: ['0rem', '0rem', '0rem', '0rem'],
                              }),
                            },
                          },
                          [
                            Row(
                              {
                                options: {
                                  ...rowOptions,
                                  rowHeight: text('Height', {
                                    value: '100%',
                                    configuration: {
                                      as: 'UNIT',
                                    },
                                  }),
                                  maxRowWidth: option('CUSTOM', {
                                    label: 'Width',
                                    value: 'Full',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'S', value: 'S' },
                                        { name: 'M', value: 'M' },
                                        { name: 'L', value: 'L' },
                                        { name: 'XL', value: 'XL' },
                                        { name: 'Full', value: 'Full' },
                                      ],
                                    },
                                  }),
                                },
                              },
                              [
                                Column(
                                  {
                                    options: {
                                      ...columnOptions,
                                      backgroundColor: color(
                                        'Background color',
                                        {
                                          value: ThemeColor.WHITE,
                                        },
                                      ),
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', 'XL', '0rem', 'XL'],
                                      }),
                                      verticalAlignment: option('CUSTOM', {
                                        label: 'Vertical Alignment',
                                        value: 'center',
                                        configuration: {
                                          as: 'BUTTONGROUP',
                                          dataType: 'string',
                                          allowedInput: [
                                            { name: 'None', value: 'inherit' },
                                            {
                                              name: 'Top',
                                              value: 'flex-start',
                                            },
                                            { name: 'Center', value: 'center' },
                                            {
                                              name: 'Bottom',
                                              value: 'flex-end',
                                            },
                                          ],
                                        },
                                      }),
                                      columnWidth: option('CUSTOM', {
                                        label: 'Column width',
                                        value: '4',
                                        configuration: {
                                          as: 'DROPDOWN',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Fit content',
                                              value: 'fitContent',
                                            },
                                            {
                                              name: 'Flexible',
                                              value: 'flexible',
                                            },
                                            { name: 'Hidden', value: 'hidden' },
                                            { name: '1', value: '1' },
                                            { name: '2', value: '2' },
                                            { name: '3', value: '3' },
                                            { name: '4', value: '4' },
                                            { name: '5', value: '5' },
                                            { name: '6', value: '6' },
                                            { name: '7', value: '7' },
                                            { name: '8', value: '8' },
                                            { name: '9', value: '9' },
                                            { name: '10', value: '10' },
                                            { name: '11', value: '11' },
                                            { name: '12', value: '12' },
                                          ],
                                        },
                                      }),
                                      columnWidthTabletLandscape: option(
                                        'CUSTOM',
                                        {
                                          label:
                                            'Column width (tablet landscape)',
                                          value: '6',
                                          configuration: {
                                            as: 'DROPDOWN',
                                            dataType: 'string',
                                            allowedInput: [
                                              {
                                                name: 'Fit content',
                                                value: 'fitContent',
                                              },
                                              {
                                                name: 'Flexible',
                                                value: 'flexible',
                                              },
                                              {
                                                name: 'Hidden',
                                                value: 'hidden',
                                              },
                                              { name: '1', value: '1' },
                                              { name: '2', value: '2' },
                                              { name: '3', value: '3' },
                                              { name: '4', value: '4' },
                                              { name: '5', value: '5' },
                                              { name: '6', value: '6' },
                                              { name: '7', value: '7' },
                                              { name: '8', value: '8' },
                                              { name: '9', value: '9' },
                                              { name: '10', value: '10' },
                                              { name: '11', value: '11' },
                                              { name: '12', value: '12' },
                                            ],
                                          },
                                        },
                                      ),
                                      columnWidthTabletPortrait: option(
                                        'CUSTOM',
                                        {
                                          label:
                                            'Column width (tablet portrait)',
                                          value: '12',
                                          configuration: {
                                            as: 'DROPDOWN',
                                            dataType: 'string',
                                            allowedInput: [
                                              {
                                                name: 'Fit content',
                                                value: 'fitContent',
                                              },
                                              {
                                                name: 'Flexible',
                                                value: 'flexible',
                                              },
                                              {
                                                name: 'Hidden',
                                                value: 'hidden',
                                              },
                                              { name: '1', value: '1' },
                                              { name: '2', value: '2' },
                                              { name: '3', value: '3' },
                                              { name: '4', value: '4' },
                                              { name: '5', value: '5' },
                                              { name: '6', value: '6' },
                                              { name: '7', value: '7' },
                                              { name: '8', value: '8' },
                                              { name: '9', value: '9' },
                                              { name: '10', value: '10' },
                                              { name: '11', value: '11' },
                                              { name: '12', value: '12' },
                                            ],
                                          },
                                        },
                                      ),
                                      columnWidthMobile: option('CUSTOM', {
                                        label: 'Column width (mobile)',
                                        value: '12',
                                        configuration: {
                                          as: 'DROPDOWN',
                                          dataType: 'string',
                                          allowedInput: [
                                            {
                                              name: 'Fit content',
                                              value: 'fitContent',
                                            },
                                            {
                                              name: 'Flexible',
                                              value: 'flexible',
                                            },
                                            { name: 'Hidden', value: 'hidden' },
                                            { name: '1', value: '1' },
                                            { name: '2', value: '2' },
                                            { name: '3', value: '3' },
                                            { name: '4', value: '4' },
                                            { name: '5', value: '5' },
                                            { name: '6', value: '6' },
                                            { name: '7', value: '7' },
                                            { name: '8', value: '8' },
                                            { name: '9', value: '9' },
                                            { name: '10', value: '10' },
                                            { name: '11', value: '11' },
                                            { name: '12', value: '12' },
                                          ],
                                        },
                                      }),
                                    },
                                  },
                                  [
                                    BoxPrefab(
                                      {
                                        options: {
                                          ...boxOptions,
                                          innerSpacing: sizes('Inner space', {
                                            value: ['0rem', 'XL', '0rem', 'XL'],
                                          }),
                                        },
                                      },
                                      [
                                        BoxPrefab(
                                          {
                                            options: {
                                              ...boxOptions,
                                              innerSpacing: sizes(
                                                'Inner space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            Media({
                                              options: {
                                                ...mediaOptions,
                                                width: size('Width', {
                                                  value: '',
                                                  configuration: {
                                                    as: 'UNIT',
                                                  },
                                                }),
                                                type: option('CUSTOM', {
                                                  label: 'Media type',
                                                  value: 'url',
                                                  configuration: {
                                                    as: 'BUTTONGROUP',
                                                    dataType: 'string',
                                                    allowedInput: [
                                                      {
                                                        name: 'Image',
                                                        value: 'img',
                                                      },
                                                      {
                                                        name: 'Data/URL',
                                                        value: 'url',
                                                      },
                                                      {
                                                        name: 'Video',
                                                        value: 'video',
                                                      },
                                                      {
                                                        name: 'I-frame',
                                                        value: 'iframe',
                                                      },
                                                    ],
                                                  },
                                                }),
                                                urlFileSource: variable(
                                                  'Source',
                                                  {
                                                    value: [
                                                      'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_B.svg',
                                                    ],
                                                    configuration: {
                                                      placeholder:
                                                        'Starts with https:// or http://',
                                                      as: 'MULTILINE',
                                                      condition: showIf(
                                                        'type',
                                                        'EQ',
                                                        'url',
                                                      ),
                                                    },
                                                  },
                                                ),
                                              },
                                            }),
                                          ],
                                        ),
                                        BoxPrefab(
                                          {
                                            options: {
                                              ...boxOptions,
                                              height: size('Height', {
                                                value: '6vh',
                                                configuration: {
                                                  as: 'UNIT',
                                                },
                                              }),
                                              width: size('Width', {
                                                value: '100%',
                                                configuration: {
                                                  as: 'UNIT',
                                                },
                                              }),
                                              innerSpacing: sizes(
                                                'Inner space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [],
                                        ),
                                        BoxPrefab(
                                          {
                                            options: {
                                              ...boxOptions,
                                              innerSpacing: sizes(
                                                'Inner space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            TextComponent(
                                              {
                                                ref: { id: '#titleTextPrefab' },
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    ref: { id: '#pageTitle' },
                                                    value: [
                                                      'Login and register flow',
                                                    ],
                                                    configuration: {
                                                      as: 'MULTILINE',
                                                    },
                                                  }),
                                                  type: font('Text style', {
                                                    value: ['Title4'],
                                                  }),
                                                },
                                              },
                                              [],
                                            ),
                                          ],
                                        ),
                                        BoxPrefab({
                                          options: {
                                            ...boxOptions,
                                            height: size('Height', {
                                              value: '2vh',
                                              configuration: {
                                                as: 'UNIT',
                                              },
                                            }),
                                            width: size('Width', {
                                              value: '100%',
                                              configuration: {
                                                as: 'UNIT',
                                              },
                                            }),
                                            innerSpacing: sizes('Inner space', {
                                              value: [
                                                '0rem',
                                                '0rem',
                                                '0rem',
                                                '0rem',
                                              ],
                                            }),
                                          },
                                        }),
                                        BoxPrefab(
                                          {
                                            options: {
                                              ...boxOptions,
                                              innerSpacing: sizes(
                                                'Inner space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            Tabs(
                                              {
                                                ref: {
                                                  id: '#formTabs',
                                                },
                                                options: {
                                                  ...tabsOptions,
                                                  appBarColor: color(
                                                    'Bar color',
                                                    {
                                                      value:
                                                        ThemeColor.TRANSPARENT,
                                                    },
                                                  ),
                                                  selectedDesignTabIndex:
                                                    childSelector(
                                                      'Selected tab (design)',
                                                      {
                                                        value: 1,
                                                        ref: {
                                                          id: '#formTabsSelectedDesignTabIndex',
                                                        },
                                                      },
                                                    ),
                                                  textColor: color(
                                                    'Text color',
                                                    {
                                                      value: ThemeColor.PRIMARY,
                                                    },
                                                  ),
                                                  indicatorColor: color(
                                                    'Indicator color',
                                                    {
                                                      value: ThemeColor.PRIMARY,
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                Tab(
                                                  {
                                                    label: 'Login tab',
                                                    options: {
                                                      ...tabOptions,
                                                      label: variable(
                                                        'Login tab',
                                                        {
                                                          value: ['Login'],
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    component(
                                                      'Form',
                                                      {
                                                        options: defaults,
                                                        ref: { id: '#formId' },
                                                      },
                                                      [
                                                        FormErrorAlert({
                                                          ref: {
                                                            id: '#alertErrorId',
                                                          },
                                                        }),
                                                        BoxPrefab({
                                                          options: {
                                                            ...boxOptions,
                                                            innerSpacing: sizes(
                                                              'Inner space',
                                                              {
                                                                value: [
                                                                  'S',
                                                                  '0rem',
                                                                  '0rem',
                                                                  '0rem',
                                                                ],
                                                              },
                                                            ),
                                                          },
                                                          ref: {
                                                            id: '#loginFormBoxRef',
                                                          },
                                                        }),
                                                        BoxPrefab(
                                                          {
                                                            options: {
                                                              ...boxOptions,
                                                              innerSpacing:
                                                                sizes(
                                                                  'Inner space',
                                                                  {
                                                                    value: [
                                                                      '0rem',
                                                                      '0rem',
                                                                      '0rem',
                                                                      '0rem',
                                                                    ],
                                                                  },
                                                                ),
                                                            },
                                                          },
                                                          [
                                                            BoxPrefab(
                                                              {
                                                                options: {
                                                                  ...boxOptions,
                                                                  innerSpacing:
                                                                    sizes(
                                                                      'Inner space',
                                                                      {
                                                                        value: [
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  alignment:
                                                                    buttongroup(
                                                                      'Alignment',
                                                                      [
                                                                        [
                                                                          'None',
                                                                          'none',
                                                                        ],
                                                                        [
                                                                          'Left',
                                                                          'flex-start',
                                                                        ],
                                                                        [
                                                                          'Center',
                                                                          'center',
                                                                        ],
                                                                        [
                                                                          'Right',
                                                                          'flex-end',
                                                                        ],
                                                                        [
                                                                          'Justified',
                                                                          'space-between',
                                                                        ],
                                                                      ],
                                                                      {
                                                                        value:
                                                                          'flex-end',
                                                                        configuration:
                                                                          {
                                                                            dataType:
                                                                              'string',
                                                                          },
                                                                      },
                                                                    ),
                                                                },
                                                              },
                                                              [
                                                                OpenPageButton(
                                                                  {
                                                                    options: {
                                                                      ...openPageButtonOptions,
                                                                      buttonText:
                                                                        variable(
                                                                          'Button text',
                                                                          {
                                                                            value:
                                                                              [
                                                                                'I forgot my password',
                                                                              ],
                                                                          },
                                                                        ),
                                                                    },
                                                                    style: {
                                                                      overwrite:
                                                                        {
                                                                          backgroundColor:
                                                                            {
                                                                              type: 'STATIC',
                                                                              value:
                                                                                'transparent',
                                                                            },
                                                                          boxShadow:
                                                                            'none',
                                                                          color:
                                                                            {
                                                                              type: 'THEME_COLOR',
                                                                              value:
                                                                                'dark',
                                                                            },
                                                                          fontFamily:
                                                                            'Roboto',
                                                                          fontSize:
                                                                            '0.875rem',
                                                                          fontStyle:
                                                                            'none',
                                                                          fontWeight:
                                                                            '500',
                                                                          padding:
                                                                            [
                                                                              '0.6875rem',
                                                                              '0rem',
                                                                              '0.6875rem',
                                                                              '1.375rem',
                                                                            ],
                                                                          textDecoration:
                                                                            'none',
                                                                          textTransform:
                                                                            'none',
                                                                        },
                                                                    },
                                                                  },
                                                                  [],
                                                                ),
                                                              ],
                                                            ),
                                                            SubmitButton(
                                                              {
                                                                options: {
                                                                  ...submitButtonOptions,
                                                                  buttonText:
                                                                    variable(
                                                                      'Button text',
                                                                      {
                                                                        value: [
                                                                          'Login',
                                                                        ],
                                                                      },
                                                                    ),
                                                                  fullWidth:
                                                                    toggle(
                                                                      'Full width',
                                                                      {
                                                                        value:
                                                                          true,
                                                                      },
                                                                    ),
                                                                  outerSpacing:
                                                                    sizes(
                                                                      'Outer space',
                                                                      {
                                                                        value: [
                                                                          'M',
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                        ],
                                                                      },
                                                                    ),
                                                                },
                                                                style: {
                                                                  overwrite: {
                                                                    backgroundColor:
                                                                      {
                                                                        type: 'THEME_COLOR',
                                                                        value:
                                                                          'primary',
                                                                      },
                                                                    boxShadow:
                                                                      'none',
                                                                    color: {
                                                                      type: 'THEME_COLOR',
                                                                      value:
                                                                        'white',
                                                                    },
                                                                    fontFamily:
                                                                      'Roboto',
                                                                    fontSize:
                                                                      '0.875rem',
                                                                    fontStyle:
                                                                      'none',
                                                                    fontWeight:
                                                                      '400',
                                                                    padding: [
                                                                      '0.6875rem',
                                                                      '1.375rem',
                                                                    ],
                                                                    textDecoration:
                                                                      'none',
                                                                    textTransform:
                                                                      'none',
                                                                  },
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                                Tab(
                                                  {
                                                    label: 'Register tab',
                                                    options: {
                                                      ...tabOptions,
                                                      label: variable(
                                                        'Register tab',
                                                        {
                                                          value: ['Register'],
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    component(
                                                      'Form',
                                                      {
                                                        options: defaults,
                                                        ref: {
                                                          id: '#registerFormId',
                                                        },
                                                      },
                                                      [
                                                        Alert({
                                                          ref: {
                                                            id: '#alertSuccessId',
                                                          },
                                                          options: {
                                                            ...alertOptions,
                                                            icon: icon('Icon', {
                                                              value:
                                                                'CheckCircle',
                                                            }),
                                                            titleText: variable(
                                                              'Title text',
                                                              {
                                                                value: [
                                                                  'Success',
                                                                ],
                                                              },
                                                            ),
                                                            bodyText: variable(
                                                              'Body text',
                                                              {
                                                                value: [
                                                                  'Your account has been created, you can now login',
                                                                ],
                                                              },
                                                            ),
                                                            textColor: color(
                                                              'Text color',
                                                              {
                                                                value:
                                                                  ThemeColor.WHITE,
                                                              },
                                                            ),
                                                            iconColor: color(
                                                              'Icon color',
                                                              {
                                                                value:
                                                                  ThemeColor.WHITE,
                                                              },
                                                            ),
                                                            collapsable: toggle(
                                                              'Collapsable',
                                                              {
                                                                value: true,
                                                              },
                                                            ),
                                                            visible: toggle(
                                                              'Toggle visibility',
                                                              {
                                                                value: false,
                                                                configuration: {
                                                                  as: 'VISIBILITY',
                                                                },
                                                              },
                                                            ),
                                                          },
                                                        }),
                                                        FormErrorAlert({
                                                          ref: {
                                                            id: '#registerAlertErrorId',
                                                          },
                                                        }),
                                                        BoxPrefab(
                                                          {
                                                            ref: {
                                                              id: '#registerFormBoxRef',
                                                            },

                                                            options: {
                                                              ...boxOptions,
                                                              innerSpacing:
                                                                sizes(
                                                                  'Inner space',
                                                                  {
                                                                    value: [
                                                                      'S',
                                                                      '0rem',
                                                                      '0rem',
                                                                      '0rem',
                                                                    ],
                                                                  },
                                                                ),
                                                            },
                                                          },
                                                          [],
                                                        ),
                                                        SubmitButton({
                                                          ref: {
                                                            id: '#registerBtn',
                                                          },
                                                          options: {
                                                            ...submitButtonOptions,
                                                            buttonText:
                                                              variable(
                                                                'Button text',
                                                                {
                                                                  value: [
                                                                    'Create account',
                                                                  ],
                                                                },
                                                              ),
                                                            fullWidth: toggle(
                                                              'Full width',
                                                              {
                                                                value: true,
                                                              },
                                                            ),
                                                            outerSpacing: sizes(
                                                              'Outer space',
                                                              {
                                                                value: [
                                                                  'M',
                                                                  '0rem',
                                                                  '0rem',
                                                                  '0rem',
                                                                ],
                                                              },
                                                            ),
                                                          },
                                                          style: {
                                                            overwrite: {
                                                              backgroundColor: {
                                                                type: 'THEME_COLOR',
                                                                value:
                                                                  'primary',
                                                              },
                                                              boxShadow: 'none',
                                                              color: {
                                                                type: 'THEME_COLOR',
                                                                value: 'white',
                                                              },
                                                              fontFamily:
                                                                'Roboto',
                                                              fontSize:
                                                                '0.875rem',
                                                              fontStyle: 'none',
                                                              fontWeight: '400',
                                                              padding: [
                                                                '0.6875rem',
                                                                '1.375rem',
                                                              ],
                                                              textDecoration:
                                                                'none',
                                                              textTransform:
                                                                'none',
                                                            },
                                                          },
                                                        }),
                                                      ],
                                                    ),
                                                  ],
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ],
    ),
  ],
);
