export type DataObject = { [k: string]: unknown }
export type Projection = { [k: string]: (0 | 1) }
export type Results<T> = ( T | undefined )
export type DbResults = Results<DataObject[] | DataObject>
