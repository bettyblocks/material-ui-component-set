import * as React from 'react';
import {
  Icon,
  PrefabInteraction,
  BeforeCreateArgs,
  wrapper,
  sizes,
  ThemeColor,
  color,
  size,
  variable,
  option,
  buttongroup,
  font,
  hideIf,
  modelAndRelation,
  showIf,
  PrefabComponentOption,
  PrefabComponent,
  linked,
  component as makeComponent,
  prefab,
  property,
} from '@betty-blocks/component-sdk';
import {
  Box,
  boxOptions,
  Text as TextComp,
  textOptions,
  RadioInput,
  radioInputOptions,
} from './structures';
import { options as formOptions } from './structures/ActionJSForm/options';
import { IdPropertyProps, ModelQuery } from './types';

const interactions: PrefabInteraction[] = [];

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
  const unsupportedKinds = createBlacklist(['BOOLEAN']);

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

          const text = treeSearch('#questionText', newPrefab.structure);
          const radioInput = treeSearch('#RadioInput', newPrefab.structure);
          const yesNoWidgetForm = treeSearch(
            '#YesNoWidgetForm',
            newPrefab.structure,
          );
          const propertyObj = transformProperty(primaryProperty);
          setOption(text, 'content', (opt: PrefabComponentOption) => ({
            ...opt,
            value: [propertyObj.label],
          }));
          setOption(
            radioInput,
            'placeholder',
            (opt: PrefabComponentOption) => ({
              ...opt,
              value: [],
            }),
          );

          if (!idProperty) {
            throw new Error('We could not find an idProperty.');
          }
          yesNoWidgetForm.id = componentId;
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
            yesNoWidgetForm,
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
          setOption(
            yesNoWidgetForm,
            'model',
            (opts: PrefabComponentOption) => ({
              ...opts,
              value: modelId,
              configuration: {
                disabled: true,
              },
            }),
          );
          setOption(
            radioInput,
            'actionProperty',
            (opt: PrefabComponentOption) => ({
              ...opt,
              value: {
                modelProperty: enrichVarObj(primaryProperty),
              },
            }),
          );
          setOption(
            radioInput,
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

          // const interaction = {
          //   name: 'Submit',
          //   sourceEvent: 'onblur',
          //   parameters: [],
          //   ref: {
          //     targetComponentId: '#YesNoWidgetForm',
          //     sourceComponentId: '#RadioInput',
          //   },
          //   type: 'Global' as InteractionType,
          // };

          // newPrefab.interactions?.push(interaction);
          setValidationMessage('');
          save(newPrefab);
        }}
        onClose={close}
      />
    </>
  );
};

const attributes = {
  category: 'LAYOUT',
  icon: Icon.UpdateFormIcon,
  interactions,
  variables: [],
};

export default prefab('Yes/No Widget', attributes, beforeCreate, [
  wrapper(
    {
      label: 'Yes/No widget',
      options: {
        question: linked({
          label: 'Question',
          value: {
            ref: {
              componentId: '#questionText',
              optionId: '#textContent',
            },
          },
        }),
        placeholder: linked({
          label: 'Placeholder',
          value: {
            ref: {
              componentId: '#RadioInput',
              optionId: '#radioInputPlaceholder',
            },
          },
        }),
        required: linked({
          label: 'Required to answer',
          value: {
            ref: {
              componentId: '#RadioInput',
              optionId: '#radioInputRequired',
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
          },
        },
        [
          makeComponent(
            'Form',
            { ref: { id: '#YesNoWidgetForm' }, options: { ...formOptions } },
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
              RadioInput(
                {
                  label: 'Radio Input',
                  ref: { id: '#RadioInput' },
                  options: {
                    ...radioInputOptions,
                    label: variable('Label', { value: [''] }),
                    actionProperty: option('ACTION_JS_PROPERTY', {
                      label: 'Property',
                      value: '',
                      configuration: {
                        condition: hideIf('actionProperty', 'EQ', ''),
                      },
                    }),
                    model: modelAndRelation('Model', {
                      value: '',
                      configuration: {
                        condition: showIf('optionType', 'EQ', 'variable'),
                      },
                    }),
                    labelProperty: property('Label for options', {
                      value: '',
                      configuration: {
                        condition: hideIf('optionType', 'EQ', 'property'),
                      },
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
    ],
  ),
]);
