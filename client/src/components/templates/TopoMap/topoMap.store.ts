// src/store.ts
import { create } from 'zustand';
import * as entities from "./topoMap.entity";
import { parseTopoMap } from './topoMap.utils';
import { IVec3dField, IVect3d } from '../Pizza/utils/vect3d';

export interface TopoMapState {
    topoMap: entities.IDataMap | undefined;
    setTopoMap: (data: string[]) => void;
    itinaryPtsList : IVec3dField[];
    setItinaryPtsList : (list : IVec3dField[]) => void;

    itinaryPtsListVp : IVect3d[];
    setItinaryPtsListVp : (list : IVect3d[]) => void;

  }

const useTopoMapStore = create<TopoMapState>((set) => ({
    topoMap: undefined,
    itinaryPtsList : [],
    itinaryPtsListVp : [],
    setItinaryPtsList: (list : IVec3dField[]) => {
      set((state) => {
        return {
          ...state,
          itinaryPtsList : list
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
    setItinaryPtsListVp : (list : IVect3d[]) => {
      set((state) => {
        return {
          ...state,
          itinaryPtsListVp : list
        }
      })
    },
}));

export default useTopoMapStore;