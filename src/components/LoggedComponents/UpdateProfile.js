import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axiosInstance from "../axios";
import { useState ,useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import upload from './upload.png'

import InputGroup from 'react-bootstrap/InputGroup';


export default function UpdateProfile (props) {

    var window_height = window.innerHeight;
    const navigate = useNavigate();

    useEffect(() => {
		axiosInstance.get('api/profile/'+localStorage.getItem('email')+'/')
        .then((res) => {
            setData(res.data);
		})
        .catch((err)=>{
            navigate('/');
        })
        // axiosInstance.get('api/updateusername/'+localStorage.getItem('email')+'/')
        // .then((res) => {
        //     setUserName(res.data);
		// });
	}, []);

        
    const [data,setData] = useState(null);
    // const [userName,setUserName] = useState(null);
    const initialErr = {
        name:null,
        leetcode:null,
        github:null,
        hackerrank:null,
        linkedin:null,
        codechef:null,
        codeforces:null
    }
    const [err,setErr] = useState(initialErr);

    const initialClasses = {
        name:"",
        leetcode:"",
        github:"",
        hackerrank:"",
        linkedin:"",
        codechef:"",
        codeforces:"",
    }
    const [classes,setClasses] = useState(initialClasses);
    const stepOptions = {
        leetcode:"leetcode",
        github:"github",
        hackerrank:"hackerrank",
        linkedin:"linkedin",
        codechef:"codechef",
        codeforces:"codeforces"
    }
    const [steps,setSteps] = useState(stepOptions.leetcode)


    const upload_img = <img src={upload} height="37px" width="37px" style={{padding:"0px",margin:"0"}}/>;
    const loading_img = <div class="spinner-grow text-primary" role="status">
                             <span class="visually-hidden">Loading...</span>
                         </div>

    const initialUpload = {
        name:upload_img,
        leetcode:upload_img,
        github:upload_img,
        hackerrank:upload_img,
        linkedin:upload_img,
        codechef:upload_img,
        codeforces:upload_img,
    }

    const[uploadOrLoad,setUploadOrLoad] = useState(initialUpload);

	function handleChange(e){
		setData({
			...data,
			[e.target.name]: e.target.value.trim(),
		});
	};

    function handleFocus(e){
        const name = e.target.name;
        setSteps(stepOptions[name]);
    }
    
    function handleSubmit(e){
        e.preventDefault();
        // console.log(data);
        var name = e.currentTarget.name;
        var value = data[name]
        var sendData = {
            id:data.id,
            [name]:value
        }
        
        setUploadOrLoad({
            ...uploadOrLoad,
            [name]:loading_img,
        })


        axiosInstance
			.put('api/profile/'+localStorage.getItem('email')+'/', sendData)
			.then((res) => {
                if(res.status==200)
                {
                    setErr({
                        ...err,
                        [name]:null,
                    })
                    setClasses({
                        ...classes,
                        [name]:'is-valid'
                    })
                }
			})
            .catch(
                (error)=>{
                    setErr({
                        ...err,
                        [name]:error.response.data[name],
                    })
                    setClasses({
                        ...classes,
                        [name]:'is-invalid'
                    })
                }
            )
            .finally(
                ()=>{
                    setUploadOrLoad({
                        ...uploadOrLoad,
                        [name]:upload_img,
                    })
                }
            )
    
        
    }

    // function handleSubmitUsername(e){
    //     e.preventDefault();
    //     var sendData = userName
    //     console.log(sendData)

    //     setUploadOrLoad({
    //         ...uploadOrLoad,
    //         name:loading_img,
    //     })


    //     axiosInstance
	// 		.put('api/updateusername/'+localStorage.getItem('email')+'/', sendData)
	// 		.then((res) => {
    //             console.log("success",res);
    //             if(res.status==200)
    //             {
    //                 setErr({
    //                     ...err,
    //                     name:null,
    //                 })
    //                 setClasses({
    //                     ...classes,
    //                     name:'is-valid'
    //                 })
    //             }
	// 		})
    //         .catch(
    //             (error)=>{
    //                 console.log("failure",error);
    //                 setErr({
    //                     ...err,
    //                     name:error.response.data.name,
    //                 })
    //                 setClasses({
    //                     ...classes,
    //                     name:'is-invalid'
    //                 })
    //             }
    //         )
    //         .finally(
    //             ()=>{
    //                 setUploadOrLoad({
    //                     ...uploadOrLoad,
    //                     name:upload_img,
    //                 })
    //             }
    //         )
    
        
    // }


    if(data===null )
        return;    
    return (
        <div style={{backgroundImage:"linear-gradient(135deg, #EE9AE5 10%, #5961F9 100%)",minHeight:window_height*0.92,padding:"3% 5%"}} >
            <div className="container">                                
          
                <div className="row" style={{backgroundColor:"white",margin:"auto"}}>
                    <div className="col-md-6 col-12"  >
                        {steps}

                    </div>
                    <div className="col-md-6 col-12" style={{padding:"4% 3%"}} >
                        
                        <h2 className="mb-4">Update details</h2>                                

                        <Form>
                            <Form.Group as={Row} style={{margin:"3.5% 0"}} >
                                <Form.Label column sm="3" style={{fontSize:"0.9rem"}}>Name</Form.Label>
                                <Col sm="8" xs="10">
                                    <Form.Control className={classes.name} name="name" type="text" onChange={handleChange} value={data.name}/>
                                </Col>
                                <Col sm="1" xs="1" style={{margin:"0",padding:"0"}}>
                                    <Button type="submit" onClick={handleSubmit} name="name" style={{padding:"0",backgroundColor:"white",border:"None"}}>
                                        {uploadOrLoad.name}
                                    </Button>
                                </Col>
                                {
                                    err.name!==null&&
                                    <Row>
                                        <Col sm="3"></Col>
                                        <Col sm="8">
                                            <p style={{color:"red",margin:"0 10px",fontSize:"0.75rem"}}>{err.name}</p>
                                        </Col>
                                    </Row>
                                }
                            </Form.Group>
                        </Form>


                        {/* -------------------------------------------------------------------------------- */}
                    
                        <Form>
                            <Form.Group as={Row} style={{margin:"3.5% 0"}} controlId="validationLeetcode">
                                <Form.Label column sm="3" style={{fontSize:"0.9rem"}}>Leetcode</Form.Label>
                                <Col sm="8" xs="10">
                                    <Form.Control className={classes.leetcode} name="leetcode" type="text" onChange={handleChange} onFocus={handleFocus} value={data.leetcode}/>
                                </Col>
                                <Col sm="1" xs="1" style={{margin:"0",padding:"0"}}>
                                    <Button type="submit" onClick={handleSubmit} name="leetcode" style={{padding:"0",backgroundColor:"white",border:"None"}}>
                                        {uploadOrLoad.leetcode}
                                    </Button>
                                </Col>
                                {
                                    err.leetcode!==null&&
                                    <Row>
                                        <Col sm="3"></Col>
                                        <Col sm="8">
                                            <p style={{color:"red",margin:"0 10px",fontSize:"0.75rem"}}>{err.leetcode}</p>
                                        </Col>
                                    </Row>
                                }
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group as={Row} style={{margin:"3.5% 0"}} >
                                <Form.Label column sm="3" style={{fontSize:"0.9rem"}}>Github</Form.Label>
                                <Col sm="8" xs="10">
                                    <Form.Control className={classes.github} name="github" type="text" onChange={handleChange} onFocus={handleFocus} value={data.github}/>
                                </Col>
                                <Col sm="1" xs="1" style={{margin:"0",padding:"0"}}>
                                <Button type="submit" onClick={handleSubmit} name="github" style={{padding:"0",backgroundColor:"white",border:"None"}}>
                                    {uploadOrLoad.github}    
                                </Button>                                     
                                </Col>
                                {
                                    err.github!==null&&
                                    <Row>
                                        <Col sm="3"></Col>
                                        <Col sm="8">
                                            <p style={{color:"red",margin:"0 10px",fontSize:"0.75rem"}}>{err.github}</p>
                                        </Col>
                                    </Row>
                                }
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group as={Row} style={{margin:"3.5% 0"}} >
                                <Form.Label column sm="3" style={{fontSize:"0.9rem"}}>Linkedin</Form.Label>
                                <Col sm="8" xs="10">
                                    <Form.Control className={classes.linkedin} name="linkedin" type="text" onChange={handleChange} onFocus={handleFocus} value={data.linkedin}/>
                                </Col>
                                <Col sm="1" xs="1" style={{margin:"0",padding:"0"}}>
                                    <Button type="submit" onClick={handleSubmit} name="linkedin" style={{padding:"0",backgroundColor:"white",border:"None"}}>
                                        {uploadOrLoad.linkedin}
                                    </Button>
                                </Col>
                                {
                                    err.linkedin!==null&&
                                    <Row>
                                        <Col sm="3"></Col>
                                        <Col sm="8">
                                            <p style={{color:"red",margin:"0 10px",fontSize:"0.75rem"}}>{err.linkedin}</p>
                                        </Col>
                                    </Row>
                                }
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group as={Row} style={{margin:"3.5% 0"}} >
                                <Form.Label column sm="3" style={{fontSize:"0.9rem"}}>Hackerrank</Form.Label>
                                <Col sm="8" xs="10">
                                    <Form.Control className={classes.hackerrank} name="hackerrank" type="text" onChange={handleChange} onFocus={handleFocus} value={data.hackerrank}/>
                                </Col>
                                <Col sm="1" xs="1" style={{margin:"0",padding:"0"}}>
                                    <Button type="submit" onClick={handleSubmit} name="hackerrank" style={{padding:"0",backgroundColor:"white",border:"None"}}>
                                        {uploadOrLoad.hackerrank}
                                    </Button>
                                </Col>
                                {
                                    err.hackerrank!==null&&
                                    <Row>
                                        <Col sm="3"></Col>
                                        <Col sm="8">
                                            <p style={{color:"red",margin:"0 10px",fontSize:"0.75rem"}}>{err.hackerrank}</p>
                                        </Col>
                                    </Row>
                                }
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group as={Row} style={{margin:"3.5% 0"}} >
                                <Form.Label column sm="3" style={{fontSize:"0.9rem"}}>Codechef</Form.Label>
                                <Col sm="8" xs="10">
                                    <Form.Control className={classes.codechef} name="codechef" type="text" onChange={handleChange} onFocus={handleFocus} value={data.codechef}/>
                                </Col>
                                <Col sm="1" xs="1" style={{margin:"0",padding:"0"}}>
                                    <Button type="submit" onClick={handleSubmit} name="codechef" style={{padding:"0",backgroundColor:"white",border:"None"}}>
                                    {uploadOrLoad.codechef}
                                    </Button>
                                </Col>
                                {
                                    err.codechef!==null&&
                                    <Row>
                                        <Col sm="3"></Col>
                                        <Col sm="8">
                                            <p style={{color:"red",margin:"0 10px",fontSize:"0.75rem"}}>{err.codechef}</p>
                                        </Col>
                                    </Row>
                                }
                            </Form.Group>
                        </Form>

                        <Form>
                            <Form.Group as={Row} style={{margin:"3.5% 0"}} >
                                <Form.Label column sm="3" style={{fontSize:"0.9rem"}}>Codeforces</Form.Label>
                                <Col sm="8" xs="10">
                                    <Form.Control className={classes.codeforces} name="codeforces" type="text" onChange={handleChange} onFocus={handleFocus} value={data.codeforces}/>
                                </Col>
                                <Col sm="1" xs="1" style={{margin:"0",padding:"0"}}>
                                    <Button type="submit" onClick={handleSubmit} name="codeforces" style={{padding:"0",backgroundColor:"white",border:"None"}}>
                                        {uploadOrLoad.codeforces}
                                    </Button>
                                </Col>
                                {
                                    err.codeforces!==null&&
                                    <Row>
                                        <Col sm="3"></Col>
                                        <Col sm="8">
                                            <p style={{color:"red",margin:"0 10px",fontSize:"0.75rem"}}>{err.codeforces}</p>
                                        </Col>
                                    </Row>
                                }
                            </Form.Group>
                        </Form>


                        
                            
                        

                    </div>
                </div>
                
                

            </div>
        </div>
    )
    
}


