import React, { useState } from 'react';
import './ColorBox.scss';

function getRandomColor() {
    const COLOR_LIST = ['deeppink', 'red', 'yellow', 'purple','blue'];
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}

function ColorBox() {

    const  [color, SetColor] = useState(() => {
        const initColor = localStorage.getItem('box_color') || 'deeppink'; 
        return initColor;
    });

    function handleClick() {
        const newColor = getRandomColor();
        SetColor(newColor);

        localStorage.setItem('box_color', newColor);
    }
    return (
        <div 
        className="color-box" 
        style={{backgroundColor: color}} 
        onClick={handleClick}>
        </div>
    );
}

export default ColorBox;