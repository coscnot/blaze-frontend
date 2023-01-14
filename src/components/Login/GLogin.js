import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function GLogin(){

    const [isLogged,setIsLogged] = useState(localStorage.getItem("credential")!==null);
    const [failure,setFailure] = useState(null);
    
    const [toast, setToast] = useState(true);
    const toggleToast = () => setToast(!toast);

    return(
        <>
        {
            isLogged===false ?
          
            <GoogleOAuthProvider clientId="1047203123614-rh65t3gk2mqtp63nhbop6175i5kkc96h.apps.googleusercontent.com">
                    <GoogleLogin
                        type="icon"
                        onSuccess={(credentialResponse) => {
                            
                            setIsLogged((prev)=>{
                                // console.log(credentialResponse);
                                fetch(`http://127.0.0.1:8000/api/verifyemail/`,{
                                    headers:{"Content-Type": "application/json",},
                                    method: "POST",
                                    body:JSON.stringify({"credential":credentialResponse.credential})
                                })
                                .then(resp => resp.json())
                                .then(resp => {
                                    if(resp==true )
                                    {
                                        if(jwt_decode(credentialResponse.credential)['email_verified']===true)
                                        {
                                            localStorage.setItem("credential",credentialResponse.credential);
                                            localStorage.setItem("photo",jwt_decode(credentialResponse.credential)['picture']);
                                            localStorage.setItem("email",jwt_decode(credentialResponse.credential)['email']);
                                            localStorage.setItem("name",jwt_decode(credentialResponse.credential)['name']);
                                            window.location.reload();
                                            return true;
                                        }
                                        else{
                                            setFailure("Login Failure");
                                            setToast(true);
                                        }
                                    }
                                    else
                                    {
                                        setFailure("Not authorized to login, contact admin");
                                        setToast(true);
                                    }
                                })
                                return false;
                            });

                          }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    {
                        failure!==null&& <ToastContainer className="p-3" position="top-center">
                                <Toast show={toast} onClose={toggleToast} delay={2000} autohide>
                                    <Toast.Header>
                                        <strong className="me-auto">{failure}</strong>
                                    </Toast.Header>
                                </Toast>
                            </ToastContainer>
                        
                    }
            </GoogleOAuthProvider>

            :
            
            <div >
                
                    <NavDropdown title={
                        <img src={localStorage.getItem("photo")} alt="logged in" height="28px" style={{margin:"0px",padding:"0px",borderRadius:"28px"}} />
                    } id="navbarScrollingDropdown" >
                        <LinkContainer to={"/"+localStorage.getItem("email")}>
                            <NavDropdown.Item >View Portfolio</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/updateProfile">
                            <NavDropdown.Item >
                                Update Portfolio
                            </NavDropdown.Item>
                        </LinkContainer>
                        
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={
                            ()=>{
                                localStorage.removeItem("credential");
                                localStorage.removeItem("photo");
                                localStorage.removeItem("email");
                                localStorage.removeItem("name");
                                setIsLogged(false);
                                window.location.reload();
                            }
                        }>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                
                
                
                {/* <button style={{color:"white",backgroundColor:"#212529",border:"none"}} 
                            onClick={
                                ()=>{
                                    localStorage.removeItem("credential");
                                    localStorage.removeItem("photo");
                                    setIsLogged(false);
                                    window.location.reload();
                                }
                            }
                            
                >
                    <img src={localStorage.getItem("photo")} alt="logged in" height="35px" style={{borderRadius:"30px"}} />
                </button> */}
            </div>

          }
        </>
        
    );
}


