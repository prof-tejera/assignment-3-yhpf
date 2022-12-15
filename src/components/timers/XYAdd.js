import React, { useState } from "react";
import Panel from "../generic/Panel";
import Input from "../generic/Input";
import InputDesc from "../generic/InputDesc";
import "../generic/TimersStyle.css";

const XYAdd = ({onAdd}) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [roundsLeft, setRoundsLeft] = useState(0);
    const [timerDesc, setTimerDesc] = useState(0);

    const addTimerType = () => {
        onAdd({ "timerType": "XY", 
            "originalTime": timeLeft, 
            "timeLeftInRound": timeLeft,
            "originalRounds": roundsLeft, 
            "roundsLeft": roundsLeft, 
            "totalTime": timeLeft*roundsLeft,
            "timerDesc":timerDesc
        })
    }

    // input time in seconds
    // display time in minutes, seconds and tenth/hundreds
    return (
        <Panel>
            <div className="panel">
                <div>
                    <p className="input-text">Number of rounds:</p>
                    <Input 
                        timeChanged={(newRounds) => { 
                            setRoundsLeft(newRounds) 
                        }}
                        placeholder="number of rounds"
                    />
                    <p className="input-text">Time in seconds:</p>
                    <Input 
                        timeChanged={(newTime) => { 
                            setTimeLeft(newTime*1000) 
                        }}
                        placeholder="input in seconds"
                    />
                    <p className="input-text">Description:</p>
                    <InputDesc 
                        descChanged = {(newDesc) => { 
                            setTimerDesc(newDesc) 
                        }}
                        placeholder="What to do" 
                    />
                </div>
                <button onClick={addTimerType} className="addButton">Add to Workout</button> 
            </div>
        </Panel>
    );
};

export default XYAdd;
