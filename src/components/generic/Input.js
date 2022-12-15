import React, { useState } from "react";

// This is the input for time, rest AND rounds - sorry about the names used!

const Input = ({timeChanged, placeholder}) => {
    const [inputTime, setInputTime] = useState("");

    const onChange = (e) => {
        setInputTime(e.target.value)
        timeChanged(e.target.value)
    }

    return (
        <form>
            <div>
                <label>
                    <input 
                        type="number" 
                        min="0"
                        value={inputTime} 
                        onChange={onChange}
                        placeholder={placeholder}
                        className="time-input" 
                    />
                </label>
            </div>
        </form>
    );
};

export default Input;