import React from "react";
import Panel from "../generic/Panel";
import "../generic/TimersStyle.css";

//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

const StopwatchAdd = ({onAdd}) => {
    // max time needed for total workout time etc.
    const MAX_TIME = 60*1000;

    const addTimerType = () => {
        // update: Updates the timer so that the values are accurate
        const update = (item, toDeduct) => {
            item.timeLeft -= toDeduct; // how much time it has left until the stopwatch is done
            item.currentTime += toDeduct; // what to show, as the stopwatch counts upward
            return item;
        }
        // run when the timer is finished
        const finished = (item) => item;
        // run when the user clicks reset button
        const reset = (item) => {
            item.currentTime = 0;
            return item;
        }
        onAdd({ "timerType": "Stopwatch", "totalTime": MAX_TIME, "timeLeft": MAX_TIME, "currentTime": 0, "update": update, "finished": finished, "reset": reset })
    }

    // input time in seconds
    // display time in minutes, seconds and tenth/hundreds
    return (
        <Panel>
            <div className="panel">
                <button onClick={addTimerType} className="addButton">Add to Workout</button>
            </div>
        </Panel>
    );
};

export default StopwatchAdd;