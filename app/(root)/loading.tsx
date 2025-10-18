import React from "react";

export default function Loading() {
  return (
    <div className="relative w-full h-screen">
      <video
        src="/logo-animation.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* GIF background */}
      {/* <img
        src="/logo-animation.gif"
        alt="Loading animation"
        className="absolute top-0 left-0 w-full h-full object-cover"
      /> */}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold">
        Loading...
      </div>
    </div>
  );
}
