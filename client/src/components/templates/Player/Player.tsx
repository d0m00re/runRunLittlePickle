import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from "three";

function Player() {
    const { camera, scene } = useThree();
    const ref = useRef<any>();
    const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
    const speed = 0.1;
    const raycaster = new THREE.Raycaster();


    const handleKeyDown = (event: any) => {
        switch (event.key) {
            case 'ArrowUp':
                setPosition((prev) => [prev[0], prev[1] + speed, prev[2]]);
                break;
            case 'ArrowDown':
                setPosition((prev) => [prev[0], prev[1] - speed, prev[2]]);
                break;
            case 'ArrowLeft':
                setPosition((prev) => [prev[0] - speed, prev[1], prev[2]]);
                break;
            case 'ArrowRight':
                setPosition((prev) => [prev[0] + speed, prev[1], prev[2]]);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useFrame(() => {
        let pos = [...position];
        pos[2] -= 1.1;
        raycaster.set(new THREE.Vector3(...pos), new THREE.Vector3(0, 0, -1));
        ref.current.position.set(...position);
        const intersects = raycaster.intersectObjects(scene.children);
        //console.log(intersects);
    });

    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
}

export default Player;