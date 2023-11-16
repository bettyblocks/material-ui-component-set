import * as React from 'react';
import {
  BeforeCreateArgs,
  Icon,
  PrefabComponent,
  PrefabComponentOption,
  ThemeColor,
  addChild,
  childSelector,
  color,
  font,
  linked,
  option,
  prefab as makePrefab,
  reconfigure,
  showIf,
  size,
  sizes,
  toggle,
  variable,
  wrapper,
  InteractionType,
} from '@betty-blocks/component-sdk';
import {
  Box,
  Column,
  DataContainer,
  Drawer,
  DrawerBar,
  DrawerContainer,
  Grid,
  List,
  ListItem,
  Media,
  Row,
  Tab,
  Tabs,
  Text as TextComp,
  boxOptions,
  columnOptions,
  drawerBarOptions,
  drawerContainerOptions,
  drawerOptions,
  gridOptions,
  listItemOptions,
  mediaOptions,
  rowOptions,
  tabOptions,
  tabsOptions,
  textOptions,
} from './structures';
import { ModelProps, ModelQuery } from './types';
import {
  checkboxWidget,
  dateWidget,
  dropdownWidget,
  multilineWidget,
  numberWidget,
  textWidget,
  radioWidget,
} from './questionnaire';

const beforeCreate = ({
  components: {
    Box: BoxComp,
    Button: ButtonComp,
    Content,
    Field,
    Footer,
    Header,
    ModelSelector,
    Text,
    TextArea,
    TextInput,
  },
  prefab,
  save,
  close,
  helpers: {
    addModelAndProperties,
    addSchemaModel,
    camelToSnakeCase,
    setOption,
    useCurrentPageId,
    useCurrentPartialId,
    useModelQuery,
  },
}: BeforeCreateArgs) => {
  const [model, setModel] = React.useState<ModelProps>();
  const [modelId, setModelId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [sectionTitle, setSectionTitle] = React.useState('Basic information');
  const [sectionDescription, setSectionDescription] = React.useState('');
  const [validation, setValidation] = React.useState(false);
  const [validationMessage, setValidationMessage] = React.useState('');
  const [stepNumber, setStepNumber] = React.useState(1);
  const [createNewQuestionnaire, setCreateNewQuestionnaire] =
    React.useState(true);
  // regex to only support the following characters A-Z a-z 0-9 . _ -
  const nameRegExp = /^[\w\-\s.]+$/g;

  const pageId = useCurrentPageId();
  const partialId = useCurrentPartialId();

  useModelQuery({
    variables: { id: modelId },
    onCompleted: (result: ModelQuery) => {
      setModel(result.model);
    },
    skip: !modelId,
  });

  const treeSearch = (refValue: string, structure: any) =>
    structure.reduce((acc: string, component: PrefabComponent) => {
      if (acc) return acc;
      if (
        component.ref &&
        Object.values(component.ref).indexOf(refValue) > -1
      ) {
        return component;
      }
      return treeSearch(refValue, component.descendants);
    }, null);

  const stepper = {
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <>
            <Field pad={{ bottom: '15px' }}>
              <Text>Add a title and a description to the questionnaire</Text>
            </Field>
            <Field
              pad={{ bottom: '15px' }}
              label="Questionnaire title"
              error={
                <>
                  {validation && (
                    <Text color="#E9004C" size=".75rem">
                      {validationMessage}
                      <br />
                    </Text>
                  )}
                  <Text color="#666D85">or </Text>
                  {createNewQuestionnaire ? (
                    <Text
                      color="purple"
                      onClick={() => {
                        setCreateNewQuestionnaire(false);
                        setValidation(false);
                        setValidationMessage('');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      use an existing questionnaire model
                    </Text>
                  ) : (
                    <Text
                      color="purple"
                      onClick={() => {
                        setCreateNewQuestionnaire(true);
                        setValidation(false);
                        setValidationMessage('');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      create a new questionnaire
                    </Text>
                  )}
                </>
              }
            >
              {createNewQuestionnaire ? (
                <TextInput
                  onChange={({
                    target: { value },
                  }: {
                    target: { value: string };
                  }) => {
                    if (typeof value !== 'string') {
                      throw new Error('expected string');
                    }
                    setTitle(value);
                    if (value.length >= 50) {
                      setValidationMessage(
                        'Name should be at most 50 character(s)',
                      );
                      setValidation(true);
                    } else if (
                      value.trim().length > 0 &&
                      !nameRegExp.test(value)
                    ) {
                      setValidationMessage(
                        'Only use alphanumeric characters (A-Z a-z 0-9 . _ -) and spaces here.',
                      );
                      setValidation(true);
                    } else {
                      setValidation(false);
                      setValidationMessage('');
                    }
                  }}
                  value={title}
                  color={validation && 'pink'}
                />
              ) : (
                <ModelSelector
                  onChange={(value: string) => {
                    setModelId(value);
                    setValidationMessage('');
                    setValidation(false);
                  }}
                  required
                  modelId={modelId}
                  value={modelId}
                />
              )}
            </Field>
            <Field pad={{ bottom: '15px' }} label="Questionnaire description">
              <TextArea
                resize={false}
                style={{ minHeight: '150px' }}
                onChange={({
                  target: { value },
                }: {
                  target: { value: string };
                }) => {
                  if (typeof value !== 'string') {
                    throw new Error('expected string');
                  }
                  setDescription(value);
                }}
                value={description}
              />
            </Field>
          </>
        );
      }
      return (
        <>
          <Field pad={{ bottom: '15px' }}>
            <Text>
              Add a title and a description to the first section of the
              questionnaire
            </Text>
          </Field>
          <Field pad={{ bottom: '15px' }} label="Section title">
            <TextInput
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => {
                if (typeof value !== 'string') {
                  throw new Error('expected string');
                }
                setSectionTitle(value);
              }}
              value={sectionTitle}
            />
          </Field>
          <Field pad={{ bottom: '15px' }} label="Section description">
            <TextArea
              resize={false}
              style={{ minHeight: '150px' }}
              onChange={({
                target: { value },
              }: {
                target: { value: string };
              }) => {
                if (typeof value !== 'string') {
                  throw new Error('expected string');
                }
                setSectionDescription(value);
              }}
              value={sectionDescription}
            />
          </Field>
        </>
      );
    },
    onSave: async () => {
      const newPrefab = { ...prefab };
      const titleText = treeSearch('#Title', newPrefab.structure);
      const descriptionText = treeSearch('#Description', newPrefab.structure);
      const primaryTab = treeSearch('#PrimaryTab', newPrefab.structure);
      const questionnaireDataContainer = treeSearch(
        '#questionnaireDataContainer',
        newPrefab.structure,
      );
      let idProperty = '';
      let modelName = '';
      let modelid = '';
      const context = pageId ? { pageId } : { partialId };

      if (createNewQuestionnaire) {
        try {
          const newModel = await addModelAndProperties(title, [
            {
              label: 'UUID',
              kind: 'STRING',
            },
          ]);
          if (newModel.id && newModel.label) {
            modelName = newModel.label;
            modelid = newModel.id;
            idProperty =
              newModel.properties.find(({ name }) => name === 'id')?.id || '';
          }
        } catch (e) {
          switch (e.message) {
            case 'has already been taken':
              setValidationMessage('Name already exists.');
              break;
            case 'should be at most 50 character(s)':
              setValidationMessage('Name should be at most 50 character(s)');
              break;
            case 'should start with a letter':
              setValidationMessage('Name should start with a letter');
              break;
            default:
              setValidationMessage('Creating new model failed');
          }
          setValidation(true);
          setStepNumber(1);
          return;
        }
      } else if (model && modelId) {
        modelName = model.label;
        modelid = modelId;
        idProperty =
          model.properties.find(({ name }) => name === 'id')?.id || '';
      } else {
        setValidationMessage('Selecting a model is required');
        setValidation(true);
        return;
      }

      setOption(
        questionnaireDataContainer,
        'filter',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: {
            [idProperty]: {
              eq: {
                ref: { id: '#idVariable' },
                name: `${camelToSnakeCase(modelName)}_id`,
                type: 'VARIABLE',
              },
            },
          },
        }),
      );
      setOption(
        questionnaireDataContainer,
        'model',
        (opt: PrefabComponentOption) => ({
          ...opt,
          value: `${modelid}`,
        }),
      );
      setOption(primaryTab, 'label', (opt: PrefabComponentOption) => ({
        ...opt,
        value: [`${sectionTitle}`],
      }));
      setOption(titleText, 'content', (opt: PrefabComponentOption) => ({
        ...opt,
        value: [modelName],
        configuration: { as: 'MULTILINE' },
      }));
      primaryTab.label = sectionTitle;

      const schemaName = 'Questionnaire object';
      const jsonSchema = {
        $id: 'https://bettyblocks.com/questionnaire.schema.json',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        description: 'Question description',
        title: 'Question',
        type: 'object',
        properties: {
          answer: { type: 'string' },
          score: { type: 'number' },
        },
      };

      addSchemaModel(schemaName, JSON.stringify(jsonSchema));

      newPrefab.variables = [];
      newPrefab.variables.push({
        ...context,
        kind: 'integer',
        name: `${camelToSnakeCase(modelName)}_id`,
        ref: {
          id: '#idVariable',
        },
      });

      if (description) {
        setOption(descriptionText, 'content', (opt: PrefabComponentOption) => ({
          ...opt,
          value: [description],
          configuration: { as: 'MULTILINE' },
        }));
      }

      if (sectionTitle !== '') {
        const sectionTitleText = treeSearch(
          '#sectionTitle',
          newPrefab.structure,
        );
        if (sectionTitleText.type === 'COMPONENT') {
          setOption(
            sectionTitleText,
            'content',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: [sectionTitle],
            }),
          );
        }
      }

      if (sectionDescription !== '') {
        const sectionDescriptionText = treeSearch(
          '#sectionDescription',
          newPrefab.structure,
        );
        if (sectionDescriptionText.type === 'COMPONENT') {
          setOption(
            sectionDescriptionText,
            'content',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: [sectionDescription],
            }),
          );
        }
      }

      save(newPrefab);
    },
    buttons: () => (
      <BoxComp direction="row" justify="between">
        <BoxComp direction="row" margin="2rem">
          <ButtonComp
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
          <ButtonComp
            label="Next"
            size="large"
            disabled={stepNumber === stepper.stepAmount || validation}
            onClick={() => {
              if (modelId === '' && !createNewQuestionnaire) {
                setValidationMessage('Selecting a model is required');
                setValidation(true);
                return;
              }
              const newStepnumber = stepNumber + 1;
              setStepNumber(newStepnumber);
            }}
            primary
          />
        </BoxComp>
        <BoxComp>
          <Footer
            onClose={close}
            onSave={stepper.onSave}
            canSave={
              stepNumber === stepper.stepAmount &&
              (createNewQuestionnaire ? title.trim() !== '' : modelId !== '')
            }
          />
        </BoxComp>
      </BoxComp>
    ),
    progressBar: () => {
      return (
        <BoxComp
          justify="center"
          margin={{ left: '2rem', top: '-1rem', bottom: '-1rem' }}
        >
          <Text
            size="medium"
            weight="bold"
          >{`Step: ${stepNumber} / ${stepper.stepAmount}`}</Text>
        </BoxComp>
      );
    },
    stepAmount: 2,
  };
  return (
    <>
      <Header onClose={close} title="Configure your questionnaire" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

const attributes = {
  category: 'WIDGETS',
  icon: Icon.UpdateFormIcon,
  type: 'page',
  detail:
    'Easily build a questionnaire with or without sections, weighted scoring, logic and more with this template.',
  description:
    'Easily build a questionnaire with or without sections, weighted scoring, logic and more with this template.',
  previewImage:
    'https://assets.bettyblocks.com/63b1c6ccc6874e0796e5cc5b7e41b3da_assets/files/56b89343f4ef499393e162173777c9ec',
};

const questionTypes = [
  {
    label: 'Text question',
    structure: textWidget,
    interactions: [
      {
        name: 'Submit',
        sourceEvent: 'onBlur',
        ref: {
          targetComponentId: '#textQuestionForm',
          sourceComponentId: '#textInput',
        },
        type: InteractionType.Custom,
      },
    ],
  },
  {
    label: 'Multiple choice question',
    structure: radioWidget,
    interactions: [
      {
        name: 'Submit',
        sourceEvent: 'onChange',
        ref: {
          targetComponentId: '#radioQuestionForm',
          sourceComponentId: '#radioInput',
        },
        type: InteractionType.Custom,
      },
    ],
  },
  {
    label: 'Number question',
    structure: numberWidget,
    interactions: [
      {
        name: 'Submit',
        sourceEvent: 'onBlur',
        ref: {
          targetComponentId: '#numberQuestionForm',
          sourceComponentId: '#numberInput',
        },
        type: InteractionType.Custom,
      },
    ],
  },
  {
    label: 'Date question',
    structure: dateWidget,
    interactions: [
      {
        name: 'Submit',
        sourceEvent: 'onChange',
        ref: {
          targetComponentId: '#dateQuestionForm',
          sourceComponentId: '#dateInput',
        },
        type: InteractionType.Custom,
      },
    ],
  },
  {
    label: 'Checkbox question',
    structure: checkboxWidget,
    interactions: [
      {
        name: 'Submit',
        sourceEvent: 'onChange',
        ref: {
          targetComponentId: '#checkboxQuestionForm',
          sourceComponentId: '#checkboxInput',
        },
        type: InteractionType.Custom,
      },
    ],
  },
  {
    label: 'Dropdown question',
    structure: dropdownWidget,
    interactions: [
      {
        name: 'Submit',
        sourceEvent: 'onChange',
        ref: {
          targetComponentId: '#dropdownQuestionForm',
          sourceComponentId: '#dropdownInput',
        },
        type: InteractionType.Custom,
      },
    ],
  },
  {
    label: 'Multiline question',
    structure: multilineWidget,
    interactions: [
      {
        name: 'Submit',
        sourceEvent: 'onBlur',
        ref: {
          targetComponentId: '#multilineQuestionForm',
          sourceComponentId: '#textInput',
        },
        type: InteractionType.Custom,
      },
    ],
  },
];

const children = [
  Tab(
    {
      label: 'Section',
      ref: { id: '#newSection' },
      options: {
        ...tabOptions,
        label: variable('Section label', {
          value: ['Section label'],
          showInAddChild: true,
          showInReconfigure: true,
          configuration: {
            pushToWrapper: {
              name: 'Questionnaire',
              condition: {
                type: 'SHOW',
                option: 'questionnaireSections',
                comparator: 'EQ_COMPONENT_ID',
                value: '#newSection',
              },
            },
          },
        }),
        width: size('Width', {
          value: '100%',
          configuration: {
            as: 'UNIT',
          },
        }),
      },
    },
    [
      Box(
        {
          options: {
            ...boxOptions,
            outerSpacing: sizes('Outer space', {
              value: ['0rem', '0rem', '0rem', 'XL'],
            }),
            innerSpacing: sizes('Inner space', {
              value: ['0rem', '0rem', '0rem', 'XL'],
            }),
          },
        },
        [
          TextComp(
            {
              options: {
                ...textOptions,
                content: variable('Section title', {
                  value: ['Section title'],
                  configuration: {
                    as: 'MULTILINE',
                    pushToWrapper: {
                      name: 'Questionnaire',
                      condition: {
                        type: 'SHOW',
                        option: 'questionnaireSections',
                        comparator: 'EQ_COMPONENT_ID',
                        value: '#newSection',
                      },
                    },
                  },
                  showInAddChild: true,
                }),
                type: font('Font', {
                  value: ['Title5'],
                }),
                fontWeight: option('CUSTOM', {
                  label: 'Font weight',
                  value: '500',
                  configuration: {
                    as: 'DROPDOWN',
                    dataType: 'string',
                    allowedInput: [
                      {
                        name: '100',
                        value: '100',
                      },
                      {
                        name: '200',
                        value: '200',
                      },
                      {
                        name: '300',
                        value: '300',
                      },
                      {
                        name: '400',
                        value: '400',
                      },
                      {
                        name: '500',
                        value: '500',
                      },
                      {
                        name: '600',
                        value: '600',
                      },
                      {
                        name: '700',
                        value: '700',
                      },
                      {
                        name: '800',
                        value: '800',
                      },
                      {
                        name: '900',
                        value: '900',
                      },
                    ],
                  },
                }),
              },
            },
            [],
          ),
          TextComp(
            {
              options: {
                ...textOptions,
                content: variable('Section description', {
                  value: [`Section description`],
                  configuration: {
                    as: 'MULTILINE',
                    pushToWrapper: {
                      name: 'Questionnaire',
                      condition: {
                        type: 'SHOW',
                        option: 'questionnaireSections',
                        comparator: 'EQ_COMPONENT_ID',
                        value: '#newSection',
                      },
                    },
                  },
                  showInAddChild: true,
                }),
                type: font('Font', {
                  value: ['Body1'],
                }),
              },
            },
            [],
          ),
          Box(
            {
              label: 'Question drop area',
              options: {
                ...boxOptions,
                reconfigure: reconfigure('Reconfigure questions', {
                  value: {
                    children: questionTypes,
                    reconfigureWizardType: 'ChildrenSelector',
                  },
                  ref: {
                    id: '#QuestionsReconfigure',
                  },
                  configuration: {
                    pushToWrapper: {
                      name: 'Questionnaire',
                      condition: {
                        type: 'SHOW',
                        option: 'questionnaireSections',
                        comparator: 'EQ_COMPONENT_ID',
                        value: '#newSection',
                      },
                    },
                  },
                }),
                addChild: addChild('Add question', {
                  value: {
                    children: questionTypes,
                    addChildWizardType: 'ChildSelector',
                  },
                  configuration: {
                    pushToWrapper: {
                      name: 'Questionnaire',
                      condition: {
                        type: 'SHOW',
                        option: 'questionnaireSections',
                        comparator: 'EQ_COMPONENT_ID',
                        value: '#newSection',
                      },
                    },
                  },
                }),
                innerSpacing: sizes('Inner space', {
                  value: ['L', '0rem', '0rem', '0rem'],
                }),
                emptyPlaceHolderText: variable('Empty placeholder text', {
                  value: ['Drop your questionnaire widgets here'],
                }),
              },
            },
            [],
          ),
        ],
      ),
    ],
  ),
];

const prefabStructure = [
  wrapper(
    {
      label: 'Questionnaire',
      options: {
        questionnaireTitle: linked({
          label: 'Questionnaire title',
          value: {
            ref: {
              componentId: '#Title',
              optionId: '#TitleText',
            },
          },
        }),
        questionnaireDescription: linked({
          label: 'Questionnaire description',
          value: {
            ref: {
              componentId: '#Description',
              optionId: '#DescriptionText',
            },
          },
        }),
        questionnaireReconfigure: linked({
          label: 'Reconfigure sections',
          value: {
            ref: {
              componentId: '#Tabs',
              optionId: '#TabsReconfigure',
            },
          },
        }),
        questionnaireAddChild: linked({
          label: 'Add section',
          value: {
            ref: {
              componentId: '#Tabs',
              optionId: '#TabsAddChild',
            },
          },
        }),
        questionnaireSections: linked({
          label: 'Selected section',
          value: {
            ref: {
              componentId: '#Tabs',
              optionId: '#TabsSelectedTab',
            },
          },
        }),
        sectionLabel: linked({
          label: 'Section Label',
          value: {
            ref: {
              componentId: '#PrimaryTab',
              optionId: '#PrimaryTabLabel',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'questionnaireSections',
              comparator: 'EQ_COMPONENT_ID',
              value: { ref: { componentId: '#PrimaryTab' } },
            },
          },
        }),
        sectionTitle: linked({
          label: 'Section Title',
          value: {
            ref: {
              componentId: '#sectionTitle',
              optionId: '#sectionTitleContent',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'questionnaireSections',
              comparator: 'EQ_COMPONENT_ID',
              value: { ref: { componentId: '#PrimaryTab' } },
            },
          },
        }),
        sectionDescription: linked({
          label: 'Section Description',
          value: {
            ref: {
              componentId: '#sectionDescription',
              optionId: '#sectionDescriptionContent',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'questionnaireSections',
              comparator: 'EQ_COMPONENT_ID',
              value: { ref: { componentId: '#PrimaryTab' } },
            },
          },
        }),
        reconfigureQuestion: linked({
          label: 'Reconfigure questions',
          value: {
            ref: {
              componentId: '#DropArea',
              optionId: '#QuestionsReconfigure',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'questionnaireSections',
              comparator: 'EQ_COMPONENT_ID',
              value: { ref: { componentId: '#PrimaryTab' } },
            },
          },
        }),
        addQuestion: linked({
          label: 'Add question',
          value: {
            ref: {
              componentId: '#DropArea',
              optionId: '#AddQuestion',
            },
          },
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'questionnaireSections',
              comparator: 'EQ_COMPONENT_ID',
              value: { ref: { componentId: '#PrimaryTab' } },
            },
          },
        }),
      },
    },
    [
      Drawer(
        {
          options: {
            ...drawerOptions,
            runTimeVisibility: option('CUSTOM', {
              label: 'Initial State (RUNTIME)',
              value: 'true',
              configuration: {
                as: 'DROPDOWN',
                allowedInput: [
                  { name: 'Visible', value: 'true' },
                  { name: 'Hidden', value: 'false' },
                ],
              },
            }),
          },
        },
        [
          DrawerBar(
            {
              options: {
                ...drawerBarOptions,
                innerSpacing: sizes('Inner space', {
                  value: ['0rem', '0rem', '0rem', '0rem'],
                }),
                themeBgColor: color('Theme background color', {
                  value: ThemeColor.PRIMARY,
                }),
              },
            },
            [
              Box(
                {
                  options: {
                    ...boxOptions,
                    innerSpacing: sizes('Inner space', {
                      value: ['0rem', '0rem', '0rem', '0rem'],
                    }),
                    stretch: toggle('Stretch (when in flex container)', {
                      value: true,
                    }),
                    backgroundColor: color('Background color', {
                      value: ThemeColor.BLACK,
                    }),
                    backgroundColorAlpha: option('NUMBER', {
                      label: 'Background color opacity',
                      value: 60,
                    }),
                  },
                },
                [
                  Box({}, [
                    Media(
                      {
                        options: {
                          ...mediaOptions,
                          type: option('CUSTOM', {
                            label: 'Media type',
                            value: 'url',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Image', value: 'img' },
                                { name: 'Data/URL', value: 'url' },
                                { name: 'Video', value: 'video' },
                                { name: 'I-frame', value: 'iframe' },
                              ],
                            },
                          }),
                          urlFileSource: variable('Source', {
                            value: [
                              'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                            ],
                            configuration: {
                              placeholder: 'Starts with https:// or http://',
                              as: 'MULTILINE',
                              condition: showIf('type', 'EQ', 'url'),
                            },
                          }),
                        },
                      },
                      [],
                    ),
                  ]),
                  Box(
                    {
                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                      },
                    },
                    [
                      List({}, [
                        ListItem(
                          {
                            options: {
                              ...listItemOptions,
                              primaryText: variable('Primary text', {
                                value: ['Overview'],
                              }),
                              titleColor: color('Title color', {
                                value: ThemeColor.WHITE,
                              }),
                            },
                          },
                          [],
                        ),
                        ListItem(
                          {
                            options: {
                              ...listItemOptions,
                              primaryText: variable('Primary text', {
                                value: ['My profile'],
                              }),
                              titleColor: color('Title color', {
                                value: ThemeColor.WHITE,
                              }),
                            },
                          },
                          [],
                        ),
                        ListItem(
                          {
                            options: {
                              ...listItemOptions,
                              primaryText: variable('Primary text', {
                                value: ['Sign out'],
                              }),
                              titleColor: color('Title color', {
                                value: ThemeColor.WHITE,
                              }),
                            },
                          },
                          [],
                        ),
                      ]),
                    ],
                  ),
                ],
              ),
            ],
          ),
          DrawerContainer(
            {
              options: {
                ...drawerContainerOptions,
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
                                    condition: showIf(
                                      'type',
                                      'EQ',
                                      'container',
                                    ),
                                  },
                                }),
                              },
                            },
                            [
                              Box(
                                {
                                  options: {
                                    ...boxOptions,
                                    innerSpacing: sizes('Inner space', {
                                      value: ['0rem', '0rem', '0rem', '0rem'],
                                    }),
                                    stretch: toggle(
                                      'Stretch (when in flex container)',
                                      {
                                        value: true,
                                      },
                                    ),
                                    backgroundColor: color('Background color', {
                                      value: ThemeColor.WHITE,
                                    }),
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
                                      },
                                    },
                                    [
                                      Column(
                                        {
                                          options: {
                                            ...columnOptions,
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
                                          Box(
                                            {
                                              options: {
                                                ...boxOptions,
                                                innerSpacing: sizes(
                                                  'Inner space',
                                                  {
                                                    value: [
                                                      'L',
                                                      'XL',
                                                      'XL',
                                                      'XL',
                                                    ],
                                                  },
                                                ),
                                                backgroundColor: color(
                                                  'Background color',
                                                  {
                                                    value: ThemeColor.PRIMARY,
                                                  },
                                                ),
                                                backgroundColorAlpha: option(
                                                  'NUMBER',
                                                  {
                                                    label:
                                                      'Background color opacity',
                                                    value: 10,
                                                  },
                                                ),
                                              },
                                            },
                                            [
                                              TextComp(
                                                {
                                                  ref: {
                                                    id: '#Title',
                                                  },
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        ref: {
                                                          id: '#TitleText',
                                                        },
                                                        value: ['Title'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Font', {
                                                      value: ['Title4'],
                                                    }),
                                                    outerSpacing: sizes(
                                                      'Outer space',
                                                      {
                                                        value: [
                                                          '0rem',
                                                          '0rem',
                                                          'S',
                                                          '0rem',
                                                        ],
                                                      },
                                                    ),
                                                    fontWeight: option(
                                                      'CUSTOM',
                                                      {
                                                        label: 'Font weight',
                                                        value: '500',
                                                        configuration: {
                                                          as: 'DROPDOWN',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: '100',
                                                              value: '100',
                                                            },
                                                            {
                                                              name: '200',
                                                              value: '200',
                                                            },
                                                            {
                                                              name: '300',
                                                              value: '300',
                                                            },
                                                            {
                                                              name: '400',
                                                              value: '400',
                                                            },
                                                            {
                                                              name: '500',
                                                              value: '500',
                                                            },
                                                            {
                                                              name: '600',
                                                              value: '600',
                                                            },
                                                            {
                                                              name: '700',
                                                              value: '700',
                                                            },
                                                            {
                                                              name: '800',
                                                              value: '800',
                                                            },
                                                            {
                                                              name: '900',
                                                              value: '900',
                                                            },
                                                          ],
                                                        },
                                                      },
                                                    ),
                                                  },
                                                },
                                                [],
                                              ),
                                              TextComp(
                                                {
                                                  ref: {
                                                    id: '#Description',
                                                  },
                                                  options: {
                                                    ...textOptions,
                                                    content: variable(
                                                      'Content',
                                                      {
                                                        ref: {
                                                          id: '#DescriptionText',
                                                        },
                                                        value: ['Description'],
                                                        configuration: {
                                                          as: 'MULTILINE',
                                                        },
                                                      },
                                                    ),
                                                    type: font('Font', {
                                                      value: ['Body1'],
                                                    }),
                                                  },
                                                },
                                                [],
                                              ),
                                            ],
                                          ),
                                          Box(
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
                                              Row(
                                                {
                                                  ref: {
                                                    id: '#hasSectionsRow',
                                                  },

                                                  options: {
                                                    ...rowOptions,
                                                    maxRowWidth: option(
                                                      'CUSTOM',
                                                      {
                                                        label: 'Width',
                                                        value: 'Full',
                                                        configuration: {
                                                          as: 'BUTTONGROUP',
                                                          dataType: 'string',
                                                          allowedInput: [
                                                            {
                                                              name: 'S',
                                                              value: 'S',
                                                            },
                                                            {
                                                              name: 'M',
                                                              value: 'M',
                                                            },
                                                            {
                                                              name: 'L',
                                                              value: 'L',
                                                            },
                                                            {
                                                              name: 'XL',
                                                              value: 'XL',
                                                            },
                                                            {
                                                              name: 'Full',
                                                              value: 'Full',
                                                            },
                                                          ],
                                                        },
                                                      },
                                                    ),
                                                  },
                                                },
                                                [
                                                  Column(
                                                    {
                                                      ref: {
                                                        id: '#questionsColumn',
                                                      },
                                                      options: {
                                                        ...columnOptions,
                                                        innerSpacing: sizes(
                                                          'Inner space',
                                                          {
                                                            value: [
                                                              'XL',
                                                              'XL',
                                                              'XL',
                                                              'XL',
                                                            ],
                                                          },
                                                        ),
                                                        columnWidth: option(
                                                          'CUSTOM',
                                                          {
                                                            label:
                                                              'Column width',
                                                            value: '12',
                                                            configuration: {
                                                              as: 'DROPDOWN',
                                                              dataType:
                                                                'string',
                                                              allowedInput: [
                                                                {
                                                                  name: 'Fit content',
                                                                  value:
                                                                    'fitContent',
                                                                },
                                                                {
                                                                  name: 'Flexible',
                                                                  value:
                                                                    'flexible',
                                                                },
                                                                {
                                                                  name: 'Hidden',
                                                                  value:
                                                                    'hidden',
                                                                },
                                                                {
                                                                  name: '1',
                                                                  value: '1',
                                                                },
                                                                {
                                                                  name: '2',
                                                                  value: '2',
                                                                },
                                                                {
                                                                  name: '3',
                                                                  value: '3',
                                                                },
                                                                {
                                                                  name: '4',
                                                                  value: '4',
                                                                },
                                                                {
                                                                  name: '5',
                                                                  value: '5',
                                                                },
                                                                {
                                                                  name: '6',
                                                                  value: '6',
                                                                },
                                                                {
                                                                  name: '7',
                                                                  value: '7',
                                                                },
                                                                {
                                                                  name: '8',
                                                                  value: '8',
                                                                },
                                                                {
                                                                  name: '9',
                                                                  value: '9',
                                                                },
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
                                                        columnWidthTabletLandscape:
                                                          option('CUSTOM', {
                                                            label:
                                                              'Column width (tablet landscape)',
                                                            value: '12',
                                                            configuration: {
                                                              as: 'DROPDOWN',
                                                              dataType:
                                                                'string',
                                                              allowedInput: [
                                                                {
                                                                  name: 'Fit content',
                                                                  value:
                                                                    'fitContent',
                                                                },
                                                                {
                                                                  name: 'Flexible',
                                                                  value:
                                                                    'flexible',
                                                                },
                                                                {
                                                                  name: 'Hidden',
                                                                  value:
                                                                    'hidden',
                                                                },
                                                                {
                                                                  name: '1',
                                                                  value: '1',
                                                                },
                                                                {
                                                                  name: '2',
                                                                  value: '2',
                                                                },
                                                                {
                                                                  name: '3',
                                                                  value: '3',
                                                                },
                                                                {
                                                                  name: '4',
                                                                  value: '4',
                                                                },
                                                                {
                                                                  name: '5',
                                                                  value: '5',
                                                                },
                                                                {
                                                                  name: '6',
                                                                  value: '6',
                                                                },
                                                                {
                                                                  name: '7',
                                                                  value: '7',
                                                                },
                                                                {
                                                                  name: '8',
                                                                  value: '8',
                                                                },
                                                                {
                                                                  name: '9',
                                                                  value: '9',
                                                                },
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
                                                        columnWidthTabletPortrait:
                                                          option('CUSTOM', {
                                                            value: '12',
                                                            label:
                                                              'Column width (tablet portrait)',
                                                            configuration: {
                                                              as: 'DROPDOWN',
                                                              dataType:
                                                                'string',
                                                              allowedInput: [
                                                                {
                                                                  name: 'Fit content',
                                                                  value:
                                                                    'fitContent',
                                                                },
                                                                {
                                                                  name: 'Flexible',
                                                                  value:
                                                                    'flexible',
                                                                },
                                                                {
                                                                  name: 'Hidden',
                                                                  value:
                                                                    'hidden',
                                                                },
                                                                {
                                                                  name: '1',
                                                                  value: '1',
                                                                },
                                                                {
                                                                  name: '2',
                                                                  value: '2',
                                                                },
                                                                {
                                                                  name: '3',
                                                                  value: '3',
                                                                },
                                                                {
                                                                  name: '4',
                                                                  value: '4',
                                                                },
                                                                {
                                                                  name: '5',
                                                                  value: '5',
                                                                },
                                                                {
                                                                  name: '6',
                                                                  value: '6',
                                                                },
                                                                {
                                                                  name: '7',
                                                                  value: '7',
                                                                },
                                                                {
                                                                  name: '8',
                                                                  value: '8',
                                                                },
                                                                {
                                                                  name: '9',
                                                                  value: '9',
                                                                },
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
                                                        columnWidthMobile:
                                                          option('CUSTOM', {
                                                            value: '12',
                                                            label:
                                                              'Column width (mobile)',
                                                            configuration: {
                                                              as: 'DROPDOWN',
                                                              dataType:
                                                                'string',
                                                              allowedInput: [
                                                                {
                                                                  name: 'Fit content',
                                                                  value:
                                                                    'fitContent',
                                                                },
                                                                {
                                                                  name: 'Flexible',
                                                                  value:
                                                                    'flexible',
                                                                },
                                                                {
                                                                  name: 'Hidden',
                                                                  value:
                                                                    'hidden',
                                                                },
                                                                {
                                                                  name: '1',
                                                                  value: '1',
                                                                },
                                                                {
                                                                  name: '2',
                                                                  value: '2',
                                                                },
                                                                {
                                                                  name: '3',
                                                                  value: '3',
                                                                },
                                                                {
                                                                  name: '4',
                                                                  value: '4',
                                                                },
                                                                {
                                                                  name: '5',
                                                                  value: '5',
                                                                },
                                                                {
                                                                  name: '6',
                                                                  value: '6',
                                                                },
                                                                {
                                                                  name: '7',
                                                                  value: '7',
                                                                },
                                                                {
                                                                  name: '8',
                                                                  value: '8',
                                                                },
                                                                {
                                                                  name: '9',
                                                                  value: '9',
                                                                },
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
                                                      },
                                                    },
                                                    [
                                                      TextComp(
                                                        {
                                                          options: {
                                                            ...textOptions,
                                                            content: variable(
                                                              'Content',
                                                              {
                                                                value: [
                                                                  'Sections',
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
                                                      DataContainer(
                                                        {
                                                          ref: {
                                                            id: '#questionnaireDataContainer',
                                                          },
                                                        },
                                                        [
                                                          Tabs(
                                                            {
                                                              ref: {
                                                                id: '#Tabs',
                                                              },
                                                              options: {
                                                                ...tabsOptions,
                                                                reconfigure:
                                                                  reconfigure(
                                                                    'Reconfigure',
                                                                    {
                                                                      value: {
                                                                        children,
                                                                        reconfigureWizardType:
                                                                          'ChildrenSelector',
                                                                      },
                                                                      ref: {
                                                                        id: '#TabsReconfigure',
                                                                      },
                                                                    },
                                                                  ),
                                                                addChild:
                                                                  addChild(
                                                                    'Add Tab',
                                                                    {
                                                                      value: {
                                                                        children,
                                                                        addChildWizardType:
                                                                          'ChildSelector',
                                                                      },
                                                                      ref: {
                                                                        id: '#TabsAddChild',
                                                                      },
                                                                    },
                                                                  ),
                                                                selectedDesignTabIndex:
                                                                  childSelector(
                                                                    'Selected tab (design)',
                                                                    {
                                                                      value: 1,
                                                                      configuration:
                                                                        {
                                                                          as: 'DROPDOWN',
                                                                        },
                                                                      ref: {
                                                                        id: '#TabsSelectedTab',
                                                                      },
                                                                    },
                                                                  ),
                                                                layout: option(
                                                                  'CUSTOM',
                                                                  {
                                                                    label:
                                                                      'Layout',
                                                                    value:
                                                                      'circle',
                                                                    configuration:
                                                                      {
                                                                        as: 'BUTTONGROUP',
                                                                        dataType:
                                                                          'string',
                                                                        allowedInput:
                                                                          [
                                                                            {
                                                                              name: 'Default',
                                                                              value:
                                                                                'default',
                                                                            },
                                                                            {
                                                                              name: 'Circle',
                                                                              value:
                                                                                'circle',
                                                                            },
                                                                          ],
                                                                      },
                                                                  },
                                                                ),
                                                                alignment:
                                                                  option(
                                                                    'CUSTOM',
                                                                    {
                                                                      value:
                                                                        'left',
                                                                      label:
                                                                        'Alignment',
                                                                      configuration:
                                                                        {
                                                                          as: 'BUTTONGROUP',
                                                                          dataType:
                                                                            'string',
                                                                          allowedInput:
                                                                            [
                                                                              {
                                                                                name: 'Left',
                                                                                value:
                                                                                  'left',
                                                                              },
                                                                              {
                                                                                name: 'Top',
                                                                                value:
                                                                                  'top',
                                                                              },
                                                                              {
                                                                                name: 'Right',
                                                                                value:
                                                                                  'right',
                                                                              },
                                                                              {
                                                                                name: 'Bottom',
                                                                                value:
                                                                                  'bottom',
                                                                              },
                                                                            ],
                                                                        },
                                                                    },
                                                                  ),
                                                                disableMenuClick:
                                                                  toggle(
                                                                    'Disable navigation buttons',
                                                                    {
                                                                      value:
                                                                        true,
                                                                      configuration:
                                                                        {
                                                                          condition:
                                                                            showIf(
                                                                              'layout',
                                                                              'EQ',
                                                                              'circle',
                                                                            ),
                                                                        },
                                                                    },
                                                                  ),
                                                                circleSideBarWidth:
                                                                  size(
                                                                    'Circle Sidebar Width',
                                                                    {
                                                                      value:
                                                                        '200px',
                                                                      configuration:
                                                                        {
                                                                          as: 'UNIT',
                                                                          condition:
                                                                            showIf(
                                                                              'layout',
                                                                              'EQ',
                                                                              'circle',
                                                                            ),
                                                                        },
                                                                    },
                                                                  ),
                                                              },
                                                            },
                                                            [
                                                              Tab(
                                                                {
                                                                  ref: {
                                                                    id: '#PrimaryTab',
                                                                  },
                                                                  options: {
                                                                    ...tabOptions,
                                                                    label:
                                                                      variable(
                                                                        'Tab label',
                                                                        {
                                                                          value:
                                                                            [
                                                                              'Tab',
                                                                            ],
                                                                          ref: {
                                                                            id: '#PrimaryTabLabel',
                                                                          },
                                                                        },
                                                                      ),
                                                                    width: size(
                                                                      'Width',
                                                                      {
                                                                        value:
                                                                          '100%',
                                                                        configuration:
                                                                          {
                                                                            as: 'UNIT',
                                                                          },
                                                                      },
                                                                    ),
                                                                  },
                                                                },
                                                                [
                                                                  Box(
                                                                    {
                                                                      options: {
                                                                        ...boxOptions,
                                                                        outerSpacing:
                                                                          sizes(
                                                                            'Outer space',
                                                                            {
                                                                              value:
                                                                                [
                                                                                  '0rem',
                                                                                  '0rem',
                                                                                  '0rem',
                                                                                  'XL',
                                                                                ],
                                                                            },
                                                                          ),
                                                                        innerSpacing:
                                                                          sizes(
                                                                            'Inner space',
                                                                            {
                                                                              value:
                                                                                [
                                                                                  '0rem',
                                                                                  '0rem',
                                                                                  '0rem',
                                                                                  'XL',
                                                                                ],
                                                                            },
                                                                          ),
                                                                      },
                                                                    },
                                                                    [
                                                                      TextComp(
                                                                        {
                                                                          ref: {
                                                                            id: '#sectionTitle',
                                                                          },
                                                                          options:
                                                                            {
                                                                              ...textOptions,
                                                                              content:
                                                                                variable(
                                                                                  'Content',
                                                                                  {
                                                                                    value:
                                                                                      [
                                                                                        'Basic information',
                                                                                      ],
                                                                                    configuration:
                                                                                      {
                                                                                        as: 'MULTILINE',
                                                                                      },
                                                                                    ref: {
                                                                                      id: '#sectionTitleContent',
                                                                                    },
                                                                                  },
                                                                                ),
                                                                              type: font(
                                                                                'Font',
                                                                                {
                                                                                  value:
                                                                                    [
                                                                                      'Title5',
                                                                                    ],
                                                                                },
                                                                              ),
                                                                              fontWeight:
                                                                                option(
                                                                                  'CUSTOM',
                                                                                  {
                                                                                    label:
                                                                                      'Font weight',
                                                                                    value:
                                                                                      '500',
                                                                                    configuration:
                                                                                      {
                                                                                        as: 'DROPDOWN',
                                                                                        dataType:
                                                                                          'string',
                                                                                        allowedInput:
                                                                                          [
                                                                                            {
                                                                                              name: '100',
                                                                                              value:
                                                                                                '100',
                                                                                            },
                                                                                            {
                                                                                              name: '200',
                                                                                              value:
                                                                                                '200',
                                                                                            },
                                                                                            {
                                                                                              name: '300',
                                                                                              value:
                                                                                                '300',
                                                                                            },
                                                                                            {
                                                                                              name: '400',
                                                                                              value:
                                                                                                '400',
                                                                                            },
                                                                                            {
                                                                                              name: '500',
                                                                                              value:
                                                                                                '500',
                                                                                            },
                                                                                            {
                                                                                              name: '600',
                                                                                              value:
                                                                                                '600',
                                                                                            },
                                                                                            {
                                                                                              name: '700',
                                                                                              value:
                                                                                                '700',
                                                                                            },
                                                                                            {
                                                                                              name: '800',
                                                                                              value:
                                                                                                '800',
                                                                                            },
                                                                                            {
                                                                                              name: '900',
                                                                                              value:
                                                                                                '900',
                                                                                            },
                                                                                          ],
                                                                                      },
                                                                                  },
                                                                                ),
                                                                            },
                                                                        },
                                                                        [],
                                                                      ),
                                                                      TextComp(
                                                                        {
                                                                          ref: {
                                                                            id: '#sectionDescription',
                                                                          },
                                                                          options:
                                                                            {
                                                                              ...textOptions,
                                                                              content:
                                                                                variable(
                                                                                  'Content',
                                                                                  {
                                                                                    value:
                                                                                      [
                                                                                        `We'll start with some basic questions before we dive into details.`,
                                                                                      ],
                                                                                    configuration:
                                                                                      {
                                                                                        as: 'MULTILINE',
                                                                                      },
                                                                                    ref: {
                                                                                      id: '#sectionDescriptionContent',
                                                                                    },
                                                                                  },
                                                                                ),
                                                                              type: font(
                                                                                'Font',
                                                                                {
                                                                                  value:
                                                                                    [
                                                                                      'Body1',
                                                                                    ],
                                                                                },
                                                                              ),
                                                                            },
                                                                        },
                                                                        [],
                                                                      ),
                                                                      Box(
                                                                        {
                                                                          label:
                                                                            'Question drop area',
                                                                          ref: {
                                                                            id: '#DropArea',
                                                                          },
                                                                          options:
                                                                            {
                                                                              ...boxOptions,
                                                                              innerSpacing:
                                                                                sizes(
                                                                                  'Inner space',
                                                                                  {
                                                                                    value:
                                                                                      [
                                                                                        'L',
                                                                                        '0rem',
                                                                                        '0rem',
                                                                                        '0rem',
                                                                                      ],
                                                                                  },
                                                                                ),
                                                                              reconfigure:
                                                                                reconfigure(
                                                                                  'Reconfigure questions',
                                                                                  {
                                                                                    value:
                                                                                      {
                                                                                        children:
                                                                                          questionTypes,
                                                                                        reconfigureWizardType:
                                                                                          'ChildrenSelector',
                                                                                      },
                                                                                    ref: {
                                                                                      id: '#QuestionsReconfigure',
                                                                                    },
                                                                                  },
                                                                                ),
                                                                              addChild:
                                                                                addChild(
                                                                                  'Add question',
                                                                                  {
                                                                                    value:
                                                                                      {
                                                                                        children:
                                                                                          questionTypes,
                                                                                        addChildWizardType:
                                                                                          'ChildSelector',
                                                                                      },
                                                                                    ref: {
                                                                                      id: '#AddQuestion',
                                                                                    },
                                                                                  },
                                                                                ),
                                                                              emptyPlaceHolderText:
                                                                                variable(
                                                                                  'Empty placeholder text',
                                                                                  {
                                                                                    value:
                                                                                      [
                                                                                        'Drop your questionnaire widgets here',
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
      ),
    ],
  ),
];

export default makePrefab(
  'Questionnaire',
  attributes,
  beforeCreate,
  prefabStructure,
);
