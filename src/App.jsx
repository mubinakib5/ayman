import { HashRouter as Router } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import About from "./components/About";
import Awards from "./components/Awards";
import Books from "./components/Books";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Nonprofit from "./components/Nonprofit";
import Portfolio from "./components/Portfolio";

function App() {
  return (
    <ParallaxProvider>
      <Router>
        <div className="min-h-screen bg-white text-gray-900">
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-950 via-slate-900 to-blue-800">
            <Hero />
            <About />
            <Portfolio />
            <Nonprofit />
            <Books />
            <Awards />
            <Contact />
          </main>
          <Footer />
        </div>
      </Router>
    </ParallaxProvider>
  );
}

export default App;
