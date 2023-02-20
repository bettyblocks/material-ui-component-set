import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  option,
  text,
  sizes,
  size,
  showIf,
  toggle,
  BeforeCreateArgs,
  variable,
  buttongroup,
  ThemeColor,
  color,
  font,
} from '@betty-blocks/component-sdk';
import {
  Box as prefabBox,
  Text as prefabText,
  Column,
  boxOptions,
  columnOptions,
  Grid,
  gridOptions,
  Row,
  rowOptions,
  Media,
  mediaOptions,
  textOptions,
  ActionJSButton,
  actionJSButtonOptions,
  Divider,
  dividerOptions,
} from './structures';
import { Property, PropertyStateProps, Endpoint } from './types';

const attrs = {
  icon: Icon.SubmitButtonIcon,
  type: 'page',
  description: '?',
  detail: '?',
  previewUrl: '?',
  previewImage: '?',
  category: 'FORMV2',
};

const beforeCreate = ({
  save,
  close,
  prefab,
  components: {
    Header,
    Content,
    ModelSelector,
    PropertySelector,
    EndpointSelector,
    Footer,
    Field,
    Text,
  },
}: BeforeCreateArgs) => {
  const [showModelValidation, setShowModelValidation] = React.useState(false);
  const [modelId, setModelId] = React.useState('');
  const [titleProperty, setTitleProperty] = React.useState<PropertyStateProps>({
    id: '',
  });
  const [showTitleValidation, setShowTitleValidation] = React.useState(false);
  const [showDescriptionValidation, setShowDescriptionValidation] =
    React.useState(false);
  const [descriptionProperty, setDescriptionProperty] =
    React.useState<PropertyStateProps>({
      id: '',
    });
  const [endpoint, setEndpoint] = React.useState<Endpoint>();
  const [endpointInvalid, setEndpointInvalid] = React.useState(false);

  const isEmptyEndpoint = (value: Endpoint): boolean =>
    !value || Object.keys(value).length === 0 || value.id === '';

  return (
    <>
      <Header
        onClose={close}
        title="Configure Questionnaire initialization page"
      />
      <Content>
        <Field
          label="Select a model for saving the questionnaire data"
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
              setTitleProperty({ id: '' });
              setDescriptionProperty({ id: '' });
            }}
            value={modelId}
          />
        </Field>
        <Field
          label="Title property"
          error={
            showTitleValidation && (
              <Text color="#e82600">Selecting a title is required</Text>
            )
          }
        >
          <PropertySelector
            modelId={modelId}
            onChange={(value: Property) => {
              setTitleProperty(value);
              setShowTitleValidation(false);
            }}
            value={titleProperty}
            disabled={!modelId}
          />
        </Field>
        <Field
          label="Description property"
          error={
            showDescriptionValidation && (
              <Text color="#e82600">Selecting a description is required</Text>
            )
          }
        >
          <PropertySelector
            modelId={modelId}
            onChange={(value: Property) => {
              setDescriptionProperty(value);
              setShowDescriptionValidation(false);
            }}
            value={descriptionProperty}
            disabled={!modelId}
          />
        </Field>
        <Field
          label="Set the redirect page"
          error={
            endpointInvalid && (
              <Text color="#e82600">Selecting a page is required</Text>
            )
          }
        >
          <Text color="grey700">
            This is the page that the user will be redirected to when they start
            the questionnaire.
          </Text>
          <EndpointSelector
            value={endpoint || ''}
            size="large"
            onChange={(value: Endpoint): void => {
              setEndpointInvalid(isEmptyEndpoint(value));
              setEndpoint(value);
            }}
          />
        </Field>
      </Content>
      <Footer
        onSave={() => {
          if (!modelId) {
            setShowModelValidation(true);
            return;
          }
          if (!titleProperty.id) {
            setShowTitleValidation(true);
            return;
          }
          if (!descriptionProperty.id) {
            setShowDescriptionValidation(true);
            return;
          }
          if (!endpoint) {
            throw new Error('There was no redirected page selected');
          }
          if (isEmptyEndpoint(endpoint)) {
            setEndpointInvalid(true);
            return;
          }
          const newPrefab = { ...prefab };

          save(newPrefab);
        }}
      />
    </>
  );
};

export default makePrefab('Start questionnaire', attrs, beforeCreate, [
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
                  prefabBox(
                    {
                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        stretch: toggle('Stretch (when in flex container)', {
                          value: true,
                        }),
                        backgroundUrl: variable('Background url', {
                          value: [
                            'https://assets.bettyblocks.com/1e9019bb1c5c4af2ba799c2ee1761af0_assets/files/login-background',
                          ],
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
                              value: '92%',
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
                                columnWidthTabletPortrait: option('CUSTOM', {
                                  value: '6',
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
                                      value: ['0rem', 'XL', '0rem', 'XL'],
                                    }),
                                  },
                                },
                                [
                                  Media({
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
                                            {
                                              name: 'I-frame',
                                              value: 'iframe',
                                            },
                                          ],
                                        },
                                      }),
                                      urlFileSource: variable('Source', {
                                        value: [
                                          'https://assets.bettyblocks.com/373317d12bf04d5496079adc02aab34a_assets/files/Your_Logo_-_B.svg',
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
                                      width: size('Width', {
                                        value: '',
                                        configuration: {
                                          as: 'UNIT',
                                        },
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', '0rem', 'XL', '0rem'],
                                      }),
                                    },
                                  }),
                                  prefabText({
                                    options: {
                                      ...textOptions,
                                      content: variable('Content', {
                                        value: ['Employee Satisfaction'],
                                        configuration: { as: 'MULTILINE' },
                                      }),
                                      type: font('Font', { value: ['Title4'] }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['XL', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  }),
                                  prefabText({
                                    options: {
                                      ...textOptions,
                                      content: variable('Content', {
                                        value: [
                                          'GDPR affects every organisation processing the personal identifiable information of EU residents, as well as organisations outside of the EU, providing the services to EU businesses.',
                                        ],
                                        configuration: { as: 'MULTILINE' },
                                      }),
                                      type: font('Font', { value: ['Body1'] }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['M', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  }),
                                  ActionJSButton({
                                    style: {
                                      overwrite: {
                                        backgroundColor: {
                                          type: 'THEME_COLOR',
                                          value: 'primary',
                                        },
                                        borderColor: {
                                          type: 'THEME_COLOR',
                                          value: 'primary',
                                        },
                                        borderRadius: ['0.25rem'],
                                        borderStyle: 'solid',
                                        borderWidth: ['0.0625rem'],
                                        boxShadow: 'none',
                                        color: {
                                          type: 'THEME_COLOR',
                                          value: 'white',
                                        },
                                        fontFamily: 'Roboto',
                                        fontSize: '0.875rem',
                                        fontStyle: 'none',
                                        fontWeight: '400',
                                        padding: ['0.625rem', '1.3125rem'],
                                        textDecoration: 'none',
                                        textTransform: 'none',
                                      },
                                    },
                                    options: {
                                      ...actionJSButtonOptions,
                                      actionId: option('ACTION_JS', {
                                        label: 'Action',
                                        value: '',
                                        configuration: {
                                          disabled: true,
                                        },
                                      }),
                                      buttonText: variable('Button text', {
                                        value: ['Start questionnaire'],
                                      }),
                                      outerSpacing: sizes('Outer space', {
                                        value: ['M', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  }),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
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
                              value: '8%',
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
                                columnWidthTabletPortrait: option('CUSTOM', {
                                  value: '6',
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
                                  },
                                },
                                [
                                  Divider({
                                    options: {
                                      ...dividerOptions,
                                      outerSpacing: sizes('Outer space', {
                                        value: ['0rem', '0rem', '0rem', '0rem'],
                                      }),
                                    },
                                  }),
                                  prefabText({
                                    options: {
                                      ...textOptions,
                                      content: variable('Content', {
                                        value: ['Powered by Betty Blocks'],
                                        configuration: { as: 'MULTILINE' },
                                      }),
                                      type: font('Font', { value: ['Body1'] }),
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
                                      outerSpacing: sizes('Outer space', {
                                        value: ['M', '0rem', 'M', '0rem'],
                                      }),
                                      textColor: color('Text color', {
                                        value: ThemeColor.LIGHT,
                                      }),
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
]);
