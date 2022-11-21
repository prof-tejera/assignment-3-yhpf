import React, { useState } from "react";

// https://www.geeksforgeeks.org/how-to-share-state-across-react-components-with-context/
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
	const [timerList, setTimerList] = useState([]);
	const [maxId, setMaxId] = useState(0);
	const [isPaused, setIsPaused] = useState(true);
	const [isActive, setIsActive] = useState(false);

	return (
		<Context.Provider value={{ timerList, setTimerList, maxId, setMaxId, isPaused, setIsPaused, isActive, setIsActive }}>
    		{children}
		</Context.Provider>
	);
};
