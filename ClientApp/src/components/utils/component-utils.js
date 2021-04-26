import React, { Component, Fragment } from 'react';

export const DDLTwitterHandleByUser = async (props) => {
    
    console.log(JSON.stringify(props));
    
    const initialDisplay = (

            <select className="custom-select" id="handleSelect">
            <option >Loading...</option>)
            </select>
        )

    const finalDisplay = (
            
            <select className="custom-select" id="handleSelect" onChange={(e) => props.dropdownChange(e)} value={props.selectedHandle}>
                {
                    props.globalHandles.map((handle, idx) => <option key={idx} value={handle}>{handle}</option>)
                }
            </select>
        )  

    if (props.globalHandles.length > 0) {
        return finalDisplay 
    }
    return initialDisplay; 
}
export const ToggleState = {
	ON: "on",
	OFF: "off"
}
export const Toggle = (props) => {
    
    const ToggleStyle = {
        ON: "fas fa-toggle-on fa-2x",
        OFF: "fas fa-toggle-off fa-2x"
    }; 
    
    let currentStyle = props.toggleState === ToggleState.ON
        ? ToggleStyle.ON
        : ToggleStyle.OFF;
    
    return (
        <i className={currentStyle} onClick={(e) => props.onClick(e, props.idx)}></i>)
    
}