import React, { useContext, useEffect, useState } from "react";
import CountdownView from "./timers/CountdownView";
import StopwatchView from "./timers/StopwatchView";
import XYView from "./timers/XYView";
import TabataView from "./timers/TabataView";
import { Context } from "../Context";
import { saveStateToUrl } from "../utils/helpers";
import "../views/ViewsStyle.css";
import TimerActions from "./timers/TimerActions";

// TimerList is the list of timers
const TimerList = ({activeTimer, onTimerCompleted, setElapsedTime, showDelete, isPaused}) => {
    const { timerList, setTimerList, setSearchParams, setCurrentWorkout, referenceTime, setReferenceTime } = useContext(Context);


    //https://www.robinwieruch.de/react-remove-item-from-list/
    const handleRemove = (id) => {
        const newList = timerList.filter((item) => item.id !== id);
        setTimerList(newList);
    }

    const [numberOfPasses, setNumberOfPasses] = useState(0);

    useEffect(() => {

        if (activeTimer >= 0) {
            // https://medium.com/@bsalwiczek/building-timer-in-react-its-not-as-simple-as-you-may-think-80e5f2648f9b
            const timer = setInterval(() => {
                const now = Date.now();
                const interval = now - referenceTime;
                setReferenceTime(now);
                if (isPaused) { return }
                // find the timer in the list
                const currentTimer = timerList.find(item => item.id === activeTimer);
                if (currentTimer.timeLeft > 0 && currentTimer.state !== "finished") {
                    setTimerList(
                        timerList.map(item => {
                            if (item.id === activeTimer) {
                                return TimerActions[item.timerType].update(item, interval);
                            } else {
                                return item;
                            }
                        })
                    );
                    // to calculate how much time has passed, go through all the timers up
                    // to the current one and calculate totalTime - timeLeft
                    if (setElapsedTime) {
                        let timeElapsed = 0;
                        for (let i = 0; i <= timerList.length; i++) {
                            if (timerList[i]) {
                                timeElapsed += timerList[i].totalTime-timerList[i].timeLeft;
                            }
                        }
                        setElapsedTime(timeElapsed);    
                    }

                } else {
                    // make sure we finish the current timer
                    setTimerList(
                        timerList.map(item => {
                            if (item.id === activeTimer) {
                                item = TimerActions[item.timerType].finished(item);
                                item.state = "finished";
                                return item;
                            } else {
                                return item;
                            }
                        })
                    );
                    onTimerCompleted(activeTimer);
                    clearTimeout(timer);
                }
                // here we save the state and the index to local storage so that we can load this back
                // when we reload the page
                if (numberOfPasses % 20 === 0) { // should happen every two seconds given we run timer every 50ms
                    window.localStorage.setItem('startState', JSON.stringify(timerList));
                }
                setNumberOfPasses(numberOfPasses+1);

            }, 50);

            return () => clearTimeout(timer);
        }
    }, [timerList, activeTimer, onTimerCompleted, isPaused, numberOfPasses, referenceTime, setReferenceTime, setTimerList, setElapsedTime]);

    // https://stackoverflow.com/questions/71580951/react-how-to-swap-elements-in-to-do-list-by-their-priorities
    const handleSwap = (timerList, item, delta) => {
        const newCounts = [...timerList]
        const first = newCounts.indexOf(item);
        newCounts.splice(first, 1);
        newCounts.splice(first + delta, 0, item);
        setTimerList(newCounts)

        // todo: not copy and paste this to addview
        const wo = saveStateToUrl(newCounts, setSearchParams);
        setCurrentWorkout(wo);
        window.localStorage.removeItem('startState');
    }

    // update the timer on timerlist change.
    useEffect(() => {
        // dupliating this from above beause i can't get it to deploy
        // when it's a function
        if (setElapsedTime) {
            let timeElapsed = 0;
            for (let i = 0; i <= timerList.length; i++) {
                if (timerList[i]) {
                    timeElapsed += timerList[i].totalTime-timerList[i].timeLeft;
                }
            }
            setElapsedTime(timeElapsed);    
        }
    }, [timerList, setElapsedTime]);
   
    return (
        <div className="ItemsList ActiveItemsList">
            <h2 className="timerListTitle">List of Timers in Workout</h2>
            {timerList.map((item, i) => (
                <div key={item.id} className={"Item state-"+item.state}>
                    <div className="ItemTitle">{item.timerType}</div>
                        { item.timerType === "Stopwatch" ? 
                            <StopwatchView item={item} /> 
                        : item.timerType === "Countdown" ? 
                            <CountdownView item={item} />  
                        : item.timerType === "XY" ? 
                            <XYView item={item} />
                        : item.timerType === "Tabata" ? 
                            <TabataView item={item} /> 
                        : "" }
                    <div className="container">
                        { showDelete ? <button  onClick={() => handleRemove(item.id)} className="removeButton">Remove</button> : <></> }
                        { showDelete ? <button onClick={() => handleSwap(timerList, item, -1)} className="swapButton">&#9650;</button> : <></> }
                        { showDelete ? <button onClick={() => handleSwap(timerList, item, 1)} className="swapButton">&#9660;</button> : <></> }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TimerList;