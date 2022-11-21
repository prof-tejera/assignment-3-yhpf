import React, { useState, useContext } from "react";
import Panel from "./generic/Panel";
import DisplayTime from "./generic/DisplayTime";
import Button from "./generic/Button";
import ButtonPanel from "./generic/ButtonPanel";
import "./generic/TimersStyle.css";
import { Context } from "../Context";

const WorkoutButtons = ({onClickRun, onClickPause, onFastForward, onReset}) => {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const { timerList } = useContext(Context);

    // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
    const totalLength = timerList.length === 0 ? 0 : timerList.reduce((a, b) => a + b.totalTime, 0);

    // buttons functionality 
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
        onClickRun();
    };
      
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
        onClickPause(!isPaused);
    };

    const handleFastForward = () => {
        onFastForward();
    };

    const handleReset = () => {
        setIsActive(false);
        onReset();
    };

    // buttons panel
    const StartButton = (
        <div>
            <div>
                <Button 
                    className="start fa fa-play" 
                    onClick={handleStart}
                    text=""
                    title="start"
                />
            </div>
        </div>
    );

    // input time in seconds
    // display time in minutes, seconds and tenth/hundreds
    return (
        <Panel>
            <div className="panel">
                <div className="timerArea totalTimerArea">
                    <div className="roundsDisplay">
                        <DisplayTime time={totalLength} />
                        <br />
                        <div className="buttonPanel">
                            {timerList.length > 0 ? 
                            <>
                                {isActive ? 
                                <ButtonPanel handleFastForward={handleFastForward} handlePauseResume={handlePauseResume} handleReset={handleReset} isPaused={isPaused} /> 
                                : 
                                StartButton}
                            </>
                                : "no timers added" }
                        </div>
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default WorkoutButtons;