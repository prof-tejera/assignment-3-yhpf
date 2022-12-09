import React, { useEffect, useState } from "react";
import { usePersistedState, usePersistedUrlState } from "./hooks";

// https://www.geeksforgeeks.org/how-to-share-state-across-react-components-with-context/
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
	//const [timerList, setTimerList] = usePersistedState('timerList', []);
	const [timerList, setTimerList] = useState([]);
	const [maxId, setMaxId] = useState(0);
	const [isPaused, setIsPaused] = useState(true);
	const [isActive, setIsActive] = useState(false);
	//const [stateKey, setStateKey] = useState('');

	// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
	//const params = new Proxy(new URLSearchParams(window.location.search), {
        //get: (searchParams, prop) => searchParams.get(prop),
    //});
      // get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    	// const sk = params['timers'] ? params['timers'] : '_default'; 

	// get the timerList from local storage that has the key in the URL, or instantiate from the URL if nothing is found
	// const [timerList, setTimerList] = usePersistedState(sk, sk === '_default' ? [] : JSON.parse(params['timers']));

	return (
		<Context.Provider value={{ timerList, setTimerList, maxId, setMaxId, isPaused, setIsPaused, isActive, setIsActive }}>
    		{children}
		</Context.Provider>
	);
};
