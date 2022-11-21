import React, { useContext } from "react";
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

    // i need to fix the clear button. for now remove timer by timer
    // <Link to="/add"><button className="ClearButton">Clear Workout</button></Link>
    return (
        <>
        <div className="ViewTitle">
            <h1>Create new Workout</h1>
        </div>
        <div className="SaveCancel">
            <Link to="/"><button className="WorkoutButton">Go to Workout</button></Link>
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