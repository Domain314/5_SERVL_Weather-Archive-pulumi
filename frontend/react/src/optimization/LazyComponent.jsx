// © 27vier Development - Artjom Moisejev, CTO - https://27vier.com

import React, { useEffect, useState, useRef } from 'react';

function LazyComponent({ children, fallback }) {
    const [isVisible, setIsVisible] = useState(false);
    const node = useRef(null);
    const observer = useRef(new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isVisible) {
                setIsVisible(entry.isIntersecting);
                if (node.current) {
                    observer.current.unobserve(node.current);
                }
            }
        });
    }));

    useEffect(() => {
        if (node.current) {
            observer.current.observe(node.current);
        }

        return () => {
            if (node.current) {
                observer.current.unobserve(node.current);
            }
        };
    }, []);

    return (
        <div ref={node}>
            {isVisible ? children : fallback}
        </div>
    );
}

export default LazyComponent;
