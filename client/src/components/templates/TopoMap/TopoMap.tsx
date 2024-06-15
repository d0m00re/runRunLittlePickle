import { OrbitControls } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import useTopoMapStore from './topoMap.store';
import { IDataMap } from './topoMap.entity';
import * as THREE from "three";
import { useFrame } from '@react-three/fiber';
import Player from '../Player/Player';
import { utmToGeographicCoord } from '@/utils/utmToGeographicCoord';

type Props = {}

const sphere = new THREE.PlaneGeometry(3., 1.4, 50, 50);


//----------


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
            <mesh  ref={ref} geometry={geometry} position={[0,0,-800]} scale={[3, 3, 1]}>
                <meshStandardMaterial attach="material" color="lightgreen" wireframe={true} />
            </mesh>
            <axesHelper />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        </>
    );
};

function TopoMap({ }: Props) {
    const storeTopoMap = useTopoMapStore();
    const [geometry, setGeometry] = useState<any>();

    useEffect(() => {
        if (storeTopoMap.topoMap?.rows.length) {
            let geo = createTerrainGeometry(storeTopoMap.topoMap);

            // geo coordinatw
            let coord = utmToGeographicCoord(storeTopoMap.topoMap.header.xllcorner, storeTopoMap.topoMap.header.yllcorner);
            console.log("corrd")
            console.log(coord)

            setGeometry(geo);
        }

        return () => {
            console.log("go remove old things")
        }
    }, [storeTopoMap.topoMap])

//maxDistance={100000} 
    return (
        <>
            <OrbitControls />
            <Player />
            {geometry && <Terrain geometry={geometry} />}
            <mesh
                geometry={sphere}
            />
        </>
    )
}

export default TopoMap