import { useState, useEffect } from 'react';
import GenericGraph from '../graphs/GenericGraph';
import UserTable from './UserTable';
import Year from './Year';
import'./platforms.css'
import { propTypes } from 'react-bootstrap/esm/Image';

var graph_height =  Math.floor(window.innerHeight*0.35)
if(window.innerWidth<400)
    graph_height =  Math.floor(window.innerHeight*0.3)

graph_height = Math.max(graph_height,175)

var interlaced_color ="#F1F5F7";

export function LeetcodeDisplay(){
    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    const [search,setSearch] = useState(null)       //used for filtering data of diiferent members
    useEffect(() => {
        fetch(`https://coscnot.pythonanywhere.com/api/leetcode/`)
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
            text: "Total No. of questions solved",
            fontFamily: "verdana",
            // fontSize:"15"
        },
        axisY: {
            // title: "No. of questions",
            includeZero: false,
            gridColor: "white",
            // interlacedColor: interlaced_color,
            interval: 60,
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
        },
        legend: {
            dockInsidePlotArea: true,
			verticalAlign: "top",
			horizontalAlign: "right",               
            maxHeight: 13,
            reversed: true,
        },
        data: [
        {
            type: "stackedColumn",
            name: "Easy",
            showInLegend: true,
            color: search===null?"#66cfc3":"#ccefeb" ,
            // highlightEnabled: true,
            dataPoints: year.filter(user=>typeof user.no_easy_qns == "number").sort((a,b)=>{return (b.no_easy_qns+b.no_medium_qns+b.no_difficult_qns) -( a.no_easy_qns+a.no_medium_qns+a.no_difficult_qns)}).map((user)=>{               
                
                if(user.email===search)
                    return {label: user.name, y: user.no_easy_qns, color:"#66cfc3"};
                
                return {label: user.name, y: user.no_easy_qns}})
        },
        {
            type: "stackedColumn",
            name: "Medium",
            showInLegend: true,
            color:search===null?"#FFB800":"#ffdc80",
            // highlightEnabled: true,
            dataPoints: year.filter(user=>typeof user.no_medium_qns == "number").sort((a,b)=>{return (b.no_easy_qns+b.no_medium_qns+b.no_difficult_qns) -( a.no_easy_qns+a.no_medium_qns+a.no_difficult_qns)}).map((user)=>{
                if(user.email===search)
                    return {label: user.name, y: user.no_easy_qns, color:"#ffb800"};
                return {label: user.name, y: user.no_medium_qns}
            })
        },
        {
            type: "stackedColumn",
            name: "Hard",
            showInLegend: true,
            color:search===null?"#EF4743":"#f9b5b4",
            // highlightEnabled: true,
            dataPoints: year.filter(user=>typeof user.no_difficult_qns == "number").sort((a,b)=>{return (b.no_easy_qns+b.no_medium_qns+b.no_difficult_qns) -( a.no_easy_qns+a.no_medium_qns+a.no_difficult_qns)}).map((user)=>{
                if(user.email===search)
                    return {label: user.name, y: user.no_easy_qns, color:"#EF4743"};
                return {label: user.name, y: user.no_difficult_qns}
            })
        },]
    }
    
    const options_2 = {
        animationEnabled: true,
        // exportEnabled: true,
        height:graph_height,
        title: {
            text: "Contest Rating",
            fontFamily: "verdana"
        },
        axisY: {
            // title: "Copntest rating",
            gridColor: "white",
            interval: 2000,
            reversed :true,
            labelFontSize: 7,
            labelFontWeight: "lighter",
            titleFontColor: "#595959",
            labelFontColor: "#595959",
            lineColor: "#595959",
            tickLength: 1,
            lineThickness: 1,
            includeZero: false,
        },
        axisX: {
            title:"Name",
            // interlacedColor: interlaced_color,
            labelFontSize: 0,
            tickThickness: 0,
            titleFontColor: "#595959",
            labelFontColor: "#595959",
            lineColor: "#595959",
            lineThickness: 1,
        },
        toolTip: {
            enabled: true, 
            fontSize:13,
            contentFormatter: function ( e ) {
                console.log(e);
                return e.entries[0].dataPoint.label + " " + Math.round(e.entries[0].dataPoint.y*1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
            },  
            borderThickness: 0,
            backgroundColor: "rgba(255,255,0,0)",
            borderColor: "rgba(255,255,0,0)",
            animationEnabled: true,
        },
        // backgroundColor: "white",
        data: [{
            type: "splineArea",
            // showInLegend: true,
            highlightEnabled: true,
            legendText: "Overall Ranking",
            color:search===null?"#83a7d0":"#dae5f1",
            dataPoints: year.filter(user=>typeof user.overall_raking == "number").sort((a,b)=>{return a.overall_raking - b.overall_raking}).map((user)=>{
                if(user.email===search)
                    return {label: user.name, y: user.overall_raking/1000, color:"#83a7d0", markerSize:15};
                return {label: user.name, y: user.overall_raking/1000}
            })
        }]
    }
    
    const options_3 = {
        animationEnabled: true,
        // exportEnabled: true,
        height:graph_height,
        title: {
            text: "Total No. of Skills",
            fontFamily: "verdana"
        },
        axisY: {
            // title: "No. of Skills",
            gridColor: "white",
            interval: 10,
            labelFontSize: 7,
            labelFontWeight: "lighter",
            titleFontColor: "#595959",
            labelFontColor: "#595959",
            lineColor: "#595959",
            tickLength: 1,
            lineThickness: 0,
            includeZero: true,
        },
        axisX:{
            title:"Name",
            labelFontSize: 0,
            },
        toolTip: {
            enabled: true, 
            borderThickness: 0,
            backgroundColor: "rgba(255,255,0,0)",
            borderColor: "rgba(255,255,0,0)",
            animationEnabled: true,
            fontColor:"black",
            fontWeight:"lighter",
            fontSize:13,
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "right",
            reversed: true,
            dockInsidePlotArea: true,
        },
        data: [{
            type: "column",
            // showInLegend: true,
            color:search===null?"#ff4d6d":"#ffb8c5",
            legendText: "No. of Badges",
            dataPoints: year.filter(user=>typeof user.skills_len == "number").sort((a,b)=>{return b.skills_len - a.skills_len}).map((user)=>{
                if(user.email===search)
                    return {label: user.name, y: user.no_easy_qns, color:"#ff4d6d"};
                return {label: user.name, y: user.skills_len}
            })
        }]
    }

    const table = year.filter(user=>typeof user.leetcode_score == "number").map((user)=>{return {name:user.name,
        value: Math.round(user.leetcode_score/1000),email:user.email}})

    table.sort(function(a,b) {
        return a.value - b.value;
    }); 

    return(
        <>
            <div className="col-lg-6 col-sm-8" style={{marginTop:"1%",backgroundColor:"#F1F5F7",padding:"1%"}}>
                <div>
                    <Year data = {data} setYear = {setYear} year={year} setSearch={setSearch} />
                    <div className='graphs' style={{padding:"3% 3% 0%"}}><GenericGraph options={options_1} /></div>
                    <div className='graphs' style={{padding:"3% 3% 0%"}}><GenericGraph options={options_2}/></div>
                    <div className='graphs' style={{padding:"3% 3% 0%"}}><GenericGraph options={options_3}/></div>
                </div>
            </div>

            <div className="col-lg-3 col-sm-8 offset-lg-0 offset-sm-4" style={{marginTop:"1%",backgroundColor:"#F1F5F7",padding:"1%"}}>
                <UserTable user_values={table} bgcolor="#F1F5F7" search={search} total={year.length}/>
            </div>
        </>

    );

}
