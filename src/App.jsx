import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";

export default function App() {
  const [showCanvas, setShowCanvas] = useState(true);
  const [pointerPosition, setPointerPosition] = useState({ x: -20, y: -20 });

  useEffect(() => {
    gsap.to(".pointer", {
      x: pointerPosition.x - 10,
      y: pointerPosition.y - 10,
      duration: 0.9,
      ease: "power2.out",
    });
  }, [pointerPosition]);

  const handlePointerMovement = (dets) => {
    setPointerPosition({ x: dets.clientX, y: dets.clientY });
  };

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true,
    });
    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <>
      <div
        className="pointer fixed bg-red-500 w-[20px] h-[20px] rounded-full pointer-events-none"
        style={{
          zIndex: "99",
        }}
      ></div>
      <div className="main" onMouseMove={handlePointerMovement}>
        <div className="w-full h-screen relative">
          <nav className="flex justify-between items-center px-8 py-4 shadow-md">
            <div className="text-xl font-medium text-white">
              Thirtysixstudio
            </div>
            <ul className="flex space-x-16 text-white">
              <li className="cursor-pointer">What we do</li>
              <li className="cursor-pointer">Who we are</li>
              <li className="cursor-pointer">How we give back</li>
              <li className="cursor-pointer">Talk to us</li>
            </ul>
          </nav>
          <div className="w-full h-auto flex px-8">
            <div className="w-1/2 h-full pl-72 pt-20">
              <h3 className="text-3xl w-[80%]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-sm w-[80%] my-5">
                We’re a boutique production studio focused on design, motion,
                and creative technology, constantly reimagining what digital
                craft can do for present-time ads and campaigns.
              </p>
              <h4 className="cursor-pointer">Scroll</h4>
            </div>
            <div className="w-1/2 h-full"></div>
            <div className="absolute top-[79vh]">
              <h1 className="text-[12rem] min-w-full text-bold">
                Thirtysixstudios
              </h1>
            </div>
          </div>
          {showCanvas &&
            data[0].map((imageData, index) => <Canvas details={imageData} />)}
        </div>
        <div className="w-full h-screen relative">
          {showCanvas &&
            data[1].map((imageData, index) => <Canvas details={imageData} />)}
        </div>
        <div className="w-full h-screen relative">
          {showCanvas &&
            data[2].map((imageData, index) => <Canvas details={imageData} />)}
        </div>
      </div>
    </>
  );
}
