import React,{Component} from "react";
import { LeetcodeDisplay } from "./platforms/Leetcode";
import { GithubDisplay } from "./platforms/Github";
import { LinkedinDisplay } from "./platforms/Linkedin";
import { HackerrankDisplay} from "./platforms/Hackerrank"
import { CodechefDisplay} from "./platforms/Codechef"
import { CodeforcesDisplay } from "./platforms/Codeforces";
import Button from 'react-bootstrap/Button';

function display(platform)
{
    switch(platform)
    {
        case "Leetcode":
            return <LeetcodeDisplay />;
        case "Github":
            return <GithubDisplay />
        case "LinkedIn":
            return <LinkedinDisplay />
        case "Hackerrank":
            return <HackerrankDisplay />
        case "Codechef":
            return <CodechefDisplay />
        case "Codeforces":
            return <CodeforcesDisplay />
    }
}
// function display_graph(platform){
//     switch(platform)
//     {
//         case "Leetcode":
//             return <LeetcodeGraph />;
//         case "Github":
//             return <GithubGraph />
//         case "LinkedIn":
//             return <LinkedinGraph />
//         case "Hackerrank":
//             return <HackerrankGraph />
//         case "Codechef":
//             return <CodechefGraph />
//         case "Codeforces":
//             return <CodeforcesGraph />
//     }
// }

// function display_user(platform){
//         switch(platform)
//         {
//             case "Leetcode":
//                 return <LeetcodeUser />;
//             case "Github":
//                 return <GithubUser />
//             case "LinkedIn":
//                 return <LinkedinUser />
//             case "Hackerrank":
//                 return <HackerrankUser />
//             case "Codechef":
//                 return <CodechefUser />
//             case "Codeforces":
//                 return <CodeforcesUser />
//         }
//     }

class LeaderBoard extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            platform : "Leetcode"
        }
        this.platform = this.platform.bind(this);
    }

    platform(val) {
        this.setState({
            platform : val
        })
    }

    render(){
        var fontsize = "1rem";
        var window_innerWidth = window.innerWidth;
        var window_innerHeight = window.innerHeight;
        if(window_innerWidth<300)
            fontsize = "0.7rem"
        else if(window_innerWidth<420)
            fontsize = "0.8rem"
        else if(window_innerWidth<576)
            fontsize = "0.95rem"
        else
            fontsize = "1.2rem"
        var buttonStyle1={height:"12%",minHeight:"30px",color:"black",fontSize:fontsize,backgroundColor:"white"}
        var buttonStyle2={height:"35px",color:"black",fontSize:fontsize,backgroundColor:"white"}
        var p = this.state.platform;
        return(
            <div style={{backgroundColor:"#F1F5F7"}}>
            <div className="container-fluid px-md-5 px-sm-3 px-1">    
                <div className="row">
                    {window_innerWidth>=576?
                        <div className="col-lg-3 col-sm-4 col-12" style={{position:"sticky",top:"11.5%",height:window.innerHeight*0.88,borderRadius:"3px",marginTop:"1%"}}>
                            <div style={{fontWeight:"600",fontSize:fontsize,padding:"10% 0",textAlign:"center"}}>PLATFORMS</div>
                            <div style={{display:"flex",flexDirection:"column",height:"80%",justifyContent:"space-between"}}>
                                <Button className={`${this.state.platform==="Leetcode"?"highlight":"normal"} btn`} style={buttonStyle1} variant="outline-light" onClick={()=>{this.platform("Leetcode")}}>Leetcode</Button>
                                <Button className={`${this.state.platform==="Github"?"highlight":"normal"} btn`} style={buttonStyle1} variant="outline-light" onClick={()=>{this.platform("Github")}}>Github</Button>
                                <Button className={`${this.state.platform==="LinkedIn"?"highlight":"normal"} btn`} style={buttonStyle1} variant="outline-light" onClick={()=>{this.platform("LinkedIn")}}>LinkedIn</Button>
                                <Button className={`${this.state.platform==="Hackerrank"?"highlight":"normal"} btn`} style={buttonStyle1} variant="outline-light" onClick={()=>{this.platform("Hackerrank")}}>Hackerrank</Button>
                                <Button className={`${this.state.platform==="Codechef"?"highlight":"normal"} btn`} style={buttonStyle1} variant="outline-light" onClick={()=>{this.platform("Codechef")}}>Codechef</Button>
                                <Button className={`${this.state.platform==="Codeforces"?"highlight":"normal"} btn`} style={buttonStyle1} variant="outline-light" onClick={()=>{this.platform("Codeforces")}}>Codeforces</Button>
                            </div>
                        </div>
                        :
                        <div className="col-0 hide_scrollbar" style={{position:"sticky",top:"10%",height:"45px",padding:"1%",zIndex:"99",backgroundColor:"#F1F5F7",pverflow:"scroll"}}>
                            
                                <div style={{display:"flex",flexDirection:"row",overflow:"scroll"}}>
                                    <Button id="Leetcode" className={this.state.platform==="Leetcode"?"highlight":"normal"} style={buttonStyle2} variant="outline-light" onClick={()=>{this.platform("Leetcode")}} >Leetcode</Button>
                                    <Button id="Github" className={this.state.platform==="Github"?"highlight":"normal"} style={buttonStyle2} variant="outline-light" onClick={()=>{this.platform("Github")}}>Github</Button>
                                    <Button id="LinkedIn" className={this.state.platform==="LinkedIn"?"highlight":"normal"} style={buttonStyle2} variant="outline-light" onClick={()=>{this.platform("LinkedIn")}}>LinkedIn</Button>
                                    <Button id="Hackerrank" className={this.state.platform==="Hackerrank"?"highlight":"normal"} style={buttonStyle2} variant="outline-light" onClick={()=>{this.platform("Hackerrank")}}>Hackerrank</Button>
                                    <Button id="Codechef" className={this.state.platform==="Codechef"?"highlight":"normal"} style={buttonStyle2} variant="outline-light" onClick={()=>{this.platform("Codechef")}}>Codechef</Button>
                                    <Button id="Codeforces" className={this.state.platform==="Codeforces"?"highlight":"normal"} style={buttonStyle2} variant="outline-light" onClick={()=>{this.platform("Codeforces")}}>Codeforces</Button>
                                </div>  
                                                        
                            
                        </div>
                    }
                    
                    {display(this.state.platform)}

                </div>
            </div>
            </div>
        );
    }
}

export default LeaderBoard;