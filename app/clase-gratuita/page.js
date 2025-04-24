'use client'

import React from 'react'
import { ChevronRight } from "lucide-react"
import { Button } from '@/components/ui/button'
import VideoJS from './components/videos';
import videojs from 'video.js';
import { redirect } from "next/navigation";

function ClaseGratuita() {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: true,
    muted: false,
    loop: true,
    sources: [{
      src: '/video.mov',
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
    <section className="flex flex-col px-4 pb-10 pt-4 gap-8 relative md:flex-row md:px-16 min-h-screen w-full">
      <div className="flex flex-col gap-8 w-full">
        <div className="w-full">
          <h1 className="text-primary text-center text-3xl font-bold leading-7 md:text-5xl md:leading-14 md:font-extrabold pb-4">
            Clase gratuita con la Dra. Idoia Álvarez
          </h1>
          <p className="text-primary text-center text-lg font-normal leading-7 md:text-xl md:leading-10">
            Aplica un método que mejora la salud real de tus pacientes y amplía tu impacto clínico
          </p>
        </div>

        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

        <section className="flex flex-col px-4 py-10 gap-4 relative md:px-15 md:py-16 md:gap-8 md:items-center">
          <h2 className="text-primary font-bold text-lg md:text-3xl text-center">
            ¿Listo para llevar tu práctica al siguiente nivel?
          </h2>
          <p className="text-base md:text-xl text-gray-600 text-center md:max-w-2xl">
            Si te ha gustado esta clase y quieres profundizar en el método, te invitamos a conocer nuestro programa completo.
          </p>
          <Button onClick={() => { }} className='w-full py-6 md:w-fit rounded-xl cursor-pointer'>
            <div className='inline-flex items-center gap-2 px-4'>Habla con la Dra. Idoia <ChevronRight className="h-4 w-4" /></div>
          </Button>

        </section>
      </div>
    </section>
  )
}

export default ClaseGratuita