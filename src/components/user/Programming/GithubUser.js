import Counter from "../../platforms/Counter"

export default function GithubUser(props)
{
    return (
        <div>
            <div className="pb-1" style={{fontSize:"1.75rem"}}>Github</div>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                {props.data.own_repo && <div style={{display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
                        {props.data.own_repo.sort(function(a, b){
                            return a.name.length - b.name.length;
                        }).map(
                            (repo)=>{return <li><a href={repo.url} target="_blank" rel="noreferrer" style={{color:"white",textDecoration:"none"}}>{repo.name}</a></li>;}
                        ).slice(0,4)}
                    </div>
                }
                <div style={{"width":"120px"}}>
                    <p style={{color:"purple",backgroundColor:"white",textAlign:"center",borderRadius:"6px"}}>
                        <p style={{fontSize:"4rem",fontWeight:"700",marginBottom:"0",borderBottom:"grey 1px solid"}}>
                            <Counter value={props.data.no_of_repositories} duration={2}/>
                        </p>
                        <p className="mt-0">Repositories</p>
                    </p>
                </div>
            </div>
        </div>
    )
}