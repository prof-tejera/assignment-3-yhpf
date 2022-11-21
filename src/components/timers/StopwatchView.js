import React from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import "../generic/TimersStyle.css";

//https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

const StopwatchView = ({item}) => {
    // input time in seconds
    // display time in minutes, seconds and tenth/hundreds
    return (
        <Panel>
            <div className="panel">
                <div className="timerArea">
                    <DisplayTime time={item.currentTime} />
                </div>
            </div>
        </Panel>
    );
};

export default StopwatchView;