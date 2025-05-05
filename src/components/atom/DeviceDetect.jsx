"use client";

import { useEffect, useState } from "react";

export default function DeviceDetect({ children }) {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const isIOSDevice = () => {
      const userAgentCheck = /iPad|iPhone|iPod/i.test(navigator.userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;

      return (userAgentCheck || navigator.userAgent.includes("Macintosh") && isTouchDevice)
    };
  
    if (isIOSDevice()) {
      setIsBlocked(true);
    }
  }, []);

  if (isBlocked) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <p className="text-center text-base max-w-md">
           Sorry, this app is not supported on iOS or iPad devices. Please use a desktop or an Android device to access StreamScene.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
