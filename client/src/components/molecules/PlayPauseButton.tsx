import React from 'react';
import {Play, Pause} from "lucide-react";
import { TStatusPlayer } from '../templates/TopoMap/topoMap.store';

type Props = {
    status : TStatusPlayer;
    onClick : () => void;
}

const PlayPauseButton = (props: Props) => {
  return (
    <div onClick={props.onClick} className=' rounded-[50%] p-2 cursor-pointer bg-green-200'>
    {
        (props.status === "play") ? <Play /> : <Pause />
    }  
    </div>
  )
}

export default PlayPauseButton