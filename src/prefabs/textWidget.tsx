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

const beforeCreate = ({
  save,
  close,
  prefab: originalPrefab,
  components: {
    Header,
    Content,
    Footer,
    Field,
    ModelSelector,
    PropertySelector,
    Text: BeforeCreateText,
  },
  helpers: { useModelQuery },
}: BeforeCreateArgs) => {
  const [modelId, setModelId] = React.useState();
  const [model, setModel] = React.useState(null);
  const [validationMessage, setValidationMessage] = React.useState('');
  const [idProperty, setIdProperty] = React.useState(null);

  const modelRequest = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result) => {
      setModel(result.model);
      // setIdProperty(result.model.properties.find(({ name }) => name === 'id'));
    },
  });

  const validate = () => {
    if (modelRequest.loading) {
      setValidationMessage(
        'Model details are still loading, please try submitting again.',
      );
      return false;
    }

    return true;
  };

  return (
    <>
      <Header onClose={close} title="Configure your text widget" />
      <Content>
        <Field
          label="Select model"
          error={
            validationMessage && (
              <BeforeCreateText color="#e82600">
                {validationMessage}
              </BeforeCreateText>
            )
          }
        >
          <ModelSelector
            onChange={(id: any) => {
              setModelId(id);
            }}
            margin
          />
        </Field>
        <Field label="What question do you want to display?">
          <PropertySelector
            modelId={modelId}
            onChange={(value: any) => {
              setIdProperty(value);
            }}
            value={idProperty}
            disabled={!modelId}
          />
        </Field>
      </Content>
      <Footer
        onSave={() => {
          if (validate()) {
            const newPrefab = { ...originalPrefab };

            save(newPrefab);
          }
        }}
      />
    </>
  );
};

const interactions: PrefabInteraction[] = [];

const attributes = {
  category: 'LAYOUT',
  icon: Icon.UpdateFormIcon,
  interactions,
  variables: [],
};

export default prefab('Text Widget', attributes, beforeCreate, [
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
