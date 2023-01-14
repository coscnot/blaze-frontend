import { useEffect } from "react";
import {useState} from "react";

export default function Counter(props)
{
    const [curr,setCurr] = useState(0);
    const value = props.value;
    var duration = props.duration*1000;
    var increment = duration/value;
    console.log(props.value,curr);
    useEffect(()=>{
        if(curr<value)
        {
            setTimeout(()=>{setCurr(curr+1)},increment);
        }
    },[curr])

    useEffect(()=>{
        if(curr==0 && props.value>0)
            setCurr(1);    
        else
            setCurr(0);
    },[props.year])

    return Math.ceil(curr);
}