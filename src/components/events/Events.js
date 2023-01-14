import {dates} from '../../data/events/events'
import {Link} from 'react-scroll'
import DateEvent from './DateEvent';
import MainCarousel from "./MainCarousel";
import SubCarousel from './SubCarousel';
import React from 'react';

function Scrollbar(props){
    var idList = [];
    for(var event of props.event)
    {
        if(idList[idList.length-1]!==event.detail_date.substring(4,7)+event.detail_date.substring(11,15))
            idList.push(event.detail_date.substring(4,7)+event.detail_date.substring(11,15));
    }
    console.log(idList);
    
    var fillScrollbar = idList.map((id)=>{
        // function MouseOver(event) {
        //     event.target.innerHTML = id;
        // }
        // function MouseOut(event){
        //     event.target.innerHTML="";
        // }
        return(
        <Link  to={id} spy={true} offset={-80} >
            {/* <div style={{height:"7px", width:"7px", backgroundColor:"black"}} onMouseOver={MouseOver} onMouseOut={MouseOut}></div> */}
            <div style={{height:"7px", width:"7px", backgroundColor:"black",}}></div>
            <p style={{ transform: "translateX(-3rem)",color:"black",textShadow:" 2px 2px white"}}>{id.substring(0,3)+"_"+id.substring(5,7)}</p>
        </Link>
    
        );
    })

    return(
        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around",width:"9px",position:"sticky", border:"1px black solid",top:"60px",float:"right",zIndex:"100", height:window.innerHeight*0.85}}>
            {fillScrollbar} 
        </div>
    );
}

class Events extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            events:null,
            DataisLoaded:false,
        }
    }

    componentDidMount(){
        fetch(`http://127.0.0.1:8000/api/events/`)
        .then(resp => resp.json())
        .then(resp => this.setState({
            events:resp,
            DataisLoaded:true,
        }))
    }

    render()
    {
        if(this.state.DataisLoaded===false)
            return <div></div>;
        
        // console.log(this.state.events)

        var photos_for_carousel = [];
        var i=0;
        while( i<this.state.events.length && photos_for_carousel.length!==4)  //total4 images for main carousel
        {
            if(this.state.events[i].imageUrl1!==null)
                photos_for_carousel.push({"url":this.state.events[i].imageUrl1,"name":this.state.events[i].name})
            i++;
        }

        return(
            <div className="container" style={{marginBottom:"6%"}}>

                {
                    photos_for_carousel.length!==0 && <MainCarousel img={photos_for_carousel}/>
                }
                
    
                {/* <div style={{marginTop:"4%"}}>
                    <div className="h3" style={{margin:"2% 0"}}>Paper Publications</div>
                    <SubCarousel />
                    <div className="h3" style={{margin:"2% 0"}}>Contests Won</div>
                    <SubCarousel />
                </div> */}
    
                <div>
                    <div className='display-1' id="final_events" style={{"marginTop":"4%"}}>Events</div>
                    <Scrollbar event={this.state.events}/> 
                    {
                        this.state.events.map((event)=>{
                        return(
                                <DateEvent event={event} />
                            );
                        })
                    }

                </div>                
            </div>
        )
    }
}

export default Events;

