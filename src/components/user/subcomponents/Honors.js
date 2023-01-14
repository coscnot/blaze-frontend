import InfiniteCarousel from "react-leaf-carousel";
import React,{ useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card } from "react-bootstrap";
import "../user.css"
import {words_to_display,slides} from "./brkpnts_carousel"

function HonorModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>  
        {
          props.honor.title&&
          (<Modal.Title >
            {props.honor.title}
          </Modal.Title>)
        }        
      </Modal.Header>
      <Modal.Body>
      {
        props.honor.issuer&&
        (<div>
            Issued by : 
            <span className="h5">
                {props.honor.issuer}
            </span>
        </div>)
      }

      {
        props.honor.issueDate&&
        (<Modal.Title class="text-muted">
          {props.honor.issueDate}
        </Modal.Title>)
      }
        
      {props.honor.description&&
      (
        <p>
          {props.honor.description}
        </p>
      )}
        
      </Modal.Body>
    </Modal>
  );
}

function HonorCard(props) {

  var total_count = 0;
  const [modalShow, setModalShow] = useState(false);
  var actual_display = null;
  if(props.honor.description!=null)
  {
    total_count = props.honor.description.split(" ").length;
    if(total_count<props.display_count)
    {
      actual_display = props.honor.description
    }
    else{
      actual_display = props.honor.description.split(" ").slice(0,props.display_count).join(" ")
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
              {props.honor.title!=null&&(props.honor.title)}
            </p>
            <p >
              {props.honor.issuer!=null&&(props.honor.issuer)}
              {props.honor.issueDate!=null&&( " (" +  props.honor.issueDate + ") ")}
            </p>

            {
              props.honor.description!=null&&(
              <div style={{fontSize:"0.85rem"}}>
               {actual_display}
               {total_count>props.display_count&&<strong> ...</strong>}
              </div>
              )
            }
          </Card.Body>
        </Card>
      </button>                

      <HonorModal        
                honor = {props.honor}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
    </div>
  );
 
}

function Honors(props) {
  if (props.honors == null) return;
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
          <span className="h4">Honors</span>
          <br/>
          <span style={{fontWeight:"100",fontSize:"0.85rem"}}>Click to view detailed description</span>
        </div>
        {
          (props.honors.length == 1) ? 
          (<HonorCard honor={props.honors[0]} bgcolor={props.bgcolor} display_count={25}/>) 
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
            props.honors.map((honor)=>{
              return(
                <HonorCard honor={honor} bgcolor={props.bgcolor} display_count={props.display_count}/>
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

export default Honors;
