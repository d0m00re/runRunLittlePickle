import { GLOBAL_SCALE } from "@/components/templates/TopoMap/config/config";
import { IFindPosWithGps } from "@/components/templates/TopoMap/topoMap.entity";

const findPosWithGps = ( _props : IFindPosWithGps) => {
    // get dim of the current geometry
    const params = _props.geometry.dim;
    // starting map gps pos 
    const startMapGpsCoord = {
        x: _props.header.xllcorner,
        y: _props.header.yllcorner

    }

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

    const positionFind = {
        x: x + casePositionGps.x * GLOBAL_SCALE[0],
        y: y + casePositionGps.y * GLOBAL_SCALE[1]
    }

    return positionFind;
}

export default findPosWithGps;