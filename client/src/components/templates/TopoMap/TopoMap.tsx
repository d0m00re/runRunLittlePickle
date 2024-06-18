import { useEffect, useState } from 'react';
import * as THREE from "three";
import { Line, OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import findPosWithGps from '@/utils/findPosWithGps';

import useTopoMapStore from './topoMap.store';
import Player from '../Player/Player';
import { IVect3d } from '../Pizza/utils/vect3d';
import Terrain from './Terrain/Terrain';
import { createTerrainGeometry } from './topoMap.utils';
import { GLOBAL_CAMERA_BASE_POS, GLOBAL_SCALE } from './config/config';

console.log("* init camera pos : ", GLOBAL_CAMERA_BASE_POS);
console.log("* init global scale :", GLOBAL_SCALE);

function TopoMap() {
    const storeTopoMap = useTopoMapStore();
    const [geometry, setGeometry] = useState<any>();
    const [ptsList, setPtsList] = useState<IVect3d[]>([]);
    const { camera } = useThree();

    useEffect(() => {
        if (storeTopoMap.topoMap?.rows.length)
            setGeometry(createTerrainGeometry(storeTopoMap.topoMap));

        return () => {
            console.log("go remove old things")
        }
    }, [storeTopoMap.topoMap]);

    const generateGpsPosToMapPosV2 = () => {
        let topoMap = storeTopoMap.topoMap;
        if (!geometry?.parameters || !topoMap) return;
        const currentGpsCoordList = storeTopoMap.itinaryPtsList;

        // find pos on map current viewport
        let positionMapGpsList = currentGpsCoordList.map(gpsCoord => findPosWithGps({
            header: topoMap.header,
            gpsPos: gpsCoord,
            geometry: {
                dim: {
                    width: geometry.parameters.width,
                    height: geometry.parameters.height
                }
            }
        }))

        // encode pts with fake height
        let encodePts: [number, number, number][] = positionMapGpsList.map(e => [
            e.x,
            e.y,
            100]);

        //---------------
        // update pts with z
        let dimOneCase = {
            x : GLOBAL_SCALE[0],
            y : GLOBAL_SCALE[1]
        }

        let dimTotal = {
            x : (storeTopoMap.topoMap?.header.ncols ?? 1) * dimOneCase.x,
            y : (storeTopoMap.topoMap?.header.nrows ?? 1) * dimOneCase.y
        };

        console.log("dim total")
        console.log(dimTotal);

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

            if (!storeTopoMap.topoMap)
                return [];
            let arr : [number, number, number] = [
                encodePts[i][0],
                encodePts[i][1],
                storeTopoMap.topoMap.rows[arrPos.y][arrPos.x]
            ];
            return arr;
        })
       
        setPtsList(old => ([
            ...old,
            ...newFuckingPts
        ]));
    }

    useEffect(() => {
        // Set the initial position of the camera here if needed
        camera.position.set(...GLOBAL_CAMERA_BASE_POS);
    }, [camera]);

    useEffect(() => {
        generateGpsPosToMapPosV2();
    }, [geometry]);

    return (
        <>
            <OrbitControls makeDefault />
            <Player />
            {geometry && <Terrain geometry={geometry} />}
            {ptsList && ptsList.length ?
                <Line
                    points={ptsList}
                    color="black"
                    lineWidth={5}
                    dashed={false}
                /> : <></>
            }
        </>
    )
}

export default TopoMap;