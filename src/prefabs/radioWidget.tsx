import * as React from 'react';
import {
  Icon,
  PrefabInteraction,
  wrapper,
  ThemeColor,
  color,
  size,
  font,
  variable,
  sizes,
  option,
  linked,
  BeforeCreateArgs,
  prefab as makePrefab,
  PrefabComponent,
  PrefabComponentOption,
  component as makeComponent,
} from '@betty-blocks/component-sdk';
import {
  Box,
  boxOptions,
  RadioInput,
  radioInputOptions,
  Text as TextPrefab,
  textOptions,
} from './structures';
import { IdPropertyProps, ModelQuery } from './types';
import { options as formOptions } from './structures/ActionJSForm/options';

const beforeCreate = ({
  components: { Content, Header, Field, Footer, PropertySelector, Text },
  prefab,
  save,
  close,
  helpers: {
    useModelQuery,
    useModelIdSelector,
    createBlacklist,
    createUuid,
    prepareAction,
    getPageName,
    setOption,
  },
}: BeforeCreateArgs) => {
  const [primaryProperty, setPrimaryProperty] = React.useState('');
  const [idProperty, setIdProperty] = React.useState<IdPropertyProps>();
  const [validationMessage, setValidationMessage] = React.useState('');

  const modelId = useModelIdSelector();
  const componentId = createUuid();
  const pageName = getPageName();
  const unsupportedKinds = createBlacklist(['LIST']);

  const { data } = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result: ModelQuery) => {
      setIdProperty(result.model.properties.find(({ name }) => name === 'id'));
    },
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

  const transformProperty = (obj: any) => {
    const outputProp = { ...obj };
    if (!obj) {
      setValidationMessage('No property is selected.');
    }
    if (data && data.model) {
      const property = data.model.properties.find(
        (prop: any) => prop.id === obj.id[0],
      );
      if (property) {
        outputProp.label = property.label;
        outputProp.kind = property.kind;
      }
    }
    return outputProp;
  };

  const treeSearch = (refValue: string, structure: any) =>
    structure.reduce((acc: string, component: PrefabComponent) => {
      if (acc) return acc;
      if (
        component.ref &&
        Object.values(component.ref).indexOf(refValue) > -1
      ) {
        return component;
      }
      return treeSearch(refValue, component.descendants);
    }, null);
  return (
    <>
      <Header title="Configure your text widget" onClose={close} />
      <Content>
        <Field label="Property">
          <PropertySelector
            onChange={(value: string) => {
              setPrimaryProperty(value);
            }}
            modelId={modelId}
            size="large"
            value={primaryProperty}
            disabledKinds={unsupportedKinds}
            error={
              validationMessage && (
                <Text color="#e82600">{validationMessage}</Text>
              )
            }
          />
        </Field>
      </Content>
      <Footer
        onSave={async (): Promise<void> => {
          const newPrefab = { ...prefab };

          const text = treeSearch(
            '#questionTitleComponent',
            newPrefab.structure,
          );
          const textInput = treeSearch('#radioOption', newPrefab.structure);
          const textWidgetForm = treeSearch(
            '#TextWidgetForm',
            newPrefab.structure,
          );
          const propertyObj = transformProperty(primaryProperty);
          setOption(text, 'content', (opt: PrefabComponentOption) => ({
            ...opt,
            value: [propertyObj.label],
          }));
          setOption(textInput, 'placeholder', (opt: PrefabComponentOption) => ({
            ...opt,
            value: [],
          }));

          if (!idProperty) {
            throw new Error('We could not find an idProperty.');
          }
          textWidgetForm.id = componentId;
          const result = await prepareAction(
            componentId,
            idProperty,
            [transformProperty(primaryProperty)],
            'create',
            undefined,
            `${pageName} - create ${propertyObj.label}`,
            'public',
          );

          setOption(
            textWidgetForm,
            'actionId',
            (opts: PrefabComponentOption) => ({
              ...opts,
              value: result.action.actionId,
              configuration: { disabled: true },
            }),
          );
          if (!modelId) {
            // eslint-disable-next-line no-console
            console.error('unable to set model option, no model selected');
            return;
          }
          setOption(textWidgetForm, 'model', (opts: PrefabComponentOption) => ({
            ...opts,
            value: modelId,
            configuration: {
              disabled: true,
            },
          }));
          setOption(
            textInput,
            'actionProperty',
            (opt: PrefabComponentOption) => ({
              ...opt,
              value: {
                modelProperty: enrichVarObj(primaryProperty),
              },
            }),
          );
          setOption(
            textInput,
            'actionVariableId',
            (opt: PrefabComponentOption) => ({
              ...opt,
              value: '',
              configuration: {
                condition: {
                  type: 'HIDE',
                  option: 'actionVariableId',
                  comparator: 'EQ',
                  value: '',
                },
              },
            }),
          );
          setValidationMessage('');
          save(newPrefab);
        }}
        onClose={close}
      />
    </>
  );
};

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'LAYOUT',
  icon: Icon.RadioButtonIcon,
  interactions,
  variables: [],
};

export default makePrefab('Radio Widget', attributes, beforeCreate, [
  wrapper(
    {
      label: 'Radio widget',
      optionCategories: [
        {
          label: 'Question',
          expanded: true,
          members: ['questionTitle'],
          condition: {
            type: 'SHOW',
            option: 'visibility',
            comparator: 'EQ',
            value: false,
          },
        },
      ],
      options: {
        questionTitle: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#questionTitleComponent',
              optionId: '#questionTitleContent',
            },
          },
        }),
      },
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
            innerSpacing: sizes('Inner space', {
              value: ['L', 'L', 'L', 'L'],
            }),
          },
        },
        [
          makeComponent(
            'Form',
            { ref: { id: '#TextWidgetForm' }, options: { ...formOptions } },
            [
              TextPrefab({
                ref: {
                  id: '#questionTitleComponent',
                },
                options: {
                  ...textOptions,
                  content: variable('Content', {
                    value: [''],
                    configuration: {
                      as: 'MULTILINE',
                    },
                    ref: {
                      id: '#questionTitleContent',
                    },
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
              }),
              RadioInput({
                ref: { id: '#radioOption' },
                options: {
                  ...radioInputOptions,
                  label: variable('Label', { value: [''] }),
                },
              }),
            ],
          ),
        ],
      ),
    ],
  ),
]);
