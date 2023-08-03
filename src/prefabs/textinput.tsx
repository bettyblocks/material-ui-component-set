import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';
import { TextInput } from './structures/TextInput';

const beforeCreate = ({
  close,
  components: {
    Content,
    Field,
    Footer,
    Header,
    FormField,
    Toggle,
    PropertySelector,
    Label,
    TextInput: Text,
    CircleQuestion,
    BBTooltip,
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

  const unsupportedKinds = createBlacklist(['TEXT', 'URL', 'IBAN', 'STRING']);

  const [propertyPath, setProperty] = React.useState<any>('');
  const [variableInput, setVariableInput] = React.useState(null);
  const modelId = useModelIdSelector();
  const actionId = useActionIdSelector();
  const selectedPrefab = usePrefabSelector();
  const [model, setModel] = React.useState<any>(null);
  const [propertyBased, setPropertyBased] = React.useState(!!modelId);
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
  const nameOptionKey = 'actionVariableId';
  const labelOptionKey = 'label';

  return (
    <>
      <Header onClose={close} title="Configure form input field" />
      <Content>
        {modelId && (
          <Field label="Property based input">
            <FormField onClick={(): void => setPropertyBased(!propertyBased)}>
              <Toggle
                color="purple"
                checked={propertyBased}
                onChange={(): void => {}}
              />
            </FormField>
          </Field>
        )}
        {propertyBased ? (
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
        ) : (
          <Field>
            <Label>
              Action input variable
              <CircleQuestion
                color="grey500"
                size="medium"
                data-tip="You can use this action input variable in the action itself."
                data-for="variable-tooltip"
              />
            </Label>
            <BBTooltip
              id="variable-tooltip"
              place="top"
              type="dark"
              effect="solid"
            />
            <Text
              onChange={(e): void => setVariableInput(e.target.value)}
              color="orange"
            />
          </Field>
        )}
      </Content>
      <Footer
        onClose={close}
        canSave={(propertyPath && !!name) || variableInput}
        onSave={async (): Promise<void> => {
          // eslint-disable-next-line no-param-reassign

          structure.id = componentId;

          const kind = propertyKind || 'STRING';

          const variableName = variableInput || name;
          const result = await prepareInput(
            actionId,
            variableName,
            kind,
            propertyKind,
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
          if (propertyBased) {
            setOption(newPrefab.structure[0], 'property', (originalOption) => ({
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
            }));
            setOption(
              newPrefab.structure[0],
              'label',
              (originalOption: any) => ({
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
              }),
            );
          }
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
                    : (propertyId as any),
              }));
            }
          }
          save({ ...originalPrefab, structure: [newPrefab.structure[0]] });
        }}
      />
    </>
  );
};

const attributes = {
  category: 'FORM',
  icon: Icon.TextInputIcon,
  keywords: ['Form', 'input'],
};

export default prefab('Text Field', attributes, beforeCreate, [
  TextInput({
    label: 'Text field',
    inputLabel: 'Text field',
    type: 'text',
  }),
]);
