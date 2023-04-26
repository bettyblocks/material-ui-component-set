import {
  CreatePropertyKind,
  Icon,
  PrefabInteraction,
  ThemeColor,
  authenticationProfile,
  buttongroup,
  color,
  displayLogic,
  endpoint,
  filter,
  font,
  hideIf,
  icon,
  linked,
  model,
  modelAndRelation,
  number,
  option,
  prefab,
  property,
  size,
  text,
  toggle,
  variable,
  wrapper,
} from '@betty-blocks/component-sdk';
import { AllOptions } from './structures/AllOptions';
import { allOptionsOptions } from './structures/AllOptions/options';

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'TEST EDGE',
  icon: Icon.TextInputIcon,
  interactions,
  variables: [],
};

export default prefab('AllOptions widget', attributes, undefined, [
  wrapper(
    {
      label: 'All options widget',
      optionCategories: [],
      options: {
        content: linked({
          label: 'Content',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#content',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        authenticationProfile: linked({
          label: 'authenticationProfile',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#authenticationProfile',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        color: linked({
          label: 'color',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#color',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        endpoint: linked({
          label: 'endpoint',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#endpoint',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        filter: linked({
          label: 'filter',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#filter',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        font: linked({
          label: 'font',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#font',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        icon: linked({
          label: 'icon',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#icon',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        model: linked({
          label: 'model',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#model',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        modelAndRelation: linked({
          label: 'modelAndRelation',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#modelAndRelation',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        number: linked({
          label: 'number',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#number',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        property: linked({
          label: 'property',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#property',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        size: linked({
          label: 'size',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#size',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        toggle: linked({
          label: 'toggle',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#toggle',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        text: linked({
          label: 'text',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#text',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        actionId: linked({
          label: 'actionId',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#actionId',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        iconPosition: linked({
          label: 'iconPosition',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#iconPosition',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        fontWeight: linked({
          label: 'fontWeight',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#fontWeight',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
        displayLogic: linked({
          label: 'displayLogic',
          value: {
            ref: {
              componentId: '#allOptions',
              optionId: '#displayLogic',
            },
          },
          configuration: {
            showOnDrop: true,
          },
        }),
      },
    },
    [
      AllOptions(
        {
          ref: { id: '#allOptions' },
          options: {
            ...allOptionsOptions,
            content: variable('Content', {
              value: ['Hello world'],
              configuration: { as: 'MULTILINE' },
              ref: { id: '#content' },
            }),
            authenticationProfile: authenticationProfile('Auth profile', {
              value: '',
              ref: { id: '#authenticationProfile' },
            }),
            color: color('Color', {
              value: ThemeColor.PRIMARY,
              ref: { id: '#color' },
            }),
            endpoint: endpoint('Endpoint', {
              value: '',
              ref: { id: '#endpoint' },
            }),
            filter: filter('Filter', {
              value: '',
              ref: { id: '#filter' },
            }),
            font: font('Font', {
              value: 'Title1',
              ref: { id: '#font' },
            }),
            icon: icon('Icon', {
              value: 'Favorite',
              ref: { id: '#icon' },
            }),
            model: model('Model', {
              value: '',
              ref: { id: '#model' },
            }),
            modelAndRelation: modelAndRelation('Model and relation', {
              value: '',
              ref: { id: '#modelAndRelation' },
            }),
            number: number('Number', {
              value: 1,
              ref: { id: '#number' },
            }),
            property: property('Property', {
              value: '',
              ref: { id: '#property' },
              configuration: {
                createProperty: {
                  type: CreatePropertyKind.OBJECT,
                },
                manageObjectValues: {
                  value: [],
                },
              },
            }),
            size: size('size', {
              value: 'L',
              ref: { id: '#size' },
            }),
            toggle: toggle('Toggle', {
              value: true,
              ref: { id: '#toggle' },
            }),
            text: text('Text', {
              value: 'Text example',
              ref: { id: '#text' },
            }),
            actionId: option('ACTION_JS', {
              label: 'Action',
              value: '',
              ref: { id: '#actionId' },
            }),
            iconPosition: buttongroup(
              'Icon position',
              [
                ['Start', 'start'],
                ['End', 'end'],
              ],
              {
                value: 'start',
                configuration: {
                  condition: hideIf('icon', 'EQ', 'None'),
                },
                ref: { id: '#iconPosition' },
              },
            ),
            fontWeight: option('CUSTOM', {
              label: 'Font weight',
              value: '300',
              configuration: {
                as: 'DROPDOWN',
                dataType: 'string',
                allowedInput: [
                  { name: '300', value: '300' },
                  { name: '400', value: '400' },
                  { name: '500', value: '500' },
                ],
              },
              ref: { id: '#fontWeight' },
            }),
            displayLogic: displayLogic('displaylogic', {
              value: {},
              ref: { id: '#displayLogic' },
            }),
          },
        },
        [],
      ),
    ],
  ),
]);
