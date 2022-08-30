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
import { options as defaults } from './structures/ActionJSForm/options';
import { FormSuccessAlert } from './structures/Alert/index';

interface ActionResultsProps {
  variables: Record<string, any>;
  action: any;
  IdProperties: any;
  recordInputVariable: any;
}

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
    sourceEvent: 'onSubmit',
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
  name: 'Register form',
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
  },
}: any) => {
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState(null);
  const [idProperty, setIdProperty] = React.useState(null);
  const [showModelValidation, setShowModelValidation] = React.useState(false);
  const [properties, setProperties] = React.useState([]);
  const [showPropertiesValidation, setShowPropertiesValidation] =
    React.useState(false);
  const componentId = createUuid();

  useModelQuery({
    variables: { id: modelId },
    onCompleted: (result: any) => {
      setModel(result.model);
      setIdProperty(
        result.model.properties.find(
          ({ name }: { name: string }) => name === 'id',
        ),
      );
    },
  });

  const getDescendantByRef = (refValue: string, structure: any) =>
    structure.reduce((acc: string, comp: PrefabReference) => {
      if (acc) return acc;
      if (
        comp.type === 'COMPONENT' &&
        // eslint-disable-next-line no-prototype-builtins
        comp.ref
          ? Object.values(comp.ref).indexOf(refValue) > -1
          : undefined
      ) {
        return comp;
      }
      if (comp.type === 'PARTIAL') {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return getDescendantByRef(refValue, comp.descendants);
    }, null);

  const isEmpty = (value: any) =>
    !value || Object.keys(value).length === 0 || value.id === '';

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
            onChange={(value: any) => {
              setProperties(value);
              setShowPropertiesValidation(isEmpty(value));
            }}
            scopedModels={false}
            disabledNames={['created_at', 'updated_at', 'id']}
            disabledKinds={[
              'BELONGS_TO',
              'HAS_AND_BELONGS_TO_MANY',
              'HAS_MANY',
              'MULTI_FILE',
              'AUTO_INCREMENT',
              'COUNT',
              'EMAIL',
              'MULTI_IMAGE',
              'PDF',
              'RICH_TEXT',
              'SIGNED_PDF',
              'SUM',
              'BOOLEAN_EXPRESSION',
              'DATE_EXPRESSION',
              'DATE_TIME_EXPRESSION',
              'DECIMAL_EXPRESSION',
              'INTEGER_EXPRESSION',
              'MINUTES_EXPRESSION',
              'PRICE_EXPRESSION',
              'STRING_EXPRESSION',
              'TEXT_EXPRESSION',
            ]}
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
          if (modelId) {
            const formPrefab = getDescendantByRef(
              '#formId',
              newPrefab.structure,
            );
            const inputBox = getDescendantByRef(
              '#formInputBox',
              newPrefab.structure,
            );
            const inputStructure = (
              textValue: string,
              inputPrefab: PrefabReference,
            ): PrefabReference => {
              const boxPrefab = cloneStructure('Box');
              setOption(
                boxPrefab,
                'innerSpacing',
                (options: PrefabComponentOption[]) => ({
                  ...options,
                  value: ['M', '0rem', '0rem', '0rem'],
                }),
              );
              const textPrefab = cloneStructure('Text');
              setOption(
                textPrefab,
                'content',
                (options: PrefabComponentOption[]) => ({
                  ...options,
                  value: [textValue],
                  configuration: { as: 'MULTILINE' },
                }),
              );
              setOption(
                textPrefab,
                'type',
                (options: PrefabComponentOption[]) => ({
                  ...options,
                  value: ['Body1'],
                }),
              );
              setOption(
                textPrefab,
                'outerSpacing',
                (options: PrefabComponentOption[]) => ({
                  ...options,
                  value: ['0rem', '0rem', 'S', '0rem'],
                }),
              );
              boxPrefab.descendants.push(textPrefab);
              boxPrefab.descendants.push(inputPrefab);
              return boxPrefab;
            };
            formPrefab.options[0].value = modelId;
            formPrefab.options[1].value = modelId;
            formPrefab.id = componentId;
            const result: ActionResultsProps = await prepareAction(
              componentId,
              idProperty,
              properties,
              'create',
            );
            Object.values(result.variables).forEach(
              ([prop, inputVariable]): void => {
                const { kind } = prop;

                const newInput = () => {
                  switch (kind) {
                    case PropertyKind.EMAIL_ADDRESS:
                      return inputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.EMAIL_ADDRESS,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );

                    case PropertyKind.PASSWORD:
                      return inputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.PASSWORD,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                    default:
                      return inputStructure(
                        prop.label,
                        makeBettyInput(
                          BettyPrefabs.STRING,
                          model,
                          prop,
                          inputVariable,
                        ),
                      );
                  }
                };
                const newInputPrefabs = newInput();
                if (newInputPrefabs.type === 'COMPONENT') {
                  setOption(
                    newInputPrefabs.descendants[1],
                    'margin',
                    (options: PrefabComponentOption) => ({
                      ...options,
                      value: 'none',
                    }),
                  );
                }
                inputBox.descendants.push(newInputPrefabs);
                if (!kind) {
                  // eslint-disable-next-line no-console
                  console.warn('PropertyKind not found');
                }
              },
            );
            setOption(formPrefab, 'actionId', (options: any) => ({
              ...options,
              value: result.action.actionId,
              configuration: { disabled: true },
            }));

            setOption(formPrefab, 'model', (options: any) => ({
              ...options,
              value: modelId,
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

export default makePrefab('Register form', attrs, beforeCreate, [
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
                BoxComponent(
                  {
                    options: {
                      ...boxOptions,
                      stretch: toggle('Stretch (when in flex container)', {
                        value: true,
                      }),
                      innerSpacing: sizes('Inner space', {
                        value: ['0rem', '0rem', '0rem', '0rem'],
                      }),
                      backgroundOptions: toggle('Show background options', {
                        value: true,
                      }),
                      backgroundUrl: variable('Background url', {
                        value: [
                          'https://assets.bettyblocks.com/1e9019bb1c5c4af2ba799c2ee1761af0_assets/files/login-background',
                        ],
                        configuration: {
                          condition: showIf('backgroundOptions', 'EQ', true),
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
                            condition: showIf('backgroundOptions', 'EQ', true),
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
                                        value: ['0rem', '0rem', '0rem', '0rem'],
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
                                          outerSpacing: sizes('Outer space', {
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
                                        value: ['0rem', '0rem', '0rem', '0rem'],
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
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  },
                                  [
                                    TextComponent(
                                      {
                                        options: {
                                          ...textOptions,
                                          content: variable('Content', {
                                            value: ['Create new account'],
                                            configuration: { as: 'MULTILINE' },
                                          }),
                                          type: font('Font', {
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
                                        value: ['0rem', '0rem', '0rem', '0rem'],
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
                                        value: ['0rem', '0rem', '0rem', '0rem'],
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
                                              ['Justified', 'space-between'],
                                            ],
                                            {
                                              value: 'flex-start',
                                              configuration: {
                                                dataType: 'string',
                                              },
                                            },
                                          ),
                                          outerSpacing: sizes('Outer space', {
                                            value: [
                                              '0rem',
                                              '0rem',
                                              'M',
                                              '0rem',
                                            ],
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
                                                { value: ['Back to login'] },
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
                                      'Form Beta',
                                      {
                                        options: defaults,
                                        ref: { id: '#formId' },
                                      },
                                      [
                                        FormSuccessAlert({
                                          ref: { id: '#alertSuccessId' },
                                          options: {
                                            ...alertOptions,
                                          },
                                        }),
                                        FormErrorAlert({
                                          ref: { id: '#alertErrorId' },
                                        }),
                                        BoxComponent({
                                          ref: { id: '#formInputBox' },

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
                                                      value: ['Create account'],
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
      ]),
    ],
  ),
]);
