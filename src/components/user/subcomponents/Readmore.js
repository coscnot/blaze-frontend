import React,{ useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Readmore(props) {
    const [visDisplay, setVisDisplay] = useState(props.maxDisplay);
    var total_count = props.content.length;
    var rm_style = {
        color:"white",
        margin:"0px"
    }

    if (total_count <= props.maxDisplay) 
        return (
            <p style={rm_style}>
                {props.content.join(" ")}
            </p>
        );
    else {
      return (
        <p style={rm_style}>
          {props.content.slice(0, visDisplay).join(" ")}
          <button
            onClick={() => {
              if(visDisplay===props.maxDisplay)
                setVisDisplay(total_count);
              else
              setVisDisplay(props.maxDisplay);
            }}
            style={{ backgroundColor: "rgba(1,1,1,0)",border:"None", color: "white" }}
          >
           <strong> {visDisplay === props.maxDisplay ? "Read more ..." : "Read Less ..."} </strong>
          </button>
        </p>
      );
    }
}

export default Readmore;

export function ReadmoreforSkills(props) {
    const [visDisplay, setVisDisplay] = useState(props.maxDisplay);
    var total_count = props.content.length;
    var rm_style = {
        color:props.textColor,
        fontWeight: "400",
    }

    var content = props.content.map((skill) => {
        return (
          <span>
            <span class="skillTag" style={rm_style}>
              {skill}
            </span>
            <span> | </span>
          </span>
        );
      });

    if (total_count <= props.maxDisplay) 
        return (
            <p style={{margin:0}}>
                {content}
            </p>
        );
    else {
      return (
        <p style={{margin:0}}>
          {content.slice(0, visDisplay)}
          <button
            onClick={() => {
              if(visDisplay===props.maxDisplay)
                setVisDisplay(total_count);
              else
              setVisDisplay(props.maxDisplay);
            }}
            style={{ backgroundColor: "rgba(1,1,1,0)",border:"None", color: props.textColor }}
          >
           <strong> {visDisplay === props.maxDisplay ? "Read more ..." : "Read Less ..."} </strong>
          </button>
        </p>
      );
    }
}

