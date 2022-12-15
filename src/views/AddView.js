import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ViewsStyle.css";
import StopwatchAdd from "../components/timers/StopwatchAdd";
import CountdownAdd from "../components/timers/CountdownAdd";
import XYAdd from "../components/timers/XYAdd";
import TabataAdd from "../components/timers/TabataAdd";
import TimerList from "../components/TimerList";
import { Context } from "../Context";
import { saveStateToUrl } from "../utils/helpers";
import TimerActions from "../components/timers/TimerActions";

const AddView = () => {
    const { timerList, setTimerList, searchParams, setSearchParams, setCurrentWorkout } = useContext(Context);

    // whenever we load this page, we want to make sure that we reset the state of each timer in the list
    useEffect(() => {
        setTimerList(
            timerList.map((item) => {
                item = TimerActions[item.timerType].reset(item);
                item.state = "not-running";
                item.timeLeft = item.totalTime;
                return item;
            })
        );
    }, []);

    const addToList = (item) => {
        // find the max id currently in the list, or 0 if list is empty.
        const maxId = timerList.length ? Math.max(...timerList.map(item => item.id))+1 : 0;
        item.id = maxId;
        item.state = "not-running";
        item.timeLeft = item.totalTime; // set the time left on the timer to be the same as the total time it should spend
        setTimerList([...timerList, item]);
    }

    const timers = [
        { title: "Stopwatch", C: <StopwatchAdd onAdd={addToList} /> },
        { title: "Countdown", C: <CountdownAdd onAdd={addToList} /> },
        { title: "XY", C: <XYAdd onAdd={addToList} /> },
        { title: "Tabata", C: <TabataAdd onAdd={addToList} /> },
    ];

    const saveState = () => {
        // todo: not copy and paste this to timerlist
        const wo = saveStateToUrl(timerList, setSearchParams);
        setCurrentWorkout(wo);
        // clear any previously loaded state from here.
        window.localStorage.removeItem('startState');
    }

    const clearWorkout = () => {
        setTimerList([]); 
        setSearchParams(""); 
        setCurrentWorkout(''); 
        window.localStorage.removeItem('startState');
    }

    // i need to fix the clear button. for now remove timer by timer
    // <Link to="/add"><button className="ClearButton">Clear Workout</button></Link>
    return (
        <>
        <div className="ViewTitle">
            <h1>Create/Edit Workout</h1>
        </div>
        <div className="container">
            <div className="SaveCancel">
                <Link to={{ pathname: "/", search: searchParams }}><button className="WorkoutButton" >Go to Workout</button></Link>
            </div>
            <div className="SaveCancel">
                <button className="WorkoutButton" onClick={() => { saveState() }}>Save</button>
            </div>
            <div className="SaveCancel">
                <button className="ClearButton" onClick={ () => { clearWorkout() } }>Clear Workout</button>
            </div>
        </div>
        <div className="ViewParagraph">
            <p>Don't forget to Save your workout.</p>
        </div>
        <div className="WorkoutView">
            <div className="Timers">
                <h2>Add timers to Workout</h2>
                {timers.map((timer, i) => (
                    <div className="Timer" key={i}>
                        <div className="TimerTitle">
                            {timer.title}
                        </div>
                        {timer.C}
                    </div>
                ))}
            </div>
            <TimerList activeTimer={-1} showDelete={true} />
        </div>
        </>
    );
};
  
export default AddView;