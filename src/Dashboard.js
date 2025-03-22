import "./App.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="Welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }} // Smooth fade-in animation
    >
      <motion.div 
        className="WelcomeContainer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }} // Scaling animation like a video intro
      >
        <motion.h1 
          className="WelcomeTitle"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }} // Title slides in smoothly
        >
          Welcome to FocusGenie
        </motion.h1>

        <motion.p 
          className="WelcomeText"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }} // Text slides in from the bottom
        >
          Your ultimate platform for AI-powered learning and personalized experiences.
        </motion.p>

        <motion.button
          className="WelcomeButton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }} // Button fades in after the text
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default WelcomePage;
