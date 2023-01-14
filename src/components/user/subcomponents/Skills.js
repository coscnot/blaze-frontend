import {ReadmoreforSkills} from "./Readmore";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../user.css"

function Skills(props) {

    if(props.skills==null)
        return;
    else{
        return(
            // <div id="skills">
            <div id="skills" className="shadow" style={{backgroundColor:props.bgcolor,color:"white",borderRadius:"6px",padding:"1.5rem" }}>
                <p className="h4 mb-3" >Skills </p>
                <ReadmoreforSkills content={props.skills} maxDisplay={12} textColor="white" />                
            </div>
        );
    }
}

export default Skills;

