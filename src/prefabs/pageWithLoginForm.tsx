import * as React from 'react';
import { Property } from '@betty-blocks/component-sdk/build/prefabs/types/property';
import {
  Icon,
  prefab,
  component,
  option,
  PrefabReference,
  text,
  sizes,
  size,
  showIf,
  PrefabComponent,
  toggle,
  ThemeColor,
  color,
  variable,
  font,
  buttongroup,
  PrefabInteraction,
  InteractionType,
  PrefabComponentOption,
  wrapper,
  linked,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { options as defaults } from './structures/ActionJSForm/options';
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
  Conditional,
  conditionalOptions,
} from './structures';

interface AuthenticationProfileOptions {
  loginVariable: string;
  usernameProperty: string | null;
  passwordProperty: string | null;
  localeProperty: string | null;
  redirectEndpoint: string | null;
  refreshTokenTimeout: number | null;
  accessTokenTimeout: number | null;
}

declare enum AuthenticationProfileKind {
  customAuthentication = 'customAuthentication',
  usernamePassword = 'usernamePassword',
}
interface AuthenticationProfile {
  default: boolean;
  id: string;
  kind: AuthenticationProfileKind;
  loginModel: string;
  name: string;
  options: AuthenticationProfileOptions;
  properties?: Array<Property>;
}
// interface AuthProfileProperties {
//   appendDefault: boolean;
//   applyDefaultWhenBlank: null;
//   assignableTo: string[];
//   assignableVariableKind: string[];
//   createdAt: string;
//   defaultValue: null;
//   id: string;
//   indexed: null;
//   kind: string;
//   label: string;
//   model: {
//     allowImport: boolean;
//     allowMassDelete: boolean;
//     allowedDelete: boolean;
//     helpText: null;
//     id: string;
//     isSettingsModel: boolean;
//     label: string;
//     logMutations: boolean;
//     name: string;
//     __typename: string;
//   };
//   modelId: string;
//   name: string;
//   pageBuilderFormat: null;
//   updatedAt: string;
//   values: null;
// }

interface Endpoint {
  __typename: string;
  authenticationProfileId: string;
  cache: boolean;
  cachedFullPath: string;
  contentType: string;
  debugMode: boolean;
  description?: string;
  id: string;
  online: true;
  options: {
    __typename: 'EndpointOptions';
    componentSetUrl?: string;
    runtimeTarget: string;
    showDefaultComponentSet: boolean;
  };
  page: {
    __typename: string;
    description: string;
    id: string;
    name: string;
    rootId: string;
    title: string;
    type: string;
  };
  pageId: string;
  redirectUrl: string;
  redirectUrlForLogin: string;
  requestMethod: string;
  template: string;
  url: string;
  params?: { [key: string]: any };
}
// interface PrepareActionResult {
//   action: { actionId: string };
//   recordInputVariable: Property | null;
//   relatedIdProperties: Property[] | null;
//   resultVariable: {
//     actionStepId: string;
//     id: string;
//     name: string;
//     options: string;
//     scope: string;
//   };
//   variables: {
//     id: string;
//     kind: string;
//     name: string;
//     options: string;
//     scope: string;
//   }[];
// }
// interface Model {
//   allowImport: boolean;
//   allowMassDelete: boolean;
//   allowedDelete: boolean;
//   assignable: Object[];
//   helpText: null;
//   id: string;
//   isSettingsModel: boolean;
//   label: string;
//   labelBy: string;
//   logMutations: boolean;
//   manyToManies: Object[];
//   name: string;
//   orderBy: string;
//   properties: Object[];
//   relationships: Object[];
//   remoteModelDescription: null;
//   resourceActions: null;
//   useActionsJs: boolean;
//   __typename: string;
// }

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

const attrs = {
  icon: Icon.LoginFormIcon,
  type: 'page',
  description: 'Page with login form and side image',
  detail:
    'It takes a few clicks to set up your login page. Connect your model to the form and feel free to customize your image to your liking.',
  previewUrl: 'https://preview.betty.app/login',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Login.jpg',
  category: 'FORM',
  interactions,
  isPublicPage: true,
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

const prefabStructure: PrefabComponent[] = [
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
                    label: 'Login',
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
                                                      name: 'Data',
                                                      value: 'data',
                                                    },
                                                    {
                                                      name: 'Video',
                                                      value: 'video',
                                                    },
                                                    {
                                                      name: 'URL',
                                                      value: 'url',
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
                                                },
                                              ),
                                              width: size('Width', {
                                                value: '',
                                                configuration: {
                                                  as: 'UNIT',
                                                },
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
                                    Conditional(
                                      {
                                        options: {
                                          ...conditionalOptions,
                                          visible: toggle(
                                            'Initial visibility',
                                            {
                                              value: false,
                                              configuration: {
                                                as: 'VISIBILITY',
                                              },
                                            },
                                          ),
                                        },
                                      },
                                      [
                                        BoxComponent(
                                          {
                                            options: {
                                              ...boxOptions,
                                              outerSpacing: sizes(
                                                'Outer space',
                                                {
                                                  value: [
                                                    '0rem',
                                                    '0rem',
                                                    'XL',
                                                    '0rem',
                                                  ],
                                                },
                                              ),
                                              backgroundColor: color(
                                                'Background color',
                                                {
                                                  value: ThemeColor.DANGER,
                                                },
                                              ),
                                              borderRadius: size(
                                                'Border radius',
                                                {
                                                  value: '5px',
                                                },
                                              ),
                                            },
                                          },
                                          [
                                            TextComponent(
                                              {
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    value: [
                                                      'Attention: This template is using next generation actions!',
                                                    ],
                                                    configuration: {
                                                      as: 'MULTILINE',
                                                    },
                                                  }),
                                                  type: font('Font', {
                                                    value: ['Body1'],
                                                  }),
                                                  outerSpacing: sizes(
                                                    'Outer space',
                                                    {
                                                      value: [
                                                        '0rem',
                                                        '0rem',
                                                        '0rem',
                                                        'S',
                                                      ],
                                                    },
                                                  ),
                                                  textColor: color(
                                                    'Text color',
                                                    {
                                                      value: ThemeColor.WHITE,
                                                    },
                                                  ),
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
                                            TextComponent(
                                              {
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    value: [
                                                      'You need to configure the permissions of the "Form Beta" actions in order to use this template.',
                                                    ],
                                                    configuration: {
                                                      as: 'MULTILINE',
                                                    },
                                                  }),
                                                  type: font('Font', {
                                                    value: ['Body1'],
                                                  }),
                                                  outerSpacing: sizes(
                                                    'Outer space',
                                                    {
                                                      value: [
                                                        '0rem',
                                                        '0rem',
                                                        '0rem',
                                                        'S',
                                                      ],
                                                    },
                                                  ),
                                                  textColor: color(
                                                    'Text color',
                                                    {
                                                      value: ThemeColor.WHITE,
                                                    },
                                                  ),
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
                                            TextComponent(
                                              {
                                                options: {
                                                  ...textOptions,
                                                  content: variable('Content', {
                                                    value: [
                                                      'This message is not visible in your app',
                                                    ],
                                                    configuration: {
                                                      as: 'MULTILINE',
                                                    },
                                                  }),
                                                  type: font('Font', {
                                                    value: ['Body1'],
                                                  }),
                                                  outerSpacing: sizes(
                                                    'Outer space',
                                                    {
                                                      value: [
                                                        '0rem',
                                                        '0rem',
                                                        '0rem',
                                                        'S',
                                                      ],
                                                    },
                                                  ),
                                                  textColor: color(
                                                    'Text color',
                                                    {
                                                      value: ThemeColor.WHITE,
                                                    },
                                                  ),
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
                                          ],
                                        ),
                                      ],
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
                                                value: ['Login'],
                                                configuration: {
                                                  as: 'MULTILINE',
                                                },
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
                                            component(
                                              'Form Beta',
                                              {
                                                options: defaults,
                                                ref: { id: '#formId' },
                                              },
                                              [
                                                FormErrorAlert({
                                                  ref: { id: '#alertErrorId' },
                                                }),
                                                BoxComponent({
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
                                                  ref: { id: '#formBoxRef' },
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
                                                        options: {
                                                          ...submitButtonOptions,
                                                          buttonText: variable(
                                                            'Button text',
                                                            {
                                                              value: ['Login'],
                                                            },
                                                          ),
                                                          fullWidth: toggle(
                                                            'Full width',
                                                            { value: true },
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
                                                      },
                                                      [],
                                                    ),
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
                                                                  'space-between',
                                                                configuration: {
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
                                                                    value: [
                                                                      'Register new account',
                                                                    ],
                                                                  },
                                                                ),
                                                            },
                                                            style: {
                                                              overwrite: {
                                                                backgroundColor:
                                                                  {
                                                                    type: 'STATIC',
                                                                    value:
                                                                      'transparent',
                                                                  },
                                                                boxShadow:
                                                                  'none',
                                                                color: {
                                                                  type: 'THEME_COLOR',
                                                                  value: 'dark',
                                                                },
                                                                fontFamily:
                                                                  'Roboto',
                                                                fontSize:
                                                                  '0.875rem',
                                                                fontStyle:
                                                                  'none',
                                                                fontWeight:
                                                                  '500',
                                                                padding: [
                                                                  '0.6875rem',
                                                                  '1.375rem',
                                                                  '0.6875rem',
                                                                  '0rem',
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
                                                        OpenPageButton(
                                                          {
                                                            options: {
                                                              ...openPageButtonOptions,
                                                              buttonText:
                                                                variable(
                                                                  'Button text',
                                                                  {
                                                                    value: [
                                                                      'I forgot my password',
                                                                    ],
                                                                  },
                                                                ),
                                                            },
                                                            style: {
                                                              overwrite: {
                                                                backgroundColor:
                                                                  {
                                                                    type: 'STATIC',
                                                                    value:
                                                                      'transparent',
                                                                  },
                                                                boxShadow:
                                                                  'none',
                                                                color: {
                                                                  type: 'THEME_COLOR',
                                                                  value: 'dark',
                                                                },
                                                                fontFamily:
                                                                  'Roboto',
                                                                fontSize:
                                                                  '0.875rem',
                                                                fontStyle:
                                                                  'none',
                                                                fontWeight:
                                                                  '500',
                                                                padding: [
                                                                  '0.6875rem',
                                                                  '1.375rem',
                                                                  '0.6875rem',
                                                                  '0rem',
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
                  ],
                ),
              ],
            ),
          ],
        ),
      ]),
    ],
  ),
];

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
  helpers: {
    createUuid,
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
  const [authProfile, setAuthProfile] = React.useState<AuthenticationProfile>();
  const [authProfileInvalid, setAuthProfileInvalid] = React.useState(false);

  const [endpoint, setEndpoint] = React.useState<Endpoint>();
  const [endpointInvalid, setEndpointInvalid] = React.useState(false);

  const [modelProp, setModel] = React.useState(null);

  const isEmptyEndpoint = (value: Endpoint): boolean =>
    !value || Object.keys(value).length === 0 || value.id === '';

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
    onCompleted: (result: { model: null }) => {
      setModel(result.model);
    },
  });

  function serializeParameters(obj: Object) {
    return Object.entries(obj).map(([name, entry]) => ({
      name,
      value: entry.map((v: JSON) => JSON.stringify(v)),
    }));
  }

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
              id: string,
              authProfileObject: AuthenticationProfile,
            ) => {
              setAuthProfileInvalid(false);
              setAuthProfileId(id);
              setAuthProfile(authProfileObject);
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
            onChange={(value: Endpoint): void => {
              setEndpointInvalid(isEmptyEndpoint(value));
              setEndpoint(value);
            }}
          />
        </Field>
      </Content>
      <Footer
        onClose={close}
        onSave={async () => {
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
                  value: ['M', '0rem', '0rem', '0rem'],
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
              setOption(
                textPrefab,
                'type',
                (options: PrefabComponentOption) => ({
                  ...options,
                  value: ['Body1'],
                }),
              );
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

          if (!authProfileId) {
            setAuthProfileInvalid(true);
            // eslint-disable-next-line no-useless-return
            return;
          }
          if (!endpoint) {
            throw new Error('There was no redirected page selected');
          }
          if (isEmptyEndpoint(endpoint)) {
            setEndpointInvalid(true);
            // eslint-disable-next-line no-useless-return
            return;
          }
          if (!modelProp) {
            // eslint-disable-next-line no-console
            console.warn('Model not found');
          }
          const formObject = treeSearch('#formId', newPrefab.structure);
          if (!formObject) throw new Error('Form could not be found');
          formObject.id = componentId;
          const result = await prepareAction(
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

              const formBox = treeSearch('#formBoxRef', newPrefab.structure);
              if (!formBox) throw new Error('Box could not be found');
              authProfile.properties.forEach((prop) => {
                const { kind, name } = prop;
                const vari = Object.values(result.variables).find((v) => {
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
                          (options: PrefabComponentOption) => ({
                            ...options,
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
                if (
                  formInputPrefabs.type === 'COMPONENT' &&
                  formInputPrefabs.descendants[1].type === 'COMPONENT'
                ) {
                  setOption(
                    formInputPrefabs.descendants[1],
                    'margin',
                    (options: PrefabComponentOption) => ({
                      ...options,
                      value: 'none',
                    }),
                  );
                  setOption(
                    formInputPrefabs.descendants[1],
                    'required',
                    (options: PrefabComponentOption) => ({
                      ...options,
                      value: true,
                    }),
                  );
                }
                formBox.descendants.push(formInputPrefabs);
                if (!kind) {
                  // eslint-disable-next-line no-console
                  console.warn('PropertyKind not found');
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
            } else {
              throw new Error(
                'Could not modify the interaction because one of the following items could not be found: Interaction, Interaction parameters, Endpoint, Endpoint parameters',
              );
            }

            setOption(
              formObject,
              'actionId',
              (options: PrefabComponentOption) => ({
                ...options,
                value: result.action.actionId,
                configuration: { disabled: true },
              }),
            );

            setOption(
              formObject,
              'model',
              (options: PrefabComponentOption) => ({
                ...options,
                value: authProfile.loginModel,
                configuration: {
                  disabled: true,
                },
              }),
            );
          }

          save(newPrefab);
        }}
      />
    </>
  );
};

export default prefab(
  'Login form with image',
  attrs,
  beforeCreate,
  prefabStructure,
);
