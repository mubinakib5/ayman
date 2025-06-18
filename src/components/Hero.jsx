import React from "react";
import { ParallaxBanner } from "react-scroll-parallax";
import Ayman from "../assets/Ayman.jpeg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-blue-800 overflow-hidden p-0">
      <ParallaxBanner
        layers={[
          {
            image: Ayman,
            speed: -30,
            scale: [1.1, 1],
            shouldAlwaysCompleteAnimation: true,
          },
          {
            children: (
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/60" />
            ),
            speed: 0,
          },
        ]}
        className="absolute inset-0 w-full h-full z-0"
      />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20 gap-12 min-h-screen pb-32 md:pb-0">
        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center items-center md:items-start">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight font-serif">
            <span className="block text-6xl md:text-8xl font-signature text-blue-300 mb-2">
              Ayman Siddique
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-blue-200 mb-4 font-sans tracking-wide">
            Writer & Entrepreneur
          </h2>
          <p className="max-w-xl text-lg md:text-xl text-gray-200 mb-8 italic">
            "Crafting stories that inspire, and building businesses that last."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center md:justify-start w-full">
            <a
              href="#contact"
              className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all text-lg border-2 border-blue-400"
            >
              Work with Me
            </a>
            <a
              href="#portfolio"
              className="px-8 py-3 rounded-full font-semibold bg-white/10 text-blue-200 border-2 border-blue-300 hover:bg-white/20 transition-all text-lg"
            >
              Read My Writings
            </a>
          </div>
          {/* Social Icons */}
          <div className="flex gap-4 justify-center md:justify-start mt-2">
            <a
              href="#"
              className="text-blue-300 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.58v5.6z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-blue-300 hover:text-white transition"
              aria-label="Twitter"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-blue-300 hover:text-white transition"
              aria-label="Medium"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 6.545c.006-.14-.04-.277-.13-.384l-1.72-2.07v-.31h5.478l4.23 9.29 3.72-9.29h5.24v.31l-1.47 1.41c-.127.097-.183.258-.14.41v11.34c-.043.152.013.313.14.41l1.43 1.41v.31h-7.51v-.31l1.48-1.43c.145-.145.145-.188.145-.41v-9.16l-4.13 10.01h-.56l-4.81-10.01v6.72c-.04.29.06.58.27.78l1.92 2.34v.31h-5.64v-.31l1.92-2.34c.21-.2.31-.49.27-.78v-7.19z" />
              </svg>
            </a>
          </div>
        </div>
        {/* Right: Photo */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-blue-400 shadow-2xl bg-white/10 flex items-center justify-center">
            <img
              src={Ayman}
              alt="Ayman Siddique"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      {/* Featured In Bar - now absolutely positioned at the bottom of the Hero section */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 max-w-4xl w-[90vw] bg-white/10 rounded-xl shadow-lg py-4 px-8 flex flex-col md:flex-row items-center justify-center gap-4 border border-blue-200 backdrop-blur-xl">
        <span className="uppercase text-xs tracking-widest text-blue-300 font-semibold">
          Featured in
        </span>
        <div className="flex gap-6 items-center">
          <span className="text-gray-200 text-sm font-bold">Forbes</span>
          <span className="text-gray-200 text-sm font-bold">Harvard Biz</span>
          <span className="text-gray-200 text-sm font-bold">Inc.</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
