interface DataStoreOptions {
    filename: string,
    onLoad?: () => void,
    timeStamp?: string,
    autoload?: boolean,
    bufSize?: number
}

export default DataStoreOptions