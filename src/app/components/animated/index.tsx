import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface MotionBoxProps {
  children: React.ReactNode;
  initialOpacity?: number;
  animateOpacity?: number;
  transitionDuration?: number;
}

const MotionBox: React.FC<MotionBoxProps> = ({
  children,
  initialOpacity = 0,
  animateOpacity = 1,
  transitionDuration = 0.2,
}) => {
  const [opacity, setOpacity] = useState(initialOpacity);

  useEffect(() => {
    setOpacity(animateOpacity);
    return () => setOpacity(initialOpacity);
  }, [initialOpacity, animateOpacity]);

  return (
    <motion.div
      initial={{ opacity: initialOpacity }}
      animate={{ opacity }}
      transition={{ duration: transitionDuration }}
    >
      {children}
    </motion.div>
  );
};

export default MotionBox;
