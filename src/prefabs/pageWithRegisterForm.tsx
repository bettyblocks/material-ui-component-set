import * as React from 'react';
import {
  Icon,
  prefab as makePrefab,
  component,
  option,
  PrefabReference,
  text,
  sizes,
  size,
  showIf,
  toggle,
  ThemeColor,
  color,
  variable,
  font,
  buttongroup,
  PrefabInteraction,
  InteractionType,
  icon,
  hideIf,
  PrefabComponentOption,
  wrapper,
  linked,
  BeforeCreateArgs,
  PrefabComponent,
} from '@betty-blocks/component-sdk';
import {
  Box as BoxComponent,
  boxOptions,
  Column,
  columnOptions,
  FormErrorAlert,
  Grid,
  gridOptions,
  Media,
  mediaOptions,
  Row,
  rowOptions,
  Text as TextComponent,
  textOptions,
  SubmitButton,
  submitButtonOptions,
  OpenPageButton,
  openPageButtonOptions,
  alertOptions,
} from './structures';
import { options as formOptions } from './structures/ActionJSForm/options';
import { Alert } from './structures/Alert/index';
import { IdPropertyProps, ModelProps, ModelQuery, Properties } from './types';
import { PermissionType } from './types/types';

const interactions: PrefabInteraction[] = [
  {
    name: 'Show',
    sourceEvent: 'onActionError',
    ref: {
      targetComponentId: '#alertErrorId',
      sourceComponentId: '#formId',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Show',
    sourceEvent: 'onActionSuccess',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#formId',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionLoad',
    ref: {
      targetComponentId: '#registerBtn',
      sourceComponentId: '#formId',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Toggle loading state',
    sourceEvent: 'onActionDone',
    ref: {
      targetComponentId: '#registerBtn',
      sourceComponentId: '#formId',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#alertSuccessId',
      sourceComponentId: '#formId',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Hide',
    sourceEvent: 'onSubmit',
    ref: {
      targetComponentId: '#alertErrorId',
      sourceComponentId: '#formId',
    },
    type: InteractionType.Custom,
  },
];

const attrs = {
  icon: Icon.LoginFormIcon,
  type: 'page',
  isPublicPage: true,
  description: 'Page with a ready to use register form and image.',
  detail:
    'It takes a few clicks to set up your register page. Connect your model to the form and feel free to customize your image to your liking.',
  previewUrl: 'https://preview.betty.app/register',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Register.jpg',
  category: 'LAYOUT',
  interactions,
};

const newColumnOptions = {
  ...columnOptions,
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
  columnWidthTabletPortrait: option('CUSTOM', {
    value: '12',
    label: 'Column width (tablet portrait)',
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
  columnWidthMobile: option('CUSTOM', {
    value: 'flexible',
    label: 'Column width (mobile)',
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
  innerSpacing: sizes('Inner space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
};

const newRowOptions = {
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
};

const beforeCreate = ({
  prefab,
  save,
  close,
  components: {
    Header,
    Content,
    Field,
    Footer,
    Text,
    Box,
    ModelSelector,
    PropertiesSelector,
  },
  helpers: {
    createUuid,
    prepareAction,
    PropertyKind,
    makeBettyInput,
    BettyPrefabs,
    useModelQuery,
    setOption,
    cloneStructure,
    createBlacklist,
  },
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState<ModelProps>();
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const [showModelValidation, setShowModelValidation] = React.useState(false);
  const [properties, setProperties] = React.useState<Properties[]>([]);
  const [showPropertiesValidation, setShowPropertiesValidation] =
    React.useState(false);
  const permissions: PermissionType = 'public';
  const componentId = createUuid();

  useModelQuery({
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

  const isEmpty = (value: Properties[]) =>
    !value || Object.keys(value).length === 0;

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

  return (
    <>
      <Header onClose={close} title="Configure register form" />
      <Box
        justify="center"
        margin={{ bottom: '2rem', left: '2rem', top: '-1rem' }}
      >
        <Text size="medium" weight="bold">
          Step: 2 / 2
        </Text>
      </Box>
      <Content>
        <Field
          label="Select model"
          error={
            showModelValidation && (
              <Text color="#e82600">Selecting a model is required</Text>
            )
          }
        >
          <ModelSelector
            onChange={(value: string) => {
              setShowModelValidation(false);
              setModelId(value);
            }}
            value={modelId}
          />
        </Field>
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
            modelId={modelId}
            value={properties}
            onChange={(value: Properties[]) => {
              setProperties(value);
              setShowPropertiesValidation(isEmpty(value));
            }}
            scopedModels={false}
            disabledNames={['created_at', 'updated_at', 'id']}
            disabledKinds={disabledKinds}
          />
        </Field>
      </Content>
      <Footer
        onClose={close}
        onSave={async () => {
          if (!modelId) {
            setShowModelValidation(true);
            return;
          }

          if (isEmpty(properties)) {
            setShowPropertiesValidation(true);
            return;
          }
          const newPrefab = { ...prefab };
          if (idProperty && model) {
            const inputBox = treeSearch('#formInputBox', newPrefab.structure);
            if (!inputBox) throw new Error('No inputBox found');
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
            const formPrefab = treeSearch('#formId', newPrefab.structure);
            if (!formPrefab) throw new Error('No register form found');
            formPrefab.id = componentId;
            const result = await prepareAction(
              componentId,
              idProperty,
              properties,
              'create',
              undefined,
              undefined,
              permissions,
            );
            setOption(
              formPrefab,
              'actionId',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: result.action.actionId,
              }),
            );
            setOption(
              formPrefab,
              'model',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: modelId,
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
                    const inputPrefab = makeBettyInput(
                      prefabName,
                      model,
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
                    default:
                      return inputStructure(
                        prop.label,
                        bettyInput(BettyPrefabs.STRING),
                      );
                  }
                };
                const newInputPrefabs = newInput();
                inputBox.descendants.push(newInputPrefabs);
              },
            );

            setOption(
              formPrefab,
              'actionId',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: result.action.actionId,
              }),
            );
            setOption(
              formPrefab,
              'model',
              (originalOption: PrefabComponentOption) => ({
                ...originalOption,
                value: modelId,
              }),
            );
          }
          save(newPrefab);
        }}
      />
    </>
  );
};

export default makePrefab('User, account register only', attrs, beforeCreate, [
  Row(
    {
      options: newRowOptions,
    },
    [
      Column({ options: newColumnOptions }, [
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
                wrapper(
                  {
                    label: 'Register',
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
                    },
                  },
                  [
                    BoxComponent(
                      {
                        options: {
                          ...boxOptions,
                          innerSpacing: sizes('Inner space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                          height: size('Height', {
                            value: '100%',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                          backgroundOptions: toggle('Show background options', {
                            value: true,
                          }),
                          backgroundUrl: variable('Background url', {
                            value: [
                              'https://assets.bettyblocks.com/1e9019bb1c5c4af2ba799c2ee1761af0_assets/files/login-background',
                            ],
                            configuration: {
                              condition: showIf(
                                'backgroundOptions',
                                'EQ',
                                true,
                              ),
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
                                condition: showIf(
                                  'backgroundOptions',
                                  'EQ',
                                  true,
                                ),
                              },
                            },
                          ),
                        },
                      },
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
                              rowHeight: text('Height', {
                                value: '100vh',
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
                                    value: '6',
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
                                  backgroundColor: color('Background color', {
                                    value: ThemeColor.WHITE,
                                  }),
                                  verticalAlignment: option('CUSTOM', {
                                    label: 'Vertical Alignment',
                                    value: 'center',
                                    configuration: {
                                      as: 'BUTTONGROUP',
                                      dataType: 'string',
                                      allowedInput: [
                                        { name: 'None', value: 'inherit' },
                                        { name: 'Top', value: 'flex-start' },
                                        { name: 'Center', value: 'center' },
                                        { name: 'Bottom', value: 'flex-end' },
                                      ],
                                    },
                                  }),
                                },
                              },
                              [
                                BoxComponent(
                                  {
                                    options: {
                                      ...boxOptions,
                                      innerSpacing: sizes('Inner space', {
                                        value: ['0rem', 'XL', '0rem', 'XL'],
                                      }),
                                    },
                                  },
                                  [
                                    BoxComponent(
                                      {
                                        options: {
                                          ...boxOptions,
                                          innerSpacing: sizes('Inner space', {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
                                        },
                                      },
                                      [
                                        Media(
                                          {
                                            options: {
                                              ...mediaOptions,
                                              imageSource: variable('Source', {
                                                value: [
                                                  'https://assets.bettyblocks.com/373317d12bf04d5496079adc02aab34a_assets/files/Your_Logo_-_B.svg',
                                                ],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                  condition: showIf(
                                                    'type',
                                                    'EQ',
                                                    'img',
                                                  ),
                                                },
                                              }),
                                              width: size('Width', {
                                                value: '',
                                                configuration: {
                                                  as: 'UNIT',
                                                },
                                              }),
                                              outerSpacing: sizes(
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
                                            },
                                          },
                                          [],
                                        ),
                                      ],
                                    ),
                                    BoxComponent(
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
                                          innerSpacing: sizes('Inner space', {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
                                        },
                                      },
                                      [],
                                    ),
                                    BoxComponent(
                                      {
                                        options: {
                                          ...boxOptions,
                                          innerSpacing: sizes('Inner space', {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
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
                                                value: ['Create new account'],
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
                                    BoxComponent(
                                      {
                                        options: {
                                          ...boxOptions,
                                          height: size('Height', {
                                            value: '2vh',
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
                                      },
                                      [],
                                    ),
                                    BoxComponent(
                                      {
                                        options: {
                                          ...boxOptions,
                                          innerSpacing: sizes('Inner space', {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                              '0rem',
                                            ],
                                          }),
                                        },
                                      },
                                      [
                                        BoxComponent(
                                          {
                                            options: {
                                              ...boxOptions,
                                              alignment: buttongroup(
                                                'Alignment',
                                                [
                                                  ['None', 'none'],
                                                  ['Left', 'flex-start'],
                                                  ['Center', 'center'],
                                                  ['Right', 'flex-end'],
                                                  [
                                                    'Justified',
                                                    'space-between',
                                                  ],
                                                ],
                                                {
                                                  value: 'flex-start',
                                                  configuration: {
                                                    dataType: 'string',
                                                  },
                                                },
                                              ),
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    'M',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
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
                                                      value: 'dark',
                                                    },
                                                    fontFamily: 'Roboto',
                                                    fontSize: '0.875rem',
                                                    fontStyle: 'none',
                                                    fontWeight: '500',
                                                    padding: [
                                                      '0.6875rem',
                                                      '1.375rem',
                                                      '0.6875rem',
                                                      '0rem',
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
                                                      value: ['Back to login'],
                                                    },
                                                  ),
                                                  icon: icon('Icon', {
                                                    value: 'ChevronLeft',
                                                  }),
                                                  size: option('CUSTOM', {
                                                    value: 'medium',
                                                    label: 'Icon size',
                                                    configuration: {
                                                      as: 'BUTTONGROUP',
                                                      dataType: 'string',
                                                      allowedInput: [
                                                        {
                                                          name: 'Small',
                                                          value: 'small',
                                                        },
                                                        {
                                                          name: 'Medium',
                                                          value: 'medium',
                                                        },
                                                        {
                                                          name: 'Large',
                                                          value: 'large',
                                                        },
                                                      ],
                                                      condition: hideIf(
                                                        'icon',
                                                        'EQ',
                                                        'none',
                                                      ),
                                                    },
                                                  }),
                                                },
                                              },
                                              [],
                                            ),
                                          ],
                                        ),
                                        component(
                                          'Form',
                                          {
                                            options: formOptions,
                                            ref: { id: '#formId' },
                                          },
                                          [
                                            Alert({
                                              ref: { id: '#alertSuccessId' },
                                              options: {
                                                ...alertOptions,
                                                icon: icon('Icon', {
                                                  value: 'CheckCircle',
                                                }),
                                                titleText: variable(
                                                  'Title text',
                                                  {
                                                    value: ['Success'],
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
                                                textColor: color('Text color', {
                                                  value: ThemeColor.WHITE,
                                                }),
                                                iconColor: color('Icon color', {
                                                  value: ThemeColor.WHITE,
                                                }),
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
                                              ref: { id: '#alertErrorId' },
                                            }),
                                            BoxComponent({
                                              ref: { id: '#formInputBox' },

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
                                            }),
                                            BoxComponent(
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
                                                SubmitButton(
                                                  {
                                                    ref: { id: '#registerBtn' },
                                                    options: {
                                                      ...submitButtonOptions,
                                                      buttonText: variable(
                                                        'Button text',
                                                        {
                                                          value: [
                                                            'Create account',
                                                          ],
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
                                                          '0.6875rem',
                                                          '1.375rem',
                                                        ],
                                                        textDecoration: 'none',
                                                        textTransform: 'none',
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
          ],
        ),
      ]),
    ],
  ),
]);
