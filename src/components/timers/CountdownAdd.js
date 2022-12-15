import React, { useState } from "react";
import Panel from "../generic/Panel";
import Input from "../generic/Input";
import InputDesc from "../generic/InputDesc";
import "../generic/TimersStyle.css";

// https://www.geeksforgeeks.org/create-a-stop-watch-using-reactjs/
const Countdown = ({onAdd}) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerDesc, setTimerDesc] = useState(0);

    const addTimerType = () => {
        onAdd({ "timerType": "Countdown", "timerTime": timeLeft, "totalTime": timeLeft, "timerDesc":timerDesc })
    }

    // input time in seconds
    // display time in minutes, seconds and tenth/hundreds
    return (
        <Panel>
            <div className="panel">
                <div>
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

export default Countdown;