import { IAscInfo, IDataMap } from "./topoMap.entity";

export const makeEmptyIAscInfo = (): IAscInfo => ({
    ncols: 0,
    nrows: 0,
    xllcorner: 0,
    yllcorner: 0,
    cellsize: 0
});

export const parseHeader = (data: string[]): IAscInfo => {
    let info = makeEmptyIAscInfo();
  
    for (let x = 0; x < 6; x++) {
      let elem = data[x].split(/\s+/); //.split(" ").filter(e => e !== "");
      let key: any = elem[0].toLocaleLowerCase();
  
  
      if (info.hasOwnProperty(key) !== undefined) {
        // @ts-ignore
        info[key] = parseFloat(elem[1]);
      }
    }
    return info;
  }
  
  export const parseData = (header: IAscInfo, data: string[]): number[][] => {
    let tmpArr: number[][] = []; 
    let startAt = data.length - (header.nrows + 1);
    // start
  
    for (let c = startAt; c < data.length; c++) {
      let line = data[c].split(/\s+/).filter(e => e !== "").map(e => parseFloat(e))
      tmpArr.push(line);
    }
  
    return tmpArr.filter(e => e.length > 0);
  }

  export const parseTopoMap =  (lineArr : string[]): IDataMap => {
    const header = parseHeader(lineArr);
    const dataParse = parseData(header, lineArr);

    return {
        header : header,
        rows : dataParse
    }

  }
