import * as React from 'react';
import {
  prefab,
  Icon,
  buttongroup,
  variable,
  InteractionType,
  PrefabInteraction,
  sizes,
  PrefabReference,
  PrefabComponent,
} from '@betty-blocks/component-sdk';

import {
  Box,
  boxOptions,
  Button,
  buttonOptions,
  FilterComponent,
} from './structures';

const interactions: PrefabInteraction[] = [
  {
    name: 'Add filter group',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterComp',
      sourceComponentId: '#addFilterButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Apply filter',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterComp',
      sourceComponentId: '#applyButton',
    },
    type: InteractionType.Custom,
  },
  {
    name: 'Reset advanced filter',
    sourceEvent: 'Click',
    ref: {
      targetComponentId: '#filterComp',
      sourceComponentId: '#clearButton',
    },
    type: InteractionType.Custom,
  },
];

const attributes = {
  category: 'DATA',
  icon: Icon.FilterIcon,
  keywords: ['DATA', 'filter', 'cat', 'kitty', 'smokey'],
  interactions,
};

const beforeCreate = ({
  save,
  close,
  prefab: originalPrefab,
  components: {
    Header,
    Content,
    ComponentSelector,
    Footer,
    Field,
    Box: BoxComp,
  },
  helpers,
}: any) => {
  const { setOption } = helpers;
  const [thisPageState, setThisPageState] = React.useState<any>({
    modelId: null,
    component: null,
  });
  const [modelId, setModelId] = React.useState();

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

  return (
    <>
      <Header onClose={close} title="Configure Filter" />

      <Content>
        <BoxComp pad={{ bottom: '15px' }}>
          <Field label="Select the component you want to filter">
            <ComponentSelector
              onChange={(component) => {
                const foundModelId = Object.values<any>(
                  component.options,
                ).reduce(
                  (acc, option) =>
                    option.type === 'MODEL' ||
                    option.type === 'MODEL_AND_RELATION'
                      ? option.value
                      : acc,
                  null,
                );
                setThisPageState((prevState) => ({
                  ...prevState,
                  modelId: foundModelId,
                  component,
                }));
                setModelId(foundModelId);
              }}
              value={thisPageState.component ? thisPageState.component.id : ''}
              placeholder="No components available."
              allowedComponents={['DataTable', 'DataList']}
            />
          </Field>
        </BoxComp>
      </Content>
      <Footer
        onClick={close}
        onSave={() => {
          const newPrefab = { ...originalPrefab };
          const filterComp = treeSearch('#filterComp', newPrefab.structure);
          setOption(filterComp, 'modelId', (option: any) => ({
            ...option,
            value: modelId,
          }));
          newPrefab.interactions.push({
            name: 'Advanced filter',
            sourceEvent: 'onSubmit',
            targetComponentId: thisPageState.component.id,
            ref: {
              sourceComponentId: '#filterComp',
            },
            type: 'Custom',
          } as PrefabInteraction);
          newPrefab.interactions.push({
            name: 'Clear advanced filter',
            sourceEvent: 'Click',
            targetComponentId: thisPageState.component.id,
            ref: {
              sourceComponentId: '#clearButton',
            },
            type: 'Custom',
          } as PrefabInteraction);
          save(newPrefab);
        }}
        onSkip={() => {
          const newPrefab = { ...originalPrefab };
          save(newPrefab);
        }}
      />
    </>
  );
};

export default prefab('Filter', attributes, beforeCreate, [
  Box(
    {
      options: {
        ...boxOptions,
        innerSpacing: sizes('Inner space', {
          ...boxOptions.innerSpacing('innerSpacing'),
          value: ['0rem', '0rem', 'M', '0rem'],
        }),
      },
    },
    [
      FilterComponent({ ref: { id: '#filterComp' } }, []),
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
                ...boxOptions.alignment('alignment'),
                value: 'space-between',
              },
            ),
            innerSpacing: sizes('Inner space', {
              ...boxOptions.innerSpacing('innerSpacing'),
              value: ['0rem', '0rem', '0rem', '0rem'],
            }),
          },
        },
        [
          Button(
            {
              ref: { id: '#addFilterButton' },
              style: { name: 'Outline' },
              options: {
                ...buttonOptions,
                buttonText: variable('Button text', {
                  ...buttonOptions.buttonText('buttonText'),
                  value: ['Add filter group'],
                }),
              },
            },
            [],
          ),
          Box(
            {
              options: {
                ...boxOptions,
                innerSpacing: sizes('Inner space', {
                  ...boxOptions.innerSpacing('innerSpacing'),
                  value: ['0rem', '0rem', '0rem', '0rem'],
                }),
              },
            },
            [
              Button(
                {
                  ref: { id: '#clearButton' },
                  style: { name: 'Outline' },

                  options: {
                    ...buttonOptions,
                    buttonText: variable('Button text', {
                      ...buttonOptions.buttonText('buttonText'),
                      value: ['Clear filter'],
                    }),
                    outerSpacing: sizes('Outer space', {
                      ...buttonOptions.outerSpacing('outerSpacing'),
                      value: ['0rem', 'M', '0rem', '0rem'],
                    }),
                  },
                },
                [],
              ),
              Button(
                {
                  ref: { id: '#applyButton' },
                  options: {
                    ...buttonOptions,
                    buttonText: variable('Button text', {
                      ...buttonOptions.buttonText('buttonText'),
                      value: ['Apply filter'],
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
]);
