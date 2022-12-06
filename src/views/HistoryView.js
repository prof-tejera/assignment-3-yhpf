import React from "react";
import "./ViewsStyle.css";

// i think the eastiest way is to utalize the saved work out from local storage
// saved in the presistant stat work
// maybe add possibility to clear history

const History = () => {
    return (
        <>
            <h2 className="testing">Workout History</h2>
            <h3 className="testing">Workout 1</h3>
            <h4 className="testing">Summary</h4>
            <p className="testing">summary of all timers run</p>
            <p className="testing">durations/rounds for each timer</p>
        </>
    )
    
};

export default History;

