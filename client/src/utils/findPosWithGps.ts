import { IFindPosWithGps } from "@/components/templates/TopoMap/topoMap.entity";


type ArrVec3 = [number, number, number];

const GLOBAL_SCALE : ArrVec3 = [3, 3, 1];
//----------
const findPosWithGps = ( _props : IFindPosWithGps) => {
    // get dim of the current geometry
    const params = _props.geometry.dim;
    // starting map gps pos 
    const startMapGpsCoord = {
        x: _props.header.xllcorner,
        y: _props.header.yllcorner

    }
    // target uv : _Vector2 {x: 0.5003488592131674, y: 0.5068587206590386}
   // console.log("start map gps coord :");
   // console.log(startMapGpsCoord);
   // console.log("current gps coord :");
   // console.log(_props.gpsPos);

    // sub vector
    const diffGpsCoord = {
        x: _props.gpsPos.x - startMapGpsCoord.x,
        y: _props.gpsPos.y - startMapGpsCoord.y
    }

    // nb case form diff gps
    const casePositionGps = {
        x: diffGpsCoord.x / (_props.header.cellsize),
        y: diffGpsCoord.y / (_props.header.cellsize)
    }

    // fin relative position
    // scale on the other form influence it?
    const x = -(params.width * GLOBAL_SCALE[0]) / 2;
    const y = -(params.height * GLOBAL_SCALE[1]) / 2;
 //   console.log("diff gps coord");
 //   console.log(diffGpsCoord)

    //
    const positionFind = {
        x: x + casePositionGps.x * GLOBAL_SCALE[0],
        y: y + casePositionGps.y * GLOBAL_SCALE[1]
    }

   // console.log("position find")
   // console.log(positionFind);
    return positionFind;
}

export default findPosWithGps;