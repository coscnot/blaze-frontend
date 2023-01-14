//https://codeforces.com/blog/entry/3064
export default function CodeforcesUser(props)
{
    return  <div >
                <div style={{fontSize:"1.75rem"}}>Codeforces</div>
                {props.data.rank&&<p>
                    {props.data.rank}
                    </p>}
            </div>
    
}