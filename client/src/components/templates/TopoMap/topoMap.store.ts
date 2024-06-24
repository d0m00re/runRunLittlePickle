// src/store.ts
import { create } from 'zustand';
import * as entities from "./topoMap.entity";
import { IStats, makeEmptyIStats, parseTopoMap } from './topoMap.utils';
import { IVec3dField, IVect3d } from '@/utils/vect3d';
import { CatmullRomCurve3, Vector3 } from 'three';
 

export type TStatusPlayer = "play" | "stop";

const revStatusPlayer = (status : TStatusPlayer) => {
  return (status === "play") ? "stop" : "play";
}

export interface TopoMapState {
  stats : IStats;
  setStats : (stats : IStats) => void;


  statusPlayer: TStatusPlayer;
  setStatusPlayer: (status: TStatusPlayer) => void,
  revStatusPlayer: () => void,
  currentStep: number;
  setCurrentStep: (step: number) => void;
  incrCurrentStep: () => void;
  decrCurrentStep: () => void;


  topoMap: entities.IDataMap | undefined;
  setTopoMap: (data: string[]) => void;
  itinaryPtsList: IVec3dField[];
  setItinaryPtsList: (list: IVec3dField[]) => void;

  itinaryPtsListVp: IVect3d[];
  curve : CatmullRomCurve3 | undefined;
  setItinaryPtsListVp: (list: IVect3d[]) => void;

}

const useTopoMapStore = create<TopoMapState>((set) => ({
  curve : undefined,
  stats : makeEmptyIStats(),
  setStats : (stats : IStats) => {
    set((state) => {
      return {
        ...state,
        stats
      }
    })
  },
  statusPlayer: "play",
  setStatusPlayer: (status: TStatusPlayer) => {
    set((state) => {
      return {
        ...state,
        statusPlayer: status
      }
    })
  },

  revStatusPlayer: () => {
    set((state) => {
      return {
        ...state,
        statusPlayer : revStatusPlayer(state.statusPlayer)
      }
    })
  },

  currentStep: 0,
  setCurrentStep: (step: number) => {
    set((state) => {
      return {
        ...state,
        currentStep: step
      }
    });
  },
  incrCurrentStep: () => {
      set((state) => {
        return (state.currentStep < state.itinaryPtsListVp.length) ? {
          ...state,
          currentStep: state.currentStep + 1
        } : state;
      });
  },
  decrCurrentStep: () => {
    set((state) => {
      return {
        ...state,
        currentStep: state.currentStep - 1
      }
    });
  },

  topoMap: undefined,
  itinaryPtsList: [],
  itinaryPtsListVp: [],
  setItinaryPtsList: (list: IVec3dField[]) => {
    set((state) => {
      return {
        ...state,
        itinaryPtsList: list
      }
    })
  },
  setTopoMap: (rows: string[]) => {
    let topoMap = parseTopoMap(rows);
    set((state) => {
      return {
        ...state,
        topoMap
      }
    })
  },
  setItinaryPtsListVp: (list: IVect3d[]) => {
    let maxHeight = Math.max(...list.map(e => e[2]))
    let minHeight = Math.min(...list.map(e => e[2]))
    let distance = 0;

    // calcul total distance
    const listPts = list.map(e => {
      return new Vector3(e[0], e[1], e[2]);
    });

    console.log("----> curve :")
    let curve = new CatmullRomCurve3(listPts);
   // const curve = new THREE

   // list pts
   console.log("----- list pts")
    console.log(list)
    set((state) => {
      return {
        ...state,
        curve : curve,
        stats : {
          maxHeight : maxHeight,
          minHeight : minHeight,
          distance
        },
        itinaryPtsListVp: list
      }
    })
  },
}));

export default useTopoMapStore;