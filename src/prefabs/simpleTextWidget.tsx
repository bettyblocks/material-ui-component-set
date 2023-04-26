import {
  CreatePropertyKind,
  Icon,
  PrefabInteraction,
  component as makeComponent,
  linked,
  option,
  prefab,
  property,
  variable,
  wrapper,
} from '@betty-blocks/component-sdk';
import { options as formOptions } from './structures/ActionJSForm/options';
import {
  Box,
  Text as TextComp,
  TextInput,
  textOptions,
  textInputOptions,
} from './structures';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'TEST EDGE',
  icon: Icon.TextInputIcon,
  interactions,
  variables: [],
};

export default prefab('Simple text widget', attributes, undefined, [
  wrapper(
    {
      label: 'Simple text widget',
      optionCategories: [],
      options: {
        question: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#textInput',
              optionId: '#property',
            },
          },
          optionRef: {
            id: '#question',
          },
          configuration: {
            showOnDrop: true,
          },
        }),
      },
    },
    [
      Box({}, [
        makeComponent(
          'Form',
          {
            ref: { id: '#allOptionsWidgetForm' },
            options: {
              ...formOptions,
              actionId: option('ACTION_JS', {
                label: 'Action',
                value: '',
                configuration: {
                  createAction: {
                    template: 'update',
                  },
                },
              }),
            },
          },
          [
            TextComp(
              {
                ref: { id: '#questionText' },
                options: {
                  ...textOptions,
                  content: variable('Content', {
                    ref: { id: '#textContent' },
                    value: [],
                    configuration: { as: 'MULTILINE' },
                    optionRef: {
                      sourceId: '#question',
                      inherit: 'label',
                    },
                  }),
                },
              },
              [],
            ),
            TextInput(
              {
                label: 'Text field',
                ref: { id: '#textInput' },
                options: {
                  ...textInputOptions,
                  property: property('property', {
                    value: '',
                    ref: { id: '#property' },
                    configuration: {
                      createProperty: {
                        type: CreatePropertyKind.STRING,
                      },
                    },
                  }),
                  label: variable('Label', {
                    value: [''],
                    optionRef: {
                      sourceId: '#question',
                      inherit: 'label',
                    },
                  }),
                  value: variable('Value', {
                    value: [''],
                    optionRef: {
                      sourceId: '#question',
                      inherit: 'name',
                    },
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
]);
