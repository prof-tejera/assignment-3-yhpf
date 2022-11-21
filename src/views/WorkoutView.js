import React, { useContext, useState } from "react";
import "./ViewsStyle.css";
import WorkoutButtons from "../components/WorkoutButtons";
import TimerList from "../components/TimerList";
import { Context } from "../Context";

const WorkoutView = () => {
  const { timerList, setTimerList } = useContext(Context);
  const [ activeTimer, setActiveTimer ] = useState(-1);
  const [ isPaused, setIsPaused ] = useState(false);

  const onStart = () => {
    if (timerList.length > 0) {
      setActiveTimer(timerList[0].id);
      startTimer(timerList[0].id);
    }
  }

  const onPauseResume = (pauseResume) => {
    setIsPaused(pauseResume);
  }

  const onFastForward = () => {
    nextTimer(activeTimer);
  }

  const onReset = () => {
    setActiveTimer(-1);
    setIsPaused(false);
    setTimerList(
      timerList.map(item => {
        // reset the item to original state, like in AddView
        item.state = "not-running";
        item.timeLeft = item.totalTime;
        return item.reset(item);
      })
    );
  }

  const nextTimer = (id) => {
    // set the current timer to finished
    updateTimerState(id, "finished");

    // find the next timer in the list
    // answer #2 in https://stackoverflow.com/questions/7346827/how-to-find-the-array-index-with-a-value
    const currentId = timerList.findIndex(item => item.id === id);
    if (currentId < timerList.length-1) {
      // we are not at the end of the timer list
      setActiveTimer(timerList[currentId+1].id);
      startTimer(timerList[currentId+1].id);
    } else {
      // we are at the tend of the list of timers
      setActiveTimer(-1);
      stopTimers();
    }
  }

  const startTimer = (timer) => {
    updateTimerState(timer, "running");
  }

  const stopTimers = (timer) => {
    setTimerList(
      timerList.map(item => {
          return { ...item, state: "finished" };
        })
    );
  }

  const updateTimerState = (id, newState) => {
    setTimerList(l => // https://typeofnan.dev/why-you-cant-setstate-multiple-times-in-a-row/
      l.map(item => {
        if (item.id === id) {
          return { ...item, state: newState };
        } else {
          return item;
        }
      })
    );
  }

  return (
    <>
    <div className="ViewTitle">
      <h1>Workout - Let's Go!</h1>
    </div>
    <div className="WorkoutView">
      <div className="WorkoutTimerDisplay">
        <h2>Total Workout Time</h2>
        <WorkoutButtons onClickRun={ onStart } onClickPause={ onPauseResume } onFastForward={ onFastForward } onReset={ onReset } />
      </div>
      <TimerList activeTimer={activeTimer} onTimerCompleted={ nextTimer } showDelete={activeTimer<0} isPaused={isPaused} />
    </div>
    </>
  );
};

export default WorkoutView;
