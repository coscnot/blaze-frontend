import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from "react-router-dom";
import "./portfolio.css"
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import { LinkContainer } from 'react-router-bootstrap'
export default function SearchPortfolio(props)
{
    var window_height = Math.floor(window.innerHeight*0.92);
    const navigate = useNavigate();
    const [options,setOptions] = useState(null);
    const [search,setSearch] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/emaillist/`)
            .then(resp => resp.json())
            .then((resp) => {
                setOptions(resp);
            })
        }, [])

    if(options==null)
        return;

    function handleSubmit(e){
        e.preventDefault();
        if(search!="")
            navigate('/'+search);
    }

    var datalist = [];
    if(options)
    {
        datalist = options.map((op)=>{return {id:op.email,value:op.email};})
    }

    var available_years = new Map();
    for(var option of options)
    {
        var inst = available_years.has(option.year);
        console.log(inst);
        if(inst===false)
            available_years.set(option.year,1);
        else
            available_years.set(option.year,inst+1);
    }
    available_years = Array.from(available_years, ([year, count]) => ({ year, count }));
    
    function getRandomInt(max) {
        var temp =  Math.floor(Math.random() * max);
        return temp;
    }

    function some(data,count){
        var temp = getRandomInt(count);
        return data.slice(temp,temp+5);
    }

    return <div style={{ background:"linear-gradient(to right, black , #1c1056, #494078, #605889, #bbb7cc)",height:window_height,color:"white"}}>
        <div className="container">

            <div className='row'>
                <div className="col-sm-6 col-12" >
                    <h1 className='my-5'>Search</h1>
                    <Form id="search">
                        <div className="row">
                            <div style={{color:"black",width:"80%",float:"left"}}>
                                <DatalistInput
                                    placeholder="Enter email"
                                    onSelect={(item) => {
                                        setSearch(item.value);
                                    }}
                                    items={datalist}
                                />
                            </div>
                            
                            
                            <Button variant="primary" type="submit" onClick={handleSubmit} style={{width:"18%",float:"right",padding:"0px"}}>
                                Search
                            </Button>
                            
                        </div>

                    </Form>
                </div>
                <div className="col-sm-6 col-12" >
                    <div>
                        <h1 className='my-5' >Suggested Portfolios</h1>
                    </div>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        {
                            available_years.map((obj)=>
                            {
                                return <div>
                                            <h3>Batch {obj.year}</h3>
                                            <div style={{display:"flex"}}>
                                                {
                                                    some(options.filter(option=>option.year==obj.year),obj.count).map((option)=>
                                                    {
                                                        return <LinkContainer to={"/"+option.email}>
                                                                    <h5><Badge bg="secondary" className='p-3 m-2'>
                                                                        {option.email}
                                                                    </Badge></h5>
                                                        </LinkContainer>
                                                        
                                                    })
                                                }
                                            </div>
                                    </div>
                            })

                        }
                    </div>
                </div>
            </div>                      
            
        </div>
    </div>
}