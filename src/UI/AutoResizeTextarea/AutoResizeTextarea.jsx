import React, {useEffect, useRef} from 'react';
import classes from "./AutoResizeTextarea.module.css";

const AutoResizeTextarea = ({text, setText, onBlur, maxLength, handleEnter, ...props}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        adjustTextareaHeight(textareaRef.current);
    }, [text]);

    const adjustTextareaHeight = (element) => {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    };

    const handleChange = (e) => {
        const inputText = e.target.value;
        const remainingLength = maxLength - inputText.length;

        if (remainingLength >= 0) {
            setText(inputText);
        } else {
            setText(inputText.slice(0, maxLength));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && handleEnter) {
            e.preventDefault();
            handleEnter(textareaRef);
        }
    };

    return (
        <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            className={classes.textarea}
            rows={1}
            {...props}
        />
    );
};
export default AutoResizeTextarea;