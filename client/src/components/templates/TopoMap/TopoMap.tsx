import { useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

import useTopoMapStore from './topoMap.store';
import Player from '../Player/Player';
import Terrain from './Terrain/Terrain';
import { _generateGpsPosToMapPos, createTerrainGeometry } from './topoMap.utils';
import { GLOBAL_CAMERA_BASE_POS, GLOBAL_SCALE } from './config/config';
import LineItinary from './LineItinary/LineItinary';
import useGlobalStore from '@/store/global.store';

console.log("* init camera pos : ", GLOBAL_CAMERA_BASE_POS);
console.log("* init global scale :", GLOBAL_SCALE);

function TopoMap() {
    const storeTopoMap = useTopoMapStore();
    const [geometry, setGeometry] = useState<any>();
    const globalStore = useGlobalStore();
    const { camera } = useThree();

    //

    useEffect(() => {
        if (storeTopoMap.topoMap?.rows.length)
            setGeometry(createTerrainGeometry(storeTopoMap.topoMap));

        return () => {
            console.log("go remove old things")
        }
    }, [storeTopoMap.topoMap]);

    const generateGpsPosToMapPos = () => {
        const newFuckingPts = _generateGpsPosToMapPos({
            topoMap: storeTopoMap.topoMap,
            itinaryPtsList: storeTopoMap.itinaryPtsList,
            geometry: geometry,
            globalScale: GLOBAL_SCALE
        })
        if (newFuckingPts !== undefined)
            storeTopoMap.setItinaryPtsListVp(newFuckingPts);
    }

    // Set the initial position of the camera here if needed
    /*
    useEffect(() => {
        //    camera.position.set(...GLOBAL_CAMERA_BASE_POS);

    }, [camera]);
    */
    // camera update
    useEffect(() => {
        const cam = globalStore.data.camera;
        camera.position.set(cam.pos[0], cam.pos[1], cam.pos[2]);
        camera.lookAt(cam.target[0], cam.target[1], cam.target[2]);
    }, [globalStore.data.camera])


    useFrame((state, delta, xrFrame) => {
        let currentStep = storeTopoMap.currentStep;
        if (storeTopoMap.statusPlayer === "play" && storeTopoMap.itinaryPtsListVp.length && currentStep < storeTopoMap.itinaryPtsListVp.length - 2) {

            // direction vector
            let vec2 = storeTopoMap.itinaryPtsListVp[currentStep];

            let cameraPos = storeTopoMap.itinaryPtsListVp[currentStep];
            cameraPos[2] += 100;

            let cameraLookAt: [number, number, number] = [vec2[0], vec2[1], 100];
            globalStore.setCamera({
                pos: cameraPos,
                target: cameraLookAt
            })
            storeTopoMap.incrCurrentStep();
        }
    });


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
            />}
        </>
    )
}

export default TopoMap;