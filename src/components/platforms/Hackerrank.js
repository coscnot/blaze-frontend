import { useState, useEffect } from 'react';
import GenericGraph from '../graphs/GenericGraph';
import UserTable from './UserTable';
import Year from './Year';
import'./platforms.css'

var graph_height =  Math.floor(window.innerHeight*0.35)
if(window.innerWidth<400)
    graph_height =  Math.floor(window.innerHeight*0.3)
graph_height = Math.max(graph_height,175)


export function HackerrankDisplay(){
    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/hackerrank/`)
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
            text: "Total Certificates and Badges" ,
            fontFamily: "verdana",   
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "right",
            cursor:"pointer",
            reversed: true,
            dockInsidePlotArea: true,
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
                type: "splineArea",  
                showInLegend: true, 
                legendText:"Badges",
                dataPoints : year.map((user)=>{
                    if (Array.isArray(user.badges))
                        return {y:user.badges.length, label:user.name};
                    return {y:0, label:user.name};
                })
            },
            {        
                type: "splineArea",  
                showInLegend: true, 
                legendText:"Certificates",
                dataPoints : data.map((user)=>{
                    if (Array.isArray(user.certificates))
                        return {y:user.certificates.length, label:user.name};
                    return {y:0, label:user.name};
                        
                })

            }
        ]
    }

    const options_2 = {
        animationEnabled: true,
        height:graph_height,
        title:{
            text: "Followers Count" ,
            fontFamily: "verdana",   
        },
        axisY: {
            includeZero: false,
            gridColor: "white",
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
        data: [
            {        
                color: "#aacc00",
                type: "line",  
                // showInLegend: true, 
                dataPoints : year.filter(user=>typeof user.followers_count =="number").map((user)=>{
                        return {y:user.followers_count, label:user.name};
                })
            },
        ]
    }

    const options_3 = {
        animationEnabled: true,
        height:graph_height,
        title:{
            text: "Score By Track" ,
            fontFamily: "verdana",   
        },
        axisY: {
            includeZero: false,
            gridColor: "white",
            interval: 300,
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
                color: "#ffd670",
                type: "column",  
                // showInLegend: true, 
                dataPoints : year.filter(user=>typeof user.score_elo =="number").map((user)=>{
                        return {y:user.score_elo, label:user.name};
                })
            },
        ]
    }

    const table = year.filter(user=> typeof user.hackerrank_score=="number").map((user)=>{return {name:user.name,
        value: Math.round(user.hackerrank_score),email:user.email}})

    table.sort(function(a,b) {
        return b.value - a.value;
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



