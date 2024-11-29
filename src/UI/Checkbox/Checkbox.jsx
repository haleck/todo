import React from 'react';
import classes from './Checkbox.module.css'


const Checkbox = ({checked, onChange, ...props}) => {
    return (
        <label>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={classes.realCheckbox}
            />
            <span
                className={classes.customCheckbox}
                {...props}
            ></span>
        </label>
    );
};

export default Checkbox;