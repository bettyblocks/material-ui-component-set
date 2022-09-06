import * as React from 'react';

import {
  prefab as makePrefab,
  Icon,
  sizes,
  variable,
  option,
  ThemeColor,
  color,
  font,
  PrefabReference,
  size,
  showIf,
  toggle,
  showIfTrue,
  component,
  buttongroup,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';

import {
  Property,
  PropertyKind,
} from '@betty-blocks/component-sdk/build/prefabs/types/property';
import {
  AppBar,
  appBarOptions,
  Box,
  boxOptions,
  Button,
  Column,
  columnOptions,
  DataList,
  Grid,
  gridOptions,
  OpenPageButton,
  openPageButtonOptions,
  Row,
  Text,
  textOptions,
} from './structures';
import { options as defaults } from './structures/ActionJSForm/options';

export interface PropertyType {
  id: string[];
  name?: string;
  label?: string;
  kind?: PropertyKind;
  format?: string;
}

export interface PropertyStateProps extends Omit<PropertyType, 'id'> {
  id: string | string[];
}

export interface Properties {
  id: string;
  name: string;
  label: string;
  kind: PropertyKind;
  format: string;
}

const attrs = {
  name: 'Checklist page test',
  icon: Icon.DataList,
  type: 'page',
  description:
    'Toggle the view of your content between a card view or a list view.',
  detail:
    'Display your data in different views such as a list or a card view via a toggle. This page template also contains a custom search functionality to filter your data.',
  previewUrl: 'https://preview.betty.app/card-and-list-view',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Card_And_List_View.jpg',
  category: 'LAYOUT',
};

const prefabStructure = [
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
            height: size('Height', {
              value: '100%',
              configuration: {
                as: 'UNIT',
              },
            }),
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
          Box(
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
                  Box(
                    {
                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        backgroundOptions: toggle('Show background options', {
                          value: true,
                        }),
                        backgroundColor: color('Background color', {
                          value: ThemeColor.PRIMARY,
                          configuration: {
                            condition: showIf('backgroundOptions', 'EQ', true),
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
                                  logoSource: variable('Logo', {
                                    value: [
                                      'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Your_Logo_-_W.svg',
                                    ],
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
                                      buttonText: variable('Button text', {
                                        value: ['Menu 1'],
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', 'M', '0rem', 'M'],
                                      }),
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
                                      buttonText: variable('Button text', {
                                        value: ['Menu 2'],
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', 'M', '0rem', '0rem'],
                                      }),
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
          Box(
            {
              options: {
                ...boxOptions,
                stretch: toggle('Stretch (when in flex container)', {
                  value: true,
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
            [
              Row({}, [
                Column(
                  {
                    options: {
                      ...columnOptions,
                      innerSpacing: sizes('Inner space', {
                        value: ['L', 'L', 'L', 'L'],
                      }),
                    },
                  },
                  [
                    Text(
                      {
                        options: {
                          ...textOptions,
                          content: variable('Content', {
                            value: ['Page title'],
                            configuration: { as: 'MULTILINE' },
                          }),
                          type: font('Font', { value: ['Title5'] }),
                          outerSpacing: sizes('Outer space', {
                            value: ['M', '0rem', '0rem', '0rem'],
                          }),
                        },
                      },
                      [],
                    ),
                    Text(
                      {
                        options: {
                          ...textOptions,
                          content: variable('Content', {
                            value: [
                              'Please add a subline here or just delete it if you want.',
                            ],
                            configuration: { as: 'MULTILINE' },
                          }),
                          type: font('Font', { value: ['Body1'] }),
                          outerSpacing: sizes('Outer space', {
                            value: ['M', '0rem', 'XL', '0rem'],
                          }),
                        },
                      },
                      [],
                    ),
                    DataList(
                      {
                        ref: {
                          id: '#dataList',
                        },
                      },
                      [
                        component(
                          'Form Beta',
                          {
                            label: 'Update Form Beta',
                            options: defaults,
                            ref: { id: '#formId' },
                          },
                          [
                            Box(
                              {
                                options: {
                                  ...boxOptions,
                                  outerSpacing: sizes('Outer space', {
                                    value: ['S', 'S', '0rem', 'S'],
                                  }),
                                  innerSpacing: sizes('Inner space', {
                                    value: ['0remM', '0rem', '0rem', '0rem'],
                                  }),
                                },
                              },
                              [
                                Box(
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
                                          value: 'space-between',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      valignment: buttongroup(
                                        'Vertical alignment',
                                        [
                                          ['None', 'none'],
                                          ['Top', 'flex-start'],
                                          ['Center', 'center'],
                                          ['Bottom', 'flex-end'],
                                        ],
                                        {
                                          value: 'center',
                                          configuration: {
                                            dataType: 'string',
                                          },
                                        },
                                      ),
                                      width: size('Width', {
                                        value: '100%',
                                        configuration: {
                                          as: 'UNIT',
                                        },
                                      }),
                                      innerSpacing: sizes('Inner space', {
                                        value: ['S', 'S', 'S', 'S'],
                                      }),
                                    },
                                  },
                                  [
                                    /* checkbox here */ Box(
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
                                              value: 'flex-end',
                                              configuration: {
                                                dataType: 'string',
                                              },
                                            },
                                          ),
                                          width: size('Width', {
                                            value: '25%',
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
                                      [
                                        Button(
                                          {
                                            ref: { id: '#DropdownButton' },
                                            style: {
                                              overwrite: {
                                                backgroundColor: {
                                                  type: 'STATIC',
                                                  value: 'transparent',
                                                },
                                                boxShadow: 'none',
                                                color: {
                                                  type: 'THEME_COLOR',
                                                  value: 'black',
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
                                          },
                                          [],
                                        ),
                                        Button(
                                          {
                                            ref: { id: '#UpButton' },
                                            style: {
                                              overwrite: {
                                                backgroundColor: {
                                                  type: 'STATIC',
                                                  value: 'transparent',
                                                },
                                                boxShadow: 'none',
                                                color: {
                                                  type: 'THEME_COLOR',
                                                  value: 'black',
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
                                          },
                                          [],
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Row({}, [
                                  Column(
                                    {
                                      ref: { id: '#DropdownColumn' },
                                      options: {
                                        ...columnOptions,
                                        visible: toggle('Toggle visibility', {
                                          value: false,
                                          configuration: {
                                            as: 'VISIBILITY',
                                          },
                                        }),
                                      },
                                    },
                                    [
                                      Text(
                                        {
                                          ref: { id: '#descriptionText' },
                                          options: {
                                            ...textOptions,
                                            content: variable('Content', {
                                              value: ['Description'],
                                              configuration: {
                                                as: 'MULTILINE',
                                              },
                                            }),
                                            type: font('Font', {
                                              value: ['Body1'],
                                            }),
                                          },
                                        },
                                        [],
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
                  ],
                ),
              ]),
            ],
          ),
          Box(
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
              Box(
                {
                  options: {
                    ...boxOptions,
                    innerSpacing: sizes('Inner space', {
                      value: ['L', 'L', 'L', 'L'],
                    }),
                  },
                },
                [
                  Text(
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
];

const beforeCreate = ({
  save,
  close,
  prefab: originalPrefab,
  components: {
    Header,
    Content,
    Field,
    Footer,
    Text: TextComp,
    Box: BoxComp,
    ModelSelector,
    PropertySelector,
    Button: ButtonComp,
    PartialSelector,
  },
  helpers: {
    useModelQuery,
    prepareAction,
    cloneStructure,
    setOption,
    makeBettyUpdateInput,
    createUuid,
    BettyPrefabs,
  },
}: BeforeCreateArgs) => {
  const [showValidation, setShowValidation] = React.useState(false);
  const [modelId, setModelId] = React.useState('');
  const [model, setModel] = React.useState(null);
  const [titleProperty, setTitleProperty] = React.useState<any>('');
  const [descriptionProperty, setDescriptionProperty] = React.useState<any>('');
  const [checkboxProperty, setCheckboxProperty] = React.useState('');
  const [idProperty, setIdProperty] = React.useState<Property>();
  const formId = createUuid();

  const { data } = useModelQuery({
    variables: { id: modelId },
    skip: !modelId,
    onCompleted: (result: any) => {
      setModel(result.model);
      setIdProperty(
        result.model.properties.find(({ name }: any) => name === 'id'),
      );
    },
  });

  const [stepNumber, setStepNumber] = React.useState(1);
  const [headerPartialId, setHeaderPartialId] = React.useState('');
  const [footerPartialId, setFooterPartialId] = React.useState('');

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

  const enrichVarObj = (obj: any) => {
    const returnObject = obj;
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (property) {
        returnObject.name = `{{ ${data.model.name}.${property.name} }}`;
      }
    }
    return returnObject;
  };

  const stepper = {
    setStep: (step: number) => {
      if (step === 1) {
        return (
          <>
            <BoxComp pad={{ bottom: '15px' }}>
              <BoxComp pad={{ bottom: '15px' }}>
                <TextComp size="medium" weight="bolder">
                  Select partials
                </TextComp>
              </BoxComp>
              <BoxComp pad={{ bottom: '15px' }}>
                <TextComp color="grey700">
                  By using a partial for the top menu and footer you can easily
                  reuse the same structure without having to go through every
                  page.
                </TextComp>
              </BoxComp>
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
            </BoxComp>
            <BoxComp pad={{ bottom: '15px' }}>
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
            </BoxComp>
          </>
        );
      }
      return (
        <BoxComp direction="row">
          <BoxComp direction="column" basis="2/3">
            <Field
              label="Select model"
              error={
                showValidation && (
                  <TextComp color="#e82600">
                    Selecting a model is required
                  </TextComp>
                )
              }
            >
              <ModelSelector
                onChange={(value: any) => {
                  setShowValidation(false);
                  setModelId(value);
                  setTitleProperty('');
                  setDescriptionProperty('');
                  setCheckboxProperty('');
                }}
                value={modelId}
              />
            </Field>
            <Field label="Title property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: 'STRING') => {
                  setTitleProperty(value);
                }}
                value={titleProperty}
                disabled={!modelId}
              />
            </Field>
            <Field label="Description property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: 'STRING') => {
                  setDescriptionProperty(value);
                }}
                value={descriptionProperty}
                disabled={!modelId}
              />
            </Field>
            <Field label="Checkbox property">
              <PropertySelector
                modelId={modelId}
                onChange={(value: 'BOOLEAN') => {
                  setCheckboxProperty(value);
                  console.log(checkboxProperty);
                }}
                value={checkboxProperty}
                disabled={!modelId}
              />
            </Field>
          </BoxComp>
        </BoxComp>
      );
    },
    onSave: async () => {
      // validation
      if (!modelId) {
        setShowValidation(true);
        return;
      }
      debugger;
      const newPrefab = { ...originalPrefab };
      // set datalist
      const dataList = getDescendantByRef('#dataList', newPrefab.structure);
      dataList.options[0].value = modelId;

      // set edit action

      const transformProp = (prop) => {
        const outputProp = prop;
        outputProp.kind = 'BOOLEAN';
        outputProp.defaultValue = {
          __typename: 'DefaultValueType',
          type: 'VALUE',
          value: 'false',
          expressionInfo: null,
        };
        outputProp.label = 'test';
        return outputProp;
      };
      if (model && idProperty && checkboxProperty) {
        const editForm = getDescendantByRef('#formId', newPrefab.structure);
        editForm.id = formId;
        const result = await prepareAction(
          formId,
          idProperty,
          [...transformProp(checkboxProperty)],
          'update',
        );
        setOption(editForm, 'actionId', (opts: any) => ({
          ...opts,
          value: result.action.actionId,
          configuration: { disabled: true },
        }));
        setOption(editForm, 'model', (opts: any) => ({
          ...opts,
          value: modelId,
          configuration: {
            disabled: true,
          },
        }));

        //   Object.values(result.variables).map(([property, vari]) => {
        //     const checkBoxInput = makeBettyUpdateInput(
        //       BettyPrefabs.BOOLEAN,
        //       model,
        //       property,
        //       vari,
        //     );

        //     editForm.descendants[0].descendants[0] = [
        //       checkBoxInput,
        //       ...editForm.descendants[0].descendants[0],
        //     ];
        //   });
      }

      const descriptionText = getDescendantByRef(
        '#descriptionText',
        newPrefab.structure,
      );

      if (descriptionProperty.id) {
        descriptionText.options[0].value = [enrichVarObj(descriptionProperty)];
      }
      const prefabFooter = getDescendantByRef('#Footer', newPrefab.structure);
      const prefabHeader = getDescendantByRef('#Header', newPrefab.structure);
      if (headerPartialId) {
        prefabHeader.descendants = [
          { type: 'PARTIAL', partialId: headerPartialId },
        ];
      }

      if (footerPartialId) {
        prefabFooter.descendants = [
          { type: 'PARTIAL', partialId: footerPartialId },
        ];
      }

      save(newPrefab);
      // #endregion
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
            disabled={stepNumber === stepper.stepAmount}
            onClick={() => {
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
            canSave={stepNumber === stepper.stepAmount}
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
          <TextComp size="medium" weight="bold">{`Step: ${stepNumber + 1} / ${
            stepper.stepAmount + 1
          }`}</TextComp>
        </BoxComp>
      );
    },
    stepAmount: 2,
  };
  return (
    <>
      <Header onClose={close} title="Configure list view" />
      {stepper.progressBar()}
      <Content>{stepper.setStep(stepNumber)}</Content>
      {stepper.buttons()}
    </>
  );
};

export default makePrefab(
  'Checklistpage',
  attrs,
  beforeCreate,
  prefabStructure,
);
