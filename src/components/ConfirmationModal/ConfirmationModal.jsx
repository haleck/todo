import React, { useEffect, useState } from 'react';
import classes from './ConfirmationModal.module.css';

const ConfirmationModal = ({ title, message, onConfirm, onCancel, isVisible }) => {
    const [closing, setClosing] = useState(false);

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            onCancel();
        }, 300);
    };

    const handleConfirm = () => {
        setClosing(true)
        setTimeout(() => {
            onConfirm();
        }, 300);
    }

    useEffect(() => {
        if (isVisible) {
            setClosing(false);
        }
    }, [isVisible]);

    return (
        <div
            className={`${classes.modalOverlay} ${closing ? classes.closing : ''}`}
            onClick={handleOverlayClick}
        >
            <div className={classes.modalContent}>
                <h4 className={classes.header}>{title}</h4>
                <p>{message}</p>
                <div className={classes.modalActions}>
                    <button onClick={handleConfirm} className={classes.confirmButton}>
                        Подтвердить
                    </button>
                    <button onClick={handleClose} className={classes.cancelButton}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;


