import { IVect3d } from '@/utils/vect3d';
import { Line } from '@react-three/drei';

type ILineItinary = {
    ptsList: IVect3d[];
    color?: string;
    lineWidth?: number;
}

function LineItinary(props: ILineItinary) {
    return (
        <Line
            points={props.ptsList}
            color={props.color ?? "black"}
            lineWidth={props.lineWidth ?? 5}
            dashed={false}
        />
    )
}

export default LineItinary