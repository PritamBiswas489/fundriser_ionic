import React from "react";
import "./Story.css";

const Story = ({desc}) => {
    return (
        <>
            <div className="compStory" dangerouslySetInnerHTML={{__html:desc}}>
            </div>
        </>
    );
};

export default Story;
