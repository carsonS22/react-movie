import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import tmdbApi from "../../api/tmdbApi";

const VideoList = (props) => {
  const { category } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, props.id);
      // Only set the first video instead of multiple
      if (response.results.length > 0) {
        setVideo(response.results[0]);
      }
    };
    getVideos();
  }, [category, props.id]);

  return (
    <>
      {video && <Video item={video} />}
    </>
  );
};

const Video = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;