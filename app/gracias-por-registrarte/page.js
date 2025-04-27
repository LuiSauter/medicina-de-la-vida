'use client'

import React from 'react'
import VideoJS from './components/videos';
import videojs from 'video.js';
import { Button } from '@/components/ui/button';

function ClaseGratuita() {

  const playerRef = React.useRef(null);
  const [dataStorage, setDataStorage] = React.useState({
    name: typeof document !== 'undefined' ? localStorage.getItem('name') : null,
    email: typeof document !== 'undefined' ? localStorage.getItem('email') : null,
  });
  const searchParams = new URLSearchParams();
  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true,
    muted: false,
    loop: true,
    sources: [{
      src: '/video.mp4',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });

    // captura el evento de fullscreen
    player.on('fullscreenchange', (e) => {
      const currentTime = player.currentTime();
      videojs.log('fullscreen: ', player.isFullscreen());
      videojs.log('currentTime: ', currentTime);
      if (player.isFullscreen()) {
        setTimeout(() => {
          player.currentTime(currentTime);
        }, 20);
      } else {
        setTimeout(() => {
          player.currentTime(currentTime);
          player.controls(false);
        }, 20);
      }
    });

  };

  // if (!formStorage) {
  //   return (
  //     <section className="flex flex-col px-4 pb-10 pt-4 gap-8 relative md:flex-row md:px-16 min-h-screen w-full">
  //       <div className="flex flex-col gap-8 w-full">
  //         <div className="w-full">
  //           <h1 className="text-primary text-center text-3xl font-bold leading-7 md:text-5xl md:leading-14 md:font-extrabold pb-4">
  //             Clase gratuita con la Dra. Idoia Álvarez
  //           </h1>
  //           <p className="text-primary text-center text-lg font-normal leading-7 md:text-xl md:leading-10">
  //             Aplica un método que mejora la salud real de tus pacientes y amplía tu impacto clínico
  //           </p>
  //         </div>
  //         <div className="flex flex-col gap-8 w-full justify-center items-center">
  //           <Button
  //             onClick={() => {
  //               redirect('/');
  //             }}
  //             className='w-full py-6 md:w-fit rounded-xl cursor-pointer'>
  //             <div className='inline-flex items-center gap-2 px-4'>Ver Clase Gratuita <ChevronRight className="h-4 w-4" /></div>
  //           </Button>
  //         </div>
  //       </div>
  //     </section>
  //   )
  // }

  return (
    <section className="flex flex-col px-4 pt-6 md:pt-0 md:pb-0 gap-8 relative md:flex-row md:px-16 min-h-[calc(100dvh-72px)] md:min-h-[calc(100dvh-72px-143.58px)] w-full">
      <div className="flex flex-col w-full h-full relative justify-center items-center">
        <div className="w-full">
          <h1 className="text-primary text-center text-3xl font-bold leading-8 md:text-4xl md:font-extrabold">
            Clase gratuita con la Dra. Idoia Álvarez
          </h1>
          <p className="text-primary py-6 text-center text-lg font-normal leading-5 md:text-xl md:leading-6">
            Aplica un <strong>método</strong> que <strong>mejora</strong> la <strong>salud real</strong> de tus <strong>pacientes</strong> y amplía tu <strong>impacto clínico</strong>
          </p>
        </div>

        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

        <section className="flex flex-col py-6 md:py-7 w-full gap-4 relative justify-center items-center shrink-0">
          <Button onClick={() => {
            searchParams.append('phone', '+34664828130');
            searchParams.append('text',
`*Reto de 7 días*
${dataStorage.name
  ? `Hola mi nombre es ${dataStorage.name} y quiero acceder al reto`
  : '¡Quiero acceder al reto!'}
`
)
            window.open(`https://api.whatsapp.com/send?${searchParams.toString()}`, '_blank');

          }} className='w-full py-6 md:w-fit rounded-xl cursor-pointer'>
            <div className='inline-flex items-center gap-2 px-4 justify-center'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className='scale-150'
              >
                <path
                  fill="#fff"
                  d="M17.6 6.32A7.851 7.851 0 0 0 12 4a7.94 7.94 0 0 0-6.88 11.89L4 20l4.2-1.1a7.93 7.93 0 0 0 3.79 1 8 8 0 0 0 8-7.93 8 8 0 0 0-2.39-5.65ZM12 18.53a6.58 6.58 0 0 1-3.36-.92l-.24-.15-2.49.66.66-2.43-.16-.25a6.6 6.6 0 0 1 10.25-8.17 6.65 6.65 0 0 1 2 4.66 6.66 6.66 0 0 1-6.66 6.6Zm3.61-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.06-.32-.1-.45.1a9.004 9.004 0 0 1-.63.77c-.11.14-.23.15-.43 0a5.33 5.33 0 0 1-2.69-2.35c-.21-.35.2-.33.58-1.08a.38.38 0 0 0 0-.35c0-.1-.45-1.08-.61-1.47-.16-.39-.32-.33-.45-.34h-.39a.71.71 0 0 0-.53.25A2.19 2.19 0 0 0 8 10.17a3.82 3.82 0 0 0 .81 2.05 8.89 8.89 0 0 0 3.39 3 3.85 3.85 0 0 0 2.38.5 1.999 1.999 0 0 0 1.33-.94 1.62 1.62 0 0 0 .12-.94c-.09-.1-.22-.15-.42-.25Z"
                />
              </svg>
              <span>
                {/* // Reto de 7 días */}
                ¡Quiero acceder al reto!
              </span>
              {/* <ArrowRight className="h-4 w-4" /> */}
            </div>
          </Button>

        </section>
      </div>
    </section>
  )
}

export default ClaseGratuita

// transformar texto con salto de lineas en formato para url
function transformTextToUrl(text) {
  return text.split('\n').map(line => encodeURIComponent(line)).join('%0A');
}