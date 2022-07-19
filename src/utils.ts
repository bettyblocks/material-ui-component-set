import {
  PrefabComponentOption,
  OptionProducer,
  showIfTrue,
} from '@betty-blocks/component-sdk';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const updateOption = <T extends PrefabComponentOption>(
  producer: (key: string) => T,
  attrs: Partial<T>,
): OptionProducer => {
  return (key) => {
    return { ...producer(key), ...attrs };
  };
};

export const showOn = (key: string) => ({
  configuration: { condition: showIfTrue(key) },
});
