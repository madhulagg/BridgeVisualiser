import { useState } from "react";
import './Visualizer.css'

export default function BuildForm({ bruteForce,optimal,len,disable }) {
    const [data, setData] = useState({dis: 3, speed : 5});
    
    const handleOptimal = (evt) => {
        evt.preventDefault();
        optimal(data.dis, 10-data.speed);
    }
    const handleBruteForce = (evt) => {
        evt.preventDefault();
        bruteForce(data.dis, 10-data.speed);
    }
    const handleChange = (evt) => {
        setData(currData => {return {
            ...currData,
            [evt.target.name] : evt.target.value
        }});
    }

    return (
        <form style={{marginTop:'10px'}}>
            <label htmlFor="length">Maximum distance between supports</label>
            <input type="number" id="length" value={data.dis} name="dis" min={2} max={len-2} onChange={handleChange}/>

            <label htmlFor="speed" style={{marginLeft:"10px"}}>Speed</label>
            <input type="range" id="speed" value={data.speed} name="speed" min="2" max="8" onChange={handleChange}/>
            
            <button style={{marginLeft:"10px"}} disabled={disable} onClick={handleOptimal}>Dynamic Programming</button>
            <button style={{marginLeft:"10px"}} disabled={disable} onClick={handleBruteForce}>Brute Force</button>
        </form>
    )
}