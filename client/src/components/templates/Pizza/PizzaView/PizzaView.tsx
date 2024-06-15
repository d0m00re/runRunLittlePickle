import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber';
import * as obj from "./../../../../assets/model";
import { useGLTF } from '@react-three/drei';
import usePizzaStore from './../Store/pizza.zustand';
import { infoSizePizza } from '../config/config';
import cloneDeep from "lodash/cloneDeep";
import { addVect3d } from '../utils/vect3d';
import { C_PI_RAD, IAnimationStep, IObjectInfo, animationStepList, generateStepAnimation, makeEmptyObjectInfo } from './pizzaView.logic';
import RenderIngr from './RenderIngr/RenderIngr';
import FireShader from '../../FireShader/FireShader';

// 0) init
// 1) generate step animation for current position / rot

function PizzaView() {
    const [animationStep, setAnimationStep] = useState(0);
    const [animationData, setAnimationData] = useState<IAnimationStep>()
    const [objectInfo, setObjectInfo] = useState<IObjectInfo>(makeEmptyObjectInfo());
    const pizzaModel = useGLTF(obj.pizzaRache);
    const toolModel = useGLTF(obj.pizzaTool);
    const hovenModel = useGLTF(obj.hoven);

    const meshRef = useRef<any>(null);
    const storePizza = usePizzaStore();

    useEffect(() => {
        const dataAnimStep = generateStepAnimation(animationStepList[animationStep]);
        setAnimationData(dataAnimStep);
    }, [animationStep])


    useEffect(() => {
        if (meshRef.current) {
            // Traverse through the scene to find the mesh and set its material

            {/*}
            meshRef.current?.traverse((child: any) => {
                if (child.name === "basePizza" || child.name === "centerPizza") {
                    child.material = new three.MeshStandardMaterial({ color: storePizza.colorBase })
                }
            })
        */}
        }
    }, [pizzaModel.scene, storePizza.colorBase]);

    useFrame(() => {
        storePizza.updateIngredient();

        if (storePizza.step === "waitCommand") {
            if (animationData && animationData?.nbStep && animationData?.nbStep > 0) {
                let dupObjectInfo = cloneDeep(objectInfo);

                // update
                dupObjectInfo.pizzaInfo.position = addVect3d(dupObjectInfo.pizzaInfo.position, animationData.object.pizzaInfo.position);
                dupObjectInfo.pizzaInfo.rotation = addVect3d(dupObjectInfo.pizzaInfo.rotation, animationData.object.pizzaInfo.rotation);
                dupObjectInfo.toolInfo.position = addVect3d(dupObjectInfo.toolInfo.position, animationData.object.toolInfo.position);
                dupObjectInfo.toolInfo.rotation = addVect3d(dupObjectInfo.toolInfo.rotation, animationData.object.toolInfo.rotation);

                // @ts-ignore
                setAnimationData(old => ({ ...old, nbStep: old?.nbStep - 1 }))
                setObjectInfo(dupObjectInfo);
            }
            else if (animationData?.nbStep === 0 && animationStep < animationStepList.length - 1) {
                setAnimationStep(old => old + 1);
            }
        }
    })

    return (
        <>
            <pointLight position={[0, 1, 0]} intensity={1} color="#fff" />
            <object3D
                scale={infoSizePizza[storePizza.size].scale}
                position={objectInfo.pizzaInfo.position}
                rotation={objectInfo.pizzaInfo.rotation}
            >
                <primitive
                    name="pizzaConfig"
                    object={pizzaModel.scene}
                    ref={meshRef}
                />
            </object3D>
            <object3D>
                {(storePizza.step === "buy" || storePizza.step === "waitCommand") ?
                    <object3D
                        position={objectInfo.toolInfo.position}
                        rotation={objectInfo.toolInfo.rotation}>
                        <primitive
                            name="pizzaTool"
                            object={toolModel.scene}
                            ref={meshRef}
                        />
                    </object3D> : <></>
                }

                {
                    (storePizza.step === "buy" || storePizza.step === "waitCommand") ?
                        <object3D
                            position={[3, 0, -5]}
                            rotation={[0, -C_PI_RAD / 2, 0]}
                        >
                            <primitive
                                name="hoven"
                                object={hovenModel.scene}
                                ref={meshRef}
                            />
                        </object3D> : <></>
                }

                {
                    (storePizza.step === "waitCommand") ? <FireShader /> : <></>
                }
                
            <meshStandardMaterial
                color={storePizza.colorBase}
            />
                <RenderIngr objectInfo={objectInfo} />
            </object3D>
            <axesHelper />
        </>
    )
}

export default PizzaView;