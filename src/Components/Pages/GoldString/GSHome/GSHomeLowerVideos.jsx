import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

export default function GSHomeLowerVideos() {
  let videos = "8JjJwr7LA0c,cdA8_ZV9eL4";
  const [mainVideo, setMainVideo] = useState(videos.split(",")[0]);
  const [showVideo, setShowVideo] = useState(false);
  let allVideos = "";
  if (videos !== null || videos !== undefined) {
    allVideos = videos.split(",");
  }
  useEffect(() => {
    if (videos !== null || videos !== undefined || videos !== "") {
      allVideos = videos.split(",");
      return setMainVideo(allVideos[0]);
    }
  }, [videos]);
  useEffect(() => {
    if (showVideo) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showVideo]);
  const handleVideoBoxClick = (e) => {
    // Prevent event propagation to inner box
    e.stopPropagation();
    setShowVideo(true);
  };
  return (
    <div className="gsHomeMiddleVideosMainBox">
      {allVideos.length > 0 && allVideos[0] !== ""
        ? allVideos.map((x, index) => {
            return (
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  handleVideoBoxClick(e), setMainVideo(x);
                }}
                className="productDetailsVideoThumbnail productDetailsVideoThumbnailLarge"
              >
                <img
                  key={index}
                  className="smallBox"
                  // src={`${s1}${currElm}`}
                  src={`https://img.youtube.com/vi/${x}/0.jpg`}
                  alt="Video Thumbnail"

                  // onClick={handleThumbnailClick}
                />
                <div class="overlay overlayLarge"></div>
                <div className="productDetailsVideoThumbnailPlayIcon productDetailsVideoThumbnailPlayIconLarge">
                  <FaPlayCircle size={30} />
                </div>
              </div>
            );
          })
        : null}
      <div
        style={
          showVideo === true
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "5",
              }
            : null
        }
        onClick={() => setShowVideo(false)}
        className={showVideo === true ? "new" : "new2"}
      >
        {showVideo ? (
          <div style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${mainVideo}?autoplay=1`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowfullscreen
            ></iframe>
          </div>
        ) : null}
      </div>
    </div>
  );
}
