import {
  PrefabComponentOption,
  OptionProducer,
  showIfTrue,
} from '@betty-blocks/component-sdk';

type Attributes = Partial<PrefabComponentOption>;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const updateOption = (
  producer: OptionProducer,
  attrs: Attributes,
): OptionProducer => {
  return (key) => ({ ...producer(key), ...attrs });
};

export const showOn = (key: string) => ({
  configuration: { condition: showIfTrue(key) },
});
