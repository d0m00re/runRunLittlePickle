import cloneDeep from "lodash/cloneDeep";
import { IVect3d } from "../utils/vect3d";

export const C_PI_RAD = 3.1415926536;

export interface IObjectInfo {
    pizzaInfo: {
        position: IVect3d;
        rotation: IVect3d;
    },
    toolInfo: {
        position: IVect3d;
        rotation: IVect3d;
    }
}

/**
 * each array elem describe animation step with target position and rotation
 */
export interface IAnimationStep {
    object: IObjectInfo;
    nbStep: number;
}

export const makeEmptyObjectInfo = (): IObjectInfo => {
    return {
        pizzaInfo: {
            position: [0, 0, 0],
            rotation: [0, 0, 0]
        },
        toolInfo: {
            position: [0, -0.1, 0],
            rotation: [0, 0, 0]
        }
    }
}

export const animationStepList: IAnimationStep[] = [
    {
        object: {
            pizzaInfo: {
                position: [3, 0, 0],
                rotation: [0, 0, 0]
            },
            toolInfo: {
                position: [3, 0, 0],
                rotation: [0, -(C_PI_RAD / 2), 0]
            }
        },
        nbStep: 50
    }, {
        object: {
            pizzaInfo: {
                position: [0, 0, -4],
                rotation: [0, 0, 0]
            },
            toolInfo: {
                position: [0, 0, -4],
                rotation: [0, 0, 0]
            }
        },
        nbStep: 50
    }, {
        object: {
            pizzaInfo: {
                position: [0, 0, 0],
                rotation: [0, 0, 0]
            },
            toolInfo: {
                position: [0, 0, 10],
                rotation: [0, 0, 0]
            }
        },
        nbStep: 50
    }
];

const generatePointIncrement = (pts: IVect3d, nbStep: number): IVect3d => {
    return [
        pts[0] / nbStep,
        pts[1] / nbStep,
        pts[2] / nbStep
    ];
}

export const generateStepAnimation = (animationStepL: IAnimationStep): IAnimationStep => {

    let _animationStep = cloneDeep(animationStepL);
    //
    _animationStep.object.pizzaInfo.position = generatePointIncrement(_animationStep.object.pizzaInfo.position, _animationStep.nbStep);
    _animationStep.object.pizzaInfo.rotation = generatePointIncrement(_animationStep.object.pizzaInfo.rotation, _animationStep.nbStep);

    _animationStep.object.toolInfo.position = generatePointIncrement(_animationStep.object.toolInfo.position, _animationStep.nbStep);
    _animationStep.object.toolInfo.rotation = generatePointIncrement(_animationStep.object.toolInfo.rotation, _animationStep.nbStep);


    return {
        object: _animationStep.object,
        nbStep: _animationStep.nbStep
    };
}