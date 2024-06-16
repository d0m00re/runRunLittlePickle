import { OrbitControls } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import useTopoMapStore from './topoMap.store';
import { IAscInfo, IDataMap, IFindPosWithGps } from './topoMap.entity';
import * as THREE from "three";
import { useFrame, useThree } from '@react-three/fiber';
import Player from '../Player/Player';
import { utmToGeographicCoord } from '@/utils/utmToGeographicCoord';
import { IVect3d } from '../Pizza/utils/vect3d';

type ArrVec3 = [number, number, number];

const GLOBAL_SCALE : ArrVec3 = [3, 3, 1];
const GLOBAL_TOPO_MAP_POS : ArrVec3 = [0, 0, 0];
const GLOBAL_CAMERA_BASE_POS : ArrVec3 = [0,0, 800];
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
    console.log("start map gps coord :");
    console.log(startMapGpsCoord);
    console.log("current gps coord :");
    console.log(_props.gpsPos);

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
    const x = -params.width / 2;
    const y = -params.height / 2;
    console.log("diff gps coord");
    console.log(diffGpsCoord)

    //
    const positionFind = {
        x: x + casePositionGps.x * GLOBAL_SCALE[0],
        y: y + casePositionGps.y * GLOBAL_SCALE[1]
    }

    console.log("position find")
    console.log(positionFind);
    return positionFind;
}


function createTerrainGeometry(data: IDataMap) {
    console.log(" * create terrain geometry")
    console.log(data.header)
    console.log(data.rows)

    const geometry = new THREE.PlaneGeometry(
        data.header.ncols,
        data.header.nrows,
        data.header.ncols - 1,
        data.header.nrows - 1);

    // Apply the height data to the vertices of the geometry
    for (let i = 0; i < data.header.nrows; i++) {
        for (let j = 0; j < data.header.ncols; j++) {
            const z = data.rows[i][j];
            const index = i * data.header.ncols + j;
            geometry.attributes.position.setZ(index, z);
        }
    }

    // Normalize the geometry
    geometry.computeVertexNormals();
    return geometry;
}

const Terrain = ({ geometry }: { geometry: THREE.PlaneGeometry }) => {
    const ref = React.useRef<THREE.Mesh>(null);

    useFrame(() => {
        //  if (ref.current) {
        //      ref.current.rotation.z += 0.005;
        //  }
    });
    // The X axis is red. The Y axis is green. The Z axis is blue. 
    //            <hemisphereLight />

    return (
        <>
            <mesh
                ref={ref}
                geometry={geometry}
                position={GLOBAL_TOPO_MAP_POS}
                scale={GLOBAL_SCALE}>
                <meshStandardMaterial attach="material" color="lightgreen" wireframe={true} />
            </mesh>
            <axesHelper />
            <pointLight position={[-10, -10, 400]} decay={0} intensity={Math.PI} />
        </>
    );
};

function TopoMap() {
    const storeTopoMap = useTopoMapStore();
    const [geometry, setGeometry] = useState<any>();
    const [ptsList, setPtsList] = useState<IVect3d[]>([]);
    const { camera } = useThree();


    useEffect(() => {
        if (storeTopoMap.topoMap?.rows.length) {
            let geo = createTerrainGeometry(storeTopoMap.topoMap);

            // geo coordinatw
            let coord = utmToGeographicCoord(storeTopoMap.topoMap.header.xllcorner, storeTopoMap.topoMap.header.yllcorner);
            console.log("corrd");
            console.log(coord);

            setGeometry(geo);
        }

        return () => {
            console.log("go remove old things")
        }
    }, [storeTopoMap.topoMap])


    const THIRTY_METER = 0.000277777778;

    const letsGoMan = () => {
        let topoMap = storeTopoMap.topoMap;
        if (!geometry?.parameters || !topoMap) return ;
        const currentGpsCoordList = [
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
            */
            {y : 47.36362242534034, x : -3.1581356964647354}
        ];

        
        


        let positionMapGpsList = currentGpsCoordList.map(gpsCoord => findPosWithGps({
            header : topoMap.header,
            gpsPos : gpsCoord,
            geometry : {
                dim : {
                    width : geometry.parameters.width,
                    height : geometry.parameters.height
                }
            }
        }))

        let encodePts : [number, number, number][] = positionMapGpsList.map(e => [
            e.x,
            e.y,
            0])

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
        letsGoMan();
    }, [geometry]);

    console.log("===== PTS LIST ======")
    console.log(ptsList);
    
    //maxDistance={100000} 
    return (
        <>
            <OrbitControls makeDefault />
            <Player />
            {geometry && <Terrain geometry={geometry} />}
        
            {
                ptsList.map((e, i) =>
                    <mesh
                        key={`test-key-${i}`}
                        visible
                        userData={{ hello: 'world' }}
                        position={e}
                        
                    >
                        <sphereGeometry args={[1, 16, 16]} />
                        <meshStandardMaterial color="hotpink" />
                    </mesh>

                )
            }
        </>
    )
}

export default TopoMap