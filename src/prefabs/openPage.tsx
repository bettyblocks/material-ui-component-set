import * as React from 'react';
import {
  Icon,
  prefab as makePrefab,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';
import { OpenPageButton } from './structures/OpenPage';

const attrs = {
  icon: Icon.OpenPageIcon,
  category: 'BUTTON',
  keywords: ['Button', 'open', 'page', 'openpage'],
};

const beforeCreate = ({
  prefab,
  save,
  close,
  components: { EndpointSelector, Header, Content, Field, Footer, Text },
}: BeforeCreateArgs) => {
  const [endpoint, setEndpoint] = React.useState<any>({
    id: '',
    pageId: '',
    params: {},
  });
  const [showValidation, setShowValidation] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const isInternalEndpoint = typeof endpoint === 'object';
  const isExternalEndpoint = typeof endpoint === 'string';
  const isValidEndpoint =
    (isInternalEndpoint && endpoint.id !== '') ||
    (isExternalEndpoint && endpoint !== '');

  React.useEffect(() => {
    if (showValidation && isValidEndpoint) setShowValidation(false);
  }, [isValidEndpoint, showValidation, setShowValidation]);

  const onSaveHandler = () => {
    if (!isValidEndpoint) {
      setShowValidation(true);
      return;
    }
    const newPrefab = { ...prefab };
    const structure = newPrefab.structure[0];
    if (structure.type !== 'COMPONENT') {
      setErrorMessage(`expected component prefab, found ${structure.type}`);
      throw new Error(errorMessage);
    }
    if (isInternalEndpoint) {
      structure.options[4] = {
        value: endpoint,
        label: 'Page',
        key: 'linkTo',
        type: 'ENDPOINT',
        configuration: {
          condition: {
            type: 'SHOW',
            option: 'linkType',
            comparator: 'EQ',
            value: 'internal',
          },
        },
      };
    } else {
      structure.options[2] = {
        type: 'CUSTOM',
        label: 'Link to',
        key: 'linkType',
        value: 'external',
        configuration: {
          as: 'BUTTONGROUP',
          dataType: 'string',
          allowedInput: [
            { name: 'Internal page', value: 'internal' },
            { name: 'External page', value: 'external' },
          ],
        },
      };

      structure.options[5] = {
        value: [endpoint],
        label: 'URL',
        key: 'linkToExternal',
        type: 'VARIABLE',
        configuration: {
          placeholder: 'Starts with https:// or http://',
          condition: {
            type: 'SHOW',
            option: 'linkType',
            comparator: 'EQ',
            value: 'external',
          },
        },
      };
    }
    save(newPrefab);
  };

  return (
    <>
      <Header onClose={close} title="Configure open page button" />
      <Content>
        <Field
          label="Link to"
          error={
            showValidation && <Text color="#e82600">Page is required</Text>
          }
        >
          <EndpointSelector
            value={endpoint}
            allowExternal
            onChange={(value: { id: string; pageId: string; params: {} }) =>
              setEndpoint(value)
            }
          />
        </Field>
      </Content>
      <Footer
        onClose={close}
        onSave={onSaveHandler}
        onSkip={() => {
          const newPrefab = { ...prefab };
          save(newPrefab);
        }}
      />
    </>
  );
};

export default makePrefab('Open Page', attrs, beforeCreate, [
  OpenPageButton({}),
]);
