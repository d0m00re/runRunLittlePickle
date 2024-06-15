import React from 'react'
import useStorePizza from "./../../Store/pizza.zustand";
import { IGenIngredientElem, TKindIngrediant, infoIngredient, kindIngrArr } from '../../config/config';
import { genPosRandom } from '../../utils/utils';
import { Button } from '@/components/ui/button';
import IconPlus from '@/components/atoms/icons/IconPlus';
import IconDecr from '@/components/atoms/icons/IconDecr';

/**
 * generate new pts
 * @param kind 
 * @returns 
 */
const newDataIngrediantGeneration = (kind: TKindIngrediant) => {
    let nbPopPts = infoIngredient[kind].nbPop;
    let arrPts: IGenIngredientElem[] = [];

    for (let i = 0; i < nbPopPts; i++) {
        arrPts.push({
            pos: genPosRandom(),
            rot: [0, Math.random() * 2, 0]
        });
    }
    return arrPts;
}

interface IIngredientAddDecr {
    children: string;
    add: () => void;
    decr: () => void;
}

const IngredientAddDecr = (props: IIngredientAddDecr) => {
    return (
        <section className='flex flex-row justify-between gap-2 items-center'>
            <Button onClick={props.add}>
                <IconPlus />
            </Button>
            <span>{props.children}</span>
            <Button onClick={props.decr}>
                <IconDecr />
            </Button>
        </section>
    )
}

const IngredientSelector = () => {
    const storePizza = useStorePizza();

    return (
        <section className='flex flex-col gap-2'>
            <h3 className=' text-xl'>aliments </h3>
            <div className='flex flex-col gap-2'>
                {
                    kindIngrArr.map(e => <IngredientAddDecr
                        key={`ingr-selector-${e}`}
                        add={() => storePizza.addListIngr(e, newDataIngrediantGeneration(e))}
                        decr={() => storePizza.deleteListIngr(e)}
                    >
                        {e}
                    </IngredientAddDecr>)
                }
            </div>
        </section>)
}

export default IngredientSelector