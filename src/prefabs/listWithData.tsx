import * as React from 'react';
import {
  Icon,
  BeforeCreateArgs,
  prefab as makePrefab,
  option,
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
  helpers: { useModelQuery },
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState('');
  const [primaryProperty, setPrimaryProperty] = React.useState('');

  const { data } = useModelQuery({
    variables: { id: modelId },
  });

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
              setPrimaryProperty(value);
            }}
            modelId={modelId}
            value={primaryProperty}
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
            value: [enrichVarObj(primaryProperty)],
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
            ...dataListOptions.type('type'),
            value: 'inline',
          }),
        },
      },
      [ListItem({ ref: { id: '#listItem' } }, [])],
    ),
  ]),
]);
