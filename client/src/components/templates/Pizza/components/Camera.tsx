import { useRef, useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import useStorePizza from "./../Store/pizza.zustand";

const Camera = () => {
    const cameraRef = useRef<any | null>(null);
    const [zoom, setZoom] = useState(20);
    const storePizza = useStorePizza();

    useFrame(() => {
        const origin = new Vector3(0, 0, 0);

        if (storePizza.step === "chooseIngrediant" && zoom > 15)
            setZoom(old => old - 0.1);
        else if ((storePizza.step === "buy" || storePizza.step === "waitCommand") && zoom > 2)
            setZoom(old => old - 0.1);

        // @ts-ignore
        cameraRef.current.lookAt(origin);
    });
    return (
        <PerspectiveCamera
            makeDefault
            ref={cameraRef}
            fov={75}
            aspect={window.innerWidth / window.innerHeight}
            near={0.1}
            far={1000}
            position={[0, 10, 10]} // Set the camera position
            zoom={zoom}
        />
    );
};

export default Camera;