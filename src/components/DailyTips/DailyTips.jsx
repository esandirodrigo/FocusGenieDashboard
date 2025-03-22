import React, { useState } from "react";
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Slide } from "@mui/material";
import Tips from "./tips.png";
import "./DailyTips.css";

const resources = [
  { title: "BetterHelp", description: "Give therapy a try with an exclusive discount", link: "https://www.betterhelp.com" },
  { "title": "ADHD in Adults", "description": "Learn about signs and symptoms of adult ADHD", "link": "https://www.verywellmind.com/adhd-in-adults-overview-4157280" },
  { "title": "Diagnosing ADHD", "description": "Learn how ADHD is formally diagnosed", "link": "https://www.healthline.com/health/adhd/diagnosis" },
  { "title": "Self-Help Tips", "description": "Tips to turn chaos into calm", "link": "https://www.helpguide.org/mental-health/adhd/managing-adult-adhd" },
  { "title": "Treatments", "description": "Safe, effective treatments that can help", "link": "https://www.mayoclinic.org/diseases-conditions/adhd/diagnosis-treatment/drc-20350895" },
 { title: "Medications", description: "What you need to know about drugs", link: "https://www.adhdmedicationguide.com/" },
];

const DailyTips = () => {
  const [open, setOpen] = useState(false);
  const [activeTip, setActiveTip] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setActiveTip(null);
  };

  return (
    <motion.div 
      className="mt-rounded" 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h3 className="tips-heading">🌟 Daily Tips 🌟</h3>
      <div className="image-container">
        <motion.img 
          className="tips" 
          src={Tips} 
          alt="tips" 
          whileHover={{ scale: 1.1 }} 
        />
      </div>
      <p className="tips-text">
        📉 Focus time has decreased this week. Try more focus games to build consistency.  
      </p>
      <motion.button 
        className="button animated-button" 
        onClick={handleOpen} 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
      >
        View Tips
      </motion.button>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        TransitionComponent={Slide} 
        transitionDuration={500}
        PaperProps={{ sx: { borderRadius: "16px", padding: "15px", minWidth: "680px", height: "auto", backgroundColor: "#1c1c1e", color: "#ffffff" } }}
      >
        <DialogTitle className="dialog-title">Here are some tips to help you improve your focus:</DialogTitle>
        <DialogContent>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.4 }}
          >
            <ul className="dialog-list">
              {resources.map((resource, index) => (
                <li 
                  key={index} 
                  className={`resource-item ${activeTip === index ? "active" : ""}`} 
                  onMouseEnter={() => setActiveTip(index)}
                  onMouseLeave={() => setActiveTip(null)}
                >
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                    <span className="resource-icon">ℹ️</span>
                    <div className="resource-text">
                      <span className="resource-title">{resource.title}</span>
                      <span className="resource-description">{resource.description}</span>
                    </div>
                    <span className="resource-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="disclaimer">We will receive compensation from these providers if you purchase products or services through these links.</p>
          </motion.div>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose} 
            color="primary" 
            variant="contained" 
            className="done-button"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default DailyTips;
