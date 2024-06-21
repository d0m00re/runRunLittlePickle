import { useEffect } from "react";

import * as THREE from "@react-three/fiber";
import "./index.css";
import TopoMap from "./components/templates/TopoMap/TopoMap";
import useTopoMapStore from "./components/templates/TopoMap/topoMap.store";
import { getFileMap, getFileItinary } from "./network/getFile";

import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';
import Option from "./components/templates/Action/Option";
function App() {
  const storeTopoMap = useTopoMapStore();

  // rework with allSettled
  useEffect(() => {
    // file map
    getFileMap()
      .then(resp => {
        let lineArr = resp.split("\n");
        storeTopoMap.setTopoMap(lineArr);
        return 0;
      })
      .catch(err => console.log(err));

    // file itinary
    getFileItinary()
      .then(resp => {
        // parse gps visorando file
        const parser = new XMLParser({
          ignoreAttributes : false
        });
        let jsonObj = parser.parse(resp);
        console.log("xml object : ")

        console.log(jsonObj)

        // extract all coord pts
        console.log("extract coord data : ")
        let gpsCoord = jsonObj.gpx.trk.trkseg.trkpt;
        gpsCoord = gpsCoord.map((e : any) => ({
          x : e["@_lon"],
          y : e["@_lat"],
          z : 0
        }));
        storeTopoMap.setItinaryPtsList(gpsCoord);
        return 0;
      })
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
  }, [storeTopoMap.topoMap])

  return (
    <div id="canvas-container" className=" bg-slate-500 w-screen h-screen flex">
      <THREE.Canvas shadows>
        <TopoMap />
      </THREE.Canvas>
      <Option />
    </div>
  )
}

export default App
