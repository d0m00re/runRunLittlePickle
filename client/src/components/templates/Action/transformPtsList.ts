import { IVect3d } from "../Pizza/utils/vect3d";

export interface IPts2d {
    x: number;
    y: number;
}

/**
 * 
 * @param listPts list pts
 * @param lenX nb subdivision of x
 */
const transformPtsList = (listPts : IVect3d[], lenX : number, maxHeight : number) : IPts2d[] => {
    let maxZ = Math.max(...listPts.map(e => e[2]));
    let minZ = Math.min(...listPts.map(e => e[2]));
    let diffZ = maxZ - minZ;
    // normalize on our current weight
    let incrX = listPts.length / lenX;
    // scale 0 - 1
    let scaleZ = maxHeight / diffZ;

    let arrPts : IPts2d[] = [];

    for (let x = 0; x < listPts.length; x++) {
        let xx = x * incrX;
        let currY = maxHeight - ((listPts[x][2] - minZ) * scaleZ);
        arrPts.push({x : xx, y : currY});
    }
    return arrPts;
}

export default transformPtsList;