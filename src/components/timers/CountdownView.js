import React from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import "../generic/TimersStyle.css";

const CountdownView = ({item}) => {
    return (
        <Panel>
            <div className="panel">
                <div className="timerArea">
                    <p className="timer-text">Time</p>
                    <DisplayTime 
                        time={item.timeLeft}
                        showTimeUp={true}
                        isActive={item.state !== "not-running"}
                    />
                </div>
            </div>
        </Panel>
    );
}

export default CountdownView;