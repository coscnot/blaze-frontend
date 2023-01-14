import { useState, useEffect } from 'react';
import GenericGraph from '../graphs/GenericGraph';
import UserTable from './UserTable';
import Year from './Year';
import Counter from './Counter';

import'./platforms.css'

var graph_height =  Math.floor(window.innerHeight*0.35)
if(window.innerWidth<400)
    graph_height =  Math.floor(window.innerHeight*0.3)
graph_height = Math.max(graph_height,175)

var interlaced_color ="#F1F5F7";

export function LinkedinDisplay(){
    const [data,setData] = useState(null)
    const [year,setYear] = useState(null)       //used for filtering data into different years
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/linkedin/`)
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
            text: "Total Skills" ,
            fontFamily: "verdana",   
        },
        axisY: {
            // title: "No. of skills",
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
        colorSet:"blackToRed",	
        data: [
            {        
                // color: "#B0D0B0",
                type: "column",  
                // showInLegend: true, 
                dataPoints : year.filter(user=>Array.isArray(user.skills)).map((user)=>{
                        return {y:user.skills.length, label:user.name};
                })

            }
        ]
    }

    var Experience = year.filter(user => Array.isArray(user.experience)).reduce((accumulator,user)=> accumulator + user['experience'].length,0)
    var Certifications = year.filter(user => Array.isArray(user.certifications)).reduce((accumulator,user)=> accumulator + user['certifications'].length,0)
    var Projects = year.filter(user => Array.isArray(user.projects)).reduce((accumulator,user)=> accumulator + user['projects'].length,0)
    var Publications = year.filter(user => Array.isArray(user.publications)).reduce((accumulator,user)=> accumulator + user['publications'].length,0)


    const options_3 = {
        animationEnabled: true,
        // exportEnabled: true,
        height:graph_height,
        title:{
            text: "Certifications" ,
            fontFamily: "verdana",   
        },
        axisY: {
            // title: "No. of skills",
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
        data: [
            {        
                color: "#e5b3fe",
                type: "splineArea",  
                // showInLegend: true, 
                dataPoints : year.filter(user => Array.isArray(user.certifications)).map((user)=>{
                        return {y:user.certifications.length, label:user.name};
                })
            },
        ]
    }

    const table = year.filter(user=>typeof user.linkedin_score == "number").map((user)=>{return {name:user.name,
        value: Math.round(user.linkedin_score),email:user.email}})

    table.sort(function(a,b) {
        return b.value - a.value;
    }); 

    var styles={
           backgroundColor:"white", 
           borderRadius:"5px",
           padding:"3%",
           margin:"2%",
           textAlign:"center",
    };

    var subvalue_style={
        fontSize:"2.5rem",
    }

    return(
    <>
        <div className="col-lg-6 col-sm-8" style={{marginTop:"1%",backgroundColor:"#F1F5F7",padding:"1%"}}>
            <Year data = {data} setYear = {setYear} year={year}/>
            <div className='graphs' style={{padding:"3% 3% 0%"}}><GenericGraph options={options_1}/></div>
            <div id="box_details">
                <div style={{display:"flex",flexWrap: "wrap",justifyContent:"space-evenly"}}>
                    <div class="sub_box_details" id="total_experience" style={styles}>
                        <div className="value" style={subvalue_style}>
                            <Counter value={Experience} duration={2.5} year={year}/>
                        </div>
                        <div className="explanation">Experience</div>
                    </div>
                    <div class="sub_box_details" id="total_projects" style={styles}>
                        <div className="value" style={subvalue_style}>
                            <Counter value={Projects} duration={2.5} year={year}/>
                        </div>
                        <div className="explanation">Projects</div>
                    </div>                    
                    <div class="sub_box_details" id="total_publication" style={styles}>
                        <div className="value" style={subvalue_style}>
                            <Counter value={Publications} duration={2.5} year={year}/>
                        </div>
                        <div className="explanation">Publication</div>
                    </div>
                    <div class="sub_box_details" id="total_certifications" style={styles}>
                        <div className="value" style={subvalue_style}>
                            <Counter value={Certifications} duration={2.5} year={year}/>
                        </div>
                        <div className="explanation">Certification</div>
                    </div>
                    
                </div>
            </div>
            <div className='graphs' style={{padding:"3% 3% 0%"}}><GenericGraph options={options_3}/></div>
        </div>

        <div className="col-lg-3 col-sm-8 offset-lg-0 offset-sm-4" style={{marginTop:"1%",backgroundColor:"#F1F5F7",padding:"1%"}}>
            <UserTable user_values={table} bgcolor="#F1F5F7" />
        </div>
    </>
    );
}




