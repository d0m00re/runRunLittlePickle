import { useGLTF } from '@react-three/drei';
import usePizzaStore from '../../Store/pizza.zustand';
import { addVect3d } from '../../utils/vect3d';
import * as obj from "./../../../../../assets/model";
import { IObjectInfo } from '../pizzaView.logic';
import { TKindIngrediant } from '../../config/config';

type IRenderIngr = {
    objectInfo : IObjectInfo;
}

function RenderIngr(props : IRenderIngr) {
    const storePizza = usePizzaStore();
    const oliveModel = useGLTF(obj.olive);
    const chorizoModel = useGLTF(obj.chorizon);
    const mushroomModel = useGLTF(obj.mushroomSlice);
    const cheeseModel = useGLTF(obj.cheese);

    const getModelWithKind = (kind : TKindIngrediant) => {
        switch(kind) {
            case "olive":
                return oliveModel.scene.clone();
            case "chorizon" :
                return chorizoModel.scene.clone();
            case "mushroom" :
                return mushroomModel.scene.clone();
            case "cheese":
                return cheeseModel.scene.clone();
            default :
                return mushroomModel.scene.clone();
        }
    }

    return (
        <>
            {
                storePizza.ingredients.map(e => <object3D
                    key={`${e.kind}-${e.id}`}
                    rotation={e.rot}
                    position={addVect3d(e.pos, props.objectInfo.pizzaInfo.position)}
                >
                    <primitive
                        object={getModelWithKind(e.kind)}
                    />
                </object3D>)
            }
        </>
    )
}

export default RenderIngr