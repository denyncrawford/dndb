interface DataStoreOptions {
    filename: string,
    onLoad?: () => void,
    timeStamp?: string,
    autoload?: boolean
}

export default DataStoreOptions