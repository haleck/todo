import React from 'react';
import classes from './ConfirmationModal.module.css';

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onCancel();
        }
    };

    return (
        <div className={classes.modalOverlay} onClick={handleOverlayClick}>
            <div className={classes.modalContent}>
                <h4 className={classes.header}>{title}</h4>
                <p>{message}</p>
                <div className={classes.modalActions}>
                    <button onClick={onConfirm} className={classes.confirmButton}>
                        Подтвердить
                    </button>
                    <button onClick={onCancel} className={classes.cancelButton}>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;

