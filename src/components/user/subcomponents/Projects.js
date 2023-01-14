import InfiniteCarousel from "react-leaf-carousel";
import React,{ useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card } from "react-bootstrap";
import "../user.css"
import {words_to_display,slides} from "./brkpnts_carousel"

function ProjectModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>  
        {
          props.project.title&&
          (<Modal.Title >
            {props.project.title}
          </Modal.Title>)
        }        
      </Modal.Header>
      <Modal.Body>
        
      {props.project.url&&
      (
        <p>Link : 
          <a href={props.project.url} target="blank"> {props.project.url}</a>
        </p>
      )}

      {props.project.description&&
      (
        <p>
          {props.project.description}
        </p>
      )}

      {props.project.members&&
      (
        <div>
            Members : 
            {
                props.project.members.map((member)=>{
                    return(
                            <li>{member}</li>
                        );
                })
            }
        </div>
      )}
        
      </Modal.Body>
    </Modal>
  );
}

function ProjectCard(props) {

  var total_count = 0;
  const [modalShow, setModalShow] = useState(false);
  var actual_display = null;
  if(props.project.description!=null)
  {
    total_count = props.project.description.split(" ").length;
    if(total_count<props.display_count)
    {
      actual_display = props.project.description
    }
    else{
      actual_display = props.project.description.split(" ").slice(0,props.display_count).join(" ")
    }
  }

  return (
    <div style={{
      color: "white",
      borderRadius: "6px",
      paddingBottom: "1rem",
    }}>      
      <button   className="darkshadow"
                onClick={() => setModalShow(true)}
                style={{border:"None",margin:"0",padding:"0"}}
                >
        <Card style={{border:"None",backgroundColor: props.bgcolor,color:"white",display:"flex",flexDirection:"column",justifyContent:"space-evenly", textAlign:"left",padding:"4%"}}>
        <Card.Header>
            <p className="h6 my-0">
              {props.project.title!=null&&(props.project.title)}
            </p>
        </Card.Header>
          <Card.Body>           
            {
              props.project.description!=null&&(
              <div style={{fontSize:"0.85rem"}}>
               {actual_display}
               {total_count>props.display_count&&<strong> ...</strong>}
              </div>
              )
            }
          </Card.Body>
        </Card>
      </button>                

      <ProjectModal        
                project = {props.project}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
    </div>
  );
 
}

function Projects(props) {
  if (props.projects == null) return;
  else {
    return (
      <div
        style={{
          color: "white",
          borderRadius: "6px",
          paddingBottom: "1rem",
        }}
      >
        <div className="mb-4" >
          <span className="h4">Projects</span>
          <br/>
          <span style={{fontWeight:"100",fontSize:"0.85rem"}}>Click to view detailed description</span>
        </div>
        {
          (props.projects.length == 1) ? 
          (<ProjectCard project={props.projects[0]} bgcolor={props.bgcolor} display_count={25}/>) 
          :
          (
            <InfiniteCarousel
          paging={true}
          
          lazyLoad={true}
          showSides={true}
          sidesOpacity={1}
          sideSize={0.1}
          slidesSpacing={3}
          pauseOnHover={true}
          slidesToScroll={slides}
          slidesToShow={slides}
          animationDuration={1000}
          cycleInterval={5000}
          autoCycle={true}
        >
          {
            props.projects.map((project)=>{
              return(
                <ProjectCard project={project} bgcolor={props.bgcolor} display_count={props.display_count}/>
              );
            })
          }
        </InfiniteCarousel>
          )
        }

        
      </div>
    );
  }
}

export default Projects;
