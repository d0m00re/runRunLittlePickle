// src/store.ts
import { create } from 'zustand';
import type { } from '@redux-devtools/extension'; // required for devtools typing
import * as entities from "./topoMap.entity";
import { parseTopoMap } from './topoMap.utils';

type TTmpType = {x : number, y : number};

export interface TopoMapState {
    topoMap: entities.IDataMap | undefined;
    itinaryPtsList : TTmpType[];
    setTopoMap: (data: string[]) => void;
    setItinaryPtsList : (list : TTmpType[]) => void;
}

const useTopoMapStore = create<TopoMapState>((set) => ({
    topoMap: undefined,
    itinaryPtsList : [],
    setItinaryPtsList: (list : TTmpType[]) => {
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
    }
}));

export default useTopoMapStore;

/*
ingredients: IGenIngredient[];
setColorBase: (color: string) => void;

addIngredient: (kind: TKindIngrediant, data : IGenIngredientElem) => void;
addListIngr: (kind: TKindIngrediant, datas : IGenIngredientElem[]) => void;
deleteListIngr : (kind : TKindIngrediant) => void;
updateIngredient: () => void;
setAllIngredient: (ingredient: IGenIngredient[]) => void;

size : TKindPizzaSize;
setSize : (size : TKindPizzaSize) => void;

step : TStepKind;
prevStep : () => void;
nextStep : () => void;
*/
//}

/*
const usePizzaStore = create<PizzaState>((set) => ({
  colorBase: 'red',
  setColorBase: (color) => set(() => ({ colorBase: color })),
  ingredients: [],
  step : "chooseSize",
  prevStep : () => {
    set((state) => {
      if (state.step === "chooseIngrediant")
          state.step = "chooseSize";
      else if (state.step === "buy")
          state.step = "chooseIngrediant";
      else if (state.step === "waitCommand")
          state.step = "buy";
      return {...state};
    })
  },
  nextStep : () => {
    console.log("next step")
    set((state) => {
      console.log(`--> ${state.step}`)
      if (state.step === "chooseSize")
          state.step = "chooseIngrediant";
      else if (state.step === "chooseIngrediant")
          state.step = "buy";
      else if (state.step === "buy")
          state.step = "waitCommand";
      return {...state};
    })
  },
  addIngredient: (kind, data) =>
    set((state) => ({
      ...state,
      ingredients: [
        ...state.ingredients,
        {
          kind: kind,
          id: nextId++,
          pos : data.pos,
          rot : data.rot,
          velocity: [0, 0, 0]
        },
      ]
    })),
  addListIngr: (kind, datas) => {
    let newIngredients : IGenIngredient[] = datas.map((data, i) => ({
      kind : kind,
      pos : data.pos,
      rot : data.rot,
      velocity : [0,0,0],
      id : nextId + i
    }));

    nextId += newIngredients.length;

    set((state) => ({
      ...state,
      ingredients: [
        ...state.ingredients,
        ...newIngredients
      ]
    }))
  },
  deleteListIngr : (kind) => {
    // les count nb delete
    let nbDelete = infoIngredient[kind].nbPop;
    let countNbDelete = 0;
    set((state) => {
      let newArr : IGenIngredient[] = [];
      let newListIngredient = state.ingredients;
      for (let i = 0; i < newListIngredient.length; i++) {
        let currElem = newListIngredient[i];
        if ((kind !== currElem.kind) || (countNbDelete === nbDelete)) {
          newArr.push(currElem);
        } else {
          countNbDelete++;
        }
      }
      return {...state, ingredients : newArr};
    })
  } ,
  updateIngredient: () =>
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) => ({
        ...ingredient,
        pos: [
          ingredient.pos[0],
          Math.max(ingredient.pos[1] + ingredient.velocity[1], infoIngredient[ingredient.kind].endZ),
          ingredient.pos[2],
        ],
        velocity: [
          ingredient.velocity[0],
          ingredient.velocity[1] - 0.01, // Apply gravity
          ingredient.velocity[2],
        ],
      })),
    })),
  setAllIngredient: (ingredients) => set({ ingredients }),

  size : "small",
  setSize : (size) => set({size})
}));
*/