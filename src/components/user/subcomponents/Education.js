import InfiniteCarousel from "react-leaf-carousel";
import Card from "react-bootstrap/Card";
import "../user.css"
import {words_to_display,slides} from "./brkpnts_carousel"

function EduCard(props) {
  return (
    <Card className="darkshadow" style={{ backgroundColor:props.bgcolor,color:"white",border:"none",marginBottom:"1rem"}}>
      <Card.Body>
        <p className="h5">{props.edu.schoolName}</p>
        <p >
          {props.edu.fieldOfStudy!=null&&(props.edu.fieldOfStudy)}  
          <br />
          {props.edu.degreeName!=null&&(props.edu.degreeName)}
        </p>
        {
            props.edu.grade!=null&&
            (<small class="text-muted">Grade : {props.edu.grade}</small>)
        }
      </Card.Body>
    </Card>
  );
}

function Education(props) {
  if (props.educations == null) return;
  else {
    return (
      <div
        style={{
          color: "white",
          borderRadius: "6px",
          paddingBottom: "1rem",
        }}
      >
        <div className="h4 mb-4">Education</div>
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
            props.educations.map((edu)=>{
              return(
                <EduCard edu={edu} bgcolor={props.bgcolor}/>
              );
            })
          }
        </InfiniteCarousel>
      </div>
    );
  }
}

export default Education;









