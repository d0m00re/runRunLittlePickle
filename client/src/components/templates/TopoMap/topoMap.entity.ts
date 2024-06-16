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

export interface IFindPosWithGps {
        header : IAscInfo,
        gpsPos : {x : number, y : number},
        geometry : {
            dim : {width : number, height : number},
         //   uv : {x : number, y : number}
        }
}