import { useState } from 'react';
import {Optimal} from './Optimal.js';
import {BruteForce} from './BruteForce.js';
import GenerateForm from './GenerateForm.jsx'
import BuildForm from './BuildForm.jsx'
import './Visualizer.css'

export default function Visualizer() {

    const [river, setRiver] = useState(()=>initialiseRiver(10,10));
    const [colors, setColors] = useState(()=>initialiseColors(10));
    const [disable, setDisable] = useState(false);
    const [dp, setDp] = useState(initialiseDp(10));
    const [bf, setBF] = useState({curr: -1, min: -1});

    function initialiseRiver(len, depth) {
        const newRiver = new Array(len);
        for(let i = 1; i<len-1; i++) {
            newRiver[i] = Math.floor(Math.random()*depth)+1;
        }
        newRiver[0] = 0;
        newRiver[len-1] = 0;
        return newRiver;
    }

    function initialiseColors(n) {
        const newColors = new Array(n).fill("lightseagreen");
        return newColors;
    }

    function initialiseDp(n) {
        const newDp = new Array(n).fill({value:-1, color:"skyblue"});
        return newDp;
    }

    const generateNew = (len, depth) => {
        setColors(initialiseColors(parseInt(len)));
        setDp(initialiseDp(parseInt(len)));
        setBF({curr: -1, min: -1});
        setRiver(initialiseRiver(parseInt(len), parseInt(depth)));
    }

    function optimal(hd, speed) {
        setDisable(true);
        setBF({curr: -1, min: -1});
        const animations = Optimal(river, parseInt(hd));
        const n = animations.length;
        for(let i = 0; i<n; i++) {
            setTimeout(() => {
                const newColors = initialiseColors(river.length);
                const newDp = initialiseDp(river.length);
                if(typeof animations[i][0] !== 'number') {
                    for(let j of animations[i][0]) {
                        newColors[j] = "green";
                    }
                    newColors[animations[i][1]] = "red";
                    newDp[animations[i][1]] = {value: animations[i][2], color: 'darkgreen'};
                } else {
                    newColors[animations[i][0]] = "red";
                    newDp[animations[i][1]] = {value: animations[i][3], color: 'yellow'}
                    newDp[animations[i][4][0]] = {value: animations[i][4][1], color: 'darkgreen'}
                    for(let j of animations[i][2]) {
                        newColors[j] = "yellow";
                    }
                    newColors[animations[i][1]] = "orange";
                }
                setColors(newColors);
                setDp(newDp);
            }, 100*speed*i);
        }
        setTimeout(() => {
            setDisable(false);
        }, 100*speed*n);
    }
    
    function bruteForce(hd, speed) {
        setDisable(true);
        setDp(initialiseDp(parseInt(river.length)));
        const [animations,ans] = BruteForce(river, parseInt(hd));
        const n = animations.length;
        for(let i = 0; i<n; i++) {
            setTimeout(() => {
                const newColors = initialiseColors(river.length);
                for(let j of animations[i][0]) {
                    newColors[j] = 'red';
                }   
                setBF({curr: animations[i][1], min:animations[i][2]});
                
                setColors(newColors);
            }, 25*speed*i);
        }
        setTimeout(() => {
            const newColors = initialiseColors(river.length);
            for(let j of ans) {
                newColors[j] = 'green';
            }
            setBF((old) => {return {...old, curr:old.min}});
            setColors(newColors);
            setDisable(false);
        }, 25*speed*n);
    }

    return (
        <>
            <GenerateForm generateNew={generateNew} disable={disable}></GenerateForm>
            <div className='sky'>
                <div className="text" style={{color: (bf.min==-1) ? "skyblue" : "black"}}>
                    <p>Minimum = {bf.min} <br/>
                    Current = {bf.curr}</p>
                </div>
                <div>
                    {dp.map((obj, ind) => (
                        <div key={ind} className='ans' style={{color: obj.color}}>{obj.value}</div>
                    ))}
                </div>
                <div className='bridge'></div>
            </div>
            <div className='ground'>
                {river.map((value, ind) => (
                    <div
                        key={ind} 
                        className='water' 
                        style={{
                            // height: `${2*value}vh`, 
                            height: `${15*value}px`, 
                            backgroundColor: colors[ind]
                        }}>
                    </div>
                ))}
            </div>
            <BuildForm optimal={optimal} bruteForce={bruteForce} len={river.length} disable={disable}></BuildForm>
        </>
    );
}