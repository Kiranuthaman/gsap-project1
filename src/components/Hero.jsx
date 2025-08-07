import React, { useRef, useState } from "react";
import Buttons from "./Buttons";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;

  const miniVdRef = useRef(null);
  const mainVdRef = useRef(null);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    const nextIndex = (currentIndex % totalVideos) + 1;
    setCurrentIndex(nextIndex);
  };

  const getVideo = (index) => `videos/hero-${index}.mp4`;

  const handleVideoLoaded = () => {
    setLoadedVideos((prev) => {
      const updated = prev + 1;
      if (updated >= totalVideos) {
        setIsLoading(false);
      }
      return updated;
    });
  };

  const upCommingVideoIndex = (currentIndex % totalVideos) + 1;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-500"
      >
        <div>
          {/* Mini preview video (clickable) */}
          <div className="absolute left-1/2 top-1/2 z-50 size-64 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={miniVdRef}
                src={getVideo(upCommingVideoIndex)}
                loop
                muted
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoaded}
              />
            </div>
          </div>

          {/* Hidden main video (possibly used for preloading) */}
          <video
            ref={mainVdRef}
            src={getVideo(currentIndex)}
            loop
            muted
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoaded}
          />

          {/* Background main autoplay video */}
          <video
            src={getVideo(currentIndex)}
            autoPlay
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoaded}
          />
        </div>
        {/* Under Heading */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75"> G<b>a</b>ming</h1>
        <div className="absolute left-0 top-0 z-40 size-full ">
          <div className="mt-24 px-5 sm:px-5">
            <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
          </div>
           <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the Metagame Layer <br />Unleah the play Economy</p>
           <Buttons/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
