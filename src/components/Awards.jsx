import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { awardsData } from "../utils/data";

const Awards = () => {
  const awards = awardsData;
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
      id="awards"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
      className="py-24 flex justify-center items-center min-h-screen bg-transparent"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="mb-16 bg-white/20 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-lg py-10 px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">
              Achievements across business leadership and literary excellence.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-white/30 backdrop-blur-xl border border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-white">
                        {award.title}
                      </h3>
                      <span className="bg-blue-300 text-blue-900 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                        {award.year}
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">
                      {award.organization}
                    </p>
                    <p className="text-white/95">{award.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Awards;
