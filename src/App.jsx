import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ScrollToTop, { ScrollReset } from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import Contact from "@/pages/Contact";
import { useAnalytics } from "@/hooks/useAnalytics";

function AppInner({ loaded }) {
    useAnalytics();
    return (
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <ScrollReset />
        <Navbar />
        <main style={{ minHeight: "100vh", background: "#08080C" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    );
}

export default function App() {
    const [loaded, setLoaded] = useState(false);

    return (
        <BrowserRouter>
            {!loaded && <Loader onDone={() => setLoaded(true)} />}
            <AppInner loaded={loaded} />
        </BrowserRouter>
    );
}