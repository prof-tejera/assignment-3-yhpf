import React, { useContext, useEffect } from "react";
import CountdownView from "./timers/CountdownView";
import StopwatchView from "./timers/StopwatchView";
import XYView from "./timers/XYView";
import TabataView from "./timers/TabataView";
import { Context } from "../Context";
import "../views/ViewsStyle.css";

// TimerList is the list of timers
const TimerList = ({activeTimer, onTimerCompleted, showDelete, isPaused}) => {
    const { timerList, setTimerList } = useContext(Context);

    //https://www.robinwieruch.de/react-remove-item-from-list/
    const handleRemove = (id) => {
        const newList = timerList.filter((item) => item.id !== id);
        setTimerList(newList);
    }

    useEffect(() => {
        if (activeTimer >= 0) {
            const timer = setInterval(() => {
                if (isPaused) { return }
                // find the timer in the list
                const currentTimer = timerList.find(item => item.id === activeTimer);
                if (currentTimer.timeLeft > 0 && currentTimer.state !== "finished") {
                    setTimerList(
                        timerList.map(item => {
                            if (item.id === activeTimer) {
                                return item.update(item, 10);
                            } else {
                                return item;
                            }
                        })
                    );
                } else {
                    // make sure we finish the current timer
                    setTimerList(
                        timerList.map(item => {
                            if (item.id === activeTimer) {
                                item = item.finished(item);
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
            }, 10);

            return () => clearTimeout(timer);
        }
    }, [timerList, setTimerList, activeTimer, onTimerCompleted, isPaused]);

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
                    { showDelete ? <button  onClick={() => handleRemove(item.id)} className="removeButton">Remove</button> : <></> }
                </div>
            ))}
        </div>
    )
}

export default TimerList;
