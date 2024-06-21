import React, {useState, useEffect} from 'react'

interface IPts {
    x: number;
    y: number;
}

const points: IPts[] = [
    {x : 0, y : 100},
    {x : 200, y : 150},
    {x : 250, y : 50},
    {x : 300, y : 150},

    {x : 399, y : 50},
];

const getY = (currentX : number, listPts : IPts[]) => {
    let startPtsIndex = -1;

    for (let x = 0; x < listPts.length - 1 && startPtsIndex === -1; x++) {
        console.log(`currentX : ${currentX}`)
        if (listPts[x + 1].x > currentX) {
            startPtsIndex = x;
        }
    }

    console.log("startPtsIndex : ", startPtsIndex);

    if (startPtsIndex === -1) return undefined;

    // calculate y
    let diffX = listPts[startPtsIndex + 1].x - listPts[startPtsIndex].x;
    let diffX2 = listPts[startPtsIndex + 1].x - currentX;

    // % courb
    let xPercentRel = 1 - diffX2 / diffX;

    let diffY = listPts[startPtsIndex + 1].y - listPts[startPtsIndex].y;
    let currentY = listPts[startPtsIndex].y + (diffY * xPercentRel)

    // 
    console.log("currentY : ", currentY);
    return currentY;

}

interface IChart {
    width : number;
    height : number;
    currPts : IPts;
    setCurrPts : (pts : IPts) => void;
    ptsList : IPts[];
}

function Chart(props : IChart) {

    useEffect(() => {
      console.log("rerender salope")
    }, [props.currPts])
    

    return (
        <svg
            width="400"
            height="200"
            onMouseMove={(e) => {
               // console.log("mouse evenrt : ")    
               // console.log(e)
                props.setCurrPts({
                    x : e.clientX,
                    y : getY(e.clientX, props.ptsList) ?? 0// e.clientY
                })
            }}
        >
            <polyline
                fill="none"
                stroke="black"
                strokeWidth="2"
                points={points.map(p => `${p.x},${p.y}`).join(' ')}
            />
            {props.ptsList.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r="4" fill="red" />
            ))}

        <line x1="0" y1="80" x2="400" y2="80" stroke="black" />
        <line x1={props.currPts.x} y1="0" x2={props.currPts.x} y2="200" stroke="blue" />
        <circle fill="red" cx={props.currPts.x} cy={props.currPts.y} r="6" stroke="yellow"/>
        </svg>
    )
}

function Option() {
    const [pts, setPts] = useState<IPts>({x : 100, y : 100});
    return (
        <section className='absolute z-10'>
            <main className='flex bg-slate-50'>
                <Chart
                    width={400}
                    height={200}
                    currPts={pts}
                    setCurrPts={setPts}
                    ptsList={points}
                />
            </main>
        </section>
    )
}

export default Option