import React from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import "../generic/TimersStyle.css";

const XYView = ({item}) => {
    // input time in seconds
    // display time in minutes, seconds and tenth/hundreds
    return (
        <Panel>
            <div className="panel">
                <div className="timerArea">
                    <div className="roundsDisplay">
                        <p className="timer-text">Rounds</p>
                        <DisplayRounds
                            timedOut={item.state==="finished"}
                            roundsLeft={item.roundsLeft}
                            originalRounds={item.originalRounds}
                        />
                    </div>
                    <div className="timerDisplay">
                        <p className="timer-text">Time</p>
                        <DisplayTime time={item.timeLeftInRound} />
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default XYView;
