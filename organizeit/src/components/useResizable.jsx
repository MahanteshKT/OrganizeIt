import { useState, useRef, useEffect } from 'react';

const useResizable = (initialWidth = 300, initialHeight = 200, minWidth = 200, minHeight = 150, maxWidth = 600, maxHeight = 400) => {
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  const isResizing = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);

  // Mouse down event to start resizing
  const handleMouseDown = (e) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;

    // Prevent text selection while resizing
    document.body.style.userSelect = 'none';
  };

  // Touch start event to start resizing
  const handleTouchStart = (e) => {
    isResizing.current = true;
    const touch = e.touches[0]; // Get the first touch point
    startX.current = touch.clientX;
    startY.current = touch.clientY;

    // Prevent text selection while resizing
    document.body.style.userSelect = 'none';
  };

  // Mouse move event to resize the card
  const handleMouseMove = (e) => {
    if (!isResizing.current) return;

    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;

    setDimensions((prevState) => {
      let newWidth = prevState.width + deltaX;
      let newHeight = prevState.height + deltaY;

      // Enforce min/max width and height constraints
      newWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
      newHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);

      return { width: newWidth, height: newHeight };
    });

    // Update the starting point for the next move event
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  // Touch move event to resize the card
  const handleTouchMove = (e) => {
    if (!isResizing.current) return;

    const touch = e.touches[0]; // Get the first touch point
    const deltaX = touch.clientX - startX.current;
    const deltaY = touch.clientY - startY.current;

    setDimensions((prevState) => {
      let newWidth = prevState.width + deltaX;
      let newHeight = prevState.height + deltaY;

      // Enforce min/max width and height constraints
      newWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
      newHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);

      return { width: newWidth, height: newHeight };
    });

    // Update the starting point for the next move event
    startX.current = touch.clientX;
    startY.current = touch.clientY;
  };

  // Mouse up event to stop resizing
  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.userSelect = ''; // Re-enable text selection
  };

  // Touch end event to stop resizing
  const handleTouchEnd = () => {
    isResizing.current = false;
    document.body.style.userSelect = ''; // Re-enable text selection
  };

  // Add event listeners on mount and cleanup on unmount
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return {
    dimensions,
    handleMouseDown,
    handleTouchStart,  // Return the touch start handler
  };
};

export default useResizable;
