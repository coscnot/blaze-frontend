import Readmore from "./Readmore";
import '../user.css'

function About(props){
    if(props.about==null)
        return;
    else if(props.about!=null && props.about.split(" ").length<=6)
    {
        return(    
            <div className="shadow" style={{backgroundColor:props.bgcolor,color:"white",borderRadius:"6px",padding:"1.5rem"}}>
            <p className="h4">About</p>
            <p style={{margin:"0"}}>
                {props.about}
            </p>
            </div>
        );
    }
    else
    {
        return(    
            <div className="shadow" style={{backgroundColor:props.bgcolor,color:"white",borderRadius:"6px",padding:"1.5rem"}}>
            <p className="h4">About</p>
            <p style={{margin:"0"}}>
                <Readmore maxDisplay={30} content={props.about.split(" ")} />
            </p>
            </div>
        );
    }
}

export default About;


