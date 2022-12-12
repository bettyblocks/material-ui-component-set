import * as React from 'react';
import {
  Icon,
  prefab as makePrefab,
  BeforeCreateArgs,
  size,
  color,
  ThemeColor,
  property as propertyFunc,
  toggle,
  variable,
  font,
  option,
} from '@betty-blocks/component-sdk';
import {
  DataTable,
  DataTableColumn,
  dataTableColumnOptions,
  boxOptions,
  Box,
} from './structures';

const attrs = {
  icon: Icon.DataTable,
  category: 'DATA',
  keywords: ['Data', 'table', 'datatable', 'collection'],
};

const beforeCreate = ({
  components: {
    Content,
    Header,
    Field,
    Footer,
    ModelRelationSelector,
    PropertiesSelector,
  },
  helpers: { cloneStructure, setOption },
  prefab,
  save,
  close,
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState('');
  const [properties, setProperties] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <>
      <Header title="Configure data table" onClose={close} />
      <Content>
        <Field label="Model">
          <ModelRelationSelector
            onChange={(value: string) => {
              setModelId(value);
            }}
            value={modelId}
          />
        </Field>
        <Field label="Columns">
          <PropertiesSelector
            modelId={modelId}
            value={properties}
            onChange={(value: []) => {
              setProperties(value);
            }}
          />
        </Field>
      </Content>
      <Footer
        onSave={() => {
          const newPrefab = { ...prefab };
          const structure = newPrefab.structure[0];
          if (structure.type !== 'COMPONENT') {
            setErrorMessage(
              `expected component prefab, found ${structure.type}`,
            );
            throw new Error(errorMessage);
          }
          structure.options[2] = {
            value: modelId,
            label: 'Model',
            key: 'model',
            type: 'MODEL_AND_RELATION',
          };
          properties.forEach(
            (property: {
              defaultValue: null;
              id: string[];
              kind: string;
              label: string;
              type: string;
              format: string;
            }) => {
              let newProperty = property;
              const inheritFormatKinds = [
                'DATE',
                'DATE_EXPRESSION',
                'DATE_TIME',
                'DATE_TIME_EXPRESSION',
                'DECIMAL',
                'DECIMAL_EXPRESSION',
                'INTEGER',
                'INTEGER_EXPRESSION',
                'PRICE',
                'PRICE_EXPRESSION',
                'TIME',
              ];
              if (inheritFormatKinds.includes(property.kind)) {
                newProperty = {
                  ...property,
                  format: 'INHERIT',
                };
              }

              const dataTableColumnStructure =
                cloneStructure('Datatable Column');
              if (dataTableColumnStructure.type !== 'COMPONENT') {
                setErrorMessage(
                  `expected component prefab, found ${dataTableColumnStructure.type}`,
                );
                throw new Error(errorMessage);
              }

              setOption(
                dataTableColumnStructure,
                'property',
                (originalOption) => {
                  return {
                    ...originalOption,
                    value: newProperty,
                  };
                },
              );
              structure.descendants.push(dataTableColumnStructure);
            },
          );
          save(newPrefab);
        }}
        onClose={close}
      />
    </>
  );
};

// const reconfigure = {
//   type: 'WRAPPER',
//   children: [
//     DataTableColumn({
//       options: {
//         ...dataTableColumnOptions,
//         width: size('Width', {
//           value: '',
//           ref: {
//             id: '#columnWidth',
//           },
//         }),
//       },
//       ref: { id: '#dataTableColumnId' },
//     }),
//   ],
//   options: [
//     {
//       width: linked({
//         label: 'column width',
//         value: {
//           ref: {
//             componentId: '#dataTableColumnId',
//             optionId: '#columnWidth',
//           },
//         },
//       }),
//     },
//   ],
//   wizardType: 'PropertySelector',
// };

const reconfigure = {
  type: 'WRAPPER',
  children: [
    DataTableColumn(
      {
        options: {
          ...dataTableColumnOptions,
          visible: toggle('Initial visibility', {
            value: true,
            showInReconfigure: true,
            showInAddChild: false,
          }),
          sortable: toggle('Sortable', {
            value: false,
            showInReconfigure: true,
          }),
          headerText: variable('Header text', {
            value: ['Header text sample'],
            showInReconfigure: true,
          }),
          type: font('Header type', {
            value: 'Body2',
            showInReconfigure: true,
          }),
          content: variable('Content', {
            value: ['blah'],
            showInReconfigure: true,
            configuration: {
              as: 'MULTILINE',
            },
          }),
          bodyType: font('Body type', {
            value: 'Body1',
            showInReconfigure: true,
          }),
          horizontalAlignment: option('CUSTOM', {
            label: 'Column Alignment',
            value: 'left',
            showInReconfigure: true,
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
          borderColor: color('BorderColor', {
            value: ThemeColor.DARK,
            showInReconfigure: true,
            showInAddChild: true,
          }),
          width: size('Width', {
            value: 'S',
            showInReconfigure: true,
            showInAddChild: true,
          }),
          property: propertyFunc('Property', {
            value: '',
            showInReconfigure: true,
            showInAddChild: false,
          }),
          background: color('Background', {
            value: ThemeColor.MEDIUM,
            showInReconfigure: true,
          }),
        },
      },
      [
        Box({
          options: {
            ...boxOptions,
            width: size('Width my first box', {
              value: 'L',
              showInReconfigure: false,
              showInAddChild: true,
            }),
          },
        }),
        Box({
          options: {
            ...boxOptions,
            width: size('Width my other box', {
              value: 'M',
              showInReconfigure: false,
              showInAddChild: true,
            }),
          },
        }),
      ],
    ),
  ],
  wizardType: 'ChildrenSelector',
};

// const reconfigure = {
//   children: [
//     {
//       structure: DataTableColumn({}, [Box({})]),
//       options: ['width', 'property', 'nestedChildNameOption'],
//       optionsEdit: ['width', 'property', 'name'],
//     },
//   ],
//   wizardType: 'PropertySelector',
// };

export default makePrefab(
  'Datatable',
  attrs,
  beforeCreate,
  [DataTable({})],
  reconfigure,
);
