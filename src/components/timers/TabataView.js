import React from "react";
import Panel from "../generic/Panel";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";
import "../generic/TimersStyle.css";

const TabataView = ({item}) => {
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
                        <p className="timer-text">Workout time</p>
                        <DisplayTime time={item.timeLeftInRound} />
                    </div>
                    <div className="restDisplay">
                        <p className="timer-text">Rest time</p>
                        <DisplayTime time={item.restLeftInRound} />
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default TabataView;