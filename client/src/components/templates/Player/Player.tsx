import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from "three";
import { utmToGeographicCoord } from '@/utils/utmToGeographicCoord';
import proj4 from 'proj4';

// test
// Define the UTM zone 31N projection
const utmZone31N = "+proj=utm +zone=30 +datum=WGS84 +units=m +no_defs";
// Define the WGS 84 projection
const wgs84 = proj4.WGS84;
function convertToGPS(x_map: number, y_map: number): { lat: number, lon: number } {
    const [lon, lat] = proj4(utmZone31N, wgs84, [x_map, y_map]);
    return { lat, lon };
}

//

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

    useEffect(() => {
        let pos = [...position];
        pos[2] -= 1.1;
        raycaster.set(new THREE.Vector3(...pos), new THREE.Vector3(0, 0, -1));
        const intersects = raycaster.intersectObjects(scene.children);
        console.log(intersects);
        if (intersects.length && intersects[0].uv) {
            const fake = {
                ncols    : 677,
                nrows    : 600,
                xllcorner : -3.287659,//3320790.000000000000,
                yllcorner  : 47.265392,//2770420.000000000000,
                cellsize : 30.000000000000
            }
            let uv = intersects[0].uv;
            console.log("uv")
            console.log(uv);
            //Convert UV to pixel coordinates:
            let _p = {
                x : uv.x * fake.ncols, //ncols
                y : uv.y * fake.nrows //nrows
            }

            let _coordMap = {
                x : 3320790.0 + _p.x * fake.cellsize,
                y : 2770420.0 + _p.y * fake.cellsize
            }
        
            let gpsCoordinate = utmToGeographicCoord(_coordMap.x, _coordMap.y);
            console.log("gps coordinate")
            console.log(gpsCoordinate)
            console.log(convertToGPS(3320790, 2770420))
        }
    }, [position])
    

    useFrame(() => {
        ref.current.position.set(...position);
    });

    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
}

export default Player;