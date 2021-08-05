export default interface DataStoreOptions {
  filename: string;
  onLoad?: () => void;
  /** @deprecated */
  timeStamp?: string;
  autoload?: boolean;
  bufSize?: number;
}
