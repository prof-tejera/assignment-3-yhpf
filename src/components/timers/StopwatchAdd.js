import React, { useState } from "react";
import Panel from "../generic/Panel";
import InputDesc from "../generic/InputDesc";
import "../generic/TimersStyle.css";

//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

const StopwatchAdd = ({onAdd}) => {
    // max time needed for total workout time etc.
    const MAX_TIME = 60*1000;
    // timer description
    const [timerDesc, setTimerDesc] = useState(0);

    const addTimerType = () => {
        onAdd({ "timerType": "Stopwatch", "totalTime": MAX_TIME, "timeLeft": MAX_TIME, "currentTime": 0, "timerDesc":timerDesc })
    }

    // input time in seconds
    // display time in minutes, seconds and tenth/hundreds
    return (
        <Panel>
            <div className="panel">
                <p className="input-text">Description:</p>
                <InputDesc 
                    descChanged = {(newDesc) => { 
                        setTimerDesc(newDesc) 
                    }}
                    placeholder="What to do" 
                />
                <button onClick={addTimerType} className="addButton">Add to Workout</button>
                
            </div>
        </Panel>
    );
};

export default StopwatchAdd;