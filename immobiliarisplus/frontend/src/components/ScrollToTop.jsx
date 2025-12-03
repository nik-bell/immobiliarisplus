/**
 * @file ScrollToTop.jsx
 * @description Utility component that automatically scrolls to the top of the page when the route changes.
 *              Should be placed at the top level of the app to work across all routes.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 *
 * A utility component that listens for route changes and automatically scrolls the window to the top.
 * Renders nothing (returns null) but provides the side effect of scroll restoration on navigation.
 * Should be placed in the app's main layout or router to apply globally.
 *
 * @returns {null} This component renders nothing.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;