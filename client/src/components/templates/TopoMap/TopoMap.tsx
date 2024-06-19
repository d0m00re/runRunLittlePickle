import { useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import useTopoMapStore from './topoMap.store';
import Player from '../Player/Player';
import Terrain from './Terrain/Terrain';
import { _generateGpsPosToMapPos, createTerrainGeometry } from './topoMap.utils';
import { GLOBAL_CAMERA_BASE_POS, GLOBAL_SCALE } from './config/config';
import LineItinary from './LineItinary/LineItinary';

console.log("* init camera pos : ", GLOBAL_CAMERA_BASE_POS);
console.log("* init global scale :", GLOBAL_SCALE);

function TopoMap() {
    const storeTopoMap = useTopoMapStore();
    const [geometry, setGeometry] = useState<any>();
    const { camera } = useThree();

    useEffect(() => {
        if (storeTopoMap.topoMap?.rows.length)
            setGeometry(createTerrainGeometry(storeTopoMap.topoMap));

        return () => {
            console.log("go remove old things")
        }
    }, [storeTopoMap.topoMap]);

    const generateGpsPosToMapPos = () => {
        const newFuckingPts = _generateGpsPosToMapPos({
            topoMap : storeTopoMap.topoMap,
            itinaryPtsList : storeTopoMap.itinaryPtsList,
            geometry : geometry,
            globalScale : GLOBAL_SCALE
        })
        if (newFuckingPts !== undefined)
            storeTopoMap.setItinaryPtsListVp(newFuckingPts);
    }

    // Set the initial position of the camera here if needed
    useEffect(() => {
        camera.position.set(...GLOBAL_CAMERA_BASE_POS);
    }, [camera]);

    useEffect(() => {
        generateGpsPosToMapPos();
    }, [geometry]);

    return (
        <>
            <OrbitControls makeDefault maxDistance={10000000} />
            <Player />
            {geometry && <Terrain geometry={geometry} />}
            {(storeTopoMap.itinaryPtsList && storeTopoMap.itinaryPtsListVp.length) && <LineItinary
                ptsList={storeTopoMap.itinaryPtsListVp}
            /> }
        </>
    )
}

export default TopoMap;