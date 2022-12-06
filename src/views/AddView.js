import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./ViewsStyle.css";
import StopwatchAdd from "../components/timers/StopwatchAdd";
import CountdownAdd from "../components/timers/CountdownAdd";
import XYAdd from "../components/timers/XYAdd";
import TabataAdd from "../components/timers/TabataAdd";
import TimerList from "../components/TimerList";
import { Context } from "../Context";

const AddView = () => {
    const { timerList, setTimerList, maxId, setMaxId } = useContext(Context);

    const [ urlParams, setUrlParams ] = useState('');

    const addToList = (item) => {
        item.id = maxId;
        item.state = "not-running";
        item.timeLeft = item.totalTime; // set the time left on the timer to be the same as the total time it should spend
        setTimerList([...timerList, item]);
        setMaxId(maxId+1);
    }

    const timers = [
        { title: "Stopwatch", C: <StopwatchAdd onAdd={addToList} /> },
        { title: "Countdown", C: <CountdownAdd onAdd={addToList} /> },
        { title: "XY", C: <XYAdd onAdd={addToList} /> },
        { title: "Tabata", C: <TabataAdd onAdd={addToList} /> },
    ];

    // https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter
    const saveStateToUrl = () => {
        var searchParams = new URLSearchParams(window.location.search);
        searchParams.set('timers', JSON.stringify(timerList));
        var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        window.history.pushState(null, '', newRelativePathQuery);
        setUrlParams(searchParams.toString());
    }

    // i need to add some kind of save button to be able to localy store
    // workout using persistant state and URL

    // add descriptoion field for each timer

    // i need to fix the clear button. for now remove timer by timer
    // <Link to="/add"><button className="ClearButton">Clear Workout</button></Link>
    return (
        <>
        <div className="ViewTitle">
            <h1>Create new Workout</h1>
        </div>
        <div className="SaveCancel">
            <Link to={{ pathname: "/", search: urlParams }} ><button className="WorkoutButton">Go to Workout</button></Link>
        </div>
        <div className="SaveCancel">
            <button className="WorkoutButton" onClick={saveStateToUrl}>Save</button>
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