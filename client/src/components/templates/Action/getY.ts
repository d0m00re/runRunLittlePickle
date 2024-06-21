import { IPts2d } from "./transformPtsList";

const getY = (currentX: number, listPts: IPts2d[]) => {
    let startPtsIndex = -1;

    for (let x = 0; x < listPts.length - 1 && startPtsIndex === -1; x++) {
        if (listPts[x + 1].x > currentX) {
            startPtsIndex = x;
        }
    }

    if (startPtsIndex === -1) return undefined;

    // calculate y
    let diffX = listPts[startPtsIndex + 1].x - listPts[startPtsIndex].x;
    let diffX2 = listPts[startPtsIndex + 1].x - currentX;

    // % courb
    let xPercentRel = 1 - diffX2 / diffX;

    let diffY = listPts[startPtsIndex + 1].y - listPts[startPtsIndex].y;
    let currentY = listPts[startPtsIndex].y + (diffY * xPercentRel)

    // 
    return currentY;
}

export default getY;