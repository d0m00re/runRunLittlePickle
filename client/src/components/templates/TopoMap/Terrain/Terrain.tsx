import React from 'react';
import * as THREE from "three";
import { useFrame } from '@react-three/fiber';

import shaderFragment from "../Shader/topomap.fragment.glsl?raw"
import shaderVertex from "../Shader/topomap.vertex.glsl?raw";
import { GLOBAL_SCALE, GLOBAL_TOPO_MAP_POS, POINT_LIGHT } from '../config/config';

const customMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      vMouse: { value: [0, 0] },
      vResolutions: { value: [500, 500] }
    },
    vertexShader: shaderVertex,
    fragmentShader: shaderFragment //fragmentShader
  });

interface ITerrain {
    geometry: THREE.PlaneGeometry;
}

const Terrain = ({ geometry }: ITerrain) => {
    const ref = React.useRef<THREE.Mesh>(null);

    useFrame(() => {});

    return (
        <>
            <mesh
                name='topoMap'
                ref={ref}
                geometry={geometry}
                position={GLOBAL_TOPO_MAP_POS}
                scale={GLOBAL_SCALE}
                material={customMaterial}
                >
            </mesh>
            <axesHelper />
            <pointLight position={POINT_LIGHT} decay={0} intensity={Math.PI} />
        </>
    );
};

export default Terrain;