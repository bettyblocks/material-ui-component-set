import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  showIfTrue,
  option,
  PrefabReference,
  text,
  sizes,
  size,
  showIf,
  wrapper,
  linked,
  toggle,
  ThemeColor,
  color,
  variable,
  font,
  PrefabInteraction,
  InteractionType,
  BeforeCreateArgs,
  PrefabComponent,
  PrefabComponentOption,
  icon,
  component,
  model,
  filter,
  childSelector,
  buttongroup,
} from '@betty-blocks/component-sdk';
import {
  Box as prefabBox,
  Text as TextPrefab,
  AppBar,
  appBarOptions,
  boxOptions,
  Column,
  columnOptions,
  Row,
  rowOptions,
  Grid,
  gridOptions,
  textOptions,
  OpenPageButton,
  openPageButtonOptions,
  DataContainer,
  Avatar,
  avatarOptions,
  Divider,
  dividerOptions,
  Tab,
  Tabs,
  tabsOptions,
  tabOptions,
  Alert,
  alertOptions,
  SubmitButton,
  submitButtonOptions,
  TextInput,
  textInputOptions,
} from './structures';
import {
  AuthenticationProfile,
  IdPropertyProps,
  ModelProps,
  ModelQuery,
  Properties,
  PermissionType,
} from './types';

const interactions: PrefabInteraction[] = [
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#activeChangePasswordButton',
      sourceComponentId: '#changePasswordButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#activePersonalDetailsButton',
      sourceComponentId: '#changePasswordButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#changePasswordButton',
      sourceComponentId: '#changePasswordButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#personalDetailsButton',
      sourceComponentId: '#changePasswordButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#changePasswordButton',
      sourceComponentId: '#personalDetailsButton',
    },
    type: InteractionType.Custom,
  },

  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#activeChangePasswordButton',
      sourceComponentId: '#personalDetailsButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#personalDetailsButton',
      sourceComponentId: '#personalDetailsButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#activePersonalDetailsButton',
      sourceComponentId: '#personalDetailsButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#personalDetailsTab',
      sourceComponentId: '#personalDetailsButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Select',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#changePasswordTab',
      sourceComponentId: '#changePasswordButton',
    },
    type: InteractionType.Custom,
  },

  {
    name: 'Show',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#personalDetailsSuccessAlert',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Refetch',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#dataContainer',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#personalDetailsErrorAlert',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#personalDetailsSuccessAlert',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#personalDetailsErrorAlert',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },

  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#saveProfileDetailsButton',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#saveProfileDetailsButton',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#saveProfileDetailsButton',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#passwordSuccessAlert',
      sourceComponentId: '#updatePasswordForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#passwordErrorAlert',
      sourceComponentId: '#updatePasswordForm',
    },
    type: InteractionType.Custom,
  },

  {
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#passwordSuccessAlert',
      sourceComponentId: '#updatePasswordForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#passwordErrorAlert',
      sourceComponentId: '#updatePasswordForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#savePasswordButton',
      sourceComponentId: '#updatePasswordForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#savePasswordButton',
      sourceComponentId: '#updatePasswordForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#savePasswordButton',
      sourceComponentId: '#updatePasswordForm',
    },
    type: InteractionType.Custom,
  },
];

const attrs = {
  icon: Icon.NavbarIcon,
  type: 'page',
  description:
    'This page contains a profile page and a page to change your password.',
  detail:
    'A Customize the form fields on the profile page to your needs, and have users upload a profile picture. This template also provides a password page where users can change their passwords.',
  previewUrl: 'https://preview.betty.app/profile-details',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Profile_Page.jpg',
  category: 'LAYOUT',
  interactions,
};

const formOptions = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  model: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'model' } }),
};
const beforeCreate = ({
  save,
  close,
  prefab,
  components: {
    Header,
    Content,
    Footer,
    Field,
    Text,
    Box,
    CheckBox,
    AuthenticationProfileSelector,
    PropertySelector,
    PropertiesSelector,
    Button,
    PartialSelector,
  },
  helpers: {
    useModelQuery,
    setOption,
    prepareAction,
    createBlacklist,
    createUuid,
    BettyPrefabs,
    PropertyKind,
    cloneStructure,
    makeBettyUpdateInput,
  },
}: BeforeCreateArgs) => {
  const passwordFormId = createUuid();
  const updateFormId = createUuid();
  const imageUpdateFormId = createUuid();
  const [authProfileId, setAuthProfileId] = React.useState('');
  const [authProfile, setAuthProfile] = React.useState<AuthenticationProfile>();
  const [profileProperties, setProfileProperties] = React.useState([]);
  const [profilePropertiesValidation, setProfilePropertiesValidation] =
    React.useState(false);
  const [namePropertiesValidation, setNamePropertiesValidation] =
    React.useState(false);
  const [
    profilePicturePropertiesValidation,
    setProfilePicturePropertiesValidation,
  ] = React.useState(false);
  const [
    authenticationProfilePropertiesValidation,
    setAuthenticationProfilePropertiesValidation,
  ] = React.useState(false);
  const [profileNameValidationMessage, setProfileNameValidationMessage] =
    React.useState('');
  const [profilePictureValidationMessage, setProfilePictureValidationMessage] =
    React.useState('');
  const [modelProp, setModel] = React.useState<ModelProps>();
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const [properties, setProperties] = React.useState<Properties[]>([]);
  const [hasProfilePictureProperty, setHasProfilePictureProperty] =
    React.useState(false);
  const [profilePictureProperty, setProfilePictureProperty] =
    React.useState('');
  const [hasProfileNameProperty, setHasProfileNameProperty] =
    React.useState(false);
  const [profileNameProperty, setProfileNameProperty] = React.useState('');
  const [authValidationMessage] = React.useState('');
  const [modelId, setModelId] = React.useState('');
  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
  });
  useModelQuery({
    skip: !modelId,
    variables: { id: modelId },
    onCompleted: ({ model: dataModel }: ModelQuery) => {
      setModel(dataModel);

      if (dataModel) {
        setIdProperty(
          dataModel.properties.find(
            ({ name }: { name: string }) => name === 'id',
          ),
        );
      }
    },
  });
  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');

  const permissions: PermissionType = 'inherit';

  const enrichVarObj = (obj: any, authProp = false) => {
    const returnObj = obj;
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop: { id: any }) => prop.id === obj.id[0],
      );
      if (property) {
        returnObj.name = `{{ ${data.model.name}.${property.name} }}`;
        if (authProp) {
          returnObj.type = 'ME_PROPERTY';
        }
      }
    }
    return returnObj;
  };

  const transformProp = (obj: any) => {
    const outputProp = obj;
    outputProp.kind = 'IMAGE';
    outputProp.useKey = 'url';
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (property) {
        outputProp.label = property.label;
      }
    }
    return outputProp;
  };

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

  const profilePictureDisabledKinds = createBlacklist([
    'BELONGS_TO',
    'HAS_ONE',
    'IMAGE',
  ]);

  const profileNameDisabledKinds = createBlacklist([
    'BELONGS_TO',
    'HAS_ONE',
    'STRING',
    'STRING_EXPRESSION',
    'TEXT',
    'TEXT_EXPRESSION',
  ]);

  const profilePropertiesDisabledKinds = createBlacklist([
    'AUTO_INCREMENT',
    'BELONGS_TO',
    'BOOLEAN',
    'BOOLEAN_EXPRESSION',
    'COUNT',
    'DATE',
    'DATE_EXPRESSION',
    'DATE_TIME',
    'DATE_TIME_EXPRESSION',
    'DECIMAL',
    'DECIMAL_EXPRESSION',
    'EMAIL',
    'EMAIL_ADDRESS',
    'ENUM',
    'FILE',
    'FLOAT',
    'GOOGLE_DOCUMENT',
    'HAS_ONE',
    'IBAN',
    'IMAGE',
    'INTEGER',
    'INTEGER_EXPRESSION',
    'LIST',
    'MINUTES',
    'MINUTES_EXPRESSION',
    'MULTI_FILE',
    'MULTI_IMAGE',
    'PDF',
    'PERIODIC_COUNT',
    'PHONE_NUMBER',
    'PRICE',
    'PRICE_EXPRESSION',
    'RICH_TEXT',
    'SERIAL',
    'SIGNED_PDF',
    'STRING',
    'STRING_EXPRESSION',
    'SUM',
    'TEXT',
    'TEXT_EXPRESSION',
    'TIME',
    'URL',
    'ZIPCODE',
  ]);

  const stepper = {
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <>
            <Box pad={{ bottom: '15px' }}>
              <Box pad={{ bottom: '15px' }}>
                <Text size="medium" weight="bolder">
                  Select partials
                </Text>
              </Box>
              <Box pad={{ bottom: '15px' }}>
                <Text color="grey700">
                  By using a partial for the top menu and footer you can easily
                  reuse the same structure without having to go through every
                  page.
                </Text>
              </Box>
              <Field label="TOP MENU PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(headerId: string) => {
                    setHeaderPartialId(headerId);
                  }}
                  preSelected="Top menu"
                  value={headerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </Box>
            <Box pad={{ bottom: '15px' }}>
              <Field label="FOOTER PARTIAL">
                <PartialSelector
                  label="Select a partial"
                  onChange={(footerId: string) => {
                    setFooterPartialId(footerId);
                  }}
                  preSelected="Footer"
                  value={footerPartialId}
                  allowedTypes={[
                    'BODY_COMPONENT',
                    'CONTAINER_COMPONENT',
                    'CONTENT_COMPONENT',
                  ]}
                />
              </Field>
            </Box>
          </>
        );
      }
      return (
        <>
          <Field
            label="Authentication Profile"
            error={
              authValidationMessage && (
                <Text color="#e82600">{authValidationMessage}</Text>
              )
            }
            info={
              <Text size="small" color="grey700">
                Select the Authentication Profile of which you want to show the
                data of.
              </Text>
            }
          >
            <AuthenticationProfileSelector
              onChange={(
                id: string,
                authProfileObject: AuthenticationProfile,
              ) => {
                if (authProfileObject) {
                  setAuthProfileId(id);
                  setAuthProfile(authProfileObject);
                  setModelId(authProfileObject.loginModel);
                  setAuthenticationProfilePropertiesValidation(false);
                }
              }}
              value={authProfileId}
            />

            {authenticationProfilePropertiesValidation && (
              <Text color="#e82600">
                Selecting a authentication profile is required
              </Text>
            )}
          </Field>
          <Field
            label="Profile picture"
            error={
              profilePictureValidationMessage && (
                <Text color="#e82600">{profilePictureValidationMessage}</Text>
              )
            }
          >
            <Box pad={{ bottom: 'medium' }}>
              <CheckBox
                label="Add profile picture"
                checked={hasProfilePictureProperty}
                onChange={() => {
                  setHasProfilePictureProperty(!hasProfilePictureProperty);
                  setProfilePictureValidationMessage('');
                  setProfilePicturePropertiesValidation(false);
                }}
              />
              {hasProfilePictureProperty && (
                <PropertySelector
                  modelId={modelId}
                  disabledKinds={profilePictureDisabledKinds}
                  onChange={(value: any) => {
                    setProfilePictureProperty(value);
                    setProfilePictureValidationMessage('');
                    setProfilePicturePropertiesValidation(false);
                  }}
                  value={profilePictureProperty}
                  disabled={!modelId && !hasProfilePictureProperty}
                />
              )}
              {profilePicturePropertiesValidation &&
                hasProfilePictureProperty && (
                  <Text color="#e82600">Selecting a property is required</Text>
                )}
            </Box>
          </Field>
          <Field
            label="(Full) Name property"
            error={
              profileNameValidationMessage && (
                <Text color="#e82600">{profileNameValidationMessage}</Text>
              )
            }
          >
            <Box pad={{ bottom: 'medium' }}>
              <CheckBox
                label="Add (full) name property"
                checked={hasProfileNameProperty}
                onChange={() => {
                  setHasProfileNameProperty(!hasProfileNameProperty);
                  setProfileNameValidationMessage('');
                  setNamePropertiesValidation(false);
                }}
              />
              {hasProfileNameProperty && (
                <PropertySelector
                  modelId={modelId}
                  disabledKinds={profileNameDisabledKinds}
                  onChange={(value: any) => {
                    setProfileNameProperty(value);
                    setProfileNameValidationMessage('');
                    setNamePropertiesValidation(false);
                  }}
                  value={profileNameProperty}
                  disabled={!modelId && !hasProfileNameProperty}
                />
              )}
              {namePropertiesValidation && hasProfileNameProperty && (
                <Text color="#e82600">Selecting a property is required</Text>
              )}
            </Box>
          </Field>
          <Field
            label="Properties shown in the personal details tab"
            error={
              profilePropertiesValidation && (
                <Text color="#e82600">Selecting a property is required</Text>
              )
            }
          >
            <PropertiesSelector
              modelId={modelId}
              value={profileProperties}
              disabledNames={['created_at', 'updated_at', 'id']}
              disabledKinds={profilePropertiesDisabledKinds}
              onChange={(value: any) => {
                setProfilePropertiesValidation(false);
                setProfileProperties(value);
                setProperties(value);
              }}
            />
          </Field>
          <Box background={{ color: '#b8dffe' }} pad="medium">
            <Text>
              The user needs to add conditional checks to see if the current
              password is the current password and if the new and
              confirm-password fields match.
            </Text>
          </Box>
        </>
      );
    },

    onSave: async () => {
      if (profilePictureProperty === '' && hasProfilePictureProperty) {
        setProfilePicturePropertiesValidation(true);
      }
      if (profileNameProperty === '' && hasProfileNameProperty) {
        setNamePropertiesValidation(true);
      }
      if (authProfile === undefined) {
        setAuthenticationProfilePropertiesValidation(true);
      }
      if (profileProperties.length === 0) {
        setProfilePropertiesValidation(true);
      }
      if (
        profilePicturePropertiesValidation === false &&
        namePropertiesValidation === false &&
        authenticationProfilePropertiesValidation === false &&
        profilePropertiesValidation === false
      ) {
        const newPrefab = { ...prefab };
        const inputBox = treeSearch('#formInputBox', newPrefab.structure);

        const inputStructure = (
          textValue: string,
          inputPrefab: PrefabReference,
        ): PrefabReference => {
          const boxPrefab = cloneStructure('Box');
          if (boxPrefab.type === 'COMPONENT') {
            setOption(
              boxPrefab,
              'innerSpacing',
              (opt: PrefabComponentOption) => ({
                ...opt,
                value: ['M', '0rem', '0rem', '0rem'],
              }),
            );
            const textPrefab = cloneStructure('Text');
            if (textPrefab.type === 'COMPONENT') {
              setOption(
                textPrefab,
                'content',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: [textValue],
                }),
              );
              setOption(textPrefab, 'type', (opt: PrefabComponentOption) => ({
                ...opt,
                value: ['Body1'],
              }));
              setOption(
                textPrefab,
                'outerSpacing',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: ['0rem', '0rem', 'S', '0rem'],
                }),
              );
            }
            boxPrefab.descendants.push(textPrefab);
            boxPrefab.descendants.push(inputPrefab);
          }
          return boxPrefab;
        };
        const passwordForm = treeSearch(
          '#updatePasswordForm',
          newPrefab.structure,
        );
        const passwordBox = treeSearch(
          '#updatePasswordBox',
          newPrefab.structure,
        );

        if (!passwordBox) throw new Error('Password box could not be found');

        if (!passwordForm) throw new Error('Password form could not be found');
        passwordForm.id = passwordFormId;

        if (!authProfile) throw new Error('Auth profile could not be found');
        if (!authProfile.properties)
          throw new Error('Auth profile does not have any properties');

        const authPassword = authProfile.properties.find(
          (p) => p.kind === 'PASSWORD',
        );
        if (!idProperty) throw new Error('Property id could not be found');
        if (!authPassword)
          throw new Error('Auth password property could not be found');

        const resultPass = await prepareAction(
          passwordFormId,
          idProperty,
          [authPassword],
          'update',
          undefined,
          'Profile page - Update password',
          permissions,
          authProfileId,
        );

        if (!modelProp) throw new Error('Model property could not be found');
        if (!data) throw new Error('data could not be found');

        Object.values(resultPass.variables).forEach(
          ([prop, inputVariable]): void => {
            const generateInputPrefabs = () => {
              switch (prop.kind) {
                case PropertyKind.PASSWORD:
                  return inputStructure(
                    'New password',
                    makeBettyUpdateInput(
                      BettyPrefabs.PASSWORD,
                      data.model,
                      prop,
                      inputVariable,
                      resultPass.relatedIdProperties,
                    ),
                  );
                default:
                  return inputStructure(
                    'New password',
                    makeBettyUpdateInput(
                      BettyPrefabs.STRING,
                      data.model,
                      prop,
                      inputVariable,
                      resultPass.relatedIdProperties,
                    ),
                  );
              }
            };
            const editFormInput = generateInputPrefabs();
            if (
              editFormInput.type === 'COMPONENT' &&
              editFormInput.descendants[1].type === 'COMPONENT'
            ) {
              setOption(
                editFormInput.descendants[1],
                'margin',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: 'none',
                }),
              );
              setOption(
                editFormInput.descendants[1],
                'hideLabel',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: true,
                }),
              );
              setOption(
                editFormInput.descendants[1],
                'value',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: [''],
                }),
              );
            }
            setOption(passwordForm, 'filter', (opt: PrefabComponentOption) => ({
              ...opt,
              value: {
                _and: [
                  {
                    [idProperty.id]: {
                      eq: {
                        id: [idProperty.id],
                        type: 'ME_PROPERTY',
                      },
                    },
                  },
                ],
              },
            }));

            passwordBox.descendants.push(editFormInput);
            if (!prop.kind) {
              // eslint-disable-next-line no-console
              console.warn('PropertyKind not found');
            }
          },
        );

        setOption(passwordForm, 'actionId', (opt: PrefabComponentOption) => ({
          ...opt,
          value: resultPass.action.actionId,
        }));
        setOption(passwordForm, 'model', (opt: PrefabComponentOption) => ({
          ...opt,
          value: modelId,
        }));

        const editProfileFormObject = treeSearch(
          '#editProfileDetailsForm',
          newPrefab.structure,
        );
        if (!editProfileFormObject) throw new Error('Form could not be found');
        editProfileFormObject.id = updateFormId;

        const result = await prepareAction(
          updateFormId,
          idProperty,
          properties,
          'update',
          undefined,
          'Profile page - Update details',
          permissions,
          authProfileId,
        );
        setOption(
          editProfileFormObject,
          'actionId',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: result.action.actionId,
          }),
        );
        setOption(
          editProfileFormObject,
          'recordVariable',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: result.recordInputVariable.id,
          }),
        );
        setOption(
          editProfileFormObject,
          'model',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: modelId,
          }),
        );
        setOption(
          editProfileFormObject,
          'filter',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: {
              _and: [
                {
                  [idProperty.id]: {
                    eq: {
                      id: [idProperty.id],
                      type: 'ME_PROPERTY',
                    },
                  },
                },
              ],
            },
          }),
        );

        if (hasProfilePictureProperty) {
          const imageObject = treeSearch('#updateImgForm', newPrefab.structure);
          if (!newPrefab.interactions)
            throw new Error('newPrefab interactions not be found');
          newPrefab.interactions.push(
            {
              name: 'Show',
              sourceEvent: 'onSuccess',
              ref: {
                targetComponentId: '#uploadSubmitButton',
                sourceComponentId: '#uploadInput',
              },
              type: 'Custom',
            } as PrefabInteraction,
            {
              name: 'Toggle loading state',
              sourceEvent: 'onActionSuccess',
              ref: {
                targetComponentId: '#uploadSubmitButton',
                sourceComponentId: '#updateImgForm',
              },
              type: 'Custom',
            } as PrefabInteraction,
            {
              name: 'Toggle loading state',
              sourceEvent: 'onActionError',
              ref: {
                targetComponentId: '#uploadSubmitButton',
                sourceComponentId: '#updateImgForm',
              },
              type: 'Custom',
            } as PrefabInteraction,
            {
              name: 'Toggle loading state',
              sourceEvent: 'onActionLoad',
              ref: {
                targetComponentId: '#uploadSubmitButton',
                sourceComponentId: '#updateImgForm',
              },
              type: 'Custom',
            } as PrefabInteraction,
            {
              name: 'Refetch',
              sourceEvent: 'onActionSuccess',
              ref: {
                targetComponentId: '#dataContainer',
                sourceComponentId: '#updateImgForm',
              },
              type: 'Custom',
            } as PrefabInteraction,
            {
              name: 'Hide',
              sourceEvent: 'onActionLoad',
              ref: {
                targetComponentId: '#updateImgAlert',
                sourceComponentId: '#updateImgForm',
              },
              type: 'Custom',
            } as PrefabInteraction,
            {
              name: 'Show',
              sourceEvent: 'onActionError',
              ref: {
                targetComponentId: '#updateImgAlert',
                sourceComponentId: '#updateImgForm',
              },
              type: 'Custom',
            } as PrefabInteraction,
          );
          if (!imageObject) throw new Error('Img Form could not be found');
          if (!profilePictureProperty) {
            throw new Error('No image property was selected.');
          }
          imageObject.id = imageUpdateFormId;

          const imageObjectResult = await prepareAction(
            imageUpdateFormId,
            idProperty,
            [...transformProp(profilePictureProperty)],
            'update',
            undefined,
            'Profile page - Update profile image',
            permissions,
            authProfileId,
          );
          Object.values(imageObjectResult.variables).forEach(
            ([prop, inputVariable]): void => {
              const generateInputPrefabs = () => {
                const imageUploadComponent = makeBettyUpdateInput(
                  BettyPrefabs.IMAGE,
                  data.model,
                  prop,
                  inputVariable,
                  imageObjectResult.relatedIdProperties,
                );
                if (imageUploadComponent.type === 'COMPONENT') {
                  imageUploadComponent.ref = {
                    id: '#uploadInput',
                  };
                  setOption(
                    imageUploadComponent,
                    'showImagePreview',
                    (opt: PrefabComponentOption) => ({
                      ...opt,
                      value: false,
                    }),
                  );
                  const uploadButton = imageUploadComponent.descendants[0];
                  if (uploadButton.type === 'COMPONENT') {
                    uploadButton.style = {
                      overwrite: {
                        backgroundColor: {
                          type: 'THEME_COLOR',
                          value: 'primary',
                        },
                        boxShadow: 'none',
                        color: {
                          type: 'THEME_COLOR',
                          value: 'white',
                        },
                        fontFamily: 'Roboto',
                        fontSize: '0.875rem',
                        fontStyle: 'none',
                        fontWeight: '400',
                        padding: ['0.6875rem', '1.375rem'],
                        textDecoration: 'none',
                        textTransform: 'none',
                      },
                    };
                    setOption(
                      uploadButton,
                      'icon',
                      (opt: PrefabComponentOption) => ({
                        ...opt,
                        value: 'CloudUpload',
                      }),
                    );
                  }
                }
                switch (prop.kind) {
                  case PropertyKind.IMAGE:
                    return inputStructure(prop.label, imageUploadComponent);
                  default:
                    return inputStructure(
                      prop.label,
                      makeBettyUpdateInput(
                        BettyPrefabs.STRING,
                        data.model,
                        prop,
                        inputVariable,
                        imageObjectResult.relatedIdProperties,
                      ),
                    );
                }
              };
              const imgFormInput = generateInputPrefabs();
              if (
                imgFormInput.type === 'COMPONENT' &&
                imgFormInput.descendants[1].type === 'COMPONENT'
              ) {
                setOption(
                  imgFormInput.descendants[1],
                  'margin',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: 'none',
                  }),
                );
                setOption(
                  imgFormInput.descendants[1],
                  'hideLabel',
                  (opt: PrefabComponentOption) => ({
                    ...opt,
                    value: true,
                  }),
                );
              }
              setOption(
                imageObject,
                'filter',
                (opt: PrefabComponentOption) => ({
                  ...opt,
                  value: {
                    _and: [
                      {
                        [idProperty.id]: {
                          eq: {
                            id: [idProperty.id],
                            type: 'ME_PROPERTY',
                          },
                        },
                      },
                    ],
                  },
                }),
              );

              imageObject.descendants.unshift(imgFormInput);
              if (!prop.kind) {
                // eslint-disable-next-line no-console
                console.warn('PropertyKind not found');
              }
            },
          );
          setOption(imageObject, 'actionId', (opt: PrefabComponentOption) => ({
            ...opt,
            value: imageObjectResult.action.actionId,
          }));
          setOption(imageObject, 'model', (opt: PrefabComponentOption) => ({
            ...opt,
            value: modelId,
          }));
          setOption(imageObject, 'filter', (opt: PrefabComponentOption) => ({
            ...opt,
            value: {
              _and: [
                {
                  [idProperty.id]: {
                    eq: {
                      id: [idProperty.id],
                      type: 'ME_PROPERTY',
                    },
                  },
                },
              ],
            },
          }));
        } else {
          const avatarGrid = treeSearch('#AvatarGrid', newPrefab.structure);

          if (!avatarGrid) throw new Error('Img Form could not be found');

          avatarGrid.descendants.pop();
        }

        const profilePicturePropertyId = treeSearch(
          '#profilePictureProperty',
          newPrefab.structure,
        );
        if (!profilePicturePropertyId)
          throw new Error('No profileNameProperty id found');
        setOption(
          profilePicturePropertyId,
          'imgUrl',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: hasProfilePictureProperty
              ? [enrichVarObj(profilePictureProperty, true)]
              : [
                  'https://assets.bettyblocks.com/4d7d80cf57a241899297fa9a768079f6_assets/files/user_default.png',
                ],
          }),
        );

        const profileNamePropertyId = treeSearch(
          '#profileNameProperty',
          newPrefab.structure,
        );
        if (!profileNamePropertyId)
          throw new Error('No profileNameProperty id found');
        setOption(
          profileNamePropertyId,
          'content',
          (opt: PrefabComponentOption) => ({
            ...opt,
            value: hasProfileNameProperty
              ? [enrichVarObj(profileNameProperty, true)]
              : ['Profile name'],
          }),
        );

        Object.values(result.variables).forEach(
          ([prop, inputVariable]): void => {
            const { kind } = prop;
            if (!kind) {
              // eslint-disable-next-line no-console
              console.warn('PropertyKind not found');
            }

            const newInput = () => {
              const bettyInput = (prefabName: string): PrefabReference => {
                const inputPrefab = makeBettyUpdateInput(
                  prefabName,
                  modelProp,
                  prop,
                  inputVariable,
                );
                if (inputPrefab.type === 'COMPONENT') {
                  setOption(
                    inputPrefab,
                    'hideLabel',
                    (opt: PrefabComponentOption) => ({
                      ...opt,
                      value: true,
                    }),
                  );
                  setOption(
                    inputPrefab,
                    'dataComponentAttribute',
                    (opt: PrefabComponentOption) => ({
                      ...opt,
                      value: [],
                    }),
                  );

                  setOption(
                    inputPrefab,
                    'margin',
                    (opt: PrefabComponentOption) => ({
                      ...opt,
                      value: 'none',
                    }),
                  );
                  setOption(
                    inputPrefab,
                    'required',
                    (opt: PrefabComponentOption) => ({
                      ...opt,
                      value: true,
                    }),
                  );
                }
                return inputPrefab;
              };

              switch (kind) {
                case PropertyKind.STRING:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.STRING),
                  );
                case PropertyKind.PASSWORD:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.PASSWORD),
                  );
                case PropertyKind.BELONGS_TO:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.AUTO_COMPLETE),
                  );
                case PropertyKind.HAS_MANY:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.MULTI_AUTO_COMPLETE),
                  );
                case PropertyKind.DATE_TIME:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.DATE_TIME),
                  );
                case PropertyKind.DATE:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.DATE),
                  );
                case PropertyKind.TIME:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.TIME),
                  );
                case PropertyKind.DECIMAL:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.DECIMAL),
                  );
                case PropertyKind.EMAIL_ADDRESS:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.EMAIL_ADDRESS),
                  );
                case PropertyKind.FILE:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.FILE),
                  );
                case PropertyKind.IBAN:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.IBAN),
                  );
                case PropertyKind.LIST:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.LIST),
                  );
                case PropertyKind.PHONE_NUMBER:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.PHONE_NUMBER),
                  );
                case PropertyKind.PRICE:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.PRICE),
                  );
                case PropertyKind.URL:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.URL),
                  );
                case PropertyKind.TEXT:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.TEXT),
                  );
                case PropertyKind.IMAGE:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.IMAGE),
                  );
                case PropertyKind.INTEGER:
                  return inputStructure(
                    prop.label,
                    bettyInput(BettyPrefabs.INTEGER),
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
            if (inputBox) {
              const newInputPrefabs = newInput();
              inputBox.descendants.push(newInputPrefabs);
            }
          },
        );

        if (modelId) {
          const dataContainer = treeSearch(
            '#dataContainer',
            newPrefab.structure,
          );
          if (!dataContainer) throw new Error('No datalist found');
          setOption(
            dataContainer,
            'authProfile',
            (opt: PrefabComponentOption) => ({
              ...opt,
              value: authProfileId,
            }),
          );
          const prefabFooter = treeSearch('#Footer', newPrefab.structure);
          const prefabHeader = treeSearch('#Header', newPrefab.structure);

          if (headerPartialId && prefabHeader) {
            prefabHeader.descendants = [
              { type: 'PARTIAL', partialId: headerPartialId },
            ];
          }

          if (footerPartialId && prefabFooter) {
            prefabFooter.descendants = [
              { type: 'PARTIAL', partialId: footerPartialId },
            ];
          }

          save(newPrefab);
        }
      }
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
              const newStepnumber = stepNumber + 1;
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </Box>
        <Box>
          <Footer
            onClose={close}
            canSave={stepNumber === stepper.stepAmount}
            onSave={stepper.onSave}
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
      <Header onClose={close} title="Profile details" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default makePrefab('User, profile details', attrs, beforeCreate, [
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
        rowHeight: text('Height', {
          value: '100%',
          configuration: {
            as: 'UNIT',
          },
        }),
      },
    },
    [
      Column(
        {
          options: {
            ...columnOptions,
            columnHeight: text('Height', {
              value: '100%',
              configuration: {
                as: 'UNIT',
              },
            }),
            innerSpacing: sizes('Inner space', {
              value: ['0rem', '0rem', '0rem', '0rem'],
            }),
          },
        },
        [
          Grid(
            {
              options: {
                ...gridOptions,
                height: size('Height', {
                  value: '100%',
                  configuration: {
                    as: 'UNIT',
                  },
                }),
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
                  // header
                  prefabBox(
                    {
                      ref: { id: '#Header' },

                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
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
                          },
                        },
                        [
                          prefabBox(
                            {
                              options: {
                                ...boxOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                                backgroundOptions: toggle(
                                  'Show background options',
                                  {
                                    value: true,
                                  },
                                ),
                                backgroundColor: color('Background color', {
                                  value: ThemeColor.PRIMARY,
                                  configuration: {
                                    condition: showIf(
                                      'backgroundOptions',
                                      'EQ',
                                      true,
                                    ),
                                  },
                                }),
                              },
                            },
                            [
                              Row({}, [
                                Column(
                                  {
                                    options: {
                                      ...columnOptions,
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  },
                                  [
                                    AppBar(
                                      {
                                        options: {
                                          ...appBarOptions,
                                          urlFileSource: variable('Source', {
                                            value: [
                                              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
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
                                          }),
                                          title: variable('Title', {
                                            value: [],
                                          }),
                                        },
                                      },
                                      [
                                        OpenPageButton(
                                          {
                                            style: {
                                              overwrite: {
                                                backgroundColor: {
                                                  type: 'STATIC',
                                                  value: 'transparent',
                                                },
                                                boxShadow: 'none',
                                                color: {
                                                  type: 'THEME_COLOR',
                                                  value: 'white',
                                                },
                                                fontFamily: 'Roboto',
                                                fontSize: '0.875rem',
                                                fontStyle: 'none',
                                                fontWeight: '400',
                                                padding: ['0rem', '0rem'],
                                                textDecoration: 'none',
                                                textTransform: 'none',
                                              },
                                            },
                                            options: {
                                              ...openPageButtonOptions,
                                              buttonText: variable(
                                                'Button text',
                                                { value: ['Menu 1'] },
                                              ),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                    'M',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [],
                                        ),
                                        OpenPageButton(
                                          {
                                            style: {
                                              overwrite: {
                                                backgroundColor: {
                                                  type: 'STATIC',
                                                  value: 'transparent',
                                                },
                                                boxShadow: 'none',
                                                color: {
                                                  type: 'THEME_COLOR',
                                                  value: 'white',
                                                },
                                                fontFamily: 'Roboto',
                                                fontSize: '0.875rem',
                                                fontStyle: 'none',
                                                fontWeight: '400',
                                                padding: ['0rem', '0rem'],
                                                textDecoration: 'none',
                                                textTransform: 'none',
                                              },
                                            },
                                            options: {
                                              ...openPageButtonOptions,
                                              buttonText: variable(
                                                'Button text',
                                                { value: ['Menu 2'] },
                                              ),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                            },
                                          },
                                          [],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ]),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                  // main
                  prefabBox(
                    {
                      options: {
                        ...boxOptions,
                        width: size('Width', {
                          value: '100%',
                          configuration: {
                            as: 'UNIT',
                          },
                        }),
                        innerSpacing: sizes('Inner space', {
                          ref: { id: '#footerBoxInnerSpacing' },
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.LIGHT,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                        backgroundColorAlpha: option('NUMBER', {
                          label: 'Background color opacity',
                          value: 20,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                        stretch: toggle('Stretch (when in flex container)', {
                          value: true,
                        }),
                      },
                    },
                    [
                      wrapper(
                        {
                          label: 'My account',
                          optionCategories: [
                            {
                              label: 'Action',
                              expanded: true,
                              members: [
                                'updateProfileAction',
                                'updatePasswordAction',
                                'updateImgAction',
                              ],
                              condition: {
                                type: 'SHOW',
                                option: 'visibility',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          ],
                          options: {
                            pageTitle: linked({
                              label: 'Page title',
                              value: {
                                ref: {
                                  componentId: '#pageTitle',
                                  optionId: '#pageTitleContent',
                                },
                              },
                            }),
                            shownTab: linked({
                              label: 'Show design tab',
                              value: {
                                ref: {
                                  componentId: '#DetailsTab',
                                  optionId: '#formTabsSelectedDesignTabIndex',
                                },
                              },
                            }),
                            updateProfileAction: linked({
                              label: 'Update profile action',
                              value: {
                                ref: {
                                  componentId: '#editProfileDetailsForm',
                                  optionId: '#editProfileDetailsAction',
                                },
                              },
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'shownTab',
                                  comparator: 'EQ',
                                  value: 1,
                                },
                              },
                            }),
                            updatePasswordAction: linked({
                              label: 'Update password action',
                              value: {
                                ref: {
                                  componentId: '#updatePasswordForm',
                                  optionId: '#updatePasswordAction',
                                },
                              },
                              configuration: {
                                condition: {
                                  type: 'SHOW',
                                  option: 'shownTab',
                                  comparator: 'EQ',
                                  value: 2,
                                },
                              },
                            }),
                            updateImgAction: linked({
                              label: 'Update profile image action',
                              value: {
                                ref: {
                                  componentId: '#updateImgForm',
                                  optionId: '#updateImgAction',
                                },
                              },
                            }),
                          },
                        },
                        [
                          Row({}, [
                            Column(
                              {
                                options: {
                                  ...columnOptions,

                                  columnWidthTabletLandscape: option('CUSTOM', {
                                    label: 'Column width (tablet landscape)',
                                    value: 'flexible',
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
                                    value: 'flexible',
                                    label: 'Column width (tablet portrait)',
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
                                    value: 'flexible',
                                    label: 'Column width (mobile)',
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
                                  innerSpacing: sizes('Inner space', {
                                    value: ['M', 'M', 'M', 'M'],
                                  }),
                                },
                              },
                              [
                                TextPrefab(
                                  {
                                    ref: { id: '#pageTitle' },
                                    options: {
                                      ...textOptions,
                                      content: variable('Content', {
                                        value: ['My account'],
                                        configuration: { as: 'MULTILINE' },
                                        ref: {
                                          id: '#pageTitleContent',
                                        },
                                      }),
                                      type: font('Text style', {
                                        value: ['Title4'],
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', '0rem', 'M', 'M'],
                                      }),
                                    },
                                  },
                                  [],
                                ),
                                DataContainer(
                                  {
                                    ref: { id: '#dataContainer' },
                                  },
                                  [
                                    Row(
                                      {
                                        options: {
                                          ...rowOptions,
                                        },
                                      },
                                      [
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
                                              columnWidth: option('CUSTOM', {
                                                label: 'Column width',
                                                value: '3',
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
                                              }),
                                              columnWidthTabletLandscape:
                                                option('CUSTOM', {
                                                  label:
                                                    'Column width (tablet landscape)',
                                                  value: '3',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                }),
                                              columnWidthTabletPortrait: option(
                                                'CUSTOM',
                                                {
                                                  value: '12',
                                                  label:
                                                    'Column width (tablet portrait)',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                              columnWidthMobile: option(
                                                'CUSTOM',
                                                {
                                                  value: '12',
                                                  label:
                                                    'Column width (mobile)',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            prefabBox(
                                              {
                                                options: {
                                                  ...boxOptions,
                                                  backgroundColor: color(
                                                    'Background color',
                                                    {
                                                      value: ThemeColor.WHITE,
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                Grid(
                                                  {
                                                    ref: { id: '#AvatarGrid' },
                                                    options: {
                                                      ...gridOptions,
                                                      direction: option(
                                                        'CUSTOM',
                                                        {
                                                          value: 'column',
                                                          label: 'Direction',
                                                          configuration: {
                                                            as: 'BUTTONGROUP',
                                                            dataType: 'string',
                                                            allowedInput: [
                                                              {
                                                                name: 'Horizontal',
                                                                value: 'row',
                                                              },
                                                              {
                                                                name: 'Vertical',
                                                                value: 'column',
                                                              },
                                                            ],
                                                            condition: showIf(
                                                              'type',
                                                              'EQ',
                                                              'container',
                                                            ),
                                                          },
                                                        },
                                                      ),
                                                      alignItems: option(
                                                        'CUSTOM',
                                                        {
                                                          value: 'center',
                                                          label: 'Align items',
                                                          configuration: {
                                                            as: 'DROPDOWN',
                                                            dataType: 'string',
                                                            allowedInput: [
                                                              {
                                                                name: 'Start',
                                                                value:
                                                                  'flex-start',
                                                              },
                                                              {
                                                                name: 'Center',
                                                                value: 'center',
                                                              },
                                                              {
                                                                name: 'End',
                                                                value:
                                                                  'flex-end',
                                                              },
                                                              {
                                                                name: 'Stretch',
                                                                value:
                                                                  'stretch',
                                                              },
                                                              {
                                                                name: 'Baseline',
                                                                value:
                                                                  'baseline',
                                                              },
                                                            ],
                                                            condition: showIf(
                                                              'type',
                                                              'EQ',
                                                              'container',
                                                            ),
                                                          },
                                                        },
                                                      ),
                                                      alignContent: option(
                                                        'CUSTOM',
                                                        {
                                                          value: 'center',
                                                          label:
                                                            'Align content',
                                                          configuration: {
                                                            as: 'DROPDOWN',
                                                            dataType: 'string',
                                                            allowedInput: [
                                                              {
                                                                name: 'Stretch',
                                                                value:
                                                                  'stretch',
                                                              },
                                                              {
                                                                name: 'Center',
                                                                value: 'center',
                                                              },
                                                              {
                                                                name: 'Start',
                                                                value:
                                                                  'flex-start',
                                                              },
                                                              {
                                                                name: 'End',
                                                                value:
                                                                  'flex-end',
                                                              },
                                                              {
                                                                name: 'Space around',
                                                                value:
                                                                  'space-around',
                                                              },
                                                              {
                                                                name: 'Space between',
                                                                value:
                                                                  'space-between',
                                                              },
                                                            ],
                                                            condition: showIf(
                                                              'type',
                                                              'EQ',
                                                              'container',
                                                            ),
                                                          },
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    Avatar(
                                                      {
                                                        ref: {
                                                          id: '#profilePictureProperty',
                                                        },
                                                        options: {
                                                          ...avatarOptions,
                                                          imgUrl: variable(
                                                            'Image url',
                                                            {
                                                              value: [],
                                                              configuration: {
                                                                condition:
                                                                  showIf(
                                                                    'type',
                                                                    'EQ',
                                                                    'img',
                                                                  ),
                                                              },
                                                            },
                                                          ),
                                                          imgAlt: variable(
                                                            'Image alternative text',
                                                            {
                                                              value: [
                                                                'Silhouette',
                                                              ],
                                                              configuration: {
                                                                condition:
                                                                  showIf(
                                                                    'type',
                                                                    'EQ',
                                                                    'img',
                                                                  ),
                                                              },
                                                            },
                                                          ),
                                                          width: size('Width', {
                                                            value: '80px',
                                                            configuration: {
                                                              as: 'UNIT',
                                                            },
                                                          }),
                                                          height: size(
                                                            'Height',
                                                            {
                                                              value: '80px',
                                                              configuration: {
                                                                as: 'UNIT',
                                                              },
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [],
                                                    ),
                                                    TextPrefab(
                                                      {
                                                        ref: {
                                                          id: '#profileNameProperty',
                                                        },
                                                        options: {
                                                          ...textOptions,
                                                          type: font(
                                                            'Text style',
                                                            {
                                                              value: ['Title5'],
                                                            },
                                                          ),
                                                          textAlignment: option(
                                                            'CUSTOM',
                                                            {
                                                              label:
                                                                'Text Alignment',
                                                              value: 'center',
                                                              configuration: {
                                                                as: 'BUTTONGROUP',
                                                                dataType:
                                                                  'string',
                                                                allowedInput: [
                                                                  {
                                                                    name: 'Left',
                                                                    value:
                                                                      'left',
                                                                  },
                                                                  {
                                                                    name: 'Center',
                                                                    value:
                                                                      'center',
                                                                  },
                                                                  {
                                                                    name: 'Right',
                                                                    value:
                                                                      'right',
                                                                  },
                                                                ],
                                                              },
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [],
                                                    ),
                                                    prefabBox(
                                                      {
                                                        options: {
                                                          ...boxOptions,
                                                          stretch: toggle(
                                                            'Stretch (when in flex container)',
                                                            {
                                                              value: true,
                                                            },
                                                          ),
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
                                                      [
                                                        Alert(
                                                          {
                                                            ref: {
                                                              id: '#updateImgAlert',
                                                            },
                                                            options: {
                                                              ...alertOptions,
                                                              visible: toggle(
                                                                'Toggle visibility',
                                                                {
                                                                  value: false,
                                                                  configuration:
                                                                    {
                                                                      as: 'VISIBILITY',
                                                                    },
                                                                },
                                                              ),
                                                              bodyText:
                                                                variable(
                                                                  'Body text',
                                                                  {
                                                                    value: [
                                                                      'Something went wrong',
                                                                    ],
                                                                  },
                                                                ),
                                                              allowTextServerResponse:
                                                                toggle(
                                                                  'Allow to overwrite by the server response',
                                                                  {
                                                                    value: true,
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
                                                              background: color(
                                                                'Background color',
                                                                {
                                                                  value:
                                                                    ThemeColor.DANGER,
                                                                },
                                                              ),
                                                              icon: icon(
                                                                'Icon',
                                                                {
                                                                  value:
                                                                    'Warning',
                                                                },
                                                              ),
                                                            },
                                                          },
                                                          [],
                                                        ),
                                                        component(
                                                          'Form',
                                                          {
                                                            ref: {
                                                              id: '#updateImgForm',
                                                            },
                                                            options: {
                                                              ...formOptions,
                                                              actionId: option(
                                                                'ACTION_JS',
                                                                {
                                                                  label:
                                                                    'Action',
                                                                  value: '',
                                                                  ref: {
                                                                    id: '#updateImgAction',
                                                                  },
                                                                },
                                                              ),
                                                            },
                                                          },
                                                          [
                                                            SubmitButton(
                                                              {
                                                                ref: {
                                                                  id: '#uploadSubmitButton',
                                                                },
                                                                options: {
                                                                  ...submitButtonOptions,
                                                                  visible:
                                                                    toggle(
                                                                      'Toggle visibility',
                                                                      {
                                                                        value:
                                                                          false,
                                                                        configuration:
                                                                          {
                                                                            as: 'VISIBILITY',
                                                                          },
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
                                                                  buttonText:
                                                                    variable(
                                                                      'Button text',
                                                                      {
                                                                        value: [
                                                                          'Save profile image',
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
                                              ],
                                            ),
                                            prefabBox(
                                              {
                                                options: {
                                                  ...boxOptions,
                                                  backgroundColor: color(
                                                    'Background color',
                                                    {
                                                      value: ThemeColor.WHITE,
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
                                              },
                                              [
                                                OpenPageButton(
                                                  {
                                                    ref: {
                                                      id: '#activePersonalDetailsButton',
                                                    },
                                                    style: {
                                                      overwrite: {
                                                        backgroundColor: {
                                                          type: 'THEME_COLOR',
                                                          value: 'primary',
                                                        },
                                                        boxShadow: 'none',
                                                        color: {
                                                          type: 'THEME_COLOR',
                                                          value: 'white',
                                                        },
                                                        fontFamily: 'Roboto',
                                                        fontSize: '0.875rem',
                                                        fontStyle: 'none',
                                                        fontWeight: '400',
                                                        padding: [
                                                          '1.25rem',
                                                          '1.375rem',
                                                        ],
                                                        textDecoration: 'none',
                                                        textTransform: 'none',
                                                      },
                                                    },
                                                    options: {
                                                      ...openPageButtonOptions,
                                                      buttonText: variable(
                                                        'Button text',
                                                        {
                                                          value: [
                                                            'Personal details',
                                                          ],
                                                        },
                                                      ),
                                                      fullWidth: toggle(
                                                        'Full width',
                                                        {
                                                          value: true,
                                                          configuration: {
                                                            condition: showIf(
                                                              'variant',
                                                              'EQ',
                                                              'icon',
                                                            ),
                                                          },
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [],
                                                ),
                                                OpenPageButton(
                                                  {
                                                    ref: {
                                                      id: '#personalDetailsButton',
                                                    },
                                                    style: {
                                                      overwrite: {
                                                        backgroundColor: {
                                                          type: 'THEME_COLOR',
                                                          value: 'white',
                                                        },
                                                        boxShadow: 'none',
                                                        color: {
                                                          type: 'THEME_COLOR',
                                                          value: 'primary',
                                                        },
                                                        fontFamily: 'Roboto',
                                                        fontSize: '0.875rem',
                                                        fontStyle: 'none',
                                                        fontWeight: '400',
                                                        padding: [
                                                          '1.25rem',
                                                          '1.375rem',
                                                        ],
                                                        textDecoration: 'none',
                                                        textTransform: 'none',
                                                      },
                                                    },
                                                    options: {
                                                      ...openPageButtonOptions,
                                                      visible: toggle(
                                                        'Toggle visibility',
                                                        {
                                                          value: false,
                                                          configuration: {
                                                            as: 'VISIBILITY',
                                                          },
                                                        },
                                                      ),
                                                      buttonText: variable(
                                                        'Button text',
                                                        {
                                                          value: [
                                                            'Personal details',
                                                          ],
                                                        },
                                                      ),
                                                      fullWidth: toggle(
                                                        'Full width',
                                                        {
                                                          value: true,
                                                          configuration: {
                                                            condition: showIf(
                                                              'variant',
                                                              'EQ',
                                                              'icon',
                                                            ),
                                                          },
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [],
                                                ),
                                                Divider(
                                                  {
                                                    options: {
                                                      ...dividerOptions,
                                                      color: color('Color', {
                                                        value: ThemeColor.LIGHT,
                                                      }),
                                                      outerSpacing: sizes(
                                                        'Outer space',
                                                        {
                                                          value: [
                                                            'S',
                                                            '0rem',
                                                            'S',
                                                            '0rem',
                                                          ],
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [],
                                                ),
                                                OpenPageButton(
                                                  {
                                                    ref: {
                                                      id: '#activeChangePasswordButton',
                                                    },
                                                    style: {
                                                      overwrite: {
                                                        backgroundColor: {
                                                          type: 'THEME_COLOR',
                                                          value: 'primary',
                                                        },
                                                        boxShadow: 'none',
                                                        color: {
                                                          type: 'THEME_COLOR',
                                                          value: 'white',
                                                        },
                                                        fontFamily: 'Roboto',
                                                        fontSize: '0.875rem',
                                                        fontStyle: 'none',
                                                        fontWeight: '400',
                                                        padding: [
                                                          '1.25rem',
                                                          '1.375rem',
                                                        ],
                                                        textDecoration: 'none',
                                                        textTransform: 'none',
                                                      },
                                                    },
                                                    options: {
                                                      ...openPageButtonOptions,
                                                      visible: toggle(
                                                        'Toggle visibility',
                                                        {
                                                          value: false,
                                                          configuration: {
                                                            as: 'VISIBILITY',
                                                          },
                                                        },
                                                      ),
                                                      buttonText: variable(
                                                        'Button text',
                                                        {
                                                          value: [
                                                            'Change password',
                                                          ],
                                                        },
                                                      ),
                                                      fullWidth: toggle(
                                                        'Full width',
                                                        {
                                                          value: true,
                                                          configuration: {
                                                            condition: showIf(
                                                              'variant',
                                                              'EQ',
                                                              'icon',
                                                            ),
                                                          },
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [],
                                                ),
                                                OpenPageButton(
                                                  {
                                                    ref: {
                                                      id: '#changePasswordButton',
                                                    },
                                                    style: {
                                                      overwrite: {
                                                        backgroundColor: {
                                                          type: 'THEME_COLOR',
                                                          value: 'white',
                                                        },
                                                        boxShadow: 'none',
                                                        color: {
                                                          type: 'THEME_COLOR',
                                                          value: 'primary',
                                                        },
                                                        fontFamily: 'Roboto',
                                                        fontSize: '0.875rem',
                                                        fontStyle: 'none',
                                                        fontWeight: '400',
                                                        padding: [
                                                          '1.25rem',
                                                          '1.375rem',
                                                        ],
                                                        textDecoration: 'none',
                                                        textTransform: 'none',
                                                      },
                                                    },
                                                    options: {
                                                      ...openPageButtonOptions,
                                                      buttonText: variable(
                                                        'Button text',
                                                        {
                                                          value: [
                                                            'Change password',
                                                          ],
                                                        },
                                                      ),
                                                      fullWidth: toggle(
                                                        'Full width',
                                                        {
                                                          value: true,
                                                          configuration: {
                                                            condition: showIf(
                                                              'variant',
                                                              'EQ',
                                                              'icon',
                                                            ),
                                                          },
                                                        },
                                                      ),
                                                    },
                                                  },
                                                  [],
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                        Column(
                                          {
                                            options: {
                                              ...columnOptions,
                                              columnWidth: option('CUSTOM', {
                                                label: 'Column width',
                                                value: '9',
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
                                              }),
                                              columnWidthTabletLandscape:
                                                option('CUSTOM', {
                                                  label:
                                                    'Column width (tablet landscape)',
                                                  value: '9',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                }),
                                              columnWidthTabletPortrait: option(
                                                'CUSTOM',
                                                {
                                                  value: '12',
                                                  label:
                                                    'Column width (tablet portrait)',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                              columnWidthMobile: option(
                                                'CUSTOM',
                                                {
                                                  value: '12',
                                                  label:
                                                    'Column width (mobile)',
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
                                                      {
                                                        name: '10',
                                                        value: '10',
                                                      },
                                                      {
                                                        name: '11',
                                                        value: '11',
                                                      },
                                                      {
                                                        name: '12',
                                                        value: '12',
                                                      },
                                                    ],
                                                  },
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            prefabBox(
                                              {
                                                options: {
                                                  ...boxOptions,
                                                  backgroundColor: color(
                                                    'Background color',
                                                    {
                                                      value: ThemeColor.WHITE,
                                                    },
                                                  ),
                                                },
                                              },
                                              [
                                                Tabs(
                                                  {
                                                    ref: {
                                                      id: '#DetailsTab',
                                                    },
                                                    options: {
                                                      ...tabsOptions,
                                                      hideTabs: toggle(
                                                        'Hide visual tabs',
                                                        { value: true },
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
                                                    },
                                                  },
                                                  [
                                                    Tab(
                                                      {
                                                        label: 'Details',
                                                        ref: {
                                                          id: '#personalDetailsTab',
                                                        },
                                                        options: {
                                                          ...tabOptions,
                                                          label: variable(
                                                            'Tab label',
                                                            {
                                                              value: [
                                                                'detials',
                                                              ],
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [
                                                        TextPrefab(
                                                          {
                                                            options: {
                                                              ...textOptions,
                                                              content: variable(
                                                                'Content',
                                                                {
                                                                  value: [
                                                                    'Personal details',
                                                                  ],
                                                                  configuration:
                                                                    {
                                                                      as: 'MULTILINE',
                                                                    },
                                                                },
                                                              ),
                                                              type: font(
                                                                'Text style',
                                                                {
                                                                  value: [
                                                                    'Title5',
                                                                  ],
                                                                },
                                                              ),
                                                            },
                                                          },
                                                          [],
                                                        ),
                                                        Divider(
                                                          {
                                                            options: {
                                                              ...dividerOptions,
                                                              color: color(
                                                                'Color',
                                                                {
                                                                  value:
                                                                    ThemeColor.LIGHT,
                                                                },
                                                              ),
                                                              outerSpacing:
                                                                sizes(
                                                                  'Outer space',
                                                                  {
                                                                    value: [
                                                                      'm',
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
                                                        Alert({
                                                          ref: {
                                                            id: '#personalDetailsSuccessAlert',
                                                          },
                                                          options: {
                                                            ...alertOptions,
                                                            allowTextServerResponse:
                                                              toggle(
                                                                'Allow to overwrite by the server response',
                                                                {
                                                                  value: true,
                                                                },
                                                              ),
                                                            icon: icon('Icon', {
                                                              value:
                                                                'CheckCircle',
                                                            }),

                                                            bodyText: variable(
                                                              'Body text',
                                                              {
                                                                value: [
                                                                  'Updates saved successfully',
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
                                                        }),
                                                        Alert({
                                                          ref: {
                                                            id: '#personalDetailsErrorAlert',
                                                          },
                                                          options: {
                                                            ...alertOptions,
                                                            allowTextServerResponse:
                                                              toggle(
                                                                'Allow to overwrite by the server response',
                                                                {
                                                                  value: true,
                                                                },
                                                              ),
                                                            icon: icon('Icon', {
                                                              value: 'Warning',
                                                            }),

                                                            bodyText: variable(
                                                              'Body text',
                                                              {
                                                                value: [
                                                                  'Something went wrong while updating your details',
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
                                                            background: color(
                                                              'Background color',
                                                              {
                                                                value:
                                                                  ThemeColor.DANGER,
                                                              },
                                                            ),
                                                          },
                                                        }),
                                                        component(
                                                          'Form',
                                                          {
                                                            options: {
                                                              ...formOptions,
                                                              actionId: option(
                                                                'ACTION_JS',
                                                                {
                                                                  label:
                                                                    'Action',
                                                                  value: '',
                                                                  ref: {
                                                                    id: '#editProfileDetailsAction',
                                                                  },
                                                                },
                                                              ),
                                                            },
                                                            ref: {
                                                              id: '#editProfileDetailsForm',
                                                            },
                                                          },
                                                          [
                                                            prefabBox(
                                                              {
                                                                ref: {
                                                                  id: '#formInputBox',
                                                                },

                                                                options: {
                                                                  ...boxOptions,
                                                                  outerSpacing:
                                                                    sizes(
                                                                      'Outer space',
                                                                      {
                                                                        value: [
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                          '0rem',
                                                                        ],
                                                                      },
                                                                    ),
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
                                                              [],
                                                            ),
                                                            prefabBox(
                                                              {
                                                                options: {
                                                                  ...boxOptions,
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
                                                                  innerSpacing:
                                                                    sizes(
                                                                      'Inner space',
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
                                                              },
                                                              [
                                                                SubmitButton(
                                                                  {
                                                                    ref: {
                                                                      id: '#saveProfileDetailsButton',
                                                                    },
                                                                    options: {
                                                                      ...submitButtonOptions,
                                                                      buttonText:
                                                                        variable(
                                                                          'Button text',
                                                                          {
                                                                            value:
                                                                              [
                                                                                'Save changes',
                                                                              ],
                                                                          },
                                                                        ),
                                                                    },
                                                                    style: {
                                                                      overwrite:
                                                                        {
                                                                          backgroundColor:
                                                                            {
                                                                              type: 'THEME_COLOR',
                                                                              value:
                                                                                'primary',
                                                                            },
                                                                          boxShadow:
                                                                            'none',
                                                                          color:
                                                                            {
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
                                                                          padding:
                                                                            [
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
                                                        label: 'Password',
                                                        ref: {
                                                          id: '#changePasswordTab',
                                                        },
                                                        options: {
                                                          ...tabOptions,
                                                          label: variable(
                                                            'Tab label',
                                                            {
                                                              value: [
                                                                'password',
                                                              ],
                                                            },
                                                          ),
                                                        },
                                                      },
                                                      [
                                                        TextPrefab(
                                                          {
                                                            options: {
                                                              ...textOptions,
                                                              content: variable(
                                                                'Content',
                                                                {
                                                                  value: [
                                                                    'Change password',
                                                                  ],
                                                                  configuration:
                                                                    {
                                                                      as: 'MULTILINE',
                                                                    },
                                                                },
                                                              ),
                                                              type: font(
                                                                'Text style',
                                                                {
                                                                  value: [
                                                                    'Title5',
                                                                  ],
                                                                },
                                                              ),
                                                            },
                                                          },
                                                          [],
                                                        ),
                                                        Divider(
                                                          {
                                                            options: {
                                                              ...dividerOptions,
                                                              color: color(
                                                                'Color',
                                                                {
                                                                  value:
                                                                    ThemeColor.LIGHT,
                                                                },
                                                              ),
                                                              outerSpacing:
                                                                sizes(
                                                                  'Outer space',
                                                                  {
                                                                    value: [
                                                                      'm',
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
                                                        Alert({
                                                          ref: {
                                                            id: '#passwordSuccessAlert',
                                                          },
                                                          options: {
                                                            ...alertOptions,
                                                            icon: icon('Icon', {
                                                              value:
                                                                'CheckCircle',
                                                            }),

                                                            bodyText: variable(
                                                              'Body text',
                                                              {
                                                                value: [
                                                                  'Password updated successfully',
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
                                                        }),
                                                        Alert({
                                                          ref: {
                                                            id: '#passwordErrorAlert',
                                                          },
                                                          options: {
                                                            ...alertOptions,
                                                            icon: icon('Icon', {
                                                              value: 'Warning',
                                                            }),

                                                            bodyText: variable(
                                                              'Body text',
                                                              {
                                                                value: [
                                                                  'Something went wrong while updating your password',
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
                                                            background: color(
                                                              'Background color',
                                                              {
                                                                value:
                                                                  ThemeColor.DANGER,
                                                              },
                                                            ),
                                                          },
                                                        }),
                                                        component(
                                                          'Form',
                                                          {
                                                            options: {
                                                              ...formOptions,
                                                              actionId: option(
                                                                'ACTION_JS',
                                                                {
                                                                  label:
                                                                    'Action',
                                                                  value: '',
                                                                  ref: {
                                                                    id: '#updatePasswordAction',
                                                                  },
                                                                },
                                                              ),
                                                            },
                                                            ref: {
                                                              id: '#updatePasswordForm',
                                                            },
                                                          },
                                                          [
                                                            prefabBox(
                                                              {
                                                                options: {
                                                                  ...boxOptions,
                                                                  innerSpacing:
                                                                    sizes(
                                                                      'Inner space',
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
                                                              },
                                                              [
                                                                TextPrefab(
                                                                  {
                                                                    options: {
                                                                      ...textOptions,
                                                                      content:
                                                                        variable(
                                                                          'Content',
                                                                          {
                                                                            value:
                                                                              [
                                                                                'Current password',
                                                                              ],
                                                                            configuration:
                                                                              {
                                                                                as: 'MULTILINE',
                                                                              },
                                                                          },
                                                                        ),
                                                                      type: font(
                                                                        'Text style',
                                                                        {
                                                                          value:
                                                                            [
                                                                              'Body1',
                                                                            ],
                                                                        },
                                                                      ),
                                                                      outerSpacing:
                                                                        sizes(
                                                                          'Outer space',
                                                                          {
                                                                            value:
                                                                              [
                                                                                '0rem',
                                                                                '0rem',
                                                                                'S',
                                                                                '0rem',
                                                                              ],
                                                                          },
                                                                        ),
                                                                    },
                                                                  },
                                                                  [],
                                                                ),
                                                                TextInput(
                                                                  {
                                                                    label:
                                                                      'Password field',
                                                                    inputLabel:
                                                                      'Current password',
                                                                    type: 'password',
                                                                    adornmentIcon:
                                                                      'VisibilityOff',
                                                                    options: {
                                                                      ...textInputOptions,
                                                                      hideLabel:
                                                                        toggle(
                                                                          'Hide label',
                                                                          {
                                                                            value:
                                                                              true,
                                                                          },
                                                                        ),
                                                                      margin:
                                                                        buttongroup(
                                                                          'Margin',
                                                                          [
                                                                            [
                                                                              'None',
                                                                              'none',
                                                                            ],
                                                                            [
                                                                              'Dense',
                                                                              'dense',
                                                                            ],
                                                                            [
                                                                              'Normal',
                                                                              'normal',
                                                                            ],
                                                                          ],
                                                                          {
                                                                            value:
                                                                              'none',
                                                                          },
                                                                        ),
                                                                    },
                                                                  },
                                                                  [],
                                                                ),
                                                              ],
                                                            ),
                                                            prefabBox(
                                                              {
                                                                ref: {
                                                                  id: '#updatePasswordBox',
                                                                },
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
                                                              [],
                                                            ),
                                                            prefabBox(
                                                              {
                                                                options: {
                                                                  ...boxOptions,
                                                                  innerSpacing:
                                                                    sizes(
                                                                      'Inner space',
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
                                                              },
                                                              [
                                                                TextPrefab(
                                                                  {
                                                                    options: {
                                                                      ...textOptions,
                                                                      content:
                                                                        variable(
                                                                          'Content',
                                                                          {
                                                                            value:
                                                                              [
                                                                                'Confirm password',
                                                                              ],
                                                                            configuration:
                                                                              {
                                                                                as: 'MULTILINE',
                                                                              },
                                                                          },
                                                                        ),
                                                                      type: font(
                                                                        'Text style',
                                                                        {
                                                                          value:
                                                                            [
                                                                              'Body1',
                                                                            ],
                                                                        },
                                                                      ),
                                                                      outerSpacing:
                                                                        sizes(
                                                                          'Outer space',
                                                                          {
                                                                            value:
                                                                              [
                                                                                '0rem',
                                                                                '0rem',
                                                                                'S',
                                                                                '0rem',
                                                                              ],
                                                                          },
                                                                        ),
                                                                    },
                                                                  },
                                                                  [],
                                                                ),
                                                                TextInput(
                                                                  {
                                                                    label:
                                                                      'Password field',
                                                                    inputLabel:
                                                                      'Confirm password',
                                                                    type: 'password',
                                                                    adornmentIcon:
                                                                      'VisibilityOff',
                                                                    options: {
                                                                      ...textInputOptions,
                                                                      hideLabel:
                                                                        toggle(
                                                                          'Hide label',
                                                                          {
                                                                            value:
                                                                              true,
                                                                          },
                                                                        ),
                                                                      margin:
                                                                        buttongroup(
                                                                          'Margin',
                                                                          [
                                                                            [
                                                                              'None',
                                                                              'none',
                                                                            ],
                                                                            [
                                                                              'Dense',
                                                                              'dense',
                                                                            ],
                                                                            [
                                                                              'Normal',
                                                                              'normal',
                                                                            ],
                                                                          ],
                                                                          {
                                                                            value:
                                                                              'none',
                                                                          },
                                                                        ),
                                                                    },
                                                                  },
                                                                  [],
                                                                ),
                                                              ],
                                                            ),
                                                            prefabBox(
                                                              {
                                                                options: {
                                                                  ...boxOptions,
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
                                                                  innerSpacing:
                                                                    sizes(
                                                                      'Inner space',
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
                                                              },
                                                              [
                                                                SubmitButton(
                                                                  {
                                                                    ref: {
                                                                      id: '#savePasswordButton',
                                                                    },
                                                                    options: {
                                                                      ...submitButtonOptions,

                                                                      buttonText:
                                                                        variable(
                                                                          'Button text',
                                                                          {
                                                                            value:
                                                                              [
                                                                                'Update password',
                                                                              ],
                                                                          },
                                                                        ),
                                                                    },
                                                                    style: {
                                                                      overwrite:
                                                                        {
                                                                          backgroundColor:
                                                                            {
                                                                              type: 'THEME_COLOR',
                                                                              value:
                                                                                'primary',
                                                                            },
                                                                          boxShadow:
                                                                            'none',
                                                                          color:
                                                                            {
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
                                                                          padding:
                                                                            [
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
                                                  ],
                                                ),
                                              ],
                                            ),
                                            Alert({
                                              options: {
                                                ...alertOptions,
                                                verticalAlignment: buttongroup(
                                                  'Vertical Alignment',
                                                  [
                                                    ['Top', 'flex-start'],
                                                    ['Center', 'center'],
                                                    ['Bottom', 'flex-end'],
                                                    ['Justified', 'stretch'],
                                                  ],
                                                  {
                                                    value: 'stretch',
                                                    configuration: {
                                                      dataType: 'stretch',
                                                    },
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
                                                icon: icon('Icon', {
                                                  value: 'Info',
                                                }),
                                                titleText: variable(
                                                  'Title text',
                                                  {
                                                    value: ['Reminder'],
                                                  },
                                                ),
                                                bodyText: variable(
                                                  'Body text',
                                                  {
                                                    value: [
                                                      'The user needs to add conditional checks to see if the current password is the current password and if the new and confirm-password fields match.',
                                                    ],
                                                  },
                                                ),
                                                textColor: color('Text color', {
                                                  value: ThemeColor.WHITE,
                                                }),
                                                iconColor: color('Icon color', {
                                                  value: ThemeColor.WHITE,
                                                }),
                                                background: color(
                                                  'Background color',
                                                  {
                                                    value: ThemeColor.INFO,
                                                  },
                                                ),
                                                outerSpacing: sizes(
                                                  'Outer space',
                                                  {
                                                    value: [
                                                      'M',
                                                      '0rem',
                                                      'M',
                                                      '0rem',
                                                    ],
                                                  },
                                                ),
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
                          ]),
                        ],
                      ),
                    ],
                  ),
                  // footer
                  prefabBox(
                    {
                      ref: { id: '#Footer' },
                      options: {
                        ...boxOptions,
                        width: size('Width', {
                          value: '100%',
                          configuration: {
                            as: 'UNIT',
                          },
                        }),
                        innerSpacing: sizes('Inner space', {
                          ref: { id: '#footerBoxInnerSpacing' },
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.LIGHT,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                        backgroundColorAlpha: option('NUMBER', {
                          label: 'Background color opacity',
                          value: 20,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
                          },
                        }),
                      },
                    },
                    [
                      prefabBox(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              ref: { id: '#footerBoxInnerSpacing' },
                              value: ['L', 'L', 'L', 'L'],
                            }),
                          },
                        },
                        [
                          TextPrefab(
                            {
                              options: {
                                ...textOptions,
                                content: variable('Content', {
                                  value: ['Powered by Bettyblocks'],
                                  configuration: { as: 'MULTILINE' },
                                }),
                                textAlignment: option('CUSTOM', {
                                  label: 'Text Alignment',
                                  value: 'center',
                                  configuration: {
                                    as: 'BUTTONGROUP',
                                    dataType: 'string',
                                    allowedInput: [
                                      { name: 'Left', value: 'left' },
                                      { name: 'Center', value: 'center' },
                                      { name: 'Right', value: 'right' },
                                    ],
                                  },
                                }),
                                type: font('Text style', { value: ['Body1'] }),
                                styles: toggle('Styles', { value: true }),
                                textColor: color('Text color', {
                                  value: ThemeColor.MEDIUM,
                                  configuration: {
                                    condition: showIfTrue('styles'),
                                  },
                                }),
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
            ],
          ),
        ],
      ),
    ],
  ),
]);
