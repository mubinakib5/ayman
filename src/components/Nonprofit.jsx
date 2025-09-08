import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { nonprofitData } from "../utils/data";

const Nonprofit = () => {
  const { initiatives } = nonprofitData;
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
      id="nonprofit"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
      className="py-24 flex justify-center items-center min-h-screen bg-transparent"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="mb-16 bg-white/20 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-lg py-10 px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Third Smile Foundation
            </h2>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">
              Dedicated to promoting literacy and education in underserved
              communities worldwide.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>
          {/* Mission Statement */}
          <div className="bg-white/30 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-lg p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8">
                <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden bg-blue-600 p-1 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2016&q=80"
                    alt="Third Smile Foundation Logo"
                    className="rounded-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-white mb-4">
                  Our Mission
                </h4>
                <p className="text-white/95 text-lg">
                  We believe in the power of education to transform lives. Our
                  mission is to provide resources, mentorship, and opportunities
                  to children and families in need, fostering a brighter future
                  for all.
                </p>
              </div>
            </div>
          </div>
          {/* Initiatives */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="bg-white/30 backdrop-blur-xl border border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-xl font-bold text-white mb-3">
                    {initiative.title}
                  </h4>
                  <p className="text-white mb-4">{initiative.description}</p>
                  <div className="bg-blue-300/30 border-l-4 border-blue-600 p-4 rounded-r">
                    <p className="text-sm font-bold text-blue-900">
                      {initiative.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Call to Action */}
          <div
            className="mt-16 text-center animate-fadeIn"
            style={{ animationDelay: "800ms" }}
          >
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-500 shadow-lg border-2 border-blue-400 transition-all"
            >
              Support Our Cause
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Nonprofit;
