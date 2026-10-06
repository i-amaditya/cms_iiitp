import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Run for 2 seconds to ensure a premium feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-white dark:bg-bg-dark flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer Spinning Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute w-36 h-36 md:w-48 md:h-48 rounded-full border-t-4 border-r-4 border-brand-red dark:border-brand-red-dark border-transparent"
              style={{ borderTopColor: '#d32f2f', borderRightColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}
            />
            
            {/* Inner Spinning Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border-b-4 border-l-4 border-primary dark:border-blue-500 border-transparent"
              style={{ borderBottomColor: '#1e3a8a', borderLeftColor: 'transparent', borderTopColor: 'transparent', borderRightColor: 'transparent' }}
            />
            
            {/* Pulsing Logo */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-xl z-10"
            >
              <img 
                src="/Logo/iiitp_logo.png" 
                alt="IIIT Pune Loading" 
                className="w-full h-full object-contain scale-[1.6]" 
                onError={(e) => { e.target.src = '/iiitp-logo.png'; }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoader;
