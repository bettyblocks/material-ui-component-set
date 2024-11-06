import * as React from 'react';
import {
  BeforeCreateArgs,
  Icon,
  PrefabComponentOption,
  prefab,
  toggle,
  variable,
} from '@betty-blocks/component-sdk';
import { Button, FileUpload, buttonOptions } from './structures';

const beforeCreate = ({
  close,
  components: {
    Content,
    Field,
    Footer,
    Header,
    PropertySelector,
    TextInput: Text,
  },
  prefab: originalPrefab,
  save,
  helpers,
}: BeforeCreateArgs) => {
  const {
    BettyPrefabs,
    prepareInput,
    useModelIdSelector,
    useActionIdSelector,
    usePrefabSelector,
    usePropertyQuery,
    setOption,
    createUuid,
    useModelQuery,
    createBlacklist,
    useModelRelationQuery,
  } = helpers;

  const [propertyPath, setProperty] = React.useState<any>('');
  const modelId = useModelIdSelector();
  const actionId = useActionIdSelector();
  const selectedPrefab = usePrefabSelector();
  const [model, setModel] = React.useState<any>(null);
  const [prefabSaved, setPrefabSaved] = React.useState(false);

  const [validationMessage, setValidationMessage] = React.useState('');

  const modelRequest = useModelQuery({
    variables: { id: modelId },
    onCompleted: (result) => {
      setModel(result.model);
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

  let name: string | undefined;
  let propertyKind;
  let propertyModelId;
  const componentId = createUuid();

  function isProperty(path: string) {
    return (
      typeof path !== 'string' &&
      typeof path === 'object' &&
      !Array.isArray(path)
    );
  }

  let propertyId: string;
  if (isProperty(propertyPath)) {
    const { id } = propertyPath;
    propertyId = Array.isArray(id) ? id[id.length - 1] : id;
  } else {
    propertyId = propertyPath;
  }

  const propertyResponse = usePropertyQuery(propertyId);

  if (!(propertyResponse.loading || propertyResponse.error)) {
    if (propertyResponse.data) {
      name = propertyResponse.data.property.label;
      propertyKind = propertyResponse.data.property.kind;
      propertyModelId = propertyResponse.data.property.referenceModel?.id;
    }
  }

  const modelRelationResponse = useModelRelationQuery(propertyModelId);

  let relationalProperties;
  let modelProperty;
  if (!(modelRelationResponse.loading || modelRelationResponse.error)) {
    if (modelRelationResponse.data) {
      relationalProperties = modelRelationResponse.data.model.properties;
      modelProperty = relationalProperties.find(
        (property) => property.name === 'id',
      );
    }
  }

  const unsupportedKinds = createBlacklist(['FILE']);

  const structure = originalPrefab.structure[0];
  if (structure.type !== 'COMPONENT')
    return <div>expected component prefab, found {structure.type}</div>;

  const handlePropertyChange = (propertyOrId): void => {
    setProperty(propertyOrId);
  };

  if (!actionId && !prefabSaved) {
    setPrefabSaved(true);
    save(originalPrefab);
  }

  const actionVariableOptionType = structure.options.find(
    (option: { type: string }) => option.type === 'ACTION_JS_VARIABLE',
  );

  const actionVariableOption = actionVariableOptionType?.key || null;
  const labelOptionKey = 'label';
  const nameOptionKey = 'actionVariableId';

  return (
    <>
      <Header onClose={close} title="Configure form input field" />
      <Content>
        <Field
          label="Property"
          error={
            validationMessage && (
              <Text color="#e82600">{validationMessage}</Text>
            )
          }
        >
          <PropertySelector
            allowRelations
            disabledNames={['created_at', 'updated_at']}
            disabledKinds={unsupportedKinds}
            showFormat={false}
            size="large"
            onChange={handlePropertyChange}
            value={propertyPath}
            modelId={modelId}
          />
        </Field>
      </Content>
      <Footer
        onClose={close}
        canSave={propertyPath && !!name}
        onSave={async (): Promise<void> => {
          // eslint-disable-next-line no-param-reassign
          structure.id = componentId;

          const kind = propertyKind || 'STRING';

          const variableName = name;
          const result = await prepareInput(
            actionId,
            variableName,
            kind,
            propertyKind,
            propertyResponse?.data?.property,
          );

          const newPrefab = { ...originalPrefab };
          if (newPrefab.structure[0].type !== 'COMPONENT') {
            throw new Error('expected Component');
          }
          setOption(newPrefab.structure[0], actionVariableOption, (option) => ({
            ...option,
            value: variableName,
            configuration: {
              condition: {
                type: 'SHOW',
                option: 'property',
                comparator: 'EQ',
                value: '',
              },
            },
          }));
          setOption(newPrefab.structure[0], labelOptionKey, (option) => ({
            ...option,
            value: [variableName],
          }));

          setOption(newPrefab.structure[0], nameOptionKey, (option) => ({
            ...option,
            value: result.variable.variableId,
          }));
          setOption(
            newPrefab.structure[0],
            'property',
            (originalOption: PrefabComponentOption) => ({
              ...originalOption,
              value: {
                id:
                  result.isRelational && !result.isMultiRelational
                    ? [propertyId, modelProperty.id]
                    : propertyId,
                type: 'PROPERTY',
                name:
                  result.isRelational && !result.isMultiRelational
                    ? `{{ ${model?.name}.${name}.id }}`
                    : `{{ ${model?.name}.${name} }}`,
              },
            }),
          );
          setOption(newPrefab.structure[0], 'label', (originalOption: any) => ({
            ...originalOption,
            value: [
              {
                id:
                  result.isRelational && !result.isMultiRelational
                    ? [propertyId, modelProperty.id]
                    : propertyId,
                type: 'PROPERTY_LABEL',
                name:
                  result.isRelational && !result.isMultiRelational
                    ? `{{ ${model?.name}.${name}.id }}`
                    : `{{ ${model?.name}.${name} }}`,
              },
            ],
          }));
          if (validate()) {
            if (
              (selectedPrefab?.name === BettyPrefabs.UPDATE_FORM ||
                selectedPrefab?.name === BettyPrefabs.CREATE_FORM ||
                selectedPrefab?.name === BettyPrefabs.FORM ||
                selectedPrefab?.name === BettyPrefabs.LOGIN_FORM) &&
              propertyId
            ) {
              const valueOptions = [
                {
                  id:
                    result.isRelational && !result.isMultiRelational
                      ? [propertyId, modelProperty.id]
                      : propertyId,
                  type: 'PROPERTY',
                  name:
                    result.isRelational && !result.isMultiRelational
                      ? `{{ ${model?.name}.${name}.id }}`
                      : `{{ ${model?.name}.${name} }}`,
                },
              ];

              setOption(newPrefab.structure[0], 'value', (option) => ({
                ...option,
                value:
                  option.type === 'VARIABLE'
                    ? valueOptions
                    : ({
                        id: propertyId,
                        type: 'PROPERTY',
                        useKey: 'url',
                      } as any),
              }));
            }
          }
          save({ ...originalPrefab, structure: [newPrefab.structure[0]] });
        }}
      />
    </>
  );
};

const attr = {
  icon: Icon.FileInputIcon,
  category: 'FORM',
  keywords: ['Form', 'input', 'file', 'upload', 'fileupload'],
};

export default prefab('File Upload', attr, beforeCreate, [
  FileUpload({ label: 'File Upload' }, [
    Button({
      label: 'upload',
      options: {
        ...buttonOptions,
        buttonText: variable('Button text', { value: ['Upload'] }),
        fullWidth: toggle('Full width', { value: true }),
      },
    }),
  ]),
]);
