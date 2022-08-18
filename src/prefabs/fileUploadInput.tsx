import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';
import { FileUpload } from './structures/FileUpload';

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

  // TODO: remove this code
  if (!actionVariableOption) {
    return <div>Prefab is missing the actionVariable component option</div>;
  }

  return (
    <CreateFormInputWizard
      supportedKinds={['FILE']}
      actionVariableOption={actionVariableOption.key}
      labelOptionKey="label"
      nameOptionKey="actionVariableId"
      close={close}
      prefab={originalPrefab}
      save={save}
    />
  );
};


const attr = {
  icon: Icon.FileInputIcon,
  category: 'FORMV2',
  keywords: ['Form', 'input', 'file', 'upload', 'fileupload'],
};

export default prefab('File Upload Beta', attr, beforeCreate, [FileUpload()]);
