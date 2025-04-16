'use client';

import React from 'react';
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const dots = Array.from({ length: 100 }).map(() => ({
      r: Math.random() * 100 + 50,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.01 + 0.005,
      size: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      dots.forEach(dot => {
        dot.angle += dot.speed;
        const x = width / 2 + Math.cos(dot.angle) * dot.r;
        const y = height / 2 + Math.sin(dot.angle) * dot.r;

        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div><h1>Hello</h1>
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen"
    />
    </div>  
  );
}
