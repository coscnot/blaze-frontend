import {github} from '../../data/github'
import GenericGraph from '../graphs/GenericGraph';
import UserTable from './UserTable';
import Year from './Year';
import { useState, useEffect } from 'react';

import'./platforms.css'

var graph_height =  Math.floor(window.innerHeight*0.35)
if(window.innerWidth<400)
    graph_height =  Math.floor(window.innerHeight*0.3)
graph_height = Math.max(graph_height,175)

var interlaced_color ="#F1F5F7";

// pie chart data calculation
function pieDataCalculation(data){
    var language_collections = {}
    data.filter(user => Array.isArray(user.tech_stack)).map((user)=>{
        var data = user.tech_stack
        for(var lang in data)
        {
            if(data[lang] in language_collections)
                language_collections[data[lang]]+=1;
            else
                language_collections[data[lang]]=1;
        }
    })

    var pie_data = []
    for (const [key, value] of Object.entries(language_collections)) {
        pie_data.push(
            {
                "y":value,
                "indexLabel":key,
            }
        )
    }
    return pie_data
}



export function GithubDisplay(){

    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/github/`)
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
        title: {
            text: "Total No. of Repositories",
            fontFamily: "verdana"
        },
        axisY: {
            // title: "No. of Repositories",
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
        toolTip: {
            shared: true,
            shared: true,
            fontSize:13,
            reversed: true,
            borderThickness: 0,
            backgroundColor: "rgba(255,255,0,0)",
            borderColor: "rgba(255,255,0,0)",
            animationEnabled: true,
        },
        legend: {
            // verticalAlign: "top",
            // horizontalAlign: "right",
            // reversed: true,
            // dockInsidePlotArea: true,
        },
        data: [{
                type: "column",
                color:"#8367c7",
                name: "No. of Repos",
                // showInLegend: true,
                legendText: "No. of Repos",
                // dataPoints: github.map((user)=>{return {label: user.name, y: user.noOfRepositories}})
                dataPoints: year.filter(user=>typeof user.no_of_repositories == "number").map((user)=>{return {label: user.name, y: user.no_of_repositories}})
            }]
    }
       
    const options_2 = {
        // theme: "light2",
        title:{
            text: "Most languages used in Repositories",
            fontFamily: "verdana",
            // fontSize: 18,
        },	
        colorSet:"blueToBlack",	
        data: [
        {       
            type: "pie",
            // showInLegend: true,
            
            toolTipContent: "{y} - #percent %",
            yValueFormatString: "#",
            legendText: "{indexLabel}",
            dataPoints: pieDataCalculation(year),
        }
        ]
    }
        
    const options_3 = {
        animationEnabled: true,
        // exportEnabled: true,
        height:graph_height,
        title: {
            text: "Total Strength of connection",
            fontFamily: "verdana"
        },
        axisY: {
            title: "No. of Followers + Following",
            includeZero: false,
            gridColor: "white",
            // interlacedColor: interlaced_color,
            interval: 5,
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
        toolTip: {
            enabled: true, 
            shared: true,
            fontSize:13,
            reversed: true,
            borderThickness: 0,
            backgroundColor: "rgba(255,255,0,0)",
            borderColor: "rgba(255,255,0,0)",
            animationEnabled: true,
            // fontColor: "black",
        },
        legend: {
            dockInsidePlotArea: true,
			verticalAlign: "top",
			horizontalAlign: "right",               
            maxHeight: 13,
        },
        data: [
        {
            type: "stackedColumn",
            name: "Follower",
            showInLegend: true,
            color:"#1a7431",
            dataPoints: year.filter(user=>typeof user.no_of_followers == "number").map((user)=>{return {label: user.name, y: user.no_of_followers}})
        },
        {
            type: "stackedColumn",
            name: "Following",
            color:"#6bd425",
            showInLegend: true,
            dataPoints: year.filter(user=>typeof user.no_of_following == "number").map((user)=>{return {label: user.name, y: user.no_of_following}})
        },]
    }

    
    const table = year.filter(user=>typeof user.github_score=="number").map((user)=>{return {name:user.name,
        value: Math.round(user.github_score),email:user.email}})
        
    table.sort(function(a,b) {
        return b.value - a.value;
    });

    return(
        <>
            <div className="col-lg-6 col-sm-8" style={{marginTop:"1%",backgroundColor:"#F1F5F7",padding:"1%"}}>
                <div>
                    <Year data = {data} setYear = {setYear} year={year}/>
                    <div className='graphs' style={{padding:"3% 3% 0%"}}><GenericGraph options={options_1}/></div>
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

