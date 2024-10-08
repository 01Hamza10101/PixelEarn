import React, { useEffect, useRef } from 'react';

const Canvas2D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw a filled rectangle
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(20, 20, 150, 100);

    // Draw a line
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(170, 120);
    ctx.stroke();

    // Draw a circle
    ctx.beginPath();
    ctx.arc(100, 150, 40, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw text
    ctx.font = "20px Arial";
    ctx.fillText("Hello Canvas!", 50, 250);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      style={{ border: "1px solid #000000" }}
    />
  );
};

export default Canvas2D;
