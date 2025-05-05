"use client";

import { useEffect, useState } from "react";

export default function DeviceDetect({ children }) {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOSDevice = /iPhone|iPad|iPod/.test(ua);
    
    if (isIOSDevice) {
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
