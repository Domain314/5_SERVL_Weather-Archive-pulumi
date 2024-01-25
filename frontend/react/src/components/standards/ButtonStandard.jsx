import React from 'react';

const ButtonStandard = ({ content, onClick, className, ariaLabel = '' }) => {
    return (
        <button
            className={`rounded bg-transparent p-2 text-xl ${className}`}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {content}
        </button>
    );
};

export default ButtonStandard;