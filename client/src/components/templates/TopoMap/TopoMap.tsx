import { useEffect, useRef, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

import useTopoMapStore from './topoMap.store';
import Player from '../Player/Player';
import Terrain from './Terrain/Terrain';
import { _generateGpsPosToMapPos, createTerrainGeometry } from './topoMap.utils';
import { GLOBAL_CAMERA_BASE_POS, GLOBAL_SCALE } from './config/config';
import LineItinary from './LineItinary/LineItinary';
import { normalizeVect3d, subVect3d } from '../Pizza/utils/vect3d';

console.log("* init camera pos : ", GLOBAL_CAMERA_BASE_POS);
console.log("* init global scale :", GLOBAL_SCALE);

function TopoMap() {
    const storeTopoMap = useTopoMapStore();
    const [geometry, setGeometry] = useState<any>();
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
    useEffect(() => {
        camera.position.set(...GLOBAL_CAMERA_BASE_POS);
    }, [camera]);

 
    useFrame((state, delta, xrFrame) => {
        let currentStep = storeTopoMap.currentStep;
        if (storeTopoMap.itinaryPtsListVp.length && currentStep < storeTopoMap.itinaryPtsListVp.length - 2) {
            
            // dirrection vector
            //let vec1 = storeTopoMap.itinaryPtsListVp[currentStep];
            let vec2 = storeTopoMap.itinaryPtsListVp[currentStep];

            //let vecDiff = subVect3d(vec2, vec1);
            //let vecNormalizeDir = normalizeVect3d(vecDiff);

//            camera.position.set(...storeTopoMap.itinaryPtsListVp[currentStepRef.current]);
            let cameraPos = storeTopoMap.itinaryPtsListVp[currentStep];
            cameraPos[2] = 100;

            let cameraLookAt : [number, number, number] = [vec2[0], vec2[1], 100];
            camera.position.set(...cameraPos);

            camera.lookAt(...cameraLookAt);
            
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