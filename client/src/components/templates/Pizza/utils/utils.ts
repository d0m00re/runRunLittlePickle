import { IVect3d } from "@/utils/vect3d";

export function getRandomPointInCircle(radius: number): [number, number] {
    const theta = 2 * Math.PI * Math.random();
    const r = radius * Math.sqrt(Math.random());
  
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
  
    return [x, y];
  }

export const genPosRandom = () : IVect3d => {
    //return [0.1, 1, 0.1];
    let posCircle = getRandomPointInCircle(0.45);
    return [posCircle[0], 1, posCircle[1]];
}
