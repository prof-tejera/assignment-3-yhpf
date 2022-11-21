import React, { useState } from "react";
import Panel from "../generic/Panel";
import Input from "../generic/Input";
import "../generic/TimersStyle.css";

const XYAdd = ({onAdd}) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [roundsLeft, setRoundsLeft] = useState(0);

    const addTimerType = () => {
        // update function is run every time the timer is updated
        // keeps track of the rounds left and the time left in each round
        const update = (item, toDeduct) => {
            item.timeLeft = item.timeLeft - toDeduct;
            item.timeLeftInRound = item.timeLeftInRound - toDeduct;
            if (item.timeLeftInRound === 0) {
                item.roundsLeft = item.roundsLeft - 1;
                item.timeLeftInRound = item.originalTime;
            }
            return item;
        }
        // run when the timer is finished
        const finished = (item) => {
            item.timeLeftInRound = 0;
            item.roundsLeft = 0;
            return item;
        }
        // run when the user clicks reset button
        const reset = (item) => {
            item.timeLeftInRound = item.originalTime;
            item.roundsLeft = item.originalRounds;
            return item;
        }
        onAdd({ "timerType": "XY", 
            "originalTime": timeLeft, 
            "timeLeftInRound": timeLeft,
            "originalRounds": roundsLeft, 
            "roundsLeft": roundsLeft, 
            "totalTime": timeLeft*roundsLeft,
            "update": update,
            "finished": finished,
            "reset": reset
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
                </div>
                <button onClick={addTimerType} className="addButton">Add to Workout</button> 
            </div>
        </Panel>
    );
};

export default XYAdd;
