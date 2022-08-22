import * as React from 'react';
import {
  Icon,
  prefab as makePrefab,
  BeforeCreateArgs,
  PrefabComponent,
  ValueDefault,
  PrefabInteraction,
  ValueConfig,
} from '@betty-blocks/component-sdk';
import { DataContainer } from './structures';

const beforeCreate = ({
  prefab,
  save,
  close,
  components: {
    ButtonGroup,
    ButtonGroupButton,
    ComponentSelector,
    AuthenticationProfileSelector,
    Content,
    Field,
    Footer,
    Header,
    ModelSelector,
    Text,
  },
  helpers: {
    useCurrentPageId,
    useCurrentPartialId,
    camelToSnakeCase,
    useModelQuery,
  },
}: BeforeCreateArgs) => {
  type PageState = {
    modelId: string | number | boolean | string[] | ValueConfig;
    component: PrefabComponent;
  };
  const [anotherPageState, setAnotherPageState] = React.useState({
    modelId: '',
  });

  const [modelId, setModelId] = React.useState<
    string | number | boolean | string[] | ValueConfig
  >();

  const [loggedInUserState, setLoggedInUserState] = React.useState({
    authenticationProfile: '', // changed from type null to ''
  });

  const [thisPageState, setThisPageState] = React.useState<PageState>({
    modelId: '',
    component: {
      name: '',
      options: [],
      descendants: [],
    },
  });

  const [validationMessage, setValidationMessage] = React.useState('');

  const [buttonGroupValue, setButtonGroupValue] = React.useState('anotherPage');
  const pageId = useCurrentPageId();
  const partialId = useCurrentPartialId();
  const { data, loading } = useModelQuery({
    variables: { id: modelId },
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    setValidationMessage('');
  }, [buttonGroupValue]);

  const validate = () => {
    if (loading) {
      setValidationMessage(
        'Model details are still loading, please try submitting again.',
      );
      return false;
    }

    switch (buttonGroupValue) {
      case 'anotherPage':
        if (!data || !data.model) {
          setValidationMessage('Model is required.');
          return false;
        }
        if (!anotherPageState.modelId) {
          setValidationMessage('Model id is required.');
          return false;
        }
        break;
      case 'thisPage':
        if (!thisPageState.component) {
          setValidationMessage('Component is required.');
          return false;
        }
        if (!data || !data.model) {
          setValidationMessage('Model is required.');
          return false;
        }
        if (!thisPageState.modelId) {
          setValidationMessage('The selected component does not have a model.');
          return false;
        }
        break;
      case 'loggedInUser':
        if (!loggedInUserState.authenticationProfile) {
          setValidationMessage('Authentication Profile is required.');
          return false;
        }
        break;

      default:
        break;
    }
    return true;
  };

  const saveAnotherPage = () => {
    if (validate()) {
      const newPrefab = { ...prefab };
      const structure = newPrefab.structure[0];
      if (structure.type !== 'COMPONENT') {
        setErrorMessage(`expected component prefab, found ${structure.type}`);
        throw new Error(errorMessage);
      }

      const modelOption = structure.options.find(
        (o) => o.key === 'model',
      ) as ValueDefault;
      const filterOption = structure.options.find(
        (o) => o.key === 'filter',
      ) as ValueDefault;
      const idProperty = data?.model.properties.find(
        (property: any) => property.name === 'id', // property comes from a source. This is not typed anywhere. what type is this property?
      );
      const variableName = `${camelToSnakeCase(data?.model.label)}_id`;
      const context = pageId ? { pageId } : { partialId };

      newPrefab.variables = [];
      newPrefab.variables.push({
        ...context,
        kind: 'integer',
        name: variableName,
        ref: {
          id: '#idVariable',
        },
      });

      modelOption.value = anotherPageState.modelId;

      filterOption.value = {
        [idProperty.id]: {
          eq: {
            ref: { id: '#idVariable' },
            name: variableName,
            type: 'VARIABLE',
          },
        },
      };
      save(newPrefab);
    }
  };

  const saveThisPage = () => {
    if (validate()) {
      const newPrefab = { ...prefab };
      const structure = newPrefab.structure[0];
      if (structure.type !== 'COMPONENT') {
        setErrorMessage(`expected component prefab, found ${structure.type}`);
        throw new Error(errorMessage);
      }
      const modelOption = structure.options.find(
        (o) => o.key === 'model',
      ) as ValueDefault;
      const idProperty = data?.model.properties.find(
        (property: any) => property.name === 'id',
      );
      modelOption.value = thisPageState.modelId;
      newPrefab.interactions = [];
      newPrefab.interactions = [
        {
          name: 'setCurrentRecord',
          sourceEvent:
            thisPageState.component.name === 'DataTable'
              ? 'OnRowClick'
              : 'OnItemClick',
          targetOptionName: 'currentRecord',
          parameters: [
            {
              parameter: 'argument',
              id: [idProperty.id],
            },
          ],
          sourceComponentId: thisPageState.component.id,
          ref: {
            targetComponentId: '#dataContainer',
          },
          type: 'Global',
        } as PrefabInteraction,
      ];
      save(newPrefab);
    }
  };

  const saveLoggedInUser = () => {
    if (validate()) {
      const newPrefab = { ...prefab };
      const structure = newPrefab.structure[0];
      if (structure.type !== 'COMPONENT') {
        setErrorMessage(`expected component prefab, found ${structure.type}`);
        throw new Error(errorMessage);
      }
      const authProfileOption = structure.options.find(
        (o) => o.key === 'authProfile',
      ) as ValueDefault;

      authProfileOption.value = loggedInUserState.authenticationProfile;

      save(newPrefab);
    }
  };

  return (
    <>
      <Header onClose={close} title="Configure data container" />
      <Content>
        <Field
          label="Where is the data coming from?"
          info={
            <Text size="small" color="grey700">
              {buttonGroupValue === 'anotherPage' &&
                'Link from another page to this page, and pass the ID property of the model.'}
              {buttonGroupValue === 'thisPage' &&
                'A component on this page is passing the data to this DataContainer.'}
              {buttonGroupValue === 'loggedInUser' &&
                'Data from the logged in user can be used inside this DataContainer.'}
            </Text>
          }
        >
          <ButtonGroup
            onChange={({
              target: { value },
            }: {
              target: { value: string };
            }) => {
              setButtonGroupValue(value);
            }}
            value={buttonGroupValue}
            size="large"
          >
            <ButtonGroupButton
              label="Another page"
              value="anotherPage"
              name="dataSourceSelect"
            />
            <ButtonGroupButton
              label="This page"
              value="thisPage"
              name="dataSourceSelect"
            />
            <ButtonGroupButton
              label="Logged in user"
              value="loggedInUser"
              name="dataSourceSelect"
            />
          </ButtonGroup>
        </Field>
        {buttonGroupValue === 'anotherPage' && (
          <Field
            label="Model"
            error={
              validationMessage && (
                <Text color="#e82600">{validationMessage}</Text>
              )
            }
            info={
              <Text size="small" color="grey700">
                Select the model where you want to show the data from.
              </Text>
            }
          >
            <ModelSelector
              onChange={(id: string) => {
                setAnotherPageState((prevState) => ({
                  ...prevState,
                  modelId: id,
                }));
                setModelId(id);
              }}
              margin
              value={anotherPageState.modelId}
            />
          </Field>
        )}
        {buttonGroupValue === 'thisPage' && (
          <Field
            label="Component"
            error={
              validationMessage && (
                <Text color="#e82600">{validationMessage}</Text>
              )
            }
            info={
              <Text size="small" color="grey700">
                Select a component that contains a collection of data, for
                example DataList or DataTable.
              </Text>
            }
          >
            <ComponentSelector
              onChange={(component: PrefabComponent) => {
                const foundModelId = Object.values(component.options).find(
                  (option) =>
                    option.type === 'MODEL' ||
                    option.type === 'MODEL_AND_RELATION',
                );

                if (foundModelId && 'value' in foundModelId) {
                  setModelId(foundModelId.value);
                  setThisPageState(
                    (prevState): PageState => ({
                      ...prevState,
                      modelId: foundModelId.value,
                      component,
                    }),
                  );
                }
              }}
              value={thisPageState.component ? thisPageState.component.id : ''} // thisPageState.component.id
              placeholder="No components available."
              allowedComponents={['DataTable', 'DataList']}
            />
          </Field>
        )}
        {buttonGroupValue === 'loggedInUser' && (
          <Field
            label="Authentication Profile"
            error={
              validationMessage && (
                <Text color="#e82600">{validationMessage}</Text>
              )
            }
            info={
              <Text size="small" color="grey700">
                Select the Authentication Profile of which you want to show the
                data of.
              </Text>
            }
          >
            <AuthenticationProfileSelector
              onChange={(authProfileObject: string) => {
                setLoggedInUserState((prevState) => ({
                  ...prevState,
                  authenticationProfile: authProfileObject,
                }));
              }}
              value={
                loggedInUserState.authenticationProfile
                  ? loggedInUserState.authenticationProfile // loggedInUserState.authenticationProfile.id
                  : ''
              }
              allowCustomAuthProfile
            />
          </Field>
        )}
      </Content>
      <Footer
        onClose={close}
        onSkip={() => {
          const newPrefab = { ...prefab };
          save(newPrefab);
        }}
        onSave={() => {
          setValidationMessage('');
          switch (buttonGroupValue) {
            case 'anotherPage':
              saveAnotherPage();
              break;
            case 'thisPage':
              saveThisPage();
              break;
            case 'loggedInUser':
              saveLoggedInUser();
              break;
            default:
              break;
          }
        }}
      />
    </>
  );
};

const attrs = {
  icon: Icon.DataContainer,
  category: 'DATA',
  keywords: ['Data', 'container', 'datacontainer', 'object', 'record'],
};

export default makePrefab('Data container', attrs, beforeCreate, [
  DataContainer({
    ref: {
      id: '#dataContainer',
    },
  }),
]);
