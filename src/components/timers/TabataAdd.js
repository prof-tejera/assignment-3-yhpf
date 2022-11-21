import React, { useState } from "react";
import Panel from "../generic/Panel";
import Input from "../generic/Input";
import "../generic/TimersStyle.css";

const TabataAdd = ({onAdd, startTime=0, startRounds=0, startRest=0, showAddButton=false, editable=false, state="not-running", paused=true, onComplete}) => {
    const [timeLeft, setTimeLeft] = useState(startTime);
    const [roundsLeft, setRoundsLeft] = useState(startRounds);
    const [restLeft, setRestLeft] = useState(startRest);

    const addTimerType = () => {
        const update = (item, toDeduct) => {
            item.timeLeft = item.timeLeft - toDeduct;
            if (item.timeLeftInRound === 0 && item.restLeftInRound === 0) {
                item.roundsLeft = item.roundsLeft - 1;
                item.timeLeftInRound = item.originalTime;
                item.restLeftInRound = item.originalRest;
            } else if (item.timeLeftInRound === 0) {
                item.restLeftInRound = item.restLeftInRound - toDeduct;
            } else {
                item.timeLeftInRound = item.timeLeftInRound - toDeduct;
            }
            return item;
        }
        // run when the timer is finished
        const finished = (item) => {
            item.timeLeftInRound = 0;
            item.restLeftInRound = 0;
            item.roundsLeft = 0;
            return item;
        }
        // run when the user clicks reset button
        const reset = (item) => {
            item.timeLeftInRound = item.originalTime;
            item.restLeftInRound = item.originalRest;
            item.roundsLeft = item.originalRounds;
            return item;
        }
        onAdd({ "timerType": "Tabata", 
                "originalTime": timeLeft,
                "timeLeftInRound": timeLeft,

                "originalRounds": roundsLeft,
                "roundsLeft": roundsLeft,

                "originalRest": restLeft,
                "restLeftInRound": restLeft,

                "totalTime": (timeLeft+restLeft)*roundsLeft,
                "update": update, "finished": finished, "reset": reset }
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
                </div>
                <button onClick={addTimerType} className="addButton">Add to Workout</button>
            </div>
        </Panel>
    );
};

export default TabataAdd;