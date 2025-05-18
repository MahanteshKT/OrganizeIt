import { useState, useEffect } from 'react';
import $ from 'jquery';

const useDrag = (initialPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;

      const newX = e.touches[0].clientX - dragOffset.x;
      const newY = e.touches[0].clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
    };

    const stopDragging = () => setIsDragging(false);

    // Add event listeners
    $(window).on('mousemove', handleMouseMove);
    $(window).on('mouseup', stopDragging);
    $(window).on('touchmove', handleTouchMove);
    $(window).on('touchend', stopDragging);

    return () => {
      // Clean up event listeners
      $(window).off('mousemove', handleMouseMove);
      $(window).off('mouseup', stopDragging);
      $(window).off('touchmove', handleTouchMove);
      $(window).off('touchend', stopDragging);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragOffset({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
  };

  return { position, handleMouseDown, handleTouchStart };
};

export default useDrag;
