import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";

const ScrollToggleButton = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Check if user is near the bottom
      setIsAtBottom(scrolled + windowHeight >= fullHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleScroll}
      className="fixed bottom-5 right-5 bg-gradient-to-r from-sky-700 to-amber-500 hover:from-amber-500 hover:to-sky-700 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {isAtBottom ? <FaArrowUp size={20} /> : <FaArrowDown size={20} />}
    </motion.button>
  );
};

export default ScrollToggleButton;
