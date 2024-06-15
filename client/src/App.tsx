import { useEffect, useState } from "react";

import * as THREE from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Pizza from './components/templates/Pizza/Pizza';
import { PizzaConfigurator } from './components/templates/Pizza';
import Camera from "./components/templates/Pizza/components/Camera";
import "./index.css";
import TopoMap from "./components/templates/TopoMap/TopoMap";
import useTopoMapStore from "./components/templates/TopoMap/topoMap.store";


//-------------------------

const getFile = async () => {
  let response = await fetch("http://localhost:3000/esri-grid", {
    method: "GET",
    headers: {
      'Content-Type': "application/json"
    }
  });

  let data = await response.text();
  return data;
}

function App() {
  const storeTopoMap = useTopoMapStore();

  useEffect(() => {
    getFile()
      .then(resp => {
        let lineArr = resp.split("\n");
        storeTopoMap.setTopoMap(lineArr);
        return 0;
      })
      .catch(err => console.log(err))
  }, []);
  useEffect(() => {
    console.log("STORE : data map")
    console.log(storeTopoMap.topoMap);
  }, [storeTopoMap.topoMap])



  return (
    <div id="canvas-container" className=" bg-slate-500 w-screen h-screen flex">
        <THREE.Canvas shadows>
          <TopoMap />
        </THREE.Canvas>
    </div>
  )
}

function OldApp() {
  return (
    <div id="canvas-container" className=" bg-slate-500 w-screen h-screen flex">

      <section className="flex-grow">
        <THREE.Canvas shadows>
          <ambientLight intensity={0.5} />
          <directionalLight color="white" position={[0, 0, 5]} />
          <Pizza />
          <PerspectiveCamera makeDefault position={[0, 2, 1]} />
          <Camera />
        </THREE.Canvas>
      </section>

      <section className=" w-1/3 flex  justify-center items-center">
        <PizzaConfigurator />
      </section>
    </div>
  )
}

export default App
