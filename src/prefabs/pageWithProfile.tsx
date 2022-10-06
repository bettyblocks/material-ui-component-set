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
} from './structures';
import {
  AuthenticationProfile,
  IdPropertyProps,
  ModelProps,
  ModelQuery,
  Properties,
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
  // {
  //   name: 'Refetch',
  //   sourceEvent: 'onActionSuccess',
  //   ref: {
  //     targetComponentId: '#authenticationDataContainer',
  //     sourceComponentId: '#editProfileDetailsForm',
  //   },
  //   type: InteractionType.Custom,
  // },
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
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#personalDetailsSuccessAlert',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#personalDetailsErrorAlert',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#saveProfileDetailsButton',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionDone',
    ref: {
      targetComponentId: '#saveProfileDetailsButton',
      sourceComponentId: '#editProfileDetailsForm',
    },
    type: InteractionType.Custom,
  },
  // {
  //   name: 'Show',
  //   sourceEvent: 'onActionSuccess',
  //   ref: {
  //     targetComponentId: '#passwordSuccessAlert',
  //     sourceComponentId: '#updatePasswordForm',
  //   },
  //   type: InteractionType.Custom,
  // },
  // {
  //   name: 'Show',
  //   sourceEvent: 'onActionError',
  //   ref: {
  //     targetComponentId: '#passwordErrorAlert',
  //     sourceComponentId: '#updatePasswordForm',
  //   },
  //   type: InteractionType.Custom,
  // },
  // {
  //   name: 'Hide',
  //   sourceEvent: 'onSubmit',
  //   ref: {
  //     targetComponentId: '#passwordSuccessAlert',
  //     sourceComponentId: '#updatePasswordForm',
  //   },
  //   type: InteractionType.Custom,
  // },
  // {
  //   name: 'Hide',
  //   sourceEvent: 'onSubmit',
  //   ref: {
  //     targetComponentId: '#passwordErrorAlert',
  //     sourceComponentId: '#updatePasswordForm',
  //   },
  //   type: InteractionType.Custom,
  // },
  // {
  //   name: 'Toggle loading state',
  //   sourceEvent: 'onSubmit',
  //   ref: {
  //     targetComponentId: '#savePasswordButton',
  //     sourceComponentId: '#updatePasswordForm',
  //   },
  //   type: InteractionType.Custom,
  // },
  // {
  //   name: 'Toggle loading state',
  //   sourceEvent: 'onActionDone',
  //   ref: {
  //     targetComponentId: '#savePasswordButton',
  //     sourceComponentId: '#updatePasswordForm',
  //   },
  //   type: InteractionType.Custom,
  // },
];

const attrs = {
  name: 'A Profile details',
  icon: Icon.NavbarIcon,
  type: 'page',
  description:
    'This page contains a profile page and a page to change your password.',
  detail:
    'Customize the form fields on the profile page to your needs, and have users upload a profile picture. This template also provides a password page where users can change their passwords.',
  previewUrl: 'https://preview.betty.app/profile-details',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Profile_Page.jpg',
  category: 'LAYOUT',
  interactions,
};

const werkendeOptions = {
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
    createUuid,
    BettyPrefabs,
    PropertyKind,

    cloneStructure,
    makeBettyUpdateInput,
  },
}: BeforeCreateArgs) => {
  const componentId = createUuid();
  const [authProfileId, setAuthProfileId] = React.useState('');
  // const [authProfile, setAuthProfile] = React.useState<AuthenticationProfile>();
  // const [authProfileInvalid, setAuthProfileInvalid] = React.useState(false);
  // const [showModelValidation, setShowModelValidation] = React.useState(false);
  const [profileProperties, setProfileProperties] = React.useState([]);
  const [profilePropertiesValidation, setProfilePropertiesValidation] =
    React.useState(false);
  const [profileNameValidationMessage, setProfileNameValidationMessage] =
    React.useState('');
  const [profilePictureValidationMessage, setProfilePictureValidationMessage] =
    React.useState('');
  const [modelProp, setModel] = React.useState<ModelProps>();
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const [properties, setProperties] = React.useState<Properties[]>([]);

  // const [loggedInUserState, setLoggedInUserState] = React.useState({
  //   authenticationProfile: null,
  // });
  const [hasProfilePictureProperty, setHasProfilePictureProperty] =
    React.useState(false);
  const [profilePictureProperty, setProfilePictureProperty] =
    React.useState('');
  const [hasProfileNameProperty, setHasProfileNameProperty] =
    React.useState(false);
  const [profileNameProperty, setProfileNameProperty] = React.useState('');
  // const [authValidationMessage, setAuthValidationMessage] = React.useState('');
  const [modelId, setModelId] = React.useState('');
  // const { data } = useModelQuery({
  //   variables: { id: modelId },
  //   skip: !modelId,
  // });
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

  // const enrichVarObj = (obj: any) => {
  //   const returnObject = obj;
  //   if (data && data.model) {
  //     const property = data.model.properties.find(
  //       (prop: any) => prop.id === obj.id[0],
  //     );
  //     if (property) {
  //       returnObject.name = `{{ ${data.model.name}.${property.name} }}`;
  //     }
  //   }
  //   return returnObject;
  // };

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
                  setAuthProfileInvalid(false);
                  setAuthProfileId(id);
                  setAuthProfile(authProfileObject);
                  setModelId(authProfileObject.loginModel);
                }
              }}
              value={authProfileId}
            />
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
                label="Add profile picture selector"
                checked={hasProfilePictureProperty}
                onChange={() => {
                  setHasProfilePictureProperty(!hasProfilePictureProperty);
                  setProfilePictureValidationMessage('');
                }}
              />
              {hasProfilePictureProperty && (
                <PropertySelector
                  modelId={modelId}
                  onChange={(value: any) => {
                    setProfilePictureProperty(value);
                    setProfilePictureValidationMessage('');
                  }}
                  value={profilePictureProperty}
                  disabled={!modelId && !hasProfilePictureProperty}
                />
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
                }}
              />
              {hasProfileNameProperty && (
                <PropertySelector
                  modelId={modelId}
                  onChange={(value: any) => {
                    setProfileNameProperty(value);
                  }}
                  value={profileNameProperty}
                  disabled={!modelId && !hasProfileNameProperty}
                />
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
              disabledKinds={['PASSWORD']}
              onChange={(value: any) => {
                setProfilePropertiesValidation(!value.length);
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
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: ['M', '0rem', '0rem', '0rem'],
            }),
          );
          const textPrefab = cloneStructure('Text');
          if (textPrefab.type === 'COMPONENT') {
            setOption(
              textPrefab,
              'content',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: [textValue],
              }),
            );
            setOption(
              textPrefab,
              'type',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: ['Body1'],
              }),
            );
            setOption(
              textPrefab,
              'outerSpacing',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: ['0rem', '0rem', 'S', '0rem'],
              }),
            );
          }
          boxPrefab.descendants.push(textPrefab);
          boxPrefab.descendants.push(inputPrefab);
        }
        return boxPrefab;
      };
      const passwordform = treeSearch(
        '#updatePasswordForm',
        newPrefab.structure,
      );
      if (!passwordform) throw new Error('password form could not be found');
      passwordform.id = componentId;

      const resultpass = await prepareAction(
        componentId,
        // @ts-ignore
        idProperty,
        // Dit moet je authProfile.properties worden. maar de types komen niet overeen
        properties,
        'update',
      );

      setOption(
        passwordform,
        'actionId',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: resultpass.action.actionId,
        }),
      );
      setOption(
        passwordform,
        'model',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: modelId,
        }),
      );

      if (!modelProp) throw new Error('medel property could not be found');
      if (!idProperty) throw new Error('Property id could not be found');

      passwordform.descendants.push(
        makeBettyUpdateInput(
          BettyPrefabs.HIDDEN,
          modelProp,
          idProperty,
          resultpass.recordInputVariable,
        ),
      );

      const formObject = treeSearch(
        '#editProfileDetailsForm',
        newPrefab.structure,
      );
      if (!formObject) throw new Error('Form could not be found');
      formObject.id = componentId;

      const result = await prepareAction(
        componentId,
        // @ts-ignore
        idProperty,
        properties,
        'update',
      );
      setOption(
        formObject,
        'actionId',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: result.action.actionId,
        }),
      );
      setOption(
        formObject,
        'model',
        (originalOption: PrefabComponentOption) => ({
          ...originalOption,
          value: modelId,
        }),
      );
      formObject.descendants.push(
        makeBettyUpdateInput(
          BettyPrefabs.HIDDEN,
          modelProp,
          idProperty,
          result.recordInputVariable,
        ),
      );

      Object.values(result.variables).forEach(([prop, inputVariable]): void => {
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
                (originalOption: PrefabComponentOption) => ({
                  ...originalOption,
                  value: true,
                }),
              );
              setOption(
                inputPrefab,
                'dataComponentAttribute',
                (options: PrefabComponentOption) => ({
                  ...options,
                  value: [],
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
              return inputStructure(prop.label, bettyInput(BettyPrefabs.DATE));
            case PropertyKind.TIME:
              return inputStructure(prop.label, bettyInput(BettyPrefabs.TIME));
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
              return inputStructure(prop.label, bettyInput(BettyPrefabs.IBAN));
            case PropertyKind.IBAN:
              return inputStructure(prop.label, bettyInput(BettyPrefabs.LIST));
            case PropertyKind.LIST:
              return inputStructure(prop.label, bettyInput(BettyPrefabs.FILE));
            case PropertyKind.PHONE_NUMBER:
              return inputStructure(
                prop.label,
                bettyInput(BettyPrefabs.PHONE_NUMBER),
              );
            case PropertyKind.PRICE:
              return inputStructure(prop.label, bettyInput(BettyPrefabs.PRICE));
            case PropertyKind.URL:
              return inputStructure(prop.label, bettyInput(BettyPrefabs.URL));
            case PropertyKind.TEXT:
              return inputStructure(prop.label, bettyInput(BettyPrefabs.TEXT));
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

        const newInputPrefabs = newInput();
        inputBox.descendants.push(newInputPrefabs);
      });

      if (!modelId) {
        setShowModelValidation(true);
        return;
      }

      if (modelId) {
        const dataList = treeSearch('#dataContainer', newPrefab.structure);
        if (!dataList) throw new Error('No datalist found');
        setOption(
          dataList,
          'model',
          (originalOption: PrefabComponentOption) => ({
            ...originalOption,
            value: modelId,
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
            onSkip={() => {
              const newPrefab = { ...prefab };
              save(newPrefab);
            }}
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
      <Header onClose={close} title="A Profile details" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default makePrefab('Profile details', attrs, beforeCreate, [
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
                      },
                    },
                    [
                      wrapper(
                        {
                          label: 'my account',
                          optionCategories: [
                            {
                              label: 'my account',
                              expanded: true,
                              members: ['detailsTab', 'PasswordTab'],
                              condition: {
                                type: 'SHOW',
                                option: 'dialogVisibility',
                                comparator: 'EQ',
                                value: true,
                              },
                            },
                          ],
                          options: {
                            detailsTab: linked({
                              label: 'Visibility',
                              value: {
                                ref: {
                                  componentId: '#detailsTab',
                                  optionId: '#detailsTabOption',
                                },
                              },
                              configuration: {
                                as: 'BUTTONGROUP',
                                allowedInput: [
                                  { name: 'Overview', value: false },
                                  { name: 'Dialog', value: true },
                                ],
                              },
                            }),
                            PasswordTab: linked({
                              label: 'Page title',
                              value: {
                                ref: {
                                  componentId: '#PasswordTab',
                                  optionId: '#PasswordTabOption',
                                },
                              },
                              configuration: {
                                condition: showIf(
                                  'dialogVisibility',
                                  'EQ',
                                  false,
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
                                  columnWidth: option('CUSTOM', {
                                    label: 'Column width',
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
                                    value: '12',
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
                                    value: '12',
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
                                        value: ['My account'],
                                        configuration: { as: 'MULTILINE' },
                                      }),
                                      type: font('Font', { value: ['Title4'] }),
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
                                                        options: {
                                                          ...avatarOptions,
                                                          imgUrl: variable(
                                                            'Image url',
                                                            {
                                                              value: [
                                                                'https://assets.bettyblocks.com/4d7d80cf57a241899297fa9a768079f6_assets/files/user_default.png',
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
                                                        options: {
                                                          ...textOptions,
                                                          content: variable(
                                                            'Content',
                                                            {
                                                              value: [
                                                                'Profile name',
                                                              ],
                                                              configuration: {
                                                                as: 'MULTILINE',
                                                              },
                                                            },
                                                          ),
                                                          type: font('Font', {
                                                            value: ['Title5'],
                                                          }),
                                                        },
                                                      },
                                                      [],
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
                                                    options: {
                                                      ...tabsOptions,
                                                      hideTabs: toggle(
                                                        'Hide visual tabs',
                                                        { value: true },
                                                      ),
                                                    },
                                                  },
                                                  [
                                                    Tab(
                                                      {
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
                                                                'Font',
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
                                                                  'orem',
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
                                                                  'orem',
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
                                                          'Form Beta',
                                                          {
                                                            options:
                                                              werkendeOptions,
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
                                                                },
                                                              },
                                                              [],
                                                            ),
                                                            prefabBox(
                                                              {
                                                                options: {
                                                                  ...boxOptions,
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
                                                                'Font',
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
                                                          // ref: {
                                                          //   id: '#passwordSuccessAlert',
                                                          // },
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
                                                                  'orem',
                                                                  '0rem',
                                                                ],
                                                              },
                                                            ),
                                                          },
                                                        }),
                                                        Alert({
                                                          // ref: {
                                                          //   id: '#passwordErrorAlert',
                                                          // },
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
                                                                  'orem',
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
                                                          'Form Beta',
                                                          {
                                                            options:
                                                              werkendeOptions,
                                                            ref: {
                                                              id: '#updatePasswordForm',
                                                            },
                                                          },
                                                          [
                                                            prefabBox(
                                                              {
                                                                options: {
                                                                  ...boxOptions,
                                                                },
                                                              },
                                                              [
                                                                TextPrefab(
                                                                  {
                                                                    options: {
                                                                      ...textOptions,
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
                                                              ],
                                                            ),
                                                            prefabBox(
                                                              {
                                                                options: {
                                                                  ...boxOptions,
                                                                },
                                                              },
                                                              [
                                                                SubmitButton(
                                                                  {
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
                                type: font('Font', { value: ['Body1'] }),
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
