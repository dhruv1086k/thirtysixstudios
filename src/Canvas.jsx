import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import canvasimages from "./canvasimages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Canvas({ details }) {
  const canvasRef = useRef(null);
  const [index, setIndex] = useState({ value: details.startIndex });

  useGSAP(() => {
    gsap.to(index, {
      value: details.startIndex + 149,
      duration: 3,
      ease: "linear",
      repeat: -1,
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });
  });

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = canvasimages[index.value];
    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
    };
  }, [index]);

  return (
    <>
      <canvas
        data-scroll
        data-scroll-speed={Math.random().toFixed(1)}
        ref={canvasRef}
        className="absolute"
        style={{
          top: `${details.top}%`,
          left: `${details.left}%`,
          height: `${details.size}px`,
          width: `${details.size}px`,
          zIndex: details.zIndex,
        }}
      ></canvas>
    </>
  );
}
