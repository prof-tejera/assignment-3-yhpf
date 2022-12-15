import React from "react";

const Panel = (props) => {
    return <div className={"state-"+props.state}>{props.children}</div>;
};

export default Panel;