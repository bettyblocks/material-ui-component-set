import * as React from 'react';
import {
  prefab,
  Icon,
  InteractionType,
  PrefabInteraction,
  BeforeCreateArgs,
  wrapper,
  sizes,
  ThemeColor,
  color,
  size,
  variable,
  option,
  toggle,
  buttongroup,
  font,
} from '@betty-blocks/component-sdk';
import {
  Box,
  boxOptions,
  Text,
  TextInput,
  textOptions,
  textInputOptions,
} from './structures';

const beforeCreate = ({ save, close, prefab }: BeforeCreateArgs) => {};

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'LAYOUT',
  icon: Icon.UpdateFormIcon,
  interactions,
  variables: [],
};

export default prefab('Text Widget', attributes, undefined, [
  wrapper(
    {
      label: 'Text widget',
    },
    [
      Box(
        {
          options: {
            ...boxOptions,
            backgroundColor: color('Background color', {
              value: ThemeColor.WHITE,
            }),
            borderColor: color('Border color', {
              value: ThemeColor.MEDIUM,
            }),
            borderWidth: size('Border thickness', {
              value: '1px',
              configuration: {
                as: 'UNIT',
              },
            }),
            borderRadius: size('Border radius', {
              value: '5px',
              configuration: {
                as: 'UNIT',
              },
            }),
          },
        },
        [
          Text(
            {
              options: {
                ...textOptions,
                content: variable('Content', {
                  ref: { id: '#textContent' },
                  value: [],
                  configuration: { as: 'MULTILINE' },
                }),
                type: font('Font', { value: ['Body1'] }),
                outerSpacing: sizes('Outer space', {
                  value: ['0rem', '0rem', 'S', '0rem'],
                }),
                fontWeight: option('CUSTOM', {
                  label: 'Font weight',
                  value: '500',
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
            },
            [],
          ),
          TextInput(
            {
              label: 'Text field',
              options: {
                ...textInputOptions,
                hideLabel: toggle('Hide label', { value: true }),
                placeholder: variable('Placeholder', {
                  ref: { id: '#textInputPlaceholder' },
                  value: [''],
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
            },
            [],
          ),
        ],
      ),
    ],
  ),
]);
