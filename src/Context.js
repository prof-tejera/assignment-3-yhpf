import React, { useEffect, useState } from "react";
import { usePersistedState } from "./hooks";
import { loadFromLocalStorage } from "./utils/helpers";

// https://www.geeksforgeeks.org/how-to-share-state-across-react-components-with-context/
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {

	const getKeyFromUrl = (storageKey, fallbackValue) => {
		const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop),
		  });
		// get the value of "some_key" in eg "https://example.com/?some_key=some_value"
		const storedValue = params[storageKey]; 
		if (storedValue === null || !storedValue) {
			console.log('returning fallback', fallbackValue);
			return fallbackValue;
		} else {
			return storedValue;
		}
	}

	const getStateFromUrl = (storageKey, fallbackValue) => {
		const data = getKeyFromUrl(storageKey, fallbackValue);
		// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
		if (data === fallbackValue) {
			return fallbackValue;
		}

		try {
			return JSON.parse(data);
		} catch (e) {
			console.log('Error parsing stored value', e);
			return null;
		}
	}

	const [isPaused, setIsPaused] = useState(true);
	const [isActive, setIsActive] = useState(false);
	const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search).toString());

	// to make sure we time acccurately.
	const [referenceTime, setReferenceTime] = useState(Date.now());

	const [timerList, setTimerList] = useState(getStateFromUrl('timers',[]));

	// load all the saved values if any exist
	// need to save this over in the edit view when you press save
	const [currentWorkout, setCurrentWorkout] = usePersistedState('currentWorkout','');

	// load history
	const [workoutHistory, setWorkoutHistory] = usePersistedState('workoutHistory',[]);
	
	// run this only once, at application start
	// this looks at if the workout we've stored state for in localstorage and
	// the workout that is passed in the URL are the same workout
	//
	// if so, we load the index of the current running timer, and the state of that timer
	// into startIndex and startState
	//
	// otherwise, we clear those two keys, so that we don't have anything polluting our cache
	useEffect(() => {
		const storedWorkout = loadFromLocalStorage('currentWorkout');
		const urlWorkout = new URLSearchParams(window.location.search).toString();
		// if the workout we've saved is the same as the one in the URL,
		// then load the different values
		if (storedWorkout == urlWorkout) {
			const potentialTimerList = loadFromLocalStorage('startState', []);
			if (potentialTimerList.length > 0) {
				setTimerList(potentialTimerList);
			}
		} else {
			window.localStorage.removeItem('startState');
		}
	}, []);

	return (
		<Context.Provider 
		value={{ 
			timerList, 
			setTimerList, 
			referenceTime,
			setReferenceTime,
			isPaused, 
			setIsPaused, 
			isActive, 
			setIsActive,
			currentWorkout,
			setCurrentWorkout,
			workoutHistory,
			setWorkoutHistory,
			searchParams,
			setSearchParams }}>
    		{children}
		</Context.Provider>
	);
};
