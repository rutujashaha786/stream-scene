"use client";

import { buttonVariants } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/api";
import { cn } from "@/lib/utils";
import { FolderLockIcon } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { FilmIcon } from "lucide-react";
import { useEffect } from "react";

const StreamPlusWatchPage = () => {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("id");
  const userData = useSelector((state) => state.user);

  const isSafariOrIOS = () => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
  
    const isSafari =
      /^((?!chrome|android).)*safari/i.test(ua) &&
      !ua.includes("CriOS") &&
      !ua.includes("FxiOS") &&
      !ua.includes("EdgiOS");
  
    const isIOSDevice = /iPhone|iPad|iPod/.test(ua);
  
    return isSafari || isIOSDevice;
  };

  if (isSafariOrIOS()) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white bg-black px-6 text-center">
        <p className="text-lg">
        Streaming is not supported in Safari. Please use a different browser.
        </p>
      </div>
    );
  }

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  if (!userData.isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full gap-4">
        <FolderLockIcon
          className="w-32 h-32 text-slate-400"
          strokeWidth={1.2}
        />
        <p className="text-base text-slate-400">
          Login to view premium content.
        </p>
        <Link
          href={"/login"}
          className={cn(buttonVariants(), "rounded-full px-6 mt-4")}
        >
          Login
        </Link>
      </div>
    );
  }

  if (!userData.user?.isPremium) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center text-white bg-black gap-6 px-4 text-center">
        <p className="text-lg">
          You need premium access to watch this content.
        </p>
        <Link href="/subscription" className={buttonVariants()}>
          Buy Premium
        </Link>
      </div>
    );
  }

  return videoId ? (
    <div className="video-container bg-black">
      <video
        src={API_BASE_URL + `/video/watch?id=${videoId}`}
        controls
        autoPlay
        muted
        playsInline
        className="w-full h-full"
         // crossOrigin is needed to handle CORS for video resources from a different domain
        crossOrigin="anonymous"
      />
    </div>
  ) : (
    <div className="w-full h-[60vh] flex flex-col gap-4 items-center justify-center text-slate-400">
      <FilmIcon className="w-[100px] h-[100px]" />
      <p>Uh Oh! Video is unavailable.</p>
      <Link href="/" className={buttonVariants()}>
        Take me Home
      </Link>
    </div>
  );

};

export default StreamPlusWatchPage;