(() => ({
  name: 'DataContainer',
  icon: 'DataContainer',
  category: 'DATA',
  beforeCreate: ({
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
    helpers: { useCurrentPageId, camelToSnakeCase, useModelQuery },
  }) => {
    const [anotherPageState, setAnotherPageState] = React.useState({
      modelId: '',
    });

    const [modelId, setModelId] = React.useState(null);

    const [loggedInUserState, setLoggedInUserState] = React.useState({
      authenticationProfile: null,
    });

    const [thisPageState, setThisPageState] = React.useState({
      modelId: null,
      component: null,
    });

    const [validationMessage, setValidationMessage] = React.useState('');

    const [buttonGroupValue, setButtonGroupValue] = React.useState(
      'anotherPage',
    );
    const pageUuid = useCurrentPageId();
    const { data, loading } = useModelQuery({
      variables: { id: modelId },
    });

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
      if (!data.model) {
        setValidationMessage('Model is required.');
        return false;
      }
      switch (buttonGroupValue) {
        case 'anotherPage':
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
          if (!thisPageState.modelId) {
            setValidationMessage(
              'The selected component does not have a model.',
            );
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
      return validationMessage === '';
    };

    const saveAnotherPage = () => {
      if (validate()) {
        const newPrefab = { ...prefab };
        const idProperty = data.model.properties.find(
          property => property.name === 'id',
        );
        const variableName = `${camelToSnakeCase(data.model.label)}_id`;
        newPrefab.variables.push({
          kind: 'integer',
          name: variableName,
          pageId: pageUuid,
          ref: {
            id: '#idVariable',
          },
        });

        newPrefab.structure[0].options[0].value = anotherPageState.modelId;

        newPrefab.structure[0].options[2].value = {
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
        const idProperty = data.model.properties.find(
          property => property.name === 'id',
        );
        newPrefab.structure[0].options[0].value = thisPageState.modelId;
        newPrefab.interactions.push({
          name: 'setCurrentRecord',
          sourceEvent:
            thisPageState.component.name === 'DataTable'
              ? 'OnRowClick'
              : 'OnItemClick',
          targetOptionName: 'currentRecord',
          parameters: [
            {
              id: [idProperty.id],
              parameter: 'argument',
            },
          ],
          sourceComponentId: thisPageState.component.id,
          ref: {
            targetComponentId: '#dataContainer',
          },
          type: 'Global',
        });
        save(newPrefab);
      }
    };

    const saveLoggedInUser = () => {
      if (validate()) {
        const newPrefab = { ...prefab };

        newPrefab.structure[0].options[0].value =
          loggedInUserState.authenticationProfile.loginModel;

        newPrefab.structure[0].options[3].value =
          loggedInUserState.authenticationProfile.id;

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
              onChange={({ target: { value } }) => {
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
                onChange={id => {
                  setAnotherPageState(prevState => ({
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
                  Select a component that contains a collection of data.
                </Text>
              }
            >
              <ComponentSelector
                onChange={component => {
                  const foundModelId = Object.values(component.options).reduce(
                    (acc, option) =>
                      option.type === 'MODEL' ? option.value : acc,
                    null,
                  );
                  setThisPageState(prevState => ({
                    ...prevState,
                    modelId: foundModelId,
                    component,
                  }));
                  setModelId(foundModelId);
                }}
                value={
                  thisPageState.component ? thisPageState.component.id : ''
                }
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
                  Select the Authentication Profile of which you want to show
                  the data of.
                </Text>
              }
            >
              <AuthenticationProfileSelector
                onChange={(id, authProfileObject) => {
                  setLoggedInUserState(prevState => ({
                    ...prevState,
                    authenticationProfile: authProfileObject,
                  }));
                }}
                value={
                  loggedInUserState.authenticationProfile
                    ? loggedInUserState.authenticationProfile.id
                    : ''
                }
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
  },
  interactions: [],
  variables: [],
  structure: [
    {
      name: 'DataContainer',
      ref: {
        id: '#dataContainer',
      },
      options: [
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
        },
        {
          value: '',
          label: 'Current Record',
          key: 'currentRecord',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'currentRecord',
              comparator: 'EQ',
              value: 'never',
            },
          },
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Authentication Profile',
          key: 'authProfile',
          type: 'AUTHENTICATION_PROFILE',
        },
        {
          value: '',
          label: 'Redirect when no result',
          key: 'redirectWithoutResult',
          type: 'ENDPOINT',
        },
        {
          value: 'built-in',
          label: 'Error message',
          key: 'showError',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Built in', value: 'built-in' },
              { name: 'Interaction', value: 'interaction' },
            ],
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
