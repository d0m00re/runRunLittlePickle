import { Line, OrbitControls } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import useTopoMapStore from './topoMap.store';
import { IAscInfo, IDataMap, IFindPosWithGps } from './topoMap.entity';
import * as THREE from "three";
import { useFrame, useThree } from '@react-three/fiber';
import Player from '../Player/Player';
import { utmToGeographicCoord } from '@/utils/utmToGeographicCoord';
import { IVect3d } from '../Pizza/utils/vect3d';
import Terrain from './Terrain/Terrain';
import findPosWithGps from '@/utils/findPosWithGps';
import { createTerrainGeometry } from './topoMap.utils';
import { GLOBAL_CAMERA_BASE_POS, GLOBAL_SCALE } from './config/config';

//----------

console.log("* init camera pos : ", GLOBAL_CAMERA_BASE_POS);
console.log("* init global scale :", GLOBAL_SCALE);

function TopoMap() {
    const storeTopoMap = useTopoMapStore();
    const [geometry, setGeometry] = useState<any>();
    const [ptsList, setPtsList] = useState<IVect3d[]>([]);
    const { camera, scene } = useThree();
    


    useEffect(() => {
        if (storeTopoMap.topoMap?.rows.length) {
            let geo = createTerrainGeometry(storeTopoMap.topoMap);

            // geo coordinatw
            let coord = utmToGeographicCoord(storeTopoMap.topoMap.header.xllcorner, storeTopoMap.topoMap.header.yllcorner);
          //  console.log("coord");
          //  console.log(coord);
            setGeometry(geo);
        }

        return () => {
            console.log("go remove old things")
        }
    }, [storeTopoMap.topoMap])

    //47.3506056,-3.1600709

    const generateGpsPosToMapPos = () => {
        let topoMap = storeTopoMap.topoMap;
        if (!geometry?.parameters || !topoMap) return;
        const currentGpsCoordList = storeTopoMap.itinaryPtsList;
        
        let old = [
            // { x : -3.168333329678278, y :47.332916666721},
            /*
            { x : -3.168333329678278 + THIRTY_METER * 5, y :47.332916666721},            
            { x : -3.168333329678278 + THIRTY_METER * 10, y :47.332916666721},            
            { x : -3.168333329678278 + THIRTY_METER * 15, y :47.332916666721},            
            { x : -3.168333329678278 + THIRTY_METER * 20, y :47.332916666721}, 
            { x : -3.168333329678278 + THIRTY_METER * 100, y :47.332916666721}, 


            { x : -3.168333329678278 + THIRTY_METER * -5, y :47.332916666721},            
            { x : -3.168333329678278 + THIRTY_METER * -10, y :47.332916666721},            
            { x : -3.168333329678278 + THIRTY_METER * -15, y :47.332916666721},            
            { x : -3.168333329678278 + THIRTY_METER * -20, y :47.332916666721},
            { x : -3.168333329678278 + THIRTY_METER * -100, y :47.332916666721},

            
            { x : -3.168333329678278, y :47.332916666721 + THIRTY_METER * 5},
            { x : -3.168333329678278, y :47.332916666721 + THIRTY_METER * 10},
            { x : -3.168333329678278, y :47.332916666721 + THIRTY_METER * 15},
            { x : -3.168333329678278, y :47.332916666721 + THIRTY_METER * 20},
            { x : -3.168333329678278, y :47.332916666721 + THIRTY_METER * 100},

            { x : -3.168333329678278, y :47.332916666721 - THIRTY_METER * 5},
            { x : -3.168333329678278, y :47.332916666721 - THIRTY_METER * 10},
            { x : -3.168333329678278, y :47.332916666721 - THIRTY_METER * 15},
            { x : -3.168333329678278, y :47.332916666721 - THIRTY_METER * 20},
            { x : -3.168333329678278, y :47.332916666721 - THIRTY_METER * 100},
          
            { x : -3.168333329678278, y :47.332916666721},
            { x : -3.1581356964647354, y : 47.36362242534034},
               */
            { y: 47.3506056, x: -3.1600709 }, // near le palais
            { y: 47.3886866, x: -3.2541209 }, // pointe des poulains
            { y: 47.3256126, x: -3.2399079 }, // plage du donant
            { y: 47.2938996, x: -3.0783549 } // plage locmaria port maria
        ];

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

       // console.log("------------- GEOMETRY DIM")
       // console.log(geometry.parameters);
       // console.log("-------")

        let encodePts: [number, number, number][] = positionMapGpsList.map(e => [
            e.x,
            e.y,
            60]);
        // all pts

        let ptsNearMap : {x : number, y : number, z : number}[] = [];
        if (camera && encodePts && encodePts.length) {
            ptsNearMap = encodePts.map(pos => {
                const raycaster = new THREE.Raycaster();
                raycaster.camera = camera;
                raycaster.set(new THREE.Vector3(...pos), new THREE.Vector3(0, 0, -1));
                  const intersects = raycaster.intersectObjects(scene.children).filter(e => e.object.name === "topoMap");
                  // could crash here if no pts in array
                  if ( !intersects || intersects.length < 1) {
                    return {x : 0,y:0,z:0};
                  }
                  return (intersects[0].point);
            })
        //    console.log("==========================================================>>>>>>")
        //    console.log(ptsNearMap);
        }

        // update pts with z
        encodePts = encodePts.map((pts, i) => ([
            pts[0],
            pts[1],
            ptsNearMap[i].z + 20
        ]))




        // inject base pts
        /*
        encodePts.push([0,0,100]);
        encodePts.push([-100,-100,100]);
        encodePts.push([100,100,100]);
        */

     //   console.log("encode pts")
     //   console.log(encodePts);

        setPtsList(old => ([
            ...old,
            ...encodePts
        ]))
    }

    useEffect(() => {
        // Set the initial position of the camera here if needed
        camera.position.set(...GLOBAL_CAMERA_BASE_POS);
    }, [camera]);

    useEffect(() => {
        generateGpsPosToMapPos();
    }, [geometry]);

  //  console.log("===== PTS LIST ======")
   // console.log(ptsList);

    //maxDistance={100000} 
    return (
        <>
            <OrbitControls makeDefault />
            <Player />
            {geometry && <Terrain geometry={geometry} />}

            {/*
                ptsList.map((pos, i) =>
                    <mesh
                        key={`test-key-${i}`}
                        visible
                        userData={{ hello: 'world' }}
                        position={pos}
                        scale={[15, 15, 15]}
                    >
                        <sphereGeometry args={[1, 16, 16]} />
                        <meshStandardMaterial color="hotpink" />
                    </mesh>

                )
            */}
            {ptsList && ptsList.length ?
                <Line
                    points={ptsList}
                    color="black"
                    lineWidth={20}
                    dashed={false}
                /> : <></>
            }
        </>
    )
}

export default TopoMap