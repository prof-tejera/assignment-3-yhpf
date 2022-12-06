import React, { useState } from "react";

// https://www.w3schools.com/react/react_forms.asp
// https://reactjs.org/docs/forms.html
// This is the input for timer descriptions

const InputDesc = ({descChanged,placeholder}) => {
    const [inputTimerdesc, setInputTimerdesc] = useState("");

    const handleChange = (e) =>  {
        setInputTimerdesc(e.target.value)
        descChanged(e.target.value)
    }

    return (
        <form>
            <div>
                <label>
                    <textarea 
                        value={inputTimerdesc} 
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="desc-input" 
                    />
                </label>
            </div>
        </form>
    );
};

export default InputDesc;