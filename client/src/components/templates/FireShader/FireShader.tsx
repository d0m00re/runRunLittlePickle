import * as THREE from 'three';
import fireFragment from "./shaderFragment.glsl?raw"
import fireVertex from "./shaderVertex.glsl?raw";
import { useFrame } from '@react-three/fiber'
import firemask from "./fire00.png"; //"./firemask2.jpeg"; //"./firemask.jpg";

const sphere = new THREE.PlaneGeometry(3., 1.4, 50, 50);

// Create a custom shader material
const customMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    vMouse: { value: [0, 0] },
    vResolutions: { value: [500, 500] }
  },
  vertexShader: fireVertex,
  fragmentShader: fireFragment //fragmentShader
});

customMaterial.uniforms.uTexture = {value : new THREE.TextureLoader().load(firemask)}

customMaterial.uniforms.u_time = { value: 0 }
function FireShader() {
  useFrame((state, delta, xrFrame) => {
    customMaterial.uniforms.uTime.value += delta;
  });

  return (
    <mesh
      position={[2.9, -1.2, -3]}
      geometry={sphere}
      material={customMaterial} />
  )
}

export default FireShader;