import { useState, useEffect } from 'react';
import GenericGraph from '../graphs/GenericGraph';
import UserTable from './UserTable';
import Year from './Year';

import'./platforms.css'

var graph_height =  Math.floor(window.innerHeight*0.35)
if(window.innerWidth<400)
    graph_height =  Math.floor(window.innerHeight*0.3)
graph_height = Math.max(graph_height,175)

var interlaced_color ="#F1F5F7";

export function CodechefDisplay(){
    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/codechef/`)
            .then(resp => resp.json())
            .then((resp) => {
                setData(resp)
                setYear(resp)
            })
        }, [])

    if(data===null)
    {
        return;
    }

    
    const options_1 = {
        animationEnabled: true,
        // exportEnabled: true,
        height:graph_height,
        title:{
            text: "Contest Particpated" ,
            fontFamily: "verdana",   
        },
        axisY: {
            includeZero: false,
            gridColor: "white",
            interval: 4,
            labelFontSize: 7,
            labelFontWeight: "lighter",
            titleFontColor: "#595959",
            labelFontColor: "#595959",
            lineColor: "#595959",
            tickLength: 1,
            lineThickness: 0,
            includeZero: false,
        },
        axisX:{
            title:"Name",
            labelFontSize: 0,
            tickThickness: 0,
            titleFontColor: "#595959",
            labelFontColor: "#595959",
            lineColor: "#595959",
            lineThickness: 0,
        },
        data: [
            {        
                color:"#ffee93",
                type: "splineArea",  
                dataPoints : year.filter(user=> typeof user.contest_participated_count == "number").map((user)=>{
                    return {y:user.contest_participated_count, label:user.name};
                })
            },
        ]
    }

    const options_2 = {
        animationEnabled: true,
        // exportEnabled: true,
        height:graph_height,
        title:{
            text: "Badges won" ,
            fontFamily: "verdana",   
        },
        axisY: {
            includeZero: false,
            gridColor: "white",
            // interlacedColor: interlaced_color,
            interval: 4,
            labelFontSize: 7,
            labelFontWeight: "lighter",
            titleFontColor: "#595959",
            labelFontColor: "#595959",
            lineColor: "#595959",
            tickLength: 1,
            lineThickness: 0,
            includeZero: false,
        },
        axisX:{
            title:"Name",
            labelFontSize: 0,
            tickThickness: 0,
            titleFontColor: "#595959",
            labelFontColor: "#595959",
            lineColor: "#595959",
            lineThickness: 0,
        },
        theme: "light2",
        data: [
            {        
                
                type: "doughnut",  
                dataPoints : year.filter(user=>Array.isArray(user.badges)).map((user)=>{
                        return {y:user.badges.length, label:user.name};
                })

            }
        ]
    }

    const options_3 = {
        animationEnabled: true,
        // exportEnabled: true,
        height:graph_height,
        title:{
            text: "Total Problems Solved" ,
            fontFamily: "verdana",   
        },
        axisY: {
            includeZero: false,
            gridColor: "white",
            interval: 4,
            labelFontSize: 7,
            labelFontWeight: "lighter",
            titleFontColor: "#595959",
            labelFontColor: "#595959",
            lineColor: "#595959",
            tickLength: 1,
            lineThickness: 0,
            includeZero: false,
        },
        axisX:{
            title:"Name",
            labelFontSize: 0,
            tickThickness: 0,
            titleFontColor: "#595959",
            labelFontColor: "#595959",
            lineColor: "#595959",
            lineThickness: 0,
        },
        colorSet:"blackToGreen",
        data: [
            {        
                type: "column",  
                dataPoints : year.filter(user=> typeof user.problems_solved == "number").map((user)=>{
                    return {y:user.problems_solved, label:user.name};
                })
            },
        ]
    }

    const table = year.filter(user=>typeof user.codechef_score =="number" && user.codechef_score!=0).map((user)=>{return {name:user.name,
        value: Math.round(user.codechef_score),email:user.email}})

    table.sort(function(a,b) {
        return a.value - b.value;
    });     

    return(
        <>
            <div className="col-lg-6 col-sm-8" style={{marginTop:"1%",backgroundColor:"#F1F5F7",padding:"1%"}}>
                <div>
                    <Year data = {data} setYear = {setYear} year={year}/>
                    <div className='graphs' style={{padding:"3% 3% 0%"}}><GenericGraph options={options_1} /></div>
                    <div className='graphs' style={{padding:"3% 3% 0%"}}><GenericGraph options={options_2}/></div>
                    <div className='graphs' style={{padding:"3% 3% 0%"}}><GenericGraph options={options_3}/></div>
                </div>
            </div>

            <div className="col-lg-3 col-sm-8 offset-lg-0 offset-sm-4" style={{marginTop:"1%",backgroundColor:"#F1F5F7",padding:"1%"}}>
                <UserTable user_values={table} bgcolor="#F1F5F7" />
            </div>
        </>
    );
}

