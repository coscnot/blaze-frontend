import { useEffect, useState } from "react";
import InfiniteCarousel from "react-leaf-carousel";

function IndividualQns(props) {
  return (
    <div
      className="problemsMediumQns"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
      }}
    >
      <div className="row" style={{padding:"0.5% 0"}}>
        <div className="col-4">
          <p className="h6" style={{textAlign:"center",padding:"1.5%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
            {(props.topic.map((t,index)=>{return <div><a key={index} href={t.url} target="_blank" rel="noreferrer" style={{textDecoration:"none",color:"black",fontSize:"1rem"}}>{t.name}</a></div>;})).slice(0,2)}
          </p>
        </div>
        <div className="col-8" style={{backgroundColor:"#fdfaff",textAlign:"center",padding:"1.5%",fontSize:"1.3rem",}} >
          <p>
            <a href={props.link} target="_blank" rel="noreferrer">{props.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function IndividualContest(props) {
  return (
    <a href={props.data.url} target="_blank" rel="noreferrer" style={{color:"black",textDecoration:"None"}}>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          backgroundColor:"white",
          borderRadius:"6px",
          padding:"2%",
          margin:"4%",
          backgroundImage: props.bg,
        }}
      >
          <strong>{props.data.title}  </strong>
          <p>Date : {props.data.startTime.slice(0,7) + props.data.startTime.slice(9,11)}</p>
          <p> Time: {props.data.startTime.slice(13,18)}</p>
          <p> Duration : {props.data.durationInMinutes}
          <br/>in minutes</p>
      </div>
    </a>
  );
}

function ProblemsMedium() {

  const [data,setData] = useState(null)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/problemsmedium/")
     .then(resp => resp.json())
     .then(resp => setData(resp))
    }, [])

  if(data===null)
    return;

  var qns = data['medium'].map((d,index)=>{
    return <IndividualQns key={index} topic={d["tag"]} link={d["url"]} name={d["name"]}/>;
  });

  var gradient1 = ["linear-gradient(135deg, #9796f0 10%, #FBC7D4 100%)",
                  "linear-gradient(135deg, #FFF6B7 10%, #F6416C 100%)",
                  "linear-gradient(135deg, #FFE000 10%, #799F0C 100%)",];

  var gradient2 = ["linear-gradient(135deg, #E2B0FF 10%, #9F44D3 100%)",
                  "linear-gradient(135deg, #92FFC0 10%, #002661 100%)",
                  "linear-gradient(135deg, #6B73FF 10%, #000DFF 100%)",
                  "linear-gradient(135deg, #FF0099 10%, #493240 100%)"];

  return (
    <div style={{ backgroundColor: "#f2e9f9", minHeight:window.innerHeight*0.92}}>
      <div className="container">
          <h3 className="display-3 py-2" >
            Try these Medium Questions
          </h3>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-7">
              <p className="h4">Problems</p>
              <div style={{height:window.innerHeight*0.68,display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                { qns }
              </div>
            </div>

            <div className="col-12 col-md-5" style={{paddingLeft:"3%",paddingBottom:"2%"}}>
            <p className="h4 pt-1">Contest</p>
              <div style={{minHeight:window.innerHeight*0.72,display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                <div className="h5">Leetcode : </div>
                <InfiniteCarousel
                    paging={true}
                    lazyLoad={true}
                    showSides={true}
                    sidesOpacity={0.5}
                    sideSize={0.1}
                    slidesSpacing={3}
                    pauseOnHover={true}
                    slidesToScroll={2}
                    slidesToShow={2}
                    animationDuration={1000}
                    cycleInterval={5000}
                    autoCycle={true}
                >
                    {data.contest.leetcode.map((l,index)=>{
                        return(
                          <IndividualContest key={index} data={l} bg = {gradient1[ Math.floor(Math.random()*gradient1.length) ]}/>
                        );
                      })
                    }
                  </InfiniteCarousel>
                
                <div className="h5">Codechef : </div>
                <InfiniteCarousel
                    // paging={true}
                    
                    lazyLoad={true}
                    showSides={true}
                    sidesOpacity={1}
                    sideSize={0.1}
                    slidesSpacing={3}
                    pauseOnHover={true}
                    slidesToScroll={2}
                    slidesToShow={2}
                    animationDuration={1000}
                    cycleInterval={5000}
                    autoCycle={true}
                >
                  {data.contest.codechef.map((l,index)=>{
                      return(
                        <IndividualContest key={index} data={l} bg = {gradient2[ Math.floor(Math.random()*gradient2.length) ]}/>
                      );
                    })
                  }
                </InfiniteCarousel>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ProblemsMedium;


