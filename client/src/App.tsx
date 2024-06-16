import { useEffect } from "react";

import * as THREE from "@react-three/fiber";
import "./index.css";
import TopoMap from "./components/templates/TopoMap/TopoMap";
import useTopoMapStore from "./components/templates/TopoMap/topoMap.store";
import { getFile } from "./network/getFile";

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

export default App
