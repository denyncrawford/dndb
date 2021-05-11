export type MaybeArray<T> = T | T[];
export type DataObject = Record<string, unknown>;
export type Projection<
  Keys extends string | number | symbol = string,
> = Record<Keys, 0 | 1>;
export type Results<T> = T | void;
export type DbResults<Doc = DataObject> = Results<MaybeArray<Doc>>;
export type WithID<Doc = DataObject> = Doc & { _id: string };
