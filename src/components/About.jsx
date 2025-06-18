import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CEO from "../assets/CEO.jpeg";

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 100,
        transition: { duration: 0.6, ease: "easeIn" },
      });
    }
  }, [controls, inView]);

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
      className="py-24 flex justify-center items-center min-h-screen bg-transparent"
    >
      <div className="w-full max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 bg-white/20 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-lg p-10 md:p-16">
          {/* Image */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="relative w-64 h-64 mb-6">
              <img
                src={CEO}
                alt="Ayman"
                className="object-cover w-64 h-64 rounded-full border-8 border-blue-400 shadow-2xl"
              />
            </div>
          </div>
          {/* Content */}
          <div className="flex-1">
            <h2 className="text-5xl font-signature text-white mb-2">
              Ayman Siddique
            </h2>
            <h3 className="text-2xl font-bold text-blue-300 mb-6">
              Dual Passions, One Vision
            </h3>
            <p className="text-lg text-white mb-8 italic max-w-xl">
              "Blending business acumen with the art of storytelling to inspire
              and lead."
            </p>
            {/* CEO Role */}
            <div className="mb-8 flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-300">
                  CEO, The Decor
                </h4>
                <p className="text-white/95 leading-relaxed">
                  As the founder and CEO of The Decor, I've led the company to
                  become a premier destination for luxury interior design and
                  home furnishings. With a focus on sustainable practices and
                  innovative design, we've transformed spaces across the country
                  while maintaining our commitment to ethical business
                  practices.
                </p>
              </div>
            </div>
            {/* Writer Role */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-300">
                  Acclaimed Writer
                </h4>
                <p className="text-white/95 leading-relaxed">
                  My passion for storytelling has led to the publication of five
                  novels that explore the depths of human connection and
                  resilience. Through my writing, I aim to bridge cultural
                  divides and illuminate shared human experiences, earning
                  recognition from literary critics and readers alike.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <a
                href="#portfolio"
                className="inline-block px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg hover:from-blue-700 hover:to-blue-500 border-2 border-blue-400 transition-all"
              >
                Explore my work
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
