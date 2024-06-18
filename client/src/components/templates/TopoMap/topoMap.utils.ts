import findPosWithGps from "@/utils/findPosWithGps";
import { IVec3dField } from "../Pizza/utils/vect3d";
import { IAscInfo, IDataMap } from "./topoMap.entity";
import * as THREE from "three";

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

  export function createTerrainGeometry(data: IDataMap) {
   // console.log(" * create terrain geometry")
  //  console.log(data.header)
  //  console.log(data.rows)

    const geometry = new THREE.PlaneGeometry(
        data.header.ncols,
        data.header.nrows,
        data.header.ncols - 1,
        data.header.nrows - 1);

    // Apply the height data to the vertices of the geometry
    for (let i = 0; i < data.header.nrows; i++) {
        for (let j = 0; j < data.header.ncols; j++) {
            const z = data.rows[i][j];
            const index = i * data.header.ncols + j;
            geometry.attributes.position.setZ(index, z);
        }
    }

    // Normalize the geometry
    geometry.computeVertexNormals();
    return geometry;
}

//----------------------------------------
interface IGenerateGpsPosToMapPos {
  topoMap : IDataMap | undefined;
  itinaryPtsList : IVec3dField[];
  geometry : any;
  globalScale : [number, number, number];
}

export const _generateGpsPosToMapPos = (props : IGenerateGpsPosToMapPos) => {
  const {topoMap, itinaryPtsList, geometry, globalScale} = props;

  if (!geometry?.parameters || !topoMap) return;
  const currentGpsCoordList = itinaryPtsList;

  // find pos on map current viewport
  let dim = {
      width: geometry.parameters.width,
      height: geometry.parameters.height
  }
  let positionMapGpsList = currentGpsCoordList.map((gpsCoord : any) => findPosWithGps({
      header: topoMap.header,
      gpsPos: gpsCoord,
      geometry: {dim}
  }))

  // encode pts with fake height
  let encodePts: [number, number, number][] = positionMapGpsList.map(e => [
      e.x,
      e.y,
      100]);

  // update pts with z
  let dimOneCase = {
      x : globalScale[0],
      y : globalScale[1]
  }

  let dimTotal = {
      x : (topoMap?.header.ncols ?? 1) * dimOneCase.x,
      y : (topoMap?.header.nrows ?? 1) * dimOneCase.y
  };

  let middleMap = {
      x : dimTotal.x / 2,
      y : dimTotal.y / 2
  }

  // let s go man
  // @ts-ignore
  let newFuckingPts : [number, number, number][] = encodePts.map((posItiPts, i) => {
      let absPos = {
          x : posItiPts[0] + middleMap.x,
          y : posItiPts[1] + middleMap.y
      }

      let arrPos = {
          x : Math.floor(absPos.x / dimOneCase.x) ,
          y : Math.floor(absPos.y / dimOneCase.y)
      }

      if (!topoMap)
          return [];
      let arr : [number, number, number] = [
          encodePts[i][0],
          encodePts[i][1],
          topoMap.rows[arrPos.y][arrPos.x]
      ];
      return arr;
  });

  //
  return newFuckingPts;
  //storeTopoMap.setItinaryPtsListVp(newFuckingPts);
}
