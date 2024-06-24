import { useEffect, useRef, useState } from 'react';
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
    const refOrbit = useRef<any>();

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
      // // camera.lookAt(cam.target[0], cam.target[1], cam.target[2]);
      if (refOrbit.current)
        refOrbit.current.target.set(cam.pos[0] - 100, cam.pos[1] -100, 0)
    }, [globalStore.data.camera])


    useFrame((state, delta, xrFrame) => {
        let currentStep = storeTopoMap.currentStep;
        if (storeTopoMap.curve !== undefined && storeTopoMap.statusPlayer === "play" && storeTopoMap.itinaryPtsListVp.length && currentStep < storeTopoMap.itinaryPtsListVp.length - 2) {

            //
            let progress = (currentStep / storeTopoMap.itinaryPtsListVp.length);
            let ptsCurve = storeTopoMap.curve.getPoint(progress);
            // direction vector

            globalStore.setCamera({
                pos : [ptsCurve.x, ptsCurve.y, ptsCurve.z + 200],
                target : [ptsCurve.x, ptsCurve.y, ptsCurve.z]
            })
            storeTopoMap.incrCurrentStep();
        }
    });


    useEffect(() => {
        generateGpsPosToMapPos();
    }, [geometry]);

    return (
        <>
            <OrbitControls
                makeDefault
                maxDistance={10000000}
                ref={refOrbit}
            />
            <Player />
            {geometry && <Terrain geometry={geometry} />}
            {(storeTopoMap.itinaryPtsList && storeTopoMap.itinaryPtsListVp.length) && <LineItinary
                ptsList={storeTopoMap.itinaryPtsListVp}
            />}
        </>
    )
}

export default TopoMap;