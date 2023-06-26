import * as React from 'react';
import {
  Icon,
  BeforeCreateArgs,
  prefab as makePrefab,
  PrefabInteraction,
  variable,
} from '@betty-blocks/component-sdk';
import { Button, buttonOptions } from './structures';

const beforeCreate = ({
  prefab,
  save,
  close,
  components: { Header, Content, Field, Footer, Text, EndpointSelector },
}: BeforeCreateArgs) => {
  const [value, setValue] = React.useState<any>({
    id: '',
    pageId: '',
    params: {},
  });
  const [showValidation, setShowValidation] = React.useState(false);

  function serializeParameters(obj: object) {
    return Object.entries(obj).map(([name, entry]) => ({
      name,
      value: entry.map((v: any) => JSON.stringify(v)),
    }));
  }
  return (
    <>
      <Header onClose={close} title="Configure logout button" />
      <Content>
        <Field
          label="Redirect after logout"
          error={
            showValidation && (
              <Text color="#e82600">Selecting a page is required</Text>
            )
          }
        >
          <EndpointSelector size="large" value={value} onChange={setValue} />
        </Field>
      </Content>
      <Footer
        onClose={close}
        onSave={() => {
          if (!Object.keys(value).length) {
            setShowValidation(true);
            return;
          }
          const newPrefab = { ...prefab };
          newPrefab.interactions = [
            {
              name: 'logout',
              sourceEvent: 'Click',
              type: 'Global',
              ref: {
                sourceComponentId: '#logoutButton',
              },
              parameters: [
                {
                  parameter: 'redirectTo',
                  pageId: value.pageId,
                  endpointId: value.id,
                  parameters: serializeParameters(value.params),
                },
              ],
            },
          ] as PrefabInteraction[];
          save(newPrefab);
        }}
      />
    </>
  );
};

const attrs = {
  icon: Icon.LogoutIcon,
  category: 'BUTTON',
  keywords: ['Form', 'input', 'logout', 'logoutbutton'],
};

export default makePrefab('Logout button', attrs, beforeCreate, [
  Button({
    ref: {
      id: '#logoutButton',
    },
    options: {
      ...buttonOptions,
      buttonText: variable('Button text', {
        ...buttonOptions.buttonText('buttonText'),
        value: ['Logout'],
      }),
    },
  }),
]);
