// src/store.ts
import { create } from 'zustand';
import * as entities from "./topoMap.entity";
import { IStats, makeEmptyIStats, parseTopoMap } from './topoMap.utils';
import { IVec3dField, IVect3d } from '@/utils/vect3d';



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
  setItinaryPtsListVp: (list: IVect3d[]) => void;

}

const useTopoMapStore = create<TopoMapState>((set) => ({
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
    console.log("****** store : ");
    console.log(list);

    let maxHeight = Math.max(...list.map(e => e[2]))
    let minHeight = Math.min(...list.map(e => e[2]))
    let distance = 0;

    console.log({
      maxHeight,
      minHeight,
      distance
    })

    set((state) => {
      return {
        ...state,
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