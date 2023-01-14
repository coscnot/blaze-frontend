import InfiniteCarousel from "react-leaf-carousel";
import Card from "react-bootstrap/Card";
import "../user.css"
import {words_to_display,slides} from "./brkpnts_carousel"

function CertCard(props) {

    var ret_val = <Card className="darkshadow" style={{ backgroundColor:props.bgcolor,color:"white",border:"none",marginBottom:"1rem"}}>
    <Card.Body>
        <p className="h5">{props.cert.name}</p>
        <p >
        {props.cert.authority!=null&&(props.cert.authority)}  
        <br />
        {props.cert.period!=null&&(props.cert.period)}
        </p>
        {
            props.cert.licenseNumber!=null&&
            (<small class="text-muted">License No. : {props.cert.licenseNumber}</small>)
        }
    </Card.Body>
    </Card>
    if(props.cert.url!=null)
    {
        return(
            <a href={props.cert.url} target="blank" style={{textDecoration:"None"}}>
                {ret_val}
            </a>
        );
    }
    else{
        return ret_val;
    }
}

function Certifications(props) {
  if (props.certifications == null) return;
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
          <span className="h4">Certifications</span>
          <br/>
          <span style={{fontWeight:"100",fontSize:"0.85rem"}}>Click to view certification, if present</span>
        </div>
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
            props.certifications.map((cert)=>{
              return(
                <CertCard cert={cert} bgcolor={props.bgcolor}/>
              );
            })
          }
        </InfiniteCarousel>
      </div>
    );
  }
}

export default Certifications;
