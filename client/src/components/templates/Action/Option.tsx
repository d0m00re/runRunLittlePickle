import React, { useState, useEffect } from 'react'
import useTopoMapStore from '../TopoMap/topoMap.store';
import transformPtsList, { IPts2d } from './transformPtsList';
import getY from './getY';

interface IChart {
    width: number;
    height: number;
    currPts: IPts2d;
    setCurrPts: (pts: IPts2d) => void;
    ptsList: IPts2d[];

    currentStep : number;

    onClick : (clientX : number) => void;
}

function Chart(props: IChart) {
    useEffect(() => {
        
    }, [props.currentStep])


    let xIncrement = props.width / props.ptsList.length;
    let currentX = xIncrement * props.currentStep;
    let currentY = getY(currentX, props.ptsList);

    console.log(`current step turn : ${props.currentStep}`);


    return (
        <svg
            width="400"
            height="200"
            onClick={(e) => {
                    props.onClick(e.clientX);
            }}
            
            onMouseMove={(e) => {
                // console.log("mouse evenrt : ")    
                // console.log(e)
                props.setCurrPts({
                    x: e.clientX,
                    y: getY(e.clientX, props.ptsList) ?? 0// e.clientY
                })
            }}
        >
            <polyline
                fill="none"
                stroke="black"
                strokeWidth="2"
                points={props.ptsList.map(p => `${p.x},${p.y}`).join(' ')}
            />

            <line x1="0" y1="80" x2="400" y2="80" stroke="black" />
            <line x1={props.currPts.x} y1="0" x2={props.currPts.x} y2="200" stroke="blue" />
            <circle fill="red" cx={currentX} cy={currentY} r="6" stroke="yellow" />
        </svg>
    )
}
//            <circle fill="red" cx={props.currPts.x} cy={props.currPts.y} r="6" stroke="yellow" />



function Option() {
    const storeTopoMap = useTopoMapStore();

    const [pts, setPts] = useState<IPts2d>({ x: 100, y: 100 });
    const [ptsList, setPtsList] = useState<IPts2d[]>([]);

    useEffect(() => {
        let arrVp = storeTopoMap.itinaryPtsListVp;
        if (arrVp.length) {
            let arrPts = transformPtsList(arrVp, 400, 200);
            setPtsList(arrPts);
        }
    }, [storeTopoMap.itinaryPtsListVp])
    
    /*
    solu 1 : create new array with each pts with custom x
    solu 2 : calculate on the fly
    */
    return (
        <>
            {(storeTopoMap.itinaryPtsListVp.length) ?
                <section className='absolute z-10'>

                    <main className='flex bg-slate-50'>
                        <Chart
                            width={400}
                            height={200}
                            currPts={pts}
                            setCurrPts={setPts}
                            ptsList={ptsList}
                            currentStep={storeTopoMap.currentStep}
                            onClick={(clientX : number) => {
                                // 
                                console.log("let s go ")
                                console.log(clientX);
                                let _xIncrement = 400 / ptsList.length;
                                let currentX = _xIncrement * clientX;
                                let findCurrentStep = Math.floor(clientX / _xIncrement);
                                console.log("current step : ", findCurrentStep);
                                storeTopoMap.setCurrentStep(findCurrentStep);
                            }}
                        />
                    </main>
                </section> : <></>
            }
        </>
    )
}

export default Option;
//                        <p>{400 / storeTopoMap.itinaryPtsListVp.length}</p>
