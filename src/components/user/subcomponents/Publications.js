import InfiniteCarousel from "react-leaf-carousel";
import React,{ useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card } from "react-bootstrap";
import "../user.css"
import {words_to_display,slides} from "./brkpnts_carousel"

function PublicationModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>  
        {
          props.publication.name&&
          (<Modal.Title >
            {props.publication.name}
          </Modal.Title>)
        }        
      </Modal.Header>
      <Modal.Body>
      {
        props.publication.publisher&&
        (<div>
            Issued by : 
            {/* <span className="h5"> */}
                {props.publication.publisher}
            {/* </span> */}
        </div>)
      }

      {
        props.publication.issueDate&&
        (<Modal.Title class="text-muted">
          {props.publication.issueDate}
        </Modal.Title>)
      }

      {props.publication.url&&
        (<p>Link : 
            <a href={props.publication.url} target="blank"> {props.publication.url}</a>
         </p>)
      }
        
      {props.publication.description&&
      (
        <p>
          {props.publication.description}
        </p>
      )}
        
      </Modal.Body>
    </Modal>
  );
}

function PublicationCard(props) {

  var total_count = 0;
  const [modalShow, setModalShow] = useState(false);
  var actual_display = null;
  if(props.publication.description!=null)
  {
    total_count = props.publication.description.split(" ").length;
    if(total_count<props.display_count)
    {
      actual_display = props.publication.description
    }
    else{
      actual_display = props.publication.description.split(" ").slice(0,props.display_count).join(" ")
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
              {props.publication.name!=null&&(props.publication.name)}
            </p>
            <p style={{fontWeight:100}}>
              {props.publication.publisher!=null&&(props.publication.publisher.split(" ").slice(0,6).join(" "))}
              {props.publication.issueDate!=null&&( " (" +  props.publication.issueDate + ") ")}
            </p>

            {
              props.publication.description!=null&&(
              <div style={{fontSize:"0.85rem"}}>
               {actual_display}
               {total_count>props.display_count&&<strong> ...</strong>}
              </div>
              )
            }
          </Card.Body>
        </Card>
      </button>                

      <PublicationModal        
                publication = {props.publication}
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
    </div>
  );
 
}

function Publications(props) {
  if (props.publications == null) return;
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
          <span className="h4">Publications</span>
          <br/>
          <span style={{fontWeight:"100",fontSize:"0.85rem"}}>Click to view detailed description</span>
        </div>
        {
          (props.publications.length == 1) ? 
          (<PublicationCard publication={props.publications[0]} bgcolor={props.bgcolor} display_count={25}/>) 
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
              props.publications.map((publication)=>{
                return(
                  <PublicationCard publication={publication} bgcolor={props.bgcolor} display_count={props.display_count}/>
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

export default Publications;
