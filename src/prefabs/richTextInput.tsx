import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';
import { RichTextInput } from './structures/RichTextInput';

const beforeCreate = ({
  close,
  components: { CreateFormInputWizard },
  prefab: originalPrefab,
  save,
}: BeforeCreateArgs) => {
  const structure = originalPrefab.structure[0];
  if (structure.type !== 'COMPONENT')
    return <div>expected component prefab, found {structure.type}</div>;

  // TODO: remove this code
  const actionVariableOption = structure.options.find(
    (option: { type: string }) => option.type === 'ACTION_JS_VARIABLE',
  );

  return (
    <CreateFormInputWizard
      supportedKinds={['RICH_TEXT']}
      actionVariableOption={actionVariableOption?.key || null}
      labelOptionKey="label"
      nameOptionKey="actionVariableId"
      close={close}
      prefab={originalPrefab}
      save={save}
    />
  );
};

const attributes = {
  category: 'FORM',
  icon: Icon.RichTextEditorIcon,
  keywords: ['Form', 'input', 'rich text', 'rich', 'text', 'editor'],
};

export default prefab('Rich Text Editor', attributes, beforeCreate, [
  RichTextInput({
    label: 'Rich text editor',
    inputLabel: 'Rich text editor',
    type: 'text',
  }),
]);
