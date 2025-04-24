import { Maximize, Minimize, Pause, Play } from 'lucide-react';
import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [shouldShowControls, setShouldShowControls] = React.useState(false);

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

      player.on('play', () => setIsPlaying(true));
      player.on('pause', () => setIsPlaying(false));
      player.on('fullscreenchange', () => setIsFullscreen(player.isFullscreen()));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  const togglePlayPause = () => {
    const player = playerRef.current;
    if (player) {
      if (player.paused()) {
        player.muted(false);
        player.play();
      } else {
        player.pause();
      }
    }
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (player) {
      const currentTime = player.currentTime();
      player.requestFullscreen();
      setTimeout(() => {
        player.currentTime(currentTime);
      }, 50);
    }
  };

  return (
    <div data-vjs-player
      className='relative w-full h-full aspect-video bg-primary/25 rounded-lg max-w-5xl mx-auto 2xl:max-w-6xl'
      onMouseEnter={() => setShouldShowControls(true)}
      onMouseLeave={() => setShouldShowControls(false)}
    >
      <div ref={videoRef} className='rounded-lg overflow-hidden' />
      <div
        className={`absolute inset-0 flex my-auto items-center justify-center transition-opacity duration-300 ${shouldShowControls ? "opacity-100" : "opacity-0"
          }`}
      >
        <button
          onClick={togglePlayPause}
          className="bg-primary hover:bg-primary/90 text-white font-bold p-4 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </button>
      </div>
      <div className="absolute bottom-4 right-4">
        <button
          onClick={toggleFullscreen}
          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer"
          aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}

export default VideoJS;