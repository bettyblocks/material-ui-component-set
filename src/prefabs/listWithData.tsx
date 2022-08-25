import * as React from 'react';
import {
  Icon,
  BeforeCreateArgs,
  prefab as makePrefab,
  option,
  toggle,
  PrefabComponent,
} from '@betty-blocks/component-sdk';
import { DataList, List, ListItem, dataListOptions } from './structures';

const beforeCreate = ({
  components: {
    Content,
    Header,
    Field,
    Footer,
    ModelRelationSelector,
    PropertySelector,
  },
  prefab,
  save,
  close,
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState('');
  const [property, setProperty] = React.useState('');

  // TODO: find out why structure: PrefabReference[] isn't allowed..
  const reduceStructure = (refValue: string, structure: any) =>
    structure.reduce((acc: string, component: PrefabComponent) => {
      if (acc) return acc;
      if (
        component.ref &&
        Object.values(component.ref).indexOf(refValue) > -1
      ) {
        return component;
      }
      return reduceStructure(refValue, component.descendants);
    }, null);

  return (
    <>
      <Header title="Configure a list with data" onClose={close} />
      <Content>
        <Field label="Model">
          <ModelRelationSelector
            onChange={(value: string) => {
              setModelId(value);
            }}
            value={modelId}
          />
        </Field>
        <Field label="Property">
          <PropertySelector
            onChange={(value: string) => {
              setProperty(value);
            }}
            modelId={modelId}
            value={property}
          />
        </Field>
      </Content>
      <Footer
        onSave={() => {
          const newPrefab = { ...prefab };
          const dataList = reduceStructure('#dataList', newPrefab.structure);
          dataList.options[0] = {
            value: modelId,
            label: 'Model',
            key: 'model',
            type: 'MODEL',
          };

          const listItem = reduceStructure('#listItem', newPrefab.structure);
          listItem.options[0] = {
            type: 'VARIABLE',
            label: 'Primary text',
            key: 'primaryText',
            value: [property],
          };
          save(newPrefab);
        }}
        onClose={close}
      />
    </>
  );
};

const attrs = {
  icon: Icon.ListWithDataIcon,
  category: 'DATA',
  keywords: ['Data', 'list', 'listwithdata', 'collection'],
};

export default makePrefab('List with data', attrs, beforeCreate, [
  List({}, [
    DataList(
      {
        ref: { id: '#dataList' },
        options: {
          ...dataListOptions,
          type: option('CUSTOM', {
            label: 'Type',
            value: 'inline',
            configuration: {
              as: 'BUTTONGROUP',
              dataType: 'string',
              allowedInput: [
                {
                  name: 'List',
                  value: 'list',
                },
                {
                  name: 'Grid',
                  value: 'grid',
                },
                {
                  name: 'Inline',
                  value: 'inline',
                },
              ],
            },
          }),
          hideSearch: toggle('Hide built-in search field', {
            value: '',
            configuration: {
              dependsOn: 'model',
            },
          }),
        },
      },
      [ListItem({ ref: { id: '#listItem' } }, [])],
    ),
  ]),
]);
