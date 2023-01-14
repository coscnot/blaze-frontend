import pic from "../images/home/tce -final.png"
import logo from "../images/home/logo.png"
import csbs from "../images/home/csbs.png"
import person from "../images/home/unknown.jpg"
import Card from 'react-bootstrap/Card';

function Photo(props) {
    return (
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={props.src} />
        <Card.Body>
          <div className="h6" style={{textAlign:"center",padding:"0"}}>{props.title}</div>
        </Card.Body>
      </Card>
    );
  }

function Home(){
    console.log("home");
    return(
        <div >
            <img src={pic} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" />

            {/* style={{border:"1px black solid"}} */}

            <div style={{backgroundColor:"#a9917a",padding:"8%",color:"white"}}>
                <div className="container" >
                    <div className="row justify-content-center" >
                        <div className="col-lg-3 col-6 d-flex flex-wrap align-items-center" style={{textAlign:"center"}}>
                            <img src={logo} width="100%" alt="" />
                        </div>
                        <div className="col-lg-9 col-12" >
                            <h1 className="display-3" style={{padding:"3% 0",fontWeight:"500"}}>About TCE</h1>
                            <p className="lead">Spread across 143 acres, The institution and hostels are located near Thirupparankundram on the outskirts of Madurai, 8 kilometres south-west of the city of Madurai. With the motto of "வினையே உயிர்" (Duty is Life), TCE aims at creating quality professionals to meet the emerging industrial and social needs through innovative teaching, applied research and industrial interaction.</p>
                        </div>
                    </div> 
                </div>
            </div>

            <div style={{backgroundColor:"white",padding:"8%",color:"black"}}>
                <div className="container" >
                    <div className="row justify-content-center" >
                        <div className="col-lg-9 col-12 order-3 order-lg-1" >
                            <h1 className="display-3" style={{padding:"3% 0",fontWeight:"500"}}>About CSBS</h1>
                            <p className="lead">TCE offers a four-year Bachelor of Technology (B.Tech.) degree programme in Computer Science and Business Systems (CSBS) in association with Tata Consultancy Services (TCS) from the academic year 2020-21. This Programme is approved by AICTE.  The curriculum is designed with the support from Tata Consultancy services and is customized in CDIO framework of our Institution. The students are trained in emerging topics such as Analytics, Machine Learning, Cloud Computing, Cyber security, Internet of Things etc to make them industry ready.</p>
                        </div>
                        <div className="col-lg-3 col-6 d-flex flex-wrap align-items-center order-2" style={{textAlign:"center"}}>
                            <img src={csbs} width="100%" alt="" />
                        </div>
                    </div> 
                </div>
            </div>

            <div style={{backgroundColor:"black",padding:"8%",color:"white"}}>
                <div className="container" >
                    <div className="row justify-content-center" >
                        <div className="col-lg-3 col-6 d-flex flex-wrap align-items-center" style={{textAlign:"center"}}>
                            <img src={logo} width="100%" alt="" />
                        </div>
                        <div className="col-lg-9 col-12" >
                            <h1 className="display-3" style={{padding:"3% 0",fontWeight:"500"}}>About CSBS Association</h1>
                            <p className="lead">Spread across 143 acres, The institution and hostels are located near Thirupparankundram on the outskirts of Madurai, 8 kilometres south-west of the city of Madurai. With the motto of "வினையே உயிர்" (Duty is Life), TCE aims at creating quality professionals to meet the emerging industrial and social needs through innovative teaching, applied research and industrial interaction.</p>
                        </div>
                    </div> 
                </div>
            </div>
            
            <div style={{backgroundColor:"white",padding:"8%",color:"black"}}>
                <div className="container" >
                    <h1 className="display-3" style={{padding:"3% 0 5%",fontWeight:"500",textAlign:"center"}}>
                        Office Bearers
                        <h3><small class="text-muted">Of Academic Year 2022 - 2023</small></h3>    
                    </h1>
                    
                    <div className="row">
                        <div className="col-6 col-md-3 pb-3">
                            <Photo src={person}  title="General Secretary"/>
                        </div>
                        <div className="col-6 col-md-3 pb-3">
                            <Photo src={person}  title="General Secretary"/>
                        </div>
                        <div className="col-6 col-md-3 pb-3">
                            <Photo src={person}  title="Joint Secretary"/>
                        </div>
                        <div className="col-6 col-md-3 pb-3">
                            <Photo src={person}  title="Joint Secretary"/>
                        </div>
                    </div>

                    <div className="row justify-content-md-center" style={{margin:"4% 4% 2% 4%"}}>
                        <div className="col-6 col-md-3">
                            <Photo src={person}  title="Treasurer"/>
                        </div>
                        <div className="col-6 col-md-3">
                            <Photo src={person}  title="Treasurer"/>
                        </div>
                    </div>
                        
                    

                </div>
            </div>

        </div>
    )
}

export default Home;