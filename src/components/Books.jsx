import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { booksData } from "../utils/data";

const Books = () => {
  const books = booksData;
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
      id="books"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
      className="py-24 flex justify-center items-center min-h-screen bg-transparent"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="mb-16 bg-white/20 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-lg py-10 px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Books
            </h2>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">
              Exploring human connections and universal experiences through
              storytelling.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>
          {/* Featured Book */}
          <div className="bg-white/30 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-lg overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-96 md:h-auto overflow-hidden rounded-t-2xl">
                <img
                  src={books[4].cover}
                  alt={books[4].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:hidden rounded-t-2xl"></div>
                <div className="absolute top-6 left-6 md:hidden">
                  <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md">
                    Latest Release
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="hidden md:block mb-4">
                  <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-md">
                    Latest Release
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {books[4].title}
                </h3>
                <div className="text-blue-700 font-medium mb-4">
                  {books[4].year}
                </div>
                <p className="text-white mb-6 leading-relaxed">
                  {books[4].description}
                </p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Recognition:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {books[4].awards.map((award) => (
                      <span
                        key={award}
                        className="bg-blue-300 text-blue-900 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm hover:bg-blue-500 hover:text-white transition-colors"
                      >
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full hover:from-blue-700 hover:to-blue-500 shadow-lg border-2 border-blue-400 transition-all self-start"
                >
                  Read Excerpt
                </a>
              </div>
            </div>
          </div>
          {/* Book List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.slice(0, 4).map((book) => (
              <div
                key={book.id}
                className="bg-white/30 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-md">
                    {book.year}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {book.title}
                  </h3>
                  <p className="text-sm font-bold text-blue-900 mb-4">
                    {book.genre}
                  </p>
                  <p className="text-white mb-4 line-clamp-3">
                    {book.description}
                  </p>
                  <div className="mt-auto">
                    <a
                      href={book.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-white transition-colors"
                    >
                      View on Amazon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
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

export default Books;
