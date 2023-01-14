import InfiniteCarousel from "react-leaf-carousel";
import React,{ useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card } from "react-bootstrap";
import "../user.css"
import {words_to_display,slides} from "./brkpnts_carousel"

function ExpModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>  
        {
          props.exp.companyName&&
          (<Modal.Title >
            {props.exp.companyName}
          </Modal.Title>)
        }        
      </Modal.Header>
      <Modal.Body>
      {
        props.exp.title&&
        (<Modal.Title id="contained-modal-title-vcenter">
          {props.exp.title}
        </Modal.Title>)
      }

      {
        props.exp.period&&
        (<Modal.Title class="text-muted">
          {props.exp.period}
        </Modal.Title>)
      }
        
      {props.exp.description&&
      (
        <p>
          {props.exp.description}
        </p>
      )}
        
      </Modal.Body>
    </Modal>
  );
}

function ExpCard(props) {

  var total_count = 0;
  const [modalShow, setModalShow] = useState(false);
  var actual_display = null;
  if(props.exp.description!=null)
  {
    total_count = props.exp.description.split(" ").length;
    if(total_count<props.display_count)
    {
      actual_display = props.exp.description
    }
    else{
      actual_display = props.exp.description.split(" ").slice(0,props.display_count).join(" ")
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
          <Card.Body>
            <p className="h6 my-0">
              {props.exp.title!=null&&(props.exp.title)}
            </p>
            <p >
              {props.exp.companyName!=null&&(props.exp.companyName)}
              {props.exp.period!=null&&( " (" +  props.exp.period + ") ")}
            </p>

            {
              props.exp.description!=null&&(
              <div style={{fontSize:"0.85rem"}}>
               {actual_display}
               {total_count>props.display_count&&<strong> ...</strong>}
              </div>
              )
            }
          </Card.Body>
        </Card>
      </button>                

      <ExpModal        
                exp = {props.exp}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
    </div>
  );
 
}

function Experience(props) {
  if (props.experiences == null) return;
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
          <span className="h4">Experience</span>
          <br/>
          <span style={{fontWeight:"100",fontSize:"0.85rem"}}>Click to view detailed description</span>
        </div>
        
        {
          (props.experiences.length == 1) ? 
          (<ExpCard exp={props.experiences[0]} bgcolor={props.bgcolor} display_count={25}/>) 
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
            props.experiences.map((exp)=>{
              return(
                <ExpCard exp={exp} bgcolor={props.bgcolor} display_count={props.display_count}/>
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

export default Experience;
