import * as React from 'react';
import {
  BeforeCreateArgs,
  Icon,
  prefab,
  component,
  model,
  filter,
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
} from '@betty-blocks/component-sdk';
import { updateOption } from '../utils';
import {
  alertOptions,
  Box as BoxComponent,
  boxOptions,
  Column,
  columnOptions,
  FormErrorAlert,
  FormSuccessAlert,
  Grid,
  gridOptions,
  Media,
  mediaOptions,
  Row,
  rowOptions,
  Text as TextComponent,
  textOptions,
} from './structures';

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
};

const options = {
  actionId: option('ACTION_JS', { label: 'Action', value: '' }),
  modelId: model('Model'),
  filter: filter('Filter', { configuration: { dependsOn: 'modelId' } }),
};

const updateFormAlertOptions = {
  bodyText: updateOption(alertOptions.bodyText, {
    value: ['Record successfully updated'],
  }),
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

const BetaForm = (): PrefabReference => {
  return component(
    'Form Beta',
    { label: 'Login Form Beta', options, ref: { id: '#formId' } },
    [
      FormSuccessAlert({
        options: updateFormAlertOptions,
        ref: { id: '#alertSuccessId' },
      }),
      FormErrorAlert({ ref: { id: '#alertErrorId' } }),
    ],
  );
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
                            },
                          },
                          [
                            BoxComponent({}, [
                              BoxComponent({}, [
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
                                    },
                                  },
                                  [],
                                ),
                              ]),
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
                                          value: ['Login'],
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
                              BoxComponent({ options: boxOptions }, []),
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
                                    [BetaForm()],
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
          ],
        ),
      ]),
    ],
  ),
];

const beforeCreate = ({
  prefab: originalPrefab,
  save,
  close,
  components: {
    AuthenticationProfileSelector,
    EndpointSelector,
    Header,
    Content,
    Field,
    Footer,
    Text,
    Box,
  },
}: BeforeCreateArgs) => {
  const [authProfileId, setAuthProfileId] = React.useState('');
  const [authProfile, setAuthProfile] = React.useState(null);
  const [redirectTo, setRedirectTo] = React.useState('');
  const [showAuthValidation, setShowAuthValidation] = React.useState(false);
  const [showEndpointValidation, setShowEndpointValidation] =
    React.useState(false);

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
        return component;
      }
      if (comp.type === 'PARTIAL') {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return getDescendantByRef(refValue, comp.descendants);
    }, null);

  // function serializeParameters(obj) {
  //   return Object.entries(obj).map(([name, entry]) => ({
  //     name,
  //     value: entry.map((v) => JSON.stringify(v)),
  //   }));
  // }

  const isEmptyRedirect = (value: any): boolean =>
    !value || Object.keys(value).length === 0 || value.id === '';

  return (
    <>
      <Header onClose={close} title="Configure login form" />
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
          label="Select an authentication profile"
          error={
            showAuthValidation && (
              <Text color="#e82600">
                Selecting an authentication profile is required
              </Text>
            )
          }
        >
          <AuthenticationProfileSelector
            onChange={(id: string, authProfileObject: any) => {
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
            onChange={(value) => {
              setShowEndpointValidation(isEmptyRedirect(value));
              setRedirectTo(value);
            }}
            value={redirectTo}
            size="large"
          />
        </Field>
      </Content>
      <Footer
        onClose={close}
        onSave={() => {
          if (!authProfileId) {
            setShowAuthValidation(true);
            return;
          }

          if (isEmptyRedirect(redirectTo)) {
            setShowEndpointValidation(true);
            return;
          }

          const newPrefab = { ...originalPrefab };
          // if (authProfile) {
          //   const { loginModel, properties, id } = authProfile;
          //   const formPrefab = getDescendantByRef('#formId', prefabStructure);
          //   newPrefab.actions[1].events[0].options.authenticationProfileId = id;
          //   formPrefab.options[0].value.modelId = loginModel;
          //   formPrefab.options[1].value = loginModel;
          //   newPrefab.variables[0].options.modelId = loginModel;
          //   newPrefab.interactions[4].parameters = [
          //     {
          //       parameter: 'redirectTo',
          //       pageId: redirectTo.pageId,
          //       endpointId: redirectTo.id,
          //       parameters: serializeParameters(redirectTo.params),
          //     },
          //   ];
          //   newPrefab.actions[0].events[0].options.assign = properties.map(
          //     (property) => {
          //       const isPassword = property.kind === 'PASSWORD';
          //       return {
          //         ref: {
          //           leftHandSide: isPassword
          //             ? '#passwordVariableId'
          //             : '#usernameVariableId',
          //           path: [
          //             '#customModelVariableId',
          //             `#attribute_${property.id}`,
          //           ],
          //         },
          //       };
          //     },
          //   );

          //   const descendants = properties.sort((a, b) => {
          //     if (a.kind === b.kind) return 0;
          //     if (a.kind === 'PASSWORD') return 1;
          //     if (b.kind === 'PASSWORD') return -1;
          //     return a.kind.localeCompare(b.kind);
          //   });
          //   const descendantsArray = descendants.map((property) => {
          //     switch (property.kind) {
          //       case 'EMAIL_ADDRESS': {
          //         return {
          //           name: 'Box',
          //           options: [
          //             {
          //               value: 'none',
          //               label: 'Alignment',
          //               key: 'alignment',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'none' },
          //                   { name: 'Left', value: 'flex-start' },
          //                   { name: 'Center', value: 'center' },
          //                   { name: 'Right', value: 'flex-end' },
          //                   { name: 'Justified', value: 'space-between' },
          //                 ],
          //               },
          //             },
          //             {
          //               value: 'none',
          //               label: 'Vertical alignment',
          //               key: 'valignment',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'none' },
          //                   { name: 'Top', value: 'flex-start' },
          //                   { name: 'Center', value: 'center' },
          //                   { name: 'Bottom', value: 'flex-end' },
          //                 ],
          //               },
          //             },
          //             {
          //               value: false,
          //               label: 'Stretch (when in flex container)',
          //               key: 'stretch',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               value: false,
          //               label: 'Transparent',
          //               key: 'transparent',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Height',
          //               key: 'height',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Width',
          //               key: 'width',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //               },
          //             },
          //             {
          //               value: ['0rem', '0rem', '0rem', '0rem'],
          //               label: 'Outer space',
          //               key: 'outerSpacing',
          //               type: 'SIZES',
          //             },
          //             {
          //               value: ['M', '0rem', '0rem', '0rem'],
          //               label: 'Inner space',
          //               key: 'innerSpacing',
          //               type: 'SIZES',
          //             },
          //             {
          //               value: false,
          //               label: 'Show positioning options',
          //               key: 'positioningOptions',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               value: 'static',
          //               label: 'Position',
          //               key: 'position',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Static', value: 'static' },
          //                   { name: 'Relative', value: 'relative' },
          //                   { name: 'Absolute', value: 'absolute' },
          //                   { name: 'Fixed', value: 'fixed' },
          //                   { name: 'Sticky', value: 'sticky' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Top position',
          //               key: 'top',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Right position',
          //               key: 'right',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Bottom position',
          //               key: 'bottom',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Left position',
          //               key: 'left',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: false,
          //               label: 'Show background options',
          //               key: 'backgroundOptions',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               value: 'Transparent',
          //               label: 'Background color',
          //               key: 'backgroundColor',
          //               type: 'COLOR',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 100,
          //               label: 'Background color opacity',
          //               key: 'backgroundColorAlpha',
          //               type: 'NUMBER',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: [''],
          //               label: 'Background url',
          //               key: 'backgroundUrl',
          //               type: 'VARIABLE',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'initial',
          //               label: 'Background size',
          //               key: 'backgroundSize',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Initial', value: 'initial' },
          //                   { name: 'Contain', value: 'contain' },
          //                   { name: 'Cover', value: 'cover' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'center center',
          //               label: 'Background position',
          //               key: 'backgroundPosition',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'DROPDOWN',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Left top', value: 'left top' },
          //                   { name: 'Left center', value: 'left center' },
          //                   { name: 'Left bottom', value: 'left bottom' },
          //                   { name: 'Center top', value: 'center top' },
          //                   { name: 'Center center', value: 'center center' },
          //                   { name: 'Center bottom', value: 'center bottom' },
          //                   { name: 'Right top', value: 'right top' },
          //                   { name: 'Right center', value: 'right center' },
          //                   { name: 'Right bottom', value: 'right bottom' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'no-repeat',
          //               label: 'Background repeat',
          //               key: 'backgroundRepeat',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'no-repeat' },
          //                   { name: 'X', value: 'repeat-x' },
          //                   { name: 'Y', value: 'repeat-y' },
          //                   { name: 'All', value: 'repeat' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'inherit',
          //               label: 'Background attachment',
          //               key: 'backgroundAttachment',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Inherit', value: 'inherit' },
          //                   { name: 'Scroll', value: 'scroll' },
          //                   { name: 'Fixed', value: 'fixed' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'Transparent',
          //               label: 'Border color',
          //               key: 'borderColor',
          //               type: 'COLOR',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Border thickness',
          //               key: 'borderWidth',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'solid',
          //               label: 'Border style',
          //               key: 'borderStyle',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'none' },
          //                   { name: 'Solid', value: 'solid' },
          //                   { name: 'Dashed', value: 'dashed' },
          //                   { name: 'Dotted', value: 'dotted' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Border radius',
          //               key: 'borderRadius',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: false,
          //               label: 'Advanced settings',
          //               key: 'advancedSettings',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               type: 'VARIABLE',
          //               label: 'Test attribute',
          //               key: 'dataComponentAttribute',
          //               value: ['Box'],
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'advancedSettings',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //           ],
          //           descendants: [
          //             {
          //               name: 'Text',
          //               options: [
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'Content',
          //                   key: 'content',
          //                   value: [property.label],
          //                   configuration: {
          //                     as: 'MULTILINE',
          //                   },
          //                 },
          //                 {
          //                   type: 'TOGGLE',
          //                   label: 'Display Rich Text',
          //                   key: 'useInnerHtml',
          //                   value: false,
          //                 },
          //                 {
          //                   value: 'Body1',
          //                   label: 'Type',
          //                   key: 'type',
          //                   type: 'FONT',
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Text Alignment',
          //                   key: 'textAlignment',
          //                   value: 'left',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Left', value: 'left' },
          //                       { name: 'Center', value: 'center' },
          //                       { name: 'Right', value: 'right' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   value: ['0rem', '0rem', 'S', '0rem'],
          //                   label: 'Outer space',
          //                   key: 'outerSpacing',
          //                   type: 'SIZES',
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Link to',
          //                   key: 'linkType',
          //                   value: 'internal',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Internal page', value: 'internal' },
          //                       { name: 'External page', value: 'external' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   value: '_self',
          //                   label: 'Open in',
          //                   key: 'linkTarget',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Current Tab', value: '_self' },
          //                       { name: 'New Tab', value: '_blank' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   value: '',
          //                   label: 'Page',
          //                   key: 'linkTo',
          //                   type: 'ENDPOINT',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'linkType',
          //                       comparator: 'EQ',
          //                       value: 'internal',
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: [''],
          //                   label: 'URL',
          //                   key: 'linkToExternal',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     placeholder: 'Starts with https:// or http://',
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'linkType',
          //                       comparator: 'EQ',
          //                       value: 'external',
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Styles',
          //                   key: 'styles',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Text color',
          //                   key: 'textColor',
          //                   value: 'Black',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Font weight',
          //                   key: 'fontWeight',
          //                   value: '400',
          //                   configuration: {
          //                     as: 'DROPDOWN',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: '100', value: '100' },
          //                       { name: '200', value: '200' },
          //                       { name: '300', value: '300' },
          //                       { name: '400', value: '400' },
          //                       { name: '500', value: '500' },
          //                       { name: '600', value: '600' },
          //                       { name: '700', value: '700' },
          //                       { name: '800', value: '800' },
          //                       { name: '900', value: '900' },
          //                     ],
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Advanced settings',
          //                   key: 'advancedSettings',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'Test attribute',
          //                   key: 'dataComponentAttribute',
          //                   value: ['Text'],
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'advancedSettings',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //               ],
          //               descendants: [],
          //             },
          //             {
          //               name: 'TextField',
          //               options: [
          //                 {
          //                   value: {
          //                     label: [property.label],
          //                     value: [
          //                       {
          //                         id: [property.id],
          //                         type: 'PROPERTY',
          //                       },
          //                     ],
          //                     propertyIds: [property.id],
          //                     ref: {
          //                       id: `#attribute_${property.id}`,
          //                     },
          //                   },
          //                   label: 'Label',
          //                   key: 'customModelAttribute',
          //                   type: 'CUSTOM_MODEL_ATTRIBUTE',
          //                   configuration: {
          //                     allowedTypes: ['string'],
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Validation options',
          //                   key: 'validationOptions',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   label: 'Validation pattern',
          //                   key: 'pattern',
          //                   value: '',
          //                   type: 'TEXT',
          //                   configuration: {
          //                     placeholder:
          //                       '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   label: 'Min length',
          //                   key: 'minlength',
          //                   value: '',
          //                   type: 'NUMBER',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   label: 'Max length',
          //                   key: 'maxlength',
          //                   value: '',
          //                   type: 'NUMBER',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['This field is required'],
          //                   label: 'Value required message',
          //                   key: 'validationValueMissing',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['Invalid value'],
          //                   label: 'Pattern mismatch message',
          //                   key: 'validationPatternMismatch',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['This value is too short'],
          //                   label: 'Value too short message',
          //                   key: 'validationTooShort',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['This value is too long'],
          //                   label: 'Value too long message',
          //                   key: 'validationTooLong',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['No valid value provided'],
          //                   label: 'Email mismatch message',
          //                   key: 'validationTypeMismatch',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Spellcheck',
          //                   key: 'spellCheck',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Autocomplete',
          //                   key: 'autoComplete',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'TOGGLE',
          //                   label: 'Disabled',
          //                   key: 'disabled',
          //                   value: false,
          //                 },
          //                 {
          //                   value: ['example@email.com'],
          //                   label: 'Placeholder',
          //                   key: 'placeholder',
          //                   type: 'VARIABLE',
          //                 },
          //                 {
          //                   value: [],
          //                   label: 'Helper text',
          //                   key: 'helperText',
          //                   type: 'VARIABLE',
          //                 },
          //                 {
          //                   label: 'Variant',
          //                   key: 'variant',
          //                   value: 'outlined',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       {
          //                         name: 'Standard',
          //                         value: 'standard',
          //                       },
          //                       {
          //                         name: 'Outlined',
          //                         value: 'outlined',
          //                       },
          //                       { name: 'Filled', value: 'filled' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   type: 'TOGGLE',
          //                   label: 'Full width',
          //                   key: 'fullWidth',
          //                   value: true,
          //                 },
          //                 {
          //                   label: 'Size',
          //                   key: 'size',
          //                   value: 'medium',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Medium', value: 'medium' },
          //                       { name: 'Small', value: 'small' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   label: 'Margin',
          //                   key: 'margin',
          //                   value: 'none',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'None', value: 'none' },
          //                       { name: 'Dense', value: 'dense' },
          //                       { name: 'Normal', value: 'normal' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   label: 'Adornment',
          //                   key: 'adornmentIcon',
          //                   value: 'None',
          //                   type: 'ICON',
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Position',
          //                   key: 'adornmentPosition',
          //                   value: 'end',
          //                   configuration: {
          //                     condition: {
          //                       type: 'HIDE',
          //                       option: 'adornmentIcon',
          //                       comparator: 'EQ',
          //                       value: 'none',
          //                     },
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Start', value: 'start' },
          //                       { name: 'End', value: 'end' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   label: 'Type',
          //                   key: 'type',
          //                   value: 'email',
          //                   type: 'TEXT',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'adornmentIcon',
          //                       comparator: 'EQ',
          //                       value: 0,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Styles',
          //                   key: 'styles',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Background color',
          //                   key: 'backgroundColor',
          //                   value: 'White',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Border color',
          //                   key: 'borderColor',
          //                   value: 'Accent1',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Border color (hover)',
          //                   key: 'borderHoverColor',
          //                   value: 'Black',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Border color (focus)',
          //                   key: 'borderFocusColor',
          //                   value: 'Primary',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Hide label',
          //                   key: 'hideLabel',
          //                   type: 'TOGGLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Label color',
          //                   key: 'labelColor',
          //                   value: 'Accent3',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Text color',
          //                   key: 'textColor',
          //                   value: 'Black',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Placeholder color',
          //                   key: 'placeholderColor',
          //                   value: 'Light',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Helper color',
          //                   key: 'helperColor',
          //                   value: 'Accent2',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Error color',
          //                   key: 'errorColor',
          //                   value: 'Danger',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Advanced settings',
          //                   key: 'advancedSettings',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'name attribute',
          //                   key: 'nameAttribute',
          //                   value: [],
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'advancedSettings',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'Test attribute',
          //                   key: 'dataComponentAttribute',
          //                   value: ['TextField'],
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'advancedSettings',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //               ],
          //               descendants: [],
          //             },
          //           ],
          //         };
          //       }
          //       case 'PASSWORD': {
          //         return {
          //           name: 'Box',
          //           options: [
          //             {
          //               value: 'none',
          //               label: 'Alignment',
          //               key: 'alignment',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'none' },
          //                   { name: 'Left', value: 'flex-start' },
          //                   { name: 'Center', value: 'center' },
          //                   { name: 'Right', value: 'flex-end' },
          //                   { name: 'Justified', value: 'space-between' },
          //                 ],
          //               },
          //             },
          //             {
          //               value: 'none',
          //               label: 'Vertical alignment',
          //               key: 'valignment',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'none' },
          //                   { name: 'Top', value: 'flex-start' },
          //                   { name: 'Center', value: 'center' },
          //                   { name: 'Bottom', value: 'flex-end' },
          //                 ],
          //               },
          //             },
          //             {
          //               value: false,
          //               label: 'Stretch (when in flex container)',
          //               key: 'stretch',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               value: false,
          //               label: 'Transparent',
          //               key: 'transparent',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Height',
          //               key: 'height',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Width',
          //               key: 'width',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //               },
          //             },
          //             {
          //               value: ['M', '0rem', '0rem', '0rem'],
          //               label: 'Outer space',
          //               key: 'outerSpacing',
          //               type: 'SIZES',
          //             },
          //             {
          //               value: ['0rem', '0rem', '0rem', '0rem'],
          //               label: 'Inner space',
          //               key: 'innerSpacing',
          //               type: 'SIZES',
          //             },
          //             {
          //               value: false,
          //               label: 'Show positioning options',
          //               key: 'positioningOptions',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               value: 'static',
          //               label: 'Position',
          //               key: 'position',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Static', value: 'static' },
          //                   { name: 'Relative', value: 'relative' },
          //                   { name: 'Absolute', value: 'absolute' },
          //                   { name: 'Fixed', value: 'fixed' },
          //                   { name: 'Sticky', value: 'sticky' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Top position',
          //               key: 'top',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Right position',
          //               key: 'right',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Bottom position',
          //               key: 'bottom',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Left position',
          //               key: 'left',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: false,
          //               label: 'Show background options',
          //               key: 'backgroundOptions',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               value: 'Transparent',
          //               label: 'Background color',
          //               key: 'backgroundColor',
          //               type: 'COLOR',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 100,
          //               label: 'Background color opacity',
          //               key: 'backgroundColorAlpha',
          //               type: 'NUMBER',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: [''],
          //               label: 'Background url',
          //               key: 'backgroundUrl',
          //               type: 'VARIABLE',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'initial',
          //               label: 'Background size',
          //               key: 'backgroundSize',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Initial', value: 'initial' },
          //                   { name: 'Contain', value: 'contain' },
          //                   { name: 'Cover', value: 'cover' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'center center',
          //               label: 'Background position',
          //               key: 'backgroundPosition',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'DROPDOWN',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Left top', value: 'left top' },
          //                   { name: 'Left center', value: 'left center' },
          //                   { name: 'Left bottom', value: 'left bottom' },
          //                   { name: 'Center top', value: 'center top' },
          //                   { name: 'Center center', value: 'center center' },
          //                   { name: 'Center bottom', value: 'center bottom' },
          //                   { name: 'Right top', value: 'right top' },
          //                   { name: 'Right center', value: 'right center' },
          //                   { name: 'Right bottom', value: 'right bottom' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'no-repeat',
          //               label: 'Background repeat',
          //               key: 'backgroundRepeat',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'no-repeat' },
          //                   { name: 'X', value: 'repeat-x' },
          //                   { name: 'Y', value: 'repeat-y' },
          //                   { name: 'All', value: 'repeat' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'inherit',
          //               label: 'Background attachment',
          //               key: 'backgroundAttachment',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Inherit', value: 'inherit' },
          //                   { name: 'Scroll', value: 'scroll' },
          //                   { name: 'Fixed', value: 'fixed' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'Transparent',
          //               label: 'Border color',
          //               key: 'borderColor',
          //               type: 'COLOR',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Border thickness',
          //               key: 'borderWidth',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'solid',
          //               label: 'Border style',
          //               key: 'borderStyle',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'none' },
          //                   { name: 'Solid', value: 'solid' },
          //                   { name: 'Dashed', value: 'dashed' },
          //                   { name: 'Dotted', value: 'dotted' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Border radius',
          //               key: 'borderRadius',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: false,
          //               label: 'Advanced settings',
          //               key: 'advancedSettings',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               type: 'VARIABLE',
          //               label: 'Test attribute',
          //               key: 'dataComponentAttribute',
          //               value: ['Box'],
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'advancedSettings',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //           ],
          //           descendants: [
          //             {
          //               name: 'Text',
          //               options: [
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'Content',
          //                   key: 'content',
          //                   value: [property.label],
          //                   configuration: {
          //                     as: 'MULTILINE',
          //                   },
          //                 },
          //                 {
          //                   type: 'TOGGLE',
          //                   label: 'Display Rich Text',
          //                   key: 'useInnerHtml',
          //                   value: false,
          //                 },
          //                 {
          //                   value: 'Body1',
          //                   label: 'Type',
          //                   key: 'type',
          //                   type: 'FONT',
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Text Alignment',
          //                   key: 'textAlignment',
          //                   value: 'left',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Left', value: 'left' },
          //                       { name: 'Center', value: 'center' },
          //                       { name: 'Right', value: 'right' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   value: ['0rem', '0rem', 'S', '0rem'],
          //                   label: 'Outer space',
          //                   key: 'outerSpacing',
          //                   type: 'SIZES',
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Link to',
          //                   key: 'linkType',
          //                   value: 'internal',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Internal page', value: 'internal' },
          //                       { name: 'External page', value: 'external' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   value: '_self',
          //                   label: 'Open in',
          //                   key: 'linkTarget',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Current Tab', value: '_self' },
          //                       { name: 'New Tab', value: '_blank' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   value: '',
          //                   label: 'Page',
          //                   key: 'linkTo',
          //                   type: 'ENDPOINT',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'linkType',
          //                       comparator: 'EQ',
          //                       value: 'internal',
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: [''],
          //                   label: 'URL',
          //                   key: 'linkToExternal',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     placeholder: 'Starts with https:// or http://',
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'linkType',
          //                       comparator: 'EQ',
          //                       value: 'external',
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Styles',
          //                   key: 'styles',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Text color',
          //                   key: 'textColor',
          //                   value: 'Black',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Font weight',
          //                   key: 'fontWeight',
          //                   value: '400',
          //                   configuration: {
          //                     as: 'DROPDOWN',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: '100', value: '100' },
          //                       { name: '200', value: '200' },
          //                       { name: '300', value: '300' },
          //                       { name: '400', value: '400' },
          //                       { name: '500', value: '500' },
          //                       { name: '600', value: '600' },
          //                       { name: '700', value: '700' },
          //                       { name: '800', value: '800' },
          //                       { name: '900', value: '900' },
          //                     ],
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Advanced settings',
          //                   key: 'advancedSettings',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'Test attribute',
          //                   key: 'dataComponentAttribute',
          //                   value: ['Text'],
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'advancedSettings',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //               ],
          //               descendants: [],
          //             },
          //             {
          //               name: 'TextField',
          //               options: [
          //                 {
          //                   value: {
          //                     label: [property.label],
          //                     value: [
          //                       {
          //                         id: [property.id],
          //                         type: 'PROPERTY',
          //                       },
          //                     ],
          //                     propertyIds: [property.id],
          //                     ref: {
          //                       id: `#attribute_${property.id}`,
          //                     },
          //                   },
          //                   label: 'Label',
          //                   key: 'customModelAttribute',
          //                   type: 'CUSTOM_MODEL_ATTRIBUTE',
          //                   configuration: {
          //                     allowedTypes: ['string'],
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Validation options',
          //                   key: 'validationOptions',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   label: 'Validation pattern',
          //                   key: 'pattern',
          //                   value: '',
          //                   type: 'TEXT',
          //                   configuration: {
          //                     placeholder:
          //                       '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   label: 'Min length',
          //                   key: 'minlength',
          //                   value: '',
          //                   type: 'NUMBER',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   label: 'Max length',
          //                   key: 'maxlength',
          //                   value: '',
          //                   type: 'NUMBER',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['This field is required'],
          //                   label: 'Value required message',
          //                   key: 'validationValueMissing',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: [
          //                     'Password must contain 8 characters, 1 lowercase character, 1 upper case character and 1 digit',
          //                   ],
          //                   label: 'Pattern mismatch message',
          //                   key: 'validationPatternMismatch',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['This value is too short'],
          //                   label: 'Value too short message',
          //                   key: 'validationTooShort',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['This value is too long'],
          //                   label: 'Value too long message',
          //                   key: 'validationTooLong',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Spellcheck',
          //                   key: 'spellCheck',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Autocomplete',
          //                   key: 'autoComplete',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'TOGGLE',
          //                   label: 'Disabled',
          //                   key: 'disabled',
          //                   value: false,
          //                 },
          //                 {
          //                   value: ['your password'],
          //                   label: 'Placeholder',
          //                   key: 'placeholder',
          //                   type: 'VARIABLE',
          //                 },
          //                 {
          //                   value: [],
          //                   label: 'Helper text',
          //                   key: 'helperText',
          //                   type: 'VARIABLE',
          //                 },
          //                 {
          //                   label: 'Variant',
          //                   key: 'variant',
          //                   value: 'outlined',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       {
          //                         name: 'Standard',
          //                         value: 'standard',
          //                       },
          //                       {
          //                         name: 'Outlined',
          //                         value: 'outlined',
          //                       },
          //                       { name: 'Filled', value: 'filled' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   type: 'TOGGLE',
          //                   label: 'Full width',
          //                   key: 'fullWidth',
          //                   value: true,
          //                 },
          //                 {
          //                   label: 'Size',
          //                   key: 'size',
          //                   value: 'medium',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Medium', value: 'medium' },
          //                       { name: 'Small', value: 'small' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   label: 'Margin',
          //                   key: 'margin',
          //                   value: 'none',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'None', value: 'none' },
          //                       { name: 'Dense', value: 'dense' },
          //                       { name: 'Normal', value: 'normal' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   label: 'Show password toggle',
          //                   key: 'adornment',
          //                   value: true,
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Position',
          //                   key: 'adornmentPosition',
          //                   value: 'end',
          //                   configuration: {
          //                     condition: {
          //                       type: 'HIDE',
          //                       option: 'adornment',
          //                       comparator: 'EQ',
          //                       value: false,
          //                     },
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Start', value: 'start' },
          //                       { name: 'End', value: 'end' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   label: 'Type',
          //                   key: 'type',
          //                   value: 'password',
          //                   type: 'TEXT',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'adornmentPosition',
          //                       comparator: 'EQ',
          //                       value: 0,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Styles',
          //                   key: 'styles',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Background color',
          //                   key: 'backgroundColor',
          //                   value: 'White',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Border color',
          //                   key: 'borderColor',
          //                   value: 'Accent1',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Border color (hover)',
          //                   key: 'borderHoverColor',
          //                   value: 'Black',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Border color (focus)',
          //                   key: 'borderFocusColor',
          //                   value: 'Primary',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Hide label',
          //                   key: 'hideLabel',
          //                   type: 'TOGGLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Label color',
          //                   key: 'labelColor',
          //                   value: 'Accent3',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Text color',
          //                   key: 'textColor',
          //                   value: 'Black',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Placeholder color',
          //                   key: 'placeholderColor',
          //                   value: 'Light',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Helper color',
          //                   key: 'helperColor',
          //                   value: 'Accent2',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Error color',
          //                   key: 'errorColor',
          //                   value: 'Danger',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Advanced settings',
          //                   key: 'advancedSettings',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'name attribute',
          //                   key: 'nameAttribute',
          //                   value: [],
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'advancedSettings',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'Test attribute',
          //                   key: 'dataComponentAttribute',
          //                   value: ['TextField'],
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'advancedSettings',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //               ],
          //               descendants: [],
          //             },
          //           ],
          //         };
          //       }
          //       default:
          //         return {
          //           name: 'Box',
          //           options: [
          //             {
          //               value: 'none',
          //               label: 'Alignment',
          //               key: 'alignment',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'none' },
          //                   { name: 'Left', value: 'flex-start' },
          //                   { name: 'Center', value: 'center' },
          //                   { name: 'Right', value: 'flex-end' },
          //                   { name: 'Justified', value: 'space-between' },
          //                 ],
          //               },
          //             },
          //             {
          //               value: 'none',
          //               label: 'Vertical alignment',
          //               key: 'valignment',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'none' },
          //                   { name: 'Top', value: 'flex-start' },
          //                   { name: 'Center', value: 'center' },
          //                   { name: 'Bottom', value: 'flex-end' },
          //                 ],
          //               },
          //             },
          //             {
          //               value: false,
          //               label: 'Stretch (when in flex container)',
          //               key: 'stretch',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               value: false,
          //               label: 'Transparent',
          //               key: 'transparent',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Height',
          //               key: 'height',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Width',
          //               key: 'width',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //               },
          //             },
          //             {
          //               value: ['0rem', '0rem', '0rem', '0rem'],
          //               label: 'Outer space',
          //               key: 'outerSpacing',
          //               type: 'SIZES',
          //             },
          //             {
          //               value: ['M', '0rem', '0rem', '0rem'],
          //               label: 'Inner space',
          //               key: 'innerSpacing',
          //               type: 'SIZES',
          //             },
          //             {
          //               value: false,
          //               label: 'Show positioning options',
          //               key: 'positioningOptions',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               value: 'static',
          //               label: 'Position',
          //               key: 'position',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Static', value: 'static' },
          //                   { name: 'Relative', value: 'relative' },
          //                   { name: 'Absolute', value: 'absolute' },
          //                   { name: 'Fixed', value: 'fixed' },
          //                   { name: 'Sticky', value: 'sticky' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Top position',
          //               key: 'top',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Right position',
          //               key: 'right',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Bottom position',
          //               key: 'bottom',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Left position',
          //               key: 'left',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'positioningOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: false,
          //               label: 'Show background options',
          //               key: 'backgroundOptions',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               value: 'Transparent',
          //               label: 'Background color',
          //               key: 'backgroundColor',
          //               type: 'COLOR',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 100,
          //               label: 'Background color opacity',
          //               key: 'backgroundColorAlpha',
          //               type: 'NUMBER',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: [''],
          //               label: 'Background url',
          //               key: 'backgroundUrl',
          //               type: 'VARIABLE',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'initial',
          //               label: 'Background size',
          //               key: 'backgroundSize',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Initial', value: 'initial' },
          //                   { name: 'Contain', value: 'contain' },
          //                   { name: 'Cover', value: 'cover' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'center center',
          //               label: 'Background position',
          //               key: 'backgroundPosition',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'DROPDOWN',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Left top', value: 'left top' },
          //                   { name: 'Left center', value: 'left center' },
          //                   { name: 'Left bottom', value: 'left bottom' },
          //                   { name: 'Center top', value: 'center top' },
          //                   { name: 'Center center', value: 'center center' },
          //                   { name: 'Center bottom', value: 'center bottom' },
          //                   { name: 'Right top', value: 'right top' },
          //                   { name: 'Right center', value: 'right center' },
          //                   { name: 'Right bottom', value: 'right bottom' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'no-repeat',
          //               label: 'Background repeat',
          //               key: 'backgroundRepeat',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'no-repeat' },
          //                   { name: 'X', value: 'repeat-x' },
          //                   { name: 'Y', value: 'repeat-y' },
          //                   { name: 'All', value: 'repeat' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'inherit',
          //               label: 'Background attachment',
          //               key: 'backgroundAttachment',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'Inherit', value: 'inherit' },
          //                   { name: 'Scroll', value: 'scroll' },
          //                   { name: 'Fixed', value: 'fixed' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'Transparent',
          //               label: 'Border color',
          //               key: 'borderColor',
          //               type: 'COLOR',
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Border thickness',
          //               key: 'borderWidth',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: 'solid',
          //               label: 'Border style',
          //               key: 'borderStyle',
          //               type: 'CUSTOM',
          //               configuration: {
          //                 as: 'BUTTONGROUP',
          //                 dataType: 'string',
          //                 allowedInput: [
          //                   { name: 'None', value: 'none' },
          //                   { name: 'Solid', value: 'solid' },
          //                   { name: 'Dashed', value: 'dashed' },
          //                   { name: 'Dotted', value: 'dotted' },
          //                 ],
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               type: 'SIZE',
          //               label: 'Border radius',
          //               key: 'borderRadius',
          //               value: '',
          //               configuration: {
          //                 as: 'UNIT',
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'backgroundOptions',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //             {
          //               value: false,
          //               label: 'Advanced settings',
          //               key: 'advancedSettings',
          //               type: 'TOGGLE',
          //             },
          //             {
          //               type: 'VARIABLE',
          //               label: 'Test attribute',
          //               key: 'dataComponentAttribute',
          //               value: ['Box'],
          //               configuration: {
          //                 condition: {
          //                   type: 'SHOW',
          //                   option: 'advancedSettings',
          //                   comparator: 'EQ',
          //                   value: true,
          //                 },
          //               },
          //             },
          //           ],
          //           descendants: [
          //             {
          //               name: 'Text',
          //               options: [
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'Content',
          //                   key: 'content',
          //                   value: [property.label],
          //                   configuration: {
          //                     as: 'MULTILINE',
          //                   },
          //                 },
          //                 {
          //                   type: 'TOGGLE',
          //                   label: 'Display Rich Text',
          //                   key: 'useInnerHtml',
          //                   value: false,
          //                 },
          //                 {
          //                   value: 'Body1',
          //                   label: 'Type',
          //                   key: 'type',
          //                   type: 'FONT',
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Text Alignment',
          //                   key: 'textAlignment',
          //                   value: 'left',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Left', value: 'left' },
          //                       { name: 'Center', value: 'center' },
          //                       { name: 'Right', value: 'right' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   value: ['0rem', '0rem', 'S', '0rem'],
          //                   label: 'Outer space',
          //                   key: 'outerSpacing',
          //                   type: 'SIZES',
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Link to',
          //                   key: 'linkType',
          //                   value: 'internal',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Internal page', value: 'internal' },
          //                       { name: 'External page', value: 'external' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   value: '_self',
          //                   label: 'Open in',
          //                   key: 'linkTarget',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Current Tab', value: '_self' },
          //                       { name: 'New Tab', value: '_blank' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   value: '',
          //                   label: 'Page',
          //                   key: 'linkTo',
          //                   type: 'ENDPOINT',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'linkType',
          //                       comparator: 'EQ',
          //                       value: 'internal',
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: [''],
          //                   label: 'URL',
          //                   key: 'linkToExternal',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     placeholder: 'Starts with https:// or http://',
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'linkType',
          //                       comparator: 'EQ',
          //                       value: 'external',
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Styles',
          //                   key: 'styles',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Text color',
          //                   key: 'textColor',
          //                   value: 'Black',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Font weight',
          //                   key: 'fontWeight',
          //                   value: '400',
          //                   configuration: {
          //                     as: 'DROPDOWN',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: '100', value: '100' },
          //                       { name: '200', value: '200' },
          //                       { name: '300', value: '300' },
          //                       { name: '400', value: '400' },
          //                       { name: '500', value: '500' },
          //                       { name: '600', value: '600' },
          //                       { name: '700', value: '700' },
          //                       { name: '800', value: '800' },
          //                       { name: '900', value: '900' },
          //                     ],
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Advanced settings',
          //                   key: 'advancedSettings',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'Test attribute',
          //                   key: 'dataComponentAttribute',
          //                   value: ['Text'],
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'advancedSettings',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //               ],
          //               descendants: [],
          //             },
          //             {
          //               name: 'TextField',
          //               options: [
          //                 {
          //                   value: {
          //                     label: [property.label],
          //                     value: [
          //                       {
          //                         id: [property.id],
          //                         type: 'PROPERTY',
          //                       },
          //                     ],
          //                     propertyIds: [property.id],
          //                     ref: {
          //                       id: `#attribute_${property.id}`,
          //                     },
          //                   },
          //                   label: 'Label',
          //                   key: 'customModelAttribute',
          //                   type: 'CUSTOM_MODEL_ATTRIBUTE',
          //                   configuration: {
          //                     allowedTypes: ['string'],
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Validation options',
          //                   key: 'validationOptions',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   label: 'Validation pattern',
          //                   key: 'pattern',
          //                   value: '',
          //                   type: 'TEXT',
          //                   configuration: {
          //                     placeholder:
          //                       '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   label: 'Min length',
          //                   key: 'minlength',
          //                   value: '',
          //                   type: 'NUMBER',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   label: 'Max length',
          //                   key: 'maxlength',
          //                   value: '',
          //                   type: 'NUMBER',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['This field is required'],
          //                   label: 'Value required message',
          //                   key: 'validationValueMissing',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['Invalid value'],
          //                   label: 'Pattern mismatch message',
          //                   key: 'validationPatternMismatch',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['This value is too short'],
          //                   label: 'Value too short message',
          //                   key: 'validationTooShort',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: ['This value is too long'],
          //                   label: 'Value too long message',
          //                   key: 'validationTooLong',
          //                   type: 'VARIABLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'validationOptions',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Spellcheck',
          //                   key: 'spellCheck',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Autocomplete',
          //                   key: 'autoComplete',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'TOGGLE',
          //                   label: 'Disabled',
          //                   key: 'disabled',
          //                   value: false,
          //                 },
          //                 {
          //                   value: [property.label],
          //                   label: 'Placeholder',
          //                   key: 'placeholder',
          //                   type: 'VARIABLE',
          //                 },
          //                 {
          //                   value: [],
          //                   label: 'Helper text',
          //                   key: 'helperText',
          //                   type: 'VARIABLE',
          //                 },
          //                 {
          //                   label: 'Variant',
          //                   key: 'variant',
          //                   value: 'outlined',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       {
          //                         name: 'Standard',
          //                         value: 'standard',
          //                       },
          //                       {
          //                         name: 'Outlined',
          //                         value: 'outlined',
          //                       },
          //                       {
          //                         name: 'Filled',
          //                         value: 'filled',
          //                       },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   type: 'TOGGLE',
          //                   label: 'Full width',
          //                   key: 'fullWidth',
          //                   value: true,
          //                 },
          //                 {
          //                   label: 'Size',
          //                   key: 'size',
          //                   value: 'medium',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       {
          //                         name: 'Medium',
          //                         value: 'medium',
          //                       },
          //                       { name: 'Small', value: 'small' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   label: 'Margin',
          //                   key: 'margin',
          //                   value: 'none',
          //                   type: 'CUSTOM',
          //                   configuration: {
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'None', value: 'none' },
          //                       { name: 'Dense', value: 'dense' },
          //                       {
          //                         name: 'Normal',
          //                         value: 'normal',
          //                       },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   label: 'Adornment',
          //                   key: 'adornmentIcon',
          //                   value: 'none',
          //                   type: 'ICON',
          //                 },
          //                 {
          //                   type: 'CUSTOM',
          //                   label: 'Position',
          //                   key: 'adornmentPosition',
          //                   value: 'start',
          //                   configuration: {
          //                     condition: {
          //                       type: 'HIDE',
          //                       option: 'adornmentIcon',
          //                       comparator: 'EQ',
          //                       value: '',
          //                     },
          //                     as: 'BUTTONGROUP',
          //                     dataType: 'string',
          //                     allowedInput: [
          //                       { name: 'Start', value: 'start' },
          //                       { name: 'End', value: 'end' },
          //                     ],
          //                   },
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Styles',
          //                   key: 'styles',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Background color',
          //                   key: 'backgroundColor',
          //                   value: 'White',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Border color',
          //                   key: 'borderColor',
          //                   value: 'Accent1',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Border color (hover)',
          //                   key: 'borderHoverColor',
          //                   value: 'Black',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Border color (focus)',
          //                   key: 'borderFocusColor',
          //                   value: 'Primary',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: true,
          //                   label: 'Hide label',
          //                   key: 'hideLabel',
          //                   type: 'TOGGLE',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Label color',
          //                   key: 'labelColor',
          //                   value: 'Accent3',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Text color',
          //                   key: 'textColor',
          //                   value: 'Black',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Placeholder color',
          //                   key: 'placeholderColor',
          //                   value: 'Light',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Helper color',
          //                   key: 'helperColor',
          //                   value: 'Accent2',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'COLOR',
          //                   label: 'Error color',
          //                   key: 'errorColor',
          //                   value: 'Danger',
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'styles',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   value: false,
          //                   label: 'Advanced settings',
          //                   key: 'advancedSettings',
          //                   type: 'TOGGLE',
          //                 },
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'name attribute',
          //                   key: 'nameAttribute',
          //                   value: [],
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'advancedSettings',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //                 {
          //                   type: 'VARIABLE',
          //                   label: 'Test attribute',
          //                   key: 'dataComponentAttribute',
          //                   value: ['TextField'],
          //                   configuration: {
          //                     condition: {
          //                       type: 'SHOW',
          //                       option: 'advancedSettings',
          //                       comparator: 'EQ',
          //                       value: true,
          //                     },
          //                   },
          //                 },
          //               ],
          //               descendants: [],
          //             },
          //           ],
          //         };
          //     }
          //   });

          //   const alertErrorDescendant = [
          //     {
          //       name: 'Alert',
          //       ref: {
          //         id: '#alertErrorId',
          //       },
          //       options: [
          //         {
          //           value: false,
          //           label: 'Toggle visibility',
          //           key: 'visible',
          //           type: 'TOGGLE',
          //           configuration: {
          //             as: 'VISIBILITY',
          //           },
          //         },
          //         {
          //           type: 'VARIABLE',
          //           label: 'Body text',
          //           key: 'bodyText',
          //           value: ['*Dynamic value from the Action response*'],
          //         },
          //         {
          //           label: 'Allow to overwrite by the server response',
          //           key: 'allowTextServerResponse',
          //           value: true,
          //           type: 'TOGGLE',
          //         },
          //         {
          //           type: 'VARIABLE',
          //           label: 'Title text',
          //           key: 'titleText',
          //           value: ['Error'],
          //         },
          //         {
          //           label: 'Allow to overwrite by the server response',
          //           key: 'allowTitleServerResponse',
          //           value: false,
          //           type: 'TOGGLE',
          //         },
          //         {
          //           value: 'White',
          //           label: 'Text color',
          //           key: 'textColor',
          //           type: 'COLOR',
          //         },
          //         {
          //           value: 'White',
          //           label: 'Icon color',
          //           key: 'iconColor',
          //           type: 'COLOR',
          //         },
          //         {
          //           value: 'Danger',
          //           label: 'Background color',
          //           key: 'background',
          //           type: 'COLOR',
          //         },
          //         {
          //           value: 'Transparent',
          //           label: 'Border color',
          //           key: 'borderColor',
          //           type: 'COLOR',
          //         },
          //         {
          //           label: 'Icon',
          //           key: 'icon',
          //           value: 'Error',
          //           type: 'ICON',
          //         },
          //         {
          //           value: true,
          //           label: 'Collapsable',
          //           key: 'collapsable',
          //           type: 'TOGGLE',
          //         },
          //         {
          //           type: 'CUSTOM',
          //           label: 'Horizontal Alignment',
          //           key: 'horizontalAlignment',
          //           value: 'flex-start',
          //           configuration: {
          //             as: 'BUTTONGROUP',
          //             dataType: 'string',
          //             allowedInput: [
          //               { name: 'Left', value: 'flex-start' },
          //               { name: 'Center', value: 'center' },
          //               { name: 'Right', value: 'flex-end' },
          //             ],
          //             condition: {
          //               type: 'HIDE',
          //               option: 'collapsable',
          //               comparator: 'EQ',
          //               value: true,
          //             },
          //           },
          //         },
          //         {
          //           type: 'CUSTOM',
          //           label: 'Vertical Alignment',
          //           key: 'verticalAlignment',
          //           value: 'stretch',
          //           configuration: {
          //             as: 'BUTTONGROUP',
          //             dataType: 'string',
          //             allowedInput: [
          //               { name: 'Top', value: 'flex-start' },
          //               { name: 'Center', value: 'center' },
          //               { name: 'Bottom', value: 'flex-end' },
          //               { name: 'Justified', value: 'stretch' },
          //             ],
          //           },
          //         },
          //         {
          //           value: ['M', '0rem', '0rem', '0rem'],
          //           label: 'Outer space',
          //           key: 'outerSpacing',
          //           type: 'SIZES',
          //         },
          //         {
          //           value: false,
          //           label: 'Advanced settings',
          //           key: 'advancedSettings',
          //           type: 'TOGGLE',
          //         },
          //         {
          //           type: 'VARIABLE',
          //           label: 'Test attribute',
          //           key: 'dataComponentAttribute',
          //           value: ['Alert'],
          //           configuration: {
          //             condition: {
          //               type: 'SHOW',
          //               option: 'advancedSettings',
          //               comparator: 'EQ',
          //               value: true,
          //             },
          //           },
          //         },
          //       ],
          //       descendants: [],
          //     },
          //   ];

          //   formPrefab.descendants = [
          //     ...alertErrorDescendant,
          //     ...descendantsArray,
          //     ...formPrefab.descendants,
          //   ];

          //   newPrefab.structure[0].descendants = prefabStructure;
          //   save(newPrefab);
          // }
        }}
      />
    </>
  );
};

export default prefab(
  'Login form with image (TS)',
  attrs,
  undefined,
  prefabStructure,
);
