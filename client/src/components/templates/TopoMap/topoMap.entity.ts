export interface IAscInfo {
    ncols: number;
    nrows: number;
    xllcorner: number;
    yllcorner: number;
    cellsize: number;
}

export interface IDataMap {
    header: IAscInfo;
    rows: number[][];
}