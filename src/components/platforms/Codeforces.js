import { useState, useEffect } from 'react';
import GenericGraph from '../graphs/GenericGraph';
import UserTable from './UserTable';
import Year from './Year';

import'./platforms.css'

var graph_height =  Math.floor(window.innerHeight*0.35)
if(window.innerWidth<400)
    graph_height =  Math.floor(window.innerHeight*0.3)
graph_height = Math.max(graph_height,175)

export function CodeforcesDisplay(){
    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/codeforces/`)
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
            text: "Total Problems Solved" ,
            fontFamily: "verdana",   
        },
        axisY: {
            // title: "No. of skills",
            includeZero: false,
            gridColor: "white",
            // interlacedColor: interlaced_color,
            interval: 10,
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
        colorSet:"blackToBlue",	
        data: [
            {        
                // color: "#B0D0B0",
                type: "column",  
                // showInLegend: true, 
                dataPoints : year.filter(user=> typeof user.totalProblemSolved == "number").map((user)=>{
                        return {y:user.totalProblemSolved, label:user.name};
                })

            }
        ]
    }

    const options_2 = {
        animationEnabled: true,
        // exportEnabled: true,
        height:graph_height,
        title:{
            text: "Contest Rating" ,
            fontFamily: "verdana",   
        },
        axisY: {
            // title: "No. of skills",
            includeZero: false,
            gridColor: "white",
            reversed :true,
            // interlacedColor: interlaced_color,
            interval: 200,
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
                color: "#e5b3fe",
                type: "splineArea",  
                // showInLegend: true, 
                dataPoints : year.filter(user=> typeof user.contestRating == "number").map((user)=>{
                        return {y:user.contestRating, label:user.name};
                })
            },
        ]
    }

    const options_3 = {
        animationEnabled: true,
        // exportEnabled: true,
        height:graph_height,
        title:{
            text: "Followers Count" ,
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
                color: "#7bf1a8",
                type: "line",  
                // showInLegend: true, 
                dataPoints : year.filter(user=> typeof user.friendOfCount == "number").map((user)=>{
                        return {y:user.friendOfCount, label:user.name};
                })
            },
        ]
    }

    console.log(data,year)

    const table = year.filter(user=> typeof user.codeforces_score == "number" && user.codeforces_score!=0).map((user)=>{return {name:user.name,
        value: Math.round(user.codeforces_score),email:user.email}})

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

