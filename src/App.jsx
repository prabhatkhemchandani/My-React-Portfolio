import React, { useState, useEffect, useRef, useCallback } from "react";

// --- Global CSS Styles ---
const GlobalStyles = () => (
  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(-45deg, #0f172a, #1e3a8a, #312e81, #042f2e);
            background-size: 400% 400%;
            animation: gradientBG 25s ease infinite;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }
        
        .content-section {
            background-color: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
            margin: 2rem auto;
            max-width: 1200px;
            padding: 5rem 1rem;
        }

        /* --- Animation Keyframes --- */
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes blink {
            50% { opacity: 0; }
        }
        
        @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }

        /* --- General Section Styling --- */
        .section-title {
            color: #1e293b; 
        }

        /* --- Header Styling --- */
        .header-link:hover {
            background-color: rgba(59, 130, 246, 0.2); /* Soothing complementary blue */
            color: #ffffff;
        }
        
        /* --- Hero Styling --- */
        .hero-button {
            border-radius: 9999px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        .hero-button:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        .social-icon:hover {
            color: #67e8f9;
            transform: scale(1.2);
        }

        /* --- About Section --- */
        .profile-photo {
            border-radius: 50%;
            width: 200px;
            height: 200px;
            object-fit: cover;
            object-position: 50% 10%; 
            border: 5px solid #4f46e5;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin-top: 2rem;
        }
        .profile-photo:hover {
            transform: scale(1.05) rotate(3deg);
            box-shadow: 0 15px 30px rgba(79, 70, 229, 0.2);
        }
        .ai-summary-container {
            background-color: #eef2ff;
            border-left: 4px solid #4f46e5;
            padding: 1rem 1.5rem;
            margin-top: 2rem;
            border-radius: 0.25rem;
            font-style: italic;
            color: #3730a3;
            max-width: 800px;
            text-align: left;
        }

        /* --- Skills Section --- */
        .skill-list-item {
            background-color: #ffffff;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-list-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }
        .skill-list-item ul li {
            margin-bottom: 0.5rem;
        }
        
        /* --- Tech Stack Section --- */
        .tech-stack-playground {
            position: relative;
            width: 100%;
            height: 500px;
            margin-top: 3rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 1rem;
            background: rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .draggable-icon {
            position: absolute;
            cursor: grab;
            user-select: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            padding: 1.5rem;
            border-radius: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: box-shadow 0.3s ease;
            color: #111827;
            font-weight: 500;
        }
        .draggable-icon:active {
            cursor: grabbing;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10;
        }

        /* --- Projects Section (Marquee) --- */
        .marquee-container {
            overflow: hidden;
            position: relative;
            width: 100%;
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .marquee-content {
            display: flex;
            width: 250%;
            animation: marquee 35s linear infinite;
        }
        .marquee-content:hover {
            animation-play-state: paused;
        }
        .marquee-item {
            flex-shrink: 0;
            width: calc(100% / 5);
            padding: 0 1rem;
            box-sizing: border-box;
            background-color: #ffffff;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            margin: 0 1rem;
            position: relative;
            overflow: hidden;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .marquee-item:hover {
            transform: translateY(-15px) scale(1.05);
            box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.2);
        }
        .project-content {
            padding: 1.5rem;
        }
        .project-card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(67, 56, 202, 0.95);
            color: #e0e7ff;
            opacity: 0;
            transition: opacity 0.4s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .marquee-item:hover .project-card-overlay {
            opacity: 1;
        }
        .gemini-button {
            background-color: #fbbf24;
            color: #78350f;
            font-weight: 600;
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        .gemini-button:disabled {
            background-color: #d1d5db;
            cursor: not-allowed;
        }

        /* --- Contact Section --- */
        .contact-button {
            border-radius: 50px;
        }
    `}</style>
);

// --- Custom Hook for observing elements ---
const useIntersectionObserver = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

// --- Gemini API Call Function ---
const callGeminiAPI = async (prompt, maxRetries = 3) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  };

  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        return result.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response structure from Gemini API");
      }
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        console.error("Gemini API call failed after multiple retries:", error);
        return "Sorry, I couldn't generate a response right now. Please try again later.";
      }
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

// --- Dot Constructor for Background Animation ---
function Dot(x, y, vx, vy, properties) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.radius = properties.dotRadius;
  this.color = properties.dotColor;
}

Dot.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

// --- Component Definitions ---

const DynamicBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const mouse = useRef({ x: null, y: null });
  const dots = useRef([]);
  const properties = useRef({
    dotColor: "rgba(248, 250, 252, 0.5)",
    lineColor: "rgba(226, 232, 240, 0.5)",
    dotRadius: 1.5,
    lineDistance: 140,
    mouseRadius: 200,
    numDots: 100,
    dotSpeed: 0.4,
  });

  const init = useCallback((canvas) => {
    dots.current = [];
    const numDots = Math.floor((canvas.width * canvas.height) / 12000);
    properties.current.numDots = numDots > 150 ? 150 : numDots;

    for (let i = 0; i < properties.current.numDots; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const vx = (Math.random() - 0.5) * properties.current.dotSpeed;
      const vy = (Math.random() - 0.5) * properties.current.dotSpeed;
      dots.current.push(new Dot(x, y, vx, vy, properties.current));
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.current.forEach((dot) => {
      dot.x += dot.vx;
      dot.y += dot.vy;

      if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
      if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

      dot.draw(ctx);

      dots.current.forEach((otherDot) => {
        if (dot === otherDot) return;
        const dx = dot.x - otherDot.x;
        const dy = dot.y - otherDot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < properties.current.lineDistance) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(otherDot.x, otherDot.y);
          ctx.strokeStyle = `rgba(226, 232, 240, ${
            0.5 * (1 - distance / properties.current.lineDistance)
          })`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      if (mouse.current.x !== null && mouse.current.y !== null) {
        const dx = dot.x - mouse.current.x;
        const dy = dot.y - mouse.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < properties.current.mouseRadius) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          const opacity = 1 - distance / properties.current.mouseRadius;
          ctx.strokeStyle = `rgba(65, 105, 225, ${opacity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas);
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [init, animate]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        display: "block",
      }}
    />
  );
};

const Typewriter = ({ words }) => {
  const [currentText, setCurrentText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 120;
  const deletingSpeed = 60;
  const delayBetweenWords = 2000;

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };
    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words]);

  return (
    <span style={{ fontWeight: "600", color: "#00BCD4" }}>
      {currentText}
      <span
        style={{
          display: "inline-block",
          width: "4px",
          height: "1.5em",
          backgroundColor: "#00BCD4",
          animation: "blink 1s step-end infinite",
          marginLeft: "4px",
          verticalAlign: "bottom",
        }}
      ></span>
    </span>
  );
};

const Header = () => (
  <header
    style={{
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}
  >
    <nav
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <a href="#hero" style={{ textDecoration: "none" }}>
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#ffffff",
            textShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
          }}
        >
          P<span style={{ color: "#38bdf8" }}>K</span>
        </div>
      </a>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <a
          href="#about"
          className="header-link"
          style={{
            color: "#e5e7eb",
            transition: "all 0.3s",
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          About
        </a>
        <a
          href="#skills"
          className="header-link"
          style={{
            color: "#e5e7eb",
            transition: "all 0.3s",
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Skills
        </a>
        <a
          href="#tech-stack-interactive"
          className="header-link"
          style={{
            color: "#e5e7eb",
            transition: "all 0.3s",
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Tech Stack
        </a>
        <a
          href="#projects"
          className="header-link"
          style={{
            color: "#e5e7eb",
            transition: "all 0.3s",
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Projects
        </a>
        <a
          href="#contact"
          className="header-link"
          style={{
            color: "#e5e7eb",
            transition: "all 0.3s",
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Contact
        </a>
      </div>
    </nav>
  </header>
);

const Hero = () => (
  <section
    id="hero"
    style={{
      color: "#ffffff",
      paddingTop: "5rem",
      paddingBottom: "5rem",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      minHeight: "80vh",
      position: "relative",
      zIndex: 1,
    }}
  >
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem",
        animation: "fade-in-up 0.6s ease-out forwards",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: "900",
          marginBottom: "1rem",
          lineHeight: "1.2",
          color: "#ffffff",
        }}
      >
        PRABHAT KHEMCHANDANI
      </h1>
      <p
        style={{
          fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
          fontWeight: "300",
          marginBottom: "2rem",
          color: "#cbd5e1",
          animationDelay: "0.2s",
        }}
      >
        I'm a{" "}
        <Typewriter
          words={["Data Analyst", "Data Scientist", "Business Analyst"]}
        />
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          marginBottom: "2.5rem",
          animationDelay: "0.3s",
        }}
      >
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          style={{ color: "#00BCD4", transition: "all 0.3s" }}
        >
          <svg
            style={{ width: "2rem", height: "2rem" }}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.13l-6.236-8.754L4.72 21.75H1.41l7.386-8.517L1.41 2.25h3.308l5.98 8.01 6.135-8.01Z"></path>
          </svg>
        </a>
        <a
          href="https://github.com/yourgithub"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          style={{ color: "#00BCD4", transition: "all 0.3s" }}
        >
          <svg
            style={{ width: "2rem", height: "2rem" }}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.499.09.679-.217.679-.481 0-.237-.01-1.03-.015-1.913-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.618.069-.606.069-.606 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.089 2.91.835.09-.647.354-1.089.607-1.334-2.22-.253-4.555-1.113-4.555-4.953 0-1.096.391-1.996 1.03-2.696-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.099 2.651.64.7 1.028 1.599 1.028 2.696 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.483C21.173 20.171 24 16.416 24 12.017 24 6.484 19.522 2 14 2h-2Z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/yourlinkedinprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          style={{ color: "#00BCD4", transition: "all 0.3s" }}
        >
          <svg
            style={{ width: "2rem", height: "2rem" }}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.12-.25-2.25-1.75-2.25-1.5 0-1.75 1.13-1.75 2.25V19H10V10h3v1.5c.5-.75 1.75-1.5 3-1.5 2 0 3.5 1.25 3.5 4.5V19z"></path>
          </svg>
        </a>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <a
          href="#contact"
          className="hero-button"
          style={{
            backgroundColor: "#ffffff",
            color: "#4338ca",
            fontWeight: "700",
            padding: "0.75rem 2rem",
            textDecoration: "none",
          }}
        >
          Get in Touch
        </a>
        <a
          href="/Prabhat_Resume_Data_Analyst.pdf"
          download="Prabhat_Khemchandani_Resume.pdf"
          className="hero-button"
          style={{
            backgroundColor: "#38bdf8",
            color: "#ffffff",
            fontWeight: "700",
            padding: "0.75rem 2rem",
            textDecoration: "none",
          }}
        >
          Download Resume
        </a>
      </div>
    </div>
  </section>
);

const About = ({ isVisible }) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bioText = `I'm Prabhat Khemchandani, a B.Tech graduate from NIT Bhopal with a strong foundation in Computer Science principles. After dedicated preparation for UPSC, I am now passionately transitioning my career into the dynamic fields of Data and Business Analysis. My unique background has honed my analytical thinking, problem-solving abilities, and a meticulous approach to complex challenges. I am driven by the power of data to inform strategic decisions and optimize business processes. My hands-on experience spans data collection, cleaning, analysis, visualization, and dashboard creation, allowing me to translate raw data into actionable insights. I am eager to apply my skills, continuously learn, and contribute to an organization where I can make an immediate impact.`;

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary("");
    const prompt = `Please summarize the following professional bio into a concise and compelling third-person elevator pitch (around 40-50 words). Focus on the key skills and career transition. Bio: "${bioText}"`;
    const result = await callGeminiAPI(prompt);
    setSummary(result);
    setIsLoading(false);
  };

  return (
    <section
      id="about"
      className="content-section"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div style={{ flexShrink: 0, marginBottom: "2rem" }}>
          <img
            src="/profile-photo.jpeg"
            alt="Prabhat Khemchandani"
            className="profile-photo"
          />
        </div>
        <div
          style={{
            fontSize: "1.125rem",
            lineHeight: "1.75",
            color: "#374151",
            flexGrow: 1,
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          <h2
            className="section-title"
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "1.5rem",
            }}
          >
            About Me
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            {bioText.split("I am driven by")[0]}
          </p>
          <p>{`I am driven by${bioText.split("I am driven by")[1]}`}</p>

          <div style={{ marginTop: "2.5rem" }}>
            <button
              onClick={handleSummarize}
              disabled={isLoading}
              className="gemini-button hero-button"
            >
              ✨ {isLoading ? "Generating Summary..." : "AI, Summarize My Bio!"}
            </button>
          </div>

          {summary && (
            <div className="ai-summary-container">
              <p>
                <strong>✨ AI-Generated Summary:</strong> {summary}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Skills = ({ isVisible }) => (
  <section
    id="skills"
    className="content-section"
    style={{
      backgroundColor: "#f8fafc",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      position: "relative",
      zIndex: 1,
    }}
  >
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
      <h2
        className="section-title"
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "3rem",
          textAlign: "center",
        }}
      >
        Core Competencies
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        <div className="skill-list-item">
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#4f46e5",
              marginBottom: "1rem",
            }}
          >
            Technical Proficiency
          </h3>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              lineHeight: "1.75",
              color: "#374151",
            }}
          >
            <li>
              <strong>Programming:</strong> Python (Pandas, NumPy, Matplotlib),
              SQL
            </li>
            <li>
              <strong>Data Viz & BI:</strong> Power BI, Tableau, MS Excel
              (Advanced)
            </li>
            <li>
              <strong>Databases:</strong> MySQL, BigQuery
            </li>
            <li>
              <strong>Tools:</strong> Jupyter Notebooks, Google Sheets
            </li>
          </ul>
        </div>
        <div className="skill-list-item">
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#4f46e5",
              marginBottom: "1rem",
            }}
          >
            Analytical Capabilities
          </h3>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              lineHeight: "1.75",
              color: "#374151",
            }}
          >
            <li>Data Collection & Cleaning</li>
            <li>Exploratory Data Analysis (EDA)</li>
            <li>Statistical Analysis & Modeling</li>
            <li>Business Process Analysis</li>
            <li>Requirements Gathering</li>
          </ul>
        </div>
        <div className="skill-list-item">
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#4f46e5",
              marginBottom: "1rem",
            }}
          >
            Soft Skills
          </h3>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              lineHeight: "1.75",
              color: "#374151",
            }}
          >
            <li>Strategic Problem-Solving</li>
            <li>Critical & Analytical Thinking</li>
            <li>Clear Communication (Written & Verbal)</li>
            <li>Stakeholder Management</li>
            <li>Adaptability & Quick Learning</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const DraggableIcon = ({ tech, initialPos, boundsRef, physicsLoop }) => {
  const nodeRef = useRef(null);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const position = useRef(initialPos);
  const velocity = useRef({
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 5,
  });

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 }; // Stop physics while dragging
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };

      velocity.current = { x: dx, y: dy }; // Track velocity for throwing

      position.current.x += dx;
      position.current.y += dy;

      // Clamp position to bounds
      const boundsRect = boundsRef.current.getBoundingClientRect();
      const iconRect = nodeRef.current.getBoundingClientRect();
      position.current.x = Math.max(
        0,
        Math.min(position.current.x, boundsRect.width - iconRect.width)
      );
      position.current.y = Math.max(
        0,
        Math.min(position.current.y, boundsRect.height - iconRect.height)
      );

      nodeRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    },
    [boundsRef]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  useEffect(() => {
    const gravity = 0.2;
    const damping = 0.85;
    const friction = 0.99;

    const update = () => {
      if (isDragging.current || !nodeRef.current || !boundsRef.current) return;

      // Apply gravity
      velocity.current.y += gravity;

      // Apply friction
      velocity.current.x *= friction;
      velocity.current.y *= friction;

      // Update position
      position.current.x += velocity.current.x;
      position.current.y += velocity.current.y;

      // Collision detection
      const boundsRect = boundsRef.current.getBoundingClientRect();
      const iconRect = nodeRef.current.getBoundingClientRect();

      if (position.current.x <= 0) {
        position.current.x = 0;
        velocity.current.x *= -damping;
      }
      if (position.current.x + iconRect.width >= boundsRect.width) {
        position.current.x = boundsRect.width - iconRect.width;
        velocity.current.x *= -damping;
      }
      if (position.current.y <= 0) {
        position.current.y = 0;
        velocity.current.y *= -damping;
      }
      if (position.current.y + iconRect.height >= boundsRect.height) {
        position.current.y = boundsRect.height - iconRect.height;
        velocity.current.y *= -damping;
      }

      nodeRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    };

    physicsLoop.add(update);
    return () => physicsLoop.remove(update);
  }, [physicsLoop, boundsRef]);

  return (
    <div
      ref={nodeRef}
      className="draggable-icon"
      style={{
        transform: `translate(${initialPos.x}px, ${initialPos.y}px)`,
      }}
      onMouseDown={handleMouseDown}
    >
      {React.cloneElement(tech.icon, {
        style: { width: "6rem", height: "6rem", color: tech.color },
      })}
      <span>{tech.name}</span>
    </div>
  );
};

const TechStackInteractive = ({ isVisible }) => {
  const playgroundRef = useRef(null);
  const [initialPositions, setInitialPositions] = useState([]);
  const physicsLoop = useRef({
    updates: new Set(),
    animationFrameId: null,
    run: function () {
      this.updates.forEach((fn) => fn());
      this.animationFrameId = requestAnimationFrame(this.run.bind(this));
    },
    add: function (fn) {
      this.updates.add(fn);
    },
    remove: function (fn) {
      this.updates.delete(fn);
    },
    start: function () {
      if (!this.animationFrameId) this.run();
    },
    stop: function () {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    },
  });

  const techLogos = [
    {
      name: "Python",
      color: "#3B82F6",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.87 1.87c.883-.1 1.766-.1 2.649 0L12 3.74v.001c-.883.1-1.766.1-2.649 0L12 1.87zm-2.65 1.766c-.1.883-.1 1.766 0 2.649L7.74 12c-.1-.883-.1-1.766 0-2.649L9.35 3.636zm5.299 0c.1.883.1 1.766 0 2.649L16.26 12c.1-.883.1-1.766 0-2.649L14.65 3.636zM3.636 9.35c.883-.1 1.766-.1 2.649 0L12 7.74c-.883.1-1.766.1-2.649 0L3.636 9.35zm16.728 0c-.883-.1-1.766-.1-2.649 0L12 16.26c.883-.1 1.766-.1 2.649 0L20.364 9.35zM12 20.364c-.883.1-1.766.1-2.649 0L12 18.26c-.883.1-1.766.1-2.649 0L12 20.364zm-2.65-1.766c-.1-.883-.1-1.766 0-2.649L7.74 12c-.1.883-.1 1.766 0 2.649L9.35 18.364zm5.299 0c.1-.883.1-1.766 0-2.649L16.26 12c.1.883.1 1.766 0 2.649L14.65 18.364z" />
        </svg>
      ),
    },
    {
      name: "MySQL",
      color: "#4338ca",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm0 4c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 2c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4z" />
        </svg>
      ),
    },
    {
      name: "Tableau",
      color: "#7e22ce",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm-4 4v12h8V6h-8zM8 8h8v8H8V8zm2 2h4v4h-4v-4z" />
        </svg>
      ),
    },
    {
      name: "Power BI",
      color: "#d97706",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm-4 4v12h8V6h-8zM8 8h8v8H8V8zm2 2h4v4h-4v-4z" />
        </svg>
      ),
    },
    {
      name: "Excel",
      color: "#16a34a",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm-4 4v12h8V6h-8zM8 8h8v8H8V8zm2 2h4v4h-4v-4z" />
        </svg>
      ),
    },
    {
      name: "AI/ML",
      color: "#ec4899",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 00-9.9 9h-2.1a1 1 0 000 2h2.1a10 10 0 0017.8 0h2.1a1 1 0 000-2h-2.1A10 10 0 0012 2zm0 18a8 8 0 01-7.9-7h15.8a8 8 0 01-7.9 7zm-3-7a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0z" />
        </svg>
      ),
    },
    {
      name: "DBMS",
      color: "#64748b",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-4.4 0-8 1.8-8 4v2c0 2.2 3.6 4 8 4s8-1.8 8-4V6c0-2.2-3.6-4-8-4zm0 6c-4.4 0-8-1.8-8-4h16c0 2.2-3.6 4-8 4zm0 2c4.4 0 8-1.8 8-4v-1c0 .4-.2.8-.5 1.1C18.6 11.2 15.6 12 12 12s-6.6-.8-7.5-1.9c-.3-.3-.5-.7-.5-1.1v1c0 2.2 3.6 4 8 4zm0 4c4.4 0 8-1.8 8-4v-1c0 .4-.2.8-.5 1.1-1 1.1-4 1.9-7.5 1.9s-6.6-.8-7.5-1.9c-.3-.3-.5-.7-.5-1.1v1c0 2.2 3.6 4 8 4z" />
        </svg>
      ),
    },
    {
      name: "Jupyter",
      color: "#f97316",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-3-7a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0zm-3 4a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const loop = physicsLoop.current;
    loop.start();
    return () => loop.stop();
  }, []);

  useEffect(() => {
    if (isVisible && playgroundRef.current && initialPositions.length === 0) {
      const rect = playgroundRef.current.getBoundingClientRect();
      setInitialPositions(
        Array(techLogos.length)
          .fill(0)
          .map(() => ({
            x: Math.random() * (rect.width - 150),
            y: Math.random() * (rect.height - 150),
          }))
      );
    }
  }, [isVisible, initialPositions.length, techLogos.length]);

  return (
    <section
      id="tech-stack-interactive"
      className="content-section"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        position: "relative",
        zIndex: 1,
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        <h2
          className="section-title"
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
          }}
        >
          My Tech Stack Playground
        </h2>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#4b5563",
            marginBottom: "3rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Drag my skills around! This is an interactive showcase of the key
          technologies I work with.
        </p>
        <div ref={playgroundRef} className="tech-stack-playground">
          {initialPositions.length > 0 &&
            techLogos.map((tech, index) => (
              <DraggableIcon
                key={tech.name}
                tech={tech}
                initialPos={initialPositions[index]}
                boundsRef={playgroundRef}
                physicsLoop={physicsLoop.current}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

const Projects = ({ isVisible }) => {
  const originalProjects = [
    {
      id: 1,
      title: "Swiggy Data Analysis",
      description:
        "Queried over 10,000 records to find top-selling items and customer patterns. Cleaned data, increasing reporting accuracy by 15%. Segmented users, finding loyal customers drove 25% of repeat orders. Suggested strategies projected to increase order frequency by 12%.",
      shortDescription:
        "Analyzed Swiggy data for customer patterns & retention.",
      technologies: "SQL",
      image: "C:UsersDELLDownloadsyour-portfoliopublicSwiggy_logo.png",
      demoLink: "#",
      githubLink: "https://github.com/yourgithub/swiggy_data_analysis",
    },
    {
      id: 2,
      title: "Sales Dashboard",
      description:
        "Developed 4 interactive Power BI dashboards for revenue, profit, and trends across 6 regions. Automated ETL in SQL, reducing data refresh time by 50%. Identified underperforming regions, leading to strategies that boosted sales by 18% in Q2.",
      shortDescription: "Interactive Power BI dashboards for regional sales.",
      technologies: "SQL, Power BI",
      image: "C:UsersDELLDownloadsyour-portfoliopublicPower BII.jpeg",
      demoLink: "#",
      githubLink: "https://github.com/yourgithub/sales_regional_dashboard",
    },
    {
      id: 3,
      title: "IPL 2024 Stats Prep",
      description:
        "Collected, cleaned, and transformed IPL 2024 match and player statistics using Python (Pandas). Prepared a robust data model for Power BI, enabling deep analysis of team performance, player metrics, and game trends.",
      shortDescription: "Data preparation for IPL 2024 Power BI dashboard.",
      technologies: "Python, Data Cleaning, Power BI",
      image: "C:UsersDELLDownloadsyour-portfoliopublicIPL.jpg",
      demoLink: "#",
      githubLink: "https://github.com/yourgithub/ipl_2024_data_prep",
    },
    {
      id: 4,
      title: "Customer Segmentation",
      description:
        "Implemented RFM (Recency, Frequency, Monetary) analysis to segment a customer base, identifying high-value, loyal, and at-risk groups. Provided actionable insights for targeted marketing and retention campaigns.",
      shortDescription: "Customer segmentation using RFM analysis.",
      technologies: "Python, SQL, Data Modeling",
      image: "C:UsersDELLDownloadsyour-portfoliopublicSQL.png",
      demoLink: "#",
      githubLink: "https://github.com/yourgithub/customer_segmentation_rfm",
    },
  ];

  const [projects, setProjects] = useState(
    originalProjects.map((p) => ({ ...p, isLoading: false }))
  );
  const [loadingProjectId, setLoadingProjectId] = useState(null);

  const handleElaborate = async (projectId) => {
    setLoadingProjectId(projectId);
    const project = projects.find((p) => p.id === projectId);
    const prompt = `You are a data analyst writing a portfolio. Elaborate on the following project summary to create a more detailed and professional description (around 60-80 words).
        Project Title: "${project.title}"
        Summary: "${project.shortDescription}"
        Technologies Used: "${project.technologies}"
        Focus on the project's impact and the analyst's contributions.`;

    const newDescription = await callGeminiAPI(prompt);

    setProjects((currentProjects) =>
      currentProjects.map((p) =>
        p.id === projectId ? { ...p, description: newDescription } : p
      )
    );
    setLoadingProjectId(null);
  };

  const displayProjects = [...projects, ...projects, ...projects.slice(0, 2)]; // Ensure seamless loop

  return (
    <section
      id="projects"
      className="content-section"
      style={{
        backgroundColor: "#f8fafc",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <h2
          className="section-title"
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Project Showcase
        </h2>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#4b5563",
            marginBottom: "3rem",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          Explore my key projects below. Hover over a card to pause the
          animation and see details.
        </p>
        <div className="marquee-container">
          <div className="marquee-content">
            {displayProjects.map((project, index) => (
              <div key={index} className="marquee-item group">
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "12rem",
                    objectFit: "cover",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                  }}
                />
                <div className="project-content">
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#4338ca",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: "#374151",
                      marginBottom: "1rem",
                      fontSize: "0.9rem",
                      minHeight: "55px",
                    }}
                  >
                    {project.shortDescription}
                  </p>
                  <p
                    style={{
                      color: "#4b5563",
                      fontSize: "0.75rem",
                      marginBottom: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                </div>
                <div className="project-card-overlay">
                  <div style={{ padding: "1.5rem", textAlign: "center" }}>
                    <h4
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {project.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        marginBottom: "1.5rem",
                        lineHeight: 1.5,
                        minHeight: "120px",
                      }}
                    >
                      {loadingProjectId === project.id
                        ? "Generating..."
                        : project.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#e0e7ff",
                          fontWeight: "500",
                          fontSize: "0.875rem",
                          textDecoration: "underline",
                        }}
                      >
                        View Demo
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#e0e7ff",
                          fontWeight: "500",
                          fontSize: "0.875rem",
                          textDecoration: "underline",
                        }}
                      >
                        GitHub Repo
                      </a>
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                      <button
                        onClick={() => handleElaborate(project.id)}
                        disabled={loadingProjectId === project.id}
                        className="gemini-button hero-button"
                      >
                        ✨{" "}
                        {loadingProjectId === project.id
                          ? "Elaborating..."
                          : "Elaborate"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a
            href="https://github.com/yourgithub"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
            style={{
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              fontWeight: "700",
              padding: "0.75rem 2rem",
              textDecoration: "none",
            }}
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ isVisible }) => (
  <section
    id="contact"
    className="content-section"
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      position: "relative",
      zIndex: 1,
    }}
  >
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem",
        textAlign: "center",
      }}
    >
      <h2
        className="section-title"
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
        }}
      >
        Get in Touch
      </h2>
      <p
        style={{
          fontSize: "1.125rem",
          color: "#4b5563",
          marginBottom: "2.5rem",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        I'm actively seeking entry-level Data and Business Analyst roles. If you
        have an opportunity, guidance, or just want to connect, I'd love to hear
        from you!
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <a
          href="mailto:your.email@example.com"
          className="contact-button hero-button"
          style={{
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            fontWeight: "600",
            padding: "0.75rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          <svg
            style={{ width: "1.25rem", height: "1.25rem" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
          <span>your.email@example.com</span>
        </a>
        <a
          href="https://linkedin.com/in/yourlinkedinprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button hero-button"
          style={{
            backgroundColor: "#ffffff",
            color: "#2563eb",
            border: "1px solid #dbeafe",
            fontWeight: "600",
            padding: "0.75rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          <svg
            style={{ width: "1.25rem", height: "1.25rem" }}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.12-.25-2.25-1.75-2.25-1.5 0-1.75 1.13-1.75 2.25V19H10V10h3v1.5c.5-.75 1.75-1.5 3-1.5 2 0 3.5 1.25 3.5 4.5V19z"></path>
          </svg>
          <span>Connect on LinkedIn</span>
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer
    style={{
      backgroundColor: "rgba(17, 24, 39, 0.8)",
      color: "#d1d5db",
      paddingTop: "2rem",
      paddingBottom: "2rem",
      textAlign: "center",
      fontSize: "0.875rem",
      position: "relative",
      zIndex: 1,
      backdropFilter: "blur(10px)",
    }}
  >
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
      &copy; {new Date().getFullYear()} Prabhat Khemchandani. All rights
      reserved.
    </div>
  </footer>
);

// --- Main App Component ---
function App() {
  const [aboutRef, isAboutVisible] = useIntersectionObserver({
    threshold: 0.1,
  });
  const [skillsRef, isSkillsVisible] = useIntersectionObserver({
    threshold: 0.1,
  });
  const [techStackRef, isTechStackVisible] = useIntersectionObserver({
    threshold: 0.1,
  });
  const [projectsRef, isProjectsVisible] = useIntersectionObserver({
    threshold: 0.1,
  });
  const [contactRef, isContactVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  // Effect for scroll-based background change
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const hue = 220 + scrollPercent * 40; // Shift hue from blue to purple
      document.body.style.background = `linear-gradient(-45deg, hsl(${
        hue - 20
      }, 70%, 15%), hsl(${hue}, 70%, 30%), hsl(${hue + 20}, 60%, 25%), hsl(${
        hue + 40
      }, 80%, 10%))`;
      document.body.style.backgroundSize = `400% 400%`;
      document.body.style.animation = `gradientBG 25s ease infinite`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <GlobalStyles />
      <DynamicBackground />
      <Header />
      <main>
        <Hero />
        <div ref={aboutRef}>
          <About isVisible={isAboutVisible} />
        </div>
        <div ref={skillsRef}>
          <Skills isVisible={isSkillsVisible} />
        </div>
        <div ref={techStackRef}>
          <TechStackInteractive isVisible={isTechStackVisible} />
        </div>
        <div ref={projectsRef}>
          <Projects isVisible={isProjectsVisible} />
        </div>
        <div ref={contactRef}>
          <Contact isVisible={isContactVisible} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
