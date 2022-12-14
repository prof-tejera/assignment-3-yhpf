import React, { useState } from "react";
import Panel from "../generic/Panel";
import Input from "../generic/Input";
import InputDesc from "../generic/InputDesc";
import "../generic/TimersStyle.css";

const TabataAdd = ({onAdd, startTime=0, startRounds=0, startRest=0, showAddButton=false, editable=false, state="not-running", paused=true, onComplete}) => {
    const [timeLeft, setTimeLeft] = useState(startTime);
    const [roundsLeft, setRoundsLeft] = useState(startRounds);
    const [restLeft, setRestLeft] = useState(startRest);
    const [timerDesc, setTimerDesc] = useState(0);

    const addTimerType = () => {
        onAdd({ "timerType": "Tabata", 
                "originalTime": timeLeft,
                "timeLeftInRound": timeLeft,

                "originalRounds": roundsLeft,
                "roundsLeft": roundsLeft,

                "originalRest": restLeft,
                "restLeftInRound": restLeft,

                "totalTime": (timeLeft+restLeft)*roundsLeft,
                
                "timerDesc":timerDesc }
            )
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
                    <p className="input-text">Workout time in seconds:</p>
                    <Input 
                        timeChanged={(newTime) => { 
                            setTimeLeft(newTime*1000) 
                        }}
                        placeholder="input in seconds"
                    />
                    <p className="input-text">Rest time in seconds:</p>
                    <Input
                        timeChanged={(newRest) => { 
                            setRestLeft(newRest*1000) 
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

export default TabataAdd;