import React, {useEffect, useRef} from 'react';
import classes from "./AutoResizeTextarea.module.css";

const AutoResizeTextarea = ({text, setText, maxLength, handleEnter, ...props}) => {
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
        const lastChar = inputText[inputText.length - 1];

        if (lastChar === '\n' && handleEnter) {
            const trimmedText = inputText.slice(0, -1);
            setText(trimmedText);
            handleEnter()
        } else if (remainingLength >= 0) {
            setText(inputText);
        } else {
            setText(inputText.slice(0, maxLength));
        }
    };

    return (
        <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            className={classes.textarea}
            rows={1}
            {...props}
        />
    );
};
export default AutoResizeTextarea;