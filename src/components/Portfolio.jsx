import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { portfolioData } from "../utils/data";

const Portfolio = () => {
  const { items: portfolioItems, partners } = portfolioData;
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
      id="portfolio"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
      className="py-24 flex justify-center items-center min-h-screen bg-transparent"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="mb-16 bg-white/20 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-lg py-10 px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Portfolio
            </h2>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">
              Key milestones and achievements from Ayman's journey as a CEO and
              Writer.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white/30 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
                      item.id === 2 ? "object-top" : "object-center"
                    }`}
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-md">
                    {item.year}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs font-bold uppercase tracking-wide text-blue-900 mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-blue-900/80 line-clamp-3 flex-grow">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Partners Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-white text-center mb-10">
              Our Partners
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white/30 backdrop-blur-xl border border-blue-200 p-6 rounded-2xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
