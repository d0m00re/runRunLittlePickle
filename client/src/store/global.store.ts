import { IVect3d } from "@/utils/vect3d";
import { create } from "zustand";

interface ICamera {
    pos : IVect3d;
    target : IVect3d;
}

interface IGlobalStore {
    camera : ICamera
}

const makeEmptyGlobalStore = () : IGlobalStore => {
    return {
        camera : {
            pos : [0, 0, 0],
            target : [0, 0, 0]
        }
    }
}

interface IGlobalStoreState {
    data : IGlobalStore;
    setCamera : (props : ICamera) => void;
}

const useGlobalStore = create<IGlobalStoreState>((set) => ({
    data : makeEmptyGlobalStore(),
    setCamera : (camera : ICamera) => {
        set((state) => {
            return {
              ...state,
              data : {
                ...state.data,
                camera : camera
              }
            }
          })
    }

}))

export default useGlobalStore;