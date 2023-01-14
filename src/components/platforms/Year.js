import Badge from 'react-bootstrap/Badge';
import { Form } from 'react-bootstrap';
import DatalistInput from 'react-datalist-input';
import {Button} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import "./year.css";
import searchicon from "./search.png";

export default function Year(props){

    const [localSearch,setLocalSearch] = useState(null)
    function handleSubmit(e){
        e.preventDefault();
        props.setSearch(localSearch);
    }

    var datalist = props.year.map((op)=>{return {id:op.email,value:op.email};});
    






    var available_years = new Set()
    for(var d of props.data)
    {
        available_years.add(d.year)
    }
    available_years = Array.from(available_years).sort(function(a, b) {
        return a - b;
      });

    available_years.unshift("All");
    
    function update(year){

        props.setYear(
        props.data.filter(
            (d)=>{
                return d.year===year || year=="All";
            }
        )
    )
    }
    
    return <div style={{display:"flex",justifyContent:"space-between", marginTop:"-10px", marginBottom:"5px"}}>

        <div style={{paddingLeft:"5px",marginTop:"0"}}>
            {available_years.map((year)=>{
            return <Badge bg="dark" style={{margin:"5px 2px",padding:"4px 2px"}} onClick={()=>{update(year)}}>{year==="All"?"All":year%2000}</Badge>
            })}
        </div>
    
        <Form style={{fontSize:"0.7rem",padding:"0px",marginRight:"20px"}} id="search_graph">
            <div style={{display:"flex"}}>                    
                <DatalistInput
                    placeholder="Enter email"
                    onSelect={(item) => {
                        setLocalSearch(item.value);
                    }}
                    items={datalist}
                />                   
                <Button variant="primary" type="submit" onClick={handleSubmit} style={{padding:"0 3px"}}>
                    <img src={searchicon} height="15px" width="15px" style={{margin:"0",padding:"0"}}/> 
                </Button>
            
            </div>
        </Form>
        
    </div>
}