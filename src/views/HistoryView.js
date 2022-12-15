import React, { useContext } from "react";
import { Context } from "../Context";

import "./ViewsStyle.css";

const History = () => {
    const { workoutHistory, setWorkoutHistory } = useContext(Context);

    const renderOneWorkout = (workout, i) => {
        const timers = workout.map(renderOneItem);
        // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
        const totalWorkoutTime = workout.map((item) => item.totalTime).reduce((partialSum, a) => partialSum + a, 0);
        return (
            <li key={i} className="historyWorkout">
                <h3>Workout {i+1}</h3>
                <p>Number of timers: {timers.length}</p>
                <p>Total workout time: {totalWorkoutTime/1000} sec</p>
                {timers}
            </li>
        )
    }

    const renderOneItem = (item) => {
        switch (item.timerType) {
            case "XY": return (
                <div key={"item-"+item.id}>
                    <h4>XY</h4>
                    <p>Total timer time: { item.totalTime/1000 } sec</p>
                    <p>Nr of Rounds: { item.originalRounds }</p>
                    <p>Description: { item.timerDesc }</p>
                </div>

            )
            case "Tabata": return (
                <div key={"item-"+item.id}>
                    <h4>Tabata</h4>
                    <p>Total timer time: { item.totalTime/1000 } sec</p>
                    <p>Nr of Rounds: { item.originalRounds }</p>
                    <p>Description: { item.timerDesc }</p>
                </div>
            )
            case "Countdown": return (
                <div key={"item-"+item.id}>
                    <h4>Countdown</h4>
                    <p>Total timer time: { item.totalTime/1000 } sec</p>
                    <p>Description: { item.timerDesc }</p>
                </div>
            )
            case "Stopwatch": return (
                <div key={"item-"+item.id}>
                    <h4>Stopwatch</h4>
                    <p>Description: { item.timerDesc }</p>
                </div>
            )
            default: return (<h4>Unknown</h4>)
        }
    }

    const timerList = workoutHistory.map(renderOneWorkout);

    const clearHistory = () => {
        setWorkoutHistory([]);
        window.localStorage.removeItem('workoutHistory');
    }

    return (
        <>
            <div className="ViewTitle">
                <h1 className="testing">Workout History</h1>
                <p className="testing">If long workout you can scroll in box to see all info.</p> 
                <div className="SaveCancel">
                    <button className="ClearButton" onClick={ () => { clearHistory() } }>Clear History</button>
                </div>
            </div>
            <div>
                <ul className="historyArea">
                    {timerList}
                </ul>
            </div>
        </>
    )
};

export default History;

