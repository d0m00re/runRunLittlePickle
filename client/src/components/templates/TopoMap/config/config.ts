export type ArrVec3 = [number, number, number];

export const THIRTY_METER = 0.000277777778;
export const GLOBAL_SCALE : ArrVec3 = [3, 3, 1];
export const GLOBAL_CAMERA_BASE_POS : ArrVec3 = [0,0, 800];
export const GLOBAL_TOPO_MAP_POS : ArrVec3 = [0, 0, 0];
export const POINT_LIGHT : ArrVec3 = [-10, -10, 400];

// for sclae 1,1,1
//Object { width: 860, height: 486, widthSegments: 859, heightSegments: 485 }
//Object { width: 860, height: 486, widthSegments: 859, heightSegments: 485 }
/*
// Dimensions effectives après application de l'échelle
const effectiveWidth = geometry.parameters.width * cube.scale.x;
const effectiveHeight = geometry.parameters.height * cube.scale.y;
const effectiveDepth = geometry.parameters.depth * cube.scale.z;
*/