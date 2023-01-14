import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import leetcodeLogo from "../../images/user/platforms/leetcode.png";
import codechefLogo from "../../images/user/platforms/codechef.png";
import codeforcesLogo from "../../images/user/platforms/codeforces.png";
import githubLogo from "../../images/user/platforms/github.png";
import linkedinLogo from "../../images/user/platforms/linkedin.png";
import hackerrankLogo from "../../images/user/platforms/hackerrank.png";
import gmailLogo from "../../images/user/platforms/gmail.png"

import About from "./subcomponents/About";
import Skills from "./subcomponents/Skills";
import Experience from "./subcomponents/Experience";
import Education from "./subcomponents/Education";
import Certifications from "./subcomponents/Certifications";
import Projects from "./subcomponents/Projects";
import Honors from "./subcomponents/Honors";
import Publications from "./subcomponents/Publications";

import LeetcodeUser from "./Programming/LeetcodeUser";
import GithubUser from "./Programming/GithubUser";
import HackerrankUser from "./Programming/HackerrankUser";
import CodechefUser from "./Programming/CodechefUser";
import CodeforcesUser from "./Programming/CodeforcesUser";

function User() {
  const { email } = useParams();
  var window_height = Math.floor(window.innerHeight*0.92);
  var window_width = Math.floor(window.innerWidth);
  var iconStyles = {
    width: "12%",
    height: "12%",
    margin: "2%",
  };

  var color_palatte = ["#f72585","#b5179e","#7209b7","#560bad","#480ca8","#3a0ca3","#3f37c9","#4361ee","#4895ef","#6daaf2"]
  const navigate = useNavigate();
  
  const [data,setData] = useState(null)
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/${email}/`)
     .then((resp) => {
        if(resp.status==404)
        {
          navigate('/pagenotfound');
        }
        return resp.json();
      })
     .then((resp) => {
        setData(resp);
     })
    }, [])

  if(data===null)
    return;

  return (
    <div style={{ background:"linear-gradient(to right, black , #1c1056, #494078, #605889, #bbb7cc)"}}>
      <div className="container-fluid" >
        <div className="row" style={{ color: "white",height:window_width<=992?null:window_height}}>
          {/* left container */}
          <div className="col-lg-4 col-md-5 col-12 leftUser" style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly",position:window_width<=767?"static":"fixed",top:"8%" ,height: window_height,padding: "6% 0 5% 3%" }}>
              <div>
                {/* name */}
                <div id="name">
                  <p className="h1 display-4 text-break" style={{ fontWeight: "360" }}>
                    {data["name"]}
                  </p>
                  {
                    data['linkedin']["headline"]&&(<div className=" pt-3" style={{paddingRight:"5%"}}> 
                    <p className="lead">
                      {data['linkedin']["headline"]} 
                    </p>
                  </div>)
                  }
                  {
                    data['year']&&<p className="lead">
                      Batch {data['year']} - {data['year']-2000+4}
                    </p>
                  }
                </div>
    
              {/* contact */}
              <div id="contact">
              {(data["profile"] && data["profile"]["leetcode"] || data["profile"]["github"] || data["profile"]["hackerrank"] || data["profile"]["linkedin"] || data["profile"]["codechef"] || data["profile"]["codeforces"]) && (
                <div className="icons">
                  <div className="h3 pt-5 pb-2">Contact : </div>
                  {data["profile"]["linkedin"] != null && data["profile"]["linkedin"] != "" && (
                    <a href={data["profile"]["linkedin"]} target="_blank" rel="noreferrer">
                      <img src={linkedinLogo} style={iconStyles} alt="linkedin" />
                    </a>
                  )}
                  {data["profile"]["github"] != null && data["profile"]["github"] != "" && (
                    <a href={data["profile"]["github"]} target="_blank" rel="noreferrer">
                      <img src={githubLogo} style={iconStyles} alt="github" />
                    </a>
                  )}
                  {data["profile"]["hackerrank"] != null && data["profile"]["hackerrank"] != "" && (
                    <a href={data["profile"]["hackerrank"]} target="_blank" rel="noreferrer">
                      <img src={hackerrankLogo} style={iconStyles} alt="hackerrank" />
                    </a>
                  )}
                  {data["profile"]["leetcode"] != null && data["profile"]["leetcode"] != "" && (
                    <a href={data["profile"]["leetcode"]} target="_blank" rel="noreferrer">
                      <img src={leetcodeLogo} style={iconStyles} alt="leetcode" />
                    </a>
                  )}
                  {data["profile"]["codeforces"] != null && data["profile"]["codeforces"] != "" && (
                    <a href={data["profile"]["codeforces"]} target="_blank" rel="noreferrer">
                      <img src={codeforcesLogo} style={iconStyles} alt="codeforces" />
                    </a>
                  )}
                  {data["profile"]["codechef"] != null && data["profile"]["codechef"] != "" && (
                    <a href={data["profile"]["codechef"]} target="_blank" rel="noreferrer">
                      <img src={codechefLogo} style={iconStyles} alt="codechef" />
                    </a>
                  )}
                </div>
              )}
              {data["leetcode"]["profile_id"]!= null && (
                <p>
                  <img src={gmailLogo} style={{width: "6%", height: "6%", margin: "2%"}} alt="gmail" /> : {data["leetcode"]["profile_id"]}
                </p>
              )}
              </div>

            </div>
          </div>

          {/* middle container */}
          <div className="col-lg-5 offset-lg-4 col-md-7 offset-md-5 col-12 middleUser py-5 px-3" style={{height:window_width<=991?null:window_height,overflow:"scroll"}} >
            <About about = {data['linkedin']['aboutus']} bgcolor={color_palatte[0]}/>
            <div className="my-4"></div>
            <Skills skills = {data['linkedin']['skills']} bgcolor={color_palatte[1]}/>
            <div className="my-5"></div>
            <Experience experiences = {data['linkedin']['experience']} display_count={15} bgcolor={color_palatte[2]}/>
            <div className="my-5"></div>
            <Education educations = {data['linkedin']['education']} bgcolor={color_palatte[3]}/>
            <div className="my-5"></div>
            <Certifications certifications = {data['linkedin']['certifications']} bgcolor={color_palatte[4]}/>
            <div className="my-5"></div>
            <Projects projects = {data['linkedin']['projects']} bgcolor={color_palatte[5]} display_count={15}/>
            <div className="my-5"></div>
            <Honors honors = {data['linkedin']['honors']} bgcolor={color_palatte[6]} display_count={15}/>
            <div className="my-5"></div>
            <Publications publications = {data['linkedin']['publications']} bgcolor={color_palatte[7]} display_count={10}/>
          </div>

          {/* right container */}
          <div className="col-lg-3  col-md-7 col-12 rightUser ms-md-auto py-5 px-4 " style={{height:window_width<=991?null:window_height,overflow:"scroll"}}>

            {
              data.hackerrank&&(data.hackerrank.badges||data.hackerrank.certificates)&&(
                <div>
                  <HackerrankUser data={data["hackerrank"]} />
                  <hr />
                  <div style={{margin:"15px"}}/>
                </div>
              )
            }
            {
              data.github&&(data.github.own_repo||data.github.no_of_repositories!=0)&&(
                <div>
                  <GithubUser data={data["github"]} />
                  <hr />
                  <div style={{margin:"15px"}}/>
                </div>
              )
            }
            {
              data.leetcode&&(data.leetcode.no_easy_qns + data.leetcode.no_medium_qns > 30)&&(
                <div>
                  <LeetcodeUser data={data["leetcode"]} />
                  <hr />
                  <div style={{margin:"15px"}}/>
                </div>
              )
            } 
            {
              data.codechef&&data.codechef.badges&&(
                <div>
                  <CodechefUser data={data["codechef"]} />
                  <hr />
                  <div style={{margin:"15px"}}/>
                </div>
              )
            }
            {
              data.codeforces&&data.codeforces.rank!==null&&data.codeforces.rank!=="newbie"&&(
                <div>
                  <CodeforcesUser data={data["codeforces"]} />
                  <hr />
                  <div style={{margin:"15px"}}/>
                </div>
              )
            }
          </div>
        </div>     
      </div>
    </div> 
  );
}

export default User;

