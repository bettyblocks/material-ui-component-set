import {
  prefab as makePrefab,
  Icon,
  option,
  sizes,
  size,
  showIf,
  toggle,
  color,
  ThemeColor,
  variable,
  font,
  buttongroup,
  icon,
  hideIf,
  PrefabInteraction,
} from '@betty-blocks/component-sdk';
import {
  Box as boxPrefab,
  Column,
  boxOptions,
  columnOptions,
  Row,
  rowOptions,
  Text as TextPrefab,
  Media,
  mediaOptions,
  Divider,
  dividerOptions,
  Text,
  textOptions,
  TextInput,
  textInputOptions,
  Avatar,
  avatarOptions,
  Button,
  buttonOptions,
} from './structures';
import { showOn } from '../utils';

const interactions = [
  {
    name: 'Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#searchBarHolder',
      sourceComponentId: '#closeSearchBarHolder',
    },
    type: 'Custom',
  },
  {
    name: 'Show/Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#searchBarHolder',
      sourceComponentId: '#toggleSearchBarHolder',
    },
    type: 'Custom',
  },
  {
    name: 'Show/Hide',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#mobileHamburgerMenu',
      sourceComponentId: '#toggleMobileHamburgerMenu',
    },
    type: 'Custom',
  },
] as PrefabInteraction[];

const attrs = {
  icon: Icon.NavbarIcon,
  type: 'page',
  description: 'Case dashboard',
  detail: 'Case dashboard',
  previewUrl: 'https://preview.betty.app/header-and-footer',
  previewImage: 'https://miro.medium.com/max/500/1*5ZpezKwqt6fUXNNBpSUDXA.jpeg',
  category: 'LAYOUT',
  interactions,
};

export default makePrefab('Case dashboard', attrs, undefined, [
  Row(
    {
      label: 'Menu',
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
      // Desktop design
      Column(
        {
          label: 'Desktop',
          options: {
            ...columnOptions,
            innerSpacing: sizes('Inner space', {
              value: ['0rem', '0rem', '0rem', '0rem'],
            }),
            columnWidthTabletPortrait: option('CUSTOM', {
              value: 'hidden',
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
              value: 'hidden',
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
          },
        },
        [
          boxPrefab(
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
                innerSpacing: sizes('Inner space', {
                  value: ['S', 'L', 'S', 'L'],
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
                        columnWidth: option('CUSTOM', {
                          label: 'Column width',
                          value: 'fitContent',
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
                          value: 'fitContent',
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
                                { name: 'I-frame', value: 'iframe' },
                              ],
                            },
                          }),
                          urlFileSource: variable('Source', {
                            value: [
                              'https://www.cerbanet.org/resources/Pictures/Toronto/Logos/dentons.png',
                            ],
                            configuration: {
                              placeholder: 'Starts with https:// or http://',
                              as: 'MULTILINE',
                              condition: showIf('type', 'EQ', 'url'),
                            },
                          }),
                          outerSpacing: sizes('Outer space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                          width: size('Width', {
                            value: '140px',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                        },
                      }),
                    ],
                  ),
                  Column(
                    {
                      options: {
                        ...columnOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['M', 'S', 'M', 'S'],
                        }),
                      },
                    },
                    [
                      boxPrefab(
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
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
                          },
                        },
                        [
                          // Home
                          boxPrefab(
                            {
                              options: {
                                ...boxOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', 'M', '0rem', 'M'],
                                }),
                              },
                            },
                            [
                              Divider({
                                options: {
                                  ...dividerOptions,
                                  color: color('Color', {
                                    value: ThemeColor.TRANSPARENT,
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                },
                              }),
                              Text({
                                options: {
                                  ...textOptions,
                                  content: variable('Content', {
                                    value: ['Home'],
                                    configuration: { as: 'MULTILINE' },
                                  }),
                                  type: font('Font', { value: ['Body1'] }),
                                },
                              }),
                              Divider({
                                options: {
                                  ...dividerOptions,
                                  color: color('Color', {
                                    value: ThemeColor.PRIMARY,
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                  thickness: size('Thickness', { value: 'L' }),
                                },
                              }),
                            ],
                          ),
                          // Case
                          boxPrefab(
                            {
                              options: {
                                ...boxOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', 'M', '0rem', 'M'],
                                }),
                              },
                            },
                            [
                              Divider({
                                options: {
                                  ...dividerOptions,
                                  color: color('Color', {
                                    value: ThemeColor.TRANSPARENT,
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                },
                              }),
                              Text({
                                options: {
                                  ...textOptions,
                                  content: variable('Content', {
                                    value: ['Cases'],
                                    configuration: { as: 'MULTILINE' },
                                  }),
                                  type: font('Font', { value: ['Body1'] }),
                                },
                              }),
                              Divider({
                                options: {
                                  ...dividerOptions,
                                  color: color('Color', {
                                    value: ThemeColor.TRANSPARENT,
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                  thickness: size('Thickness', { value: 'L' }),
                                },
                              }),
                            ],
                          ),
                          // Users
                          boxPrefab(
                            {
                              options: {
                                ...boxOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', 'M', '0rem', 'M'],
                                }),
                              },
                            },
                            [
                              Divider({
                                options: {
                                  ...dividerOptions,
                                  color: color('Color', {
                                    value: ThemeColor.TRANSPARENT,
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                },
                              }),
                              Text({
                                options: {
                                  ...textOptions,
                                  content: variable('Content', {
                                    value: ['Users'],
                                    configuration: { as: 'MULTILINE' },
                                  }),
                                  type: font('Font', { value: ['Body1'] }),
                                },
                              }),
                              Divider({
                                options: {
                                  ...dividerOptions,
                                  color: color('Color', {
                                    value: ThemeColor.TRANSPARENT,
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                  thickness: size('Thickness', { value: 'L' }),
                                },
                              }),
                            ],
                          ),
                          // Case types
                          boxPrefab(
                            {
                              options: {
                                ...boxOptions,
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', 'M', '0rem', 'M'],
                                }),
                              },
                            },
                            [
                              Divider({
                                options: {
                                  ...dividerOptions,
                                  color: color('Color', {
                                    value: ThemeColor.TRANSPARENT,
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                },
                              }),
                              Text({
                                options: {
                                  ...textOptions,
                                  content: variable('Content', {
                                    value: ['Case types'],
                                    configuration: { as: 'MULTILINE' },
                                  }),
                                  type: font('Font', { value: ['Body1'] }),
                                },
                              }),
                              Divider({
                                options: {
                                  ...dividerOptions,
                                  color: color('Color', {
                                    value: ThemeColor.TRANSPARENT,
                                  }),
                                  outerSpacing: sizes('Outer space', {
                                    value: ['0rem', '0rem', '0rem', '0rem'],
                                  }),
                                  thickness: size('Thickness', { value: 'L' }),
                                },
                              }),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                  Column(
                    {
                      options: {
                        ...columnOptions,
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
                        horizontalAlignment: option('CUSTOM', {
                          label: 'Horizontal Alignment',
                          value: 'flex-end',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'inherit' },
                              { name: 'Left', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Right', value: 'flex-end' },
                            ],
                          },
                        }),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                      },
                    },
                    [
                      boxPrefab(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
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
                          },
                        },
                        [
                          Button({
                            ref: { id: '#toggleSearchBarHolder' },
                            options: {
                              ...buttonOptions,
                              buttonText: variable('Button text', {
                                value: [''],
                              }),
                              icon: icon('Icon', { value: 'Search' }),
                              outerSpacing: sizes('Outer space', {
                                value: ['0rem', '0rem', '0rem', '0rem'],
                              }),
                              size: option('CUSTOM', {
                                value: 'medium',
                                label: 'Icon size',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'Small', value: 'small' },
                                    { name: 'Medium', value: 'medium' },
                                    { name: 'Large', value: 'large' },
                                  ],
                                  condition: hideIf('icon', 'EQ', 'None'),
                                },
                              }),
                            },
                            style: {
                              overwrite: {
                                padding: ['0.6875rem', '1rem'],
                                boxShadow: 'none',
                                color: {
                                  type: 'THEME_COLOR',
                                  value: 'primary',
                                },
                                backgroundColor: {
                                  type: 'THEME_COLOR',
                                  value: 'transparent',
                                },
                              },
                            },
                          }),
                          boxPrefab(
                            {
                              options: {
                                ...boxOptions,
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
                                outerSpacing: sizes('Outer space', {
                                  value: ['0rem', 'm', '0rem', 'S'],
                                }),
                                innerSpacing: sizes('Inner space', {
                                  value: ['0rem', '0rem', '0rem', '0rem'],
                                }),
                              },
                            },
                            [
                              Avatar({
                                options: {
                                  ...avatarOptions,
                                  margin: sizes('Outer Space', {
                                    value: ['S', 'S', 'S', 'S'],
                                  }),
                                },
                              }),
                              boxPrefab(
                                {
                                  options: {
                                    ...boxOptions,
                                    innerSpacing: sizes('Inner space', {
                                      value: ['0rem', '0rem', '0rem', '0rem'],
                                    }),
                                  },
                                },
                                [
                                  TextPrefab({
                                    options: {
                                      ...textOptions,
                                      content: variable('Content', {
                                        value: ['Username'],
                                        configuration: {
                                          as: 'MULTILINE',
                                        },
                                      }),
                                      type: font('Font', {
                                        value: ['Body1'],
                                      }),
                                    },
                                  }),
                                  TextPrefab({
                                    options: {
                                      ...textOptions,
                                      content: variable('Content', {
                                        value: ['My Account'],
                                        configuration: {
                                          as: 'MULTILINE',
                                        },
                                      }),
                                      type: font('Font', {
                                        value: ['Body1'],
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
                          Button({
                            options: {
                              ...buttonOptions,
                              buttonText: variable('Button text', {
                                value: ['New case'],
                              }),
                              icon: icon('Icon', { value: 'Add' }),
                              outerSpacing: sizes('Outer space', {
                                value: ['0rem', '0rem', '0rem', 'S'],
                              }),
                            },
                            style: {
                              overwrite: {
                                textTransform: 'none',
                                boxShadow: 'none',
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
                  ref: { id: '#searchBarHolder' },
                  options: {
                    ...columnOptions,
                    visible: toggle('Toggle visibility', {
                      value: false,
                      configuration: {
                        as: 'VISIBILITY',
                      },
                    }),
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
                    backgroundColor: color('Background color', {
                      value: ThemeColor.ACCENT_1,
                    }),
                  },
                },
                [
                  boxPrefab(
                    {
                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', 'M', '0rem', 'M'],
                        }),
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
                      },
                    },
                    [
                      TextInput({
                        options: {
                          ...textInputOptions,
                          label: variable('Label', { value: ['Search'] }),
                          backgroundColor: color('Background color', {
                            value: ThemeColor.TRANSPARENT,
                            ...showOn('styles'),
                          }),
                          borderColor: color('Border color', {
                            value: ThemeColor.TRANSPARENT,
                            ...showOn('styles'),
                          }),

                          borderHoverColor: color('Border color (hover)', {
                            value: ThemeColor.TRANSPARENT,
                            ...showOn('styles'),
                          }),

                          borderFocusColor: color('Border color (focus)', {
                            value: ThemeColor.TRANSPARENT,
                            ...showOn('styles'),
                          }),
                          margin: buttongroup(
                            'Margin',
                            [
                              ['None', 'none'],
                              ['Dense', 'dense'],
                              ['Normal', 'normal'],
                            ],
                            { value: 'none' },
                          ),
                        },
                      }),
                      Button({
                        ref: { id: '#closeSearchBarHolder' },
                        options: {
                          ...buttonOptions,
                          size: option('CUSTOM', {
                            value: 'medium',
                            label: 'Icon size',
                            configuration: {
                              as: 'BUTTONGROUP',
                              dataType: 'string',
                              allowedInput: [
                                { name: 'Small', value: 'small' },
                                { name: 'Medium', value: 'medium' },
                                { name: 'Large', value: 'large' },
                              ],
                              condition: hideIf('icon', 'EQ', 'None'),
                            },
                          }),
                          icon: icon('Icon', { value: 'Close' }),
                          buttonText: variable('Button text', { value: [''] }),
                        },
                        style: {
                          overwrite: {
                            boxShadow: 'none',
                            color: {
                              value: 'darj',
                              type: 'THEME_COLOR',
                            },
                            backgroundColor: {
                              value: 'transparent',
                              type: 'THEME_COLOR',
                            },
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
      // Mobile design
      Column(
        {
          label: 'Mobile',
          options: {
            ...columnOptions,
            innerSpacing: sizes('Inner space', {
              value: ['0rem', '0rem', '0rem', '0rem'],
            }),
            columnWidth: option('CUSTOM', {
              label: 'Column width',
              value: 'hidden',
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
              value: 'hidden',
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
          },
        },
        [
          boxPrefab(
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
                innerSpacing: sizes('Inner space', {
                  value: ['S', 'L', 'S', 'L'],
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
                                { name: 'I-frame', value: 'iframe' },
                              ],
                            },
                          }),
                          urlFileSource: variable('Source', {
                            value: [
                              'https://www.cerbanet.org/resources/Pictures/Toronto/Logos/dentons.png',
                            ],
                            configuration: {
                              placeholder: 'Starts with https:// or http://',
                              as: 'MULTILINE',
                              condition: showIf('type', 'EQ', 'url'),
                            },
                          }),
                          outerSpacing: sizes('Outer space', {
                            value: ['0rem', '0rem', '0rem', '0rem'],
                          }),
                          width: size('Width', {
                            value: '100px',
                            configuration: {
                              as: 'UNIT',
                            },
                          }),
                        },
                      }),
                    ],
                  ),
                  Column(
                    {
                      options: {
                        ...columnOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
                        horizontalAlignment: option('CUSTOM', {
                          label: 'Horizontal Alignment',
                          value: 'flex-end',
                          configuration: {
                            as: 'BUTTONGROUP',
                            dataType: 'string',
                            allowedInput: [
                              { name: 'None', value: 'inherit' },
                              { name: 'Left', value: 'flex-start' },
                              { name: 'Center', value: 'center' },
                              { name: 'Right', value: 'flex-end' },
                            ],
                          },
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
                      boxPrefab(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0 rem', '0rem', '0rem'],
                            }),
                          },
                        },
                        [
                          Button({
                            ref: { id: '#toggleMobileHamburgerMenu' },
                            options: {
                              ...buttonOptions,
                              buttonText: variable('Button text', {
                                value: [''],
                              }),
                              icon: icon('Icon', { value: 'Dehaze' }),
                              outerSpacing: sizes('Outer space', {
                                value: ['0rem', '0rem', '0rem', '0rem'],
                              }),
                              size: option('CUSTOM', {
                                value: 'medium',
                                label: 'Icon size',
                                configuration: {
                                  as: 'BUTTONGROUP',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: 'Small', value: 'small' },
                                    { name: 'Medium', value: 'medium' },
                                    { name: 'Large', value: 'large' },
                                  ],
                                  condition: hideIf('icon', 'EQ', 'None'),
                                },
                              }),
                            },
                            style: {
                              overwrite: {
                                padding: ['0.6875rem', '0rem'],
                                boxShadow: 'none',
                                color: {
                                  type: 'THEME_COLOR',
                                  value: 'primary',
                                },
                                backgroundColor: {
                                  type: 'THEME_COLOR',
                                  value: 'transparent',
                                },
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
                  ref: { id: '#mobileHamburgerMenu' },
                  options: {
                    ...columnOptions,
                    visible: toggle('Toggle visibility', {
                      value: false,
                      configuration: {
                        as: 'VISIBILITY',
                      },
                    }),
                    outerSpacing: sizes('Outer space', {
                      value: ['0rem', '0rem', 'S', '0rem'],
                    }),
                    innerSpacing: sizes('Inner space', {
                      value: ['0rem', 'L', '0rem', 'L'],
                    }),
                    horizontalAlignment: option('CUSTOM', {
                      label: 'Horizontal Alignment',
                      value: 'center',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          { name: 'None', value: 'inherit' },
                          { name: 'Left', value: 'flex-start' },
                          { name: 'Center', value: 'center' },
                          { name: 'Right', value: 'flex-end' },
                        ],
                      },
                    }),
                  },
                },
                [
                  Divider({
                    options: {
                      ...dividerOptions,
                      outerSpacing: sizes('Outer space', {
                        value: ['0rem', '0rem', 'L', '0rem'],
                      }),
                    },
                  }),
                  boxPrefab(
                    {
                      options: {
                        ...boxOptions,
                        outerSpacing: sizes('Outer space', {
                          value: ['0rem', '0rem', 'L', '0rem'],
                        }),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
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
                            value: 'none',
                            configuration: {
                              dataType: 'string',
                            },
                          },
                        ),
                      },
                    },
                    [
                      boxPrefab(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
                          },
                        },
                        [
                          Text({
                            options: {
                              ...textOptions,
                              content: variable('Content', {
                                value: ['Home'],
                                configuration: { as: 'MULTILINE' },
                              }),
                              type: font('Font', { value: ['Body1'] }),
                              textColor: color('Text color', {
                                value: ThemeColor.PRIMARY,
                              }),
                              fontWeight: option('CUSTOM', {
                                label: 'Font weight',
                                value: '600',
                                configuration: {
                                  as: 'DROPDOWN',
                                  dataType: 'string',
                                  allowedInput: [
                                    { name: '100', value: '100' },
                                    { name: '200', value: '200' },
                                    { name: '300', value: '300' },
                                    { name: '400', value: '400' },
                                    { name: '500', value: '500' },
                                    { name: '600', value: '600' },
                                    { name: '700', value: '700' },
                                    { name: '800', value: '800' },
                                    { name: '900', value: '900' },
                                  ],
                                },
                              }),
                            },
                          }),
                          Divider({
                            options: {
                              ...dividerOptions,
                              thickness: size('Thickness', { value: 'L' }),
                              color: color('Color', {
                                value: ThemeColor.PRIMARY,
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
                  boxPrefab(
                    {
                      options: {
                        ...boxOptions,
                        outerSpacing: sizes('Outer space', {
                          value: ['0rem', '0rem', 'L', '0rem'],
                        }),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
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
                            value: 'none',
                            configuration: {
                              dataType: 'string',
                            },
                          },
                        ),
                      },
                    },
                    [
                      boxPrefab(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
                          },
                        },
                        [
                          Text({
                            options: {
                              ...textOptions,
                              content: variable('Content', {
                                value: ['Cases'],
                                configuration: { as: 'MULTILINE' },
                              }),
                              type: font('Font', { value: ['Body1'] }),
                            },
                          }),
                          Divider({
                            options: {
                              ...dividerOptions,
                              thickness: size('Thickness', { value: 'L' }),
                              color: color('Color', {
                                value: ThemeColor.TRANSPARENT,
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
                  boxPrefab(
                    {
                      options: {
                        ...boxOptions,
                        outerSpacing: sizes('Outer space', {
                          value: ['0rem', '0rem', 'L', '0rem'],
                        }),
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
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
                            value: 'none',
                            configuration: {
                              dataType: 'string',
                            },
                          },
                        ),
                      },
                    },
                    [
                      boxPrefab(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
                          },
                        },
                        [
                          Text({
                            options: {
                              ...textOptions,
                              content: variable('Content', {
                                value: ['Users'],
                                configuration: { as: 'MULTILINE' },
                              }),
                              type: font('Font', { value: ['Body1'] }),
                            },
                          }),
                          Divider({
                            options: {
                              ...dividerOptions,
                              thickness: size('Thickness', { value: 'L' }),
                              color: color('Color', {
                                value: ThemeColor.TRANSPARENT,
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
                  boxPrefab(
                    {
                      options: {
                        ...boxOptions,
                        innerSpacing: sizes('Inner space', {
                          value: ['0rem', '0rem', '0rem', '0rem'],
                        }),
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
                            value: 'none',
                            configuration: {
                              dataType: 'string',
                            },
                          },
                        ),
                      },
                    },
                    [
                      boxPrefab(
                        {
                          options: {
                            ...boxOptions,
                            innerSpacing: sizes('Inner space', {
                              value: ['0rem', '0rem', '0rem', '0rem'],
                            }),
                            outerSpacing: sizes('Outer space', {
                              value: ['0rem', '0rem', 'M', '0rem'],
                            }),
                          },
                        },
                        [
                          Text({
                            options: {
                              ...textOptions,
                              content: variable('Content', {
                                value: ['Case types'],
                                configuration: { as: 'MULTILINE' },
                              }),
                              type: font('Font', { value: ['Body1'] }),
                            },
                          }),
                          Divider({
                            options: {
                              ...dividerOptions,
                              thickness: size('Thickness', { value: 'L' }),
                              color: color('Color', {
                                value: ThemeColor.TRANSPARENT,
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
                  Divider({
                    options: {
                      ...dividerOptions,
                      outerSpacing: sizes('Outer space', {
                        value: ['0rem', '0rem', 'M', '0rem'],
                      }),
                    },
                  }),
                  TextInput({
                    options: {
                      ...textInputOptions,
                      label: variable('Label', { value: ['Search'] }),
                      backgroundColor: color('Background color', {
                        value: ThemeColor.ACCENT_1,
                        ...showOn('styles'),
                      }),
                      adornmentIcon: icon('Icon', {
                        value: 'Search',
                      }),
                      size: buttongroup(
                        'Size',
                        [
                          ['Medium', 'medium'],
                          ['Small', 'small'],
                        ],
                        { value: 'small' },
                      ),
                      borderColor: color('Border color', {
                        value: ThemeColor.TRANSPARENT,
                        ...showOn('styles'),
                      }),

                      borderHoverColor: color('Border color (hover)', {
                        value: ThemeColor.TRANSPARENT,
                        ...showOn('styles'),
                      }),

                      borderFocusColor: color('Border color (focus)', {
                        value: ThemeColor.TRANSPARENT,
                        ...showOn('styles'),
                      }),
                      margin: buttongroup(
                        'Margin',
                        [
                          ['None', 'none'],
                          ['Dense', 'dense'],
                          ['Normal', 'normal'],
                        ],
                        { value: 'none' },
                      ),
                    },
                  }),
                  Button({
                    options: {
                      ...buttonOptions,
                      buttonText: variable('Button text', {
                        value: ['Your account'],
                      }),
                      fullWidth: toggle('Full width', { value: true }),
                      icon: icon('Icon', { value: 'Person' }),
                      outerSpacing: sizes('Outer space', {
                        value: ['M', '0rem', 'M', '0rem'],
                      }),
                    },
                    style: {
                      overwrite: {
                        boxShadow: 'none',
                        color: {
                          type: 'THEME_COLOR',
                          value: 'primary',
                        },
                        borderColor: {
                          type: 'THEME_COLOR',
                          value: 'primary',
                        },
                        borderStyle: 'solid',
                        borderWidth: ['0.0625rem'],
                        backgroundColor: {
                          type: 'THEME_COLOR',
                          value: 'transparent',
                        },
                      },
                    },
                  }),
                  Button({
                    options: {
                      ...buttonOptions,
                      buttonText: variable('Button text', {
                        value: ['New case'],
                      }),
                      fullWidth: toggle('Full width', { value: true }),
                      icon: icon('Icon', { value: 'Add' }),
                    },
                    style: {
                      overwrite: {
                        boxShadow: 'none',
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
]);
